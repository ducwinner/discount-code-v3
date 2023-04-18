export function formatMoney(cents: string, format?: string) {
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

    function defaultOption(opt: any, def: any) {
        return typeof opt == `undefined` ? def : opt;
    }

    function formatWithDelimiters(number: number | string, precision?: number, thousands?: string, decimal?: string) {
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
}
