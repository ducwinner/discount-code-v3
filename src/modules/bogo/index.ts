import { BogoCore } from './core';

export default async function initBOGO(): Promise<void> {
    window.BSS_B2B.bogo.utils = new BogoCore();
}
