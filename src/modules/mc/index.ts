function init() {
    if (!window.BSS_B2B.mc.status) {
        return;
    }
    window.BSS_B2B.mc.onLoad = function () {
        window.BSS_B2B.log('shopify currencies script loaded');
    };
}

export { init };
