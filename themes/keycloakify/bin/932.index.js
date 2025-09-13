"use strict";
exports.id = 932;
exports.ids = [932,30,675];
exports.modules = {

/***/ 16932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "command": () => (/* binding */ command)
/* harmony export */ });
/* harmony import */ var cli_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99398);
/* harmony import */ var cli_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cli_select__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72138);
/* harmony import */ var _shared_exitIfUncommittedChanges__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22058);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29041);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(38469);
/* harmony import */ var _shared_addSyncExtensionsToPostinstallScript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80339);
/* harmony import */ var _tools_runPrettier__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48433);
/* harmony import */ var _tools_npmInstall__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(63046);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(32081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(49622);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_10__);













async function command(params) {
    var _a;
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,_shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_1__/* .maybeDelegateCommandToCustomHandler */ .q)({
        commandName: "initialize-email-theme",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    (0,_shared_exitIfUncommittedChanges__WEBPACK_IMPORTED_MODULE_2__/* .exitIfUncommittedChanges */ .l)({
        projectDirPath: buildContext.projectDirPath
    });
    const emailThemeSrcDirPath = (0,path__WEBPACK_IMPORTED_MODULE_3__.join)(buildContext.themeSrcDirPath, "email");
    if (fs__WEBPACK_IMPORTED_MODULE_4__.existsSync(emailThemeSrcDirPath) &&
        fs__WEBPACK_IMPORTED_MODULE_4__.readdirSync(emailThemeSrcDirPath).length > 0) {
        console.warn(chalk__WEBPACK_IMPORTED_MODULE_10___default().red(`There is already a ${(0,path__WEBPACK_IMPORTED_MODULE_3__.relative)(process.cwd(), emailThemeSrcDirPath)} directory in your project. Aborting.`));
        process.exit(-1);
    }
    const { value: emailThemeType } = await cli_select__WEBPACK_IMPORTED_MODULE_0___default()({
        values: [
            "native (FreeMarker)",
            "Another email templating solution"
        ]
    }).catch(() => {
        process.exit(-1);
    });
    if (emailThemeType === "Another email templating solution") {
        console.log([
            "There is currently no automated support for keycloakify-email, it has to be done manually, see documentation:",
            "https://docs.keycloakify.dev/theme-types/email-theme"
        ].join("\n"));
        process.exit(0);
    }
    const parsedPackageJson = (() => {
        const zParsedPackageJson = (() => {
            const zTargetType = zod__WEBPACK_IMPORTED_MODULE_11__/* .object */ .Ry({
                scripts: zod__WEBPACK_IMPORTED_MODULE_11__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_11__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_11__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_11__/* .undefined */ .S1()])).optional(),
                dependencies: zod__WEBPACK_IMPORTED_MODULE_11__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_11__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_11__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_11__/* .undefined */ .S1()])).optional(),
                devDependencies: zod__WEBPACK_IMPORTED_MODULE_11__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_11__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_11__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_11__/* .undefined */ .S1()])).optional()
            });
            tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h;
            return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_12__.id)(zTargetType);
        })();
        const parsedPackageJson = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_4__.readFileSync(buildContext.packageJsonFilePath).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__.is)(parsedPackageJson));
        return parsedPackageJson;
    })();
    (0,_shared_addSyncExtensionsToPostinstallScript__WEBPACK_IMPORTED_MODULE_6__/* .addSyncExtensionsToPostinstallScript */ .N)({
        parsedPackageJson,
        buildContext
    });
    const moduleName = `@keycloakify/email-native`;
    const [version] = (() => {
        const cmdOutput = child_process__WEBPACK_IMPORTED_MODULE_9__.execSync(`npm show ${moduleName} versions --json`)
            .toString("utf8")
            .trim();
        const versions = JSON.parse(cmdOutput);
        // NOTE: Bug in some older npm versions
        if (typeof versions === "string") {
            return [versions];
        }
        return versions;
    })()
        .reverse()
        .filter(version => !version.includes("-"));
    (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(version !== undefined);
    ((_a = parsedPackageJson.dependencies) !== null && _a !== void 0 ? _a : (parsedPackageJson.dependencies = {}))[moduleName] = `~${version}`;
    if (parsedPackageJson.devDependencies !== undefined) {
        delete parsedPackageJson.devDependencies[moduleName];
    }
    {
        let sourceCode = JSON.stringify(parsedPackageJson, undefined, 2);
        if (await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_7__/* .getIsPrettierAvailable */ .MT)()) {
            sourceCode = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_7__/* .runPrettier */ .eY)({
                sourceCode,
                filePath: buildContext.packageJsonFilePath
            });
        }
        fs__WEBPACK_IMPORTED_MODULE_4__.writeFileSync(buildContext.packageJsonFilePath, Buffer.from(sourceCode, "utf8"));
    }
    await (0,_tools_npmInstall__WEBPACK_IMPORTED_MODULE_8__/* .npmInstall */ .c)({
        packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_3__.dirname)(buildContext.packageJsonFilePath)
    });
    console.log(chalk__WEBPACK_IMPORTED_MODULE_10___default().green("Email theme initialized."));
}
//# sourceMappingURL=initialize-email-theme.js.map

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

