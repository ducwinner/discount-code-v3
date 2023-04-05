import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleCP } from "../../types/modules/cp";
import getAppliedRules from "./get-applied-rules";
export default class ModuleCP extends Hook implements IModuleCP {
    readonly code: ModuleCode = `cp`;
    status: boolean;
    
    firstLoad: boolean;

    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        if (!this.status) {
            return;
        }
        // init here
        this.firstLoad = false;
        return;
    }

    async getAppliedRules(productIds: number[]): Promise<void> {
        //
        await getAppliedRules({
            productIds,
            customerId: window.__st.cid,
        })
        return;
    }
}
