import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleQI extends IModule {
    logic: IModuleLogic;
}
