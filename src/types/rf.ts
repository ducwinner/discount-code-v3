/**
 * Rf utilities, which executes on storefront
 */
export interface RfUtils {}

/**
 * Rf object
 */
export type Rf = {
    code: `rf`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: RfUtils;
};
