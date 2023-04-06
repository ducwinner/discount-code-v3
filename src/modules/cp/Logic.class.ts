import Hookable from '../../Hook.class';
import { IModuleLogic, PriceCP } from '../../types/modules/cp';
import getAppliedRules from './get-applied-rules';

export default class ModuleLogicCP extends Hookable implements IModuleLogic {
    firstLoad: boolean;

    constructor() {
        super();
        this.firstLoad = false;
    }

    async getAppliedRules(isCartItem?: boolean): Promise<PriceCP[]> {
        return getAppliedRules({ isCartItem: !!isCartItem });
    }
}
