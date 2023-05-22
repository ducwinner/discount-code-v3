import Hookable from '@/Hookable';
import { CpUtils } from '@/types';
import getAppliedRules from './get-applied-rules';
import getModifiedPrice from './get-modified-price';

export class CpCore extends Hookable implements CpUtils {
    firstLoad: boolean;

    constructor() {
        super();
        this.firstLoad = false;
    }

    async getAppliedRules(isCartItem?: boolean): Promise<any[]> {
        return getAppliedRules({ isCartItem: !!isCartItem });
    }

    async getModifiedPrice(price: number, type: 0 | 1 | 2, value: number): Promise<number> {
        return getModifiedPrice(price, type, value);
    }
}
