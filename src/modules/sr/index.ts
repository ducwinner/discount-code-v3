import { SrCore } from './core';

export default async function initSR(): Promise<void> {
    window.BSS_B2B.sr.utils = new SrCore();
}
