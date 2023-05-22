import { EfCore } from './core';

export default async function initEF(): Promise<void> {
    window.BSS_B2B.ef.utils = new EfCore();
}
