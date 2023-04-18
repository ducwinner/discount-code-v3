import { AppProduct } from '@/interfaces/app';
import { CpRule, Information, Options, PlRule, PricingApplied } from '@/interfaces/modules/cp';

export default async function getAppliedRules(options: Options): Promise<PricingApplied[]> {
    if (!window.BSS_B2B.version || window.BSS_B2B.version === 1) {
        return V1Logic(options);
    } else if (window.BSS_B2B.version === 3) {
        return V3Logic(options);
    }
}

async function V1Logic(options: Options): Promise<PricingApplied[]> {
    const cp = window.BSS_B2B.modules.cp;
    if (cp.status && ((cp.configData && cp.configData.length) || (cp.plConfigData && cp.plConfigData.length))) {
        const ruleList = window.BSS_B2B.configData as CpRule[];
        const plRuleList = window.BSS_B2B.plConfigData as PlRule[];
        const listStoreId = [918, 2709, 3918];
        const checkUnique = new Map<number, PricingApplied>();
        plRuleList.forEach((rule) => checkAppliedPLRule(rule, checkUnique, !!options.isCartItem));
        ruleList.forEach((rule) => checkAppliedCpRule(rule, checkUnique, !!options.isCartItem));

        return Array.from(checkUnique.values());
    } else {
        return [];
    }
}

function convertCartItemKey(productId: number): string | false {
    return window.BSS_B2B.cart.get(productId) ?? false;
}

function checkExcludedCustomer(rule: Information): boolean {
    const customer = window.BSS_B2B.shopData.customer;
    const excludeFrom = rule.exclude_from;
    const excludeCustomerTags = rule.exc_customer_tags;
    const excludeCustomers = rule.exc_customers;
    let result = false;
    if (excludeFrom === 1) {
        if (!!excludeCustomerTags && !!customer.tags && customer.tags.length) {
            const checkArray = excludeCustomerTags
                .split(`,`)
                .filter((tag) => customer.tags.includes(tag.toLowerCase()));
            if (checkArray.length > 0) {
                result = true;
            }
        }
    } else if (excludeFrom === 2) {
        if (excludeCustomers && !!customer.id && excludeCustomers.includes(`${customer.id}`)) {
            result = true;
        }
    }
    return result;
}

function checkAppliedCustomer(rule: Information): boolean {
    const applyTo = rule.apply_to;
    const customer = window.BSS_B2B.shopData.customer;
    let result = true;
    // if (applyTo == 0) {
    //
    // } else
    if (applyTo === 1) {
        if (customer.id === null) {
            // if (listStoreId.indexOf(BSS_B2B.storeId) !== -1) {
            //     //fix orantek and wilberrys by vitu
            //     BSS_B2B.printSaveTo(shopData)
            // }
            result = false;
        }
    } else if (applyTo === 2) {
        if (customer.id !== null) {
            result = false;
        } else {
            // if (listStoreId.indexOf(BSS_B2B.storeId) !== -1) {
            //     //fix orantek and wilberrys by vitu
            //     BSS_B2B.printSaveTo(shopData)
            // }
        }
    } else if (applyTo === 3) {
        if (customer.id === null) {
            // if (listStoreId.indexOf(BSS_B2B.storeId) !== -1) {
            //     //fix orantek and wilberrys by vitu
            //     BSS_B2B.printSaveTo(shopData)
            // }
            result = false;
        } else {
            const customerIds = rule.customer_ids ? rule.customer_ids.split(`,`) : [];
            if (customerIds.indexOf(`` + customer.id) === -1) {
                result = false;
            }
        }
    } else if (applyTo === 4) {
        if (customer.tags === null) {
            // if (listStoreId.indexOf(BSS_B2B.storeId) !== -1) {
            //     //fix orantek and wilberrys by vitu
            //     BSS_B2B.printSaveTo(shopData)
            // }
            result = false;
        } else {
            const customerTags = rule.customer_tags.split(`,`).map((tag) => tag.toLowerCase());
            customer.tags = customer.tags.map((tag) => tag.toLowerCase());
            const checkArray = customerTags.filter((tag) => customer.tags.includes(tag + ``));
            if (checkArray.length === 0) {
                // if (listStoreId.indexOf(BSS_B2B.storeId) !== -1) {
                //     //fix orantek and wilberrys by vitu
                //     BSS_B2B.printSaveTo(shopData)
                // }
                result = false;
            }
        }
    }
    return result;
}

