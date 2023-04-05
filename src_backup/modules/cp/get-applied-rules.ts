import { BSSB2BVersion } from '../../types';
import { OldOptions, Options, V3Options } from '../../types/common';
import { PriceCP } from '../../types/modules/cp';


type ILogic = {
    [key in BSSB2BVersion]: (options: Options) => Promise<PriceCP[]>;
};

const Logic: ILogic = {
    [1]: OldLogic,
    [3]: V3Logic,
};

export default async function getAppliedRules(options: Options): Promise<PriceCP[]> {
    return Logic[window.BSS_B2B.version](options);
}

async function OldLogic(options: OldOptions): Promise<PriceCP[]> {
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
