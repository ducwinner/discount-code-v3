
import { SELECTORS } from './const/product-selectors';
import Hookable from './Hook.class';
import { detectProductsCustomAttr } from './hooks/add-ons/detector';
import { avoidDetect } from './hooks/integrate/BSS_Login';

export default class Detector extends Hookable {
    public static instance: Detector;
    private constructor() {
        super();
    }

    public static getInstance(): Detector {
        if (!Detector.instance) {
            Detector.instance = new Detector();
            Detector.instance.addFilter(`Core/CustomAttr`, detectProductsCustomAttr, 0);
            Detector.instance.addFilter(`IntegrateBSSLogin/AvoidDetect`, avoidDetect, 0);
        }
        return Detector.instance;
    }

    async detectProducts(customAttr: string | null): Promise<number[]> {
        let elements: NodeListOf<Element>;
        if (customAttr) {
            elements = await this.execFilter(`DetectProducts/CustomAttr`, elements, customAttr);
        } else {
            elements = document.querySelectorAll(SELECTORS);
        }
    
        if (!elements || !elements.length) {
            return [];
        }

        if (window.BSS_B2B.storeId === 1222) {
            if (Array.prototype.slice.call(elements).every((item) => !item.closest(`.ajax-cart__price`))) {
                return [];
            }
        }

        if (elements.length > 0 || window.BSS_B2B.cp.firstLoad) {
            window.BSS_B2B.cp.firstLoad = false;
        } else {
            return [];
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

    async detectCartItems(): Promise<number[]> {
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
