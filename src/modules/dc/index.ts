import { DcCore } from './core';

export default async function initDC(): Promise<void> {
    window.BSS_B2B.dc.utils = new DcCore();
}
