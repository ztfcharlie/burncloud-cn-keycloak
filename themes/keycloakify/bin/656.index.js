"use strict";
exports.id = 656;
exports.ids = [656,30];
exports.modules = {

/***/ 98656:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeSpa": () => (/* binding */ initializeSpa)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29041);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(38469);
/* harmony import */ var _addSyncExtensionsToPostinstallScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80339);
/* harmony import */ var _tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(48433);
/* harmony import */ var _tools_npmInstall__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63046);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(32081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(49622);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(43765);












(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)();
async function initializeSpa(params) {
    var _a;
    const { themeType, buildContext } = params;
    {
        const themeTypeSrcDirPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(buildContext.themeSrcDirPath, themeType);
        if (fs__WEBPACK_IMPORTED_MODULE_1__.existsSync(themeTypeSrcDirPath) &&
            fs__WEBPACK_IMPORTED_MODULE_1__.readdirSync(themeTypeSrcDirPath).length > 0) {
            console.warn(chalk__WEBPACK_IMPORTED_MODULE_8___default().red(`There is already a ${(0,path__WEBPACK_IMPORTED_MODULE_0__.relative)(process.cwd(), themeTypeSrcDirPath)} directory in your project. Aborting.`));
            process.exit(-1);
        }
    }
    const parsedPackageJson = (() => {
        const zParsedPackageJson = (() => {
            const zTargetType = zod__WEBPACK_IMPORTED_MODULE_10__/* .object */ .Ry({
                scripts: zod__WEBPACK_IMPORTED_MODULE_10__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_10__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_10__/* .undefined */ .S1()])).optional(),
                dependencies: zod__WEBPACK_IMPORTED_MODULE_10__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_10__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_10__/* .undefined */ .S1()])).optional(),
                devDependencies: zod__WEBPACK_IMPORTED_MODULE_10__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_10__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_10__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_10__/* .undefined */ .S1()])).optional()
            });
            tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h;
            return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_11__.id)(zTargetType);
        })();
        const parsedPackageJson = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync(buildContext.packageJsonFilePath).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__.is)(parsedPackageJson));
        return parsedPackageJson;
    })();
    (0,_addSyncExtensionsToPostinstallScript__WEBPACK_IMPORTED_MODULE_4__/* .addSyncExtensionsToPostinstallScript */ .N)({
        parsedPackageJson,
        buildContext
    });
    await disableVerbatimModuleSyntax({
        projectDirPath: buildContext.projectDirPath
    });
    const uiSharedMajor = (() => {
        const dependencies = Object.assign(Object.assign({}, parsedPackageJson.devDependencies), parsedPackageJson.dependencies);
        const version = dependencies["@keycloakify/keycloak-ui-shared"];
        if (version === undefined) {
            return undefined;
        }
        const match = version.match(/^[^~]?(\d+)\./);
        if (match === null) {
            return undefined;
        }
        return match[1];
    })();
    const moduleName = `@keycloakify/keycloak-${themeType}-ui`;
    const version = (() => {
        const cmdOutput = child_process__WEBPACK_IMPORTED_MODULE_7__.execSync(`npm show ${moduleName} versions --json`)
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
        .filter(version => !version.includes("-"))
        .find(version => uiSharedMajor === undefined ? true : version.startsWith(`${uiSharedMajor}.`));
    (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(version !== undefined);
    ((_a = parsedPackageJson.dependencies) !== null && _a !== void 0 ? _a : (parsedPackageJson.dependencies = {}))[moduleName] = `~${version}`;
    if (parsedPackageJson.devDependencies !== undefined) {
        delete parsedPackageJson.devDependencies[moduleName];
    }
    {
        let sourceCode = JSON.stringify(parsedPackageJson, undefined, 2);
        if (await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .getIsPrettierAvailable */ .MT)()) {
            sourceCode = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .runPrettier */ .eY)({
                sourceCode,
                filePath: buildContext.packageJsonFilePath
            });
        }
        fs__WEBPACK_IMPORTED_MODULE_1__.writeFileSync(buildContext.packageJsonFilePath, Buffer.from(sourceCode, "utf8"));
    }
    await (0,_tools_npmInstall__WEBPACK_IMPORTED_MODULE_6__/* .npmInstall */ .c)({
        packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(buildContext.packageJsonFilePath)
    });
}
async function disableVerbatimModuleSyntax(params) {
    const { projectDirPath } = params;
    const filePath = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(projectDirPath, "tsconfig.app.json");
    if (!(await (0,_tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_9__/* .existsAsync */ .o)(filePath))) {
        return;
    }
    let content = (await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(filePath)).toString("utf8");
    const regExp = /"verbatimModuleSyntax"\s*:\s*true\s*(,?)/m;
    if (!regExp.test(content)) {
        return;
    }
    content = content.replace(regExp, `"verbatimModuleSyntax": false$1`);
    await fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile(filePath, Buffer.from(content, "utf8"));
}
//# sourceMappingURL=initializeSpa.js.map

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