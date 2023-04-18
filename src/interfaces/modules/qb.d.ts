import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleQB extends IModule {
    logic: IModuleLogic;
}
