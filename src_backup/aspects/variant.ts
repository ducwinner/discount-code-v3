import Hook from '../hooks';
import { QUICKVIEW_PATTERNS } from './quickview';

class Variant extends Hook {
    getElement(customAttr?: string) {
        //
        let variantElement: Element | null;
    }
}

export function getVariantElement(customAttr: string | null) {
    let variantElement: Element | null;
    const quickviewCheck = [7131, 6579, 7355, 8219];
    const quickviewElement = document.querySelector(QUICKVIEW_PATTERNS);
    if (
        window.BSS_B2B.page.isProductPage ||
        (quickviewCheck.indexOf(window.BSS_B2B.storeId) > -1 && quickviewElement)
    ) {
        if (window.BSS_B2B.storeId === 5302) {
            variantElement = document.querySelector(`#main product-payment-terms input[name=id]`);
        } else if (window.BSS_B2B.storeId === 8219) {
            variantElement = document.querySelector(`#product-form-installment input[name=id]`);
        } else if (window.BSS_B2B.storeId === 6579 && quickviewElement) {
            const wrapper = document.querySelector(`.modal .modal-inner form[action*="/cart/add"]`);
            if (wrapper) {
                variantElement = wrapper.querySelector(`input[name="id"], select[name="id"]`);
            }
        } else if (window.BSS_B2B.storeId === 7131 && quickviewElement) {
            const wrapper = document.querySelector(`.modal-container.shopify-section.loaded form[action*="/cart/add"]`);
            if (wrapper) {
                variantElement = wrapper.querySelector(`select[name="id"]`);
            }
        } else {
            variantElement = document.querySelector(`form[action*="/cart/add"] select[name="id"]`);
        }

        if (!variantElement) {
            if (window.BSS_B2B.storeId === 2693) {
                variantElement = document.querySelector(`.product__info form[action*="/cart/add"] input[name="id"]`);
            } else if (window.BSS_B2B.storeId === 7355 && quickviewElement) {
                variantElement = document.querySelector(
                    `#Product-Drawer-Content .product-form input[name="id"][type="hidden"]`
                );
            } else {
                variantElement = document.querySelector(`form[action*="/cart/add"] input[name="id"]`);
            }
        }
    }

    if (customAttr) {
        const quickbuyCheck = [4856, 6289, 6365, 7332];
        if (quickbuyCheck.indexOf(window.BSS_B2B.storeId) > -1 && customAttr.includes(`quick-buy-product__info`)) {
            const productWrapper = document.querySelector(customAttr);
            if (productWrapper) {
                const productContainer = productWrapper.querySelector(`quick-buy-drawer`);
                if (productContainer) {
                    variantElement = productContainer.querySelector(`form[action*="/cart/add"] input[name="id"]`);
                }
            }
        } else if (window.BSS_B2B.storeId === 7359) {
            variantElement = document.querySelector(`.featured-product__add-to-cart[data-id]`);
        }
    }

    return variantElement;
}
