import { getVariantElement } from '../../aspects/variant';
import { ShopifyProduct } from '../../types/common';
import { getFeaturedProductMetafields, getProductMetafields } from '../../utils/common';
import { detectProducts, searchProducts } from './detector';

export default function changePrice(customAttr: string | null, cartFormElement: string | null, isQuickview: boolean) {
    const productIds = detectProducts(customAttr);
    if (!productIds || productIds.length === 0) {
        //
    } else {
        searchProducts(productIds)
            .then((response) => response.json())
            .then((data) => {
                const responseProducts = data as ShopifyProduct[];
                const responseProductIds = responseProducts.map((item) => item.id);
                const productsHasMetaField = getProductMetafields();

                // if (!responseProducts.length) {
                //     Tax.showProductPriceIncludedVat(BSS_B2B, shopData);
                //     Tax.bssB2BChangeCollectionItemVatPriceWithoutCP(shopData, appliedDisplayRule);
                // }

                if (
                    window.BSS_B2B.page.isProductPage &&
                    window.BSS_B2B.shopData.product.id &&
                    !responseProductIds.includes(window.BSS_B2B.shopData.product.id)
                ) {
                    if (!window.BSS_B2B.shopData.product.collections) {
                        responseProducts.push({
                            ...window.BSS_B2B.shopData.product,
                            collections: window.BSS_B2B.shopData.collections,
                        });
                    } else {
                        responseProducts.push(window.BSS_B2B.shopData.product);
                    }
                } else if (window.BSS_B2B.page.isCartPage && window.BSS_B2B.shopData.line_item_products.length > 0) {
                    window.BSS_B2B.shopData.line_item_products.forEach((item) => {
                        if (!responseProductIds.includes(item.id)) {
                            responseProducts.push(item);
                            responseProductIds.push(item.id);
                        }
                    });
                } else if (productsHasMetaField.length > 0) {
                    productsHasMetaField.map((item) => {
                        if (!responseProductIds.includes(item.id)) {
                            responseProducts.push(item);
                            responseProductIds.push(item.id);
                        }
                    });
                }

                const featureProduct = getFeaturedProductMetafields();
                if (featureProduct && featureProduct.id && !responseProductIds.includes(featureProduct.id)) {
                    responseProducts.push(featureProduct);
                }

                // BSS_B2B.fix.cp.fixResponseProducts(responseProducts);
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
                    return window.BSS_B2B.cp.getAppliedRules(
                        window.__st.cid ? window.__st.cid : 0,
                        Object.keys(uniqueProducts)
                    );
                } else {
                    return null;
                }
            })
            .then((priceLists) => {
                if (!priceLists) {
                    window.BSS_B2B.log('empty responseProducts');
                    return;
                }
                // 7067
                // 2087
                // [2988, 3794]
                // TD
                // GET variant
                let variant = '';
                let variantIdForVat = '';
                const variantElement = getVariantElement(customAttr);
                if (variantElement) {
                    if (variantElement instanceof HTMLInputElement || variantElement instanceof HTMLSelectElement) {
                        variant = variantElement.value;
                    } else {
                        variant = variantElement.getAttribute('data-id') || '';
                    }
                    variantIdForVat = variant;
                }

                for (const priceJ of priceLists) {
                }
            })
            .catch((error) => {
                window.BSS_B2B.log('some errors occurred when fetch or parse data:', error);
            });
    }
}
