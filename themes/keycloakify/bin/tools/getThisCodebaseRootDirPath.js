import * as fs from "fs";
import * as path from "path";
let result = undefined;
export function getThisCodebaseRootDirPath() {
    if (result !== undefined) {
        return result;
    }
    return (result = getNearestPackageJsonDirPath(__dirname));
}
export function getNearestPackageJsonDirPath(dirPath) {
    if (fs.existsSync(path.join(dirPath, "package.json"))) {
        return dirPath;
    }
    return getNearestPackageJsonDirPath(path.join(dirPath, ".."));
}
//# sourceMappingURL=getThisCodebaseRootDirPath.js.map