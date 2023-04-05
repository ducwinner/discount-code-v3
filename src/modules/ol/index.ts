import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleOL } from "../../types/modules/ol";

export default class ModuleOL extends Hook implements IModuleOL {
    readonly code: ModuleCode = `ol`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
