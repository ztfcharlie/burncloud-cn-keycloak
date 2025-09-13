"use strict";
exports.id = 40;
exports.ids = [40,658];
exports.modules = {

/***/ 18040:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "command": () => (/* binding */ command)
/* harmony export */ });
/* harmony import */ var _shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72138);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(173);
/* harmony import */ var _tools_readThisNpmPackageVersion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(64795);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(89693);
/* harmony import */ var _tools_transformCodebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(60332);
/* harmony import */ var _tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(58822);








async function command(params) {
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,_shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_0__/* .maybeDelegateCommandToCustomHandler */ .q)({
        commandName: "copy-keycloak-resources-to-public",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    const destDirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(buildContext.publicDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .WELL_KNOWN_DIRECTORY_BASE_NAME.KEYCLOAKIFY_DEV_RESOURCES */ .Ju.KEYCLOAKIFY_DEV_RESOURCES);
    const keycloakifyBuildinfoFilePath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(destDirPath, "keycloakify.buildinfo");
    const keycloakifyBuildinfoRaw = JSON.stringify({
        keycloakifyVersion: (0,_tools_readThisNpmPackageVersion__WEBPACK_IMPORTED_MODULE_3__/* .readThisNpmPackageVersion */ .K)()
    }, null, 2);
    skip_if_already_done: {
        if (!fs__WEBPACK_IMPORTED_MODULE_4__.existsSync(keycloakifyBuildinfoFilePath)) {
            break skip_if_already_done;
        }
        const keycloakifyBuildinfoRaw_previousRun = fs__WEBPACK_IMPORTED_MODULE_4__.readFileSync(keycloakifyBuildinfoFilePath)
            .toString("utf8");
        if (keycloakifyBuildinfoRaw_previousRun !== keycloakifyBuildinfoRaw) {
            break skip_if_already_done;
        }
        return;
    }
    (0,_tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_5__/* .rmSync */ .a)(destDirPath, { force: true, recursive: true });
    // NOTE: To remove in a while, remove the legacy keycloak-resources directory
    (0,_tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_5__/* .rmSync */ .a)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,path__WEBPACK_IMPORTED_MODULE_1__.dirname)(destDirPath), "keycloak-resources"), {
        force: true,
        recursive: true
    });
    (0,_tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_5__/* .rmSync */ .a)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,path__WEBPACK_IMPORTED_MODULE_1__.dirname)(destDirPath), ".keycloakify"), {
        force: true,
        recursive: true
    });
    fs__WEBPACK_IMPORTED_MODULE_4__.mkdirSync(destDirPath, { recursive: true });
    fs__WEBPACK_IMPORTED_MODULE_4__.writeFileSync((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(destDirPath, ".gitignore"), Buffer.from("*", "utf8"));
    (0,_tools_transformCodebase__WEBPACK_IMPORTED_MODULE_6__/* .transformCodebase */ .N)({
        srcDirPath: (0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_7__/* .getThisCodebaseRootDirPath */ .e)(), "res", "public", _shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .WELL_KNOWN_DIRECTORY_BASE_NAME.KEYCLOAKIFY_DEV_RESOURCES */ .Ju.KEYCLOAKIFY_DEV_RESOURCES),
        destDirPath
    });
    fs__WEBPACK_IMPORTED_MODULE_4__.writeFileSync((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(destDirPath, "README.txt"), Buffer.from(
    // prettier-ignore
    [
        "This directory is only used in dev mode by Keycloakify",
        "It won't be included in your final build.",
        "Do not modify anything in this directory.",
    ].join("\n")));
    fs__WEBPACK_IMPORTED_MODULE_4__.writeFileSync(keycloakifyBuildinfoFilePath, Buffer.from(keycloakifyBuildinfoRaw, "utf8"));
}
//# sourceMappingURL=copy-keycloak-resources-to-public.js.map

/***/ }),

/***/ 72138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "q": () => (/* binding */ maybeDelegateCommandToCustomHandler)
});

// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var esm_assert = __webpack_require__(29041);
// EXTERNAL MODULE: ./dist/bin/shared/constants.js
var constants = __webpack_require__(173);
;// CONCATENATED MODULE: ./dist/bin/shared/customHandler.js


