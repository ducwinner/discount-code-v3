type Hook = {
    async?: boolean;
    callbacks: Array<AsyncFunction[]>;
};

type AsyncFunction = (...args: any[]) => Promise<any>;

type HookStore = {
    [tag: string]: Hook;
};

export class Hookable {
    protected actions: HookStore = {};
    protected filters: HookStore = {};
    protected statics: HookStore = {};

    protected setActionOptions(tag: string, options: boolean): void {
        this.actions[tag] = this.actions[tag] || {
            async: options,
            callbacks: this.actions[tag].callbacks || [],
        };
    }
    protected addAction(tag: string, callback: AsyncFunction, priority?: number): void {
        this.actions[tag] = this.actions[tag] || {
            async: false,
            callbacks: [],
        };
        this.actions[tag][`callbacks`][priority] = this.actions[tag][`callbacks`][priority] || [];
        this.actions[tag][`callbacks`][priority].push(callback);
    }
    protected async execAction(tag: string, ...args: any[]): Promise<any> {
        if (typeof this.actions[tag] !== `undefined` && this.actions[tag].callbacks.length > 0) {
            for (const priorities of this.actions[tag].callbacks) {
                if (this.actions[tag].async) {
                    await Promise.allSettled(priorities.map((callback) => callback(...args)));
                } else {
                    for (const callback of priorities) {
                        await callback(...args);
                    }
                }
            }
        }
    }

    protected addFilter(tag: string, callback: AsyncFunction, priority?: number): void {
        this.filters[tag] = this.actions[tag] || {
            callbacks: [],
        };
        this.filters[tag][`callbacks`][priority] = this.filters[tag][`callbacks`][priority] || [];
        this.filters[tag][`callbacks`][priority].push(callback);
    }
    protected async execFilter(tag: string, value: any, ...args: any[]): Promise<any> {
        if (typeof this.filters[tag] !== `undefined` && this.filters[tag].callbacks.length > 0) {
            for (const priorities of this.filters[tag].callbacks) {
                for (const callback of priorities) {
                    value = await callback(...args);
                }
            }
        }
        return value;
    }

    protected addStatic(tag: string, callback: AsyncFunction, storeId: number): void {
        this.statics[tag] = this.statics[tag] || {
            callbacks: [],
        };
        this.statics[tag][`callbacks`][storeId] = this.statics[tag][`callbacks`][storeId] || [];
        this.statics[tag][`callbacks`][storeId].push(callback);
    }
    protected async execStatic(tag: string, value: any, ...args: any[]): Promise<any> {
        const storeId = window.BSS_B2B.storeId;
        if (
            typeof this.statics[tag] !== `undefined` &&
            this.statics[tag].callbacks.length > 0 &&
            typeof this.statics[tag].callbacks[storeId] !== `undefined` &&
            this.statics[tag].callbacks[storeId].length > 0
        ) {
            for (const callback of this.statics[tag].callbacks[storeId]) {
                value = await callback(...args);
            }
        }
        return value;
    }
}

export default Hookable;
