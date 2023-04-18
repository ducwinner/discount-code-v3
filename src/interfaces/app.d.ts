import { Page, Product, ShopData, Version } from './global';
import Modules from './modules';
import { PricingApplied } from './modules/cp';

export interface AppProduct extends Product {
    appliedCP?: PricingApplied;
    appliedQB?: any;
}
export default interface App {
    // init from API
    storeId: number;
    modules: Modules;
    countryCode: string;
    countryTax: number;

    //
    page: Page;
    products: Map<number, AppProduct>;
    cart: Map<number, string>;
    shopData: ShopData;
    version: Version;

    //
    log: (message?: any, ...optionalParams: any[]) => void;
    formatMoney: (cents: string, format?: any) => string;
    debugger: any[];
    [key: string]: any;
}
