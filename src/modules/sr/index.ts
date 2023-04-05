import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleSR } from "../../types/modules/sr";
export default class ModuleSR extends Hook implements IModuleSR {
    readonly code: ModuleCode = `sr`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
