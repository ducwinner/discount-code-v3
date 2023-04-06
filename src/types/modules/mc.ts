import { IModule } from "../interfaces";

export interface IModuleLogic {
    // properties

    // methods
}
export default interface IModuleMC extends IModule {
    logic: IModuleLogic;
}
