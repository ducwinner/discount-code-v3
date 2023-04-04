import * as BOGO from './modules/bogo';
import * as CP from './modules/cp';
import * as DC from './modules/dc';
import * as EF from './modules/ef';
import * as MC from './modules/mc';
import * as OL from './modules/ol';
import * as QB from './modules/qb';
import * as QI from './modules/qi';
import * as RF from './modules/rf';
import * as SR from './modules/sr';
import * as TD from './modules/td';
import * as TE from './modules/te';
import * as Runner from './runner';

async function load() {
    window.BSS_B2B.countryCode = '';
    window.BSS_B2B.countryTax = null;
    window.BSS_B2B.log = function (message?: any, ...optionalParams: any[]) {
        console.log('[bss.b2b]', message, optionalParams);
    };
    if (typeof Storage !== 'undefined') {
        const code = window.sessionStorage.getItem('bssB2BCountryCode');
        const tax = window.sessionStorage.getItem('bssB2BCountryTax');
        if (code && code !== 'NA' && code !== 'undefined') {
            window.BSS_B2B.countryCode = code;
        }
        if (tax && tax !== 'NA' && tax !== 'undefined') {
            window.BSS_B2B.countryTax = Number(tax);
        }
    }
    BOGO.init();
    CP.init();
    DC.init();
    EF.init();
    MC.init();
    OL.init();
    QB.init();
    QI.init();
    RF.init();
    SR.init();
    TD.init();
    TE.init();

    if (
        (window.BSS_B2B.countryCode === '' || window.BSS_B2B.countryTax === null) &&
        (window.BSS_B2B.td.status || window.BSS_B2B.te.status || window.BSS_B2B.mc.status)
    ) {
        fetch(`${window.bssB2BApiServer}/vat/get-tax-based-contry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                domain: window.Shopify?.shop,
                app: 'b2b',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.BSS_B2B.countryCode = data.countryCode as string;
                    window.BSS_B2B.countryTax = data.tax || 0;
                    if (typeof Storage !== 'undefined') {
                        window.sessionStorage.setItem('bssB2BCountryCode', window.BSS_B2B.countryCode);
                        window.sessionStorage.setItem('bssB2BCountryTax', '' + window.BSS_B2B.countryTax);
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
}

export { load };
