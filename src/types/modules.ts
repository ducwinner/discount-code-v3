export type AnyFunction = (...args: any[]) => any;
export type HookActions = {
    [tag: string]: Array<AnyFunction[]>;
};

export interface HookFilters {
    [tag: string]: Array<AnyFunction[]>;
}

export interface HookStatics {
    [tag: string]: Array<AnyFunction[]>;
}

export interface Hook {
    actions: HookActions;
    filters: HookFilters;
}
export interface Module {
    readonly code: string;
    hooks?: Hook;
    status: boolean;
}

export type BOGO = Module;

export interface CPRule {
    product_id: number | string;
    discount_type: number;
    discount_value: number;
}
export interface CP extends Module {
    firstLoad: boolean;

    rules?: any[];
    settings: any;
    customSettings?: any | null;

    getAppliedRules?: (customerId: string | number, productIds: Array<string | number>) => Promise<CPRule[]>;

    [key: string]: any;
}

export interface DC extends Module {
    rules?: any[];

    getAppliedCodes: () => void;
    handleRemoveCode: () => void;
    showBox: () => void;
}

export type EF = Module;

export interface MC extends Module {
    currencyConfig?: {
        auto_location: boolean;

        show_on_mobile: boolean;
        show_on_desktop: boolean;

        [key: string]: any;
    };

    onLoad?: () => void;
}

export type OL = Module;

export interface QB extends Module {
    rules?: any[];
}

export type QI = Module;

export type RF = Module;

export type SR = Module;

export interface TDTaxOverride {
    country_code: string;

    [key: string]: any;
}
export interface TD extends Module {
    taxOverrides?: TDTaxOverride[] | null;
    taxOverridesByCountryCode?: TDTaxOverride[];
    taxOverridesRestOfWorld?: TDTaxOverride[];
}

export interface TE extends Module {
    selector: string;
}
