import { getCSSSelector } from '@/utils/common';

export const SELECTORS = [
    `[bss-b2b-product-id][bss-b2b-product-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-current-variant-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-sale-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-featured-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-lowest-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-from-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-now-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-min-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-max-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-variant-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-product-price]:not([bss-b2b-product-active])`,
    `[bss-b2b-product-id][bss-b2b-variant-unit-price]:not([bss-b2b-product-active])`,
    `[data-atc-banner-product-price]`,
    `.t4s-product-price[bss-b2b-product-id][bss-b2b-product-price]`,
    `[bss-b2b-product-id][bss-b2b-button-price]`,
    `.product-details_price-inner [bss-b2b-variant-price]`,
    getCSSSelector(`product_sale_price`),
    getCSSSelector(`product_regular_price`),
    getCSSSelector(`product_featured_price`),
    getCSSSelector(`product_compare_price`),
    getCSSSelector(`product_from_price`),
    getCSSSelector(`product_now_price`),
    getCSSSelector(`product_min_price`),
    getCSSSelector(`product_variant_price`),
    getCSSSelector(`product_lowest_price`),
    getCSSSelector(`product_current_variant_price`),
    getCSSSelector(`product_unit_price`),
]
    .filter((item) => !!item)
    .join(`,`);
