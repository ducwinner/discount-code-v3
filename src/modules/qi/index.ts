import ModuleLogic from "./Logic.class";

export default async function initQI(): Promise<void> {
    window.BSS_B2B.modules.qi.logic = new ModuleLogic();
}