const BIN_NAME = "_keycloakify-custom-handler";
const NOT_IMPLEMENTED_EXIT_CODE = 78;
function readParams(params) {
    const { apiVersion } = params;
    assert(apiVersion === "v1");
    const commandName = (() => {
        const envValue = process.env[CUSTOM_HANDLER_ENV_NAMES.COMMAND_NAME];
        assert(envValue !== undefined);
        return envValue;
    })();
    const buildContext = (() => {
        const envValue = process.env[CUSTOM_HANDLER_ENV_NAMES.BUILD_CONTEXT];
        assert(envValue !== undefined);
        return JSON.parse(envValue);
    })();
    return { commandName, buildContext };
}
//# sourceMappingURL=customHandler.js.map
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
// EXTERNAL MODULE: ./dist/bin/tools/nodeModulesBinDirPath.js
var tools_nodeModulesBinDirPath = __webpack_require__(73776);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
;// CONCATENATED MODULE: ./dist/bin/shared/customHandler_delegate.js






(0,esm_assert/* assert */.h)();
async function maybeDelegateCommandToCustomHandler(params) {
    const { commandName, buildContext } = params;
    const nodeModulesBinDirPath = await (0,tools_nodeModulesBinDirPath/* getNodeModulesBinDirPath */.K)({
        packageJsonFilePath: buildContext.packageJsonFilePath
    });
    if (!external_fs_.readdirSync(nodeModulesBinDirPath).includes(BIN_NAME)) {
        return { hasBeenHandled: false };
    }
    try {
        external_child_process_.execSync(`npx ${BIN_NAME}`, {
            stdio: "inherit",
            env: Object.assign(Object.assign({}, process.env), { [constants/* CUSTOM_HANDLER_ENV_NAMES.COMMAND_NAME */._S.COMMAND_NAME]: commandName, [constants/* CUSTOM_HANDLER_ENV_NAMES.BUILD_CONTEXT */._S.BUILD_CONTEXT]: JSON.stringify(buildContext) })
        });
    }
    catch (error) {
        const status = error.status;
        if (status === NOT_IMPLEMENTED_EXIT_CODE) {
            return { hasBeenHandled: false };
        }
        process.exit(status);
    }
    return { hasBeenHandled: true };
}
//# sourceMappingURL=customHandler_delegate.js.map

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

/***/ 43765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ existsAsync)
/* harmony export */ });
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_0__);

async function existsAsync(path) {
    try {
        await fs_promises__WEBPACK_IMPORTED_MODULE_0__.stat(path);
        return true;
    }
    catch (error) {
        if (error.code === "ENOENT")
            return false;
        throw error;
    }
}
//# sourceMappingURL=fs.existsAsync.js.map

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

/***/ 93721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "p": () => (/* binding */ getInstalledModuleDirPath)
});

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: ./dist/bin/tools/fs.existsAsync.js
var fs_existsAsync = __webpack_require__(43765);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
;// CONCATENATED MODULE: ./dist/bin/tools/isRootPath.js

function getIsRootPath(filePath) {
    const path_normalized = (0,external_path_.normalize)(filePath);
    // Unix-like root ("/")
    if (path_normalized === "/") {
        return true;
    }
    // Check for Windows drive root (e.g., "C:\\")
    if (/^[a-zA-Z]:\\$/.test(path_normalized)) {
        return true;
    }
    // Check for UNC root (e.g., "\\server\share")
    if (/^\\\\[^\\]+\\[^\\]+\\?$/.test(path_normalized)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=isRootPath.js.map
;// CONCATENATED MODULE: ./dist/bin/tools/getInstalledModuleDirPath.js





async function getInstalledModuleDirPath(params) {
    const { moduleName, packageJsonDirPath } = params;
    {
        let dirPath = packageJsonDirPath;
        while (true) {
            const dirPath_candidate = (0,external_path_.join)(dirPath, "node_modules", ...moduleName.split("/"));
            let doesExist;
            try {
                doesExist = await (0,fs_existsAsync/* existsAsync */.o)(dirPath_candidate);
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
            dirPath = (0,external_path_.join)(dirPath, "..");
        }
    }
    const dirPath = external_child_process_.execSync(`npm list ${moduleName}`, {
        cwd: packageJsonDirPath
    })
        .toString("utf8")
        .trim();
    (0,assert/* assert */.h)(dirPath !== "");
    return dirPath;
}
//# sourceMappingURL=getInstalledModuleDirPath.js.map

/***/ }),

/***/ 73776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ getNodeModulesBinDirPath)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58822);
/* harmony import */ var _getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93721);
/* harmony import */ var _fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43765);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49622);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29041);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38469);








