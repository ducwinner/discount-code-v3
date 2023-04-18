export function getStoredInfo() {
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
}

export async function fetchInfo() {
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
}
