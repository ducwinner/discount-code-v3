import { SELECTORS } from './selectors';



export function detectProducts(customAttr: string | null): number[] | null {
    let elements: NodeListOf<Element> | Array<Element>;
    if (customAttr) {
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
    } else {
        elements = document.querySelectorAll(SELECTORS);
    }

    if (elements) {
        elements = Array.from(elements);
    } else {
        return null;
    }

    if (window.BSS_B2B.storeId === 1222) {
        if (elements.every((item) => !item.closest('.ajax-cart__price'))) {
            return null;
        }
    }

    if (elements.length > 0 || window.BSS_B2B.cp.firstLoad) {
        window.BSS_B2B.cp.firstLoad = false;
    } else {
        return null;
    }

    elements.forEach((item) => {
        item.setAttribute('bss-b2b-product-active', 'true');
    });

    const productIds = [];
    const check = new Map<string, boolean>();
    for (const element of elements) {
        const isLoginPattern = element.querySelector('.bsscommerce-ltsp-message');
        if (isLoginPattern) {
            if (window.BSS_B2B.storeId === 2984 && !window.__st.cid) {
                // do nothing
            } else {
                continue;
            }
        }
        const productId = element.getAttribute('bss-b2b-product-id');
        if (!customAttr) {
            if (element.getAttribute('itemprop') === 'price') {
                // do nothing
            } else {
                element.parentElement.setAttribute('bss-b2b-product-id', productId);
                element.parentElement.setAttribute('bss-b2b-product-parent-price', 'true');

                if (element.getAttribute('bss-b2b-product-max-price')) {
                    element.parentElement.parentElement.setAttribute('bss-b2b-product-max-price', 'true');
                }
                if (element.getAttribute('bss-b2b-product-min-price')) {
                    element.parentElement.parentElement.setAttribute('bss-b2b-product-min-price', 'true');
                }
            }
            // fix for benki-brewingtools show max min price when change variant options
        } else {
            if (element.getAttribute('bss-b2b-product-max-price')) {
                element.parentElement.parentElement.setAttribute('bss-b2b-product-max-price', 'true');
            }
            if (element.getAttribute('bss-b2b-product-min-price')) {
                element.parentElement.parentElement.setAttribute('bss-b2b-product-min-price', 'true');
            }
        }
        if (productId && productId !== '' && check.get(productId) !== undefined) {
            check.set(productId, true);
            productIds.push(+productId);
        }
    }
    return productIds;
}

export function detectCartItems() {
    const cartData = window.BSS_B2B.shopData.cart;
    const productIds = [];
    const check = new Map<number, boolean>();

    cartData.items.forEach((item) => {
        const productId = item.product_id;
        if (check.get(productId) !== undefined && productId !== null) {
            check.set(productId, true);
            productIds.push(productId);
        }
    });

    return productIds;
}
