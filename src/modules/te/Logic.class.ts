import Hookable from '@/Hookable.class';
import { IModuleLogic } from '@/interfaces/modules/te';

export default class ModuleLogic extends Hookable implements IModuleLogic {
    selector = `.bss-b2b-tax-ex-wrapper`;
}
