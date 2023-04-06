import ModuleLogic from "./Logic.class";

export default async function initDC(): Promise<void> {
    window.BSS_B2B.modules.dc.logic = new ModuleLogic();
}
