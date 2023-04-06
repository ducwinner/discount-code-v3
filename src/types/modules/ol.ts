import { IModule } from '../interfaces';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleOL extends IModule {
    logic: IModuleLogic;
}
