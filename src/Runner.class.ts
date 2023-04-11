import Detector from './Detector.class';
import Hookable from './Hook.class';
import Page from './Page.class';
import { PriceFlowPreAction_Setup, PriceFlowPreFilter_CustomAttr } from './hooks/add-ons/runner';
import { ISearchProduct } from './types/interfaces';
import { searchProducts } from './utils/common';

export default class Runner extends Hookable {
    public static instance: Runner;
    private constructor() {
        super();
    }
    public static getInstance(): Runner {
        if (!Runner.instance) {
            Runner.instance = new Runner();
            Runner.instance.addAction(`PriceFlow/Pre`, PriceFlowPreAction_Setup, 0);
            Runner.instance.addFilter(`PriceFlow/Pre`, PriceFlowPreFilter_CustomAttr, 0);
            window.BSS_B2B.log(`run script`);
            window.BSS_B2B.page = new Page();
        }
        return Runner.instance;
    }

    private async runPriceFlow() {
        // pre-hook
        this.execAction(`PriceFlow/Pre`);
        // core
        const detector = Detector.getInstance();
        const productIds = await detector.detectProducts(null);
        const productIdsSet = [];
        try {
            const response = await searchProducts(productIds);
            const json: ISearchProduct[] = await response.json();
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
                const priceElements = await Detector.getInstance().getOriginalPriceElements(key);
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

    private runCustomerFlow() {
        //
    }

    public async run() {
        return Promise.allSettled([this.runPriceFlow(), this.runCustomerFlow()]);
    }
}
