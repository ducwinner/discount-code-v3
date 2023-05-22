import Hookable from '@/Hookable';

export default class CustomerFlow extends Hookable {
    public static instance: CustomerFlow;
    private constructor() {
        super();
    }
    public static getIns(): CustomerFlow {
        if (!CustomerFlow.instance) {
            CustomerFlow.instance = new CustomerFlow();
        }
        return CustomerFlow.instance;
    }

    public async execute() {
        // pre-hook
        // core
        // post-hook
    }
}
