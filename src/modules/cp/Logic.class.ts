import Hookable from "../../Hook.class";
import { IModuleLogic } from "../../types/modules/cp";
import getAppliedRules from "./get-applied-rules";

export default class ModuleLogicCP extends Hookable implements IModuleLogic {
    firstLoad: boolean;

    constructor() {
        super();
        this.firstLoad = false;
    }

    async getAppliedRules(productIds: number[]): Promise<any> {
        await getAppliedRules({
            productIds,
            customerId: window.__st.cid,
        });
        return;
    }

}
