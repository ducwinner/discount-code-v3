export function loadScript(url: string, callback: () => void) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = function () {
        callback();
    };
    document.head.appendChild(script);
}

export function remove(item: Element): void {
    item.remove();
}

export function toLowerCase(item: string): string {
    return item.toLowerCase();
}

export function getCSSSelector(selector: string) {
    const cpCustomSettings = window.BSS_B2B.cp.customSettings;
    if (cpCustomSettings != null) {
        if (cpCustomSettings[selector] != null && selector.indexOf('_time_delay_') !== -1) {
            return cpCustomSettings[selector];
        } else {
            if (cpCustomSettings[selector] != null && cpCustomSettings[selector].length) {
                return ',' + cpCustomSettings[selector];
            }
        }
    }
    return '';
}

export function getProductMetafields() {
    let productsHasMetaField = [];
    let productsJson: any = {};
    let featuredCollection: any = {};

    const collectionMetafieldElement = document.querySelector('.bss-b2b-collection-metafield');
    if (collectionMetafieldElement) {
        productsJson = JSON.parse(collectionMetafieldElement.innerHTML);
    }

    const featureCollectionMetafield = document.querySelector('.bss-b2b-feature-collection-metafield');
    if (featureCollectionMetafield) {
        featuredCollection = JSON.parse(featureCollectionMetafield.innerHTML);
    }

    if (featuredCollection.feature_collection) {
        if (featuredCollection.id_collection) {
            for (const [key, value] of Object.entries(featuredCollection.id_collection)) {
                featuredCollection.feature_collection.map((item) => {
                    if ((value as any[]).includes(item.id)) {
                        if (item.collections) {
                            item.collections = [...item.collections, +key];
                        } else {
                            item.collections = [+key];
                        }
                    }
                });
            }
        }
        productsHasMetaField = [...featuredCollection.feature_collection];
    }
    if (window.BSS_B2B.page.isCollectionPage && productsJson.collection) {
        if (productsJson.id_collection) {
            for (const [key, value] of Object.entries(productsJson.id_collection)) {
                productsJson.collection.map((item) => {
                    if ((value as any[]).includes(item.id)) {
                        if (item.collections) {
                            item.collections = [...item.collections, +key];
                        } else {
                            item.collections = [+key];
                        }
                    }
                });
            }
        }
        productsHasMetaField = [...productsJson.collection];
    }
    return productsHasMetaField;
}

export function getFeaturedProductMetafields(): any {
    let featuredProduct = {};
    const featuredProductMetafieldElement = document.querySelector('.bss-b2b-featured-product-metafield');
    if (featuredProductMetafieldElement) {
        featuredProduct = JSON.parse(featuredProductMetafieldElement.innerHTML);
    }
    return featuredProduct;
}

export function searchProducts(ids: number[]): Promise<Response> {
    const url = encodeURI(`search.js?q=${ids.map((item) => `id:"${item}"`).join(' OR ')}&view=bss.b2b`);
    return fetch(url);
}
