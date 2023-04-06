import ModuleLogic from './Logic.class';

export default async function initTD(): Promise<void> {
    window.BSS_B2B.modules.td.logic = new ModuleLogic();
}
