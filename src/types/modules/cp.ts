import { IModule } from "./_interface";

export interface V3Options {
    customerId: string | number;
    productIds: Array<string | number>;
}
export interface OldOptions {
    productMap: Array<{
        id: string | number;
        product_name?: string | null;
        tags: string[];
        collections: string[] | number[];
    }>;
    isCartItem: boolean;
}

export type Options = OldOptions | V3Options;

export interface PriceCP {
    discount_type: number;
    discount_value: string;

    [key: string]: any;
}

export interface IModuleCPInfo {
    status: boolean;
}

export interface IModuleCP extends IModule {
    firstLoad: boolean;
    getAppliedRules(productIds: number[]): Promise<void>;
}
