import { IPage, IProduct, IShopData, Version } from './interfaces';
import Modules from './modules';
import { PriceCP } from './modules/cp';

export interface IAppProduct extends IProduct {
    appliedCP?: PriceCP;
    appliedQB?: any;
}
export default interface App {
    // init from API
    storeId: number;
    modules: Modules;
    countryCode: string;
    countryTax: number;

    //
    page: IPage;
    products: Map<number, IAppProduct>;
    shopData: IShopData;
    version: Version;

    //
    log: (message?: any, ...optionalParams: any[]) => void;
    formatMoney: (cents: string, format?: any) => string;
    debugger: any[];
    [key: string]: any;
}
