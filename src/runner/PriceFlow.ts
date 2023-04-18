import Detector from '@/Detector.class';
import Hookable from '@/Hookable.class';
import { PriceFlowPreAction_Setup, PriceFlowPreFilter_CustomAttr } from '@/hooks/add-ons/runner';
import { SearchProduct } from '@/interfaces/global';
import { searchProducts } from '@/utils/common';
import { getOriginalPriceElements } from '@/utils/dom';

export default class PriceFlow extends Hookable {
    public static instance: PriceFlow;
    private constructor() {
        super();
    }
    public static getIns(): PriceFlow {
        if (!PriceFlow.instance) {
            PriceFlow.instance = new PriceFlow();
            PriceFlow.instance.addAction(`PriceFlow/Pre`, PriceFlowPreAction_Setup, 0);
            PriceFlow.instance.addFilter(`PriceFlow/Pre`, PriceFlowPreFilter_CustomAttr, 0);
        }
        return PriceFlow.instance;
    }

    public async execute() {
        // pre-hook
        this.execAction(`PriceFlow/Pre`);
        // core
        const detector = Detector.getInstance();
        const productIds = await detector.detectProducts(null);
        const productIdsSet = [];
        try {
            const response = await searchProducts(productIds);
            const json: SearchProduct[] = await response.json();
            if (json.length > 0) {
                json.forEach((product) => {
                    if (!window.BSS_B2B.products.get(product.id)) {
                        productIdsSet.push(product.id);
                        window.BSS_B2B.products.set(product.id, {
                            id: product.id,
                            product_name: product.title,
                            tags: product.tags,
                            collections: product.collections,

                            price: product.price,
                            priceMin: product.price_min,
                            priceMax: product.price_max,
                            compareAtPriceMin: product.compare_at_price_min,
                            compareAtPriceMax: product.compare_at_price_max,
                        });
                    }
                });
            }
            /** CP Check */
            const appliedCPs = await window.BSS_B2B.modules.cp.logic.getAppliedRules(false);
            console.log(`appliedCPs`, appliedCPs);
            appliedCPs.forEach((item) => {
                const product = window.BSS_B2B.products.get(+item.product_id);
                if (product) {
                    product.appliedCP = item;
                }
            });
            /** QB Check */
            /** ----- Calculate Price ----- */
            for (const [key, value] of window.BSS_B2B.products.entries()) {
                let price = value.price;
                if (value.appliedCP) {
                    price = await window.BSS_B2B.modules.cp.logic.getModifiedPrice(
                        value.price,
                        value.appliedCP.discount_type,
                        value.appliedCP.discount_value
                    );
                }
                const priceElements = await getOriginalPriceElements(key);
                for (const element of priceElements) {
                    element.innerHTML = window.BSS_B2B.formatMoney(`` + price);
                }
            }
            /** --------------------------- */
        } catch (e) {
            window.BSS_B2B.log(`Could not search product data`, e);
        } finally {
            document
                .querySelectorAll<HTMLElement>(`[bss-b2b-product-id]`)
                .forEach((e) => (e.style.visibility = `visible`));
        }
        // post-hook
    }
}
