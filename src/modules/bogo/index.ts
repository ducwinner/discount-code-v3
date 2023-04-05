import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleBOGO } from "../../types/modules/bogo";

export default class ModuleBOGO extends Hook implements IModuleBOGO {
    readonly code: ModuleCode = `bogo`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
