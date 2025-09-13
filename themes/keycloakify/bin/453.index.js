"use strict";
exports.id = 453;
exports.ids = [453];
exports.modules = {

/***/ 93453:
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
/* harmony import */ var _shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(72138);
/* harmony import */ var _tools_runPrettier__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(48433);











async function command(params) {
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,_shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_7__/* .maybeDelegateCommandToCustomHandler */ .q)({
        commandName: "eject-page",
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
    if (themeType === "admin") {
        console.log("Use `npx keycloakify own` command instead, see documentation");
        process.exit(-1);
    }
    if (themeType === "account" &&
        ((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(buildContext.implementedThemeTypes.account.isImplemented),
            buildContext.implementedThemeTypes.account.type === "Single-Page")) {
        console.log(chalk__WEBPACK_IMPORTED_MODULE_6___default().yellow([
            "You are implementing a Single-Page Account theme.",
            "The eject-page command isn't applicable in this context"
        ].join("\n")));
        process.exit(1);
        return;
    }
    console.log(`→ ${themeType}`);
    console.log(chalk__WEBPACK_IMPORTED_MODULE_6___default().cyan("Select the page you want to customize:"));
    const templateValue = "Template.tsx (Layout common to every page)";
    const userProfileFormFieldsValue = "UserProfileFormFields.tsx (Renders the form of the register.ftl, login-update-profile.ftl, update-email.ftl and idp-review-user-profile.ftl)";
    const otherPageValue = "The page you're looking for isn't listed here";
    const { value: pageIdOrComponent } = await cli_select__WEBPACK_IMPORTED_MODULE_1___default()({
        values: (() => {
            switch (themeType) {
                case "login":
                    return [
                        templateValue,
                        userProfileFormFieldsValue,
                        ..._shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .LOGIN_THEME_PAGE_IDS */ .XV,
                        otherPageValue
                    ];
                case "account":
                    return [templateValue, ..._shared_constants__WEBPACK_IMPORTED_MODULE_2__/* .ACCOUNT_THEME_PAGE_IDS */ .yV, otherPageValue];
            }
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(false);
        })()
    }).catch(() => {
        process.exit(-1);
    });
    if (pageIdOrComponent === otherPageValue) {
        console.log([
            "To style a page not included in the base Keycloak, such as one added by a third-party Keycloak extension,",
            "refer to the documentation: https://docs.keycloakify.dev/features/styling-a-custom-page-not-included-in-base-keycloak"
        ].join(" "));
        process.exit(0);
    }
    console.log(`→ ${pageIdOrComponent}`);
    const componentBasename = (() => {
        if (pageIdOrComponent === templateValue) {
            return "Template.tsx";
        }
        if (pageIdOrComponent === userProfileFormFieldsValue) {
            return "UserProfileFormFields.tsx";
        }
        return (0,tsafe_capitalize__WEBPACK_IMPORTED_MODULE_9__/* .capitalize */ .k)((0,_tools_kebabCaseToSnakeCase__WEBPACK_IMPORTED_MODULE_10__/* .kebabCaseToCamelCase */ .A)(pageIdOrComponent)).replace(/ftl$/, "tsx");
    })();
    const pagesOrDot = (() => {
        if (pageIdOrComponent === templateValue ||
            pageIdOrComponent === userProfileFormFieldsValue) {
            return ".";
        }
        return "pages";
    })();
    const targetFilePath = (0,path__WEBPACK_IMPORTED_MODULE_4__.join)(buildContext.themeSrcDirPath, themeType, pagesOrDot, componentBasename);
    if (fs__WEBPACK_IMPORTED_MODULE_3__.existsSync(targetFilePath)) {
        console.log(`${pageIdOrComponent} is already ejected, ${(0,path__WEBPACK_IMPORTED_MODULE_4__.relative)(process.cwd(), targetFilePath)} already exists`);
        process.exit(-1);
    }
    let componentCode = fs__WEBPACK_IMPORTED_MODULE_3__.readFileSync((0,path__WEBPACK_IMPORTED_MODULE_4__.join)((0,_tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getThisCodebaseRootDirPath */ .e)(), "src", themeType, pagesOrDot, componentBasename))
        .toString("utf8");
    run_prettier: {
        if (!(await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_8__/* .getIsPrettierAvailable */ .MT)())) {
            break run_prettier;
        }
        componentCode = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_8__/* .runPrettier */ .eY)({
            filePath: targetFilePath,
            sourceCode: componentCode
        });
    }
    {
        const targetDirPath = (0,path__WEBPACK_IMPORTED_MODULE_4__.dirname)(targetFilePath);
        if (!fs__WEBPACK_IMPORTED_MODULE_3__.existsSync(targetDirPath)) {
            fs__WEBPACK_IMPORTED_MODULE_3__.mkdirSync(targetDirPath, { recursive: true });
        }
    }
    fs__WEBPACK_IMPORTED_MODULE_3__.writeFileSync(targetFilePath, Buffer.from(componentCode, "utf8"));
    console.log(`${chalk__WEBPACK_IMPORTED_MODULE_6___default().green("✓")} ${chalk__WEBPACK_IMPORTED_MODULE_6___default().bold((0,path__WEBPACK_IMPORTED_MODULE_4__.join)(".", (0,path__WEBPACK_IMPORTED_MODULE_4__.relative)(process.cwd(), targetFilePath)))} copy pasted from the Keycloakify source code into your project`);
    edit_KcPage: {
        if (pageIdOrComponent !== templateValue &&
            pageIdOrComponent !== userProfileFormFieldsValue) {
            break edit_KcPage;
        }
        const kcAppTsxPath = (0,path__WEBPACK_IMPORTED_MODULE_4__.join)(buildContext.themeSrcDirPath, themeType, "KcPage.tsx");
        const kcAppTsxCode = fs__WEBPACK_IMPORTED_MODULE_3__.readFileSync(kcAppTsxPath).toString("utf8");
        const modifiedKcAppTsxCode = (() => {
            switch (pageIdOrComponent) {
                case templateValue:
                    return kcAppTsxCode.replace(`keycloakify/${themeType}/Template`, "./Template");
                case userProfileFormFieldsValue:
                    return kcAppTsxCode.replace(`keycloakify/login/UserProfileFormFields`, "./UserProfileFormFields");
            }
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)(false);
        })();
        if (kcAppTsxCode === modifiedKcAppTsxCode) {
            console.log(chalk__WEBPACK_IMPORTED_MODULE_6___default().red("Unable to automatically update KcPage.tsx, please update it manually"));
            return;
        }
        fs__WEBPACK_IMPORTED_MODULE_3__.writeFileSync(kcAppTsxPath, Buffer.from(modifiedKcAppTsxCode, "utf8"));
        console.log(`${chalk__WEBPACK_IMPORTED_MODULE_6___default().green("✓")} ${chalk__WEBPACK_IMPORTED_MODULE_6___default().bold((0,path__WEBPACK_IMPORTED_MODULE_4__.join)(".", (0,path__WEBPACK_IMPORTED_MODULE_4__.relative)(process.cwd(), kcAppTsxPath)))} Updated`);
        return;
    }
    const userProfileFormFieldComponentName = "UserProfileFormFields";
    const componentName = componentBasename.replace(/.tsx$/, "");
    console.log([
        ``,
        `You now need to update your page router:`,
        ``,
        `${chalk__WEBPACK_IMPORTED_MODULE_6___default().bold((0,path__WEBPACK_IMPORTED_MODULE_4__.join)(".", (0,path__WEBPACK_IMPORTED_MODULE_4__.relative)(process.cwd(), buildContext.themeSrcDirPath), themeType, "KcPage.tsx"))}:`,
        chalk__WEBPACK_IMPORTED_MODULE_6___default().grey("```"),
        `// ...`,
        ``,
        chalk__WEBPACK_IMPORTED_MODULE_6___default().green(`+const ${componentName} = lazy(() => import("./pages/${componentName}"));`),
        ...[
            ``,
            ` export default function KcPage(props: { kcContext: KcContext; }) {`,
            ``,
            `     // ...`,
            ``,
            `     return (`,
            `         <Suspense>`,
            `             {(() => {`,
            `                 switch (kcContext.pageId) {`,
            `                     // ...`,
            `+                    case "${pageIdOrComponent}": return (`,
            `+                        <${componentName}`,
            `+                            {...{ kcContext, i18n, classes }}`,
            `+                            Template={Template}`,
            `+                            doUseDefaultCss={true}`,
            ...(!componentCode.includes(userProfileFormFieldComponentName)
                ? []
                : [
                    `+                            ${userProfileFormFieldComponentName}={${userProfileFormFieldComponentName}}`,
                    `+                            doMakeUserConfirmPassword={doMakeUserConfirmPassword}`
                ]),
            `+                        />`,
            `+                    );`,
            `                     default: return <Fallback /* .. */ />;`,
            `                 }`,
            `             })()}`,
            `         </Suspense>`,
            `     );`,
            ` }`
        ].map(line => {
            if (line.startsWith("+")) {
                return chalk__WEBPACK_IMPORTED_MODULE_6___default().green(line);
            }
            if (line.startsWith("-")) {
                return chalk__WEBPACK_IMPORTED_MODULE_6___default().red(line);
            }
            return chalk__WEBPACK_IMPORTED_MODULE_6___default().grey(line);
        }),
        chalk__WEBPACK_IMPORTED_MODULE_6___default().grey("```")
    ].join("\n"));
}
//# sourceMappingURL=eject-page.js.map

/***/ })

};
;