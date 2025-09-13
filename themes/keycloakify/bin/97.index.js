"use strict";
exports.id = 97;
exports.ids = [97];
exports.modules = {

/***/ 77372:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "x": () => (/* binding */ computeHash),
  "f": () => (/* binding */ getExtensionModuleMetas)
});

// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __webpack_require__(38469);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 4 modules
var types = __webpack_require__(49622);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(73292);
// EXTERNAL MODULE: ./dist/bin/tools/fs.existsAsync.js
var fs_existsAsync = __webpack_require__(43765);
// EXTERNAL MODULE: ./dist/bin/tools/listInstalledModules.js
var listInstalledModules = __webpack_require__(75564);
;// CONCATENATED MODULE: ./dist/bin/tools/crawlAsync.js



/** List all files in a given directory return paths relative to the dir_path */
async function crawlAsync(params) {
    const { dirPath, returnedPathsType, onFileFound } = params;
    await crawlAsyncRec({
        dirPath,
        onFileFound: async ({ filePath }) => {
            switch (returnedPathsType) {
                case "absolute":
                    await onFileFound(filePath);
                    return;
                case "relative to dirPath":
                    await onFileFound((0,external_path_.relative)(dirPath, filePath));
                    return;
            }
            (0,assert/* assert */.h)();
        }
    });
}
async function crawlAsyncRec(params) {
    const { dirPath, onFileFound } = params;
    await Promise.all((await promises_.readdir(dirPath)).map(async (basename) => {
        const fileOrDirPath = (0,external_path_.join)(dirPath, basename);
        const isDirectory = await promises_.lstat(fileOrDirPath)
            .then(stat => stat.isDirectory());
        if (isDirectory) {
            await crawlAsyncRec({ dirPath: fileOrDirPath, onFileFound });
            return;
        }
        await onFileFound({ filePath: fileOrDirPath });
    }));
}
//# sourceMappingURL=crawlAsync.js.map
// EXTERNAL MODULE: ./dist/bin/tools/runPrettier.js
var runPrettier = __webpack_require__(48433);
// EXTERNAL MODULE: ./dist/bin/tools/readThisNpmPackageVersion.js
var readThisNpmPackageVersion = __webpack_require__(64795);
// EXTERNAL MODULE: ./dist/bin/sync-extensions/getExtensionModuleFileSourceCodeReadyToBeCopied.js
var getExtensionModuleFileSourceCodeReadyToBeCopied = __webpack_require__(2237);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
// EXTERNAL MODULE: ./dist/bin/shared/constants.js
var constants = __webpack_require__(173);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/exclude.mjs
var exclude = __webpack_require__(83101);
;// CONCATENATED MODULE: ./node_modules/tsafe/esm/isAmong.mjs
/** https://docs.tsafe.dev/isamong */
function isAmong(names, value) {
    for (const name of names) {
        if (name === value) {
            return true;
        }
    }
    return false;
}


//# sourceMappingURL=isAmong.mjs.map

;// CONCATENATED MODULE: ./dist/bin/sync-extensions/extensionModuleMeta.js















const zExtensionModuleMeta = (() => {
    const zTargetType = types/* object */.Ry({
        moduleName: types/* string */.Z_(),
        version: types/* string */.Z_(),
        files: types/* array */.IX(types/* object */.Ry({
            isPublic: types/* boolean */.O7(),
            fileRelativePath: types/* string */.Z_(),
            hash: types/* string */.Z_(),
            copyableFilePath: types/* string */.Z_()
        })),
        peerDependencies: types/* record */.IM(types/* string */.Z_())
    });
    (0,assert/* assert */.h)();
    return (0,id.id)(zTargetType);
})();
const zParsedCacheFile = (() => {
    const zTargetType = types/* object */.Ry({
        keycloakifyVersion: types/* string */.Z_(),
        prettierConfigHash: types/* union */.G0([types/* string */.Z_(), types/* null */.lB()]),
        thisFilePath: types/* string */.Z_(),
        extensionModuleMetas: types/* array */.IX(zExtensionModuleMeta)
    });
    (0,assert/* assert */.h)();
    return (0,id.id)(zTargetType);
})();
const CACHE_FILE_RELATIVE_PATH = (0,external_path_.join)("extension-modules", "cache.json");
(0,assert/* assert */.h)();
async function getExtensionModuleMetas(params) {
    const { buildContext } = params;
    const cacheFilePath = (0,external_path_.join)(buildContext.cacheDirPath, CACHE_FILE_RELATIVE_PATH);
    const keycloakifyVersion = (0,readThisNpmPackageVersion/* readThisNpmPackageVersion */.K)();
    const prettierConfigHash = await (async () => {
        if (!(await (0,runPrettier/* getIsPrettierAvailable */.MT)())) {
            return null;
        }
        const { configHash } = await (0,runPrettier/* getPrettier */.LG)();
        return configHash;
    })();
    const installedExtensionModules = await (async () => {
        const installedModulesWithKeycloakifyInTheName = await (0,listInstalledModules/* listInstalledModules */.P)({
            packageJsonFilePath: buildContext.packageJsonFilePath,
            filter: ({ moduleName }) => moduleName.includes("keycloakify") && moduleName !== "keycloakify"
        });
        return (await Promise.all(installedModulesWithKeycloakifyInTheName.map(async (entry) => {
            if (!(await (0,fs_existsAsync/* existsAsync */.o)((0,external_path_.join)(entry.dirPath, constants/* KEYCLOAK_THEME */.PC)))) {
                return undefined;
            }
            return entry;
        }))).filter((0,exclude/* exclude */.D)(undefined));
    })();
    const cacheContent = await (async () => {
        if (!(await (0,fs_existsAsync/* existsAsync */.o)(cacheFilePath))) {
            return undefined;
        }
        return await promises_.readFile(cacheFilePath);
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
            (0,assert/* assert */.h)((0,assert.is)(parsedCacheFile));
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
            dirPath: (0,external_path_.join)(dirPath, constants/* KEYCLOAK_THEME */.PC),
            returnedPathsType: "relative to dirPath",
            onFileFound: async (fileRelativePath_fromReservedDir) => {
                const isPublic = fileRelativePath_fromReservedDir.startsWith(`public${external_path_.sep}`);
                const fileRelativePath = isPublic
                    ? (0,external_path_.relative)("public", fileRelativePath_fromReservedDir)
                    : fileRelativePath_fromReservedDir;
                const sourceCode = await (0,getExtensionModuleFileSourceCodeReadyToBeCopied/* getExtensionModuleFileSourceCodeReadyToBeCopied */.p)({
                    buildContext,
                    isPublic,
                    fileRelativePath,
                    isOwnershipAction: false,
                    extensionModuleDirPath: dirPath,
                    extensionModuleName: moduleName,
                    extensionModuleVersion: version
                });
                const hash = computeHash(sourceCode);
                const copyableFilePath = (0,external_path_.join)((0,external_path_.dirname)(cacheFilePath), constants/* KEYCLOAK_THEME */.PC, fileRelativePath_fromReservedDir);
                {
                    const dirPath = (0,external_path_.dirname)(copyableFilePath);
                    if (!(await (0,fs_existsAsync/* existsAsync */.o)(dirPath))) {
                        await promises_.mkdir(dirPath, { recursive: true });
                    }
                }
                promises_.writeFile(copyableFilePath, sourceCode);
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
        return (0,id.id)({
            moduleName,
            version,
            files,
            peerDependencies: Object.fromEntries(Object.entries(peerDependencies)
                .filter(([moduleName]) => !isAmong(["react", "@types/react"], moduleName))
                .sort(([moduleName_a], [moduleName_b]) => moduleName_a.localeCompare(moduleName_b)))
        });
    }));
    update_cache: {
        const parsedCacheFile = (0,id.id)({
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
            const dirPath = (0,external_path_.dirname)(cacheFilePath);
            if (await (0,fs_existsAsync/* existsAsync */.o)(dirPath)) {
                break create_dir;
            }
            await promises_.mkdir(dirPath, { recursive: true });
        }
        await promises_.writeFile(cacheFilePath, cacheContent_new);
    }
    return extensionModuleMetas;
}
function computeHash(data) {
    return external_crypto_.createHash("sha256").update(data).digest("hex");
}
//# sourceMappingURL=extensionModuleMeta.js.map

/***/ }),

