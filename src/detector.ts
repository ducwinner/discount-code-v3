
import { SELECTORS } from './const/product-selectors';
import { detectProductsCustomAttr } from '../hooks/detector';
import { avoidDetect } from '../extensions/intergate/BSSLogin';
import { Hook } from '../types/hook';
import { IHookable } from './types/interfaces';

interface IDetector extends IHookable {
    
}

class Detector extends Hook {
    detectProducts(customAttr: string | null): number[] | null {
        let elements: NodeListOf<Element>;
        if (customAttr) {
            elements = this.execFilter(`DetectProducts/CustomAttr`, elements, customAttr);
        } else {
            elements = document.querySelectorAll(SELECTORS);
        }
    
        if (!elements || !elements.length) {
            return null;
        }

        if (window.BSS_B2B.storeId === 1222) {
            if (Array.prototype.slice.call(elements).every((item) => !item.closest(`.ajax-cart__price`))) {
                return null;
            }
        }

        if (elements.length > 0 || window.BSS_B2B.cp.firstLoad) {
            window.BSS_B2B.cp.firstLoad = false;
        } else {
            return null;
        }

        elements.forEach((item) => {
            item.setAttribute(`bss-b2b-product-active`, `true`);
        });

        const productIds = [];
        const check = new Map<string, boolean>();
        for (const element of elements) {
            if (this.execFilter(`IntegrateBSSLogin/AvoidDetect`, false, element)) {
                continue;
            }
            const productId = element.getAttribute(`bss-b2b-product-id`);
            if (!customAttr) {
                if (element.getAttribute(`itemprop`) === `price`) {
                    // do nothing
                } else {
                    element.parentElement.setAttribute(`bss-b2b-product-id`, productId);
                    element.parentElement.setAttribute(`bss-b2b-product-parent-price`, `true`);

                    if (element.getAttribute(`bss-b2b-product-max-price`)) {
                        element.parentElement.parentElement.setAttribute(`bss-b2b-product-max-price`, `true`);
                    }
                    if (element.getAttribute(`bss-b2b-product-min-price`)) {
                        element.parentElement.parentElement.setAttribute(`bss-b2b-product-min-price`, `true`);
                    }
                }
                // fix for benki-brewingtools show max min price when change variant options
            } else {
                if (element.getAttribute(`bss-b2b-product-max-price`)) {
                    element.parentElement.parentElement.setAttribute(`bss-b2b-product-max-price`, `true`);
                }
                if (element.getAttribute(`bss-b2b-product-min-price`)) {
                    element.parentElement.parentElement.setAttribute(`bss-b2b-product-min-price`, `true`);
                }
            }
            if (productId && productId !== `` && check.get(productId) !== undefined) {
                check.set(productId, true);
                productIds.push(+productId);
            }
        }
        return productIds;
    }

    detectCartItems() {
        const cartData = window.BSS_B2B.shopData.cart;
        const productIds: number[] = [];
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
}

export default (function detector() {
    const detector = new Detector();
    detector.addFilter(`DetectProducts/CustomAttr`, detectProductsCustomAttr, 0);
    detector.addFilter(`IntegrateBSSLogin/AvoidDetect`, avoidDetect, 0);

    return {
        detectProducts: detector.detectProducts,
        detectCartItems: detector.detectCartItems,
    };
})();
