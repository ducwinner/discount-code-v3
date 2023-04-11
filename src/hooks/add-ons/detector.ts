export async function detectProductsCustomAttr(customAttr: string | null): Promise<NodeListOf<HTMLElement>> {
    let elements: NodeListOf<HTMLElement>;
    if ((window.BSS_B2B.storeId === 2693 || window.BSS_B2B.storeId === 4342) && window.BSS_B2B.page.isProductPage) {
        elements = document.querySelectorAll<HTMLElement>(`${customAttr}[bss-b2b-product-id]`);
    } else if ([2896].indexOf(window.BSS_B2B.storeId) !== -1) {
        elements = document.querySelectorAll<HTMLElement>(
            `${customAttr} [bss-b2b-product-id]:not([bss-b2b-product-active])`
        );
    } else if ([5273].indexOf(window.BSS_B2B.storeId) !== -1) {
        elements = document.querySelectorAll<HTMLElement>(`${customAttr} [bss-b2b-product-id]`);
    } else if ([6888, 7321].indexOf(window.BSS_B2B.storeId) !== -1) {
        elements = document.querySelectorAll<HTMLElement>(customAttr);
    } else {
        elements = document.querySelectorAll<HTMLElement>(`${customAttr}[bss-b2b-product-id]`);
    }
    return elements;
}
