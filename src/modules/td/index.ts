import { Hook } from "../../types/hook";
import { ModuleCode } from "../../types/modules/_interface";
import { IModuleTD } from "../../types/modules/td";

export function init() {
    if (!window.BSS_B2B.td.status) {
        return;
    }
    const td = window.BSS_B2B.td;
    if (td.taxOverrides) {
        td.taxOverridesByCountryCode = td.taxOverrides.filter(
            (item) => item.country_code === window.BSS_B2B.countryCode
        );
        td.taxOverridesRestOfWorld = td.taxOverrides.filter((item) => item.country_code === `*`);
    }
}

export default class ModuleTD extends Hook implements IModuleTD {
    readonly code: ModuleCode = `td`;
    status: boolean;

    taxOverrides: any[];
    taxOverridesByCountryCode: any;
    taxOverridesRestOfWorld: any;
    
    constructor(status?: boolean) {
        super();
        this.status = !!status;
        this.taxOverrides = window.BSS_B2B.modules.dc.taxOverrides;
    }

    async init(): Promise<void> {
        if (!this.status) {
            return;
        }
        if (this.taxOverrides) {
            this.taxOverridesByCountryCode = this.taxOverrides.filter(
                (item) => item.country_code === window.BSS_B2B.countryCode
            );
            this.taxOverridesRestOfWorld = this.taxOverrides.filter((item) => item.country_code === `*`);
        }
        throw new Error(`Method not implemented.`);
    }

}
