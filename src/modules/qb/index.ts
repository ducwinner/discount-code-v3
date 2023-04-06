import ModuleLogic from "./Logic.class";

export default async function initQB(): Promise<void> {
    window.BSS_B2B.modules.qb.logic = new ModuleLogic();
}
