import { relative as pathRelative } from "path";
export function isInside(params) {
    const { dirPath, filePath } = params;
    return !pathRelative(dirPath, filePath).startsWith("..");
}
//# sourceMappingURL=isInside.js.map