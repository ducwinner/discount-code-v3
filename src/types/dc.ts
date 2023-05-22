/**
 * Dc utilities, which executes on storefront
 */
export interface DcUtils {
    getAppliedCodes(): Promise<any>;
    handleRemoveCode(): Promise<any>;
    showBox(): Promise<any>;
}

/**
 * Dc object
 */
export type Dc = {
    code: `dc`;
    status: boolean;
} & {
    // Uploaded from API
    rules: any[];
} & {
    utils: DcUtils;
};
