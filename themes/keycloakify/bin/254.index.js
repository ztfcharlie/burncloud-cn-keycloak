"use strict";
exports.id = 254;
exports.ids = [254];
exports.modules = {

/***/ 2254:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "command": () => (/* binding */ command)
/* harmony export */ });
/* harmony import */ var _shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72138);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29041);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(38469);
/* harmony import */ var _shared_addSyncExtensionsToPostinstallScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80339);
/* harmony import */ var _tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(48433);
/* harmony import */ var _tools_npmInstall__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63046);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(32081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(49622);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cli_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(99398);
/* harmony import */ var cli_select__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(cli_select__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(43765);













async function command(params) {
    var _a, _b, _c, _d;
    const { buildContext } = params;
    const { hasBeenHandled } = await (0,_shared_customHandler_delegate__WEBPACK_IMPORTED_MODULE_0__/* .maybeDelegateCommandToCustomHandler */ .q)({
        commandName: "initialize-login-theme",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    if (buildContext.implementedThemeTypes.login.isImplemented ||
        buildContext.implementedThemeTypes.login.isImplemented_native) {
        console.warn(chalk__WEBPACK_IMPORTED_MODULE_8___default().red("There is already a login theme in your project"));
        process.exit(-1);
    }
    const parsedPackageJson = await (async () => {
        const zParsedPackageJson = (() => {
            const zTargetType = zod__WEBPACK_IMPORTED_MODULE_11__/* .object */ .Ry({
                scripts: zod__WEBPACK_IMPORTED_MODULE_11__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_11__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_11__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_11__/* .undefined */ .S1()])).optional(),
                dependencies: zod__WEBPACK_IMPORTED_MODULE_11__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_11__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_11__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_11__/* .undefined */ .S1()])).optional(),
                devDependencies: zod__WEBPACK_IMPORTED_MODULE_11__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_11__/* .union */ .G0([zod__WEBPACK_IMPORTED_MODULE_11__/* .string */ .Z_(), zod__WEBPACK_IMPORTED_MODULE_11__/* .undefined */ .S1()])).optional()
            });
            tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h;
            return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_12__.id)(zTargetType);
        })();
        const parsedPackageJson = JSON.parse((await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(buildContext.packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__.is)(parsedPackageJson));
        return parsedPackageJson;
    })();
    (0,_shared_addSyncExtensionsToPostinstallScript__WEBPACK_IMPORTED_MODULE_4__/* .addSyncExtensionsToPostinstallScript */ .N)({
        parsedPackageJson,
        buildContext
    });
    const doInstallStories = await (async () => {
        console.log(chalk__WEBPACK_IMPORTED_MODULE_8___default().cyan(`\nDo you want to install the Stories?`));
        const YES = "Yes (Recommended)";
        const NO = "No";
        const { value } = await cli_select__WEBPACK_IMPORTED_MODULE_9___default()({
            values: [YES, NO]
        }).catch(() => {
            process.exit(-1);
        });
        console.log(`${value}\n`);
        return value === YES;
    })();
    install_storybook: {
        if (!doInstallStories) {
            break install_storybook;
        }
        if (buildContext.bundler !== "vite") {
            break install_storybook;
        }
        if (Object.keys(Object.assign(Object.assign({}, parsedPackageJson.dependencies), parsedPackageJson.devDependencies)).includes("storybook")) {
            break install_storybook;
        }
        ((_a = parsedPackageJson.scripts) !== null && _a !== void 0 ? _a : (parsedPackageJson.scripts = {}))["storybook"] = "storybook dev -p 6006";
        parsedPackageJson.scripts["build-storybook"] = "storybook build";
        ((_b = parsedPackageJson.devDependencies) !== null && _b !== void 0 ? _b : (parsedPackageJson.devDependencies = {}))["storybook"] = "^9.0.4";
        parsedPackageJson.devDependencies["@storybook/react-vite"] = "^9.0.4";
        const files = [
            {
                relativeFilePath: "main.ts",
                fileContent: [
                    `import type { StorybookConfig } from "@storybook/react-vite";`,
                    ``,
                    `const config: StorybookConfig = {`,
                    `    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],`,
                    `    addons: [],`,
                    `    framework: {`,
                    `        name: "@storybook/react-vite",`,
                    `        options: {}`,
                    `    },`,
                    `};`,
                    `export default config;`,
                    ``
                ].join("\n")
            },
            {
                relativeFilePath: "preview.ts",
                fileContent: storybookPreviewTsFileContent
            }
        ];
        for (let { relativeFilePath, fileContent } of files) {
            const filePath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(buildContext.projectDirPath, ".storybook", relativeFilePath);
            {
                const dirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.dirname)(filePath);
                if (!(await (0,_tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_10__/* .existsAsync */ .o)(dirPath))) {
                    await fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir(dirPath, { recursive: true });
                }
            }
            run_prettier: {
                if (!(await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .getIsPrettierAvailable */ .MT)())) {
                    break run_prettier;
                }
                fileContent = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .runPrettier */ .eY)({
                    filePath: filePath,
                    sourceCode: fileContent
                });
            }
            await fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile(filePath, Buffer.from(fileContent, "utf8"));
        }
    }
    {
        const moduleName = "@keycloakify/login-ui";
        const latestVersion = getModuleLatestVersion({ moduleName });
        ((_c = parsedPackageJson.dependencies) !== null && _c !== void 0 ? _c : (parsedPackageJson.dependencies = {}))[moduleName] = `~${latestVersion}`;
        if (parsedPackageJson.devDependencies !== undefined) {
            delete parsedPackageJson.devDependencies[moduleName];
        }
    }
    install_stories: {
        if (!doInstallStories) {
            break install_stories;
        }
        const moduleName = "@keycloakify/login-ui-storybook";
        const latestVersion = getModuleLatestVersion({ moduleName });
        ((_d = parsedPackageJson.devDependencies) !== null && _d !== void 0 ? _d : (parsedPackageJson.devDependencies = {}))[moduleName] = `~${latestVersion}`;
        delete parsedPackageJson.dependencies[moduleName];
    }
    for (const fileBasename of ["main-kc.dev.tsx", "main.dev.tsx"]) {
        const filePath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(buildContext.themeSrcDirPath, fileBasename);
        if (!(await (0,_tools_fs_existsAsync__WEBPACK_IMPORTED_MODULE_10__/* .existsAsync */ .o)(filePath))) {
            continue;
        }
        const content = (await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(filePath)).toString("utf8");
        if (!content.includes("export {}")) {
            break;
        }
        let content_new = [
            `import { createRoot } from "react-dom/client";`,
            `import { StrictMode } from "react";`,
            `import { KcPage } from "./kc.gen";`,
            `import { getKcContextMock } from "./login/mocks/getKcContextMock";`,
            ``,
            `const kcContext = getKcContextMock({`,
            `    pageId: "login.ftl",`,
            `    overrides: {}`,
            `});`,
            ``,
            `createRoot(document.getElementById("root")!).render(`,
            `    <StrictMode>`,
            `        <KcPage kcContext={kcContext} />`,
            `    </StrictMode>`,
            `);`,
            ``
        ].join("\n");
        if (await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .getIsPrettierAvailable */ .MT)()) {
            content_new = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .runPrettier */ .eY)({
                sourceCode: content_new,
                filePath
            });
        }
        await fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile(filePath, content_new);
        break;
    }
    {
        let sourceCode = JSON.stringify(parsedPackageJson, null, 2);
        if (await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .getIsPrettierAvailable */ .MT)()) {
            sourceCode = await (0,_tools_runPrettier__WEBPACK_IMPORTED_MODULE_5__/* .runPrettier */ .eY)({
                sourceCode,
                filePath: buildContext.packageJsonFilePath
            });
        }
        await fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile(buildContext.packageJsonFilePath, Buffer.from(sourceCode, "utf8"));
    }
    await (0,_tools_npmInstall__WEBPACK_IMPORTED_MODULE_6__/* .npmInstall */ .c)({
        packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_1__.dirname)(buildContext.packageJsonFilePath)
    });
}
function getModuleLatestVersion(params) {
    const { moduleName } = params;
    const versions = (() => {
        const cmdOutput = child_process__WEBPACK_IMPORTED_MODULE_7__.execSync(`npm show ${moduleName} versions --json`)
            .toString("utf8")
            .trim();
        const versions = JSON.parse(cmdOutput);
        // NOTE: Bug in some older npm versions
        if (typeof versions === "string") {
            return [versions];
        }
        return versions;
    })();
    const version = versions.reverse().filter(version => !version.includes("-"))[0];
    (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(version !== undefined);
    return version;
}
const storybookPreviewTsFileContent = [
    `import type { Preview } from "@storybook/react-vite";`,
    ``,
    `const preview: Preview = {`,
    `    parameters: {`,
    `        controls: {`,
    `            matchers: {`,
    `                color: /(background|color)$/i,`,
    `                date: /Date$/i`,
    `            }`,
    `        },`,
    `        options: {`,
    `            storySort: (a, b)=> {`,
    ``,
    `                const orderedPagesPrefix = [`,
    `                    "Introduction",`,
    `                    "login/login.ftl",`,
    `                    "login/register.ftl",`,
    `                    "login/terms.ftl",`,
    `                    "login/error.ftl",`,
    `                    "login/code.ftl",`,
    `                    "login/delete-account-confirm.ftl",`,
    `                    "login/delete-credential.ftl",`,
    `                    "login/frontchannel-logout.ftl",`,
    `                    "login/idp-review-user-profile.ftl",`,
    `                    "login/info.ftl",`,
    `                    "login/login-config-totp.ftl",`,
    `                    "login/login-idp-link-confirm.ftl",`,
    `                    "login/login-idp-link-email.ftl",`,
    `                    "login/login-oauth-grant.ftl",`,
    `                    "login/login-otp.ftl",`,
    `                    "login/login-page-expired.ftl",`,
    `                    "login/login-password.ftl",`,
    `                    "login/login-reset-otp.ftl",`,
    `                    "login/login-reset-password.ftl",`,
    `                    "login/login-update-password.ftl",`,
    `                    "login/login-update-profile.ftl",`,
    `                    "login/login-username.ftl",`,
    `                    "login/login-verify-email.ftl",`,
    `                    "login/login-x509-info.ftl",`,
    `                    "login/logout-confirm.ftl",`,
    `                    "login/saml-post-form.ftl",`,
    `                    "login/select-authenticator.ftl",`,
    `                    "login/update-email.ftl",`,
    `                    "login/webauthn-authenticate.ftl",`,
    `                    "login/webauthn-error.ftl",`,
    `                    "login/webauthn-register.ftl",`,
    `                    "login/login-oauth2-device-verify-user-code.ftl",`,
    `                    "login/login-recovery-authn-code-config.ftl",`,
    `                    "login/login-recovery-authn-code-input.ftl",`,
    `                    "account/account.ftl",`,
    `                    "account/password.ftl",`,
    `                    "account/federatedIdentity.ftl",`,
    `                    "account/log.ftl",`,
    `                    "account/sessions.ftl",`,
    `                    "account/totp.ftl"`,
    `                ];`,
    ``,
    `                function getHardCodedWeight(title) {`,
    `                    for (let i = 0; i < orderedPagesPrefix.length; i++) {`,
    `                        if (`,
    `                            title`,
    `                                .toLowerCase()`,
    `                                .startsWith(orderedPagesPrefix[i].toLowerCase())`,
    `                        ) {`,
    `                            return orderedPagesPrefix.length - i;`,
    `                        }`,
    `                    }`,
    ``,
    `                    return 0;`,
    `                }`,
    ``,
    `                return getHardCodedWeight(b.title) - getHardCodedWeight(a.title);`,
    ``,
    `            }`,
    ``,
    `        }`,
    `    }`,
    `};`,
    ``,
    `export default preview;`,
    ``
].join("\n");
//# sourceMappingURL=initialize-login-theme.js.map

/***/ })

};
;