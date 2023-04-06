import { IModule } from '../interfaces';

export type Options = {
    isCartItem?: boolean;
};

export interface PriceCP {
    product_id: number;
    discount_type: number;
    discount_value: string;
    cart_item_key: string | false;

    [key: string]: any;
}

export interface IModuleLogic {
    // properties
    firstLoad: boolean;
    // methods
    getAppliedRules(isCartItem?: boolean): Promise<PriceCP[]>;
}

export default interface IModuleCP extends IModule {
    customSettings: any;
    logic: IModuleLogic;
}
