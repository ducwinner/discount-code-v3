import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleMC } from "../../types/modules/mc";

export default class ModuleMC extends Hook implements IModuleMC {
    readonly code: ModuleCode = `mc`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}

