import { IModule } from '../global';

export interface IModuleLogic {
    // properties

    // methods
    getAppliedCodes(): Promise<any>;
    handleRemoveCode(): Promise<any>;
    showBox(): Promise<any>;
}
export default interface IModuleDC extends IModule {
    rules: any[];
    logic: IModuleLogic;
}
