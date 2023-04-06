import { IPage, IProduct, IShopData, Version } from "./interfaces";
import ModuleMap from "./modules";

export default interface App {
    // init from API
    storeId: number;
    modules: ModuleMap;
    countryCode: string;
    countryTax: number;

    // 
    page: IPage;
    products: Map<number, IProduct>;
    shopData: IShopData;
    version: Version;

    //
    log: (message?: any, ...optionalParams: any[]) => void;
    debugger: any[];
    [key: string]: any;
}
