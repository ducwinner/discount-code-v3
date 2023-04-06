import { IModule } from "../interfaces";

export interface IModuleLogic {
    // properties

    // methods
}
export default interface IModuleRF extends IModule {
    logic: IModuleLogic;
}
