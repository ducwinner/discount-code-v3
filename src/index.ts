import Loader from './Loader.class';

(function runScript() {
    if (typeof window.BSS_B2B === `undefined`) {
        console.log(`[bss.b2b]`, `script is not included!`);
        return;
    }
    try {
        const shopDataElement = document.getElementById(`bss-b2b-store-data`);
        if (shopDataElement) {
            window.BSS_B2B.shopData = JSON.parse(shopDataElement.innerText);
        }
        return Loader.getInstance().load();
    } catch (e) {
        console.log(`[bss.b2b]`, `could not get shop data`);
        return;
    }
})();
