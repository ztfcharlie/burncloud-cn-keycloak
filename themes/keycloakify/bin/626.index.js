"use strict";
exports.id = 626;
exports.ids = [626];
exports.modules = {

/***/ 60355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "command": () => (/* binding */ command)
/* harmony export */ });
/* harmony import */ var _shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72138);
/* harmony import */ var _shared_initializeSpa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98656);
/* harmony import */ var _shared_exitIfUncommittedChanges__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22058);



async function command(params) {
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,_shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_0__/* .maybeDelegateCommandToCustomHandler */ .q)({
        commandName: "initialize-admin-theme",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    (0,_shared_exitIfUncommittedChanges__WEBPACK_IMPORTED_MODULE_2__/* .exitIfUncommittedChanges */ .l)({
        projectDirPath: buildContext.projectDirPath
    });
    await (0,_shared_initializeSpa__WEBPACK_IMPORTED_MODULE_1__.initializeSpa)({
        themeType: "admin",
        buildContext
    });
}
//# sourceMappingURL=initialize-admin-theme.js.map

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

/***/ })

};
;