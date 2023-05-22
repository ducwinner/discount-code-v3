/**
 * Td utilities, which executes on storefront
 */
export interface TdUtils {
    taxOverridesByCountryCode: any;
    taxOverridesRestOfWorld: any;
}

/**
 * Td object
 */
export type Td = {
    code: `td`;
    status: boolean;
} & {
    // Uploaded from API
    taxOverrides: any[];
} & {
    utils: TdUtils;
};
