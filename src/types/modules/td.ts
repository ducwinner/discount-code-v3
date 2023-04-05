import { IModule } from "./_interface";

export interface IModuleTD extends IModule {
    taxOverrides: any[];
    taxOverridesByCountryCode: any;
    taxOverridesRestOfWorld: any;
}