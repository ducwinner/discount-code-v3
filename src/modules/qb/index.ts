import { QbCore } from './core';

export default async function initQB(): Promise<void> {
    window.BSS_B2B.qb.utils = new QbCore();
}
