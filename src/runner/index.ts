import PriceFlow from './PriceFlow';
import CustomerFlow from './CustomerFlow';

export async function run() {
    window.BSS_B2B.log(`run flows`);
    return Promise.allSettled([PriceFlow.getIns().execute(), CustomerFlow.getIns().execute()]);
}
