/**
 * Ef utilities, which executes on storefront
 */
export interface EfUtils {}

/**
 * Ef object
 */
export type Ef = {
    code: `ef`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: EfUtils;
};
