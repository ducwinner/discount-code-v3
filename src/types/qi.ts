/**
 * Qi utilities, which executes on storefront
 */
export interface QiUtils {}

/**
 * Qi object
 */
export type Qi = {
    code: `qi`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: QiUtils;
};
