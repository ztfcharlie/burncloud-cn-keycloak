import { assert, is } from "tsafe/assert";
import { id } from "tsafe/id";
import { z } from "zod";
import { join as pathJoin, dirname as pathDirname } from "path";
import * as fsPr from "fs/promises";
import { getInstalledModuleDirPath } from "../tools/getInstalledModuleDirPath";
import { exclude } from "tsafe/exclude";
export async function listInstalledModules(params) {
    const { packageJsonFilePath, filter } = params;
    const parsedPackageJson = await readPackageJsonDependencies({
        packageJsonFilePath
    });
    const extensionModuleNames = [parsedPackageJson.dependencies, parsedPackageJson.devDependencies]
        .filter(exclude(undefined))
        .map(obj => Object.keys(obj))
        .flat()
        .filter(moduleName => filter({ moduleName }));
    const result = await Promise.all(extensionModuleNames.map(async (moduleName) => {
        const dirPath = await getInstalledModuleDirPath({
            moduleName,
            packageJsonDirPath: pathDirname(packageJsonFilePath)
        });
        const { version, peerDependencies } = await readPackageJsonVersionAndPeerDependencies({
            packageJsonFilePath: pathJoin(dirPath, "package.json")
        });
        return { moduleName, version, peerDependencies, dirPath };
    }));
    return result;
}
export const { readPackageJsonDependencies } = (() => {
    const zParsedPackageJson = (() => {
        const zTargetType = z.object({
            dependencies: z.record(z.string()).optional(),
            devDependencies: z.record(z.string()).optional()
        });
        assert();
        return id(zTargetType);
    })();
    async function readPackageJsonDependencies(params) {
        const { packageJsonFilePath } = params;
        const parsedPackageJson = JSON.parse((await fsPr.readFile(packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        assert(is(parsedPackageJson));
        return parsedPackageJson;
    }
    return { readPackageJsonDependencies };
})();
const { readPackageJsonVersionAndPeerDependencies } = (() => {
    const zParsedPackageJson = (() => {
        const zTargetType = z.object({
            version: z.string(),
            peerDependencies: z.record(z.string()).optional()
        });
        assert();
        return id(zTargetType);
    })();
    async function readPackageJsonVersionAndPeerDependencies(params) {
        var _a;
        const { packageJsonFilePath } = params;
        const parsedPackageJson = JSON.parse((await fsPr.readFile(packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        assert(is(parsedPackageJson));
        return {
            version: parsedPackageJson.version,
            peerDependencies: (_a = parsedPackageJson.peerDependencies) !== null && _a !== void 0 ? _a : {}
        };
    }
    return { readPackageJsonVersionAndPeerDependencies };
})();
//# sourceMappingURL=listInstalledModules.js.map