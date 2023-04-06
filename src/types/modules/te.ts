import { IModule } from "../interfaces";

export interface IModuleLogic {
    // properties
    selector: string;
    // methods
}
export default interface IModuleTE extends IModule {
    logic: IModuleLogic;
}
