import { IModule } from '../interfaces';

export type Options = {
    isCartItem?: boolean;
};

export interface PriceCP {
    product_id: number;
    discount_type: 0 | 1 | 2;
    discount_value: string;
    cart_item_key?: string | false;

    [key: string]: any;
}

export interface IModuleLogic {
    // properties
    firstLoad: boolean;
    // methods
    getAppliedRules(isCartItem?: boolean): Promise<PriceCP[]>;
    getModifiedPrice(price: string | number, type: 0 | 1 | 2, value: string | number): Promise<number>;
}

export default interface IModuleCP extends IModule {
    configData: any[];
    plConfigData: any[];

    customSettings: any;
    logic: IModuleLogic;
}
