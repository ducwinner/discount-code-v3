import App from './app';
export {};

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
