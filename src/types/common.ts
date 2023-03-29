export interface Page {
    readonly getPage: string[];
    readonly isCartPage: boolean;
    readonly isCollectionPage: boolean;
    readonly isCustomPage: boolean;
    readonly isHomePage: boolean;
    readonly isLoginPage: boolean;
    readonly isProductPage: boolean;
    readonly isQuickOrderPage: boolean;
    readonly isRegisterPage: boolean;
    readonly isSearchPage: boolean;
}

export interface ShopifyResource {
    id: number | string;
}

export interface ShopifyCollection extends ShopifyResource {
    [key: string]: any;
}

export interface ShopifyProduct extends ShopifyResource {
    collections?: ShopifyCollection[];

    [key: string]: any;
}

export type StringOrNumber = string | number;
export type StringNullable = string | null;

export interface V3Options {
    customerId: StringOrNumber;
    productIds: Array<StringOrNumber>;
}
export interface OldOptions {
    productMap: Array<{
        id: StringOrNumber;
        product_name: StringNullable;
        tags: string[];
        collections: StringOrNumber[];
    }>;
    isCartItem: boolean;
}

export type Options = OldOptions | V3Options;


