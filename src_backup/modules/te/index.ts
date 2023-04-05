import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleTE } from "../../types/modules/te";

export default class ModuleTE extends Hook implements IModuleTE {
    readonly code: ModuleCode = `te`;
    status: boolean;
    
    selector = `.bss-b2b-tax-ex-wrapper`;

    constructor(status?: boolean) {
        super();
        this.status = !!status;
    }

    async init(): Promise<void> {
        throw new Error(`Method not implemented.`);
    }

}
