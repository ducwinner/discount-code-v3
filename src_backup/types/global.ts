import { ModuleManager } from "./modules";
import { ModuleMap } from "./modules/_interface";
import { PriceCP } from "./modules/cp";

export interface ShopifyVariant {
    id: number;
    product_id: number;
}
export interface ShopifyProduct {
    id: number;
    originalPrice?: string;
    compareAtPrice?: string;
    minPrice?: string;
    maxPrice?: string;
    minCompareAtPrice?: string;
    maxCompareAtPrice?: string;
    variants?: ShopifyVariant[];
    selector?: Element;
}

export interface Product extends ShopifyProduct {
    appliedCP?: PriceCP;
    appliedQB?: any;
}

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

export interface ShopData {
    shop: {
        domain: string;
        permanent_domain: string;
        url: string;
        secure_url: string;
        money_format: string;
        currency: string;
        cart_current_currency: string;
        multi_currencies: string[];
    };
    customer: {
        id: number | null;
        tags: string[] | null;
        tax_exempt: boolean | null;
        email: string;
    } | null;
    cart: {
        items: {
            product_id: number;
        }[];

        [key: string]: any;
    };
    line_item_products: any[];
    product: any;
    collections: any[];
}

export type AppVersion = 1 | 3;
export interface App {
    // init from API
    storeId: number;
    modules: ModuleMap;
    countryCode: string;
    countryTax: number;

    // 
    ModuleManager: ModuleManager;
    Page: Page;
    ProductManager: Map<number, Product>;
    ShopData: ShopData;
    Version: AppVersion;

    //
    log: (message?: any, ...optionalParams: any[]) => void;
    [key: string]: any;
}
