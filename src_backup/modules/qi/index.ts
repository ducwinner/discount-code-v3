import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleQI } from "../../types/modules/qi";
export default class ModuleQI extends Hook implements IModuleQI {
    readonly code: ModuleCode = `qi`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
