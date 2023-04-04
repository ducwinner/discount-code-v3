import * as Page from './aspects/page';
import Hook from './hooks';
import { PriceFlowPreAction_Setup, PriceFlowPreFilter_CustomAttr } from './hooks/runner';
import detector from './utils/detector';

class Runner extends Hook {

    private runPriceFlow() {
        // pre-hook
        this.execAction('PriceFlow/Pre');
        const customAttr = this.execFilter('PriceFlowPre', null);
        // core
        const productIds = detector.detectProducts(customAttr);
        // post-hook
    }

    private runCustomerFlow() {
        //
    }

    run() {
        window.BSS_B2B.log('run script');
        Page.init();
        Promise.allSettled([
            this.runPriceFlow(),
            this.runCustomerFlow(),
        ]);
    }
}

function run() {
    const runner = new Runner();
    runner.addAction('PriceFlow/Pre', PriceFlowPreAction_Setup, 0);
    runner.addFilter('PriceFlow/Pre', PriceFlowPreFilter_CustomAttr, 0);
    runner.run();  
}

export { run };
