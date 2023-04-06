import { loadScript, remove } from '../../utils/common';

export async function PriceFlowPreAction_Setup(): Promise<void> {
    if (
        [437, 3787, 4497, 8553].indexOf(window.BSS_B2B.storeId) !== -1 &&
        window.BSS_B2B.shopData.customer.id === null
    ) {
        window.BSS_B2B.modules.cp.status = false;
    }

    if (window.BSS_B2B.modules.cp.status) {
        if (window.BSS_B2B.storeId === 3041 && window.location.pathname === `/cart`) {
            const checkoutButtons = document.querySelectorAll(
                `.cart-wrapper__inner .card__section button[name="checkout"]`
            );
            checkoutButtons.forEach(remove);
        }
    }

    // conditional disable TE
    if (!window.bssB2BEnableEuVat && !window.bssB2BEnableUkVat && !window.bssB2BEnableGst && !window.bssB2BEnableAbn) {
        window.BSS_B2B.modules.te.status = false;
    }

    // conditional disable MC
    if (!window.BSS_B2B.modules.mc.currencyConfig) {
        window.BSS_B2B.modules.mc.status = false;
    } else {
        const deviceWidth = document.body.clientWidth;
        if (deviceWidth > 600) {
            if (!window.BSS_B2B.modules.mc.currencyConfig.show_on_desktop) {
                window.BSS_B2B.modules.mc.status = false;
            }
        } else {
            if (!window.BSS_B2B.modules.mc.currencyConfig.show_on_mobile) {
                window.BSS_B2B.modules.mc.status = false;
            }
        }
    }
    if (window.BSS_B2B.modules.mc.status) {
        loadScript(`https://cdn.shopify.com/s/javascripts/currencies.js`, window.BSS_B2B.modules.mc.onLoad);
    }

    // start helper ?

    // start internal (support) function ?

    // start integrate function ?

    if (!window.BSS_B2B.modules.te.status) {
        const teElements = document.querySelectorAll(window.BSS_B2B.modules.te.logic.selector);
        if (teElements.length) {
            teElements.forEach((item) => item.remove());
        }
    }
}

export async function PriceFlowPreFilter_CustomAttr(): Promise<string> {
    return ``;
}