/***/ 22058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ exitIfUncommittedChanges)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_1__);


function exitIfUncommittedChanges(params) {
    const { projectDirPath } = params;
    let hasUncommittedChanges = undefined;
    try {
        hasUncommittedChanges =
            child_process__WEBPACK_IMPORTED_MODULE_0___default().execSync(`git status --porcelain`, {
                cwd: projectDirPath
            })
                .toString()
                .trim() !== "";
    }
    catch (_a) {
        // Probably not a git repository
        return;
    }
    if (!hasUncommittedChanges) {
        return;
    }
    console.warn([
        chalk__WEBPACK_IMPORTED_MODULE_1___default().red("Please commit or stash your changes before running this command.\n"),
        "This command will modify your project's files so it's better to have a clean working directory",
        "so that you can easily see what has been changed and revert if needed."
    ].join(" "));
    process.exit(-1);
}
//# sourceMappingURL=exitIfUncommittedChanges.js.map

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

/***/ 48433:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LG": () => (/* binding */ getPrettier),
/* harmony export */   "MT": () => (/* binding */ getIsPrettierAvailable),
/* harmony export */   "eY": () => (/* binding */ runPrettier)
/* harmony export */ });
/* harmony import */ var _nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73776);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38469);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29041);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tsafe_symToStr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(76030);
/* harmony import */ var _readThisNpmPackageVersion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64795);
/* module decorator */ module = __webpack_require__.hmd(module);









getIsPrettierAvailable.cache = (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(undefined);
async function getIsPrettierAvailable() {
    var _a;
    if (getIsPrettierAvailable.cache !== undefined) {
        return getIsPrettierAvailable.cache;
    }
    const nodeModulesBinDirPath = (0,_nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getNodeModulesBinDirPath */ .K)({
        packageJsonFilePath: undefined
    });
    const prettierBinPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(nodeModulesBinDirPath, "prettier");
    const stats = await fs_promises__WEBPACK_IMPORTED_MODULE_2__.stat(prettierBinPath).catch(() => undefined);
    const isPrettierAvailable = (_a = stats === null || stats === void 0 ? void 0 : stats.isFile()) !== null && _a !== void 0 ? _a : false;
    getIsPrettierAvailable.cache = isPrettierAvailable;
    return isPrettierAvailable;
}
getPrettier.cache = (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(undefined);
async function getPrettier() {
    (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(getIsPrettierAvailable());
    if (getPrettier.cache !== undefined) {
        return getPrettier.cache;
    }
    let prettier = (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(undefined);
    import_prettier: {
        // NOTE: When module is linked we want to make sure we import the correct version
        // of prettier, that is the one of the project, not the one of this repo.
        // So we do a sketchy eval to bypass ncc.
        // We make sure to only do that when linking, otherwise we import properly.
        if ((0,_readThisNpmPackageVersion__WEBPACK_IMPORTED_MODULE_6__/* .readThisNpmPackageVersion */ .K)().startsWith("0.0.0")) {
            const prettierDirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.resolve)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getNodeModulesBinDirPath */ .K)({ packageJsonFilePath: undefined }), "..", "prettier"));
            const isCJS =  true && module.exports;
            if (isCJS) {
                eval(`${(0,tsafe_symToStr__WEBPACK_IMPORTED_MODULE_8__/* .symToStr */ .r)({ prettier })} = require("${prettierDirPath}")`);
            }
            else {
                prettier = await new Promise(_resolve => {
                    eval(`import("file:///${(0,path__WEBPACK_IMPORTED_MODULE_1__.join)(prettierDirPath, "index.mjs").replace(/\\/g, "/")}").then(prettier => _resolve(prettier))`);
                });
            }
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(!(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__.is)(prettier));
            break import_prettier;
        }
        prettier = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 79421, 23));
    }
    const configHash = await (async () => {
        const configFilePath = await prettier.resolveConfigFile((0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getNodeModulesBinDirPath */ .K)({ packageJsonFilePath: undefined }), "..", ".."));
        if (configFilePath === null) {
            return "";
        }
        const data = await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(configFilePath);
        return crypto__WEBPACK_IMPORTED_MODULE_5__.createHash("sha256").update(data).digest("hex");
    })();
    const prettierAndConfig = {
        prettier,
        configHash
    };
    getPrettier.cache = prettierAndConfig;
    return prettierAndConfig;
}
async function runPrettier(params) {
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
        console.log(chalk__WEBPACK_IMPORTED_MODULE_4___default().red(`You probably need to upgrade the version of prettier in your project`));
        throw error;
    }
    return typeof sourceCode === "string"
        ? formattedSourceCode
        : Buffer.from(formattedSourceCode, "utf8");
}
//# sourceMappingURL=runPrettier.js.map

