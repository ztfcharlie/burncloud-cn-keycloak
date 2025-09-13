"use strict";
exports.id = 311;
exports.ids = [311];
exports.modules = {

/***/ 75780:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "command": () => (/* reexport */ command)
});

// EXTERNAL MODULE: ./node_modules/cli-select/dist/index.js
var dist = __webpack_require__(99398);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);
// EXTERNAL MODULE: ./node_modules/chalk/source/index.js
var source = __webpack_require__(78818);
var source_default = /*#__PURE__*/__webpack_require__.n(source);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 4 modules
var types = __webpack_require__(49622);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __webpack_require__(38469);
;// CONCATENATED MODULE: ./dist/bin/initialize-account-theme/updateAccountThemeImplementationInConfig.js






(0,assert/* assert */.h)();
function updateAccountThemeImplementationInConfig(params) {
    const { buildContext, accountThemeType } = params;
    switch (buildContext.bundler) {
        case "vite":
            {
                const viteConfigPath = (0,external_path_.join)(buildContext.projectDirPath, "vite.config.ts");
                if (!external_fs_.existsSync(viteConfigPath)) {
                    console.log(source_default().bold(`You must manually set the accountThemeImplementation to "${accountThemeType}" in your vite config`));
                    break;
                }
                const viteConfigContent = external_fs_.readFileSync(viteConfigPath)
                    .toString("utf8");
                const modifiedViteConfigContent = viteConfigContent.replace(/accountThemeImplementation\s*:\s*"none"/, `accountThemeImplementation: "${accountThemeType}"`);
                if (modifiedViteConfigContent === viteConfigContent) {
                    console.log(source_default().bold(`You must manually set the accountThemeImplementation to "${accountThemeType}" in your vite.config.ts`));
                    break;
                }
                external_fs_.writeFileSync(viteConfigPath, modifiedViteConfigContent);
            }
            break;
        case "webpack":
            {
                const parsedPackageJson = (() => {
                    const zParsedPackageJson = (() => {
                        const zTargetType = types/* object */.Ry({
                            keycloakify: types/* record */.IM(types/* unknown */._4())
                        });
                        (0,assert/* assert */.h)();
                        return (0,id.id)(zTargetType);
                    })();
                    const parsedPackageJson = JSON.parse(external_fs_.readFileSync(buildContext.packageJsonFilePath).toString("utf8"));
                    zParsedPackageJson.parse(parsedPackageJson);
                    (0,assert/* assert */.h)((0,assert.is)(parsedPackageJson));
                    return parsedPackageJson;
                })();
                parsedPackageJson.keycloakify.accountThemeImplementation =
                    accountThemeType;
                external_fs_.writeFileSync(buildContext.packageJsonFilePath, Buffer.from(JSON.stringify(parsedPackageJson, undefined, 4), "utf8"));
            }
            break;
    }
}
//# sourceMappingURL=updateAccountThemeImplementationInConfig.js.map
// EXTERNAL MODULE: ./dist/bin/shared/customHandler_delegate.js + 1 modules
var customHandler_delegate = __webpack_require__(72138);
// EXTERNAL MODULE: ./dist/bin/shared/exitIfUncommittedChanges.js
var exitIfUncommittedChanges = __webpack_require__(22058);
// EXTERNAL MODULE: ./dist/bin/tools/getThisCodebaseRootDirPath.js
var getThisCodebaseRootDirPath = __webpack_require__(58822);
;// CONCATENATED MODULE: ./dist/bin/initialize-account-theme/initialize-account-theme.js








async function command(params) {
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,customHandler_delegate/* maybeDelegateCommandToCustomHandler */.q)({
        commandName: "initialize-account-theme",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    const accountThemeSrcDirPath = (0,external_path_.join)(buildContext.themeSrcDirPath, "account");
    (0,exitIfUncommittedChanges/* exitIfUncommittedChanges */.l)({
        projectDirPath: buildContext.projectDirPath
    });
    console.log(source_default().cyan("Which account theme type?"));
    const { value: accountThemeType } = await dist_default()({
        values: ["Single-Page", "Multi-Page"]
    }).catch(() => {
        process.exit(-1);
    });
    console.log(`${accountThemeType}\n`);
    switch (accountThemeType) {
        case "Multi-Page":
            {
                if (external_fs_.existsSync(accountThemeSrcDirPath) &&
                    external_fs_.readdirSync(accountThemeSrcDirPath).length > 0) {
                    console.warn(source_default().red(`There is already a ${(0,external_path_.relative)(process.cwd(), accountThemeSrcDirPath)} directory in your project. Aborting.`));
                    process.exit(-1);
                }
                updateAccountThemeImplementationInConfig({
                    buildContext,
                    accountThemeType
                });
                external_fs_.cpSync((0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "src", "bin", "initialize-account-theme", "multi-page-boilerplate"), accountThemeSrcDirPath, { recursive: true });
            }
            break;
        case "Single-Page":
            {
                updateAccountThemeImplementationInConfig({
                    buildContext,
                    accountThemeType
                });
                const { initializeSpa } = await Promise.all(/* import() */[__webpack_require__.e(502), __webpack_require__.e(656)]).then(__webpack_require__.bind(__webpack_require__, 98656));
                await initializeSpa({
                    themeType: "account",
                    buildContext
                });
            }
            break;
    }
}
//# sourceMappingURL=initialize-account-theme.js.map
;// CONCATENATED MODULE: ./dist/bin/initialize-account-theme/index.js

//# sourceMappingURL=index.js.map

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