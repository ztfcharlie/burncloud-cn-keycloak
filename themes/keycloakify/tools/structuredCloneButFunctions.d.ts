import "./Object.fromEntries";
/**
 * Functionally equivalent to structuredClone but
 * functions are not cloned but kept as is.
 * (as opposed to structuredClone that chokes if it encounters a function)
 */
export declare function structuredCloneButFunctions<T>(o: T): T;
