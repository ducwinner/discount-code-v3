import { IModule } from '../interfaces';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleSR extends IModule {
    logic: IModuleLogic;
}
