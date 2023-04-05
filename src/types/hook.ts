export type AnyFunction = (...args: any[]) => any;
export type HookActions = {
    [tag: string]: Array<AnyFunction[]>;
};

export type HookFilters = {
    [tag: string]: Array<AnyFunction[]>;
};

export type HookStatics = {
    [tag: string]: Array<AnyFunction[]>;
};

export class Hook {
    actions: HookActions = {};
    filters: HookFilters = {};
    statics: HookStatics = {};

    public addStatic(tag: string, callback: AnyFunction, storeId: number) {
        this.statics[tag] = this.statics[tag] || [];
        this.statics[tag][storeId] = this.statics[tag][storeId] || [];
        this.statics[tag][storeId].push(callback);
    }

    public execStatic(tag: string, value: any, ...args: any[]) {
        if (
            typeof this.statics[tag] !== `undefined` &&
            typeof this.statics[tag][window.BSS_B2B.storeId] !== `undefined`
        ) {
            const callbacks = this.statics[tag][window.BSS_B2B.storeId];
            if (callbacks.length > 0) {
                callbacks.forEach((callback) => {
                    value = callback(...args);
                });
            }
        }
        return value;
    }

    public addAction(tag: string, callback: AnyFunction, priority?: number) {
        if (typeof priority === `undefined`) {
            priority = 10;
        }

        this.actions[tag] = this.actions[tag] || [];
        this.actions[tag][priority] = this.actions[tag][priority] || [];
        this.actions[tag][priority].push(callback);
    }

    public execAction(tag: string, ...args: any[]) {
        if (typeof this.actions[tag] !== `undefined` && this.actions[tag].length > 0) {
            this.actions[tag].forEach(function (priorities) {
                priorities.forEach(function (callback) {
                    if (typeof callback === `function`) {
                        callback(...args);
                    }
                });
            });
        }
    }

    public removeAction(tag: string, callback: AnyFunction) {
        this.actions[tag] = this.actions[tag] || [];
        this.actions[tag].forEach((priorities, i) => {
            priorities.forEach((_callback, j) => {
                if (_callback === callback) {
                    this.actions[tag][i].splice(j, 1);
                }
            });
        });
    }

    public addFilter(tag: string, callback: AnyFunction, priority?: number) {
        if (typeof priority === `undefined`) {
            priority = 10;
        }

        this.filters[tag] = this.filters[tag] || [];
        this.filters[tag][priority] = this.filters[tag][priority] || [];
        this.filters[tag][priority].push(callback);
    }

    public execFilter(tag: string, value: any, ...args: any[]) {
        if (typeof this.filters[tag] !== `undefined` && this.filters[tag].length > 0) {
            this.filters[tag].forEach(function (priorities) {
                priorities.forEach(function (callback) {
                    if (typeof callback === `function`) {
                        value = callback(...args);
                    }
                });
            });
        }
        return value;
    }

    public removeFilter(tag: string, callback: AnyFunction) {
        this.filters[tag] = this.filters[tag] || [];
        this.filters[tag].forEach((priorities, i) => {
            priorities.forEach((_callback, j) => {
                if (_callback === callback) {
                    this.filters[tag][i].splice(j, 1);
                }
            });
        });
    }
}