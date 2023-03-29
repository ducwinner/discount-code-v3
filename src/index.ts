import { load } from './loader';
import { loadScript } from './utils/common';

(function runScript() {
    if (typeof window.BSS_B2B === 'undefined') {
        console.log('[bss.b2b]', 'script is not included!');
        return;
    }
    try {
        const shopDataElement = document.getElementById('bss-b2b-store-data');
        if (shopDataElement) {
            window.BSS_B2B.shopData = JSON.parse(shopDataElement.innerText);
        }
    } catch (e) {
        console.log('[bss.b2b]', 'could not get shop data');
        return;
    }
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/redux/4.2.1/redux.min.js', function () {
        if (typeof window.Redux !== "undefined" && typeof window.Redux.createStore === "function") {
            window.BSS_B2B.State = window.Redux.createStore();
            load();
        }
    });
})();
