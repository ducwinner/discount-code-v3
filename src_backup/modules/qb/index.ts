import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleQB } from "../../types/modules/qb";

export default class ModuleQB extends Hook implements IModuleQB {
    readonly code: ModuleCode = `qb`;
    status: boolean;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
