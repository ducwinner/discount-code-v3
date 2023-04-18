import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    taxOverridesByCountryCode: any;
    taxOverridesRestOfWorld: any;
    // methods
}
export default interface IModuleTD extends IModule {
    taxOverrides: any[];

    logic: IModuleLogic;
}
