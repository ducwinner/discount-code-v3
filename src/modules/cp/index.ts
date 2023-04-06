import ModuleLogic from "./Logic.class";

export default async function initCP(): Promise<void> {
    window.BSS_B2B.modules.cp.logic = new ModuleLogic();
}
