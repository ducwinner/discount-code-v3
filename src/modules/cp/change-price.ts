import { IProduct } from '../../types/interfaces';
import { searchProducts } from '../../utils/common';
import getAppliedRules from './get-applied-rules';

export default async function changePrice(productIds: number[] | null): Promise<void> {
    if (!productIds || productIds.length === 0) {
        //
    } else {
        searchProducts(productIds)
            .then((response) => response.json())
            .then((data) => {
                const responseProducts = data as IProduct[];
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
                                price: product.originalPrice,
                                priceMin: product.minPrice,
                                priceMax: product.maxPrice,
                                compareAtPriceMin: product.minCompareAtPrice,
                                compareAtPriceMax: product.maxCompareAtPrice,
                                variants: product.variants,
                            };
                        }
                    });
                    return getAppliedRules({
                        customerId: window.__st.cid ? window.__st.cid : 0,
                        productIds: Object.keys(uniqueProducts),
                    });
                } else {
                    return null;
                }
            })
            .then((priceLists) => {
                if (!priceLists) {
                    window.BSS_B2B.log(`empty responseProducts`);
                    return;
                }
                // search variants
                // additional logic
                // change price
                return Promise.allSettled(
                    priceLists.map((priceList) => {
                        //
                        console.log(priceList);
                    })
                );
            })
            .catch((error) => {
                window.BSS_B2B.log(`some errors occurred when fetch or parse data:`, error);
            });
    }
    return;
}
