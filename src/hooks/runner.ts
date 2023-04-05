import { loadScript, remove } from '../utils/common';

export function PriceFlowPreAction_Setup() {
    if (
        [437, 3787, 4497, 8553].indexOf(window.BSS_B2B.storeId) !== -1 &&
        window.BSS_B2B.shopData.customer.id === null
    ) {
        window.BSS_B2B.cp.status = false;
    }

    if (window.BSS_B2B.cp.status) {
        if (window.BSS_B2B.storeId === 3041 && window.location.pathname === `/cart`) {
            const checkoutButtons = document.querySelectorAll(
                `.cart-wrapper__inner .card__section button[name="checkout"]`
            );
            checkoutButtons.forEach(remove);
        }
    }

    // conditional disable TE
    if (!window.bssB2BEnableEuVat && !window.bssB2BEnableUkVat && !window.bssB2BEnableGst && !window.bssB2BEnableAbn) {
        window.BSS_B2B.te.status = false;
    }

    // conditional disable MC
    if (!window.BSS_B2B.mc.currencyConfig) {
        window.BSS_B2B.mc.status = false;
    } else {
        const deviceWidth = document.body.clientWidth;
        if (deviceWidth > 600) {
            if (!window.BSS_B2B.mc.currencyConfig.show_on_desktop) {
                window.BSS_B2B.mc.status = false;
            }
        } else {
            if (!window.BSS_B2B.mc.currencyConfig.show_on_mobile) {
                window.BSS_B2B.mc.status = false;
            }
        }
    }
    if (window.BSS_B2B.mc.status) {
        loadScript(`https://cdn.shopify.com/s/javascripts/currencies.js`, window.BSS_B2B.mc.onLoad);
    }

    // start helper ?

    // start internal (support) function ?

    // start integrate function ?

    if (!window.BSS_B2B.te.status) {
        const teElements = document.querySelectorAll(window.BSS_B2B.te.selector);
        if (teElements.length) {
            teElements.forEach((item) => item.remove());
        }
    }
}

export function PriceFlowPreFilter_CustomAttr(): string | null {
    return null;
}
