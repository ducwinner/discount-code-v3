import { CpCore } from './core';

export default async function initCP(): Promise<void> {
    window.BSS_B2B.cp.utils = new CpCore();
}
