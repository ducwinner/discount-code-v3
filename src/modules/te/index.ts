import ModuleLogic from './Logic.class';

export default async function initTE(): Promise<void> {
    window.BSS_B2B.modules.te.logic = new ModuleLogic();
}
