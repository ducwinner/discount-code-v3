import * as Modules from './modules';
import Runner from './Runner.class';

export default class Loader {
    public static instance: Loader;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
    public static getInstance() {
        if (!Loader.instance) {
            Loader.instance = new Loader();
        }
        return Loader.instance;
    }
    public async load(): Promise<void> {
        window.BSS_B2B.products = new Map();
        window.BSS_B2B.countryCode = ``;
        window.BSS_B2B.countryTax = null;
        window.BSS_B2B.log = function (message?: any, ...optionalParams: any[]) {
            console.log(`[bss.b2b]`, message, optionalParams);
        };
        window.BSS_B2B.formatMoney = function (cents: string, format?: string) {
            if (typeof cents == `string`) {
                cents = cents.replace(`.`, ``);
            }
            let value = ``;
            const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
            let formatString = format || window.BSS_B2B.shopData.shop.money_format || this.money_format;
            const formatElement = [
                `<span class=money>`,
                `</span>`,
                `<div class=dualPrice>`,
                `</div>`,
                `<span class=dualPrice>`,
                `<span class=hidePrice>`,
            ];

            for (let i = 0; i < formatElement.length; i++) {
                if (formatString.includes(formatElement[i])) {
                    formatString = formatString.replace(formatElement[i], ``);
                }
            }

            function defaultOption(opt, def) {
                return typeof opt == `undefined` ? def : opt;
            }

            function formatWithDelimiters(
                number: number | string,
                precision?: number,
                thousands?: string,
                decimal?: string
            ) {
                precision = defaultOption(precision, 2);
                thousands = defaultOption(thousands, `,`);
                decimal = defaultOption(decimal, `.`);

                if (isNaN(Number(number)) || number == null) {
                    return `0`;
                }

                number = (Number(number) / 100.0).toFixed(precision);

                const parts = number.split(`.`),
                    dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1` + thousands),
                    cents = parts[1] ? decimal + parts[1] : ``;

                return dollars + cents;
            }

            switch (formatString.match(placeholderRegex)[1]) {
                case `amount`:
                    value = formatWithDelimiters(cents, 2);
                    break;
                case `amount_no_decimals`:
                    value = formatWithDelimiters(cents, 0);
                    break;
                case `amount_with_comma_separator`:
                    value = formatWithDelimiters(cents, 2, `.`, `,`);
                    break;
                case `amount_no_decimals_with_comma_separator`:
                    value = formatWithDelimiters(cents, 0, `.`, `,`);
                    break;
            }

            return formatString.replace(placeholderRegex, value);
        };
        if (typeof Storage !== `undefined`) {
            const code = window.sessionStorage.getItem(`bssB2BCountryCode`);
            const tax = window.sessionStorage.getItem(`bssB2BCountryTax`);
            if (code && code !== `NA` && code !== `undefined`) {
                window.BSS_B2B.countryCode = code;
            }
            if (tax && tax !== `NA` && tax !== `undefined`) {
                window.BSS_B2B.countryTax = Number(tax);
            }
        }
        await Modules.init();
        if (
            (window.BSS_B2B.countryCode === `` || window.BSS_B2B.countryTax === null) &&
            (window.BSS_B2B?.td?.status || window.BSS_B2B?.te?.status || window.BSS_B2B?.mc?.status)
        ) {
            try {
                const response = await fetch(`${window.bssB2bApiServer}/vat/get-tax-based-contry`, {
                    method: `POST`,
                    headers: {
                        'Content-Type': `application/json`,
                    },
                    body: JSON.stringify({
                        domain: window.Shopify?.shop,
                        app: `b2b`,
                    }),
                });
                const data = await response.json();
                if (data.success) {
                    window.BSS_B2B.countryCode = data.countryCode as string;
                    window.BSS_B2B.countryTax = data.tax || 0;
                    if (typeof Storage !== `undefined`) {
                        window.sessionStorage.setItem(`bssB2BCountryCode`, window.BSS_B2B.countryCode);
                        window.sessionStorage.setItem(`bssB2BCountryTax`, `` + window.BSS_B2B.countryTax);
                    }
                }
            } catch (e) {
                window.BSS_B2B.log(e);
            }
        }
        await Runner.getInstance().run();
    }
}
