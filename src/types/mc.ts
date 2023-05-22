/**
 * Mc utilities, which executes on storefront
 */
export interface McUtils {}

/**
 * Mc object
 */
export type Mc = {
    code: `mc`;
    status: boolean;
} & {
    // Uploaded from API
    currenceyConfig: any;
} & {
    onLoad: () => void;
    utils: McUtils;
};
