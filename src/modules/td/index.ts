import { TdCore } from './core';

export default async function initTD(): Promise<void> {
    window.BSS_B2B.td.utils = new TdCore();
}
