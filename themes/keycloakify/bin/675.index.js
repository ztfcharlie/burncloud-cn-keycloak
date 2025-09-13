"use strict";
exports.id = 675;
exports.ids = [675];
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

/***/ })

};
;