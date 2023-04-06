export type Version = 1 | 3;
export interface IModule {
    readonly code: string;
    status?: boolean;
}

/** HOOK */
export interface IHookable {
    setActionOptions(tag: string, options: HookOptions): void;
    actions: HookStore;
    addAction(tag: string, callback: AsyncFunction, priority?: number): void;
    execAction(tag: string, ...args: any[]): Promise<any>;
    filters: HookStore;
    addFilter(tag: string, callback: AsyncFunction, priority?: number): void;
    execFilter(tag: string, value: any, ...args: any[]): Promise<any>;
    statics: HookStore;
    addStatic(tag: string, callback: AsyncFunction, storeId: number): void;
    execStatic(tag: string, value: any, ...args: any[]): Promise<any>;
}

export type AsyncFunction = (...args: any[]) => Promise<any>;

export type HookStore = {
    [tag: string]: Hook;
};

export type Hook = {
    options?: HookOptions;
    callbacks: Array<AsyncFunction[]>;
};

export type HookOptions = boolean;
/** END HOOK */

/** STOREFRONT DATA */
export interface IShopData {
    shop: IShop;
    customer: ICustomer | null;
    cart: ICart;
    line_item_products: any[];
    product: IProduct;
    collections: ICollection[];
}

export interface IShop {
    domain: string;
    permanent_domain: string;
    url: string;
    secure_url: string;
    money_format: string;
    currency: string;
    cart_current_currency: string;
    multi_currencies: string[];

    [key: string]: any;
}

export interface ICustomer {
    id: number;
    email: string;
    tags: string[] | null;
    tax_exempt: boolean | null;

    [key: string]: any;
}

export interface ISearchProduct {
    id: number;
    title: string;
    tags: string[];
    collections: ICollection[];

    price: string | number | null;
    price_min: string | number | null;
    price_max: string | number | null;
    compare_at_price_min: string | number | null;
    compare_at_price_max: string | number | null;

    variants: IVariant[];
}

export interface IProduct {
    id: number;
    product_name?: string;
    tags?: string[];
    collections?: ICollection[];

    price?: string | number | null;
    priceMin?: string | number | null;
    priceMax?: string | number | null;
    compareAtPriceMin?: string | number | null;
    compareAtPriceMax?: string | number | null;
    variants?: IVariant[];

    [key: string]: any;
}

export interface IVariant {
    id: number;
    product_id: number;

    [key: string]: any;
}

export interface ICollection {
    id: number;

    [key: string]: any;
}

export interface ICart {
    items: ICartItem[];

    [key: string]: any;
}

export interface ICartItem {
    key: string;
    product_id: number;

    [key: string]: any;
}
/** END STOREFRONT DATA */

/** PAGE INFORMATION */
export interface IPage {
    getPage(): string[];
    isCartPage(): boolean;
    isCollectionPage(): boolean;
    isCustomPage(): boolean;
    isHomePage(): boolean;
    isLoginPage(): boolean;
    isProductPage(): boolean;
    isQuickOrderPage(): boolean;
    isRegisterPage(): boolean;
    isSearchPage(): boolean;
}
/** END PAGE INFORMATION */
