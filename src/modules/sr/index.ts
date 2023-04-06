import ModuleLogic from "./Logic.class";

export default async function initSR(): Promise<void> {
    window.BSS_B2B.modules.sr.logic = new ModuleLogic();
}