/***/ 2237:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ getExtensionModuleFileSourceCodeReadyToBeCopied)
/* harmony export */ });
/* harmony import */ var _tools_runPrettier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48433);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29041);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(173);





(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)();
async function getExtensionModuleFileSourceCodeReadyToBeCopied(params) {
    const { buildContext, extensionModuleDirPath, isPublic, fileRelativePath, isOwnershipAction, extensionModuleName, extensionModuleVersion } = params;
    const { refSourceCode } = await (async () => {
        let sourceCode = undefined;
        const sourceCode_originalBuffer = await fs_promises__WEBPACK_IMPORTED_MODULE_1__.readFile((0,path__WEBPACK_IMPORTED_MODULE_2__.join)(extensionModuleDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_4__/* .KEYCLOAK_THEME */ .PC, isPublic ? "public" : ".", fileRelativePath));
        let hasBeenUpdated = false;
        const refSourceCode = {
            get current() {
                if (sourceCode === undefined) {
                    sourceCode = sourceCode_originalBuffer.toString("utf8");
                }
                return sourceCode;
            },
            set current(value) {
                hasBeenUpdated = true;
                sourceCode = value;
            },
            getAsBuffer: () => {
                if (!hasBeenUpdated) {
                    return sourceCode_originalBuffer;
                }
                return Buffer.from(refSourceCode.current, "utf8");
            }
        };
        return { refSourceCode };
    })();
    add_eslint_disable: {
        if (isOwnershipAction) {
            break add_eslint_disable;
        }
        if (!fileRelativePath.endsWith(".ts") && !fileRelativePath.endsWith(".tsx")) {
            break add_eslint_disable;
        }
        if (refSourceCode.current.includes("/* eslint-disable */")) {
            break add_eslint_disable;
        }
        refSourceCode.current = ["/* eslint-disable */", "", refSourceCode.current].join("\n");
    }
    addCommentToSourceCode({
        refSourceCode,
        fileRelativePath,
        commentLines: (() => {
            const path = fileRelativePath.split(path__WEBPACK_IMPORTED_MODULE_2__.sep).join("/");
            return isOwnershipAction
                ? [
                    `This file has been claimed for ownership from ${extensionModuleName} version ${extensionModuleVersion}.`,
                    `To relinquish ownership and restore this file to its original content, run the following command:`,
                    ``,
                    `$ npx keycloakify own --path "${path}" ${isPublic ? "--public " : ""}--revert`
                ]
                : [
                    `WARNING: Before modifying this file, run the following command:`,
                    ``,
                    `$ npx keycloakify own --path "${path}"${isPublic ? " --public" : ""}`,
                    ``,
                    `This file is provided by ${extensionModuleName} version ${extensionModuleVersion}.`,
                    `It was copied into your repository by the postinstall script: \`keycloakify sync-extensions\`.`
                ];
        })()
    });
    format: {
        if (!(await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_0__/* .getIsPrettierAvailable */ .MT)())) {
            break format;
        }
        const sourceCode_buffer_before = refSourceCode.getAsBuffer();
        const sourceCode_buffer_after = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_0__/* .runPrettier */ .eY)({
            filePath: (0,path__WEBPACK_IMPORTED_MODULE_2__.join)(isPublic
                ? (0,path__WEBPACK_IMPORTED_MODULE_2__.join)(buildContext.publicDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_4__/* .KEYCLOAK_THEME */ .PC)
                : buildContext.themeSrcDirPath, fileRelativePath),
            sourceCode: sourceCode_buffer_before
        });
        if (sourceCode_buffer_before.compare(sourceCode_buffer_after) === 0) {
            break format;
        }
        refSourceCode.current = sourceCode_buffer_after.toString("utf8");
    }
    return refSourceCode.getAsBuffer();
}
function addCommentToSourceCode(params) {
    const { refSourceCode, fileRelativePath, commentLines } = params;
    const updateRef = (comment) => {
        refSourceCode.current = [comment, ``, refSourceCode.current].join("\n");
    };
    for (const ext of [".ts", ".tsx", ".css", ".less", ".sass", ".js", ".jsx"]) {
        if (!fileRelativePath.endsWith(ext)) {
            continue;
        }
        updateRef([`/**`, ...commentLines.map(line => ` * ${line}`), ` */`].join("\n"));
        return;
    }
    if (fileRelativePath.endsWith(".properties")) {
        updateRef(commentLines.map(line => `# ${line}`).join("\n"));
        return;
    }
    if (fileRelativePath.endsWith(".ftl")) {
        const comment = [`<#--`, ...commentLines.map(line => `  ${line}`), `-->`].join("\n");
        if (refSourceCode.current.trim().startsWith("<#ftl")) {
            const [first, ...rest] = refSourceCode.current.split(">");
            const last = rest.join(">");
            refSourceCode.current = [`${first}>`, comment, last].join("\n");
            return;
        }
        updateRef(comment);
        return;
    }
    if (fileRelativePath.endsWith(".html") || fileRelativePath.endsWith(".svg")) {
        const comment = [
            `<!--`,
            ...commentLines.map(line => ` ${line
                .replace("--path", "-t")
                .replace("--revert", "-r")
                .replace("Before modifying", "Before modifying or replacing")}`),
            `-->`
        ].join("\n");
        if (fileRelativePath.endsWith(".html") &&
            refSourceCode.current.trim().startsWith("<!")) {
            const [first, ...rest] = refSourceCode.current.split(">");
            const last = rest.join(">");
            refSourceCode.current = [`${first}>`, comment, last].join("\n");
            return;
        }
        if (fileRelativePath.endsWith(".svg") &&
            refSourceCode.current.trim().startsWith("<?")) {
            const [first, ...rest] = refSourceCode.current.split("?>");
            const last = rest.join("?>");
            refSourceCode.current = [`${first}?>`, comment, last].join("\n");
            return;
        }
        updateRef(comment);
        return;
    }
}
//# sourceMappingURL=getExtensionModuleFileSourceCodeReadyToBeCopied.js.map

