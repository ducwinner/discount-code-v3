
export interface Product {
    id: number;
    originalPrice: string;
    compareAtPrice: string;
    minPrice: string;
    maxPrice: string;
    minCompareAtPrice: string;
    maxCompareAtPrice: string;
    variants: Variant[];
    selector: Element;
    
    appliedCP?: any;
    appliedQB?: any;
}

export interface Variant {
    id: number;
    product_id: number;
}
