export type PromiseSettledAndPartitioned<T> = [T[], any[]];
export declare function partitionPromiseSettledResults<T>(): readonly [([successes, failures]: PromiseSettledAndPartitioned<T>, item: PromiseSettledResult<T>) => PromiseSettledAndPartitioned<T>, PromiseSettledAndPartitioned<T>];