/***/ }),

/***/ 86087:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ writeManagedGitignoreFiles),
/* harmony export */   "P": () => (/* binding */ readManagedGitignoresFile)
/* harmony export */ });
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29041);
/* harmony import */ var _tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43765);
/* harmony import */ var _tools_getAbsoluteAndInOsFormatPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84794);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(173);






(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)();
(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_2__/* .assert */ .h)();
const DELIMITER_START = `# === Owned files start ===`;
const DELIMITER_END = `# === Owned files end =====`;
async function writeManagedGitignoreFiles(params) {
    const { buildContext } = params;
    for (const isPublicIteration of [false, true]) {
        const extensionModuleMetas_ctx = params.extensionModuleMetas
            .map(extensionModuleMeta => (Object.assign(Object.assign({}, extensionModuleMeta), { files: extensionModuleMeta.files.filter(({ isPublic }) => isPublic === isPublicIteration) })))
            .filter(extensionModuleMeta => extensionModuleMeta.files.length !== 0);
        if (extensionModuleMetas_ctx.length === 0) {
            continue;
        }
        const ownedFilesRelativePaths_ctx = params.ownedFilesRelativePaths.filter(({ isPublic }) => isPublic === isPublicIteration);
        const filePath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(isPublicIteration
            ? (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(buildContext.publicDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_5__/* .KEYCLOAK_THEME */ .PC)
            : buildContext.themeSrcDirPath, ".gitignore");
        const content_new = Buffer.from([
            `# This file is managed by Keycloakify, do not edit it manually.`,
            ``,
            DELIMITER_START,
            ...ownedFilesRelativePaths_ctx
                .map(({ fileRelativePath }) => fileRelativePath)
                .map(fileRelativePath => fileRelativePath.split(path__WEBPACK_IMPORTED_MODULE_1__.sep).join("/"))
                .sort(posixPathCompareFn)
                .map(line => `# ${line}`),
            DELIMITER_END,
            ``,
            ...[...extensionModuleMetas_ctx]
                .sort((a, b) => {
                const n = a.moduleName.length - b.moduleName.length;
                return n !== 0 ? n : a.moduleName.localeCompare(b.moduleName);
            })
                .map(extensionModuleMeta => [
                `# === ${extensionModuleMeta.moduleName} v${extensionModuleMeta.version} ===`,
                ...extensionModuleMeta.files
                    .map(({ fileRelativePath }) => fileRelativePath)
                    .filter(fileRelativePath => !ownedFilesRelativePaths_ctx
                    .map(({ fileRelativePath }) => fileRelativePath)
                    .includes(fileRelativePath))
                    .map(fileRelativePath => `/${fileRelativePath.split(path__WEBPACK_IMPORTED_MODULE_1__.sep).join("/").replace(/^\.\//, "")}`)
                    .sort(posixPathCompareFn),
                ``
            ])
                .flat()
        ].join("\n"), "utf8");
        const content_current = await (async () => {
            if (!(await (0,_tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__/* .existsAsync */ .o)(filePath))) {
                return undefined;
            }
            return await fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile(filePath);
        })();
        if (content_current !== undefined && content_current.equals(content_new)) {
            continue;
        }
        create_dir: {
            const dirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.dirname)(filePath);
            if (await (0,_tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__/* .existsAsync */ .o)(dirPath)) {
                break create_dir;
            }
            await fs_promises__WEBPACK_IMPORTED_MODULE_0__.mkdir(dirPath, { recursive: true });
        }
        await fs_promises__WEBPACK_IMPORTED_MODULE_0__.writeFile(filePath, content_new);
    }
}
async function readManagedGitignoresFile(params) {
    const { buildContext } = params;
    const ownedFilesRelativePaths = [];
    for (const isPublicIteration of [false, true]) {
        const filePath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(isPublicIteration
            ? (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(buildContext.publicDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_5__/* .KEYCLOAK_THEME */ .PC)
            : buildContext.themeSrcDirPath, ".gitignore");
        if (!(await (0,_tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__/* .existsAsync */ .o)(filePath))) {
            continue;
        }
        const contentStr = (await fs_promises__WEBPACK_IMPORTED_MODULE_0__.readFile(filePath)).toString("utf8");
        const payload = (() => {
            const index_start = contentStr.indexOf(DELIMITER_START);
            const index_end = contentStr.indexOf(DELIMITER_END);
            if (index_start === -1 || index_end === -1) {
                return undefined;
            }
            return contentStr
                .slice(index_start + DELIMITER_START.length, index_end)
                .trim();
        })();
        if (payload === undefined) {
            continue;
        }
        payload
            .split("\n")
            .map(line => line.trim())
            .map(line => line.replace(/^# /, ""))
            .filter(line => line !== "")
            .map(line => (0,_tools_getAbsoluteAndInOsFormatPath__WEBPACK_IMPORTED_MODULE_4__/* .getAbsoluteAndInOsFormatPath */ .c)({
            cwd: buildContext.themeSrcDirPath,
            pathIsh: line
        }))
            .map(filePath => (0,path__WEBPACK_IMPORTED_MODULE_1__.relative)(buildContext.themeSrcDirPath, filePath))
            .forEach(fileRelativePath => ownedFilesRelativePaths.push({
            isPublic: isPublicIteration,
            fileRelativePath
        }));
    }
    return { ownedFilesRelativePaths };
}
function posixPathCompareFn(a, b) {
    const aParts = a.split("/");
    const bParts = b.split("/");
    const diff = aParts.length - bParts.length;
    if (diff !== 0) {
        return diff;
    }
    const len = Math.min(aParts.length, bParts.length);
    for (let i = 0; i < len; i++) {
        const cmp = aParts[i].localeCompare(bParts[i], undefined, {
            numeric: true,
            sensitivity: "base"
        });
        if (cmp !== 0)
            return cmp;
    }
    return 0;
}
//# sourceMappingURL=managedGitignoreFiles.js.map

/***/ }),

/***/ 91097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "W": () => (/* binding */ command)
});

