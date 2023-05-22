/**
 * Ol utilities, which executes on storefront
 */
export interface OlUtils {}

/**
 * Ol object
 */
export type Ol = {
    code: `ol`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: OlUtils;
};
