import ModuleLogic from "./Logic.class";

export default async function initRF(): Promise<void> {
    window.BSS_B2B.modules.rf.logic = new ModuleLogic();
}
