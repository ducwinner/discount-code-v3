import { IModule } from "../interfaces";

export interface IModuleLogic {
    // properties

    // methods
}
export default interface IModuleQI extends IModule {
    logic: IModuleLogic;
}
