import { Bogo } from './bogo';
import { Cp } from './cp';
import { Dc } from './dc';
import { Ef } from './ef';
import { Mc } from './mc';
import { Ol } from './ol';
import { Qb } from './qb';
import { Qi } from './qi';
import { Rf } from './rf';
import { Sr } from './sr';
import { Td } from './td';
import { Te } from './te';

/**
 * Abitary object
 */
type Anything = {
    [key: string]: any;
};

/**
 * Module manager
 */
type Modules = {
    bogo: Bogo;
    cp: Cp;
    dc: Dc;
    ef: Ef;
    mc: Mc;
    ol: Ol;
    qb: Qb;
    qi: Qi;
    rf: Rf;
    sr: Sr;
    td: Td;
    te: Te;
};

/**
 * Page helper
 */
type Page = {
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
};

/**
 * Variant structure in search.bss.b2b.liquid
 */
type SearchVariant = {
    id: number;
    taxable: boolean;
    title: string;
    price: number;
    compare_at_price: number | null;
    available: boolean;
    unit_price: number | null;
};

/**
 * Product structure in search.bss.b2b.liquid
 */
export type SearchProduct = {
    id: number;
    title: string;
    tags: string[];
    handle: string;
    variants: SearchVariant[];
    available: boolean;
    compare_at_price_max: number | null;
    compare_at_price_min: number | null;
    price: number;
    price_max: number | null;
    price_min: number | null;
    collections: number[];
};

/**
 * Extended from Search Product, includes applied B2B rules
 */
export type ExtendedProduct = {
    appliedCP?: any;
    appliedQB?: any;
} & SearchProduct;

/**
 * General product storage, manages extended products
 */
type ProductStorage = {
    productStorage: Map<number, ExtendedProduct>;
};

/**
 * General cart storage, manages cart items
 */
type CartStorage = {
    cartStorage: Map<number, string>;
};

type Shop = {
    // domain: string;
    permanent_domain: string;
    // url: string;
    // secure_url: string;
    money_format: string;
    // currency?: string;
    // cart_current_currency?: string;
    // multi_currencies: string[];
};

type Customer = {
    id: number | null;
    // email: string;
    tags: string[] | null;
    // tax_exempt: boolean | null;
};

type LineItem = {
    key: string;
    product_id: number;
    quantity: number;
};

type Cart = {
    items: LineItem[];
};

// type Collection = {
//     //
// }

/**
 * Information from script "bss-b2b-store-data"
 */
type ShopData = {
    shop: Shop;
    customer: Customer;
    cart: Cart;
    // line_item_products: any[];
    // product: Product;
    // collection: Product[] | null;
    // collections: number[];
};

type Utilities = {
    log: (message?: any, ...optionalParams: any[]) => void;
    formatMoney: (cents: string, format?: any) => string;
    debugger: any[];
};

type Version = 1 | 3;

type App = {
    storeId: number;
    countryCode: string;
    countryTax: number;
    shopData: ShopData;
    page: Page;
} & Modules &
    ProductStorage &
    CartStorage &
    Utilities &
    Version &
    Anything;

export * from './bogo';
export * from './cp';
export * from './dc';
export * from './ef';
export * from './mc';
export * from './ol';
export * from './qb';
export * from './qi';
export * from './rf';
export * from './sr';
export * from './td';
export * from './te';
export * from './_rule';

declare global {
    interface Window {
        __st: {
            cid: number | null;
        };
        allowPurchaseLateByRule?: any;
        bssB2bApiServer?: string;
        bssB2BArrayCountry?: any[];
        bssB2BArrayState?: any[];
        bssB2BAutoRedirectToCheckout?: any;
        bssB2BEnableAbn?: boolean;
        bssB2BEnableEuVat?: boolean;
        bssB2BEnableGst?: boolean;
        bssB2BEnableUkVat?: boolean;
        bssB2BEnableSelectEUVATCountries?: any;
        bssB2BIsRequiredVat?: any;
        bssB2BProduct?: any;
        bssB2BSelectedEUVATCountries?: any[];
        bssB2BVatExemptSelected?: any;
        bssB2BVatExemptSelectedOriginal?: any;
        bssGeoServiceUrl?: string;
        grecaptcha?: any;
        invalidNtProduct?: any;

        BSS_B2B: App;
        BSS_PO: any;
        BSS_PL: any;
        // extract types from https://cdn.shopify.com/s/javascripts/currencies.js
        Currency: {
            convert: (D: number, R: number, S: number) => number;
            rates: Record<string, number>;
        };
        Shopify: Partial<{
            shop: string;
            currency: {
                active: string;
                rate: string;
            };
        }>;
        ShopifyAnalytics: any;
    }
}