/***/ }),

/***/ 18512:
/***/ ((module) => {


const x = module.exports;
const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

x.cursorTo = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	if (typeof y !== 'number') {
		return ESC + (x + 1) + 'G';
	}

	return ESC + (y + 1) + ';' + (x + 1) + 'H';
};

x.cursorMove = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	let ret = '';

	if (x < 0) {
		ret += ESC + (-x) + 'D';
	} else if (x > 0) {
		ret += ESC + x + 'C';
	}

	if (y < 0) {
		ret += ESC + (-y) + 'A';
	} else if (y > 0) {
		ret += ESC + y + 'B';
	}

	return ret;
};

x.cursorUp = count => ESC + (typeof count === 'number' ? count : 1) + 'A';
x.cursorDown = count => ESC + (typeof count === 'number' ? count : 1) + 'B';
x.cursorForward = count => ESC + (typeof count === 'number' ? count : 1) + 'C';
x.cursorBackward = count => ESC + (typeof count === 'number' ? count : 1) + 'D';

x.cursorLeft = ESC + 'G';
x.cursorSavePosition = ESC + (isTerminalApp ? '7' : 's');
x.cursorRestorePosition = ESC + (isTerminalApp ? '8' : 'u');
x.cursorGetPosition = ESC + '6n';
x.cursorNextLine = ESC + 'E';
x.cursorPrevLine = ESC + 'F';
x.cursorHide = ESC + '?25l';
x.cursorShow = ESC + '?25h';

x.eraseLines = count => {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += x.eraseLine + (i < count - 1 ? x.cursorUp() : '');
	}

	if (count) {
		clear += x.cursorLeft;
	}

	return clear;
};

x.eraseEndLine = ESC + 'K';
x.eraseStartLine = ESC + '1K';
x.eraseLine = ESC + '2K';
x.eraseDown = ESC + 'J';
x.eraseUp = ESC + '1J';
x.eraseScreen = ESC + '2J';
x.scrollUp = ESC + 'S';
x.scrollDown = ESC + 'T';

x.clearScreen = '\u001Bc';

x.clearTerminal = process.platform === 'win32' ?
	`${x.eraseScreen}${ESC}0f` :
	// 1. Erases the screen (Only done in case `2` is not supported)
	// 2. Erases the whole screen including scrollback buffer
	// 3. Moves cursor to the top-left position
	// More info: https://www.real-world-systems.com/docs/ANSIcode.html
	`${x.eraseScreen}${ESC}3J${ESC}H`;

x.beep = BEL;

x.link = (text, url) => {
	return [
		OSC,
		'8',
		SEP,
		SEP,
		url,
		BEL,
		text,
		OSC,
		'8',
		SEP,
		SEP,
		BEL
	].join('');
};

x.image = (buf, opts) => {
	opts = opts || {};

	let ret = OSC + '1337;File=inline=1';

	if (opts.width) {
		ret += `;width=${opts.width}`;
	}

	if (opts.height) {
		ret += `;height=${opts.height}`;
	}

	if (opts.preserveAspectRatio === false) {
		ret += ';preserveAspectRatio=0';
	}

	return ret + ':' + buf.toString('base64') + BEL;
};