// EXTERNAL MODULE: ./dist/bin/sync-extensions/extensionModuleMeta.js + 2 modules
var sync_extensions_extensionModuleMeta = __webpack_require__(77372);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 4 modules
var types = __webpack_require__(49622);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __webpack_require__(38469);
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(73292);
// EXTERNAL MODULE: ./dist/bin/tools/SemVer.js
var SemVer = __webpack_require__(12171);
// EXTERNAL MODULE: ./node_modules/evt/tools/inDepth/same.js
var same = __webpack_require__(33805);
// EXTERNAL MODULE: ./dist/bin/tools/runPrettier.js
var runPrettier = __webpack_require__(48433);
// EXTERNAL MODULE: ./dist/bin/tools/npmInstall.js + 1 modules
var npmInstall = __webpack_require__(63046);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
;// CONCATENATED MODULE: ./dist/bin/sync-extensions/installExtensionModulesPeerDependencies.js









(0,assert/* assert */.h)();
(0,assert/* assert */.h)();
async function installExtensionModulesPeerDependencies(params) {
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
                        semVer: SemVer/* SemVer.parse */.h.parse((() => {
                            if (versionRange.startsWith("^") ||
                                versionRange.startsWith("~")) {
                                return versionRange.slice(1);
                            }
                            return versionRange;
                        })())
                    }))
                        .sort((a, b) => SemVer/* SemVer.compare */.h.compare(b.semVer, a.semVer))[0];
                    return versionRange;
                })();
                extensionModulesPerDependencies[peerDependencyName] = versionRange;
            }
        }
        return { extensionModulesPerDependencies };
    })();
    const parsedPackageJson = await (async () => {
        const zParsedPackageJson = (() => {
            const zParsedPackageJson = types/* object */.Ry({
                dependencies: types/* record */.IM(types/* string */.Z_()).optional(),
                devDependencies: types/* record */.IM(types/* string */.Z_()).optional()
            });
            (0,assert/* assert */.h)();
            return (0,id.id)(zParsedPackageJson);
        })();
        const parsedPackageJson = JSON.parse((await promises_.readFile(buildContext.packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,assert/* assert */.h)((0,assert.is)(parsedPackageJson));
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
    if ((0,same.same)(parsedPackageJson, parsedPackageJson_before)) {
        return;
    }
    let packageJsonContentStr = JSON.stringify(parsedPackageJson, null, 2);
    format: {
        if (!(await (0,runPrettier/* getIsPrettierAvailable */.MT)())) {
            break format;
        }
        packageJsonContentStr = await (0,runPrettier/* runPrettier */.eY)({
            sourceCode: packageJsonContentStr,
            filePath: buildContext.packageJsonFilePath
        });
    }
    await promises_.writeFile(buildContext.packageJsonFilePath, packageJsonContentStr);
    await (0,npmInstall/* npmInstall */.c)({
        packageJsonDirPath: (0,external_path_.dirname)(buildContext.packageJsonFilePath)
    });
    process.exit(0);
}
//# sourceMappingURL=installExtensionModulesPeerDependencies.js.map
// EXTERNAL MODULE: ./dist/bin/sync-extensions/managedGitignoreFiles.js
var managedGitignoreFiles = __webpack_require__(86087);
// EXTERNAL MODULE: ./dist/bin/tools/fs.existsAsync.js
var fs_existsAsync = __webpack_require__(43765);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
// EXTERNAL MODULE: ./node_modules/evt/tools/Deferred.js
var Deferred = __webpack_require__(50689);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
// EXTERNAL MODULE: ./node_modules/run-exclusive/lib/runExclusive.js
var runExclusive = __webpack_require__(81708);
;// CONCATENATED MODULE: ./dist/bin/tools/gitUtils.js






const groupRef = runExclusive.createGroupRef();
const getIsKnownByGit = runExclusive.build(groupRef, (params) => {
    const { filePath } = params;
    const dIsKnownByGit = new Deferred.Deferred();
    let relativePath = (0,external_path_.basename)(filePath);
    let dirPath = (0,external_path_.dirname)(filePath);
    while (!external_fs_.existsSync(dirPath)) {
        relativePath = (0,external_path_.join)((0,external_path_.basename)(dirPath), relativePath);
        dirPath = (0,external_path_.dirname)(dirPath);
    }
    external_child_process_.exec(`git ls-files --error-unmatch '${relativePath.split(external_path_.sep).join("/")}'`, { cwd: dirPath }, error => {
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
const untrackFromGit = runExclusive.build(groupRef, async (params) => {
    const { filePath } = params;
    const dDone = new Deferred.Deferred();
    let relativePath = (0,external_path_.basename)(filePath);
    let dirPath = (0,external_path_.dirname)(filePath);
    while (!(await (0,fs_existsAsync/* existsAsync */.o)(dirPath))) {
        relativePath = (0,external_path_.join)((0,external_path_.basename)(dirPath), relativePath);
        dirPath = (0,external_path_.dirname)(dirPath);
    }
    external_child_process_.exec(`git rm --cached '${relativePath.split(external_path_.sep).join("/")}'`, { cwd: dirPath }, error => {
        if (error !== null) {
            dDone.reject(error);
            return;
        }
        dDone.resolve();
    });
    await dDone.pr;
});
//# sourceMappingURL=gitUtils.js.map
// EXTERNAL MODULE: ./dist/bin/update-kc-gen.js
var update_kc_gen = __webpack_require__(10786);
// EXTERNAL MODULE: ./dist/bin/shared/buildContext.js + 3 modules
var shared_buildContext = __webpack_require__(85400);
// EXTERNAL MODULE: ./dist/bin/shared/constants.js
var constants = __webpack_require__(173);
;// CONCATENATED MODULE: ./dist/bin/sync-extensions/sync-extension.js












async function command(params) {
    const { buildContext } = params;
    const extensionModuleMetas = await (0,sync_extensions_extensionModuleMeta/* getExtensionModuleMetas */.f)({ buildContext });
    await installExtensionModulesPeerDependencies({
        buildContext,
        extensionModuleMetas
    });
    const { ownedFilesRelativePaths } = await (0,managedGitignoreFiles/* readManagedGitignoresFile */.P)({
        buildContext
    });
    await (0,managedGitignoreFiles/* writeManagedGitignoreFiles */.F)({
        buildContext,
        ownedFilesRelativePaths,
        extensionModuleMetas
    });
    await Promise.all(extensionModuleMetas
        .map(extensionModuleMeta => Promise.all(extensionModuleMeta.files.map(async ({ isPublic, fileRelativePath, copyableFilePath, hash }) => {
        if (ownedFilesRelativePaths.some(entry => (0,same.same)(entry, { isPublic, fileRelativePath }))) {
            return;
        }
        const destFilePath = (0,external_path_.join)(isPublic
            ? (0,external_path_.join)(buildContext.publicDirPath, constants/* KEYCLOAK_THEME */.PC)
            : buildContext.themeSrcDirPath, fileRelativePath);
        const doesFileExist = await (0,fs_existsAsync/* existsAsync */.o)(destFilePath);
        skip_condition: {
            if (!doesFileExist) {
                break skip_condition;
            }
            const destFileHash = (0,sync_extensions_extensionModuleMeta/* computeHash */.x)(await promises_.readFile(destFilePath));
            if (destFileHash !== hash) {
                break skip_condition;
            }
            return;
        }
        if (await getIsKnownByGit({ filePath: destFilePath })) {
            await untrackFromGit({
                filePath: destFilePath
            });
        }
        {
            const dirName = (0,external_path_.dirname)(destFilePath);
            if (!(await (0,fs_existsAsync/* existsAsync */.o)(dirName))) {
                await promises_.mkdir(dirName, { recursive: true });
            }
        }
        await promises_.copyFile(copyableFilePath, destFilePath);
    })))
        .flat());
    await (0,update_kc_gen.command)({
        buildContext: (0,shared_buildContext/* getBuildContext */.s)({
            projectDirPath: buildContext.projectDirPath
        })
    });
}
//# sourceMappingURL=sync-extension.js.map

/***/ }),

/***/ 12171:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ SemVer)
/* harmony export */ });
var SemVer;
(function (SemVer) {
    const bumpTypes = ["major", "minor", "patch", "rc", "no bump"];
    function parse(versionStr) {
        const match = versionStr.match(/^v?([0-9]+)\.([0-9]+)(?:\.([0-9]+))?(?:-rc.([0-9]+))?$/);
        if (!match) {
            throw new Error(`${versionStr} is not a valid semantic version`);
        }
        const semVer = Object.assign({ major: parseInt(match[1]), minor: parseInt(match[2]), patch: (() => {
                const str = match[3];
                return str === undefined ? 0 : parseInt(str);
            })() }, (() => {
            const str = match[4];
            return str === undefined ? {} : { rc: parseInt(str) };
        })());
        const initialStr = stringify(semVer);
        Object.defineProperty(semVer, "parsedFrom", {
            enumerable: true,
            get: function () {
                const currentStr = stringify(this);
                if (currentStr !== initialStr) {
                    throw new Error(`SemVer.parsedFrom can't be read anymore, the version have been modified from ${initialStr} to ${currentStr}`);
                }
                return versionStr;
            }
        });
        return semVer;
    }
    SemVer.parse = parse;
    function stringify(v) {
        return `${v.major}.${v.minor}.${v.patch}${v.rc === undefined ? "" : `-rc.${v.rc}`}`;
    }
    SemVer.stringify = stringify;
    /**
     *
     * v1  <  v2  => -1
     * v1 === v2  => 0
     * v1  >  v2  => 1
     *
     */
    function compare(v1, v2) {
        const sign = (diff) => (diff === 0 ? 0 : diff < 0 ? -1 : 1);
        const noUndefined = (n) => n !== null && n !== void 0 ? n : Infinity;
        for (const level of ["major", "minor", "patch", "rc"]) {
            if (noUndefined(v1[level]) !== noUndefined(v2[level])) {
                return sign(noUndefined(v1[level]) - noUndefined(v2[level]));
            }
        }
        return 0;
    }
    SemVer.compare = compare;
    /*
    console.log(compare(parse("3.0.0-rc.3"), parse("3.0.0")) === -1 )
    console.log(compare(parse("3.0.0-rc.3"), parse("3.0.0-rc.4")) === -1 )
    console.log(compare(parse("3.0.0-rc.3"), parse("4.0.0")) === -1 )
    */
    function bumpType(params) {
        const versionAhead = typeof params.versionAhead === "string"
            ? parse(params.versionAhead)
            : params.versionAhead;
        const versionBehind = typeof params.versionBehind === "string"
            ? parse(params.versionBehind)
            : params.versionBehind;
        if (compare(versionBehind, versionAhead) === 1) {
            throw new Error(`Version regression ${stringify(versionBehind)} -> ${stringify(versionAhead)}`);
        }
        for (const level of ["major", "minor", "patch", "rc"]) {
            if (versionBehind[level] !== versionAhead[level]) {
                return level;
            }
        }
        return "no bump";
    }
    SemVer.bumpType = bumpType;
})(SemVer || (SemVer = {}));
//# sourceMappingURL=SemVer.js.map

/***/ }),

