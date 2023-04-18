export function getOriginalPriceElements(productId: number | string) {
    return document.querySelectorAll<HTMLElement>(
        [
            `[bss-b2b-product-id="${productId}"][bss-b2b-current-variant-price]`,
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-sale-price]`,
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-featured-price]`,
            `[bss-b2b-product-id="${productId}"][bss-b2b-variant-price]`,
            // deprecated above, use this
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-price]`,
        ].join(`,`)
    );
}

export function getMinPriceElements(productId: number | string) {
    return document.querySelectorAll<HTMLElement>(
        [
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-lowest-price]`,
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-from-price]`,
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-now-price]`,
            // deprecated above, use this
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-min-price]`,
        ].join(`,`)
    );
}

export function getMaxPriceElements(productId: number | string) {
    return document.querySelectorAll<HTMLElement>(
        [
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-highest-price]`,
            // deprecated above, use this
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-max-price]`,
        ].join(`,`)
    );
}

export function getUnitPriceElements(productId: number | string) {
    return document.querySelectorAll<HTMLElement>(
        [
            `[bss-b2b-product-id="${productId}"][bss-b2b-variant-id][bss-b2b-variant-unit-price]`,
            //
            `[bss-b2b-product-id="${productId}"][bss-b2b-product-parent-price][data-unit-price]`,
        ].join(`,`)
    );
}

export function getButtonPriceElement(productId: number | string) {
    return document.querySelectorAll<HTMLElement>(
        [`[bss-b2b-product-id="${productId}"][bss-b2b-button-price]`].join(`,`)
    );
}
