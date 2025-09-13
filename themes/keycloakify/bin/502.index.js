"use strict";
exports.id = 502;
exports.ids = [502];
exports.modules = {

/***/ 80339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ addSyncExtensionsToPostinstallScript)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29041);


(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_1__/* .assert */ .h)();
function addSyncExtensionsToPostinstallScript(params) {
    var _a;
    const { parsedPackageJson, buildContext } = params;
    const cmd_base = "keycloakify sync-extensions";
    const projectCliOptionValue = (() => {
        const packageJsonDirPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(buildContext.packageJsonFilePath);
        const relativePath = (0,path__WEBPACK_IMPORTED_MODULE_0__.relative)(packageJsonDirPath, buildContext.projectDirPath);
        if (relativePath === "") {
            return undefined;
        }
        return relativePath.split(path__WEBPACK_IMPORTED_MODULE_0__.sep).join("/");
    })();
    const generateCmd = (params) => {
        const { cmd_preexisting } = params;
        let cmd = cmd_preexisting === undefined ? "" : `${cmd_preexisting} && `;
        cmd += cmd_base;
        if (projectCliOptionValue !== undefined) {
            cmd += ` -p ${projectCliOptionValue}`;
        }
        return cmd;
    };
    {
        const scripts = ((_a = parsedPackageJson.scripts) !== null && _a !== void 0 ? _a : (parsedPackageJson.scripts = {}));
        for (const scriptName of ["postinstall", "prepare"]) {
            const cmd_preexisting = scripts[scriptName];
            if (cmd_preexisting === undefined) {
                continue;
            }
            if (!cmd_preexisting.includes(cmd_base)) {
                scripts[scriptName] = generateCmd({ cmd_preexisting });
                return;
            }
        }
    }
    parsedPackageJson.scripts = Object.assign({ postinstall: generateCmd({ cmd_preexisting: undefined }) }, parsedPackageJson.scripts);
}
//# sourceMappingURL=addSyncExtensionsToPostinstallScript.js.map

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

/***/ }),

/***/ 50689:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VoidDeferred = exports.Deferred = void 0;
var overwriteReadonlyProp_1 = __webpack_require__(47803);
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this_1 = this;
        this.isPending = true;
        var resolve;
        var reject;
        this.pr = new Promise(function (resolve_, reject_) {
            resolve = function (value) {
                (0, overwriteReadonlyProp_1.overwriteReadonlyProp)(_this_1, "isPending", false);
                resolve_(value);
            };
            reject = function (error) {
                (0, overwriteReadonlyProp_1.overwriteReadonlyProp)(_this_1, "isPending", false);
                reject_(error);
            };
        });
        this.resolve = resolve;
        this.reject = reject;
    }
    return Deferred;
}());
exports.Deferred = Deferred;
var VoidDeferred = /** @class */ (function (_super) {
    __extends(VoidDeferred, _super);
    function VoidDeferred() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VoidDeferred;
}(Deferred));
exports.VoidDeferred = VoidDeferred;
//# sourceMappingURL=Deferred.js.map

/***/ }),

/***/ 47803:
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.overwriteReadonlyProp = void 0;
/**
 * Assign a value to a property even if the object is freezed or if the property is not writable
 * Throw if the assignation fail ( for example if the property is non configurable write: false )
 * */
var overwriteReadonlyProp = function (obj, propertyName, value) {
    try {
        obj[propertyName] = value;
    }
    catch (_a) { }
    if (obj[propertyName] === value) {
        return value;
    }
    var errorDefineProperty = undefined;
    var propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propertyName) || {
        "enumerable": true,
        "configurable": true,
    };
    if (!!propertyDescriptor.get) {
        throw new Error("Probably a wrong ides to overwrite ".concat(String(propertyName), " getter"));
    }
    try {
        Object.defineProperty(obj, propertyName, __assign(__assign({}, propertyDescriptor), { value: value }));
    }
    catch (error) {
        errorDefineProperty = error;
    }
    if (obj[propertyName] !== value) {
        throw errorDefineProperty || new Error("Can't assign");
    }
    return value;
};
exports.overwriteReadonlyProp = overwriteReadonlyProp;
//# sourceMappingURL=overwriteReadonlyProp.js.map

/***/ })

};
;