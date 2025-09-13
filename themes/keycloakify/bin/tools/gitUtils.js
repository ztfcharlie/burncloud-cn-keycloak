import * as child_process from "child_process";
import { dirname as pathDirname, basename as pathBasename, join as pathJoin, sep as pathSep } from "path";
import { Deferred } from "evt/tools/Deferred";
import * as fs from "fs";
import * as runExclusive from "run-exclusive";
import { existsAsync } from "./fs.existsAsync";
const groupRef = runExclusive.createGroupRef();
export const getIsKnownByGit = runExclusive.build(groupRef, (params) => {
    const { filePath } = params;
    const dIsKnownByGit = new Deferred();
    let relativePath = pathBasename(filePath);
    let dirPath = pathDirname(filePath);
    while (!fs.existsSync(dirPath)) {
        relativePath = pathJoin(pathBasename(dirPath), relativePath);
        dirPath = pathDirname(dirPath);
    }
    child_process.exec(`git ls-files --error-unmatch '${relativePath.split(pathSep).join("/")}'`, { cwd: dirPath }, error => {
        if (error === null) {
            dIsKnownByGit.resolve(true);
            return;
        }
        if (error.code === 1) {
            dIsKnownByGit.resolve(false);
            return;
        }
        // For building without git
        dIsKnownByGit.resolve(false);
    });
    return dIsKnownByGit.pr;
});
export const untrackFromGit = runExclusive.build(groupRef, async (params) => {
    const { filePath } = params;
    const dDone = new Deferred();
    let relativePath = pathBasename(filePath);
    let dirPath = pathDirname(filePath);
    while (!(await existsAsync(dirPath))) {
        relativePath = pathJoin(pathBasename(dirPath), relativePath);
        dirPath = pathDirname(dirPath);
    }
    child_process.exec(`git rm --cached '${relativePath.split(pathSep).join("/")}'`, { cwd: dirPath }, error => {
        if (error !== null) {
            dDone.reject(error);
            return;
        }
        dDone.resolve();
    });
    await dDone.pr;
});
//# sourceMappingURL=gitUtils.js.map