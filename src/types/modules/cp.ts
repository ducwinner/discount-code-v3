import { IModule, Version } from "../interfaces";

export interface V3Options {
    customerId: string | number;
    productIds: Array<string | number>;
}

export interface V1Options {
    productMap: Array<{
        id: string | number;
        product_name?: string | null;
        tags: string[];
        collections: string[] | number[];
    }>;
    isCartItem: boolean;
}

export type Options = V1Options | V3Options;

export type GetAppliedRulesLogic = {
    [key in Version]: (options: Options) => Promise<PriceCP[]>;
};

export interface PriceCP {
    discount_type: number;
    discount_value: string;

    [key: string]: any;
}

export interface IModuleLogic {
    // properties
    firstLoad: boolean;
    // methods
    getAppliedRules(productIds: number[]): Promise<any>;
}

export default interface IModuleCP extends IModule {
    logic: IModuleLogic
}