x.iTerm = {};

x.iTerm.setCwd = cwd => OSC + '50;CurrentDir=' + (cwd || process.cwd()) + BEL;


/***/ }),

/***/ 39340:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.withPromise = exports.withCallback = void 0;

/**
 * Open the input with a normal callback function
 *
 * @param {Input} input - input object
 * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
 * @param {function} callback - callback function
 */
const withCallback = (input, valueMapper, callback) => {
  input.open();
  input.onSelect((id, value) => callback(valueMapper(id, value)));
};
/**
 * Open the input with a promise
 *
 * @param {Input} input - input object
 * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
 */


exports.withCallback = withCallback;

const withPromise = (input, valueMapper) => {
  return new Promise((resolve, reject) => {
    input.open();
    input.onSelect((id, value) => {
      if (id === null) {
        reject();
      } else {
        resolve(valueMapper(id, value));
      }
    });
  });
};

exports.withPromise = withPromise;

/***/ }),

/***/ 99398:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _input = _interopRequireDefault(__webpack_require__(25730));

var _renderer = _interopRequireDefault(__webpack_require__(16059));

var _callbackMappers = __webpack_require__(39340);

var _valueMappers = __webpack_require__(26730);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Default options
 */
const defaultOptions = {
  outputStream: process.stdout,
  inputStream: process.stdin,
  values: [],
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  indentation: 0,
  cleanup: true,
  valueRenderer: value => value
};
/**
 * Create an instance of cli-select with the given options
 *
 * @param {object} options - options for cli-select
 * @param {function} callback - if specified, a callback will be used, otherwise a promise gets returned (optional)
 */

const creator = (options, callback) => {
  // merge options with default options
  options = _objectSpread({}, defaultOptions, options); // create renderer and input instances

  const renderer = new _renderer.default(options, options.outputStream);
  const input = new _input.default(options.inputStream);
  input.setDefaultValue(options.defaultValue);
  input.attachRenderer(renderer); // handle array and object values

  let valueMapper;

  if (Array.isArray(options.values)) {
    valueMapper = (0, _valueMappers.withArrayValues)(options);
  } else {
    valueMapper = (0, _valueMappers.withObjectValues)(options);
  } // map values


  options.values = valueMapper.input;
  input.setValues(options.values); // handle different callback methods

  if (typeof callback === 'function') {
    return (0, _callbackMappers.withCallback)(input, valueMapper.output, callback);
  } else {
    return (0, _callbackMappers.withPromise)(input, valueMapper.output);
  }
};

exports = module.exports = creator;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _default = creator;
exports["default"] = _default;

/***/ }),

/***/ 25730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _readline = _interopRequireDefault(__webpack_require__(14521));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handle cli input
 */
class Input {
  /**
   * Input constructor
   *
   * @param {any} stream - stream to catch (optional)
   */
  constructor(stream = process.stdin) {
    // set default values
    this.stream = stream;
    this.values = [];
    this.selectedValue = 0;

    this.onSelectListener = () => {};

    this.onKeyPress = this.onKeyPress.bind(this);
  }
  /**
   * Set the available values
   *
   * @param {array} values - all available values
   */


  setValues(values) {
    this.values = values;

    if (this.renderer) {
      this.renderer.setValues(values);
    }
  }
  /**
   * Set the default value
   *
   * @param {number} defaultValue - default value id
   */


  setDefaultValue(defaultValue) {
    this.selectedValue = defaultValue;
  }
  /**
   * Attach a renderer to the input catcher
   *
   * @param {Renderer} renderer - renderer to use for rendering responses
   */


  attachRenderer(renderer) {
    this.renderer = renderer;
    this.renderer.setValues(this.values);
  }
  /**
   * Register an on select listener
   *
   * @param {function} listener - listener function which receives two parameters: valueId and value
   */


  onSelect(listener) {
    this.onSelectListener = listener;
  }
  /**
   * Open the stream and listen for input
   */