let cache_bestEffort = undefined;
/** NOTE: Careful, this function can fail when the binary
 *  Used is not in the node_modules directory of the project
 * (for example when running tests with vscode extension we'll get
 * '/Users/dylan/.vscode/extensions/vitest.explorer-1.16.0/dist/worker.js'
 *
 * instead of
 * '/Users/joseph/.nvm/versions/node/v22.12.0/bin/node'
 * or
 * '/Users/joseph/github/keycloakify-starter/node_modules/.bin/vite'
 *
 * as the value of process.argv[1]
 */
function getNodeModulesBinDirPath_bestEffort() {
    if (cache_bestEffort !== undefined) {
        return cache_bestEffort;
    }
    const binPath = process.argv[1];
    special_case_running_not_from_distribution: {
        if (!binPath.endsWith(".ts")) {
            break special_case_running_not_from_distribution;
        }
        const packageJsonDirPath = (0,_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_1__/* .getNearestPackageJsonDirPath */ .B)((0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(binPath));
        const nodeModulesBinDirPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(packageJsonDirPath, "node_modules", ".bin");
        return nodeModulesBinDirPath;
    }
    const segments = [".bin"];
    let foundNodeModules = false;
    for (const segment of binPath.split(path__WEBPACK_IMPORTED_MODULE_0__.sep).reverse()) {
        skip_segment: {
            if (foundNodeModules) {
                break skip_segment;
            }
            if (segment === "node_modules") {
                foundNodeModules = true;
                break skip_segment;
            }
            continue;
        }
        segments.unshift(segment);
    }
    if (!foundNodeModules) {
        throw new Error(`Could not find node_modules in path ${binPath}`);
    }
    const nodeModulesBinDirPath = segments.join(path__WEBPACK_IMPORTED_MODULE_0__.sep);
    cache_bestEffort = nodeModulesBinDirPath;
    return nodeModulesBinDirPath;
}
let cache_withPackageJsonFileDirPath = undefined;
async function getNodeModulesBinDirPath_withPackageJsonFileDirPath(params) {
    const { packageJsonFilePath } = params;
    use_cache: {
        if (cache_withPackageJsonFileDirPath === undefined) {
            break use_cache;
        }
        if (cache_withPackageJsonFileDirPath.packageJsonFilePath !== packageJsonFilePath) {
            cache_withPackageJsonFileDirPath = undefined;
            break use_cache;
        }
        return cache_withPackageJsonFileDirPath.nodeModulesBinDirPath;
    }
    // [...]node_modules/keycloakify
    const installedModuleDirPath = await (0,_getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_2__/* .getInstalledModuleDirPath */ .p)({
        // Here it will always be "keycloakify" but since we are in tools/ we make something generic
        moduleName: await (async () => {
            const zParsedPackageJson = (() => {
                const zTargetType = zod__WEBPACK_IMPORTED_MODULE_6__/* .object */ .Ry({
                    name: zod__WEBPACK_IMPORTED_MODULE_6__/* .string */ .Z_()
                });
                tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h;
                return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(zTargetType);
            })();
            const parsedPackageJson = JSON.parse((await fs_promises__WEBPACK_IMPORTED_MODULE_4__.readFile((0,path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_1__/* .getThisCodebaseRootDirPath */ .e)(), "package.json"))).toString("utf8"));
            zParsedPackageJson.parse(parsedPackageJson);
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__.is)(parsedPackageJson));
            return parsedPackageJson.name;
        })(),
        packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(packageJsonFilePath)
    });
    const segments = installedModuleDirPath.split(path__WEBPACK_IMPORTED_MODULE_0__.sep);
    while (true) {
        const segment = segments.pop();
        if (segment === undefined) {
            throw new Error(`Could not find .bin directory relative to ${packageJsonFilePath}`);
        }
        if (segment !== "node_modules") {
            continue;
        }
        const candidate = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(segments.join(path__WEBPACK_IMPORTED_MODULE_0__.sep), segment, ".bin");
        if (!(await (0,_fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__/* .existsAsync */ .o)(candidate))) {
            continue;
        }
        cache_withPackageJsonFileDirPath = {
            packageJsonFilePath,
            nodeModulesBinDirPath: candidate
        };
        break;
    }
    return cache_withPackageJsonFileDirPath.nodeModulesBinDirPath;
}
function getNodeModulesBinDirPath(params) {
    const { packageJsonFilePath } = params !== null && params !== void 0 ? params : {};
    return packageJsonFilePath === undefined
        ? getNodeModulesBinDirPath_bestEffort()
        : getNodeModulesBinDirPath_withPackageJsonFileDirPath({ packageJsonFilePath });
}
//# sourceMappingURL=nodeModulesBinDirPath.js.map

