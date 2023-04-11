import { Options, PriceCP } from '../../types/modules/cp';

export default async function getAppliedRules(options: Options): Promise<PriceCP[]> {
    if (window.BSS_B2B.version === 1) {
        return V1Logic(options);
    } else if (window.BSS_B2B.version === 3) {
        return V3Logic(options);
    }
}

async function V1Logic(options: Options): Promise<PriceCP[]> {
    const cp = window.BSS_B2B.modules.cp;
    if (cp.status && ((cp.configData && cp.configData.length) || (cp.plConfigData && cp.plConfigData.length))) {
        console.log(options.isCartItem);
        return [];
    } else {
        return [];
    }
}
async function V3Logic(options: Options): Promise<PriceCP[]> {
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
                };
            }) as PriceCP[];
        } else {
            window.BSS_B2B.log(`/sync/applied-rules return not ok`);
            return [];
        }
    } catch (e) {
        window.BSS_B2B.log(e);
        return [];
    }
}