  open() {
    // register keypress event
    _readline.default.emitKeypressEvents(this.stream); // handle keypress


    this.stream.on('keypress', this.onKeyPress); // initially render the response

    if (this.renderer) {
      this.renderer.render(this.selectedValue);
    } // hide pressed keys and start listening on input


    this.stream.setRawMode(true);
    this.stream.resume();
  }
  /**
   * Close the stream
   *
   * @param {boolean} cancelled - true if no value was selected (optional)
   */


  close(cancelled = false) {
    // reset stream properties
    this.stream.setRawMode(false);
    this.stream.pause(); // cleanup the output

    if (this.renderer) {
      this.renderer.cleanup();
    } // call the on select listener


    if (cancelled) {
      this.onSelectListener(null);
    } else {
      this.onSelectListener(this.selectedValue, this.values[this.selectedValue]);
    }

    this.stream.removeListener('keypress', this.onKeyPress);
  }
  /**
   * Render the response
   */


  render() {
    if (!this.renderer) {
      return;
    }

    this.renderer.render(this.selectedValue);
  }
  /**
   * Handle key press event
   *
   * @param {string} string - input string
   * @param {object} key - object containing information about the pressed key
   */


  onKeyPress(string, key) {
    if (key) {
      if (key.name === 'up' && this.selectedValue > 0) {
        this.selectedValue--;
        this.render();
      } else if (key.name === 'down' && this.selectedValue + 1 < this.values.length) {
        this.selectedValue++;
        this.render();
      } else if (key.name === 'return') {
        this.close();
      } else if (key.name === 'escape' || key.name === 'c' && key.ctrl) {
        this.close(true);
      }
    }
  }

}

exports["default"] = Input;

/***/ }),

/***/ 16059:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _readline = _interopRequireDefault(__webpack_require__(14521));

var _ansiEscapes = __webpack_require__(18512);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Response renderer
 */
class Renderer {
  /**
   * Renderer constructor
   *
   * @param {object} options - renderer options
   * @param {any} stream - stream to write to (optional)
   */
  constructor(options, stream = process.stdout) {
    this.options = options;
    this.stream = stream;
    this.values = [];
    this.initialRender = true;
  }
  /**
   * Set the available values
   *
   * @param {array} values - all available values
   */


  setValues(values) {
    this.values = values;
  }
  /**
   * Render the values
   *
   * @param {number} selectedValue - selected value (optional)
   */


  render(selectedValue = 0) {
    if (this.initialRender) {
      // hide the cursor initially
      this.initialRender = false;
      this.stream.write(_ansiEscapes.cursorHide);
    } else {
      // remove previous lines and values
      this.stream.write((0, _ansiEscapes.eraseLines)(this.values.length));
    } // output the current values


    this.values.forEach((value, index) => {
      const symbol = selectedValue === index ? this.options.selected : this.options.unselected;
      const indentation = ' '.repeat(this.options.indentation);
      const renderedValue = this.options.valueRenderer(value, selectedValue === index);
      const end = index !== this.values.length - 1 ? '\n' : '';
      this.stream.write(indentation + symbol + ' ' + renderedValue + end);
    });
  }
  /**
   * Cleanup the console at the end
   */


  cleanup() {
    this.stream.write((0, _ansiEscapes.eraseLines)(this.values.length));
    this.stream.write(_ansiEscapes.cursorShow);
  }

}

exports["default"] = Renderer;

/***/ }),

/***/ 26730:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.withObjectValues = exports.withArrayValues = void 0;

/**
 * Map incoming and outgoing values if the initial values are an array
 *
 * @param {object} options - cli-select options
 */
const withArrayValues = options => {
  return {
    input: options.values,
    output: (id, value) => {
      return {
        id,
        value
      };
    }
  };
};
/**
 * Map incoming and outgoing values if the initial values are an object
 *
 * @param {object} options - cli-select options
 */


exports.withArrayValues = withArrayValues;

const withObjectValues = options => {
  const originalValues = options.values;
  return {
    input: Object.values(originalValues),
    output: (id, value) => {
      return {
        id: Object.keys(originalValues)[id],
        value
      };
    }
  };
};

exports.withObjectValues = withObjectValues;

/***/ }),

/***/ 76030:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ symToStr)
/* harmony export */ });
/** @see <https://docs.tsafe.dev/main/symtostr> */
function symToStr(wrap) {
    // @ts-expect-error: We know better
    return Object.keys(wrap)[0];
}


//# sourceMappingURL=symToStr.mjs.map


/***/ })

};
;