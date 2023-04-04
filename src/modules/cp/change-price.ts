import { ShopifyProduct } from '../../types/common';
import { searchProducts } from '../../utils/common';
import { detectProducts } from './detector';
import getAppliedRules from './get-applied-rules';

export default function changePrice(customAttr: string | null, cartFormElement: string | null, isQuickview: boolean) {
    const productIds = detectProducts(customAttr);
    if (!productIds || productIds.length === 0) {
        //
    } else {
        searchProducts(productIds)
            .then((response) => response.json())
            .then((data) => {
                const responseProducts = data as ShopifyProduct[];
                if (responseProducts.length > 0) {
                    const uniqueProducts = {};
                    responseProducts.forEach((product) => {
                        if (!uniqueProducts[product.id]) {
                            uniqueProducts[product.id] = {
                                id: product.id,
                                product_name: product.title,
                                tags: product.tags,
                                collections: product.collections,
                                //
                                price: product.price,
                                priceMin: product.price_min,
                                priceMax: product.price_max,
                                compareAtPriceMin: product.compare_at_price_min,
                                compareAtPriceMax: product.compare_at_price_max,
                                variants: product.variants,
                            };
                        }
                    });
                    return getAppliedRules({
                        customerId: window.__st.cid ? window.__st.cid : 0,
                        productIds: Object.keys(uniqueProducts)
                    });
                } else {
                    return null;
                }
            })
            .then((priceLists) => {
                if (!priceLists) {
                    window.BSS_B2B.log('empty responseProducts');
                    return;
                }
                // search variants
                // additional logic
                // change price
                return Promise.allSettled(priceLists.map(priceList => {
                    //
                }));
            })
            .catch((error) => {
                window.BSS_B2B.log('some errors occurred when fetch or parse data:', error);
            });
    }
}
