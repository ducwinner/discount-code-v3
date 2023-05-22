import { OlCore } from './core';

export default async function initOL(): Promise<void> {
    window.BSS_B2B.ol.utils = new OlCore();
}
