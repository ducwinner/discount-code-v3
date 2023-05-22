/**
 * Bogo utilities, which executes on storefront
 */
export interface BogoUtils {
    //
}

/**
 * Bogo object
 */
export type Bogo = {
    code: `bogo`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: BogoUtils;
};
