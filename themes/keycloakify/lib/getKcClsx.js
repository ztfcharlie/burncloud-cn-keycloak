import { clsx_withTransform } from "../tools/clsx_withTransform";
import { clsx } from "../tools/clsx";
import { assert, is } from "tsafe/assert";
export function createGetKcClsx(params) {
    const { defaultClasses } = params;
    function areSameParams(params1, params2) {
        if (params1.doUseDefaultCss !== params2.doUseDefaultCss) {
            return false;
        }
        if (params1.classes === params2.classes) {
            return true;
        }
        if (params1.classes === undefined || params2.classes === undefined) {
            return false;
        }
        if (Object.keys(params1.classes).length !== Object.keys(params2.classes).length) {
            return false;
        }
        for (const key in params1.classes) {
            if (params1.classes[key] !== params2.classes[key]) {
                return false;
            }
        }
        return true;
    }
    let cache = undefined;
    function getKcClsx(params) {
        // NOTE: We implement a cache here only so that getClassName can be stable across renders.
        // We don't want to use useConstCallback because we want this to be useable outside of React.
        use_cache: {
            if (cache === undefined) {
                break use_cache;
            }
            if (!areSameParams(cache.params, params)) {
                break use_cache;
            }
            return cache.result;
        }
        const { classes, doUseDefaultCss } = params;
        function kcClsx(...args) {
            return clsx_withTransform({
                args,
                transform: classKey => {
                    var _a;
                    assert(is(classKey));
                    return clsx(classKey, (_a = classes === null || classes === void 0 ? void 0 : classes[classKey]) !== null && _a !== void 0 ? _a : (doUseDefaultCss ? defaultClasses[classKey] : undefined));
                }
            });
        }
        cache = { params, result: { kcClsx } };
        return { kcClsx };
    }
    return { getKcClsx };
}
//# sourceMappingURL=getKcClsx.js.map