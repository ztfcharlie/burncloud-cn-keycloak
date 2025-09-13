import { join as pathJoin } from "path";
import { existsAsync } from "./fs.existsAsync";
import * as child_process from "child_process";
import { assert } from "tsafe/assert";
import { getIsRootPath } from "../tools/isRootPath";
export async function getInstalledModuleDirPath(params) {
    const { moduleName, packageJsonDirPath } = params;
    {
        let dirPath = packageJsonDirPath;
        while (true) {
            const dirPath_candidate = pathJoin(dirPath, "node_modules", ...moduleName.split("/"));
            let doesExist;
            try {
                doesExist = await existsAsync(dirPath_candidate);
            }
            catch (_a) {
                doesExist = false;
            }
            if (doesExist) {
                return dirPath_candidate;
            }
            if (getIsRootPath(dirPath)) {
                break;
            }
            dirPath = pathJoin(dirPath, "..");
        }
    }
    const dirPath = child_process
        .execSync(`npm list ${moduleName}`, {
        cwd: packageJsonDirPath
    })
        .toString("utf8")
        .trim();
    assert(dirPath !== "");
    return dirPath;
}
//# sourceMappingURL=getInstalledModuleDirPath.js.map