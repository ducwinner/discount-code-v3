import ModuleLogic from "./Logic.class";

export default async function initOL(): Promise<void> {
    window.BSS_B2B.modules.ol.logic = new ModuleLogic();
}
