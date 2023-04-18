import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleEF extends IModule {
    logic: IModuleLogic;
}
