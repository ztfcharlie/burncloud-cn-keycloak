import { id } from "tsafe";
import { clsx_withTransform } from "./clsx_withTransform";
export function clsx(...args) {
    return clsx_withTransform({ args, transform: id });
}
//# sourceMappingURL=clsx.js.map