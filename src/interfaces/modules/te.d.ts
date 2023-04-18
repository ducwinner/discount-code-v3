import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    selector: string;
    // methods
}
export default interface IModuleTE extends IModule {
    logic: IModuleLogic;
}
