import ModuleLogic from './Logic.class';

export default async function initBOGO(): Promise<void> {
    window.BSS_B2B.modules.bogo.logic = new ModuleLogic();
}
