"use strict";
exports.id = 369;
exports.ids = [369];
exports.modules = {

/***/ 98097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "command": () => (/* binding */ command)
/* harmony export */ });
/* harmony import */ var _tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58822);
/* harmony import */ var cli_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99398);
/* harmony import */ var cli_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cli_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(173);
/* harmony import */ var tsafe_capitalize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14899);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tools_kebabCaseToSnakeCase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(17192);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29041);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tools_runPrettier__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48433);
/* harmony import */ var _shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(72138);











async function command(params) {
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,_shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_8__/* .maybeDelegateCommandToCustomHandler */ .q)({
        commandName: "add-story",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    console.log(chalk__WEBPACK_IMPORTED_MODULE_6___default().cyan("Theme type:"));
    const themeType = await (async () => {
        const values = _shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .THEME_TYPES.filter */ .Jh.filter(themeType => {
            switch (themeType) {
                case "account":
                    return buildContext.implementedThemeTypes.account.isImplemented;
                case "login":
                    return buildContext.implementedThemeTypes.login.isImplemented;
                case "admin":
                    return buildContext.implementedThemeTypes.admin.isImplemented;
            }
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(false);
        });
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(values.length > 0, "No theme is implemented in this project");
        if (values.length === 1) {
            return values[0];
        }
        const { value } = await cli_select__WEBPACK_IMPORTED_MODULE_1___default()({
            values
        }).catch(() => {
            process.exit(-1);
        });
        return value;
    })();
    if (themeType === "account" &&
        ((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(buildContext.implementedThemeTypes.account.isImplemented),
            buildContext.implementedThemeTypes.account.type === "Single-Page")) {
        console.log(`${chalk__WEBPACK_IMPORTED_MODULE_6___default().red("✗")} Sorry, there is no Storybook support for Single-Page Account themes.`);
        process.exit(0);
        return;
    }
    if (themeType === "admin") {
        console.log(`${chalk__WEBPACK_IMPORTED_MODULE_6___default().red("✗")} Sorry, there is no Storybook support for the Admin UI.`);
        process.exit(0);
        return;
    }
    console.log(`→ ${themeType}`);
    console.log(chalk__WEBPACK_IMPORTED_MODULE_6___default().cyan("Select the page you want to create a Storybook for:"));
    const { value: pageId } = await cli_select__WEBPACK_IMPORTED_MODULE_1___default()({
        values: (() => {
            switch (themeType) {
                case "login":
                    return [..._shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .LOGIN_THEME_PAGE_IDS */ .XV];
                case "account":
                    return [..._shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .ACCOUNT_THEME_PAGE_IDS */ .yV];
            }
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(false);
        })()
    }).catch(() => {
        process.exit(-1);
    });
    console.log(`→ ${pageId}`);
    const componentBasename = (0,tsafe_capitalize__WEBPACK_IMPORTED_MODULE_9__/* .capitalize */ .k)((0,_tools_kebabCaseToSnakeCase__WEBPACK_IMPORTED_MODULE_10__/* .kebabCaseToCamelCase */ .A)(pageId)).replace(/ftl$/, "stories.tsx");
    const targetFilePath = (0,path__WEBPACK_IMPORTED_MODULE_4__.join)(buildContext.themeSrcDirPath, themeType, "pages", componentBasename);
    if (fs__WEBPACK_IMPORTED_MODULE_3__.existsSync(targetFilePath)) {
        console.log(`${(0,path__WEBPACK_IMPORTED_MODULE_4__.relative)(process.cwd(), targetFilePath)} already exists`);
        process.exit(-1);
    }
    let sourceCode = fs__WEBPACK_IMPORTED_MODULE_3__.readFileSync((0,path__WEBPACK_IMPORTED_MODULE_4__.join)((0,_tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getThisCodebaseRootDirPath */ .e)(), "stories", themeType, "pages", componentBasename))
        .toString("utf8")
        .replace('import React from "react";\n', "")
        .replace(/from "[./]+dist\//, 'from "keycloakify/');
    run_prettier: {
        if (!(await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_7__/* .getIsPrettierAvailable */ .MT)())) {
            break run_prettier;
        }
        sourceCode = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_7__/* .runPrettier */ .eY)({
            filePath: targetFilePath,
            sourceCode: sourceCode
        });
    }
    {
        const targetDirPath = (0,path__WEBPACK_IMPORTED_MODULE_4__.dirname)(targetFilePath);
        if (!fs__WEBPACK_IMPORTED_MODULE_3__.existsSync(targetDirPath)) {
            fs__WEBPACK_IMPORTED_MODULE_3__.mkdirSync(targetDirPath, { recursive: true });
        }
    }
    fs__WEBPACK_IMPORTED_MODULE_3__.writeFileSync(targetFilePath, Buffer.from(sourceCode, "utf8"));
    console.log([
        `${chalk__WEBPACK_IMPORTED_MODULE_6___default().green("✓")} ${chalk__WEBPACK_IMPORTED_MODULE_6___default().bold((0,path__WEBPACK_IMPORTED_MODULE_4__.join)(".", (0,path__WEBPACK_IMPORTED_MODULE_4__.relative)(process.cwd(), targetFilePath)))} copy pasted from the Keycloakify source code into your project`,
        `You can start storybook with ${chalk__WEBPACK_IMPORTED_MODULE_6___default().bold("npm run storybook")}`
    ].join("\n"));
}
//# sourceMappingURL=add-story.js.map

/***/ })

};
;