import { getNodeModulesBinDirPath } from "./nodeModulesBinDirPath";
import { join as pathJoin, resolve as pathResolve } from "path";
import * as fsPr from "fs/promises";
import { id } from "tsafe/id";
import { assert, is } from "tsafe/assert";
import chalk from "chalk";
import * as crypto from "crypto";
import { symToStr } from "tsafe/symToStr";
import { readThisNpmPackageVersion } from "./readThisNpmPackageVersion";
getIsPrettierAvailable.cache = id(undefined);
export async function getIsPrettierAvailable() {
    var _a;
    if (getIsPrettierAvailable.cache !== undefined) {
        return getIsPrettierAvailable.cache;
    }
    const nodeModulesBinDirPath = getNodeModulesBinDirPath({
        packageJsonFilePath: undefined
    });
    const prettierBinPath = pathJoin(nodeModulesBinDirPath, "prettier");
    const stats = await fsPr.stat(prettierBinPath).catch(() => undefined);
    const isPrettierAvailable = (_a = stats === null || stats === void 0 ? void 0 : stats.isFile()) !== null && _a !== void 0 ? _a : false;
    getIsPrettierAvailable.cache = isPrettierAvailable;
    return isPrettierAvailable;
}
getPrettier.cache = id(undefined);
export async function getPrettier() {
    assert(getIsPrettierAvailable());
    if (getPrettier.cache !== undefined) {
        return getPrettier.cache;
    }
    let prettier = id(undefined);
    import_prettier: {
        // NOTE: When module is linked we want to make sure we import the correct version
        // of prettier, that is the one of the project, not the one of this repo.
        // So we do a sketchy eval to bypass ncc.
        // We make sure to only do that when linking, otherwise we import properly.
        if (readThisNpmPackageVersion().startsWith("0.0.0")) {
            const prettierDirPath = pathResolve(pathJoin(getNodeModulesBinDirPath({ packageJsonFilePath: undefined }), "..", "prettier"));
            const isCJS = typeof module !== "undefined" && module.exports;
            if (isCJS) {
                eval(`${symToStr({ prettier })} = require("${prettierDirPath}")`);
            }
            else {
                prettier = await new Promise(_resolve => {
                    eval(`import("file:///${pathJoin(prettierDirPath, "index.mjs").replace(/\\/g, "/")}").then(prettier => _resolve(prettier))`);
                });
            }
            assert(!is(prettier));
            break import_prettier;
        }
        prettier = await import("prettier");
    }
    const configHash = await (async () => {
        const configFilePath = await prettier.resolveConfigFile(pathJoin(getNodeModulesBinDirPath({ packageJsonFilePath: undefined }), "..", ".."));
        if (configFilePath === null) {
            return "";
        }
        const data = await fsPr.readFile(configFilePath);
        return crypto.createHash("sha256").update(data).digest("hex");
    })();
    const prettierAndConfig = {
        prettier,
        configHash
    };
    getPrettier.cache = prettierAndConfig;
    return prettierAndConfig;
}
export async function runPrettier(params) {
    const { sourceCode, filePath } = params;
    let formattedSourceCode;
    try {
        const { prettier } = await getPrettier();
        const { ignored, inferredParser } = await prettier.getFileInfo(filePath, {
            resolveConfig: true
        });
        if (ignored || inferredParser === null) {
            return sourceCode;
        }
        const config = await prettier.resolveConfig(filePath);
        formattedSourceCode = await prettier.format(typeof sourceCode === "string" ? sourceCode : sourceCode.toString("utf8"), Object.assign(Object.assign({}, config), { filePath, parser: inferredParser }));
    }
    catch (error) {
        console.log(chalk.red(`You probably need to upgrade the version of prettier in your project`));
        throw error;
    }
    return typeof sourceCode === "string"
        ? formattedSourceCode
        : Buffer.from(formattedSourceCode, "utf8");
}
//# sourceMappingURL=runPrettier.js.map