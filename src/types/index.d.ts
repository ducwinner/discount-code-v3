import App from './app';
export {};

declare global {
    interface Window {
        __st: {
            cid: number | null;
        };
        bssB2BApiServer?: string;
        bssB2BEnableAbn?: boolean;
        bssB2BEnableEuVat?: boolean;
        bssB2BEnableGst?: boolean;
        bssB2BEnableUkVat?: boolean;
        bssGeoServiceUrl?: string;
        BSS_B2B: App;
        Currency: {
            convert: (D: number, R: number, S: number) => number;
            rates: Record<string, number>;
        };
        Shopify: Partial<{
            shop: string;
        }>;
        ShopifyAnalytics: any;
    }
}
