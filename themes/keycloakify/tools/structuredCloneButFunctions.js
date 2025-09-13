import "./Object.fromEntries";
/**
 * Functionally equivalent to structuredClone but
 * functions are not cloned but kept as is.
 * (as opposed to structuredClone that chokes if it encounters a function)
 */
export function structuredCloneButFunctions(o) {
    if (!(o instanceof Object)) {
        return o;
    }
    if (typeof o === "function") {
        return o;
    }
    if (o instanceof Array) {
        return o.map(structuredCloneButFunctions);
    }
    return Object.fromEntries(Object.entries(o).map(([key, value]) => [key, structuredCloneButFunctions(value)]));
}
//# sourceMappingURL=structuredCloneButFunctions.js.map