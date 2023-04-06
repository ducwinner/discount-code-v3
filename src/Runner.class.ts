import Detector from './Detector.class';
import Hookable from './Hook.class';
import Page from './Page.class';
import { PriceFlowPreAction_Setup, PriceFlowPreFilter_CustomAttr } from './hooks/add-ons/runner';

export default class Runner extends Hookable {
    public static instance: Runner;
    private constructor() {
        super();
    }
    public static getInstance(): Runner {
        if (!Runner.instance) {
            Runner.instance = new Runner();
            Runner.instance.addAction(`PriceFlow/Pre`, PriceFlowPreAction_Setup, 0);
            Runner.instance.addFilter(`PriceFlow/Pre`, PriceFlowPreFilter_CustomAttr, 0);
            window.BSS_B2B.log(`run script`);
            window.BSS_B2B.page = new Page();
        }
        return Runner.instance;
    }

    private async runPriceFlow() {
        // pre-hook
        this.execAction(`PriceFlow/Pre`);
        const customAttr = await this.execFilter(`PriceFlowPre`, null);
        // core
        const productIds = Detector.getInstance().detectProducts(customAttr);
        console.log(productIds);
        // post-hook
    }

    private runCustomerFlow() {
        //
    }

    public async run() {
        return Promise.allSettled([ this.runPriceFlow(), this.runCustomerFlow()]);
    }
}
