import * as Modules from './modules';
import * as Runner from './runner';

async function load() {
    window.BSS_B2B.countryCode = ``;
    window.BSS_B2B.countryTax = null;
    window.BSS_B2B.log = function (message?: any, ...optionalParams: any[]) {
        console.log(`[bss.b2b]`, message, optionalParams);
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

    Modules
    .init()
    .then(() => {
        if (
            (window.BSS_B2B.countryCode === `` || window.BSS_B2B.countryTax === null) &&
            (window.BSS_B2B.td.status || window.BSS_B2B.te.status || window.BSS_B2B.mc.status)
        ) {
            fetch(`${window.bssB2BApiServer}/vat/get-tax-based-contry`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`,
                },
                body: JSON.stringify({
                    domain: window.Shopify?.shop,
                    app: `b2b`,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        window.BSS_B2B.countryCode = data.countryCode as string;
                        window.BSS_B2B.countryTax = data.tax || 0;
                        if (typeof Storage !== `undefined`) {
                            window.sessionStorage.setItem(`bssB2BCountryCode`, window.BSS_B2B.countryCode);
                            window.sessionStorage.setItem(`bssB2BCountryTax`, `` + window.BSS_B2B.countryTax);
                        }
                    }
                })
                .catch((err) => {
                    window.BSS_B2B.log(err);
                })
                .finally(() => {
                    Runner.run();
                });
        } else {
            Runner.run();
        }
    });
}

export { load };
