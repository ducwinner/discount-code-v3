import { AsyncFunction, HookOptions, IHookable } from "../types/interfaces";

export default function installHook(input: IHookable) {
    input.actions = input.actions || {};
    input.filters = input.filters || {};
    input.statics = input.statics || {};

    input.setActionOptions = function (tag:string , options: HookOptions) {
        input.actions[tag] = input.actions[tag] || {
            options,
            callbacks: input.actions[tag].callbacks || []
        }
    }

    input.addAction = function (tag: string, callback: AsyncFunction, priority: number) {
        input.actions[tag] = this.actions[tag] || {
            options: false,
            callbacks: [],
        };
        input.actions[tag][`callbacks`][priority].push(callback);
    }
    input.execAction = async function (tag: string, ...args: any[]) {
        if (typeof input.actions[tag] !== `undefined` && input.actions[tag].callbacks.length > 0) {
            for (const priorities of input.actions[tag].callbacks) {
                if (input.actions[tag].options) {
                    await Promise.allSettled(priorities.map(callback => callback(...args)));
                } else {
                    for (const callback of priorities) {
                        await callback(...args);
                    }
                }
            }
        }
    }

    input.addFilter = function (tag: string, callback: AsyncFunction, priority: number) {
        input.filters[tag] = this.actions[tag] || {
            callbacks: [],
        };
        input.filters[tag][`callbacks`][priority].push(callback);
    }
    input.execFilter = async function (tag: string, value: any, ...args: any[]) {
        if (typeof input.filters[tag] !== `undefined` && input.filters[tag].callbacks.length > 0) {
            for (const priorities of input.filters[tag].callbacks) {
                for (const callback of priorities) {
                    value = await callback(...args);
                }
            }
        }
        return value;
    }

    input.addStatic = function (tag: string, callback: AsyncFunction, storeId: number) {
        input.statics[tag] = this.statics[tag] || {
            callbacks: [],
        };
        input.statics[tag][`callbacks`][storeId].push(callback);
    }
    input.execStatic = async function (tag: string, value: any, ...args: any[]) {
        const storeId = window.BSS_B2B.storeId;
        if (typeof input.statics[tag] !== `undefined` && input.statics[tag].callbacks.length > 0
            && typeof input.statics[tag].callbacks[storeId] !== `undefined`
            && input.statics[tag].callbacks[storeId].length > 0
        ) {
            for (const callback of input.statics[tag].callbacks[storeId]) {
                value = await callback(...args);
            }
        }
        return value;
    }
}
