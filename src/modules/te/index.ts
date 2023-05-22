import { TeCore } from './core';

export default async function initTE(): Promise<void> {
    window.BSS_B2B.te.utils = new TeCore();
}
