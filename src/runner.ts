import * as Page from './aspects/page';
import Hook from './hooks';
import { prePriceFlow } from './hooks/runner';

class Runner extends Hook {

    private runPriceFlow() {
        // pre-hook
        this.execAction('pre/priceFlow');
        // core
        
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
    runner.addAction('pre/priceFlow', prePriceFlow, 0);
    runner.run();  
}

export { run };