/***/ 89693:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ rmSync)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SemVer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12171);



/**
 * Polyfill of fs.rmSync(dirPath, { "recursive": true })
 * For older version of Node
 */
function rmSync(dirPath, options) {
    if (_SemVer__WEBPACK_IMPORTED_MODULE_2__/* .SemVer.compare */ .h.compare(_SemVer__WEBPACK_IMPORTED_MODULE_2__/* .SemVer.parse */ .h.parse(process.version), _SemVer__WEBPACK_IMPORTED_MODULE_2__/* .SemVer.parse */ .h.parse("14.14.0")) > 0) {
        fs__WEBPACK_IMPORTED_MODULE_0__.rmSync(dirPath, options);
        return;
    }
    const { force = true } = options;
    if (force && !fs__WEBPACK_IMPORTED_MODULE_0__.existsSync(dirPath)) {
        return;
    }
    const removeDir_rec = (dirPath) => fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync(dirPath).forEach(basename => {
        const fileOrDirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dirPath, basename);
        if (fs__WEBPACK_IMPORTED_MODULE_0__.lstatSync(fileOrDirPath).isDirectory()) {
            removeDir_rec(fileOrDirPath);
            return;
        }
        else {
            fs__WEBPACK_IMPORTED_MODULE_0__.unlinkSync(fileOrDirPath);
        }
    });
    removeDir_rec(dirPath);
}
//# sourceMappingURL=fs.rmSync.js.map

