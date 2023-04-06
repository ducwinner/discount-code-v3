import { IModule } from '../interfaces';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleEF extends IModule {
    logic: IModuleLogic;
}
