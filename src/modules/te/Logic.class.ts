import Hookable from "../../Hook.class";
import { IModuleLogic } from "../../types/modules/te";

export default class ModuleLogic extends Hookable implements IModuleLogic {
    selector = `.bss-b2b-tax-ex-wrapper`;
}
