import { RuleInfo, DiscountType } from './_rule';

type Discount = {
    discount_type: DiscountType;
    discount_value: string;
};

export type PricingApplied = {
    product_id: number;
    key?: string | false;
    name?: string;
    product_name?: string;
} & Discount;

export type CpRule = {
    id: number;
    product_condition_type: number;
    product_ids: string | null;
    product_collections: string | null;
    product_tags: string | null;
} & RuleInfo &
    Discount;

export type PlProduct = {
    product_id: string;
} & Discount;

export type PlRule = {
    selected_products: PlProduct[];
} & RuleInfo;

/**
 * Cp utilities, which executes on storefront
 */
export interface CpUtils {
    firstLoad: boolean;

    getAppliedRules(isCartItem?: boolean): Promise<any>;
    getModifiedPrice(price: string | number, type: 0 | 1 | 2, value: string | number): Promise<number>;
}

/**
 * Cp object
 */
export type Cp = {
    code: `cp`;
    status: boolean;
} & {
    // Uploaded from API
    cpRules: any[];
    plRules: any[];

    customSettings: any;
} & {
    utils: CpUtils;
};
