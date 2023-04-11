import Hookable from '../../Hook.class';
import { IModuleLogic, PriceCP } from '../../types/modules/cp';
import getAppliedRules from './get-applied-rules';
import getModifiedPrice from './get-modified-price';

export default class ModuleLogicCP extends Hookable implements IModuleLogic {
    firstLoad: boolean;

    constructor() {
        super();
        this.firstLoad = false;
    }

    async getAppliedRules(isCartItem?: boolean): Promise<PriceCP[]> {
        return getAppliedRules({ isCartItem: !!isCartItem });
    }

    async getModifiedPrice(price: number, type: 0 | 1 | 2, value: number): Promise<number> {
        return getModifiedPrice(price, type, value);
    }
}
