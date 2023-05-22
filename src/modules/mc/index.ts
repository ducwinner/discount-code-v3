import { McCore } from './core';

export default async function initMC(): Promise<void> {
    window.BSS_B2B.mc.utils = new McCore();
    window.BSS_B2B.mc.onLoad = function () {
        console.log(`ok`);
    };
}
