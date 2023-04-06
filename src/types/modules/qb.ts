import { IModule } from "../interfaces";

export interface IModuleLogic {
    // properties

    // methods
}
export default interface IModuleQB extends IModule {
    logic: IModuleLogic;
}
