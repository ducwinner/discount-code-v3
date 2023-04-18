import { IModule } from '../global';

export type Options = {
    isCartItem?: boolean;
};

export interface Information {
    name: string;
    priority: number;
    apply_to: number;
    customer_ids: string | null;
    customer_tags: string | null;
    start_date: string | null;
    end_date: string | null;
    exc_customer_tags: string | null;
    exc_customers: string | null;
    exclude_from: number | null;
}

export interface Discount {
    discount_type: 0 | 1 | 2;
    discount_value: string;
}

export interface PlRule extends Information {
    selected_products: PlProduct[];
}

export interface PlProduct extends Discount {
    product_id: string;
}

export interface CpRule extends Information, Discount {
    id: number;
    product_condition_type: number;
    product_ids: string | null;
    product_collections: string | null;
    product_tags: string | null;
    date_rule_type: number;
}

export interface PricingApplied {
    product_id: number;
    discount_type: 0 | 1 | 2;
    discount_value: string;
    key?: string | false;

    [key: string]: any;
}

export interface IModuleLogic {
    // properties
    firstLoad: boolean;
    // methods
    getAppliedRules(isCartItem?: boolean): Promise<PricingApplied[]>;
    getModifiedPrice(price: string | number, type: 0 | 1 | 2, value: string | number): Promise<number>;
}

export default interface IModuleCP extends IModule {
    configData: any[];
    plConfigData: any[];

    customSettings: any;
    logic: IModuleLogic;
}
