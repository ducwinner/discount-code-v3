/**
 * Te utilities, which executes on storefront
 */
export interface TeUtils {
    selector: string;
}

/**
 * Te object
 */
export type Te = {
    code: `te`;
    status: boolean;
} & {
    // Uploaded from API
} & {
    utils: TeUtils;
};
