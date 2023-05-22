import { RfCore } from './core';

export default async function initRF(): Promise<void> {
    window.BSS_B2B.rf.utils = new RfCore();
}
