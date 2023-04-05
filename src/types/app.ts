import { IPage, IProduct, IShopData } from "./interfaces";
import ModuleMap from "./modules";

export type Version = 1 | 3;
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
    [key: string]: any;
}
