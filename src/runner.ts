import Page from './page';
import { IHookable } from './types/interfaces';
import installHook from './utils/installHook';

interface IRunner extends IHookable {
    runPriceFlow(): Promise<void>;
    runCustomerFlow(): void;
}
const Runner: IRunner = {
    async runPriceFlow() {
        // pre-hook
        this.execAction(`PriceFlow/Pre`);
        const customAttr = this.execFilter(`PriceFlowPre`, null);
        // core
        const productIds = detector.detectProducts(customAttr);
        console.log(productIds);
        // post-hook
    },
    runCustomerFlow() {
        //
    },
}

export function run() {
    installHook(Runner);
    Runner.addAction(`PriceFlow/Pre`, PriceFlowPreAction_Setup, 0);
    Runner.addFilter(`PriceFlow/Pre`, PriceFlowPreFilter_CustomAttr, 0);
    
    window.BSS_B2B.log(`run script`);
    window.BSS_B2B.page = Page;
    Promise.allSettled([ Runner.runPriceFlow(), Runner.runCustomerFlow()]);
}
