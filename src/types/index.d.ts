import { Page, ShopifyCollection, ShopifyProduct } from './common';
import { BOGO, CP, DC, EF, MC, OL, QB, QI, RF, SR, TD, TE } from './modules';
import { Store } from './redux/store';

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
        BSS_B2B: {
            State: Store;

            storeId: number;
            countryCode: string;
            countryTax: number;
            page: Page;
            shopData: {
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
                product: ShopifyProduct | null;
                collections: ShopifyCollection[];
            };

            bogo: BOGO;
            cp: CP;
            dc: DC;
            ef: EF;
            mc: MC;
            ol: OL;
            qb: QB;
            qi: QI;
            rf: RF;
            sr: SR;
            td: TD;
            te: TE;

            version: BSSB2BVersion;

            log: (message?: any, ...optionalParams: any[]) => void;
            [key: string]: any;
        };
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
