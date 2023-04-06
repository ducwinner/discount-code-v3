import ModuleLogic from "./Logic.class";

export default async function initMC(): Promise<void> {
    window.BSS_B2B.modules.mc.logic = new ModuleLogic();
}
