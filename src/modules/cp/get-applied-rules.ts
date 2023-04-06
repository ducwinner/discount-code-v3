import { V1Options, Options, PriceCP, V3Options, GetAppliedRulesLogic } from '../../types/modules/cp';
const Logic: GetAppliedRulesLogic = {
    [1]: V1Logic,
    [3]: V3Logic,
};

export default async function getAppliedRules(options: Options): Promise<PriceCP[]> {
    return Logic[window.BSS_B2B.version](options);
}

async function V1Logic(options: V1Options): Promise<PriceCP[]> {
    if (
        window.BSS_B2B.cp.status &&
        window.BSS_B2B.configData && 
        window.BSS_B2B.configData.length &&
        window.BSS_B2B.plConfigData &&
        window.BSS_B2B.plConfigData.length
    ) {
        console.log(options.isCartItem);
        return [];
    } else {
        return [];
    }
}
async function V3Logic(options: V3Options): Promise<PriceCP[]> {
    try {
        const response = await fetch(`http://172.104.45.69:5000/sync/applied-rules`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`,
            },
            body: JSON.stringify({
                customer_id: options.customerId,
                product_ids: options.productIds,
            }),
        });
        const json = await response.json();
        if (json[`statusCode`] === 200) {
            return json[`payload`] as PriceCP[];
        } else {
            window.BSS_B2B.log(`/sync/applied-rules return not ok`);
            return [];
        }
    } catch (e) {
        window.BSS_B2B.log(e);
        return [];
    }
}
