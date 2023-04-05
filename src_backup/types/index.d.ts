import { App } from './global';
export {};

export type BSSB2BVersion = 1 | 3;

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
        Redux?: any;
        Shopify: Partial<{
            shop: string;
        }>;
        ShopifyAnalytics: any;
    }
}
