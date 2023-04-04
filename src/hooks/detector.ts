
export function detectProductsCustomAttr(customAttr: string | null): NodeListOf<Element> | Array<Element> {
    let elements: NodeListOf<Element> | Array<Element>;
    if ((window.BSS_B2B.storeId === 2693 || window.BSS_B2B.storeId === 4342) && window.BSS_B2B.page.isProductPage) {
        elements = document.querySelectorAll(`${customAttr}[bss-b2b-product-id]`);
    } else if ([2896].indexOf(window.BSS_B2B.storeId) !== -1) {
        elements = document.querySelectorAll(`${customAttr} [bss-b2b-product-id]:not([bss-b2b-product-active])`);
    } else if ([5273].indexOf(window.BSS_B2B.storeId) !== -1) {
        elements = document.querySelectorAll(`${customAttr} [bss-b2b-product-id]`);
    } else if ([6888, 7321].indexOf(window.BSS_B2B.storeId) !== -1) {
        elements = document.querySelectorAll(customAttr);
    } else {
        elements = document.querySelectorAll(`${customAttr}[bss-b2b-product-id]`);
    }
    return elements;
}
