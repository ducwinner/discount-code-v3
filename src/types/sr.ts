/**
 * Sr utilities, which executes on storefront
 */
export interface SrUtils {}

/**
 * Sr object
 */
export type Sr = {
    code: `sr`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: SrUtils;
};
