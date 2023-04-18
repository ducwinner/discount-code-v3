import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleSR extends IModule {
    logic: IModuleLogic;
}
