export type ModuleCode = `bogo` | `cp` | `dc` | `ef` | `mc` | `ol` | `qb` | `qi` | `rf` | `sr` | `td` | `te`;
export interface IModule {
    readonly code: ModuleCode;
    status: boolean;
    init(): Promise<void>;
}
