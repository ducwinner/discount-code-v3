/**
 * Qb utilities, which executes on storefront
 */
export interface QbUtils {}

/**
 * Qb object
 */
export type Qb = {
    code: `qb`;
    status: boolean;
} & {
    // Uploaded from API
    rules: any[];
} & {
    utils: QbUtils;
};