function checkAppliedDate(rule: Information) {
    let result = true;
    const startDate = rule.start_date;
    const endDate = rule.end_date;
    const currentDate = new Date();
    if (startDate && currentDate < new Date(startDate)) {
        result = false;
    }
    if (endDate && currentDate > new Date(endDate)) {
        result = false;
    }
    return result;
}

function checkAppliedPLRule(rule: PlRule, checkUnique: Map<number, PricingApplied>, isCartItem?: boolean) {
    if (checkExcludedCustomer(rule)) {
        return;
    }

    if (!checkAppliedCustomer(rule)) {
        return;
    }

    if (!checkAppliedDate(rule)) {
        return;
    }

    for (const [key] of window.BSS_B2B.products) {
        const filtered = rule.selected_products.filter((product) => {
            const productId = +product.product_id;
            return productId === key && !checkUnique.get(productId);
        });
        if (filtered.length > 0) {
            checkUnique.set(key, {
                product_id: key,
                discount_type: filtered[0].discount_type,
                discount_value: filtered[0].discount_value,
                key: !!isCartItem ? convertCartItemKey(key) : false,
                name: rule.name,
            });
        }
    }
}

function checkAppliedCpRule(rule: CpRule, checkUnique: Map<number, PricingApplied>, isCartItem?: boolean) {
    if (checkExcludedCustomer(rule)) {
        return;
    }

    if (!checkAppliedCustomer(rule)) {
        return;
    }

    if (!checkAppliedDate(rule)) {
        return;
    }

    const productCondition = rule.product_condition_type;
    function setAppliedRule(productId: number, product: AppProduct) {
        checkUnique.set(productId, {
            product_id: productId,
            discount_type: rule.discount_type,
            discount_value: rule.discount_value,
            key: !!isCartItem ? convertCartItemKey(productId) : false,

            name: rule.name,
            product_name: product.product_name,
        });
    }
    for (const [key, value] of window.BSS_B2B.products) {
        if (!checkUnique.get(key)) {
            if (productCondition === 0) {
                setAppliedRule(key, value);
            } else if (productCondition === 1) {
                const productIds = rule.product_ids ? rule.product_ids.split(`,`) : [];
                if (productIds.indexOf(`` + key) !== -1) {
                    setAppliedRule(key, value);
                }
            } else if (productCondition === 2) {
                const productCollections = rule.product_collections ? rule.product_collections.split(`,`) : [];
                const checkArray = (value.collections || []).filter((collection) =>
                    productCollections.includes(`` + collection)
                );
                if (checkArray.length > 0) {
                    setAppliedRule(key, value);
                }
            } else if (productCondition === 3) {
                const productTags = rule.product_tags
                    ? rule.product_tags.split(`,`).map((tag) => tag.toLowerCase())
                    : [];
                const checkArray = (value.tags || []).filter((tag) => productTags.includes(tag.toLowerCase()));
                if (checkArray.length > 0) {
                    setAppliedRule(key, value);
                }
            }
        }
    }
}

async function V3Logic(options: Options): Promise<PricingApplied[]> {
    console.log(options.isCartItem);
    try {
        const response = await fetch(
            `${window.bssB2bApiServer}/v3/public/applied-rules?domain=${window.Shopify.shop}`,
            {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`,
                },
                body: JSON.stringify({
                    domain: window.Shopify.shop,
                    module: `cp`,
                    customer_id: !!window.__st.cid ? window.__st.cid : 0,
                    product_ids: Array.from(window.BSS_B2B.products.keys()),
                }),
            }
        );
        const json = await response.json();
        if (json[`statusCode`] === 200) {
            return (json[`payload`] as any[]).map((item) => {
                return {
                    product_id: Number(item.product_id),
                    discount_type: item.pricing_rule.discount_type,
                    discount_value: item.pricing_rule.discount_value,
                    key: !!options.isCartItem ? convertCartItemKey(Number(item.product_id)) : false,
                };
            }) as PricingApplied[];
        } else {
            window.BSS_B2B.log(`/sync/applied-rules return not ok`);
            return [];
        }
    } catch (e) {
        window.BSS_B2B.log(e);
        return [];
    }
}
