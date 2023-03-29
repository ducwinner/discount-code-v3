function init() {
    if (!window.BSS_B2B.cp.status) {
        return;
    }
    window.BSS_B2B.cp.firstLoad = true;
}

/**

Step 1: Retrieve product ids
- Detect patterns to retrieve product ids
- Use ajax api cart.js or cart liquid to retrieve product ids

Step 2: Search

url = encodeURI(`search.js?q=${productIds.map(item => `id:"${item}"`).join(' OR ')}&view=bss.b2b`);

Step 3: Get applied rules

=> next modules

*/

export { init };
