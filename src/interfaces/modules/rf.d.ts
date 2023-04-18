import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleRF extends IModule {
    logic: IModuleLogic;
}
