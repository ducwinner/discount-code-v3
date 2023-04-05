import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleEF } from "../../types/modules/ef";

export default class ModuleBOGO extends Hook implements IModuleEF {
    readonly code: ModuleCode = `ef`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
