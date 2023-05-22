import { QiCore } from './core';

export default async function initQI(): Promise<void> {
    window.BSS_B2B.qi.utils = new QiCore();
}
