function init() {
    if (!window.BSS_B2B.cp.status) {
        return;
    }
    window.BSS_B2B.cp.firstLoad = true;
}

export { init };
