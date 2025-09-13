import { assert } from "tsafe/assert";
import { typeGuard } from "tsafe/typeGuard";
export function clsx_withTransform(params) {
    const { args, transform } = params;
    const len = args.length;
    let i = 0;
    let cls = "";
    for (; i < len; i++) {
        const arg = args[i];
        if (arg == null)
            continue;
        let toAdd;
        switch (typeof arg) {
            case "boolean":
                break;
            case "object": {
                if (Array.isArray(arg)) {
                    toAdd = clsx_withTransform({ args: arg, transform });
                }
                else {
                    assert(!typeGuard(arg, false));
                    toAdd = "";
                    for (const k in arg) {
                        if (arg[k] && k) {
                            toAdd && (toAdd += " ");
                            toAdd += transform(k);
                        }
                    }
                }
                break;
            }
            default: {
                toAdd = transform(arg);
            }
        }
        if (toAdd) {
            cls && (cls += " ");
            cls += toAdd;
        }
    }
    return cls;
}
//# sourceMappingURL=clsx_withTransform.js.map