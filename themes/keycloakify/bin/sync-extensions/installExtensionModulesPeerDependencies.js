import { assert, is } from "tsafe/assert";
import { z } from "zod";
import { id } from "tsafe/id";
import * as fsPr from "fs/promises";
import { SemVer } from "../tools/SemVer";
import { same } from "evt/tools/inDepth/same";
import { runPrettier, getIsPrettierAvailable } from "../tools/runPrettier";
import { npmInstall } from "../tools/npmInstall";
import { dirname as pathDirname } from "path";
assert();
assert();
export async function installExtensionModulesPeerDependencies(params) {
    var _a, _b;
    const { buildContext, extensionModuleMetas } = params;
    const { extensionModulesPerDependencies } = (() => {
        const extensionModulesPerDependencies = {};
        for (const { peerDependencies } of extensionModuleMetas) {
            for (const [peerDependencyName, versionRange_candidate] of Object.entries(peerDependencies)) {
                const versionRange = (() => {
                    const versionRange_current = extensionModulesPerDependencies[peerDependencyName];
                    if (versionRange_current === undefined) {
                        return versionRange_candidate;
                    }
                    if (versionRange_current === "*") {
                        return versionRange_candidate;
                    }
                    if (versionRange_candidate === "*") {
                        return versionRange_current;
                    }
                    const { versionRange } = [
                        versionRange_current,
                        versionRange_candidate
                    ]
                        .map(versionRange => ({
                        versionRange,
                        semVer: SemVer.parse((() => {
                            if (versionRange.startsWith("^") ||
                                versionRange.startsWith("~")) {
                                return versionRange.slice(1);
                            }
                            return versionRange;
                        })())
                    }))
                        .sort((a, b) => SemVer.compare(b.semVer, a.semVer))[0];
                    return versionRange;
                })();
                extensionModulesPerDependencies[peerDependencyName] = versionRange;
            }
        }
        return { extensionModulesPerDependencies };
    })();
    const parsedPackageJson = await (async () => {
        const zParsedPackageJson = (() => {
            const zParsedPackageJson = z.object({
                dependencies: z.record(z.string()).optional(),
                devDependencies: z.record(z.string()).optional()
            });
            assert();
            return id(zParsedPackageJson);
        })();
        const parsedPackageJson = JSON.parse((await fsPr.readFile(buildContext.packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        assert(is(parsedPackageJson));
        return parsedPackageJson;
    })();
    const parsedPackageJson_before = JSON.parse(JSON.stringify(parsedPackageJson));
    for (const [moduleName, versionRange] of Object.entries(extensionModulesPerDependencies)) {
        if (moduleName.startsWith("@types/")) {
            ((_a = parsedPackageJson.devDependencies) !== null && _a !== void 0 ? _a : (parsedPackageJson.devDependencies = {}))[moduleName] = versionRange;
            continue;
        }
        if (parsedPackageJson.devDependencies !== undefined) {
            delete parsedPackageJson.devDependencies[moduleName];
        }
        ((_b = parsedPackageJson.dependencies) !== null && _b !== void 0 ? _b : (parsedPackageJson.dependencies = {}))[moduleName] = versionRange;
    }
    if (same(parsedPackageJson, parsedPackageJson_before)) {
        return;
    }
    let packageJsonContentStr = JSON.stringify(parsedPackageJson, null, 2);
    format: {
        if (!(await getIsPrettierAvailable())) {
            break format;
        }
        packageJsonContentStr = await runPrettier({
            sourceCode: packageJsonContentStr,
            filePath: buildContext.packageJsonFilePath
        });
    }
    await fsPr.writeFile(buildContext.packageJsonFilePath, packageJsonContentStr);
    await npmInstall({
        packageJsonDirPath: pathDirname(buildContext.packageJsonFilePath)
    });
    process.exit(0);
}
//# sourceMappingURL=installExtensionModulesPeerDependencies.js.map