/***/ }),

/***/ 63046:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "c": () => (/* binding */ npmInstall)
});

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
// EXTERNAL MODULE: ./node_modules/chalk/source/index.js
var source = __webpack_require__(78818);
var source_default = /*#__PURE__*/__webpack_require__.n(source);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 4 modules
var types = __webpack_require__(49622);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __webpack_require__(38469);
;// CONCATENATED MODULE: ./node_modules/tsafe/esm/objectKeys.mjs
/** https://docs.tsafe.dev/objectKeys */
function objectKeys(o) {
    return Object.keys(o);
}


//# sourceMappingURL=objectKeys.mjs.map

// EXTERNAL MODULE: ./dist/bin/tools/getAbsoluteAndInOsFormatPath.js
var getAbsoluteAndInOsFormatPath = __webpack_require__(84794);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/exclude.mjs
var exclude = __webpack_require__(83101);
// EXTERNAL MODULE: ./dist/bin/tools/fs.rmSync.js
var fs_rmSync = __webpack_require__(89693);
// EXTERNAL MODULE: ./node_modules/evt/tools/Deferred.js
var Deferred = __webpack_require__(50689);
;// CONCATENATED MODULE: ./dist/bin/tools/npmInstall.js












async function npmInstall(params) {
    const { packageJsonDirPath } = params;
    const packageManagerBinName = (() => {
        const packageMangers = [
            {
                binName: "yarn",
                lockFileBasename: "yarn.lock"
            },
            {
                binName: "npm",
                lockFileBasename: "package-lock.json"
            },
            {
                binName: "pnpm",
                lockFileBasename: "pnpm-lock.yaml"
            },
            {
                binName: "bun",
                lockFileBasename: "bun.lockdb"
            },
            {
                binName: "deno",
                lockFileBasename: "deno.lock"
            }
        ];
        for (const packageManager of packageMangers) {
            if (external_fs_.existsSync((0,external_path_.join)(packageJsonDirPath, packageManager.lockFileBasename)) ||
                external_fs_.existsSync((0,external_path_.join)(process.cwd(), packageManager.lockFileBasename))) {
                return packageManager.binName;
            }
        }
        throw new Error("No lock file found, cannot tell which package manager to use for installing dependencies.");
    })();
    console.log(`Installing the new dependencies...`);
    install_without_breaking_links: {
        if (packageManagerBinName !== "yarn") {
            break install_without_breaking_links;
        }
        const garronejLinkInfos = getGarronejLinkInfos({ packageJsonDirPath });
        if (garronejLinkInfos === undefined) {
            break install_without_breaking_links;
        }
        console.log(source_default().green("Installing in a way that won't break the links..."));
        await installWithoutBreakingLinks({
            packageJsonDirPath,
            garronejLinkInfos
        });
        return;
    }
    try {
        await runPackageManagerInstall({
            packageManagerBinName,
            cwd: packageJsonDirPath
        });
    }
    catch (_a) {
        console.log(source_default().yellow(`\`${packageManagerBinName} install\` failed, continuing anyway...`));
    }
}
async function runPackageManagerInstall(params) {
    const { packageManagerBinName, cwd } = params;
    const dCompleted = new Deferred.Deferred();
    const child = external_child_process_.spawn(packageManagerBinName, ["install", ...(packageManagerBinName !== "npm" ? [] : ["--force"])], {
        cwd,
        env: process.env,
        shell: true
    });
    child.stdout.on("data", data => process.stdout.write(data));
    let errorLog = "";
    child.stderr.on("data", data => {
        if (data.toString("utf8").includes("peer dependency")) {
            return;
        }
        errorLog += data.toString("utf8");
    });
    child.on("exit", code => {
        if (code !== 0) {
            console.log(errorLog);
            dCompleted.reject(new Error(`Failed with code ${code}`));
            return;
        }
        dCompleted.resolve();
    });
    await dCompleted.pr;
}
function getGarronejLinkInfos(params) {
    const { packageJsonDirPath } = params;
    const nodeModuleDirPath = (0,external_path_.join)(packageJsonDirPath, "node_modules");
    if (!external_fs_.existsSync(nodeModuleDirPath)) {
        return undefined;
    }
    const linkedModuleNames = [];
    let yarnHomeDirPath = undefined;
    const getIsLinkedByGarronejScript = (path) => {
        let realPath;
        try {
            realPath = external_fs_.readlinkSync(path);
        }
        catch (_a) {
            return false;
        }
        const doesIncludeYarnHome = realPath.includes(".yarn_home");
        if (!doesIncludeYarnHome) {
            return false;
        }
        set_yarnHomeDirPath: {
            if (yarnHomeDirPath !== undefined) {
                break set_yarnHomeDirPath;
            }
            const [firstElement] = (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                pathIsh: realPath,
                cwd: (0,external_path_.dirname)(path)
            }).split(".yarn_home");
            yarnHomeDirPath = (0,external_path_.join)(firstElement, ".yarn_home");
        }
        return true;
    };
    for (const basename of external_fs_.readdirSync(nodeModuleDirPath)) {
        const path = (0,external_path_.join)(nodeModuleDirPath, basename);
        if (external_fs_.lstatSync(path).isSymbolicLink()) {
            if (basename.startsWith("@")) {
                return undefined;
            }
            if (!getIsLinkedByGarronejScript(path)) {
                return undefined;
            }
            linkedModuleNames.push(basename);
            continue;
        }
        if (!external_fs_.lstatSync(path).isDirectory()) {
            continue;
        }
        if (basename.startsWith("@")) {
            for (const subBasename of external_fs_.readdirSync(path)) {
                const subPath = (0,external_path_.join)(path, subBasename);
                if (!external_fs_.lstatSync(subPath).isSymbolicLink()) {
                    continue;
                }
                if (!getIsLinkedByGarronejScript(subPath)) {
                    return undefined;
                }
                linkedModuleNames.push(`${basename}/${subBasename}`);
            }
        }
    }
    if (yarnHomeDirPath === undefined) {
        return undefined;
    }
    return { linkedModuleNames, yarnHomeDirPath };
}
async function installWithoutBreakingLinks(params) {
    const { packageJsonDirPath, garronejLinkInfos: { linkedModuleNames, yarnHomeDirPath } } = params;
    const parsedPackageJson = (() => {
        const packageJsonFilePath = (0,external_path_.join)(packageJsonDirPath, "package.json");
        const zParsedPackageJson = (() => {
            const zTargetType = types/* object */.Ry({
                scripts: types/* record */.IM(types/* string */.Z_()).optional()
            });
            assert/* assert */.h;
            return (0,id.id)(zTargetType);
        })();
        const parsedPackageJson = JSON.parse(external_fs_.readFileSync(packageJsonFilePath).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,assert/* assert */.h)((0,assert.is)(parsedPackageJson));
        return parsedPackageJson;
    })();
    const isImplementedScriptByName = {
        postinstall: false,
        prepare: false
    };
    delete_postinstall_script: {
        if (parsedPackageJson.scripts === undefined) {
            break delete_postinstall_script;
        }
        for (const scriptName of objectKeys(isImplementedScriptByName)) {
            if (parsedPackageJson.scripts[scriptName] === undefined) {
                continue;
            }
            isImplementedScriptByName[scriptName] = true;
            delete parsedPackageJson.scripts[scriptName];
        }
    }
    const tmpProjectDirPath = (0,external_path_.join)(yarnHomeDirPath, "tmpProject");
    if (external_fs_.existsSync(tmpProjectDirPath)) {
        (0,fs_rmSync/* rmSync */.a)(tmpProjectDirPath, { recursive: true });
    }
    external_fs_.mkdirSync(tmpProjectDirPath, { recursive: true });
    external_fs_.writeFileSync((0,external_path_.join)(tmpProjectDirPath, "package.json"), JSON.stringify(parsedPackageJson, undefined, 4));
    const YARN_LOCK = "yarn.lock";
    external_fs_.copyFileSync((0,external_path_.join)(packageJsonDirPath, YARN_LOCK), (0,external_path_.join)(tmpProjectDirPath, YARN_LOCK));
    await runPackageManagerInstall({
        packageManagerBinName: "yarn",
        cwd: tmpProjectDirPath
    });
    // NOTE: Moving the modules from the tmp project to the actual project
    // without messing up the links.
    {
        const { getAreSameVersions } = (() => {
            const zParsedPackageJson = (() => {
                const zTargetType = types/* object */.Ry({
                    version: types/* string */.Z_()
                });
                assert/* assert */.h;
                return (0,id.id)(zTargetType);
            })();
            function readVersion(params) {
                const { moduleDirPath } = params;
                const packageJsonFilePath = (0,external_path_.join)(moduleDirPath, "package.json");
                const packageJson = JSON.parse(external_fs_.readFileSync(packageJsonFilePath).toString("utf8"));
                zParsedPackageJson.parse(packageJson);
                (0,assert/* assert */.h)((0,assert.is)(packageJson));
                return packageJson.version;
            }
            function getAreSameVersions(params) {
                const { moduleDirPath_a, moduleDirPath_b } = params;
                return (readVersion({ moduleDirPath: moduleDirPath_a }) ===
                    readVersion({ moduleDirPath: moduleDirPath_b }));
            }
            return { getAreSameVersions };
        })();
        const nodeModulesDirPath_tmpProject = (0,external_path_.join)(tmpProjectDirPath, "node_modules");
        const nodeModulesDirPath = (0,external_path_.join)(packageJsonDirPath, "node_modules");
        const modulePaths = external_fs_.readdirSync(nodeModulesDirPath_tmpProject)
            .map(basename => {
            if (basename.startsWith(".")) {
                return undefined;
            }
            const path = (0,external_path_.join)(nodeModulesDirPath_tmpProject, basename);
            if (basename.startsWith("@")) {
                return external_fs_.readdirSync(path)
                    .map(subBasename => {
                    if (subBasename.startsWith(".")) {
                        return undefined;
                    }
                    const subPath = (0,external_path_.join)(path, subBasename);
                    if (!external_fs_.lstatSync(subPath).isDirectory()) {
                        return undefined;
                    }
                    return {
                        moduleName: `${basename}/${subBasename}`,
                        moduleDirPath_tmpProject: subPath,
                        moduleDirPath: (0,external_path_.join)(nodeModulesDirPath, basename, subBasename)
                    };
                })
                    .filter((0,exclude/* exclude */.D)(undefined));
            }
            if (!external_fs_.lstatSync(path).isDirectory()) {
                return undefined;
            }
            return [
                {
                    moduleName: basename,
                    moduleDirPath_tmpProject: path,
                    moduleDirPath: (0,external_path_.join)(nodeModulesDirPath, basename)
                }
            ];
        })
            .filter((0,exclude/* exclude */.D)(undefined))
            .flat();
        for (const { moduleName, moduleDirPath, moduleDirPath_tmpProject } of modulePaths) {
            if (linkedModuleNames.includes(moduleName)) {
                continue;
            }
            let doesTargetModuleExist = false;
            skip_condition: {
                if (!external_fs_.existsSync(moduleDirPath)) {
                    break skip_condition;
                }
                doesTargetModuleExist = true;
                const areSameVersions = getAreSameVersions({
                    moduleDirPath_a: moduleDirPath,
                    moduleDirPath_b: moduleDirPath_tmpProject
                });
                if (!areSameVersions) {
                    break skip_condition;
                }
                continue;
            }
            if (doesTargetModuleExist) {
                (0,fs_rmSync/* rmSync */.a)(moduleDirPath, { recursive: true });
            }
            {
                const dirPath = (0,external_path_.dirname)(moduleDirPath);
                if (!external_fs_.existsSync(dirPath)) {
                    external_fs_.mkdirSync(dirPath, { recursive: true });
                }
            }
            external_fs_.renameSync(moduleDirPath_tmpProject, moduleDirPath);
        }
        move_bin: {
            const binDirPath_tmpProject = (0,external_path_.join)(nodeModulesDirPath_tmpProject, ".bin");
            const binDirPath = (0,external_path_.join)(nodeModulesDirPath, ".bin");
            if (!external_fs_.existsSync(binDirPath_tmpProject)) {
                break move_bin;
            }
            for (const basename of external_fs_.readdirSync(binDirPath_tmpProject)) {
                const path_tmpProject = (0,external_path_.join)(binDirPath_tmpProject, basename);
                const path = (0,external_path_.join)(binDirPath, basename);
                if (external_fs_.existsSync(path)) {
                    continue;
                }
                external_fs_.renameSync(path_tmpProject, path);
            }
        }
    }
    external_fs_.cpSync((0,external_path_.join)(tmpProjectDirPath, YARN_LOCK), (0,external_path_.join)(packageJsonDirPath, YARN_LOCK));
    (0,fs_rmSync/* rmSync */.a)(tmpProjectDirPath, { recursive: true });
    for (const scriptName of objectKeys(isImplementedScriptByName)) {
        if (!isImplementedScriptByName[scriptName]) {
            continue;
        }
        external_child_process_.execSync(`yarn run ${scriptName}`, {
            cwd: packageJsonDirPath,
            stdio: "inherit"
        });
    }
}
//# sourceMappingURL=npmInstall.js.map

/***/ })

};
;