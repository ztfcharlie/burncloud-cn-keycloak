import { assert, is } from "tsafe/assert";
import { id } from "tsafe/id";
import { z } from "zod";
import { join as pathJoin, dirname as pathDirname, relative as pathRelative, sep as pathSep } from "path";
import * as fsPr from "fs/promises";
import { existsAsync } from "../tools/fs.existsAsync";
import { listInstalledModules } from "../tools/listInstalledModules";
import { crawlAsync } from "../tools/crawlAsync";
import { getIsPrettierAvailable, getPrettier } from "../tools/runPrettier";
import { readThisNpmPackageVersion } from "../tools/readThisNpmPackageVersion";
import { getExtensionModuleFileSourceCodeReadyToBeCopied } from "./getExtensionModuleFileSourceCodeReadyToBeCopied";
import * as crypto from "crypto";
import { KEYCLOAK_THEME } from "../shared/constants";
import { exclude } from "tsafe/exclude";
import { isAmong } from "tsafe/isAmong";
const zExtensionModuleMeta = (() => {
    const zTargetType = z.object({
        moduleName: z.string(),
        version: z.string(),
        files: z.array(z.object({
            isPublic: z.boolean(),
            fileRelativePath: z.string(),
            hash: z.string(),
            copyableFilePath: z.string()
        })),
        peerDependencies: z.record(z.string())
    });
    assert();
    return id(zTargetType);
})();
const zParsedCacheFile = (() => {
    const zTargetType = z.object({
        keycloakifyVersion: z.string(),
        prettierConfigHash: z.union([z.string(), z.null()]),
        thisFilePath: z.string(),
        extensionModuleMetas: z.array(zExtensionModuleMeta)
    });
    assert();
    return id(zTargetType);
})();
const CACHE_FILE_RELATIVE_PATH = pathJoin("extension-modules", "cache.json");
assert();
export async function getExtensionModuleMetas(params) {
    const { buildContext } = params;
    const cacheFilePath = pathJoin(buildContext.cacheDirPath, CACHE_FILE_RELATIVE_PATH);
    const keycloakifyVersion = readThisNpmPackageVersion();
    const prettierConfigHash = await (async () => {
        if (!(await getIsPrettierAvailable())) {
            return null;
        }
        const { configHash } = await getPrettier();
        return configHash;
    })();
    const installedExtensionModules = await (async () => {
        const installedModulesWithKeycloakifyInTheName = await listInstalledModules({
            packageJsonFilePath: buildContext.packageJsonFilePath,
            filter: ({ moduleName }) => moduleName.includes("keycloakify") && moduleName !== "keycloakify"
        });
        return (await Promise.all(installedModulesWithKeycloakifyInTheName.map(async (entry) => {
            if (!(await existsAsync(pathJoin(entry.dirPath, KEYCLOAK_THEME)))) {
                return undefined;
            }
            return entry;
        }))).filter(exclude(undefined));
    })();
    const cacheContent = await (async () => {
        if (!(await existsAsync(cacheFilePath))) {
            return undefined;
        }
        return await fsPr.readFile(cacheFilePath);
    })();
    const extensionModuleMetas_cacheUpToDate = await (async () => {
        const parsedCacheFile = await (async () => {
            if (cacheContent === undefined) {
                return undefined;
            }
            const cacheContentStr = cacheContent.toString("utf8");
            let parsedCacheFile;
            try {
                parsedCacheFile = JSON.parse(cacheContentStr);
            }
            catch (_a) {
                return undefined;
            }
            try {
                zParsedCacheFile.parse(parsedCacheFile);
            }
            catch (_b) {
                return undefined;
            }
            assert(is(parsedCacheFile));
            return parsedCacheFile;
        })();
        if (parsedCacheFile === undefined) {
            return [];
        }
        if (parsedCacheFile.keycloakifyVersion !== keycloakifyVersion) {
            return [];
        }
        if (parsedCacheFile.prettierConfigHash !== prettierConfigHash) {
            return [];
        }
        if (parsedCacheFile.thisFilePath !== cacheFilePath) {
            return [];
        }
        const extensionModuleMetas_cacheUpToDate = parsedCacheFile.extensionModuleMetas.filter(extensionModuleMeta => {
            const correspondingInstalledExtensionModule = installedExtensionModules.find(installedExtensionModule => installedExtensionModule.moduleName ===
                extensionModuleMeta.moduleName);
            if (correspondingInstalledExtensionModule === undefined) {
                return false;
            }
            return (correspondingInstalledExtensionModule.version ===
                extensionModuleMeta.version);
        });
        return extensionModuleMetas_cacheUpToDate;
    })();
    const extensionModuleMetas = await Promise.all([...installedExtensionModules]
        .sort((a, b) => a.moduleName.localeCompare(b.moduleName))
        .map(async ({ moduleName, version, peerDependencies, dirPath }) => {
        use_cache: {
            const extensionModuleMeta_cache = extensionModuleMetas_cacheUpToDate.find(extensionModuleMeta => extensionModuleMeta.moduleName === moduleName);
            if (extensionModuleMeta_cache === undefined) {
                break use_cache;
            }
            return extensionModuleMeta_cache;
        }
        const files = [];
        await crawlAsync({
            dirPath: pathJoin(dirPath, KEYCLOAK_THEME),
            returnedPathsType: "relative to dirPath",
            onFileFound: async (fileRelativePath_fromReservedDir) => {
                const isPublic = fileRelativePath_fromReservedDir.startsWith(`public${pathSep}`);
                const fileRelativePath = isPublic
                    ? pathRelative("public", fileRelativePath_fromReservedDir)
                    : fileRelativePath_fromReservedDir;
                const sourceCode = await getExtensionModuleFileSourceCodeReadyToBeCopied({
                    buildContext,
                    isPublic,
                    fileRelativePath,
                    isOwnershipAction: false,
                    extensionModuleDirPath: dirPath,
                    extensionModuleName: moduleName,
                    extensionModuleVersion: version
                });
                const hash = computeHash(sourceCode);
                const copyableFilePath = pathJoin(pathDirname(cacheFilePath), KEYCLOAK_THEME, fileRelativePath_fromReservedDir);
                {
                    const dirPath = pathDirname(copyableFilePath);
                    if (!(await existsAsync(dirPath))) {
                        await fsPr.mkdir(dirPath, { recursive: true });
                    }
                }
                fsPr.writeFile(copyableFilePath, sourceCode);
                files.push({
                    isPublic,
                    fileRelativePath,
                    hash,
                    copyableFilePath
                });
            }
        });
        {
            const getId = (file) => `${file.isPublic ? "public" : "src"} - ${file.fileRelativePath}`;
            files.sort((a, b) => getId(a).localeCompare(getId(b)));
        }
        return id({
            moduleName,
            version,
            files,
            peerDependencies: Object.fromEntries(Object.entries(peerDependencies)
                .filter(([moduleName]) => !isAmong(["react", "@types/react"], moduleName))
                .sort(([moduleName_a], [moduleName_b]) => moduleName_a.localeCompare(moduleName_b)))
        });
    }));
    update_cache: {
        const parsedCacheFile = id({
            keycloakifyVersion,
            prettierConfigHash,
            thisFilePath: cacheFilePath,
            extensionModuleMetas
        });
        const cacheContent_new = Buffer.from(JSON.stringify(parsedCacheFile, null, 2), "utf8");
        if (cacheContent !== undefined && cacheContent_new.equals(cacheContent)) {
            break update_cache;
        }
        create_dir: {
            const dirPath = pathDirname(cacheFilePath);
            if (await existsAsync(dirPath)) {
                break create_dir;
            }
            await fsPr.mkdir(dirPath, { recursive: true });
        }
        await fsPr.writeFile(cacheFilePath, cacheContent_new);
    }
    return extensionModuleMetas;
}
export function computeHash(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
}
//# sourceMappingURL=extensionModuleMeta.js.map