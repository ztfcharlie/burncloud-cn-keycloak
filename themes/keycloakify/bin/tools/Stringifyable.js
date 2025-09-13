import { z } from "zod";
import { same } from "evt/tools/inDepth/same";
import { assert } from "tsafe/assert";
import { id } from "tsafe/id";
export const zStringifyableAtomic = (() => {
    const zTargetType = z.union([z.string(), z.number(), z.boolean(), z.null()]);
    assert();
    return id(zTargetType);
})();
export const zStringifyable = z
    .any()
    .superRefine((val, ctx) => {
    const isStringifyable = same(JSON.parse(JSON.stringify(val)), val);
    if (!isStringifyable) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Not stringifyable"
        });
    }
});
export function getIsAtomic(stringifyable) {
    return (["string", "number", "boolean"].includes(typeof stringifyable) ||
        stringifyable === null);
}
export const { getValueAtPath } = (() => {
    function getValueAtPath_rec(stringifyable, path) {
        if (path.length === 0) {
            return stringifyable;
        }
        if (getIsAtomic(stringifyable)) {
            return undefined;
        }
        const [first, ...rest] = path;
        let dereferenced;
        if (stringifyable instanceof Array) {
            if (typeof first !== "number") {
                return undefined;
            }
            dereferenced = stringifyable[first];
        }
        else {
            if (typeof first !== "string") {
                return undefined;
            }
            dereferenced = stringifyable[first];
        }
        if (dereferenced === undefined) {
            return undefined;
        }
        return getValueAtPath_rec(dereferenced, rest);
    }
    function getValueAtPath(stringifyableObjectOrArray, path) {
        return getValueAtPath_rec(stringifyableObjectOrArray, path);
    }
    return { getValueAtPath };
})();
//# sourceMappingURL=Stringifyable.js.map