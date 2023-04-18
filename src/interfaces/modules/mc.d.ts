import { IModule } from '../global';

export interface IModuleLogic {
    // properties
    // methods
}
export default interface IModuleMC extends IModule {
    currencyConfig: any;
    onLoad: () => void;

    logic: IModuleLogic;
}
