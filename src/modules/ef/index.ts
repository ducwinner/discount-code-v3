import ModuleLogic from "./Logic.class";

export default async function initEF(): Promise<void> {
    window.BSS_B2B.modules.ef.logic = new ModuleLogic();
}
