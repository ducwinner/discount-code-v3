import Hookable from '../../Hook.class';
import { IModuleLogic } from '../../types/modules/td';

export default class ModuleLogic extends Hookable implements IModuleLogic {
    taxOverridesByCountryCode: any;
    taxOverridesRestOfWorld: any;

    constructor() {
        super();
        const td = window.BSS_B2B.modules.td;
        if (td.taxOverrides) {
            this.taxOverridesByCountryCode = td.taxOverrides.filter(
                (item) => item.country_code === window.BSS_B2B.countryCode
            );
            this.taxOverridesRestOfWorld = td.taxOverrides.filter((item) => item.country_code === `*`);
        }
    }
}
