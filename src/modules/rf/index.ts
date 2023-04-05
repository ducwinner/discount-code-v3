import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleRF } from "../../types/modules/rf";
export default class ModuleRF extends Hook implements IModuleRF {
    readonly code: ModuleCode = `rf`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
