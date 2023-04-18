import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleOL extends IModule {
    logic: IModuleLogic;
}