/***/ }),

/***/ 60332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ transformCodebase)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _crawl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73036);
/* harmony import */ var _tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89693);




/**
 * Apply a transformation function to every file of directory
 * If source and destination are the same this function can be used to apply the transformation in place
 * like filtering out some files or modifying them.
 * */
function transformCodebase(params) {
    const { srcDirPath, transformSourceCode } = params;
    const isTargetSameAsSource = path__WEBPACK_IMPORTED_MODULE_1__.relative(srcDirPath, params.destDirPath) === "";
    const destDirPath = isTargetSameAsSource
        ? path__WEBPACK_IMPORTED_MODULE_1__.join(srcDirPath, "..", "tmp_xOsPdkPsTdzPs34sOkHs")
        : params.destDirPath;
    fs__WEBPACK_IMPORTED_MODULE_0__.mkdirSync(destDirPath, {
        recursive: true
    });
    for (const fileRelativePath of (0,_crawl__WEBPACK_IMPORTED_MODULE_2__/* .crawl */ .J)({
        dirPath: srcDirPath,
        returnedPathsType: "relative to dirPath"
    })) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_1__.join(srcDirPath, fileRelativePath);
        const destFilePath = path__WEBPACK_IMPORTED_MODULE_1__.join(destDirPath, fileRelativePath);
        // NOTE: Optimization, if we don't need to transform the file, just copy
        // it using the lower level implementation.
        if (transformSourceCode === undefined) {
            fs__WEBPACK_IMPORTED_MODULE_0__.mkdirSync(path__WEBPACK_IMPORTED_MODULE_1__.dirname(destFilePath), {
                recursive: true
            });
            fs__WEBPACK_IMPORTED_MODULE_0__.copyFileSync(filePath, destFilePath);
            continue;
        }
        const transformSourceCodeResult = transformSourceCode({
            sourceCode: fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(filePath),
            filePath,
            fileRelativePath
        });
        if (transformSourceCodeResult === undefined) {
            continue;
        }
        fs__WEBPACK_IMPORTED_MODULE_0__.mkdirSync(path__WEBPACK_IMPORTED_MODULE_1__.dirname(destFilePath), {
            recursive: true
        });
        const { newFileName, modifiedSourceCode } = transformSourceCodeResult;
        fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync(path__WEBPACK_IMPORTED_MODULE_1__.join(path__WEBPACK_IMPORTED_MODULE_1__.dirname(destFilePath), newFileName !== null && newFileName !== void 0 ? newFileName : path__WEBPACK_IMPORTED_MODULE_1__.basename(destFilePath)), modifiedSourceCode);
    }
    if (isTargetSameAsSource) {
        (0,_tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_3__/* .rmSync */ .a)(srcDirPath, { recursive: true });
        fs__WEBPACK_IMPORTED_MODULE_0__.renameSync(destDirPath, srcDirPath);
    }
}
//# sourceMappingURL=transformCodebase.js.map

/***/ })

};
;