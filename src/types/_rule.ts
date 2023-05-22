export type RuleInfo = {
    name: string;
    priority: number;
    apply_to: number;
    customer_ids: string | null;
    customer_tags: string | null;
    start_date: string | null;
    end_date: string | null;
    exc_customer_tags: string | null;
    exc_customers: string | null;
    exclude_from: number | null;
};

export enum DiscountType {
    ApplyFixAmount = 0,
    DecreaseFixAmount = 1,
    DecreasePercentage = 2,
}
