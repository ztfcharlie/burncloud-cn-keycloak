#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 85400:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "s": () => (/* binding */ getBuildContext)
});

// EXTERNAL MODULE: external "url"
var external_url_ = __nccwpck_require__(57310);
// EXTERNAL MODULE: external "path"
var external_path_ = __nccwpck_require__(71017);
// EXTERNAL MODULE: ./dist/bin/tools/getAbsoluteAndInOsFormatPath.js
var getAbsoluteAndInOsFormatPath = __nccwpck_require__(84794);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 4 modules
var types = __nccwpck_require__(49622);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(57147);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __nccwpck_require__(29041);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __nccwpck_require__(32081);
// EXTERNAL MODULE: ./dist/bin/shared/constants.js
var constants = __nccwpck_require__(173);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/exclude.mjs
var exclude = __nccwpck_require__(83101);
;// CONCATENATED MODULE: ./node_modules/tsafe/esm/index.mjs















//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./dist/bin/tools/crawl.js
var crawl = __nccwpck_require__(73036);
;// CONCATENATED MODULE: ./node_modules/tsafe/esm/objectEntries.mjs
/** https://docs.tsafe.dev/objectentries */
function objectEntries(o) {
    return Object.entries(o);
}


//# sourceMappingURL=objectEntries.mjs.map

// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __nccwpck_require__(38469);
// EXTERNAL MODULE: ./node_modules/chalk/source/index.js
var source = __nccwpck_require__(78818);
var source_default = /*#__PURE__*/__nccwpck_require__.n(source);
;// CONCATENATED MODULE: ./dist/bin/tools/fetchProxyOptions.js



function getProxyFetchOptions(params) {
    var _a, _b, _c;
    const { npmConfigGetCwd } = params;
    const cfg = (() => {
        const output = external_child_process_.execSync("npm config get", { cwd: npmConfigGetCwd })
            .toString("utf8");
        return output
            .split("\n")
            .filter(line => !line.startsWith(";"))
            .map(line => line.trim())
            .map(line => {
            const [key, value] = line.split("=");
            if (key === undefined) {
                return undefined;
            }
            if (value === undefined) {
                return undefined;
            }
            return [key.trim(), value.trim()];
        })
            .filter((0,exclude/* exclude */.D)(undefined))
            .filter(([key]) => key !== "")
            .map(([key, value]) => {
            if (value.startsWith('"') && value.endsWith('"')) {
                return [key, value.slice(1, -1)];
            }
            if (value === "true" || value === "false") {
                return [key, value];
            }
            return undefined;
        })
            .filter((0,exclude/* exclude */.D)(undefined))
            .reduce((cfg, [key, value]) => key in cfg
            ? Object.assign(Object.assign({}, cfg), { [key]: [...ensureArray(cfg[key]), value] }) : Object.assign(Object.assign({}, cfg), { [key]: value }), {});
    })();
    const proxy = ensureSingleOrNone((_a = cfg["https-proxy"]) !== null && _a !== void 0 ? _a : cfg["proxy"]);
    const noProxy = (_b = cfg["noproxy"]) !== null && _b !== void 0 ? _b : cfg["no-proxy"];
    const strictSSL = ensureSingleOrNone(cfg["strict-ssl"]) === "true";
    const cert = cfg["cert"];
    const ca = ensureArray((_c = cfg["ca"]) !== null && _c !== void 0 ? _c : cfg["ca[]"]);
    const cafile = ensureSingleOrNone(cfg["cafile"]);
    if (cafile !== undefined) {
        ca.push(...(() => {
            const cafileContent = external_fs_.readFileSync(cafile).toString("utf8");
            const newLinePlaceholder = "NEW_LINE_PLACEHOLDER_xIsPsK23svt";
            const chunks = (arr, size = 2) => arr
                .map((_, i) => i % size == 0 && arr.slice(i, i + size))
                .filter(Boolean);
            return chunks(cafileContent.split(/(-----END CERTIFICATE-----)/), 2).map(ca => ca
                .join("")
                .replace(/\r?\n/g, newLinePlaceholder)
                .replace(new RegExp(`^${newLinePlaceholder}`), "")
                .replace(new RegExp(newLinePlaceholder, "g"), "\\n"));
        })());
    }
    return {
        proxy,
        noProxy,
        strictSSL,
        cert,
        ca: ca.length === 0 ? undefined : ca
    };
}
function ensureArray(arg0) {
    return Array.isArray(arg0) ? arg0 : arg0 === undefined ? [] : [arg0];
}
function ensureSingleOrNone(arg0) {
    if (!Array.isArray(arg0))
        return arg0;
    if (arg0.length === 0)
        return undefined;
    if (arg0.length === 1)
        return arg0[0];
    throw new Error("Illegal configuration, expected a single value but found multiple: " +
        arg0.map(String).join(", "));
}
//# sourceMappingURL=fetchProxyOptions.js.map
;// CONCATENATED MODULE: ./dist/bin/shared/buildContext.js















(0,assert/* assert */.h)();
function getBuildContext(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const projectDirPath = params.projectDirPath !== undefined
        ? (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
            pathIsh: params.projectDirPath,
            cwd: process.cwd()
        })
        : process.cwd();
    const { themeSrcDirPath } = (() => {
        const srcDirPath = (0,external_path_.join)(projectDirPath, "src");
        const themeSrcDirPath = (0,crawl/* crawl */.J)({
            dirPath: srcDirPath,
            returnedPathsType: "relative to dirPath"
        })
            .map(fileRelativePath => {
            for (const themeSrcDirBasename of [
                constants/* KEYCLOAK_THEME */.PC,
                constants/* KEYCLOAK_THEME.replace */.PC.replace(/-/g, "_")
            ]) {
                const split = fileRelativePath.split(themeSrcDirBasename);
                if (split.length === 2) {
                    return (0,external_path_.join)(srcDirPath, split[0] + themeSrcDirBasename);
                }
            }
            return undefined;
        })
            .filter((0,exclude/* exclude */.D)(undefined))[0];
        if (themeSrcDirPath !== undefined) {
            return { themeSrcDirPath };
        }
        return { themeSrcDirPath: srcDirPath };
    })();
    const { resolvedViteConfig } = (() => {
        if (external_fs_.readdirSync(projectDirPath)
            .find(fileBasename => fileBasename.startsWith("vite.config")) ===
            undefined) {
            return { resolvedViteConfig: undefined };
        }
        let output;
        try {
            output = external_child_process_.execSync("npx vite", {
                cwd: projectDirPath,
                stdio: ["pipe", "pipe", "ignore"],
                env: Object.assign(Object.assign({}, process.env), { [constants/* VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG */.TE.RESOLVE_VITE_CONFIG]: "true" })
            })
                .toString("utf8");
        }
        catch (error) {
            throw new Error(`Failed to run \`npx vite\`: ${error}`);
        }
        (0,assert/* assert */.h)(output.includes(constants/* VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG */.TE.RESOLVE_VITE_CONFIG), "Seems like the Keycloakify's Vite plugin is not installed.");
        const resolvedViteConfigStr = output
            .split(constants/* VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG */.TE.RESOLVE_VITE_CONFIG)
            .reverse()[0];
        const resolvedViteConfig = JSON.parse(resolvedViteConfigStr);
        return { resolvedViteConfig };
    })();
    const packageJsonFilePath = (function getPackageJSonDirPath(upCount) {
        var _a, _b;
        const dirPath = (0,external_path_.resolve)((0,external_path_.join)(...[projectDirPath, ...Array(upCount).fill("..")]));
        (0,assert/* assert */.h)(dirPath !== external_path_.sep, "Root package.json not found");
        success: {
            const packageJsonFilePath = (0,external_path_.join)(dirPath, "package.json");
            if (!external_fs_.existsSync(packageJsonFilePath)) {
                break success;
            }
            const parsedPackageJson = types/* object */.Ry({
                name: types/* string */.Z_().optional(),
                dependencies: types/* record */.IM(types/* string */.Z_()).optional(),
                devDependencies: types/* record */.IM(types/* string */.Z_()).optional()
            })
                .parse(JSON.parse(external_fs_.readFileSync(packageJsonFilePath).toString("utf8")));
            if (((_a = parsedPackageJson.dependencies) === null || _a === void 0 ? void 0 : _a.keycloakify) === undefined &&
                ((_b = parsedPackageJson.devDependencies) === null || _b === void 0 ? void 0 : _b.keycloakify) === undefined) {
                break success;
            }
            return packageJsonFilePath;
        }
        return getPackageJSonDirPath(upCount + 1);
    })(0);
    const parsedPackageJson = (() => {
        const zMultiPageApp = (() => {
            const zTargetType = types/* object */.Ry({
                accountThemeImplementation: types/* literal */.i0("Multi-Page"),
                keycloakVersionTargets: types/* object */.Ry({
                    "21-and-below": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()]),
                    "23": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()]),
                    "24": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()]),
                    "25": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()]),
                    "26.0-to-26.1": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()]),
                    "26.2-and-above": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()])
                })
                    .optional()
            });
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const zSinglePageApp = (() => {
            const zTargetType = types/* object */.Ry({
                accountThemeImplementation: types/* union */.G0([
                    types/* literal */.i0("Single-Page"),
                    types/* literal */.i0("none")
                ]),
                keycloakVersionTargets: types/* object */.Ry({
                    "22-to-25": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()]),
                    "all-other-versions": types/* union */.G0([types/* boolean */.O7(), types/* string */.Z_()])
                })
                    .optional()
            });
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const zAccountThemeImplAndKeycloakVersionTargets = (() => {
            const zTargetType = types/* union */.G0([zMultiPageApp, zSinglePageApp]);
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const zStartKeycloakOptions = (() => {
            const zTargetType = types/* object */.Ry({
                dockerImage: types/* string */.Z_().optional(),
                extensionJars: types/* array */.IX(types/* string */.Z_()).optional(),
                realmJsonFilePath: types/* string */.Z_().optional(),
                dockerExtraArgs: types/* array */.IX(types/* string */.Z_()).optional(),
                keycloakExtraArgs: types/* array */.IX(types/* string */.Z_()).optional(),
                port: types/* number */.Rx().optional()
            });
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const zBuildOptions = (() => {
            const zTargetType = types/* intersection */.jV(types/* object */.Ry({
                themeName: types/* union */.G0([types/* string */.Z_(), types/* array */.IX(types/* string */.Z_())]).optional(),
                themeVersion: types/* string */.Z_().optional(),
                environmentVariables: types/* array */.IX(types/* object */.Ry({
                    name: types/* string */.Z_(),
                    default: types/* string */.Z_()
                }))
                    .optional(),
                extraThemeProperties: types/* array */.IX(types/* string */.Z_()).optional(),
                artifactId: types/* string */.Z_().optional(),
                groupId: types/* string */.Z_().optional(),
                keycloakifyBuildDirPath: types/* string */.Z_().optional(),
                kcContextExclusionsFtl: types/* string */.Z_().optional(),
                startKeycloakOptions: zStartKeycloakOptions.optional()
            }), zAccountThemeImplAndKeycloakVersionTargets);
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const zBuildOptions_packageJson = (() => {
            const zTargetType = types/* intersection */.jV(zBuildOptions, types/* object */.Ry({
                projectBuildDirPath: types/* string */.Z_().optional(),
                staticDirPathInProjectBuildDirPath: types/* string */.Z_().optional(),
                publicDirPath: types/* string */.Z_().optional()
            }));
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const zParsedPackageJson = (() => {
            const zTargetType = types/* object */.Ry({
                name: types/* string */.Z_().optional(),
                version: types/* string */.Z_().optional(),
                homepage: types/* string */.Z_().optional(),
                keycloakify: zBuildOptions_packageJson.optional()
            });
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const configurationPackageJsonFilePath = (() => {
            const rootPackageJsonFilePath = (0,external_path_.join)(projectDirPath, "package.json");
            return external_fs_.existsSync(rootPackageJsonFilePath)
                ? rootPackageJsonFilePath
                : packageJsonFilePath;
        })();
        return zParsedPackageJson.parse(JSON.parse(external_fs_.readFileSync(configurationPackageJsonFilePath).toString("utf8")));
    })();
    const bundler = resolvedViteConfig !== undefined ? "vite" : "webpack";
    if (bundler === "vite" && parsedPackageJson.keycloakify !== undefined) {
        console.error(source_default().red(`In vite projects, provide your Keycloakify options in vite.config.ts, not in package.json`));
        process.exit(-1);
    }
    const buildOptions = (() => {
        switch (bundler) {
            case "vite":
                (0,assert/* assert */.h)(resolvedViteConfig !== undefined);
                return resolvedViteConfig.buildOptions;
            case "webpack":
                (0,assert/* assert */.h)(parsedPackageJson.keycloakify !== undefined);
                return parsedPackageJson.keycloakify;
        }
        (0,assert/* assert */.h)(false);
    })();
    const implementedThemeTypes = (() => {
        const getIsNative = (dirPath) => external_fs_.existsSync((0,external_path_.join)(dirPath, "theme.properties"));
        return {
            login: (() => {
                const dirPath = (0,external_path_.join)(themeSrcDirPath, "login");
                if (!external_fs_.existsSync(dirPath)) {
                    return { isImplemented: false, isImplemented_native: false };
                }
                if (getIsNative(dirPath)) {
                    return { isImplemented: false, isImplemented_native: true };
                }
                return { isImplemented: true };
            })(),
            email: (() => {
                const dirPath = (0,external_path_.join)(themeSrcDirPath, "email");
                if (!external_fs_.existsSync(dirPath) || !getIsNative(dirPath)) {
                    return { isImplemented: false, isImplemented_native: false };
                }
                return { isImplemented: false, isImplemented_native: true };
            })(),
            account: (() => {
                const dirPath = (0,external_path_.join)(themeSrcDirPath, "account");
                if (!external_fs_.existsSync(dirPath)) {
                    return { isImplemented: false, isImplemented_native: false };
                }
                if (getIsNative(dirPath)) {
                    return { isImplemented: false, isImplemented_native: true };
                }
                if (buildOptions.accountThemeImplementation === "none") {
                    return { isImplemented: false, isImplemented_native: false };
                }
                return {
                    isImplemented: true,
                    type: buildOptions.accountThemeImplementation
                };
            })(),
            admin: (() => {
                const dirPath = (0,external_path_.join)(themeSrcDirPath, "admin");
                if (!external_fs_.existsSync(dirPath)) {
                    return { isImplemented: false, isImplemented_native: false };
                }
                if (getIsNative(dirPath)) {
                    return { isImplemented: false, isImplemented_native: true };
                }
                return { isImplemented: true };
            })()
        };
    })();
    if (implementedThemeTypes.account.isImplemented &&
        !external_fs_.existsSync((0,external_path_.join)(themeSrcDirPath, "account"))) {
        console.error(source_default().red([
            `You have set 'accountThemeImplementation' to '${implementedThemeTypes.account.type}'`,
            `but the 'account' directory is missing in your theme source directory`,
            "Use the `npx keycloakify initialize-account-theme` command to create it"
        ].join(" ")));
        process.exit(-1);
    }
    const themeNames = (() => {
        const themeNames = (() => {
            if (buildOptions.themeName === undefined) {
                return parsedPackageJson.name === undefined
                    ? ["keycloakify"]
                    : [
                        parsedPackageJson.name
                            .replace(/^@(.*)/, "$1")
                            .split("/")
                            .join("-")
                    ];
            }
            if (typeof buildOptions.themeName === "string") {
                return [buildOptions.themeName];
            }
            const [mainThemeName, ...themeVariantNames] = buildOptions.themeName;
            (0,assert/* assert */.h)(mainThemeName !== undefined);
            return [mainThemeName, ...themeVariantNames];
        })();
        for (const themeName of themeNames) {
            if (!/^[a-zA-Z0-9_-]+$/.test(themeName)) {
                console.error(source_default().red([
                    `Invalid theme name: ${themeName}`,
                    `Theme names should only contain letters, numbers, and "_" or "-"`
                ].join(" ")));
                process.exit(-1);
            }
        }
        return themeNames;
    })();
    const relativePathsCwd = (() => {
        switch (bundler) {
            case "vite":
                return projectDirPath;
            case "webpack":
                return (0,external_path_.dirname)(packageJsonFilePath);
        }
    })();
    const projectBuildDirPath = (() => {
        webpack: {
            if (bundler !== "webpack") {
                break webpack;
            }
            (0,assert/* assert */.h)(parsedPackageJson.keycloakify !== undefined);
            if (parsedPackageJson.keycloakify.projectBuildDirPath !== undefined) {
                return (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: parsedPackageJson.keycloakify.projectBuildDirPath,
                    cwd: relativePathsCwd
                });
            }
            return (0,external_path_.join)(projectDirPath, "build");
        }
        (0,assert/* assert */.h)(bundler === "vite");
        (0,assert/* assert */.h)(resolvedViteConfig !== undefined);
        return (0,external_path_.join)(projectDirPath, resolvedViteConfig.buildDir);
    })();
    return {
        bundler,
        packageJsonFilePath,
        themeVersion: (_b = (_a = buildOptions.themeVersion) !== null && _a !== void 0 ? _a : parsedPackageJson.version) !== null && _b !== void 0 ? _b : "0.0.0",
        themeNames,
        extraThemeProperties: buildOptions.extraThemeProperties,
        groupId: (() => {
            var _a, _b, _c, _d, _e;
            const fallbackGroupId = `${themeNames[0]}.keycloak`;
            return ((_b = (_a = process.env.KEYCLOAKIFY_GROUP_ID) !== null && _a !== void 0 ? _a : buildOptions.groupId) !== null && _b !== void 0 ? _b : (parsedPackageJson.homepage === undefined
                ? fallbackGroupId
                : (_e = (_d = (_c = (0,external_url_.parse)(parsedPackageJson.homepage)
                    .host) === null || _c === void 0 ? void 0 : _c.replace(/:[0-9]+$/, "")) === null || _d === void 0 ? void 0 : _d.split(".").reverse().join(".")) !== null && _e !== void 0 ? _e : fallbackGroupId) + ".keycloak");
        })(),
        artifactId: (_d = (_c = process.env.KEYCLOAKIFY_ARTIFACT_ID) !== null && _c !== void 0 ? _c : buildOptions.artifactId) !== null && _d !== void 0 ? _d : `${themeNames[0]}-keycloak-theme`,
        projectDirPath,
        projectBuildDirPath,
        keycloakifyBuildDirPath: (() => {
            if (buildOptions.keycloakifyBuildDirPath !== undefined) {
                return (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: buildOptions.keycloakifyBuildDirPath,
                    cwd: relativePathsCwd
                });
            }
            return (0,external_path_.join)(projectDirPath, (resolvedViteConfig === null || resolvedViteConfig === void 0 ? void 0 : resolvedViteConfig.buildDir) === undefined
                ? "build_keycloak"
                : `${resolvedViteConfig.buildDir}_keycloak`);
        })(),
        publicDirPath: (() => {
            if (process.env.PUBLIC_DIR_PATH !== undefined) {
                return (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: process.env.PUBLIC_DIR_PATH,
                    cwd: projectDirPath
                });
            }
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }
                (0,assert/* assert */.h)(parsedPackageJson.keycloakify !== undefined);
                if (parsedPackageJson.keycloakify.publicDirPath !== undefined) {
                    return (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                        pathIsh: parsedPackageJson.keycloakify.publicDirPath,
                        cwd: relativePathsCwd
                    });
                }
                return (0,external_path_.join)(projectDirPath, "public");
            }
            (0,assert/* assert */.h)(bundler === "vite");
            (0,assert/* assert */.h)(resolvedViteConfig !== undefined);
            return (0,external_path_.join)(projectDirPath, resolvedViteConfig.publicDir);
        })(),
        cacheDirPath: (0,external_path_.join)((() => {
            if (process.env.XDG_CACHE_HOME !== undefined) {
                return (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: process.env.XDG_CACHE_HOME,
                    cwd: process.cwd()
                });
            }
            return (0,external_path_.join)((0,external_path_.dirname)(packageJsonFilePath), "node_modules", ".cache");
        })(), "keycloakify"),
        urlPathname: (() => {
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }
                const { homepage } = parsedPackageJson;
                let url = undefined;
                if (homepage !== undefined) {
                    url = new URL(homepage);
                }
                if (url === undefined) {
                    return undefined;
                }
                const out = url.pathname.replace(/([^/])$/, "$1/");
                return out === "/" ? undefined : out;
            }
            (0,assert/* assert */.h)(bundler === "vite");
            (0,assert/* assert */.h)(resolvedViteConfig !== undefined);
            return resolvedViteConfig.urlPathname;
        })(),
        assetsDirPath: (() => {
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }
                (0,assert/* assert */.h)(parsedPackageJson.keycloakify !== undefined);
                if (parsedPackageJson.keycloakify.staticDirPathInProjectBuildDirPath !==
                    undefined) {
                    (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                        pathIsh: parsedPackageJson.keycloakify
                            .staticDirPathInProjectBuildDirPath,
                        cwd: relativePathsCwd
                    });
                }
                return (0,external_path_.join)(projectBuildDirPath, "static");
            }
            (0,assert/* assert */.h)(bundler === "vite");
            (0,assert/* assert */.h)(resolvedViteConfig !== undefined);
            return (0,external_path_.join)(projectBuildDirPath, resolvedViteConfig.assetsDir);
        })(),
        kcContextExclusionsFtlCode: (() => {
            if (buildOptions.kcContextExclusionsFtl === undefined) {
                return undefined;
            }
            if (buildOptions.kcContextExclusionsFtl.endsWith(".ftl")) {
                const kcContextExclusionsFtlPath = (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: buildOptions.kcContextExclusionsFtl,
                    cwd: projectDirPath
                });
                return external_fs_.readFileSync(kcContextExclusionsFtlPath).toString("utf8");
            }
            return buildOptions.kcContextExclusionsFtl;
        })(),
        environmentVariables: (_e = buildOptions.environmentVariables) !== null && _e !== void 0 ? _e : [],
        implementedThemeTypes,
        themeSrcDirPath,
        get fetchOptions() {
            return getProxyFetchOptions({
                npmConfigGetCwd: (function callee(upCount) {
                    const dirPath = (0,external_path_.resolve)((0,external_path_.join)(...[projectDirPath, ...Array(upCount).fill("..")]));
                    (0,assert/* assert */.h)(dirPath !== external_path_.sep, "Couldn't find a place to run 'npm config get'");
                    try {
                        external_child_process_.execSync("npm config get", {
                            cwd: dirPath,
                            stdio: "pipe"
                        });
                    }
                    catch (error) {
                        if (String(error).includes("ENOWORKSPACES")) {
                            return callee(upCount + 1);
                        }
                        throw error;
                    }
                    return dirPath;
                })(0)
            });
        },
        jarTargets: (() => {
            const getDefaultJarFileBasename = (range) => `keycloak-theme-for-kc-${range}.jar`;
            build_for_specific_keycloak_major_version: {
                const buildForKeycloakMajorVersionNumber = (() => {
                    const envValue = process.env[constants/* BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME */.ac];
                    if (envValue === undefined) {
                        return undefined;
                    }
                    const major = parseInt(envValue);
                    (0,assert/* assert */.h)(!isNaN(major));
                    return major;
                })();
                if (buildForKeycloakMajorVersionNumber === undefined) {
                    break build_for_specific_keycloak_major_version;
                }
                const keycloakVersionRange = (() => {
                    if (implementedThemeTypes.account.isImplemented &&
                        implementedThemeTypes.account.type === "Multi-Page") {
                        const keycloakVersionRange = (() => {
                            if (buildForKeycloakMajorVersionNumber <= 21) {
                                return "21-and-below";
                            }
                            (0,assert/* assert */.h)(buildForKeycloakMajorVersionNumber !== 22);
                            if (buildForKeycloakMajorVersionNumber === 23) {
                                return "23";
                            }
                            if (buildForKeycloakMajorVersionNumber === 24) {
                                return "24";
                            }
                            if (buildForKeycloakMajorVersionNumber === 25) {
                                return "25";
                            }
                            return "26.2-and-above";
                        })();
                        (0,assert/* assert */.h)();
                        return keycloakVersionRange;
                    }
                    else {
                        const keycloakVersionRange = (() => {
                            if (buildForKeycloakMajorVersionNumber <= 21 ||
                                buildForKeycloakMajorVersionNumber >= 26) {
                                return "all-other-versions";
                            }
                            return "22-to-25";
                        })();
                        (0,assert/* assert */.h)();
                        return keycloakVersionRange;
                    }
                })();
                const jarFileBasename = (() => {
                    use_custom_jar_basename: {
                        const { keycloakVersionTargets } = buildOptions;
                        (0,assert/* assert */.h)((0,assert.is)(keycloakVersionTargets));
                        if (keycloakVersionTargets === undefined) {
                            break use_custom_jar_basename;
                        }
                        const entry = objectEntries(keycloakVersionTargets).find(([keycloakVersionRange_entry]) => keycloakVersionRange_entry === keycloakVersionRange);
                        if (entry === undefined) {
                            break use_custom_jar_basename;
                        }
                        const maybeJarFileBasename = entry[1];
                        if (typeof maybeJarFileBasename !== "string") {
                            break use_custom_jar_basename;
                        }
                        return maybeJarFileBasename;
                    }
                    return getDefaultJarFileBasename(keycloakVersionRange);
                })();
                return [
                    {
                        keycloakVersionRange,
                        jarFileBasename
                    }
                ];
            }
            const jarTargets_default = (() => {
                const jarTargets = [];
                if (implementedThemeTypes.account.isImplemented &&
                    implementedThemeTypes.account.type === "Multi-Page") {
                    for (const keycloakVersionRange of [
                        "21-and-below",
                        "23",
                        "24",
                        "25",
                        "26.0-to-26.1",
                        "26.2-and-above"
                    ]) {
                        (0,assert/* assert */.h)(true);
                        jarTargets.push({
                            keycloakVersionRange,
                            jarFileBasename: getDefaultJarFileBasename(keycloakVersionRange)
                        });
                    }
                }
                else {
                    for (const keycloakVersionRange of [
                        "22-to-25",
                        "all-other-versions"
                    ]) {
                        (0,assert/* assert */.h)(true);
                        jarTargets.push({
                            keycloakVersionRange,
                            jarFileBasename: getDefaultJarFileBasename(keycloakVersionRange)
                        });
                    }
                }
                return jarTargets;
            })();
            if (buildOptions.keycloakVersionTargets === undefined) {
                return jarTargets_default;
            }
            const jarTargets = [];
            for (const [keycloakVersionRange, jarNameOrBoolean] of objectEntries((() => {
                const { keycloakVersionTargets } = buildOptions;
                (0,assert/* assert */.h)((0,assert.is)(keycloakVersionTargets));
                return keycloakVersionTargets;
            })())) {
                if (jarNameOrBoolean === false) {
                    continue;
                }
                if (jarNameOrBoolean === true) {
                    jarTargets.push({
                        keycloakVersionRange: keycloakVersionRange,
                        jarFileBasename: getDefaultJarFileBasename(keycloakVersionRange)
                    });
                    continue;
                }
                const jarFileBasename = jarNameOrBoolean;
                if (!jarFileBasename.endsWith(".jar")) {
                    console.log(source_default().red(`Bad ${jarFileBasename} should end with '.jar'\n`));
                    process.exit(1);
                }
                if (jarFileBasename.includes("/") || jarFileBasename.includes("\\")) {
                    console.log(source_default().red([
                        `Invalid ${jarFileBasename}. It's not supposed to be a path,`,
                        `Only the basename of the jar file is expected.`,
                        `Example: keycloak-theme.jar`
                    ].join(" ")));
                    process.exit(1);
                }
                jarTargets.push({
                    keycloakVersionRange: keycloakVersionRange,
                    jarFileBasename: jarNameOrBoolean
                });
            }
            if (jarTargets.length === 0) {
                console.log(source_default().red("All jar targets are disabled. Please enable at least one jar target."));
                process.exit(1);
            }
            return jarTargets;
        })(),
        startKeycloakOptions: {
            dockerImage: (() => {
                var _a;
                if (((_a = buildOptions.startKeycloakOptions) === null || _a === void 0 ? void 0 : _a.dockerImage) === undefined) {
                    return undefined;
                }
                const [reference, tag, ...rest] = buildOptions.startKeycloakOptions.dockerImage.split(":");
                (0,assert/* assert */.h)(reference !== undefined && tag !== undefined && rest.length === 0, `Invalid docker image: ${buildOptions.startKeycloakOptions.dockerImage}`);
                return { reference, tag };
            })(),
            dockerExtraArgs: (_g = (_f = buildOptions.startKeycloakOptions) === null || _f === void 0 ? void 0 : _f.dockerExtraArgs) !== null && _g !== void 0 ? _g : [],
            keycloakExtraArgs: (_j = (_h = buildOptions.startKeycloakOptions) === null || _h === void 0 ? void 0 : _h.keycloakExtraArgs) !== null && _j !== void 0 ? _j : [],
            extensionJars: ((_l = (_k = buildOptions.startKeycloakOptions) === null || _k === void 0 ? void 0 : _k.extensionJars) !== null && _l !== void 0 ? _l : []).map(urlOrPath => {
                if (/^https?:\/\//.test(urlOrPath)) {
                    return { type: "url", url: urlOrPath };
                }
                return {
                    type: "path",
                    path: (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                        pathIsh: urlOrPath,
                        cwd: relativePathsCwd
                    })
                };
            }),
            realmJsonFilePath: ((_m = buildOptions.startKeycloakOptions) === null || _m === void 0 ? void 0 : _m.realmJsonFilePath) === undefined
                ? undefined
                : (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: buildOptions.startKeycloakOptions.realmJsonFilePath,
                    cwd: relativePathsCwd
                }),
            port: (_o = buildOptions.startKeycloakOptions) === null || _o === void 0 ? void 0 : _o.port
        }
    };
}
//# sourceMappingURL=buildContext.js.map

/***/ }),

/***/ 173:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "Jh": () => (/* binding */ THEME_TYPES),
/* harmony export */   "Ju": () => (/* binding */ WELL_KNOWN_DIRECTORY_BASE_NAME),
/* harmony export */   "PC": () => (/* binding */ KEYCLOAK_THEME),
/* harmony export */   "Sz": () => (/* binding */ KEYCLOAKIFY_SPA_DEV_SERVER_PORT),
/* harmony export */   "TE": () => (/* binding */ VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES),
/* harmony export */   "Tr": () => (/* binding */ KEYCLOAKIFY_LOGIN_JAR_BASENAME),
/* harmony export */   "XV": () => (/* binding */ LOGIN_THEME_PAGE_IDS),
/* harmony export */   "_L": () => (/* binding */ FALLBACK_LANGUAGE_TAG),
/* harmony export */   "_S": () => (/* binding */ CUSTOM_HANDLER_ENV_NAMES),
/* harmony export */   "ac": () => (/* binding */ BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME),
/* harmony export */   "jp": () => (/* binding */ TEST_APP_URL),
/* harmony export */   "sv": () => (/* binding */ CONTAINER_NAME),
/* harmony export */   "yV": () => (/* binding */ ACCOUNT_THEME_PAGE_IDS)
/* harmony export */ });
/* unused harmony export KEYCLOAKIFY_LOGGING_VERSION */
const WELL_KNOWN_DIRECTORY_BASE_NAME = {
    KEYCLOAKIFY_DEV_RESOURCES: "keycloakify-dev-resources",
    RESOURCES_COMMON: "resources-common",
    DIST: "dist"
};
const THEME_TYPES = ["login", "account", "admin"];
const VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES = {
    RUN_POST_BUILD_SCRIPT: "KEYCLOAKIFY_RUN_POST_BUILD_SCRIPT",
    RESOLVE_VITE_CONFIG: "KEYCLOAKIFY_RESOLVE_VITE_CONFIG",
    READ_KC_CONTEXT_FROM_URL: "KEYCLOAKIFY_READ_KC_CONTEXT_FROM_URL"
};
const BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME = "KEYCLOAKIFY_BUILD_FOR_KEYCLOAK_MAJOR_VERSION";
const LOGIN_THEME_PAGE_IDS = [
    "login.ftl",
    "login-username.ftl",
    "login-password.ftl",
    "webauthn-authenticate.ftl",
    "webauthn-register.ftl",
    "register.ftl",
    "info.ftl",
    "error.ftl",
    "login-reset-password.ftl",
    "login-verify-email.ftl",
    "terms.ftl",
    "login-oauth2-device-verify-user-code.ftl",
    "login-oauth-grant.ftl",
    "login-otp.ftl",
    "login-update-profile.ftl",
    "login-update-password.ftl",
    "login-idp-link-confirm.ftl",
    "login-idp-link-email.ftl",
    "login-page-expired.ftl",
    "login-config-totp.ftl",
    "logout-confirm.ftl",
    "idp-review-user-profile.ftl",
    "update-email.ftl",
    "select-authenticator.ftl",
    "saml-post-form.ftl",
    "delete-credential.ftl",
    "code.ftl",
    "delete-account-confirm.ftl",
    "frontchannel-logout.ftl",
    "login-recovery-authn-code-config.ftl",
    "login-recovery-authn-code-input.ftl",
    "login-reset-otp.ftl",
    "login-x509-info.ftl",
    "webauthn-error.ftl",
    "login-passkeys-conditional-authenticate.ftl",
    "login-idp-link-confirm-override.ftl"
];
const ACCOUNT_THEME_PAGE_IDS = [
    "password.ftl",
    "account.ftl",
    "sessions.ftl",
    "totp.ftl",
    "applications.ftl",
    "log.ftl",
    "federatedIdentity.ftl"
];
const CONTAINER_NAME = "keycloak-keycloakify";
const FALLBACK_LANGUAGE_TAG = "en";
const CUSTOM_HANDLER_ENV_NAMES = {
    COMMAND_NAME: "KEYCLOAKIFY_COMMAND_NAME",
    BUILD_CONTEXT: "KEYCLOAKIFY_BUILD_CONTEXT"
};
const KEYCLOAK_THEME = "keycloak-theme";
const KEYCLOAKIFY_SPA_DEV_SERVER_PORT = "KEYCLOAKIFY_SPA_DEV_SERVER_PORT";
const KEYCLOAKIFY_LOGGING_VERSION = "1.0.3";
const KEYCLOAKIFY_LOGIN_JAR_BASENAME = `keycloakify-logging-${KEYCLOAKIFY_LOGGING_VERSION}.jar`;
const TEST_APP_URL = "https://my-theme.keycloakify.dev";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 73036:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ crawl)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nccwpck_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


const crawlRec = (dirPath, filePaths) => {
    for (const basename of fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync(dirPath)) {
        const fileOrDirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dirPath, basename);
        if (fs__WEBPACK_IMPORTED_MODULE_0__.lstatSync(fileOrDirPath).isDirectory()) {
            crawlRec(fileOrDirPath, filePaths);
            continue;
        }
        filePaths.push(fileOrDirPath);
    }
};
/** List all files in a given directory return paths relative to the dir_path */
function crawl(params) {
    const { dirPath, returnedPathsType } = params;
    const filePaths = [];
    crawlRec(dirPath, filePaths);
    switch (returnedPathsType) {
        case "absolute":
            return filePaths;
        case "relative to dirPath":
            return filePaths.map(filePath => (0,path__WEBPACK_IMPORTED_MODULE_1__.relative)(dirPath, filePath));
    }
}
//# sourceMappingURL=crawl.js.map

/***/ }),

/***/ 84794:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ getAbsoluteAndInOsFormatPath)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(22037);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nccwpck_require__.n(os__WEBPACK_IMPORTED_MODULE_1__);


function getAbsoluteAndInOsFormatPath(params) {
    const { pathIsh, cwd } = params;
    let pathOut = pathIsh;
    pathOut = pathOut.replace(/^['"]/, "").replace(/['"]$/, "");
    pathOut = pathOut.replace(/\//g, path__WEBPACK_IMPORTED_MODULE_0__.sep);
    if (pathOut.startsWith("~")) {
        pathOut = pathOut.replace("~", os__WEBPACK_IMPORTED_MODULE_1__.homedir());
    }
    pathOut = pathOut.endsWith(path__WEBPACK_IMPORTED_MODULE_0__.sep) ? pathOut.slice(0, -1) : pathOut;
    if (!(0,path__WEBPACK_IMPORTED_MODULE_0__.isAbsolute)(pathOut)) {
        pathOut = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(cwd, pathOut);
    }
    pathOut = (0,path__WEBPACK_IMPORTED_MODULE_0__.resolve)(pathOut);
    return pathOut;
}
//# sourceMappingURL=getAbsoluteAndInOsFormatPath.js.map

/***/ }),

/***/ 58822:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ getNearestPackageJsonDirPath),
/* harmony export */   "e": () => (/* binding */ getThisCodebaseRootDirPath)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nccwpck_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


let result = undefined;
function getThisCodebaseRootDirPath() {
    if (result !== undefined) {
        return result;
    }
    return (result = getNearestPackageJsonDirPath(__dirname));
}
function getNearestPackageJsonDirPath(dirPath) {
    if (fs__WEBPACK_IMPORTED_MODULE_0__.existsSync(path__WEBPACK_IMPORTED_MODULE_1__.join(dirPath, "package.json"))) {
        return dirPath;
    }
    return getNearestPackageJsonDirPath(path__WEBPACK_IMPORTED_MODULE_1__.join(dirPath, ".."));
}
//# sourceMappingURL=getThisCodebaseRootDirPath.js.map

/***/ }),

/***/ 64795:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ readThisNpmPackageVersion)
/* harmony export */ });
/* harmony import */ var _getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(58822);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(29041);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nccwpck_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nccwpck_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);




let cache = undefined;
function readThisNpmPackageVersion() {
    if (cache !== undefined) {
        return cache;
    }
    const version = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync((0,path__WEBPACK_IMPORTED_MODULE_3__.join)((0,_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getThisCodebaseRootDirPath */ .e)(), "package.json"))
        .toString("utf8"))["version"];
    (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_1__/* .assert */ .h)(typeof version === "string");
    cache = version;
    return version;
}
//# sourceMappingURL=readThisNpmPackageVersion.js.map

/***/ }),

/***/ 99151:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

/* eslint-disable no-control-regex */
// this is a modified version of https://github.com/chalk/ansi-regex (MIT License)
const ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;

const hasColor = () => {
  if (typeof process !== 'undefined') {
    return process.env.FORCE_COLOR !== '0';
  }
  return false;
};

const create = () => {
  const colors = {
    enabled: hasColor(),
    visible: true,
    styles: {},
    keys: {}
  };

  const ansi = style => {
    let open = style.open = `\u001b[${style.codes[0]}m`;
    let close = style.close = `\u001b[${style.codes[1]}m`;
    let regex = style.regex = new RegExp(`\\u001b\\[${style.codes[1]}m`, 'g');
    style.wrap = (input, newline) => {
      if (input.includes(close)) input = input.replace(regex, close + open);
      let output = open + input + close;
      // see https://github.com/chalk/chalk/pull/92, thanks to the
      // chalk contributors for this fix. However, we've confirmed that
      // this issue is also present in Windows terminals
      return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
    };
    return style;
  };

  const wrap = (style, input, newline) => {
    return typeof style === 'function' ? style(input) : style.wrap(input, newline);
  };

  const style = (input, stack) => {
    if (input === '' || input == null) return '';
    if (colors.enabled === false) return input;
    if (colors.visible === false) return '';
    let str = '' + input;
    let nl = str.includes('\n');
    let n = stack.length;
    if (n > 0 && stack.includes('unstyle')) {
      stack = [...new Set(['unstyle', ...stack])].reverse();
    }
    while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);
    return str;
  };

  const define = (name, codes, type) => {
    colors.styles[name] = ansi({ name, codes });
    let keys = colors.keys[type] || (colors.keys[type] = []);
    keys.push(name);

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(name) : [name];
        return color;
      }
    });
  };

  define('reset', [0, 0], 'modifier');
  define('bold', [1, 22], 'modifier');
  define('dim', [2, 22], 'modifier');
  define('italic', [3, 23], 'modifier');
  define('underline', [4, 24], 'modifier');
  define('inverse', [7, 27], 'modifier');
  define('hidden', [8, 28], 'modifier');
  define('strikethrough', [9, 29], 'modifier');

  define('black', [30, 39], 'color');
  define('red', [31, 39], 'color');
  define('green', [32, 39], 'color');
  define('yellow', [33, 39], 'color');
  define('blue', [34, 39], 'color');
  define('magenta', [35, 39], 'color');
  define('cyan', [36, 39], 'color');
  define('white', [37, 39], 'color');
  define('gray', [90, 39], 'color');
  define('grey', [90, 39], 'color');

  define('bgBlack', [40, 49], 'bg');
  define('bgRed', [41, 49], 'bg');
  define('bgGreen', [42, 49], 'bg');
  define('bgYellow', [43, 49], 'bg');
  define('bgBlue', [44, 49], 'bg');
  define('bgMagenta', [45, 49], 'bg');
  define('bgCyan', [46, 49], 'bg');
  define('bgWhite', [47, 49], 'bg');

  define('blackBright', [90, 39], 'bright');
  define('redBright', [91, 39], 'bright');
  define('greenBright', [92, 39], 'bright');
  define('yellowBright', [93, 39], 'bright');
  define('blueBright', [94, 39], 'bright');
  define('magentaBright', [95, 39], 'bright');
  define('cyanBright', [96, 39], 'bright');
  define('whiteBright', [97, 39], 'bright');

  define('bgBlackBright', [100, 49], 'bgBright');
  define('bgRedBright', [101, 49], 'bgBright');
  define('bgGreenBright', [102, 49], 'bgBright');
  define('bgYellowBright', [103, 49], 'bgBright');
  define('bgBlueBright', [104, 49], 'bgBright');
  define('bgMagentaBright', [105, 49], 'bgBright');
  define('bgCyanBright', [106, 49], 'bgBright');
  define('bgWhiteBright', [107, 49], 'bgBright');

  colors.ansiRegex = ANSI_REGEX;
  colors.hasColor = colors.hasAnsi = str => {
    colors.ansiRegex.lastIndex = 0;
    return typeof str === 'string' && str !== '' && colors.ansiRegex.test(str);
  };

  colors.alias = (name, color) => {
    let fn = typeof color === 'string' ? colors[color] : color;

    if (typeof fn !== 'function') {
      throw new TypeError('Expected alias to be the name of an existing color (string) or a function');
    }

    if (!fn.stack) {
      Reflect.defineProperty(fn, 'name', { value: name });
      colors.styles[name] = fn;
      fn.stack = [name];
    }

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
        return color;
      }
    });
  };

  colors.theme = custom => {
    if (!isObject(custom)) throw new TypeError('Expected theme to be an object');
    for (let name of Object.keys(custom)) {
      colors.alias(name, custom[name]);
    }
    return colors;
  };

  colors.alias('unstyle', str => {
    if (typeof str === 'string' && str !== '') {
      colors.ansiRegex.lastIndex = 0;
      return str.replace(colors.ansiRegex, '');
    }
    return '';
  });

  colors.alias('noop', str => str);
  colors.none = colors.clear = colors.noop;

  colors.stripColor = colors.unstyle;
  colors.symbols = __nccwpck_require__(42522);
  colors.define = define;
  return colors;
};

module.exports = create();
module.exports.create = create;


/***/ }),

/***/ 42522:
/***/ ((module) => {

"use strict";


const isHyper = typeof process !== 'undefined' && process.env.TERM_PROGRAM === 'Hyper';
const isWindows = typeof process !== 'undefined' && process.platform === 'win32';
const isLinux = typeof process !== 'undefined' && process.platform === 'linux';

const common = {
  ballotDisabled: '☒',
  ballotOff: '☐',
  ballotOn: '☑',
  bullet: '•',
  bulletWhite: '◦',
  fullBlock: '█',
  heart: '❤',
  identicalTo: '≡',
  line: '─',
  mark: '※',
  middot: '·',
  minus: '－',
  multiplication: '×',
  obelus: '÷',
  pencilDownRight: '✎',
  pencilRight: '✏',
  pencilUpRight: '✐',
  percent: '%',
  pilcrow2: '❡',
  pilcrow: '¶',
  plusMinus: '±',
  question: '?',
  section: '§',
  starsOff: '☆',
  starsOn: '★',
  upDownArrow: '↕'
};

const windows = Object.assign({}, common, {
  check: '√',
  cross: '×',
  ellipsisLarge: '...',
  ellipsis: '...',
  info: 'i',
  questionSmall: '?',
  pointer: '>',
  pointerSmall: '»',
  radioOff: '( )',
  radioOn: '(*)',
  warning: '‼'
});

const other = Object.assign({}, common, {
  ballotCross: '✘',
  check: '✔',
  cross: '✖',
  ellipsisLarge: '⋯',
  ellipsis: '…',
  info: 'ℹ',
  questionFull: '？',
  questionSmall: '﹖',
  pointer: isLinux ? '▸' : '❯',
  pointerSmall: isLinux ? '‣' : '›',
  radioOff: '◯',
  radioOn: '◉',
  warning: '⚠'
});

module.exports = (isWindows && !isHyper) ? windows : other;
Reflect.defineProperty(module.exports, 'common', { enumerable: false, value: common });
Reflect.defineProperty(module.exports, 'windows', { enumerable: false, value: windows });
Reflect.defineProperty(module.exports, 'other', { enumerable: false, value: other });


/***/ }),

/***/ 65063:
/***/ ((module) => {

"use strict";


module.exports = ({onlyFirst = false} = {}) => {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
};


/***/ }),

/***/ 52068:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* module decorator */ module = __nccwpck_require__.nmd(module);


const wrapAnsi16 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
	const rgb = fn(...args);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;
const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
	Object.defineProperty(object, property, {
		get: () => {
			const value = get();

			Object.defineProperty(object, property, {
				value,
				enumerable: true,
				configurable: true
			});

			return value;
		},
		enumerable: true,
		configurable: true
	});
};

/** @type {typeof import('color-convert')} */
let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
	if (colorConvert === undefined) {
		colorConvert = __nccwpck_require__(86931);
	}

	const offset = isBackground ? 10 : 0;
	const styles = {};

	for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
		if (sourceSpace === targetSpace) {
			styles[name] = wrap(identity, offset);
		} else if (typeof suite === 'object') {
			styles[name] = wrap(suite[targetSpace], offset);
		}
	}

	return styles;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ 78818:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const ansiStyles = __nccwpck_require__(52068);
const {stdout: stdoutColor, stderr: stderrColor} = __nccwpck_require__(59318);
const {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
} = __nccwpck_require__(82415);

const {isArray} = Array;

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m'
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = {};
	applyOptions(chalk, options);

	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

	Object.setPrototypeOf(chalk, Chalk.prototype);
	Object.setPrototypeOf(chalk.template, chalk);

	chalk.template.constructor = () => {
		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
	};

	chalk.template.Instance = ChalkClass;

	return chalk.template;
};

function Chalk(options) {
	return chalkFactory(options);
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		}
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this._styler, true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	}
};

const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

for (const model of usedModels) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this._generator.level;
		},
		set(level) {
			this._generator.level = level;
		}
	}
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
			// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
			return applyStyle(builder, chalkTag(builder, ...arguments_));
		}

		// Single argument is hot path, implicit coercion is faster than anything
		// eslint-disable-next-line no-implicit-coercion
		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
	};

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder._generator = self;
	builder._styler = _styler;
	builder._isEmpty = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self._isEmpty ? '' : string;
	}

	let styler = self._styler;

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.indexOf('\u001B') !== -1) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

let template;
const chalkTag = (chalk, ...strings) => {
	const [firstString] = strings;

	if (!isArray(firstString) || !isArray(firstString.raw)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return strings.join(' ');
	}

	const arguments_ = strings.slice(1);
	const parts = [firstString.raw[0]];

	for (let i = 1; i < firstString.length; i++) {
		parts.push(
			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
			String(firstString.raw[i])
		);
	}

	if (template === undefined) {
		template = __nccwpck_require__(20500);
	}

	return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);

const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;

module.exports = chalk;


/***/ }),

/***/ 20500:
/***/ ((module) => {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	const u = c[0] === 'u';
	const bracket = c[1] === '{';

	if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	if (u && bracket) {
		return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, arguments_) {
	const results = [];
	const chunks = arguments_.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		const number = Number(chunk);
		if (!Number.isNaN(number)) {
			results.push(number);
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const [styleName, styles] of Object.entries(enabled)) {
		if (!Array.isArray(styles)) {
			continue;
		}

		if (!(styleName in current)) {
			throw new Error(`Unknown Chalk style: ${styleName}`);
		}

		current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
	}

	return current;
}

module.exports = (chalk, temporary) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
		if (escapeCharacter) {
			chunk.push(unescape(escapeCharacter));
		} else if (style) {
			const string = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(character);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMessage);
	}

	return chunks.join('');
};


/***/ }),

/***/ 82415:
/***/ ((module) => {

"use strict";


const stringReplaceAll = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

module.exports = {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
};


/***/ }),

/***/ 97391:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __nccwpck_require__(78510);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ 86931:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const conversions = __nccwpck_require__(97391);
const route = __nccwpck_require__(30880);

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ 30880:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const conversions = __nccwpck_require__(97391);

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ 78510:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 56587:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const assert = __nccwpck_require__(39491);
const Events = __nccwpck_require__(82361);
const utils = __nccwpck_require__(28527);

/**
 * Create an instance of `Enquirer`.
 *
 * ```js
 * const Enquirer = require('enquirer');
 * const enquirer = new Enquirer();
 * ```
 * @name Enquirer
 * @param {Object} `options` (optional) Options to use with all prompts.
 * @param {Object} `answers` (optional) Answers object to initialize with.
 * @api public
 */

class Enquirer extends Events {
  constructor(options, answers) {
    super();
    this.options = utils.merge({}, options);
    this.answers = { ...answers };
  }

  /**
   * Register a custom prompt type.
   *
   * ```js
   * const Enquirer = require('enquirer');
   * const enquirer = new Enquirer();
   * enquirer.register('customType', require('./custom-prompt'));
   * ```
   * @name register()
   * @param {String} `type`
   * @param {Function|Prompt} `fn` `Prompt` class, or a function that returns a `Prompt` class.
   * @return {Object} Returns the Enquirer instance
   * @api public
   */

  register(type, fn) {
    if (utils.isObject(type)) {
      for (let key of Object.keys(type)) this.register(key, type[key]);
      return this;
    }

    assert.equal(typeof fn, 'function', 'expected a function');
    const name = type.toLowerCase();

    if (fn.prototype instanceof this.Prompt) {
      this.prompts[name] = fn;
    } else {
      this.prompts[name] = fn(this.Prompt, this);
    }

    return this;
  }

  /**
   * Prompt function that takes a "question" object or array of question objects,
   * and returns an object with responses from the user.
   *
   * ```js
   * const Enquirer = require('enquirer');
   * const enquirer = new Enquirer();
   *
   * const response = await enquirer.prompt({
   *   type: 'input',
   *   name: 'username',
   *   message: 'What is your username?'
   * });
   * console.log(response);
   * ```
   * @name prompt()
   * @param {Array|Object} `questions` Options objects for one or more prompts to run.
   * @return {Promise} Promise that returns an "answers" object with the user's responses.
   * @api public
   */

  async prompt(questions = []) {
    for (let question of [].concat(questions)) {
      try {
        if (typeof question === 'function') question = await question.call(this);
        await this.ask(utils.merge({}, this.options, question));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return this.answers;
  }

  async ask(question) {
    if (typeof question === 'function') {
      question = await question.call(this);
    }

    let opts = utils.merge({}, this.options, question);
    let { type, name } = question;
    let { set, get } = utils;

    if (typeof type === 'function') {
      type = await type.call(this, question, this.answers);
    }

    if (!type) return this.answers[name];
    if (type === 'number') type = 'numeral';

    assert(this.prompts[type], `Prompt "${type}" is not registered`);

    let prompt = new this.prompts[type](opts);
    let value = get(this.answers, name);

    prompt.state.answers = this.answers;
    prompt.enquirer = this;

    if (name) {
      prompt.on('submit', value => {
        this.emit('answer', name, value, prompt);
        set(this.answers, name, value);
      });
    }

    // bubble events
    let emit = prompt.emit.bind(prompt);
    prompt.emit = (...args) => {
      this.emit.call(this, ...args);
      return emit(...args);
    };

    this.emit('prompt', prompt, this);

    if (opts.autofill && value != null) {
      prompt.value = prompt.input = value;

      // if "autofill=show" render the prompt, otherwise stay "silent"
      if (opts.autofill === 'show') {
        await prompt.submit();
      }
    } else {
      value = prompt.value = await prompt.run();
    }

    return value;
  }

  /**
   * Use an enquirer plugin.
   *
   * ```js
   * const Enquirer = require('enquirer');
   * const enquirer = new Enquirer();
   * const plugin = enquirer => {
   *   // do stuff to enquire instance
   * };
   * enquirer.use(plugin);
   * ```
   * @name use()
   * @param {Function} `plugin` Plugin function that takes an instance of Enquirer.
   * @return {Object} Returns the Enquirer instance.
   * @api public
   */

  use(plugin) {
    plugin.call(this, this);
    return this;
  }

  set Prompt(value) {
    this._Prompt = value;
  }
  get Prompt() {
    return this._Prompt || this.constructor.Prompt;
  }

  get prompts() {
    return this.constructor.prompts;
  }

  static set Prompt(value) {
    this._Prompt = value;
  }
  static get Prompt() {
    return this._Prompt || __nccwpck_require__(7072);
  }

  static get prompts() {
    return __nccwpck_require__(76048);
  }

  static get types() {
    return __nccwpck_require__(20891);
  }

  /**
   * Prompt function that takes a "question" object or array of question objects,
   * and returns an object with responses from the user.
   *
   * ```js
   * const { prompt } = require('enquirer');
   * const response = await prompt({
   *   type: 'input',
   *   name: 'username',
   *   message: 'What is your username?'
   * });
   * console.log(response);
   * ```
   * @name Enquirer#prompt
   * @param {Array|Object} `questions` Options objects for one or more prompts to run.
   * @return {Promise} Promise that returns an "answers" object with the user's responses.
   * @api public
   */

  static get prompt() {
    const fn = (questions, ...rest) => {
      let enquirer = new this(...rest);
      let emit = enquirer.emit.bind(enquirer);
      enquirer.emit = (...args) => {
        fn.emit(...args);
        return emit(...args);
      };
      return enquirer.prompt(questions);
    };
    utils.mixinEmitter(fn, new Events());
    return fn;
  }
}

utils.mixinEmitter(Enquirer, new Events());
const prompts = Enquirer.prompts;

for (let name of Object.keys(prompts)) {
  let key = name.toLowerCase();

  let run = options => new prompts[name](options).run();
  Enquirer.prompt[key] = run;
  Enquirer[key] = run;

  if (!Enquirer[name]) {
    Reflect.defineProperty(Enquirer, name, { get: () => prompts[name] });
  }
}

const define = name => {
  utils.defineExport(Enquirer, name, () => Enquirer.types[name]);
};

define('ArrayPrompt');
define('AuthPrompt');
define('BooleanPrompt');
define('NumberPrompt');
define('StringPrompt');

module.exports = Enquirer;


/***/ }),

/***/ 11330:
/***/ ((module, exports, __nccwpck_require__) => {

"use strict";


const isTerm = process.env.TERM_PROGRAM === 'Apple_Terminal';
const stripAnsi = __nccwpck_require__(45591);
const utils = __nccwpck_require__(28527);
const ansi = module.exports = exports;
const ESC = '\u001b[';
const BEL = '\u0007';
let hidden = false;

const code = ansi.code = {
  bell: BEL,
  beep: BEL,
  beginning: `${ESC}G`,
  down: `${ESC}J`,
  esc: ESC,
  getPosition: `${ESC}6n`,
  hide: `${ESC}?25l`,
  line: `${ESC}2K`,
  lineEnd: `${ESC}K`,
  lineStart: `${ESC}1K`,
  restorePosition: ESC + (isTerm ? '8' : 'u'),
  savePosition: ESC + (isTerm ? '7' : 's'),
  screen: `${ESC}2J`,
  show: `${ESC}?25h`,
  up: `${ESC}1J`
};

const cursor = ansi.cursor = {
  get hidden() {
    return hidden;
  },

  hide() {
    hidden = true;
    return code.hide;
  },
  show() {
    hidden = false;
    return code.show;
  },

  forward: (count = 1) => `${ESC}${count}C`,
  backward: (count = 1) => `${ESC}${count}D`,
  nextLine: (count = 1) => `${ESC}E`.repeat(count),
  prevLine: (count = 1) => `${ESC}F`.repeat(count),

  up: (count = 1) => count ? `${ESC}${count}A` : '',
  down: (count = 1) => count ? `${ESC}${count}B` : '',
  right: (count = 1) => count ? `${ESC}${count}C` : '',
  left: (count = 1) => count ? `${ESC}${count}D` : '',

  to(x, y) {
    return y ? `${ESC}${y + 1};${x + 1}H` : `${ESC}${x + 1}G`;
  },

  move(x = 0, y = 0) {
    let res = '';
    res += (x < 0) ? cursor.left(-x) : (x > 0) ? cursor.right(x) : '';
    res += (y < 0) ? cursor.up(-y) : (y > 0) ? cursor.down(y) : '';
    return res;
  },
  strLen(str) {
    // to suport chinese
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  },
  restore(state = {}) {
    let { after, cursor, initial, input, prompt, size, value } = state;
    initial = utils.isPrimitive(initial) ? String(initial) : '';
    input = utils.isPrimitive(input) ? String(input) : '';
    value = utils.isPrimitive(value) ? String(value) : '';

    if (size) {
      let codes = ansi.cursor.up(size) + ansi.cursor.to(this.strLen(prompt));
      let diff = input.length - cursor;
      if (diff > 0) {
        codes += ansi.cursor.left(diff);
      }
      return codes;
    }

    if (value || after) {
      let pos = (!input && !!initial) ? - this.strLen(initial) : -this.strLen(input) + cursor;
      if (after) pos -= this.strLen(after);
      if (input === '' && initial && !prompt.includes(initial)) {
        pos += this.strLen(initial);
      }
      return ansi.cursor.move(pos);
    }
  }
};

const erase = ansi.erase = {
  screen: code.screen,
  up: code.up,
  down: code.down,
  line: code.line,
  lineEnd: code.lineEnd,
  lineStart: code.lineStart,
  lines(n) {
    let str = '';
    for (let i = 0; i < n; i++) {
      str += ansi.erase.line + (i < n - 1 ? ansi.cursor.up(1) : '');
    }
    if (n) str += ansi.code.beginning;
    return str;
  }
};

ansi.clear = (input = '', columns = process.stdout.columns) => {
  if (!columns) return erase.line + cursor.to(0);
  let width = str => [...stripAnsi(str)].length;
  let lines = input.split(/\r?\n/);
  let rows = 0;
  for (let line of lines) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / columns);
  }
  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};


/***/ }),

/***/ 46580:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Actions are mappings from keypress event names to method names
 * in the prompts.
 */

exports.ctrl = {
  a: 'first',
  b: 'backward',
  c: 'cancel',
  d: 'deleteForward',
  e: 'last',
  f: 'forward',
  g: 'reset',
  i: 'tab',
  k: 'cutForward',
  l: 'reset',
  n: 'newItem',
  m: 'cancel',
  j: 'submit',
  p: 'search',
  r: 'remove',
  s: 'save',
  u: 'undo',
  w: 'cutLeft',
  x: 'toggleCursor',
  v: 'paste'
};

exports.shift = {
  up: 'shiftUp',
  down: 'shiftDown',
  left: 'shiftLeft',
  right: 'shiftRight',
  tab: 'prev'
};

exports.fn = {
  up: 'pageUp',
  down: 'pageDown',
  left: 'pageLeft',
  right: 'pageRight',
  delete: 'deleteForward'
};

// <alt> on Windows
exports.option = {
  b: 'backward',
  f: 'forward',
  d: 'cutRight',
  left: 'cutLeft',
  up: 'altUp',
  down: 'altDown'
};

exports.keys = {
  pageup: 'pageUp', // <fn>+<up> (mac), <Page Up> (windows)
  pagedown: 'pageDown', // <fn>+<down> (mac), <Page Down> (windows)
  home: 'home', // <fn>+<left> (mac), <home> (windows)
  end: 'end', // <fn>+<right> (mac), <end> (windows)
  cancel: 'cancel',
  delete: 'deleteForward',
  backspace: 'delete',
  down: 'down',
  enter: 'submit',
  escape: 'cancel',
  left: 'left',
  space: 'space',
  number: 'number',
  return: 'submit',
  right: 'right',
  tab: 'next',
  up: 'up'
};


/***/ }),

/***/ 74130:
/***/ ((module) => {

"use strict";


const unique = arr => arr.filter((v, i) => arr.lastIndexOf(v) === i);
const compact = arr => unique(arr).filter(Boolean);

module.exports = (action, data = {}, value = '') => {
  let { past = [], present = '' } = data;
  let rest, prev;

  switch (action) {
    case 'prev':
    case 'undo':
      rest = past.slice(0, past.length - 1);
      prev = past[past.length - 1] || '';
      return {
        past: compact([value, ...rest]),
        present: prev
      };

    case 'next':
    case 'redo':
      rest = past.slice(1);
      prev = past[0] || '';
      return {
        past: compact([...rest, value]),
        present: prev
      };

    case 'save':
      return {
        past: compact([...past, value]),
        present: ''
      };

    case 'remove':
      prev = compact(past.filter(v => v !== value));
      present = '';

      if (prev.length) {
        present = prev.pop();
      }

      return {
        past: prev,
        present
      };

    default: {
      throw new Error(`Invalid action: "${action}"`);
    }
  }
};


/***/ }),

/***/ 52299:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stripAnsi = __nccwpck_require__(45591);
const clean = (str = '') => {
  return typeof str === 'string' ? str.replace(/^['"]|['"]$/g, '') : '';
};

/**
 * This file contains the interpolation and rendering logic for
 * the Snippet prompt.
 */

class Item {
  constructor(token) {
    this.name = token.key;
    this.field = token.field || {};
    this.value = clean(token.initial || this.field.initial || '');
    this.message = token.message || this.name;
    this.cursor = 0;
    this.input = '';
    this.lines = [];
  }
}

const tokenize = async(options = {}, defaults = {}, fn = token => token) => {
  let unique = new Set();
  let fields = options.fields || [];
  let input = options.template;
  let tabstops = [];
  let items = [];
  let keys = [];
  let line = 1;

  if (typeof input === 'function') {
    input = await input();
  }

  let i = -1;
  let next = () => input[++i];
  let peek = () => input[i + 1];
  let push = token => {
    token.line = line;
    tabstops.push(token);
  };

  push({ type: 'bos', value: '' });

  while (i < input.length - 1) {
    let value = next();

    if (/^[^\S\n ]$/.test(value)) {
      push({ type: 'text', value });
      continue;
    }

    if (value === '\n') {
      push({ type: 'newline', value });
      line++;
      continue;
    }

    if (value === '\\') {
      value += next();
      push({ type: 'text', value });
      continue;
    }

    if ((value === '$' || value === '#' || value === '{') && peek() === '{') {
      let n = next();
      value += n;

      let token = { type: 'template', open: value, inner: '', close: '', value };
      let ch;

      while ((ch = next())) {
        if (ch === '}') {
          if (peek() === '}') ch += next();
          token.value += ch;
          token.close = ch;
          break;
        }

        if (ch === ':') {
          token.initial = '';
          token.key = token.inner;
        } else if (token.initial !== void 0) {
          token.initial += ch;
        }

        token.value += ch;
        token.inner += ch;
      }

      token.template = token.open + (token.initial || token.inner) + token.close;
      token.key = token.key || token.inner;

      if (hasOwnProperty.call(defaults, token.key)) {
        token.initial = defaults[token.key];
      }

      token = fn(token);
      push(token);

      keys.push(token.key);
      unique.add(token.key);

      let item = items.find(item => item.name === token.key);
      token.field = fields.find(ch => ch.name === token.key);

      if (!item) {
        item = new Item(token);
        items.push(item);
      }

      item.lines.push(token.line - 1);
      continue;
    }

    let last = tabstops[tabstops.length - 1];
    if (last.type === 'text' && last.line === line) {
      last.value += value;
    } else {
      push({ type: 'text', value });
    }
  }

  push({ type: 'eos', value: '' });
  return { input, tabstops, unique, keys, items };
};

module.exports = async prompt => {
  let options = prompt.options;
  let required = new Set(options.required === true ? [] : (options.required || []));
  let defaults = { ...options.values, ...options.initial };
  let { tabstops, items, keys } = await tokenize(options, defaults);

  let result = createFn('result', prompt, options);
  let format = createFn('format', prompt, options);
  let isValid = createFn('validate', prompt, options, true);
  let isVal = prompt.isValue.bind(prompt);

  return async(state = {}, submitted = false) => {
    let index = 0;

    state.required = required;
    state.items = items;
    state.keys = keys;
    state.output = '';

    let validate = async(value, state, item, index) => {
      let error = await isValid(value, state, item, index);
      if (error === false) {
        return 'Invalid field ' + item.name;
      }
      return error;
    };

    for (let token of tabstops) {
      let value = token.value;
      let key = token.key;

      if (token.type !== 'template') {
        if (value) state.output += value;
        continue;
      }

      if (token.type === 'template') {
        let item = items.find(ch => ch.name === key);

        if (options.required === true) {
          state.required.add(item.name);
        }

        let val = [item.input, state.values[item.value], item.value, value].find(isVal);
        let field = item.field || {};
        let message = field.message || token.inner;

        if (submitted) {
          let error = await validate(state.values[key], state, item, index);
          if ((error && typeof error === 'string') || error === false) {
            state.invalid.set(key, error);
            continue;
          }

          state.invalid.delete(key);
          let res = await result(state.values[key], state, item, index);
          state.output += stripAnsi(res);
          continue;
        }

        item.placeholder = false;

        let before = value;
        value = await format(value, state, item, index);

        if (val !== value) {
          state.values[key] = val;
          value = prompt.styles.typing(val);
          state.missing.delete(message);

        } else {
          state.values[key] = void 0;
          val = `<${message}>`;
          value = prompt.styles.primary(val);
          item.placeholder = true;

          if (state.required.has(key)) {
            state.missing.add(message);
          }
        }

        if (state.missing.has(message) && state.validating) {
          value = prompt.styles.warning(val);
        }

        if (state.invalid.has(key) && state.validating) {
          value = prompt.styles.danger(val);
        }

        if (index === state.index) {
          if (before !== value) {
            value = prompt.styles.underline(value);
          } else {
            value = prompt.styles.heading(stripAnsi(value));
          }
        }

        index++;
      }

      if (value) {
        state.output += value;
      }
    }

    let lines = state.output.split('\n').map(l => ' ' + l);
    let len = items.length;
    let done = 0;

    for (let item of items) {
      if (state.invalid.has(item.name)) {
        item.lines.forEach(i => {
          if (lines[i][0] !== ' ') return;
          lines[i] = state.styles.danger(state.symbols.bullet) + lines[i].slice(1);
        });
      }

      if (prompt.isValue(state.values[item.name])) {
        done++;
      }
    }

    state.completed = ((done / len) * 100).toFixed(0);
    state.output = lines.join('\n');
    return state.output;
  };
};

function createFn(prop, prompt, options, fallback) {
  return (value, state, item, index) => {
    if (typeof item.field[prop] === 'function') {
      return item.field[prop].call(prompt, value, state, item, index);
    }
    return [fallback, value].find(v => prompt.isValue(v));
  };
}


/***/ }),

/***/ 44162:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const readline = __nccwpck_require__(14521);
const combos = __nccwpck_require__(46580);
const Queue = __nccwpck_require__(25404);

/* eslint-disable no-control-regex */
const metaKeyCodeRe = /^(?:\x1b)([a-zA-Z0-9])$/;
const fnKeyRe = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;
const keyName = {
  /* xterm/gnome ESC O letter */
  'OP': 'f1',
  'OQ': 'f2',
  'OR': 'f3',
  'OS': 'f4',
  /* xterm/rxvt ESC [ number ~ */
  '[11~': 'f1',
  '[12~': 'f2',
  '[13~': 'f3',
  '[14~': 'f4',
  /* from Cygwin and used in libuv */
  '[[A': 'f1',
  '[[B': 'f2',
  '[[C': 'f3',
  '[[D': 'f4',
  '[[E': 'f5',
  /* common */
  '[15~': 'f5',
  '[17~': 'f6',
  '[18~': 'f7',
  '[19~': 'f8',
  '[20~': 'f9',
  '[21~': 'f10',
  '[23~': 'f11',
  '[24~': 'f12',
  /* xterm ESC [ letter */
  '[A': 'up',
  '[B': 'down',
  '[C': 'right',
  '[D': 'left',
  '[E': 'clear',
  '[F': 'end',
  '[H': 'home',
  /* xterm/gnome ESC O letter */
  'OA': 'up',
  'OB': 'down',
  'OC': 'right',
  'OD': 'left',
  'OE': 'clear',
  'OF': 'end',
  'OH': 'home',
  /* xterm/rxvt ESC [ number ~ */
  '[1~': 'home',
  '[2~': 'insert',
  '[3~': 'delete',
  '[4~': 'end',
  '[5~': 'pageup',
  '[6~': 'pagedown',
  /* putty */
  '[[5~': 'pageup',
  '[[6~': 'pagedown',
  /* rxvt */
  '[7~': 'home',
  '[8~': 'end',
  /* rxvt keys with modifiers */
  '[a': 'up',
  '[b': 'down',
  '[c': 'right',
  '[d': 'left',
  '[e': 'clear',

  '[2$': 'insert',
  '[3$': 'delete',
  '[5$': 'pageup',
  '[6$': 'pagedown',
  '[7$': 'home',
  '[8$': 'end',

  'Oa': 'up',
  'Ob': 'down',
  'Oc': 'right',
  'Od': 'left',
  'Oe': 'clear',

  '[2^': 'insert',
  '[3^': 'delete',
  '[5^': 'pageup',
  '[6^': 'pagedown',
  '[7^': 'home',
  '[8^': 'end',
  /* misc. */
  '[Z': 'tab'
};

function isShiftKey(code) {
  return ['[a', '[b', '[c', '[d', '[e', '[2$', '[3$', '[5$', '[6$', '[7$', '[8$', '[Z'].includes(code);
}

function isCtrlKey(code) {
  return [ 'Oa', 'Ob', 'Oc', 'Od', 'Oe', '[2^', '[3^', '[5^', '[6^', '[7^', '[8^'].includes(code);
}

const keypress = (s = '', event = {}) => {
  let parts;
  let key = {
    name: event.name,
    ctrl: false,
    meta: false,
    shift: false,
    option: false,
    sequence: s,
    raw: s,
    ...event
  };

  if (Buffer.isBuffer(s)) {
    if (s[0] > 127 && s[1] === void 0) {
      s[0] -= 128;
      s = '\x1b' + String(s);
    } else {
      s = String(s);
    }
  } else if (s !== void 0 && typeof s !== 'string') {
    s = String(s);
  } else if (!s) {
    s = key.sequence || '';
  }

  key.sequence = key.sequence || s || key.name;

  if (s === '\r') {
    // carriage return
    key.raw = void 0;
    key.name = 'return';
  } else if (s === '\n') {
    // enter, should have been called linefeed
    key.name = 'enter';
  } else if (s === '\t') {
    // tab
    key.name = 'tab';
  } else if (s === '\b' || s === '\x7f' || s === '\x1b\x7f' || s === '\x1b\b') {
    // backspace or ctrl+h
    key.name = 'backspace';
    key.meta = s.charAt(0) === '\x1b';
  } else if (s === '\x1b' || s === '\x1b\x1b') {
    // escape key
    key.name = 'escape';
    key.meta = s.length === 2;
  } else if (s === ' ' || s === '\x1b ') {
    key.name = 'space';
    key.meta = s.length === 2;
  } else if (s <= '\x1a') {
    // ctrl+letter
    key.name = String.fromCharCode(s.charCodeAt(0) + 'a'.charCodeAt(0) - 1);
    key.ctrl = true;
  } else if (s.length === 1 && s >= '0' && s <= '9') {
    // number
    key.name = 'number';
  } else if (s.length === 1 && s >= 'a' && s <= 'z') {
    // lowercase letter
    key.name = s;
  } else if (s.length === 1 && s >= 'A' && s <= 'Z') {
    // shift+letter
    key.name = s.toLowerCase();
    key.shift = true;
  } else if ((parts = metaKeyCodeRe.exec(s))) {
    // meta+character key
    key.meta = true;
    key.shift = /^[A-Z]$/.test(parts[1]);
  } else if ((parts = fnKeyRe.exec(s))) {
    let segs = [...s];

    if (segs[0] === '\u001b' && segs[1] === '\u001b') {
      key.option = true;
    }

    // ansi escape sequence
    // reassemble the key code leaving out leading \x1b's,
    // the modifier key bitflag and any meaningless "1;" sequence
    let code = [parts[1], parts[2], parts[4], parts[6]].filter(Boolean).join('');
    let modifier = (parts[3] || parts[5] || 1) - 1;

    // Parse the key modifier
    key.ctrl = !!(modifier & 4);
    key.meta = !!(modifier & 10);
    key.shift = !!(modifier & 1);
    key.code = code;

    key.name = keyName[code];
    key.shift = isShiftKey(code) || key.shift;
    key.ctrl = isCtrlKey(code) || key.ctrl;
  }
  return key;
};

keypress.listen = (options = {}, onKeypress) => {
  let { stdin } = options;

  if (!stdin || (stdin !== process.stdin && !stdin.isTTY)) {
    throw new Error('Invalid stream passed');
  }

  let rl = readline.createInterface({ terminal: true, input: stdin });
  readline.emitKeypressEvents(stdin, rl);

  const queue = new Queue((buf, key) => onKeypress(buf, keypress(buf, key), rl));
  let isRaw = stdin.isRaw;

  if (stdin.isTTY) stdin.setRawMode(true);
  stdin.on('keypress', queue.enqueue);
  rl.resume();

  let off = () => {
    if (stdin.isTTY) stdin.setRawMode(isRaw);
    stdin.removeListener('keypress', queue.enqueue);
    queue.destroy();
    rl.pause();
    rl.close();
  };

  return off;
};

keypress.action = (buf, key, customActions) => {
  let obj = { ...combos, ...customActions };
  if (key.ctrl) {
    key.action = obj.ctrl[key.name];
    return key;
  }

  if (key.option && obj.option) {
    key.action = obj.option[key.name];
    return key;
  }

  if (key.shift) {
    key.action = obj.shift[key.name];
    return key;
  }

  key.action = obj.keys[key.name];
  return key;
};

module.exports = keypress;


/***/ }),

/***/ 79690:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const utils = __nccwpck_require__(28527);

/**
 * Render a placeholder value with cursor and styling based on the
 * position of the cursor.
 *
 * @param {Object} `prompt` Prompt instance.
 * @param {String} `input` Input string.
 * @param {String} `initial` The initial user-provided value.
 * @param {Number} `pos` Current cursor position.
 * @param {Boolean} `showCursor` Render a simulated cursor using the inverse primary style.
 * @return {String} Returns the styled placeholder string.
 * @api public
 */

module.exports = (prompt, options = {}) => {
  prompt.cursorHide();

  let { input = '', initial = '', pos, showCursor = true, color } = options;
  let style = color || prompt.styles.placeholder;
  let inverse = utils.inverse(prompt.styles.primary);
  let blinker = str => inverse(prompt.styles.black(str));
  let output = input;
  let char = ' ';
  let reverse = blinker(char);

  if (prompt.blink && prompt.blink.off === true) {
    blinker = str => str;
    reverse = '';
  }

  if (showCursor && pos === 0 && initial === '' && input === '') {
    return blinker(char);
  }

  if (showCursor && pos === 0 && (input === initial || input === '')) {
    return blinker(initial[0]) + style(initial.slice(1));
  }

  initial = utils.isPrimitive(initial) ? `${initial}` : '';
  input = utils.isPrimitive(input) ? `${input}` : '';

  let placeholder = initial && initial.startsWith(input) && initial !== input;
  let cursor = placeholder ? blinker(initial[input.length]) : reverse;

  if (pos !== input.length && showCursor === true) {
    output = input.slice(0, pos) + blinker(input[pos]) + input.slice(pos + 1);
    cursor = '';
  }

  if (showCursor === false) {
    cursor = '';
  }

  if (placeholder) {
    let raw = prompt.styles.unstyle(output + cursor);
    return output + cursor + style(initial.slice(raw.length));
  }

  return output + cursor;
};


/***/ }),

/***/ 7072:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Events = __nccwpck_require__(82361);
const stripAnsi = __nccwpck_require__(45591);
const keypress = __nccwpck_require__(44162);
const timer = __nccwpck_require__(37711);
const State = __nccwpck_require__(21686);
const theme = __nccwpck_require__(46739);
const utils = __nccwpck_require__(28527);
const ansi = __nccwpck_require__(11330);

/**
 * Base class for creating a new Prompt.
 * @param {Object} `options` Question object.
 */

class Prompt extends Events {
  constructor(options = {}) {
    super();
    this.name = options.name;
    this.type = options.type;
    this.options = options;
    theme(this);
    timer(this);
    this.state = new State(this);
    this.initial = [options.initial, options.default].find(v => v != null);
    this.stdout = options.stdout || process.stdout;
    this.stdin = options.stdin || process.stdin;
    this.scale = options.scale || 1;
    this.term = this.options.term || process.env.TERM_PROGRAM;
    this.margin = margin(this.options.margin);
    this.setMaxListeners(0);
    setOptions(this);
  }

  async keypress(input, event = {}) {
    this.keypressed = true;
    let key = keypress.action(input, keypress(input, event), this.options.actions);
    this.state.keypress = key;
    this.emit('keypress', input, key);
    this.emit('state', this.state.clone());

    const fn = this.options[key.action] || this[key.action] || this.dispatch;

    if (typeof fn === 'function') {
      return await fn.call(this, input, key);
    }

    this.alert();
  }

  alert() {
    delete this.state.alert;
    if (this.options.show === false) {
      this.emit('alert');
    } else {
      this.stdout.write(ansi.code.beep);
    }
  }

  cursorHide() {
    this.stdout.write(ansi.cursor.hide());
    const releaseOnExit = utils.onExit(() => this.cursorShow());
    this.on('close', () => {
      this.cursorShow();
      releaseOnExit();
    });
  }

  cursorShow() {
    this.stdout.write(ansi.cursor.show());
  }

  write(str) {
    if (!str) return;
    if (this.stdout && this.state.show !== false) {
      this.stdout.write(str);
    }
    this.state.buffer += str;
  }

  clear(lines = 0) {
    let buffer = this.state.buffer;
    this.state.buffer = '';
    if ((!buffer && !lines) || this.options.show === false) return;
    this.stdout.write(ansi.cursor.down(lines) + ansi.clear(buffer, this.width));
  }

  restore() {
    if (this.state.closed || this.options.show === false) return;

    let { prompt, after, rest } = this.sections();
    let { cursor, initial = '', input = '', value = '' } = this;

    let size = this.state.size = rest.length;
    let state = { after, cursor, initial, input, prompt, size, value };
    let codes = ansi.cursor.restore(state);
    if (codes) {
      this.stdout.write(codes);
    }
  }

  sections() {
    let { buffer, input, prompt } = this.state;
    prompt = stripAnsi(prompt);
    let buf = stripAnsi(buffer);
    let idx = buf.indexOf(prompt);
    let header = buf.slice(0, idx);
    let rest = buf.slice(idx);
    let lines = rest.split('\n');
    let first = lines[0];
    let last = lines[lines.length - 1];
    let promptLine = prompt + (input ? ' ' + input : '');
    let len = promptLine.length;
    let after = len < first.length ? first.slice(len + 1) : '';
    return { header, prompt: first, after, rest: lines.slice(1), last };
  }

  async submit() {
    this.state.submitted = true;
    this.state.validating = true;

    // this will only be called when the prompt is directly submitted
    // without initializing, i.e. when the prompt is skipped, etc. Otherwize,
    // "options.onSubmit" is will be handled by the "initialize()" method.
    if (this.options.onSubmit) {
      await this.options.onSubmit.call(this, this.name, this.value, this);
    }

    let result = this.state.error || await this.validate(this.value, this.state);
    if (result !== true) {
      let error = '\n' + this.symbols.pointer + ' ';

      if (typeof result === 'string') {
        error += result.trim();
      } else {
        error += 'Invalid input';
      }

      this.state.error = '\n' + this.styles.danger(error);
      this.state.submitted = false;
      await this.render();
      await this.alert();
      this.state.validating = false;
      this.state.error = void 0;
      return;
    }

    this.state.validating = false;
    await this.render();
    await this.close();

    this.value = await this.result(this.value);
    this.emit('submit', this.value);
  }

  async cancel(err) {
    this.state.cancelled = this.state.submitted = true;

    await this.render();
    await this.close();

    if (typeof this.options.onCancel === 'function') {
      await this.options.onCancel.call(this, this.name, this.value, this);
    }

    this.emit('cancel', await this.error(err));
  }

  async close() {
    this.state.closed = true;

    try {
      let sections = this.sections();
      let lines = Math.ceil(sections.prompt.length / this.width);
      if (sections.rest) {
        this.write(ansi.cursor.down(sections.rest.length));
      }
      this.write('\n'.repeat(lines));
    } catch (err) { /* do nothing */ }

    this.emit('close');
  }

  start() {
    if (!this.stop && this.options.show !== false) {
      this.stop = keypress.listen(this, this.keypress.bind(this));
      this.once('close', this.stop);
      this.emit('start', this);
    }
  }

  async skip() {
    this.skipped = this.options.skip === true;
    if (typeof this.options.skip === 'function') {
      this.skipped = await this.options.skip.call(this, this.name, this.value);
    }
    return this.skipped;
  }

  async initialize() {
    let { format, options, result } = this;

    this.format = () => format.call(this, this.value);
    this.result = () => result.call(this, this.value);

    if (typeof options.initial === 'function') {
      this.initial = await options.initial.call(this, this);
    }

    if (typeof options.onRun === 'function') {
      await options.onRun.call(this, this);
    }

    // if "options.onSubmit" is defined, we wrap the "submit" method to guarantee
    // that "onSubmit" will always called first thing inside the submit
    // method, regardless of how it's handled in inheriting prompts.
    if (typeof options.onSubmit === 'function') {
      let onSubmit = options.onSubmit.bind(this);
      let submit = this.submit.bind(this);
      delete this.options.onSubmit;
      this.submit = async() => {
        await onSubmit(this.name, this.value, this);
        return submit();
      };
    }

    await this.start();
    await this.render();
  }

  render() {
    throw new Error('expected prompt to have a custom render method');
  }

  run() {
    return new Promise(async(resolve, reject) => {
      this.once('submit', resolve);
      this.once('cancel', reject);

      if (await this.skip()) {
        this.render = () => {};
        return this.submit();
      }

      await this.initialize();
      this.emit('run');
    });
  }

  async element(name, choice, i) {
    let { options, state, symbols, timers } = this;
    let timer = timers && timers[name];
    state.timer = timer;
    let value = options[name] || state[name] || symbols[name];
    let val = choice && choice[name] != null ? choice[name] : await value;
    if (val === '') return val;

    let res = await this.resolve(val, state, choice, i);
    if (!res && choice && choice[name]) {
      return this.resolve(value, state, choice, i);
    }
    return res;
  }

  async prefix() {
    let element = await this.element('prefix') || this.symbols;
    let timer = this.timers && this.timers.prefix;
    let state = this.state;
    state.timer = timer;
    if (utils.isObject(element)) element = element[state.status] || element.pending;
    if (!utils.hasColor(element)) {
      let style = this.styles[state.status] || this.styles.pending;
      return style(element);
    }
    return element;
  }

  async message() {
    let message = await this.element('message');
    if (!utils.hasColor(message)) {
      return this.styles.strong(message);
    }
    return message;
  }

  async separator() {
    let element = await this.element('separator') || this.symbols;
    let timer = this.timers && this.timers.separator;
    let state = this.state;
    state.timer = timer;
    let value = element[state.status] || element.pending || state.separator;
    let ele = await this.resolve(value, state);
    if (utils.isObject(ele)) ele = ele[state.status] || ele.pending;
    if (!utils.hasColor(ele)) {
      return this.styles.muted(ele);
    }
    return ele;
  }

  async pointer(choice, i) {
    let val = await this.element('pointer', choice, i);

    if (typeof val === 'string' && utils.hasColor(val)) {
      return val;
    }

    if (val) {
      let styles = this.styles;
      let focused = this.index === i;
      let style = focused ? styles.primary : val => val;
      let ele = await this.resolve(val[focused ? 'on' : 'off'] || val, this.state);
      let styled = !utils.hasColor(ele) ? style(ele) : ele;
      return focused ? styled : ' '.repeat(ele.length);
    }
  }

  async indicator(choice, i) {
    let val = await this.element('indicator', choice, i);
    if (typeof val === 'string' && utils.hasColor(val)) {
      return val;
    }

    if (val) {
      let styles = this.styles;
      let enabled = choice.enabled === true;
      let style = enabled ? styles.success : styles.dark;
      let ele = val[enabled ? 'on' : 'off'] || val;
      return !utils.hasColor(ele) ? style(ele) : ele;
    }

    return '';
  }

  body() {
    return null;
  }

  footer() {
    if (this.state.status === 'pending') {
      return this.element('footer');
    }
  }

  header() {
    if (this.state.status === 'pending') {
      return this.element('header');
    }
  }

  async hint() {
    if (this.state.status === 'pending' && !this.isValue(this.state.input)) {
      let hint = await this.element('hint');
      if (!utils.hasColor(hint)) {
        return this.styles.muted(hint);
      }
      return hint;
    }
  }

  error(err) {
    return !this.state.submitted ? (err || this.state.error) : '';
  }

  format(value) {
    return value;
  }

  result(value) {
    return value;
  }

  validate(value) {
    if (this.options.required === true) {
      return this.isValue(value);
    }
    return true;
  }

  isValue(value) {
    return value != null && value !== '';
  }

  resolve(value, ...args) {
    return utils.resolve(this, value, ...args);
  }

  get base() {
    return Prompt.prototype;
  }

  get style() {
    return this.styles[this.state.status];
  }

  get height() {
    return this.options.rows || utils.height(this.stdout, 25);
  }
  get width() {
    return this.options.columns || utils.width(this.stdout, 80);
  }
  get size() {
    return { width: this.width, height: this.height };
  }

  set cursor(value) {
    this.state.cursor = value;
  }
  get cursor() {
    return this.state.cursor;
  }

  set input(value) {
    this.state.input = value;
  }
  get input() {
    return this.state.input;
  }

  set value(value) {
    this.state.value = value;
  }
  get value() {
    let { input, value } = this.state;
    let result = [value, input].find(this.isValue.bind(this));
    return this.isValue(result) ? result : this.initial;
  }

  static get prompt() {
    return options => new this(options).run();
  }
}

function setOptions(prompt) {
  let isValidKey = key => {
    return prompt[key] === void 0 || typeof prompt[key] === 'function';
  };

  let ignore = [
    'actions',
    'choices',
    'initial',
    'margin',
    'roles',
    'styles',
    'symbols',
    'theme',
    'timers',
    'value'
  ];

  let ignoreFn = [
    'body',
    'footer',
    'error',
    'header',
    'hint',
    'indicator',
    'message',
    'prefix',
    'separator',
    'skip'
  ];

  for (let key of Object.keys(prompt.options)) {
    if (ignore.includes(key)) continue;
    if (/^on[A-Z]/.test(key)) continue;
    let option = prompt.options[key];
    if (typeof option === 'function' && isValidKey(key)) {
      if (!ignoreFn.includes(key)) {
        prompt[key] = option.bind(prompt);
      }
    } else if (typeof prompt[key] !== 'function') {
      prompt[key] = option;
    }
  }
}

function margin(value) {
  if (typeof value === 'number') {
    value = [value, value, value, value];
  }
  let arr = [].concat(value || []);
  let pad = i => i % 2 === 0 ? '\n' : ' ';
  let res = [];
  for (let i = 0; i < 4; i++) {
    let char = pad(i);
    if (arr[i]) {
      res.push(char.repeat(arr[i]));
    } else {
      res.push('');
    }
  }
  return res;
}

module.exports = Prompt;


/***/ }),

/***/ 44858:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Select = __nccwpck_require__(94449);

const highlight = (input, color) => {
  const regex = input ? new RegExp(input, 'ig') : /$^/;

  return str => {
    return input ? str.replace(regex, match => color(match)) : str;
  };
};

class AutoComplete extends Select {
  constructor(options) {
    super(options);
    this.cursorShow();
  }

  moveCursor(n) {
    this.state.cursor += n;
  }

  dispatch(ch) {
    return this.append(ch);
  }

  space(ch) {
    return this.options.multiple ? super.space(ch) : this.append(ch);
  }

  append(ch) {
    let { cursor, input } = this.state;
    this.input = input.slice(0, cursor) + ch + input.slice(cursor);
    this.moveCursor(1);
    return this.complete();
  }

  delete() {
    let { cursor, input } = this.state;
    if (!input) return this.alert();
    this.input = input.slice(0, cursor - 1) + input.slice(cursor);
    this.moveCursor(-1);
    return this.complete();
  }

  deleteForward() {
    let { cursor, input } = this.state;
    if (input[cursor] === void 0) return this.alert();
    this.input = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
    return this.complete();
  }

  number(ch) {
    return this.append(ch);
  }

  async complete() {
    this.completing = true;
    this.choices = await this.suggest(this.input, this.state._choices);
    this.state.limit = void 0; // allow getter/setter to reset limit
    this.index = Math.min(Math.max(this.visible.length - 1, 0), this.index);
    await this.render();
    this.completing = false;
  }

  suggest(input = this.input, choices = this.state._choices) {
    if (typeof this.options.suggest === 'function') {
      return this.options.suggest.call(this, input, choices);
    }
    let str = input.toLowerCase();
    return choices.filter(ch => ch.message.toLowerCase().includes(str));
  }

  pointer() {
    return '';
  }

  format() {
    if (!this.focused) return this.input;

    if (this.options.multiple && this.state.submitted) {
      return this.selected.map(ch => this.styles.primary(ch.message)).join(', ');
    }

    if (this.state.submitted) {
      let value = this.value = this.input = this.focused.value;
      return this.styles.primary(value);
    }

    return this.input;
  }

  async render() {
    if (this.state.status !== 'pending') return super.render();
    const hl = this.options.highlight || this.styles.complement;

    const style = (input, color) => {
      if (!input) return input;
      if (hl.stack) return hl(input);
      return hl.call(this, input);
    };

    const color = highlight(this.input, style);
    const choices = this.choices;
    this.choices = choices.map(ch => ({ ...ch, message: color(ch.message) }));
    await super.render();
    this.choices = choices;
  }

  submit() {
    if (this.options.multiple) {
      this.value = this.selected.map(ch => ch.name);
    }
    return super.submit();
  }
}

module.exports = AutoComplete;


/***/ }),

/***/ 45389:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const AuthPrompt = __nccwpck_require__(93315);

function defaultAuthenticate(value, state) {
  if (value.username === this.options.username && value.password === this.options.password) {
    return true;
  }
  return false;
}

const factory = (authenticate = defaultAuthenticate) => {
  const choices = [
    { name: 'username', message: 'username' },
    {
      name: 'password',
      message: 'password',
      format(input) {
        if (this.options.showPassword) {
          return input;
        }
        let color = this.state.submitted ? this.styles.primary : this.styles.muted;
        return color(this.symbols.asterisk.repeat(input.length));
      }
    }
  ];

  class BasicAuthPrompt extends AuthPrompt.create(authenticate) {
    constructor(options) {
      super({ ...options, choices });
    }

    static create(authenticate) {
      return factory(authenticate);
    }
  }

  return BasicAuthPrompt;
};

module.exports = factory();


/***/ }),

/***/ 20410:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const BooleanPrompt = __nccwpck_require__(93055);

class ConfirmPrompt extends BooleanPrompt {
  constructor(options) {
    super(options);
    this.default = this.options.default || (this.initial ? '(Y/n)' : '(y/N)');
  }
}

module.exports = ConfirmPrompt;



/***/ }),

/***/ 38408:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Select = __nccwpck_require__(94449);
const Form = __nccwpck_require__(71787);
const form = Form.prototype;

class Editable extends Select {
  constructor(options) {
    super({ ...options, multiple: true });
    this.align = [this.options.align, 'left'].find(v => v != null);
    this.emptyError = '';
    this.values = {};
  }

  dispatch(char, key) {
    let choice = this.focused;
    let parent = choice.parent || {};
    if (!choice.editable && !parent.editable) {
      if (char === 'a' || char === 'i') return super[char]();
    }
    return form.dispatch.call(this, char, key);
  }

  append(char, key) {
    return form.append.call(this, char, key);
  }

  delete(char, key) {
    return form.delete.call(this, char, key);
  }

  space(char) {
    return this.focused.editable ? this.append(char) : super.space();
  }

  number(char) {
    return this.focused.editable ? this.append(char) : super.number(char);
  }

  next() {
    return this.focused.editable ? form.next.call(this) : super.next();
  }

  prev() {
    return this.focused.editable ? form.prev.call(this) : super.prev();
  }

  async indicator(choice, i) {
    let symbol = choice.indicator || '';
    let value = choice.editable ? symbol : super.indicator(choice, i);
    return await this.resolve(value, this.state, choice, i) || '';
  }

  indent(choice) {
    return choice.role === 'heading' ? '' : (choice.editable ? ' ' : '  ');
  }

  async renderChoice(choice, i) {
    choice.indent = '';
    if (choice.editable) return form.renderChoice.call(this, choice, i);
    return super.renderChoice(choice, i);
  }

  error() {
    return '';
  }

  footer() {
    return this.state.error;
  }

  async validate() {
    let result = true;

    for (let choice of this.choices) {
      if (typeof choice.validate !== 'function') {
        continue;
      }

      if (choice.role === 'heading') {
        continue;
      }

      let val = choice.parent ? this.value[choice.parent.name] : this.value;

      if (choice.editable) {
        val = choice.value === choice.name ? choice.initial || '' : choice.value;
      } else if (!this.isDisabled(choice)) {
        val = choice.enabled === true;
      }

      result = await choice.validate(val, this.state);

      if (result !== true) {
        break;
      }
    }

    if (result !== true) {
      this.state.error = typeof result === 'string' ? result : 'Invalid Input';
    }

    return result;
  }

  submit() {
    if (this.focused.newChoice === true) return super.submit();
    if (this.choices.some(ch => ch.newChoice)) {
      return this.alert();
    }

    this.value = {};

    for (let choice of this.choices) {
      let val = choice.parent ? this.value[choice.parent.name] : this.value;

      if (choice.role === 'heading') {
        this.value[choice.name] = {};
        continue;
      }

      if (choice.editable) {
        val[choice.name] = choice.value === choice.name
          ? (choice.initial || '')
          : choice.value;

      } else if (!this.isDisabled(choice)) {
        val[choice.name] = choice.enabled === true;
      }
    }

    return this.base.submit.call(this);
  }
}

module.exports = Editable;


/***/ }),

/***/ 71787:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stripAnsi = __nccwpck_require__(45591);
const SelectPrompt = __nccwpck_require__(94449);
const placeholder = __nccwpck_require__(79690);

class FormPrompt extends SelectPrompt {
  constructor(options) {
    super({ ...options, multiple: true });
    this.type = 'form';
    this.initial = this.options.initial;
    this.align = [this.options.align, 'right'].find(v => v != null);
    this.emptyError = '';
    this.values = {};
  }

  async reset(first) {
    await super.reset();
    if (first === true) this._index = this.index;
    this.index = this._index;
    this.values = {};
    this.choices.forEach(choice => choice.reset && choice.reset());
    return this.render();
  }

  dispatch(char) {
    return !!char && this.append(char);
  }

  append(char) {
    let choice = this.focused;
    if (!choice) return this.alert();
    let { cursor, input } = choice;
    choice.value = choice.input = input.slice(0, cursor) + char + input.slice(cursor);
    choice.cursor++;
    return this.render();
  }

  delete() {
    let choice = this.focused;
    if (!choice || choice.cursor <= 0) return this.alert();
    let { cursor, input } = choice;
    choice.value = choice.input = input.slice(0, cursor - 1) + input.slice(cursor);
    choice.cursor--;
    return this.render();
  }

  deleteForward() {
    let choice = this.focused;
    if (!choice) return this.alert();
    let { cursor, input } = choice;
    if (input[cursor] === void 0) return this.alert();
    let str = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
    choice.value = choice.input = str;
    return this.render();
  }

  right() {
    let choice = this.focused;
    if (!choice) return this.alert();
    if (choice.cursor >= choice.input.length) return this.alert();
    choice.cursor++;
    return this.render();
  }

  left() {
    let choice = this.focused;
    if (!choice) return this.alert();
    if (choice.cursor <= 0) return this.alert();
    choice.cursor--;
    return this.render();
  }

  space(ch, key) {
    return this.dispatch(ch, key);
  }

  number(ch, key) {
    return this.dispatch(ch, key);
  }

  next() {
    let ch = this.focused;
    if (!ch) return this.alert();
    let { initial, input } = ch;
    if (initial && initial.startsWith(input) && input !== initial) {
      ch.value = ch.input = initial;
      ch.cursor = ch.value.length;
      return this.render();
    }
    return super.next();
  }

  prev() {
    let ch = this.focused;
    if (!ch) return this.alert();
    if (ch.cursor === 0) return super.prev();
    ch.value = ch.input = '';
    ch.cursor = 0;
    return this.render();
  }

  separator() {
    return '';
  }

  format(value) {
    return !this.state.submitted ? super.format(value) : '';
  }

  pointer() {
    return '';
  }

  indicator(choice) {
    return choice.input ? '⦿' : '⊙';
  }

  async choiceSeparator(choice, i) {
    let sep = await this.resolve(choice.separator, this.state, choice, i) || ':';
    return sep ? ' ' + this.styles.disabled(sep) : '';
  }

  async renderChoice(choice, i) {
    await this.onChoice(choice, i);

    let { state, styles } = this;
    let { cursor, initial = '', name, input = '' } = choice;
    let { muted, submitted, primary, danger } = styles;

    let focused = this.index === i;
    let validate = choice.validate || (() => true);
    let sep = await this.choiceSeparator(choice, i);
    let msg = choice.message;

    if (this.align === 'right') msg = msg.padStart(this.longest + 1, ' ');
    if (this.align === 'left') msg = msg.padEnd(this.longest + 1, ' ');

    // re-populate the form values (answers) object
    let value = this.values[name] = (input || initial);
    let color = input ? 'success' : 'dark';

    if ((await validate.call(choice, value, this.state)) !== true) {
      color = 'danger';
    }

    let style = styles[color];
    let indicator = style(await this.indicator(choice, i)) + (choice.pad || '');

    let indent = this.indent(choice);
    let line = () => [indent, indicator, msg + sep, input ].filter(Boolean).join(' ');

    if (state.submitted) {
      msg = stripAnsi(msg);
      input = submitted(input);

      return line();
    }

    if (choice.format) {
      input = await choice.format.call(this, input, choice, i);
    } else {
      let color = this.styles.muted;
      let options = { input, initial, pos: cursor, showCursor: focused, color };
      input = placeholder(this, options);
    }

    if (!this.isValue(input)) {
      input = this.styles.muted(this.symbols.ellipsis);
    }

    if (choice.result) {
      this.values[name] = await choice.result.call(this, value, choice, i);
    }

    if (focused) {
      msg = primary(msg);
    }

    if (choice.error) {
      input += (input ? ' ' : '') + danger(choice.error.trim());
    } else if (choice.hint) {
      input += (input ? ' ' : '') + muted(choice.hint.trim());
    }

    return line();
  }

  async submit() {
    this.value = this.values;
    return super.base.submit.call(this);
  }
}

module.exports = FormPrompt;


/***/ }),

/***/ 76048:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const utils = __nccwpck_require__(28527);

const define = (key, fn) => {
  utils.defineExport(exports, key, fn);
  utils.defineExport(exports, key.toLowerCase(), fn);
};

define('AutoComplete', () => __nccwpck_require__(44858));
define('BasicAuth', () => __nccwpck_require__(45389));
define('Confirm', () => __nccwpck_require__(20410));
define('Editable', () => __nccwpck_require__(38408));
define('Form', () => __nccwpck_require__(71787));
define('Input', () => __nccwpck_require__(50338));
define('Invisible', () => __nccwpck_require__(1289));
define('List', () => __nccwpck_require__(1996));
define('MultiSelect', () => __nccwpck_require__(22350));
define('Numeral', () => __nccwpck_require__(43542));
define('Password', () => __nccwpck_require__(82824));
define('Scale', () => __nccwpck_require__(23513));
define('Select', () => __nccwpck_require__(94449));
define('Snippet', () => __nccwpck_require__(13625));
define('Sort', () => __nccwpck_require__(65873));
define('Survey', () => __nccwpck_require__(65610));
define('Text', () => __nccwpck_require__(8355));
define('Toggle', () => __nccwpck_require__(11394));
define('Quiz', () => __nccwpck_require__(13981));


/***/ }),

/***/ 50338:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Prompt = __nccwpck_require__(91401);
const completer = __nccwpck_require__(74130);

class Input extends Prompt {
  constructor(options) {
    super(options);
    let history = this.options.history;
    if (history && history.store) {
      let initial = history.values || this.initial;
      this.autosave = !!history.autosave;
      this.store = history.store;
      this.data = this.store.get('values') || { past: [], present: initial };
      this.initial = this.data.present || this.data.past[this.data.past.length - 1];
    }
  }

  completion(action) {
    if (!this.store) return this.alert();
    this.data = completer(action, this.data, this.input);
    if (!this.data.present) return this.alert();
    this.input = this.data.present;
    this.cursor = this.input.length;
    return this.render();
  }

  altUp() {
    return this.completion('prev');
  }

  altDown() {
    return this.completion('next');
  }

  prev() {
    this.save();
    return super.prev();
  }

  save() {
    if (!this.store) return;
    this.data = completer('save', this.data, this.input);
    this.store.set('values', this.data);
  }

  submit() {
    if (this.store && this.autosave === true) {
      this.save();
    }
    return super.submit();
  }
}

module.exports = Input;


/***/ }),

/***/ 1289:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const StringPrompt = __nccwpck_require__(91401);

class InvisiblePrompt extends StringPrompt {
  format() {
    return '';
  }
}

module.exports = InvisiblePrompt;


/***/ }),

/***/ 1996:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const StringPrompt = __nccwpck_require__(91401);

class ListPrompt extends StringPrompt {
  constructor(options = {}) {
    super(options);
    this.sep = this.options.separator || /, */;
    this.initial = options.initial || '';
  }

  split(input = this.value) {
    return input ? String(input).split(this.sep) : [];
  }

  format() {
    let style = this.state.submitted ? this.styles.primary : val => val;
    return this.list.map(style).join(', ');
  }

  async submit(value) {
    let result = this.state.error || await this.validate(this.list, this.state);
    if (result !== true) {
      this.state.error = result;
      return super.submit();
    }
    this.value = this.list;
    return super.submit();
  }

  get list() {
    return this.split();
  }
}

module.exports = ListPrompt;


/***/ }),

/***/ 22350:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Select = __nccwpck_require__(94449);

class MultiSelect extends Select {
  constructor(options) {
    super({ ...options, multiple: true });
  }
}

module.exports = MultiSelect;


/***/ }),

/***/ 43542:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(47572);


/***/ }),

/***/ 82824:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const StringPrompt = __nccwpck_require__(91401);

class PasswordPrompt extends StringPrompt {
  constructor(options) {
    super(options);
    this.cursorShow();
  }

  format(input = this.input) {
    if (!this.keypressed) return '';
    let color = this.state.submitted ? this.styles.primary : this.styles.muted;
    return color(this.symbols.asterisk.repeat(input.length));
  }
}

module.exports = PasswordPrompt;


/***/ }),

/***/ 13981:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const SelectPrompt = __nccwpck_require__(94449);

class Quiz extends SelectPrompt {
  constructor(options) {
    super(options);
    if (typeof this.options.correctChoice !== 'number' || this.options.correctChoice < 0) {
      throw new Error('Please specify the index of the correct answer from the list of choices');
    }
  }

  async toChoices(value, parent) {
    let choices = await super.toChoices(value, parent);
    if (choices.length < 2) {
      throw new Error('Please give at least two choices to the user');
    }
    if (this.options.correctChoice > choices.length) {
      throw new Error('Please specify the index of the correct answer from the list of choices');
    }
    return choices;
  }

  check(state) {
    return state.index === this.options.correctChoice;
  }

  async result(selected) {
    return {
      selectedAnswer: selected,
      correctAnswer: this.options.choices[this.options.correctChoice].value,
      correct: await this.check(this.state)
    };
  }
}

module.exports = Quiz;


/***/ }),

/***/ 23513:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stripAnsi = __nccwpck_require__(45591);
const ArrayPrompt = __nccwpck_require__(47633);
const utils = __nccwpck_require__(28527);

class LikertScale extends ArrayPrompt {
  constructor(options = {}) {
    super(options);
    this.widths = [].concat(options.messageWidth || 50);
    this.align = [].concat(options.align || 'left');
    this.linebreak = options.linebreak || false;
    this.edgeLength = options.edgeLength || 3;
    this.newline = options.newline || '\n   ';
    let start = options.startNumber || 1;
    if (typeof this.scale === 'number') {
      this.scaleKey = false;
      this.scale = Array(this.scale).fill(0).map((v, i) => ({ name: i + start }));
    }
  }

  async reset() {
    this.tableized = false;
    await super.reset();
    return this.render();
  }

  tableize() {
    if (this.tableized === true) return;
    this.tableized = true;
    let longest = 0;

    for (let ch of this.choices) {
      longest = Math.max(longest, ch.message.length);
      ch.scaleIndex = ch.initial || 2;
      ch.scale = [];

      for (let i = 0; i < this.scale.length; i++) {
        ch.scale.push({ index: i });
      }
    }
    this.widths[0] = Math.min(this.widths[0], longest + 3);
  }

  async dispatch(s, key) {
    if (this.multiple) {
      return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
    }
    this.alert();
  }

  heading(msg, item, i) {
    return this.styles.strong(msg);
  }

  separator() {
    return this.styles.muted(this.symbols.ellipsis);
  }

  right() {
    let choice = this.focused;
    if (choice.scaleIndex >= this.scale.length - 1) return this.alert();
    choice.scaleIndex++;
    return this.render();
  }

  left() {
    let choice = this.focused;
    if (choice.scaleIndex <= 0) return this.alert();
    choice.scaleIndex--;
    return this.render();
  }

  indent() {
    return '';
  }

  format() {
    if (this.state.submitted) {
      let values = this.choices.map(ch => this.styles.info(ch.index));
      return values.join(', ');
    }
    return '';
  }

  pointer() {
    return '';
  }

  /**
   * Render the scale "Key". Something like:
   * @return {String}
   */

  renderScaleKey() {
    if (this.scaleKey === false) return '';
    if (this.state.submitted) return '';
    let scale = this.scale.map(item => `   ${item.name} - ${item.message}`);
    let key = ['', ...scale].map(item => this.styles.muted(item));
    return key.join('\n');
  }

  /**
   * Render the heading row for the scale.
   * @return {String}
   */

  renderScaleHeading(max) {
    let keys = this.scale.map(ele => ele.name);
    if (typeof this.options.renderScaleHeading === 'function') {
      keys = this.options.renderScaleHeading.call(this, max);
    }
    let diff = this.scaleLength - keys.join('').length;
    let spacing = Math.round(diff / (keys.length - 1));
    let names = keys.map(key => this.styles.strong(key));
    let headings = names.join(' '.repeat(spacing));
    let padding = ' '.repeat(this.widths[0]);
    return this.margin[3] + padding + this.margin[1] + headings;
  }

  /**
   * Render a scale indicator => ◯ or ◉ by default
   */

  scaleIndicator(choice, item, i) {
    if (typeof this.options.scaleIndicator === 'function') {
      return this.options.scaleIndicator.call(this, choice, item, i);
    }
    let enabled = choice.scaleIndex === item.index;
    if (item.disabled) return this.styles.hint(this.symbols.radio.disabled);
    if (enabled) return this.styles.success(this.symbols.radio.on);
    return this.symbols.radio.off;
  }

  /**
   * Render the actual scale => ◯────◯────◉────◯────◯
   */

  renderScale(choice, i) {
    let scale = choice.scale.map(item => this.scaleIndicator(choice, item, i));
    let padding = this.term === 'Hyper' ? '' : ' ';
    return scale.join(padding + this.symbols.line.repeat(this.edgeLength));
  }

  /**
   * Render a choice, including scale =>
   *   "The website is easy to navigate. ◯───◯───◉───◯───◯"
   */

  async renderChoice(choice, i) {
    await this.onChoice(choice, i);

    let focused = this.index === i;
    let pointer = await this.pointer(choice, i);
    let hint = await choice.hint;

    if (hint && !utils.hasColor(hint)) {
      hint = this.styles.muted(hint);
    }

    let pad = str => this.margin[3] + str.replace(/\s+$/, '').padEnd(this.widths[0], ' ');
    let newline = this.newline;
    let ind = this.indent(choice);
    let message = await this.resolve(choice.message, this.state, choice, i);
    let scale = await this.renderScale(choice, i);
    let margin = this.margin[1] + this.margin[3];
    this.scaleLength = stripAnsi(scale).length;
    this.widths[0] = Math.min(this.widths[0], this.width - this.scaleLength - margin.length);
    let msg = utils.wordWrap(message, { width: this.widths[0], newline });
    let lines = msg.split('\n').map(line => pad(line) + this.margin[1]);

    if (focused) {
      scale = this.styles.info(scale);
      lines = lines.map(line => this.styles.info(line));
    }

    lines[0] += scale;

    if (this.linebreak) lines.push('');
    return [ind + pointer, lines.join('\n')].filter(Boolean);
  }

  async renderChoices() {
    if (this.state.submitted) return '';
    this.tableize();
    let choices = this.visible.map(async(ch, i) => await this.renderChoice(ch, i));
    let visible = await Promise.all(choices);
    let heading = await this.renderScaleHeading();
    return this.margin[0] + [heading, ...visible.map(v => v.join(' '))].join('\n');
  }

  async render() {
    let { submitted, size } = this.state;

    let prefix = await this.prefix();
    let separator = await this.separator();
    let message = await this.message();

    let prompt = '';
    if (this.options.promptLine !== false) {
      prompt = [prefix, message, separator, ''].join(' ');
      this.state.prompt = prompt;
    }

    let header = await this.header();
    let output = await this.format();
    let key = await this.renderScaleKey();
    let help = await this.error() || await this.hint();
    let body = await this.renderChoices();
    let footer = await this.footer();
    let err = this.emptyError;

    if (output) prompt += output;
    if (help && !prompt.includes(help)) prompt += ' ' + help;

    if (submitted && !output && !body.trim() && this.multiple && err != null) {
      prompt += this.styles.danger(err);
    }

    this.clear(size);
    this.write([header, prompt, key, body, footer].filter(Boolean).join('\n'));
    if (!this.state.submitted) {
      this.write(this.margin[2]);
    }
    this.restore();
  }

  submit() {
    this.value = {};
    for (let choice of this.choices) {
      this.value[choice.name] = choice.scaleIndex;
    }
    return this.base.submit.call(this);
  }
}

module.exports = LikertScale;


/***/ }),

/***/ 94449:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const ArrayPrompt = __nccwpck_require__(47633);
const utils = __nccwpck_require__(28527);

class SelectPrompt extends ArrayPrompt {
  constructor(options) {
    super(options);
    this.emptyError = this.options.emptyError || 'No items were selected';
  }

  async dispatch(s, key) {
    if (this.multiple) {
      return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
    }
    this.alert();
  }

  separator() {
    if (this.options.separator) return super.separator();
    let sep = this.styles.muted(this.symbols.ellipsis);
    return this.state.submitted ? super.separator() : sep;
  }

  pointer(choice, i) {
    return (!this.multiple || this.options.pointer) ? super.pointer(choice, i) : '';
  }

  indicator(choice, i) {
    return this.multiple ? super.indicator(choice, i) : '';
  }

  choiceMessage(choice, i) {
    let message = this.resolve(choice.message, this.state, choice, i);
    if (choice.role === 'heading' && !utils.hasColor(message)) {
      message = this.styles.strong(message);
    }
    return this.resolve(message, this.state, choice, i);
  }

  choiceSeparator() {
    return ':';
  }

  async renderChoice(choice, i) {
    await this.onChoice(choice, i);

    let focused = this.index === i;
    let pointer = await this.pointer(choice, i);
    let check = await this.indicator(choice, i) + (choice.pad || '');
    let hint = await this.resolve(choice.hint, this.state, choice, i);

    if (hint && !utils.hasColor(hint)) {
      hint = this.styles.muted(hint);
    }

    let ind = this.indent(choice);
    let msg = await this.choiceMessage(choice, i);
    let line = () => [this.margin[3], ind + pointer + check, msg, this.margin[1], hint].filter(Boolean).join(' ');

    if (choice.role === 'heading') {
      return line();
    }

    if (choice.disabled) {
      if (!utils.hasColor(msg)) {
        msg = this.styles.disabled(msg);
      }
      return line();
    }

    if (focused) {
      msg = this.styles.em(msg);
    }

    return line();
  }

  async renderChoices() {
    if (this.state.loading === 'choices') {
      return this.styles.warning('Loading choices');
    }

    if (this.state.submitted) return '';
    let choices = this.visible.map(async(ch, i) => await this.renderChoice(ch, i));
    let visible = await Promise.all(choices);
    if (!visible.length) visible.push(this.styles.danger('No matching choices'));
    let result = this.margin[0] + visible.join('\n');
    let header;

    if (this.options.choicesHeader) {
      header = await this.resolve(this.options.choicesHeader, this.state);
    }

    return [header, result].filter(Boolean).join('\n');
  }

  format() {
    if (!this.state.submitted || this.state.cancelled) return '';
    if (Array.isArray(this.selected)) {
      return this.selected.map(choice => this.styles.primary(choice.name)).join(', ');
    }
    return this.styles.primary(this.selected.name);
  }

  async render() {
    let { submitted, size } = this.state;

    let prompt = '';
    let header = await this.header();
    let prefix = await this.prefix();
    let separator = await this.separator();
    let message = await this.message();

    if (this.options.promptLine !== false) {
      prompt = [prefix, message, separator, ''].join(' ');
      this.state.prompt = prompt;
    }

    let output = await this.format();
    let help = (await this.error()) || (await this.hint());
    let body = await this.renderChoices();
    let footer = await this.footer();

    if (output) prompt += output;
    if (help && !prompt.includes(help)) prompt += ' ' + help;

    if (submitted && !output && !body.trim() && this.multiple && this.emptyError != null) {
      prompt += this.styles.danger(this.emptyError);
    }

    this.clear(size);
    this.write([header, prompt, body, footer].filter(Boolean).join('\n'));
    this.write(this.margin[2]);
    this.restore();
  }
}

module.exports = SelectPrompt;


/***/ }),

/***/ 13625:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stripAnsi = __nccwpck_require__(45591);
const interpolate = __nccwpck_require__(52299);
const Prompt = __nccwpck_require__(7072);

class SnippetPrompt extends Prompt {
  constructor(options) {
    super(options);
    this.cursorHide();
    this.reset(true);
  }

  async initialize() {
    this.interpolate = await interpolate(this);
    await super.initialize();
  }

  async reset(first) {
    this.state.keys = [];
    this.state.invalid = new Map();
    this.state.missing = new Set();
    this.state.completed = 0;
    this.state.values = {};

    if (first !== true) {
      await this.initialize();
      await this.render();
    }
  }

  moveCursor(n) {
    let item = this.getItem();
    this.cursor += n;
    item.cursor += n;
  }

  dispatch(ch, key) {
    if (!key.code && !key.ctrl && ch != null && this.getItem()) {
      this.append(ch, key);
      return;
    }
    this.alert();
  }

  append(ch, key) {
    let item = this.getItem();
    let prefix = item.input.slice(0, this.cursor);
    let suffix = item.input.slice(this.cursor);
    this.input = item.input = `${prefix}${ch}${suffix}`;
    this.moveCursor(1);
    this.render();
  }

  delete() {
    let item = this.getItem();
    if (this.cursor <= 0 || !item.input) return this.alert();
    let suffix = item.input.slice(this.cursor);
    let prefix = item.input.slice(0, this.cursor - 1);
    this.input = item.input = `${prefix}${suffix}`;
    this.moveCursor(-1);
    this.render();
  }

  increment(i) {
    return i >= this.state.keys.length - 1 ? 0 : i + 1;
  }

  decrement(i) {
    return i <= 0 ? this.state.keys.length - 1 : i - 1;
  }

  first() {
    this.state.index = 0;
    this.render();
  }

  last() {
    this.state.index = this.state.keys.length - 1;
    this.render();
  }

  right() {
    if (this.cursor >= this.input.length) return this.alert();
    this.moveCursor(1);
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.alert();
    this.moveCursor(-1);
    this.render();
  }

  prev() {
    this.state.index = this.decrement(this.state.index);
    this.getItem();
    this.render();
  }

  next() {
    this.state.index = this.increment(this.state.index);
    this.getItem();
    this.render();
  }

  up() {
    this.prev();
  }

  down() {
    this.next();
  }

  format(value) {
    let color = this.state.completed < 100 ? this.styles.warning : this.styles.success;
    if (this.state.submitted === true && this.state.completed !== 100) {
      color = this.styles.danger;
    }
    return color(`${this.state.completed}% completed`);
  }

  async render() {
    let { index, keys = [], submitted, size } = this.state;

    let newline = [this.options.newline, '\n'].find(v => v != null);
    let prefix = await this.prefix();
    let separator = await this.separator();
    let message = await this.message();

    let prompt = [prefix, message, separator].filter(Boolean).join(' ');
    this.state.prompt = prompt;

    let header = await this.header();
    let error = (await this.error()) || '';
    let hint = (await this.hint()) || '';
    let body = submitted ? '' : await this.interpolate(this.state);

    let key = this.state.key = keys[index] || '';
    let input = await this.format(key);
    let footer = await this.footer();
    if (input) prompt += ' ' + input;
    if (hint && !input && this.state.completed === 0) prompt += ' ' + hint;

    this.clear(size);
    let lines = [header, prompt, body, footer, error.trim()];
    this.write(lines.filter(Boolean).join(newline));
    this.restore();
  }

  getItem(name) {
    let { items, keys, index } = this.state;
    let item = items.find(ch => ch.name === keys[index]);
    if (item && item.input != null) {
      this.input = item.input;
      this.cursor = item.cursor;
    }
    return item;
  }

  async submit() {
    if (typeof this.interpolate !== 'function') await this.initialize();
    await this.interpolate(this.state, true);

    let { invalid, missing, output, values } = this.state;
    if (invalid.size) {
      let err = '';
      for (let [key, value] of invalid) err += `Invalid ${key}: ${value}\n`;
      this.state.error = err;
      return super.submit();
    }

    if (missing.size) {
      this.state.error = 'Required: ' + [...missing.keys()].join(', ');
      return super.submit();
    }

    let lines = stripAnsi(output).split('\n');
    let result = lines.map(v => v.slice(1)).join('\n');
    this.value = { values, result };
    return super.submit();
  }
}

module.exports = SnippetPrompt;


/***/ }),

/***/ 65873:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const hint = '(Use <shift>+<up/down> to sort)';
const Prompt = __nccwpck_require__(94449);

class Sort extends Prompt {
  constructor(options) {
    super({ ...options, reorder: false, sort: true, multiple: true });
    this.state.hint = [this.options.hint, hint].find(this.isValue.bind(this));
  }

  indicator() {
    return '';
  }

  async renderChoice(choice, i) {
    let str = await super.renderChoice(choice, i);
    let sym = this.symbols.identicalTo + ' ';
    let pre = (this.index === i && this.sorting) ? this.styles.muted(sym) : '  ';
    if (this.options.drag === false) pre = '';
    if (this.options.numbered === true) {
      return pre + `${i + 1} - ` + str;
    }
    return pre + str;
  }

  get selected() {
    return this.choices;
  }

  submit() {
    this.value = this.choices.map(choice => choice.value);
    return super.submit();
  }
}

module.exports = Sort;


/***/ }),

/***/ 65610:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const ArrayPrompt = __nccwpck_require__(47633);

class Survey extends ArrayPrompt {
  constructor(options = {}) {
    super(options);
    this.emptyError = options.emptyError || 'No items were selected';
    this.term = process.env.TERM_PROGRAM;

    if (!this.options.header) {
      let header = ['', '4 - Strongly Agree', '3 - Agree', '2 - Neutral', '1 - Disagree', '0 - Strongly Disagree', ''];
      header = header.map(ele => this.styles.muted(ele));
      this.state.header = header.join('\n   ');
    }
  }

  async toChoices(...args) {
    if (this.createdScales) return false;
    this.createdScales = true;
    let choices = await super.toChoices(...args);
    for (let choice of choices) {
      choice.scale = createScale(5, this.options);
      choice.scaleIdx = 2;
    }
    return choices;
  }

  dispatch() {
    this.alert();
  }

  space() {
    let choice = this.focused;
    let ele = choice.scale[choice.scaleIdx];
    let selected = ele.selected;
    choice.scale.forEach(e => (e.selected = false));
    ele.selected = !selected;
    return this.render();
  }

  indicator() {
    return '';
  }

  pointer() {
    return '';
  }

  separator() {
    return this.styles.muted(this.symbols.ellipsis);
  }

  right() {
    let choice = this.focused;
    if (choice.scaleIdx >= choice.scale.length - 1) return this.alert();
    choice.scaleIdx++;
    return this.render();
  }

  left() {
    let choice = this.focused;
    if (choice.scaleIdx <= 0) return this.alert();
    choice.scaleIdx--;
    return this.render();
  }

  indent() {
    return '   ';
  }

  async renderChoice(item, i) {
    await this.onChoice(item, i);
    let focused = this.index === i;
    let isHyper = this.term === 'Hyper';
    let n = !isHyper ? 8 : 9;
    let s = !isHyper ? ' ' : '';
    let ln = this.symbols.line.repeat(n);
    let sp = ' '.repeat(n + (isHyper ? 0 : 1));
    let dot = enabled => (enabled ? this.styles.success('◉') : '◯') + s;

    let num = i + 1 + '.';
    let color = focused ? this.styles.heading : this.styles.noop;
    let msg = await this.resolve(item.message, this.state, item, i);
    let indent = this.indent(item);
    let scale = indent + item.scale.map((e, i) => dot(i === item.scaleIdx)).join(ln);
    let val = i => i === item.scaleIdx ? color(i) : i;
    let next = indent + item.scale.map((e, i) => val(i)).join(sp);

    let line = () => [num, msg].filter(Boolean).join(' ');
    let lines = () => [line(), scale, next, ' '].filter(Boolean).join('\n');

    if (focused) {
      scale = this.styles.cyan(scale);
      next = this.styles.cyan(next);
    }

    return lines();
  }

  async renderChoices() {
    if (this.state.submitted) return '';
    let choices = this.visible.map(async(ch, i) => await this.renderChoice(ch, i));
    let visible = await Promise.all(choices);
    if (!visible.length) visible.push(this.styles.danger('No matching choices'));
    return visible.join('\n');
  }

  format() {
    if (this.state.submitted) {
      let values = this.choices.map(ch => this.styles.info(ch.scaleIdx));
      return values.join(', ');
    }
    return '';
  }

  async render() {
    let { submitted, size } = this.state;

    let prefix = await this.prefix();
    let separator = await this.separator();
    let message = await this.message();

    let prompt = [prefix, message, separator].filter(Boolean).join(' ');
    this.state.prompt = prompt;

    let header = await this.header();
    let output = await this.format();
    let help = await this.error() || await this.hint();
    let body = await this.renderChoices();
    let footer = await this.footer();

    if (output || !help) prompt += ' ' + output;
    if (help && !prompt.includes(help)) prompt += ' ' + help;

    if (submitted && !output && !body && this.multiple && this.type !== 'form') {
      prompt += this.styles.danger(this.emptyError);
    }

    this.clear(size);
    this.write([prompt, header, body, footer].filter(Boolean).join('\n'));
    this.restore();
  }

  submit() {
    this.value = {};
    for (let choice of this.choices) {
      this.value[choice.name] = choice.scaleIdx;
    }
    return this.base.submit.call(this);
  }
}

function createScale(n, options = {}) {
  if (Array.isArray(options.scale)) {
    return options.scale.map(ele => ({ ...ele }));
  }
  let scale = [];
  for (let i = 1; i < n + 1; i++) scale.push({ i, selected: false });
  return scale;
}

module.exports = Survey;


/***/ }),

/***/ 8355:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(50338);


/***/ }),

/***/ 11394:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const BooleanPrompt = __nccwpck_require__(93055);

class TogglePrompt extends BooleanPrompt {
  async initialize() {
    await super.initialize();
    this.value = this.initial = this.resolve(this.options.initial);
    this.disabled = this.options.disabled || 'no';
    this.enabled = this.options.enabled || 'yes';
    await this.render();
  }

  reset() {
    this.value = this.initial;
    this.render();
  }

  delete() {
    this.alert();
  }

  toggle() {
    this.value = !this.value;
    this.render();
  }

  enable() {
    if (this.value === true) return this.alert();
    this.value = true;
    this.render();
  }
  disable() {
    if (this.value === false) return this.alert();
    this.value = false;
    this.render();
  }

  up() {
    this.toggle();
  }
  down() {
    this.toggle();
  }
  right() {
    this.toggle();
  }
  left() {
    this.toggle();
  }
  next() {
    this.toggle();
  }
  prev() {
    this.toggle();
  }

  dispatch(ch = '', key) {
    switch (ch.toLowerCase()) {
      case ' ':
        return this.toggle();
      case '1':
      case 'y':
      case 't':
        return this.enable();
      case '0':
      case 'n':
      case 'f':
        return this.disable();
      default: {
        return this.alert();
      }
    }
  }

  format() {
    let active = str => this.styles.primary.underline(str);
    let value = [
      this.value ? this.disabled : active(this.disabled),
      this.value ? active(this.enabled) : this.enabled
    ];
    return value.join(this.styles.muted(' / '));
  }

  async render() {
    let { size } = this.state;

    let header = await this.header();
    let prefix = await this.prefix();
    let separator = await this.separator();
    let message = await this.message();

    let output = await this.format();
    let help = (await this.error()) || (await this.hint());
    let footer = await this.footer();

    let prompt = [prefix, message, separator, output].join(' ');
    this.state.prompt = prompt;

    if (help && !prompt.includes(help)) prompt += ' ' + help;

    this.clear(size);
    this.write([header, prompt, footer].filter(Boolean).join('\n'));
    this.write(this.margin[2]);
    this.restore();
  }
}

module.exports = TogglePrompt;


/***/ }),

/***/ 25404:
/***/ ((module) => {

"use strict";


module.exports = class Queue {
  _queue = [];
  _executing = false;
  _jobRunner = null;

  constructor(jobRunner) {
    this._jobRunner = jobRunner;
  }

  enqueue = (...args) => {
    this._queue.push(args);
    this._dequeue();
  };

  destroy() {
    this._queue.length = 0;
    this._jobRunner = null;
  }

  _dequeue() {
    if (this._executing || !this._queue.length) return;
    this._executing = true;

    this._jobRunner(...this._queue.shift());

    setTimeout(() => {
      this._executing = false;
      this._dequeue();
    });
  }
};


/***/ }),

/***/ 41487:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const utils = __nccwpck_require__(28527);
const roles = {
  default(prompt, choice) {
    return choice;
  },
  checkbox(prompt, choice) {
    throw new Error('checkbox role is not implemented yet');
  },
  editable(prompt, choice) {
    throw new Error('editable role is not implemented yet');
  },
  expandable(prompt, choice) {
    throw new Error('expandable role is not implemented yet');
  },
  heading(prompt, choice) {
    choice.disabled = '';
    choice.indicator = [choice.indicator, ' '].find(v => v != null);
    choice.message = choice.message || '';
    return choice;
  },
  input(prompt, choice) {
    throw new Error('input role is not implemented yet');
  },
  option(prompt, choice) {
    return roles.default(prompt, choice);
  },
  radio(prompt, choice) {
    throw new Error('radio role is not implemented yet');
  },
  separator(prompt, choice) {
    choice.disabled = '';
    choice.indicator = [choice.indicator, ' '].find(v => v != null);
    choice.message = choice.message || prompt.symbols.line.repeat(5);
    return choice;
  },
  spacer(prompt, choice) {
    return choice;
  }
};

module.exports = (name, options = {}) => {
  let role = utils.merge({}, roles, options.roles);
  return role[name] || role.default;
};


/***/ }),

/***/ 21686:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { define, width } = __nccwpck_require__(28527);

class State {
  constructor(prompt) {
    let options = prompt.options;
    define(this, '_prompt', prompt);
    this.type = prompt.type;
    this.name = prompt.name;
    this.message = '';
    this.header = '';
    this.footer = '';
    this.error = '';
    this.hint = '';
    this.input = '';
    this.cursor = 0;
    this.index = 0;
    this.lines = 0;
    this.tick = 0;
    this.prompt = '';
    this.buffer = '';
    this.width = width(options.stdout || process.stdout);
    Object.assign(this, options);
    this.name = this.name || this.message;
    this.message = this.message || this.name;
    this.symbols = prompt.symbols;
    this.styles = prompt.styles;
    this.required = new Set();
    this.cancelled = false;
    this.submitted = false;
  }

  clone() {
    let state = { ...this };
    state.status = this.status;
    state.buffer = Buffer.from(state.buffer);
    delete state.clone;
    return state;
  }

  set color(val) {
    this._color = val;
  }
  get color() {
    let styles = this.prompt.styles;
    if (this.cancelled) return styles.cancelled;
    if (this.submitted) return styles.submitted;
    let color = this._color || styles[this.status];
    return typeof color === 'function' ? color : styles.pending;
  }

  set loading(value) {
    this._loading = value;
  }
  get loading() {
    if (typeof this._loading === 'boolean') return this._loading;
    if (this.loadingChoices) return 'choices';
    return false;
  }

  get status() {
    if (this.cancelled) return 'cancelled';
    if (this.submitted) return 'submitted';
    return 'pending';
  }
}

module.exports = State;


/***/ }),

/***/ 43751:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const utils = __nccwpck_require__(28527);
const colors = __nccwpck_require__(99151);

const styles = {
  default: colors.noop,
  noop: colors.noop,

  /**
   * Modifiers
   */

  set inverse(custom) {
    this._inverse = custom;
  },
  get inverse() {
    return this._inverse || utils.inverse(this.primary);
  },

  set complement(custom) {
    this._complement = custom;
  },
  get complement() {
    return this._complement || utils.complement(this.primary);
  },

  /**
   * Main color
   */

  primary: colors.cyan,

  /**
   * Main palette
   */

  success: colors.green,
  danger: colors.magenta,
  strong: colors.bold,
  warning: colors.yellow,
  muted: colors.dim,
  disabled: colors.gray,
  dark: colors.dim.gray,
  underline: colors.underline,

  set info(custom) {
    this._info = custom;
  },
  get info() {
    return this._info || this.primary;
  },

  set em(custom) {
    this._em = custom;
  },
  get em() {
    return this._em || this.primary.underline;
  },

  set heading(custom) {
    this._heading = custom;
  },
  get heading() {
    return this._heading || this.muted.underline;
  },

  /**
   * Statuses
   */

  set pending(custom) {
    this._pending = custom;
  },
  get pending() {
    return this._pending || this.primary;
  },

  set submitted(custom) {
    this._submitted = custom;
  },
  get submitted() {
    return this._submitted || this.success;
  },

  set cancelled(custom) {
    this._cancelled = custom;
  },
  get cancelled() {
    return this._cancelled || this.danger;
  },

  /**
   * Special styling
   */

  set typing(custom) {
    this._typing = custom;
  },
  get typing() {
    return this._typing || this.dim;
  },

  set placeholder(custom) {
    this._placeholder = custom;
  },
  get placeholder() {
    return this._placeholder || this.primary.dim;
  },

  set highlight(custom) {
    this._highlight = custom;
  },
  get highlight() {
    return this._highlight || this.inverse;
  }
};

styles.merge = (options = {}) => {
  if (options.styles && typeof options.styles.enabled === 'boolean') {
    colors.enabled = options.styles.enabled;
  }
  if (options.styles && typeof options.styles.visible === 'boolean') {
    colors.visible = options.styles.visible;
  }

  let result = utils.merge({}, styles, options.styles);
  delete result.merge;

  for (let key of Object.keys(colors)) {
    if (!hasOwnProperty.call(result, key)) {
      Reflect.defineProperty(result, key, { get: () => colors[key] });
    }
  }

  for (let key of Object.keys(colors.styles)) {
    if (!hasOwnProperty.call(result, key)) {
      Reflect.defineProperty(result, key, { get: () => colors[key] });
    }
  }
  return result;
};

module.exports = styles;


/***/ }),

/***/ 85586:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const isWindows = process.platform === 'win32';
const colors = __nccwpck_require__(99151);
const utils = __nccwpck_require__(28527);

const symbols = {
  ...colors.symbols,
  upDownDoubleArrow: '⇕',
  upDownDoubleArrow2: '⬍',
  upDownArrow: '↕',
  asterisk: '*',
  asterism: '⁂',
  bulletWhite: '◦',
  electricArrow: '⌁',
  ellipsisLarge: '⋯',
  ellipsisSmall: '…',
  fullBlock: '█',
  identicalTo: '≡',
  indicator: colors.symbols.check,
  leftAngle: '‹',
  mark: '※',
  minus: '−',
  multiplication: '×',
  obelus: '÷',
  percent: '%',
  pilcrow: '¶',
  pilcrow2: '❡',
  pencilUpRight: '✐',
  pencilDownRight: '✎',
  pencilRight: '✏',
  plus: '+',
  plusMinus: '±',
  pointRight: '☞',
  rightAngle: '›',
  section: '§',
  hexagon: { off: '⬡', on: '⬢', disabled: '⬢' },
  ballot: { on: '☑', off: '☐', disabled: '☒' },
  stars: { on: '★', off: '☆', disabled: '☆' },
  folder: { on: '▼', off: '▶', disabled: '▶' },
  prefix: {
    pending: colors.symbols.question,
    submitted: colors.symbols.check,
    cancelled: colors.symbols.cross
  },
  separator: {
    pending: colors.symbols.pointerSmall,
    submitted: colors.symbols.middot,
    cancelled: colors.symbols.middot
  },
  radio: {
    off: isWindows ? '( )' : '◯',
    on: isWindows ? '(*)' : '◉',
    disabled: isWindows ? '(|)' : 'Ⓘ'
  },
  numbers: ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿']
};

symbols.merge = options => {
  let result = utils.merge({}, colors.symbols, symbols, options.symbols);
  delete result.merge;
  return result;
};

module.exports = symbols;



/***/ }),

/***/ 46739:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const styles = __nccwpck_require__(43751);
const symbols = __nccwpck_require__(85586);
const utils = __nccwpck_require__(28527);

module.exports = prompt => {
  prompt.options = utils.merge({}, prompt.options.theme, prompt.options);
  prompt.symbols = symbols.merge(prompt.options);
  prompt.styles = styles.merge(prompt.options);
};


/***/ }),

/***/ 37711:
/***/ ((module) => {

"use strict";


module.exports = prompt => {
  prompt.timers = prompt.timers || {};

  let timers = prompt.options.timers;
  if (!timers) return;

  for (let key of Object.keys(timers)) {
    let opts = timers[key];
    if (typeof opts === 'number') {
      opts = { interval: opts };
    }
    create(prompt, key, opts);
  }
};

function create(prompt, name, options = {}) {
  let timer = prompt.timers[name] = { name, start: Date.now(), ms: 0, tick: 0 };
  let ms = options.interval || 120;
  timer.frames = options.frames || [];
  timer.loading = true;

  let interval = setInterval(() => {
    timer.ms = Date.now() - timer.start;
    timer.tick++;
    prompt.render();
  }, ms);

  timer.stop = () => {
    timer.loading = false;
    clearInterval(interval);
  };

  Reflect.defineProperty(timer, 'interval', { value: interval });
  prompt.once('close', () => timer.stop());
  return timer.stop;
}


/***/ }),

/***/ 47633:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const stripAnsi = __nccwpck_require__(45591);
const Prompt = __nccwpck_require__(7072);
const roles = __nccwpck_require__(41487);
const utils = __nccwpck_require__(28527);
const { reorder, scrollUp, scrollDown, isObject, swap } = utils;

class ArrayPrompt extends Prompt {
  constructor(options) {
    super(options);
    this.cursorHide();
    this.maxSelected = options.maxSelected || Infinity;
    this.multiple = options.multiple || false;
    this.initial = options.initial || 0;
    this.delay = options.delay || 0;
    this.longest = 0;
    this.num = '';
  }

  async initialize() {
    if (typeof this.options.initial === 'function') {
      this.initial = await this.options.initial.call(this);
    }
    await this.reset(true);
    await super.initialize();
  }

  async reset() {
    let { choices, initial, autofocus, suggest } = this.options;
    this.state._choices = [];
    this.state.choices = [];

    this.choices = await Promise.all(await this.toChoices(choices));
    this.choices.forEach(ch => (ch.enabled = false));

    if (typeof suggest !== 'function' && this.selectable.length === 0) {
      throw new Error('At least one choice must be selectable');
    }

    if (isObject(initial)) initial = Object.keys(initial);
    if (Array.isArray(initial)) {
      if (autofocus != null) this.index = this.findIndex(autofocus);
      initial.forEach(v => this.enable(this.find(v)));
      await this.render();
    } else {
      if (autofocus != null) initial = autofocus;
      if (typeof initial === 'string') initial = this.findIndex(initial);
      if (typeof initial === 'number' && initial > -1) {
        this.index = Math.max(0, Math.min(initial, this.choices.length));
        this.enable(this.find(this.index));
      }
    }

    if (this.isDisabled(this.focused)) {
      await this.down();
    }
  }

  async toChoices(value, parent) {
    this.state.loadingChoices = true;
    let choices = [];
    let index = 0;

    let toChoices = async(items, parent) => {
      if (typeof items === 'function') items = await items.call(this);
      if (items instanceof Promise) items = await items;

      for (let i = 0; i < items.length; i++) {
        let choice = items[i] = await this.toChoice(items[i], index++, parent);
        choices.push(choice);

        if (choice.choices) {
          await toChoices(choice.choices, choice);
        }
      }
      return choices;
    };

    return toChoices(value, parent)
      .then(choices => {
        this.state.loadingChoices = false;
        return choices;
      });
  }

  async toChoice(ele, i, parent) {
    if (typeof ele === 'function') ele = await ele.call(this, this);
    if (ele instanceof Promise) ele = await ele;
    if (typeof ele === 'string') ele = { name: ele };

    if (ele.normalized) return ele;
    ele.normalized = true;

    let origVal = ele.value;
    let role = roles(ele.role, this.options);
    ele = role(this, ele);

    if (typeof ele.disabled === 'string' && !ele.hint) {
      ele.hint = ele.disabled;
      ele.disabled = true;
    }

    if (ele.disabled === true && ele.hint == null) {
      ele.hint = '(disabled)';
    }

    // if the choice was already normalized, return it
    if (ele.index != null) return ele;
    ele.name = ele.name || ele.key || ele.title || ele.value || ele.message;
    ele.message = ele.message || ele.name || '';
    ele.value = [ele.value, ele.name].find(this.isValue.bind(this));

    ele.input = '';
    ele.index = i;
    ele.cursor = 0;

    utils.define(ele, 'parent', parent);
    ele.level = parent ? parent.level + 1 : 1;
    if (ele.indent == null) {
      ele.indent = parent ? parent.indent + '  ' : (ele.indent || '');
    }

    ele.path = parent ? parent.path + '.' + ele.name : ele.name;
    ele.enabled = !!(this.multiple && !this.isDisabled(ele) && (ele.enabled || this.isSelected(ele)));

    if (!this.isDisabled(ele)) {
      this.longest = Math.max(this.longest, stripAnsi(ele.message).length);
    }

    // shallow clone the choice first
    let choice = { ...ele };

    // then allow the choice to be reset using the "original" values
    ele.reset = (input = choice.input, value = choice.value) => {
      for (let key of Object.keys(choice)) ele[key] = choice[key];
      ele.input = input;
      ele.value = value;
    };

    if (origVal == null && typeof ele.initial === 'function') {
      ele.input = await ele.initial.call(this, this.state, ele, i);
    }

    return ele;
  }

  async onChoice(choice, i) {
    this.emit('choice', choice, i, this);

    if (typeof choice.onChoice === 'function') {
      await choice.onChoice.call(this, this.state, choice, i);
    }
  }

  async addChoice(ele, i, parent) {
    let choice = await this.toChoice(ele, i, parent);
    this.choices.push(choice);
    this.index = this.choices.length - 1;
    this.limit = this.choices.length;
    return choice;
  }

  async newItem(item, i, parent) {
    let ele = { name: 'New choice name?', editable: true, newChoice: true, ...item };
    let choice = await this.addChoice(ele, i, parent);

    choice.updateChoice = () => {
      delete choice.newChoice;
      choice.name = choice.message = choice.input;
      choice.input = '';
      choice.cursor = 0;
    };

    return this.render();
  }

  indent(choice) {
    if (choice.indent == null) {
      return choice.level > 1 ? '  '.repeat(choice.level - 1) : '';
    }
    return choice.indent;
  }

  dispatch(s, key) {
    if (this.multiple && this[key.name]) return this[key.name]();
    this.alert();
  }

  focus(choice, enabled) {
    if (typeof enabled !== 'boolean') enabled = choice.enabled;
    if (enabled && !choice.enabled && this.selected.length >= this.maxSelected) {
      return this.alert();
    }
    this.index = choice.index;
    choice.enabled = enabled && !this.isDisabled(choice);
    return choice;
  }

  space() {
    if (!this.multiple) return this.alert();
    if (!this.focused) return;
    this.toggle(this.focused);
    return this.render();
  }

  a() {
    if (this.maxSelected < this.choices.length) return this.alert();
    let enabled = this.selectable.every(ch => ch.enabled);
    this.choices.forEach(ch => (ch.enabled = !enabled));
    return this.render();
  }

  i() {
    // don't allow choices to be inverted if it will result in
    // more than the maximum number of allowed selected items.
    if (this.choices.length - this.selected.length > this.maxSelected) {
      return this.alert();
    }
    this.choices.forEach(ch => (ch.enabled = !ch.enabled));
    return this.render();
  }

  g() {
    if (!this.choices.some(ch => !!ch.parent)) return this.a();
    const focused = this.focused;
    this.toggle((focused.parent && !focused.choices) ? focused.parent : focused);
    return this.render();
  }

  toggle(choice, enabled) {
    if (!choice.enabled && this.selected.length >= this.maxSelected) {
      return this.alert();
    }

    if (typeof enabled !== 'boolean') enabled = !choice.enabled;
    choice.enabled = enabled;

    if (choice.choices) {
      choice.choices.forEach(ch => this.toggle(ch, enabled));
    }

    let parent = choice.parent;
    while (parent) {
      let choices = parent.choices.filter(ch => this.isDisabled(ch));
      parent.enabled = choices.every(ch => ch.enabled === true);
      parent = parent.parent;
    }

    reset(this, this.choices);
    this.emit('toggle', choice, this);
    return choice;
  }

  enable(choice) {
    if (this.selected.length >= this.maxSelected) return this.alert();
    choice.enabled = !this.isDisabled(choice);
    choice.choices && choice.choices.forEach(this.enable.bind(this));
    return choice;
  }

  disable(choice) {
    choice.enabled = false;
    choice.choices && choice.choices.forEach(this.disable.bind(this));
    return choice;
  }

  number(n) {
    this.num += n;

    let number = num => {
      let i = Number(num);
      if (i > this.choices.length - 1) return this.alert();

      let focused = this.focused;
      let choice = this.choices.find(ch => i === ch.index);

      if (!choice.enabled && this.selected.length >= this.maxSelected) {
        return this.alert();
      }

      if (this.visible.indexOf(choice) === -1) {
        let choices = reorder(this.choices);
        let actualIdx = choices.indexOf(choice);

        if (focused.index > actualIdx) {
          let start = choices.slice(actualIdx, actualIdx + this.limit);
          let end = choices.filter(ch => !start.includes(ch));
          this.choices = start.concat(end);
        } else {
          let pos = actualIdx - this.limit + 1;
          this.choices = choices.slice(pos).concat(choices.slice(0, pos));
        }
      }

      this.index = this.choices.indexOf(choice);
      this.toggle(this.focused);
      return this.render();
    };

    clearTimeout(this.numberTimeout);

    return new Promise(resolve => {
      let len = this.choices.length;
      let num = this.num;

      let handle = (val = false, res) => {
        clearTimeout(this.numberTimeout);
        if (val) res = number(num);
        this.num = '';
        resolve(res);
      };

      if (num === '0' || (num.length === 1 && Number(num + '0') > len)) {
        return handle(true);
      }

      if (Number(num) > len) {
        return handle(false, this.alert());
      }

      this.numberTimeout = setTimeout(() => handle(true), this.delay);
    });
  }

  home() {
    this.choices = reorder(this.choices);
    this.index = 0;
    return this.render();
  }

  end() {
    let pos = this.choices.length - this.limit;
    let choices = reorder(this.choices);
    this.choices = choices.slice(pos).concat(choices.slice(0, pos));
    this.index = this.limit - 1;
    return this.render();
  }

  first() {
    this.index = 0;
    return this.render();
  }

  last() {
    this.index = this.visible.length - 1;
    return this.render();
  }

  prev() {
    if (this.visible.length <= 1) return this.alert();
    return this.up();
  }

  next() {
    if (this.visible.length <= 1) return this.alert();
    return this.down();
  }

  right() {
    if (this.cursor >= this.input.length) return this.alert();
    this.cursor++;
    return this.render();
  }

  left() {
    if (this.cursor <= 0) return this.alert();
    this.cursor--;
    return this.render();
  }

  up() {
    let len = this.choices.length;
    let vis = this.visible.length;
    let idx = this.index;
    if (this.options.scroll === false && idx === 0) {
      return this.alert();
    }
    if (len > vis && idx === 0) {
      return this.scrollUp();
    }
    this.index = ((idx - 1 % len) + len) % len;
    if (this.isDisabled() && !this.allChoicesAreDisabled()) {
      return this.up();
    }
    return this.render();
  }

  down() {
    let len = this.choices.length;
    let vis = this.visible.length;
    let idx = this.index;
    if (this.options.scroll === false && idx === vis - 1) {
      return this.alert();
    }
    if (len > vis && idx === vis - 1) {
      return this.scrollDown();
    }
    this.index = (idx + 1) % len;
    if (this.isDisabled() && !this.allChoicesAreDisabled()) {
      return this.down();
    }
    return this.render();
  }

  scrollUp(i = 0) {
    this.choices = scrollUp(this.choices);
    this.index = i;
    if (this.isDisabled()) {
      return this.up();
    }
    return this.render();
  }

  scrollDown(i = this.visible.length - 1) {
    this.choices = scrollDown(this.choices);
    this.index = i;
    if (this.isDisabled()) {
      return this.down();
    }
    return this.render();
  }

  async shiftUp() {
    if (this.options.sort === true) {
      this.sorting = true;
      this.swap(this.index - 1);
      await this.up();
      this.sorting = false;
      return;
    }
    return this.scrollUp(this.index);
  }

  async shiftDown() {
    if (this.options.sort === true) {
      this.sorting = true;
      this.swap(this.index + 1);
      await this.down();
      this.sorting = false;
      return;
    }
    return this.scrollDown(this.index);
  }

  pageUp() {
    if (this.visible.length <= 1) return this.alert();
    this.limit = Math.max(this.limit - 1, 0);
    this.index = Math.min(this.limit - 1, this.index);
    this._limit = this.limit;
    if (this.isDisabled()) {
      return this.up();
    }
    return this.render();
  }

  pageDown() {
    if (this.visible.length >= this.choices.length) return this.alert();
    this.index = Math.max(0, this.index);
    this.limit = Math.min(this.limit + 1, this.choices.length);
    this._limit = this.limit;
    if (this.isDisabled()) {
      return this.down();
    }
    return this.render();
  }

  swap(pos) {
    swap(this.choices, this.index, pos);
  }

  allChoicesAreDisabled(choices = this.choices) {
    return choices.every(choice => this.isDisabled(choice));
  }

  isDisabled(choice = this.focused) {
    let keys = ['disabled', 'collapsed', 'hidden', 'completing', 'readonly'];
    if (choice && keys.some(key => choice[key] === true)) {
      return true;
    }
    return choice && choice.role === 'heading';
  }

  isEnabled(choice = this.focused) {
    if (Array.isArray(choice)) return choice.every(ch => this.isEnabled(ch));
    if (choice.choices) {
      let choices = choice.choices.filter(ch => !this.isDisabled(ch));
      return choice.enabled && choices.every(ch => this.isEnabled(ch));
    }
    return choice.enabled && !this.isDisabled(choice);
  }

  isChoice(choice, value) {
    return choice.name === value || choice.index === Number(value);
  }

  isSelected(choice) {
    if (Array.isArray(this.initial)) {
      return this.initial.some(value => this.isChoice(choice, value));
    }
    return this.isChoice(choice, this.initial);
  }

  map(names = [], prop = 'value') {
    return [].concat(names || []).reduce((acc, name) => {
      acc[name] = this.find(name, prop);
      return acc;
    }, {});
  }

  filter(value, prop) {
    let isChoice = (ele, i) => [ele.name, i].includes(value);
    let fn = typeof value === 'function' ? value : isChoice;
    let choices = this.options.multiple ? this.state._choices : this.choices;
    let result = choices.filter(fn);
    if (prop) {
      return result.map(ch => ch[prop]);
    }
    return result;
  }

  find(value, prop) {
    if (isObject(value)) return prop ? value[prop] : value;
    let isChoice = (ele, i) => [ele.name, i].includes(value);
    let fn = typeof value === 'function' ? value : isChoice;
    let choice = this.choices.find(fn);
    if (choice) {
      return prop ? choice[prop] : choice;
    }
  }

  findIndex(value) {
    return this.choices.indexOf(this.find(value));
  }

  async submit() {
    let choice = this.focused;
    if (!choice) return this.alert();

    if (choice.newChoice) {
      if (!choice.input) return this.alert();
      choice.updateChoice();
      return this.render();
    }

    if (this.choices.some(ch => ch.newChoice)) {
      return this.alert();
    }

    let { reorder, sort } = this.options;
    let multi = this.multiple === true;
    let value = this.selected;
    if (value === void 0) {
      return this.alert();
    }

    // re-sort choices to original order
    if (Array.isArray(value) && reorder !== false && sort !== true) {
      value = utils.reorder(value);
    }

    this.value = multi ? value.map(ch => ch.name) : value.name;
    return super.submit();
  }

  set choices(choices = []) {
    this.state._choices = this.state._choices || [];
    this.state.choices = choices;

    for (let choice of choices) {
      if (!this.state._choices.some(ch => ch.name === choice.name)) {
        this.state._choices.push(choice);
      }
    }

    if (!this._initial && this.options.initial) {
      this._initial = true;
      let init = this.initial;
      if (typeof init === 'string' || typeof init === 'number') {
        let choice = this.find(init);
        if (choice) {
          this.initial = choice.index;
          this.focus(choice, true);
        }
      }
    }
  }
  get choices() {
    return reset(this, this.state.choices || []);
  }

  set visible(visible) {
    this.state.visible = visible;
  }
  get visible() {
    return (this.state.visible || this.choices).slice(0, this.limit);
  }

  set limit(num) {
    this.state.limit = num;
  }
  get limit() {
    let { state, options, choices } = this;
    let limit = state.limit || this._limit || options.limit || choices.length;
    return Math.min(limit, this.height);
  }

  set value(value) {
    super.value = value;
  }
  get value() {
    if (typeof super.value !== 'string' && super.value === this.initial) {
      return this.input;
    }
    return super.value;
  }

  set index(i) {
    this.state.index = i;
  }
  get index() {
    return Math.max(0, this.state ? this.state.index : 0);
  }

  get enabled() {
    return this.filter(this.isEnabled.bind(this));
  }

  get focused() {
    let choice = this.choices[this.index];
    if (choice && this.state.submitted && this.multiple !== true) {
      choice.enabled = true;
    }
    return choice;
  }

  get selectable() {
    return this.choices.filter(choice => !this.isDisabled(choice));
  }

  get selected() {
    return this.multiple ? this.enabled : this.focused;
  }
}

function reset(prompt, choices) {
  if (choices instanceof Promise) return choices;
  if (typeof choices === 'function') {
    if (utils.isAsyncFn(choices)) return choices;
    choices = choices.call(prompt, prompt);
  }
  for (let choice of choices) {
    if (Array.isArray(choice.choices)) {
      let items = choice.choices.filter(ch => !prompt.isDisabled(ch));
      choice.enabled = items.every(ch => ch.enabled === true);
    }
    if (prompt.isDisabled(choice) === true) {
      delete choice.enabled;
    }
  }
  return choices;
}

module.exports = ArrayPrompt;


/***/ }),

/***/ 93315:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const FormPrompt = __nccwpck_require__(71787);

const defaultAuthenticate = () => {
  throw new Error('expected prompt to have a custom authenticate method');
};

const factory = (authenticate = defaultAuthenticate) => {

  class AuthPrompt extends FormPrompt {
    constructor(options) {
      super(options);
    }

    async submit() {
      this.value = await authenticate.call(this, this.values, this.state);
      super.base.submit.call(this);
    }

    static create(authenticate) {
      return factory(authenticate);
    }
  }

  return AuthPrompt;
};

module.exports = factory();


/***/ }),

/***/ 93055:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Prompt = __nccwpck_require__(7072);
const { isPrimitive, hasColor } = __nccwpck_require__(28527);

class BooleanPrompt extends Prompt {
  constructor(options) {
    super(options);
    this.cursorHide();
  }

  async initialize() {
    let initial = await this.resolve(this.initial, this.state);
    this.input = await this.cast(initial);
    await super.initialize();
  }

  dispatch(ch) {
    if (!this.isValue(ch)) return this.alert();
    this.input = ch;
    return this.submit();
  }

  format(value) {
    let { styles, state } = this;
    return !state.submitted ? styles.primary(value) : styles.success(value);
  }

  cast(input) {
    return this.isTrue(input);
  }

  isTrue(input) {
    return /^[ty1]/i.test(input);
  }

  isFalse(input) {
    return /^[fn0]/i.test(input);
  }

  isValue(value) {
    return isPrimitive(value) && (this.isTrue(value) || this.isFalse(value));
  }

  async hint() {
    if (this.state.status === 'pending') {
      let hint = await this.element('hint');
      if (!hasColor(hint)) {
        return this.styles.muted(hint);
      }
      return hint;
    }
  }

  async render() {
    let { input, size } = this.state;

    let prefix = await this.prefix();
    let sep = await this.separator();
    let msg = await this.message();
    let hint = this.styles.muted(this.default);

    let promptLine = [prefix, msg, hint, sep].filter(Boolean).join(' ');
    this.state.prompt = promptLine;

    let header = await this.header();
    let value = this.value = this.cast(input);
    let output = await this.format(value);
    let help = (await this.error()) || (await this.hint());
    let footer = await this.footer();

    if (help && !promptLine.includes(help)) output += ' ' + help;
    promptLine += ' ' + output;

    this.clear(size);
    this.write([header, promptLine, footer].filter(Boolean).join('\n'));
    this.restore();
  }

  set value(value) {
    super.value = value;
  }
  get value() {
    return this.cast(super.value);
  }
}

module.exports = BooleanPrompt;


/***/ }),

/***/ 20891:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = {
  ArrayPrompt: __nccwpck_require__(47633),
  AuthPrompt: __nccwpck_require__(93315),
  BooleanPrompt: __nccwpck_require__(93055),
  NumberPrompt: __nccwpck_require__(47572),
  StringPrompt: __nccwpck_require__(91401)
};


/***/ }),

/***/ 47572:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const StringPrompt = __nccwpck_require__(91401);

class NumberPrompt extends StringPrompt {
  constructor(options = {}) {
    super({ style: 'number', ...options });
    this.min = this.isValue(options.min) ? this.toNumber(options.min) : -Infinity;
    this.max = this.isValue(options.max) ? this.toNumber(options.max) : Infinity;
    this.delay = options.delay != null ? options.delay : 1000;
    this.float = options.float !== false;
    this.round = options.round === true || options.float === false;
    this.major = options.major || 10;
    this.minor = options.minor || 1;
    this.initial = options.initial != null ? options.initial : '';
    this.input = String(this.initial);
    this.cursor = this.input.length;
    this.cursorShow();
  }

  append(ch) {
    if (!/[-+.]/.test(ch) || (ch === '.' && this.input.includes('.'))) {
      return this.alert('invalid number');
    }
    return super.append(ch);
  }

  number(ch) {
    return super.append(ch);
  }

  next() {
    if (this.input && this.input !== this.initial) return this.alert();
    if (!this.isValue(this.initial)) return this.alert();
    this.input = this.initial;
    this.cursor = String(this.initial).length;
    return this.render();
  }

  up(number) {
    let step = number || this.minor;
    let num = this.toNumber(this.input);
    if (num > this.max + step) return this.alert();
    this.input = `${num + step}`;
    return this.render();
  }

  down(number) {
    let step = number || this.minor;
    let num = this.toNumber(this.input);
    if (num < this.min - step) return this.alert();
    this.input = `${num - step}`;
    return this.render();
  }

  shiftDown() {
    return this.down(this.major);
  }

  shiftUp() {
    return this.up(this.major);
  }

  format(input = this.input) {
    if (typeof this.options.format === 'function') {
      return this.options.format.call(this, input);
    }
    return this.styles.info(input);
  }

  toNumber(value = '') {
    return this.float ? +value : Math.round(+value);
  }

  isValue(value) {
    return /^[-+]?[0-9]+((\.)|(\.[0-9]+))?$/.test(value);
  }

  submit() {
    let value = [this.input, this.initial].find(v => this.isValue(v));
    this.value = this.toNumber(value || 0);
    return super.submit();
  }
}

module.exports = NumberPrompt;


/***/ }),

/***/ 91401:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Prompt = __nccwpck_require__(7072);
const keypress = __nccwpck_require__(44162);
const placeholder = __nccwpck_require__(79690);
const { isPrimitive } = __nccwpck_require__(28527);

class StringPrompt extends Prompt {
  constructor(options) {
    super(options);
    this.initial = isPrimitive(this.initial) ? String(this.initial) : '';
    if (this.initial) this.cursorHide();
    this.state.prevCursor = 0;
    this.state.clipboard = [];
    this.keypressTimeout =
      this.options.keypressTimeout !== undefined
        ? this.options.keypressTimeout
        : null;
  }

  async keypress(input, key = input ? keypress(input, {}) : {}) {
    const now = Date.now();
    const elapsed = now - this.lastKeypress;
    this.lastKeypress = now;

    const isEnterKey = key.name === 'return' || key.name === 'enter';
    let prev = this.state.prevKeypress;
    let append;
    this.state.prevKeypress = key;

    if (this.keypressTimeout != null && isEnterKey) {
      if (elapsed < this.keypressTimeout) {
        return this.submit();
      }

      this.state.multilineBuffer = this.state.multilineBuffer || '';
      this.state.multilineBuffer += input;
      append = true;
      prev = null;
    }

    if (append || (this.options.multiline && isEnterKey)) {
      if (!prev || prev.name !== 'return') {
        return this.append('\n', key);
      }
    }

    return super.keypress(input, key);
  }

  moveCursor(n) {
    this.cursor += n;
  }

  reset() {
    this.input = this.value = '';
    this.cursor = 0;
    return this.render();
  }

  dispatch(ch, key) {
    if (!ch || key.ctrl || key.code) return this.alert();
    this.append(ch);
  }

  append(ch) {
    let { cursor, input } = this.state;
    this.input = `${input}`.slice(0, cursor) + ch + `${input}`.slice(cursor);
    this.moveCursor(String(ch).length);
    this.render();
  }

  insert(str) {
    this.append(str);
  }

  delete() {
    let { cursor, input } = this.state;
    if (cursor <= 0) return this.alert();
    this.input = `${input}`.slice(0, cursor - 1) + `${input}`.slice(cursor);
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    let { cursor, input } = this.state;
    if (input[cursor] === void 0) return this.alert();
    this.input = `${input}`.slice(0, cursor) + `${input}`.slice(cursor + 1);
    this.render();
  }

  cutForward() {
    let pos = this.cursor;
    if (this.input.length <= pos) return this.alert();
    this.state.clipboard.push(this.input.slice(pos));
    this.input = this.input.slice(0, pos);
    this.render();
  }

  cutLeft() {
    let pos = this.cursor;
    if (pos === 0) return this.alert();
    let before = this.input.slice(0, pos);
    let after = this.input.slice(pos);
    let words = before.split(' ');
    this.state.clipboard.push(words.pop());
    this.input = words.join(' ');
    this.cursor = this.input.length;
    this.input += after;
    this.render();
  }

  paste() {
    if (!this.state.clipboard.length) return this.alert();
    this.insert(this.state.clipboard.pop());
    this.render();
  }

  toggleCursor() {
    if (this.state.prevCursor) {
      this.cursor = this.state.prevCursor;
      this.state.prevCursor = 0;
    } else {
      this.state.prevCursor = this.cursor;
      this.cursor = 0;
    }
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.input.length - 1;
    this.render();
  }

  next() {
    let init = this.initial != null ? String(this.initial) : '';
    if (!init || !init.startsWith(this.input)) return this.alert();
    this.input = this.initial;
    this.cursor = this.initial.length;
    this.render();
  }

  prev() {
    if (!this.input) return this.alert();
    this.reset();
  }

  backward() {
    return this.left();
  }

  forward() {
    return this.right();
  }

  right() {
    if (this.cursor >= this.input.length) return this.alert();
    this.moveCursor(1);
    return this.render();
  }

  left() {
    if (this.cursor <= 0) return this.alert();
    this.moveCursor(-1);
    return this.render();
  }

  isValue(value) {
    return !!value;
  }

  async format(input = this.value) {
    let initial = await this.resolve(this.initial, this.state);
    if (!this.state.submitted) {
      return placeholder(this, { input, initial, pos: this.cursor });
    }
    return this.styles.submitted(input || initial);
  }

  async render() {
    let size = this.state.size;

    let prefix = await this.prefix();
    let separator = await this.separator();
    let message = await this.message();

    let prompt = [prefix, message, separator].filter(Boolean).join(' ');
    this.state.prompt = prompt;

    let header = await this.header();
    let output = await this.format();
    let help = (await this.error()) || (await this.hint());
    let footer = await this.footer();

    if (help && !output.includes(help)) output += ' ' + help;
    prompt += ' ' + output;

    this.clear(size);
    this.write([header, prompt, footer].filter(Boolean).join('\n'));
    this.restore();
  }
}

module.exports = StringPrompt;


/***/ }),

/***/ 28527:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const toString = Object.prototype.toString;
const colors = __nccwpck_require__(99151);
let onExitCalled = false;
let onExitCallbacks = new Set();

const complements = {
  'yellow': 'blue',
  'cyan': 'red',
  'green': 'magenta',
  'black': 'white',
  'blue': 'yellow',
  'red': 'cyan',
  'magenta': 'green',
  'white': 'black'
};

exports.longest = (arr, prop) => {
  return arr.reduce((a, v) => Math.max(a, prop ? v[prop].length : v.length), 0);
};

exports.hasColor = str => !!str && colors.hasColor(str);

const isObject = exports.isObject = val => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

exports.nativeType = val => {
  return toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, '');
};

exports.isAsyncFn = val => {
  return exports.nativeType(val) === 'asyncfunction';
};

exports.isPrimitive = val => {
  return val != null && typeof val !== 'object' && typeof val !== 'function';
};

exports.resolve = (context, value, ...rest) => {
  if (typeof value === 'function') {
    return value.call(context, ...rest);
  }
  return value;
};

exports.scrollDown = (choices = []) => [...choices.slice(1), choices[0]];
exports.scrollUp = (choices = []) => [choices.pop(), ...choices];

exports.reorder = (arr = []) => {
  let res = arr.slice();
  res.sort((a, b) => {
    if (a.index > b.index) return 1;
    if (a.index < b.index) return -1;
    return 0;
  });
  return res;
};

exports.swap = (arr, index, pos) => {
  let len = arr.length;
  let idx = pos === len ? 0 : pos < 0 ? len - 1 : pos;
  let choice = arr[index];
  arr[index] = arr[idx];
  arr[idx] = choice;
};

exports.width = (stream, fallback = 80) => {
  let columns = (stream && stream.columns) ? stream.columns : fallback;
  if (stream && typeof stream.getWindowSize === 'function') {
    columns = stream.getWindowSize()[0];
  }
  if (process.platform === 'win32') {
    return columns - 1;
  }
  return columns;
};

exports.height = (stream, fallback = 20) => {
  let rows = (stream && stream.rows) ? stream.rows : fallback;
  if (stream && typeof stream.getWindowSize === 'function') {
    rows = stream.getWindowSize()[1];
  }
  return rows;
};

exports.wordWrap = (str, options = {}) => {
  if (!str) return str;

  if (typeof options === 'number') {
    options = { width: options };
  }

  let { indent = '', newline = ('\n' + indent), width = 80 } = options;
  let spaces = (newline + indent).match(/[^\S\n]/g) || [];
  width -= spaces.length;
  let source = `.{1,${width}}([\\s\\u200B]+|$)|[^\\s\\u200B]+?([\\s\\u200B]+|$)`;
  let output = str.trim();
  let regex = new RegExp(source, 'g');
  let lines = output.match(regex) || [];
  lines = lines.map(line => line.replace(/\n$/, ''));
  if (options.padEnd) lines = lines.map(line => line.padEnd(width, ' '));
  if (options.padStart) lines = lines.map(line => line.padStart(width, ' '));
  return indent + lines.join(newline);
};

exports.unmute = color => {
  let name = color.stack.find(n => colors.keys.color.includes(n));
  if (name) {
    return colors[name];
  }
  let bg = color.stack.find(n => n.slice(2) === 'bg');
  if (bg) {
    return colors[name.slice(2)];
  }
  return str => str;
};

exports.pascal = str => str ? str[0].toUpperCase() + str.slice(1) : '';

exports.inverse = color => {
  if (!color || !color.stack) return color;
  let name = color.stack.find(n => colors.keys.color.includes(n));
  if (name) {
    let col = colors['bg' + exports.pascal(name)];
    return col ? col.black : color;
  }
  let bg = color.stack.find(n => n.slice(0, 2) === 'bg');
  if (bg) {
    return colors[bg.slice(2).toLowerCase()] || color;
  }
  return colors.none;
};

exports.complement = color => {
  if (!color || !color.stack) return color;
  let name = color.stack.find(n => colors.keys.color.includes(n));
  let bg = color.stack.find(n => n.slice(0, 2) === 'bg');
  if (name && !bg) {
    return colors[complements[name] || name];
  }
  if (bg) {
    let lower = bg.slice(2).toLowerCase();
    let comp = complements[lower];
    if (!comp) return color;
    return colors['bg' + exports.pascal(comp)] || color;
  }
  return colors.none;
};

exports.meridiem = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  let hrs = hours === 0 ? 12 : hours;
  let min = minutes < 10 ? '0' + minutes : minutes;
  return hrs + ':' + min + ' ' + ampm;
};

/**
 * Set a value on the given object.
 * @param {Object} obj
 * @param {String} prop
 * @param {any} value
 */

exports.set = (obj = {}, prop = '', val) => {
  return prop.split('.').reduce((acc, k, i, arr) => {
    let value = arr.length - 1 > i ? (acc[k] || {}) : val;
    if (!exports.isObject(value) && i < arr.length - 1) value = {};
    return (acc[k] = value);
  }, obj);
};

/**
 * Get a value from the given object.
 * @param {Object} obj
 * @param {String} prop
 */

exports.get = (obj = {}, prop = '', fallback) => {
  let value = obj[prop] == null
    ? prop.split('.').reduce((acc, k) => acc && acc[k], obj)
    : obj[prop];
  return value == null ? fallback : value;
};

exports.mixin = (target, b) => {
  if (!isObject(target)) return b;
  if (!isObject(b)) return target;
  for (let key of Object.keys(b)) {
    let desc = Object.getOwnPropertyDescriptor(b, key);
    if (hasOwnProperty.call(desc, 'value')) {
      if (hasOwnProperty.call(target, key) && isObject(desc.value)) {
        let existing = Object.getOwnPropertyDescriptor(target, key);
        if (isObject(existing.value) && existing.value !== desc.value) {
          target[key] = exports.merge({}, target[key], b[key]);
        } else {
          Reflect.defineProperty(target, key, desc);
        }
      } else {
        Reflect.defineProperty(target, key, desc);
      }
    } else {
      Reflect.defineProperty(target, key, desc);
    }
  }
  return target;
};

exports.merge = (...args) => {
  let target = {};
  for (let ele of args) exports.mixin(target, ele);
  return target;
};

exports.mixinEmitter = (obj, emitter) => {
  let proto = emitter.constructor.prototype;
  for (let key of Object.keys(proto)) {
    let val = proto[key];
    if (typeof val === 'function') {
      exports.define(obj, key, val.bind(emitter));
    } else {
      exports.define(obj, key, val);
    }
  }
};

const onExit = (quit, code) => {
  if (onExitCalled) return;

  onExitCalled = true;
  onExitCallbacks.forEach(fn => fn());

  if (quit === true) {
    process.exit(128 + code);
  }
};
const onSigTerm = onExit.bind(null, true, 15);
const onSigInt = onExit.bind(null, true, 2);

exports.onExit = callback => {
  if (onExitCallbacks.size === 0) {
    process.once('SIGTERM', onSigTerm);
    process.once('SIGINT', onSigInt);
    process.once('exit', onExit);
  }

  onExitCallbacks.add(callback);

  return () => {
    onExitCallbacks.delete(callback);
    if (onExitCallbacks.size === 0) {
      process.off('SIGTERM', onSigTerm);
      process.off('SIGINT', onSigInt);
      process.off('exit', onExit);
    }
  }
};

exports.define = (obj, key, value) => {
  Reflect.defineProperty(obj, key, { value });
};

exports.defineExport = (obj, key, fn) => {
  let custom;
  Reflect.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    set(val) {
      custom = val;
    },
    get() {
      return custom ? custom() : fn();
    }
  });
};


/***/ }),

/***/ 11848:
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 31621:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 37023:
/***/ ((module) => {

let p = process || {}, argv = p.argv || [], env = p.env || {}
let isColorSupported =
	!(!!env.NO_COLOR || argv.includes("--no-color")) &&
	(!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || ((p.stdout || {}).isTTY && env.TERM !== "dumb") || !!env.CI)

let formatter = (open, close, replace = open) =>
	input => {
		let string = "" + input, index = string.indexOf(close, open.length)
		return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close
	}

let replaceClose = (string, close, replace, index) => {
	let result = "", cursor = 0
	do {
		result += string.substring(cursor, index) + replace
		cursor = index + close.length
		index = string.indexOf(close, cursor)
	} while (~index)
	return result + string.substring(cursor)
}

let createColors = (enabled = isColorSupported) => {
	let f = enabled ? formatter : () => String
	return {
		isColorSupported: enabled,
		reset: f("\x1b[0m", "\x1b[0m"),
		bold: f("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"),
		dim: f("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
		italic: f("\x1b[3m", "\x1b[23m"),
		underline: f("\x1b[4m", "\x1b[24m"),
		inverse: f("\x1b[7m", "\x1b[27m"),
		hidden: f("\x1b[8m", "\x1b[28m"),
		strikethrough: f("\x1b[9m", "\x1b[29m"),

		black: f("\x1b[30m", "\x1b[39m"),
		red: f("\x1b[31m", "\x1b[39m"),
		green: f("\x1b[32m", "\x1b[39m"),
		yellow: f("\x1b[33m", "\x1b[39m"),
		blue: f("\x1b[34m", "\x1b[39m"),
		magenta: f("\x1b[35m", "\x1b[39m"),
		cyan: f("\x1b[36m", "\x1b[39m"),
		white: f("\x1b[37m", "\x1b[39m"),
		gray: f("\x1b[90m", "\x1b[39m"),

		bgBlack: f("\x1b[40m", "\x1b[49m"),
		bgRed: f("\x1b[41m", "\x1b[49m"),
		bgGreen: f("\x1b[42m", "\x1b[49m"),
		bgYellow: f("\x1b[43m", "\x1b[49m"),
		bgBlue: f("\x1b[44m", "\x1b[49m"),
		bgMagenta: f("\x1b[45m", "\x1b[49m"),
		bgCyan: f("\x1b[46m", "\x1b[49m"),
		bgWhite: f("\x1b[47m", "\x1b[49m"),

		blackBright: f("\x1b[90m", "\x1b[39m"),
		redBright: f("\x1b[91m", "\x1b[39m"),
		greenBright: f("\x1b[92m", "\x1b[39m"),
		yellowBright: f("\x1b[93m", "\x1b[39m"),
		blueBright: f("\x1b[94m", "\x1b[39m"),
		magentaBright: f("\x1b[95m", "\x1b[39m"),
		cyanBright: f("\x1b[96m", "\x1b[39m"),
		whiteBright: f("\x1b[97m", "\x1b[39m"),

		bgBlackBright: f("\x1b[100m", "\x1b[49m"),
		bgRedBright: f("\x1b[101m", "\x1b[49m"),
		bgGreenBright: f("\x1b[102m", "\x1b[49m"),
		bgYellowBright: f("\x1b[103m", "\x1b[49m"),
		bgBlueBright: f("\x1b[104m", "\x1b[49m"),
		bgMagentaBright: f("\x1b[105m", "\x1b[49m"),
		bgCyanBright: f("\x1b[106m", "\x1b[49m"),
		bgWhiteBright: f("\x1b[107m", "\x1b[49m"),
	}
}

module.exports = createColors()
module.exports.createColors = createColors


/***/ }),

/***/ 11868:
/***/ ((module) => {

"use strict";

module.exports = rfdc

function copyBuffer (cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

function rfdc (opts) {
  opts = opts || {}
  if (opts.circles) return rfdcCircles(opts)

  const constructorHandlers = new Map()
  constructorHandlers.set(Date, (o) => new Date(o))
  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)))
  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)))
  if (opts.constructorHandlers) {
    for (const handler of opts.constructorHandlers) {
      constructorHandlers.set(handler[0], handler[1])
    }
  }

  let handler = null

  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    const keys = Object.keys(a)
    const a2 = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      const cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        a2[k] = handler(cur, fn)
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur)
      } else {
        a2[k] = fn(cur)
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, clone)
    }
    const o2 = {}
    for (const k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, clone)
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        o2[k] = clone(cur)
      }
    }
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, cloneProto)
    }
    const o2 = {}
    for (const k in o) {
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, cloneProto)
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        o2[k] = cloneProto(cur)
      }
    }
    return o2
  }
}

function rfdcCircles (opts) {
  const refs = []
  const refsNew = []

  const constructorHandlers = new Map()
  constructorHandlers.set(Date, (o) => new Date(o))
  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)))
  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)))
  if (opts.constructorHandlers) {
    for (const handler of opts.constructorHandlers) {
      constructorHandlers.set(handler[0], handler[1])
    }
  }

  let handler = null
  return opts.proto ? cloneProto : clone

  function cloneArray (a, fn) {
    const keys = Object.keys(a)
    const a2 = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]
      const cur = a[k]
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        a2[k] = handler(cur, fn)
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur)
      } else {
        const index = refs.indexOf(cur)
        if (index !== -1) {
          a2[k] = refsNew[index]
        } else {
          a2[k] = fn(cur)
        }
      }
    }
    return a2
  }

  function clone (o) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, clone)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, clone)
    }
    const o2 = {}
    refs.push(o)
    refsNew.push(o2)
    for (const k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) continue
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, clone)
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        const i = refs.indexOf(cur)
        if (i !== -1) {
          o2[k] = refsNew[i]
        } else {
          o2[k] = clone(cur)
        }
      }
    }
    refs.pop()
    refsNew.pop()
    return o2
  }

  function cloneProto (o) {
    if (typeof o !== 'object' || o === null) return o
    if (Array.isArray(o)) return cloneArray(o, cloneProto)
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, cloneProto)
    }
    const o2 = {}
    refs.push(o)
    refsNew.push(o2)
    for (const k in o) {
      const cur = o[k]
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, cloneProto)
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur)
      } else {
        const i = refs.indexOf(cur)
        if (i !== -1) {
          o2[k] = refsNew[i]
        } else {
          o2[k] = cloneProto(cur)
        }
      }
    }
    refs.pop()
    refsNew.pop()
    return o2
  }
}


/***/ }),

/***/ 45591:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const ansiRegex = __nccwpck_require__(65063);

module.exports = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;


/***/ }),

/***/ 59318:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const os = __nccwpck_require__(22037);
const tty = __nccwpck_require__(76224);
const hasFlag = __nccwpck_require__(31621);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 39491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 50852:
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 14300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 32081:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 9523:
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ 82361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 73292:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 13685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 41808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 97742:
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ 22037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 79421:
/***/ ((module) => {

"use strict";
module.exports = require("prettier");

/***/ }),

/***/ 14521:
/***/ ((module) => {

"use strict";
module.exports = require("readline");

/***/ }),

/***/ 12781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 71576:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 24404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 76224:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 29041:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "h": () => (/* binding */ assert),
  "is": () => (/* binding */ is)
});

// UNUSED EXPORTS: AssertionError

;// CONCATENATED MODULE: ./node_modules/tsafe/esm/lab/overwriteReadonlyProp.mjs
/**
 * Assign a value to a property even if the object is freezed or if the property is not writable
 * Throw if the assignation fail ( for example if the property is non configurable write: false )
 * */
const overwriteReadonlyProp = (obj, propertyName, value) => {
    try {
        obj[propertyName] = value;
    }
    catch { }
    if (obj[propertyName] === value) {
        return value;
    }
    let errorDefineProperty = undefined;
    const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propertyName) || {
        "enumerable": true,
        "configurable": true,
    };
    if (!!propertyDescriptor.get) {
        throw new Error(`Probably a wrong ides to overwrite ${String(propertyName)} getter`);
    }
    try {
        Object.defineProperty(obj, propertyName, {
            ...propertyDescriptor,
            value,
        });
    }
    catch (error) {
        errorDefineProperty = error;
    }
    if (obj[propertyName] !== value) {
        throw errorDefineProperty || new Error("Can't assign");
    }
    return value;
};


//# sourceMappingURL=overwriteReadonlyProp.mjs.map

;// CONCATENATED MODULE: ./node_modules/tsafe/esm/assert.mjs


/** https://docs.tsafe.dev/assert#error-thrown */
class AssertionError extends Error {
    constructor(msg) {
        super(`Wrong assertion encountered` + (!msg ? "" : `: "${msg}"`));
        this.originalMessage = msg;
        Object.setPrototypeOf(this, new.target.prototype);
        if (!this.stack) {
            return;
        }
        try {
            overwriteReadonlyProp(this, "stack", this.stack
                .split("\n")
                .filter((...[, i]) => i !== 1 && i !== 2)
                .join("\n"));
        }
        catch { }
    }
}
let refOfIs = undefined;
/** https://docs.tsafe.dev/assert */
function assert(condition, msg) {
    if (arguments.length === 0) {
        condition = true;
    }
    if (refOfIs !== undefined) {
        refOfIs = undefined;
        return;
    }
    if (!condition) {
        throw new AssertionError(typeof msg === "function" ? msg() : msg);
    }
}
const errorMessage = "Wrong usage of the `is` function refer to https://docs.tsafe.dev/is";
/** https://docs.tsafe.dev/is */
function is(value) {
    const ref = {};
    if (refOfIs !== undefined) {
        refOfIs = undefined;
        throw new Error(errorMessage);
    }
    refOfIs = ref;
    Promise.resolve().then(() => {
        if (refOfIs === ref) {
            throw new Error(errorMessage);
        }
    });
    return null;
}


//# sourceMappingURL=assert.mjs.map


/***/ }),

/***/ 83101:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ exclude)
/* harmony export */ });
/**
 * https://docs.tsafe.dev/exclude
 *
 * Return a function to use as Array.prototype.filter argument
 * to exclude one or many primitive value element from the array.
 * Ex: ([ "a", "b", "c" ] as const).filter(exclude("a")) return ("b" | "c")[]
 * Ex: ([ "a", "b", "c", "d"] as const).filter(exclude(["a", "b"]) gives ("c" | "d")[]
 */
function exclude(target) {
    const test = target instanceof Object
        ? element => target.indexOf(element) < 0
        : element => element !== target;
    return function (element) {
        return test(element);
    };
}


//# sourceMappingURL=exclude.mjs.map


/***/ }),

/***/ 38469:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "id": () => (/* binding */ id)
/* harmony export */ });
/** https://docs.tsafe.dev/id  */
const id = (x) => x;


//# sourceMappingURL=id.mjs.map


/***/ }),

/***/ 35674:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "NL": () => (/* binding */ ZodIssueCode),
/* harmony export */   "jm": () => (/* binding */ ZodError)
/* harmony export */ });
/* unused harmony export quotelessJson */
/* harmony import */ var _helpers_util_js__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(68609);

const ZodIssueCode = _helpers_util_js__WEBPACK_IMPORTED_MODULE_0__/* .util.arrayToEnum */ .D5.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    get errors() {
        return this.issues;
    }
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, _helpers_util_js__WEBPACK_IMPORTED_MODULE_0__/* .util.jsonStringifyReplacer */ .D5.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                const firstEl = sub.path[0];
                fieldErrors[firstEl] = fieldErrors[firstEl] || [];
                fieldErrors[firstEl].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};


/***/ }),

/***/ 68609:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "$k": () => (/* binding */ ZodParsedType),
/* harmony export */   "D5": () => (/* binding */ util),
/* harmony export */   "FQ": () => (/* binding */ getParsedType)
/* harmony export */ });
/* unused harmony export objectUtil */
var util;
(function (util) {
    util.assertEqual = (_) => { };
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array.map((val) => (typeof val === "string" ? `'${val}'` : val)).join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};


/***/ }),

/***/ 49622:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "Yj": () => (/* binding */ anyType),
  "IX": () => (/* binding */ arrayType),
  "O7": () => (/* binding */ booleanType),
  "jV": () => (/* binding */ intersectionType),
  "i0": () => (/* binding */ literalType),
  "lB": () => (/* binding */ nullType),
  "Rx": () => (/* binding */ numberType),
  "Ry": () => (/* binding */ objectType),
  "IM": () => (/* binding */ recordType),
  "Z_": () => (/* binding */ stringType),
  "S1": () => (/* binding */ undefinedType),
  "G0": () => (/* binding */ unionType),
  "_4": () => (/* binding */ unknownType)
});

// UNUSED EXPORTS: BRAND, NEVER, Schema, ZodAny, ZodArray, ZodBigInt, ZodBoolean, ZodBranded, ZodCatch, ZodDate, ZodDefault, ZodDiscriminatedUnion, ZodEffects, ZodEnum, ZodFirstPartyTypeKind, ZodFunction, ZodIntersection, ZodLazy, ZodLiteral, ZodMap, ZodNaN, ZodNativeEnum, ZodNever, ZodNull, ZodNullable, ZodNumber, ZodObject, ZodOptional, ZodPipeline, ZodPromise, ZodReadonly, ZodRecord, ZodSchema, ZodSet, ZodString, ZodSymbol, ZodTransformer, ZodTuple, ZodType, ZodUndefined, ZodUnion, ZodUnknown, ZodVoid, bigint, coerce, custom, date, datetimeRegex, discriminatedUnion, effect, enum, function, instanceof, late, lazy, map, nan, nativeEnum, never, nullable, oboolean, onumber, optional, ostring, pipeline, preprocess, promise, set, strictObject, symbol, transformer, tuple, void

// EXTERNAL MODULE: ./node_modules/zod/v3/ZodError.js
var ZodError = __nccwpck_require__(35674);
// EXTERNAL MODULE: ./node_modules/zod/v3/helpers/util.js
var util = __nccwpck_require__(68609);
;// CONCATENATED MODULE: ./node_modules/zod/v3/locales/en.js


const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type:
            if (issue.received === util/* ZodParsedType.undefined */.$k.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodError/* ZodIssueCode.invalid_literal */.NL.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util/* util.jsonStringifyReplacer */.D5.jsonStringifyReplacer)}`;
            break;
        case ZodError/* ZodIssueCode.unrecognized_keys */.NL.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util/* util.joinValues */.D5.joinValues(issue.keys, ", ")}`;
            break;
        case ZodError/* ZodIssueCode.invalid_union */.NL.invalid_union:
            message = `Invalid input`;
            break;
        case ZodError/* ZodIssueCode.invalid_union_discriminator */.NL.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util/* util.joinValues */.D5.joinValues(issue.options)}`;
            break;
        case ZodError/* ZodIssueCode.invalid_enum_value */.NL.invalid_enum_value:
            message = `Invalid enum value. Expected ${util/* util.joinValues */.D5.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodError/* ZodIssueCode.invalid_arguments */.NL.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodError/* ZodIssueCode.invalid_return_type */.NL.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodError/* ZodIssueCode.invalid_date */.NL.invalid_date:
            message = `Invalid date`;
            break;
        case ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util/* util.assertNever */.D5.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodError/* ZodIssueCode.too_small */.NL.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "bigint")
                message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodError/* ZodIssueCode.too_big */.NL.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodError/* ZodIssueCode.custom */.NL.custom:
            message = `Invalid input`;
            break;
        case ZodError/* ZodIssueCode.invalid_intersection_types */.NL.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodError/* ZodIssueCode.not_multiple_of */.NL.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodError/* ZodIssueCode.not_finite */.NL.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util/* util.assertNever */.D5.assertNever(issue);
    }
    return { message };
};
/* harmony default export */ const en = (errorMap);

;// CONCATENATED MODULE: ./node_modules/zod/v3/errors.js

let overrideErrorMap = en;

function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}

;// CONCATENATED MODULE: ./node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    // biome-ignore lint:
    errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

;// CONCATENATED MODULE: ./node_modules/zod/v3/helpers/parseUtil.js


const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = (/* unused pure expression or super */ null && ([]));
function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap, // contextual error map is first priority
            ctx.schemaErrorMap, // then schema-bound map if available
            overrideMap, // then global override map
            overrideMap === en ? undefined : en, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return parseUtil_INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return parseUtil_INVALID;
            if (value.status === "aborted")
                return parseUtil_INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const parseUtil_INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

;// CONCATENATED MODULE: ./node_modules/zod/v3/types.js





class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (Array.isArray(this._key)) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError/* ZodError */.jm(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message ?? ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: message ?? required_error ?? ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: message ?? invalid_type_error ?? ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return (0,util/* getParsedType */.FQ)(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: (0,util/* getParsedType */.FQ)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: (0,util/* getParsedType */.FQ)(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        const ctx = {
            common: {
                issues: [],
                async: params?.async ?? false,
                contextualErrorMap: params?.errorMap,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0,util/* getParsedType */.FQ)(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    "~validate"(data) {
        const ctx = {
            common: {
                issues: [],
                async: !!this["~standard"].async,
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0,util/* getParsedType */.FQ)(data),
        };
        if (!this["~standard"].async) {
            try {
                const result = this._parseSync({ data, path: [], parent: ctx });
                return isValid(result)
                    ? {
                        value: result.value,
                    }
                    : {
                        issues: ctx.common.issues,
                    };
            }
            catch (err) {
                if (err?.message?.toLowerCase()?.includes("encountered")) {
                    this["~standard"].async = true;
                }
                ctx.common = {
                    issues: [],
                    async: true,
                };
            }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result)
            ? {
                value: result.value,
            }
            : {
                issues: ctx.common.issues,
            });
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params?.errorMap,
                async: true,
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0,util/* getParsedType */.FQ)(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodError/* ZodIssueCode.custom */.NL.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (data) => this["~validate"](data),
        };
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
// const ipv6Regex =
// /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// https://base64.guru/standards/base64url
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    let secondsRegexSource = `[0-5]\\d`;
    if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
    }
    const secondsQuantifier = args.precision ? "+" : "?"; // require seconds if precision is nonzero
    return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
function isValidJWT(jwt, alg) {
    if (!jwtRegex.test(jwt))
        return false;
    try {
        const [header] = jwt.split(".");
        if (!header)
            return false;
        // Convert base64url to base64
        const base64 = header
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null)
            return false;
        if ("typ" in decoded && decoded?.typ !== "JWT")
            return false;
        if (!decoded.alg)
            return false;
        if (alg && decoded.alg !== alg)
            return false;
        return true;
    }
    catch {
        return false;
    }
}
function isValidCidr(ip, version) {
    if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.string */.$k.string) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.string */.$k.string,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "emoji",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "nanoid",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid2",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ulid",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "duration",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ip",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "jwt") {
                if (!isValidJWT(input.data, check.alg)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "jwt",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cidr") {
                if (!isValidCidr(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cidr",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64url") {
                if (!base64urlRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64url",
                        code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util/* util.assertNever */.D5.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodError/* ZodIssueCode.invalid_string */.NL.invalid_string,
            ...errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    base64url(message) {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return this._addCheck({
            kind: "base64url",
            ...errorUtil.errToObj(message),
        });
    }
    jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            offset: options?.offset ?? false,
            local: options?.local ?? false,
            ...errorUtil.errToObj(options?.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof options?.precision === "undefined" ? null : options?.precision,
            ...errorUtil.errToObj(options?.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options?.position,
            ...errorUtil.errToObj(options?.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil.errToObj(message),
        });
    }
    /**
     * Equivalent to `.min(1)`
     */
    nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get isBase64url() {
        // base64url encoding is a modification of base64 that can safely be used in URLs and filenames
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.number */.$k.number) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.number */.$k.number,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util/* util.isInteger */.D5.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.not_multiple_of */.NL.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.not_finite */.NL.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util/* util.assertNever */.D5.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || (ch.kind === "multipleOf" && util/* util.isInteger */.D5.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            try {
                input.data = BigInt(input.data);
            }
            catch {
                return this._getInvalidInput(input);
            }
        }
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.bigint */.$k.bigint) {
            return this._getInvalidInput(input);
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.not_multiple_of */.NL.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util/* util.assertNever */.D5.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
            expected: util/* ZodParsedType.bigint */.$k.bigint,
            received: ctx.parsedType,
        });
        return parseUtil_INVALID;
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.boolean */.$k.boolean) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.boolean */.$k.boolean,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.date */.$k.date) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.date */.$k.date,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_date */.NL.invalid_date,
            });
            return parseUtil_INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util/* util.assertNever */.D5.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.symbol */.$k.symbol) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.symbol */.$k.symbol,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.undefined */.$k.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.undefined */.$k.undefined,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.null */.$k["null"]) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.null */.$k["null"],
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
            expected: util/* ZodParsedType.never */.$k.never,
            received: ctx.parsedType,
        });
        return parseUtil_INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.undefined */.$k.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.void */.$k["void"],
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util/* ZodParsedType.array */.$k.array) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.array */.$k.array,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                addIssueToContext(ctx, {
                    code: tooBig ? ZodError/* ZodIssueCode.too_big */.NL.too_big : ZodError/* ZodIssueCode.too_small */.NL.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util/* util.objectKeys */.D5.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.object */.$k.object) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.object */.$k.object,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodError/* ZodIssueCode.unrecognized_keys */.NL.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") {
            }
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: errorUtil.errToObj(message).message ?? defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        for (const key of util/* util.objectKeys */.D5.objectKeys(mask)) {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        for (const key of util/* util.objectKeys */.D5.objectKeys(this.shape)) {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        for (const key of util/* util.objectKeys */.D5.objectKeys(this.shape)) {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        for (const key of util/* util.objectKeys */.D5.objectKeys(this.shape)) {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        }
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util/* util.objectKeys */.D5.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError/* ZodError */.jm(result.ctx.common.issues));
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_union */.NL.invalid_union,
                unionErrors,
            });
            return parseUtil_INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError/* ZodError */.jm(issues));
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_union */.NL.invalid_union,
                unionErrors,
            });
            return parseUtil_INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util/* util.objectValues */.D5.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.object */.$k.object) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.object */.$k.object,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_union_discriminator */.NL.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return parseUtil_INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = (0,util/* getParsedType */.FQ)(a);
    const bType = (0,util/* getParsedType */.FQ)(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === util/* ZodParsedType.object */.$k.object && bType === util/* ZodParsedType.object */.$k.object) {
        const bKeys = util/* util.objectKeys */.D5.objectKeys(b);
        const sharedKeys = util/* util.objectKeys */.D5.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === util/* ZodParsedType.array */.$k.array && bType === util/* ZodParsedType.array */.$k.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === util/* ZodParsedType.date */.$k.date && bType === util/* ZodParsedType.date */.$k.date && +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return parseUtil_INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodError/* ZodIssueCode.invalid_intersection_types */.NL.invalid_intersection_types,
                });
                return parseUtil_INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
// type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.array */.$k.array) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.array */.$k.array,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return parseUtil_INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.object */.$k.object) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.object */.$k.object,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.map */.$k.map) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.map */.$k.map,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return parseUtil_INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return parseUtil_INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.set */.$k.set) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.set */.$k.set,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodError/* ZodIssueCode.too_small */.NL.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodError/* ZodIssueCode.too_big */.NL.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return parseUtil_INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.function */.$k["function"]) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.function */.$k["function"],
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en].filter((x) => !!x),
                issueData: {
                    code: ZodError/* ZodIssueCode.invalid_arguments */.NL.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en].filter((x) => !!x),
                issueData: {
                    code: ZodError/* ZodIssueCode.invalid_return_type */.NL.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(async function (...args) {
                const error = new ZodError/* ZodError */.jm([]);
                const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError/* ZodError */.jm([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError/* ZodError */.jm([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args ? args : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodError/* ZodIssueCode.invalid_literal */.NL.invalid_literal,
                expected: this._def.value,
            });
            return parseUtil_INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                expected: util/* util.joinValues */.D5.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
            });
            return parseUtil_INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodError/* ZodIssueCode.invalid_enum_value */.NL.invalid_enum_value,
                options: expectedValues,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    _parse(input) {
        const nativeEnumValues = util/* util.getValidEnumValues */.D5.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util/* ZodParsedType.string */.$k.string && ctx.parsedType !== util/* ZodParsedType.number */.$k.number) {
            const expectedValues = util/* util.objectValues */.D5.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                expected: util/* util.joinValues */.D5.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
            });
            return parseUtil_INVALID;
        }
        if (!this._cache) {
            this._cache = new Set(util/* util.getValidEnumValues */.D5.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
            const expectedValues = util/* util.objectValues */.D5.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodError/* ZodIssueCode.invalid_enum_value */.NL.invalid_enum_value,
                options: expectedValues,
            });
            return parseUtil_INVALID;
        }
        return OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util/* ZodParsedType.promise */.$k.promise && ctx.common.async === false) {
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.promise */.$k.promise,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        const promisified = ctx.parsedType === util/* ZodParsedType.promise */.$k.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return parseUtil_INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return parseUtil_INVALID;
                    if (result.status === "dirty")
                        return DIRTY(result.value);
                    if (status.value === "dirty")
                        return DIRTY(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return parseUtil_INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return parseUtil_INVALID;
                if (result.status === "dirty")
                    return DIRTY(result.value);
                if (status.value === "dirty")
                    return DIRTY(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return parseUtil_INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
                    if (inner.status === "aborted")
                        return parseUtil_INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!isValid(base))
                    return parseUtil_INVALID;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
                    if (!isValid(base))
                        return parseUtil_INVALID;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                        status: status.value,
                        value: result,
                    }));
                });
            }
        }
        util/* util.assertNever */.D5.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};

class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util/* ZodParsedType.undefined */.$k.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util/* ZodParsedType.null */.$k["null"]) {
            return OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util/* ZodParsedType.undefined */.$k.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if (isAsync(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError/* ZodError */.jm(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError/* ZodError */.jm(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util/* ZodParsedType.nan */.$k.nan) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodError/* ZodIssueCode.invalid_type */.NL.invalid_type,
                expected: util/* ZodParsedType.nan */.$k.nan,
                received: ctx.parsedType,
            });
            return parseUtil_INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return parseUtil_INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return DIRTY(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return parseUtil_INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if (isValid(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      z.custom      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////
function cleanParams(params, data) {
    const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
    const p2 = typeof p === "string" ? { message: p } : p;
    return p2;
}
function custom(check, _params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            const r = check(data);
            if (r instanceof Promise) {
                return r.then((r) => {
                    if (!r) {
                        const params = cleanParams(_params, data);
                        const _fatal = params.fatal ?? fatal ?? true;
                        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
                    }
                });
            }
            if (!r) {
                const params = cleanParams(_params, data);
                const _fatal = params.fatal ?? fatal ?? true;
                ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
            }
            return;
        });
    return ZodAny.create();
}

const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
// requires TS 4.4+
class Class {
    constructor(..._) { }
}
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};

const NEVER = (/* unused pure expression or super */ null && (INVALID));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nccwpck_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__nccwpck_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__nccwpck_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__nccwpck_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__nccwpck_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__nccwpck_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 				__nccwpck_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__nccwpck_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__nccwpck_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__nccwpck_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			179: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__nccwpck_require__.o(moreModules, moduleId)) {
/******/ 					__nccwpck_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nccwpck_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__nccwpck_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __nccwpck_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __nccwpck_require__(32081);
// EXTERNAL MODULE: ./node_modules/picocolors/picocolors.js
var picocolors = __nccwpck_require__(37023);
// EXTERNAL MODULE: ./node_modules/enquirer/index.js
var enquirer = __nccwpck_require__(56587);
// EXTERNAL MODULE: ./node_modules/eventemitter3/index.js
var eventemitter3 = __nccwpck_require__(11848);
;// CONCATENATED MODULE: ./node_modules/eventemitter3/index.mjs



/* harmony default export */ const node_modules_eventemitter3 = (eventemitter3);

// EXTERNAL MODULE: external "tty"
var external_tty_ = __nccwpck_require__(76224);
var external_tty_namespaceObject = /*#__PURE__*/__nccwpck_require__.t(external_tty_, 2);
;// CONCATENATED MODULE: ./node_modules/termost/node_modules/colorette/index.js


const {
  env = {},
  argv = [],
  platform = "",
} = typeof process === "undefined" ? {} : process

const isDisabled = "NO_COLOR" in env || argv.includes("--no-color")
const isForced = "FORCE_COLOR" in env || argv.includes("--color")
const isWindows = platform === "win32"
const isDumbTerminal = env.TERM === "dumb"

const isCompatibleTerminal =
  external_tty_namespaceObject && external_tty_.isatty && external_tty_.isatty(1) && env.TERM && !isDumbTerminal

const isCI =
  "CI" in env &&
  ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env)

const isColorSupported =
  !isDisabled &&
  (isForced || (isWindows && !isDumbTerminal) || isCompatibleTerminal || isCI)

const replaceClose = (
  index,
  string,
  close,
  replace,
  head = string.substring(0, index) + replace,
  tail = string.substring(index + close.length),
  next = tail.indexOf(close)
) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace))

const clearBleed = (index, string, open, close, replace) =>
  index < 0
    ? open + string + close
    : open + replaceClose(index, string, close, replace) + close

const filterEmpty =
  (open, close, replace = open, at = open.length + 1) =>
  (string) =>
    string || !(string === "" || string === undefined)
      ? clearBleed(
          ("" + string).indexOf(close, at),
          string,
          open,
          close,
          replace
        )
      : ""

const init = (open, close, replace) =>
  filterEmpty(`\x1b[${open}m`, `\x1b[${close}m`, replace)

const colors = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1b[22m\x1b[1m"),
  dim: init(2, 22, "\x1b[22m\x1b[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49),
}

const createColors = ({ useColor = isColorSupported } = {}) =>
  useColor
    ? colors
    : Object.keys(colors).reduce(
        (colors, key) => ({ ...colors, [key]: String }),
        {}
      )

const {
  reset: colorette_reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden: colorette_hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
} = createColors()

// EXTERNAL MODULE: external "util"
var external_util_ = __nccwpck_require__(73837);
// EXTERNAL MODULE: external "os"
var external_os_ = __nccwpck_require__(22037);
// EXTERNAL MODULE: external "string_decoder"
var external_string_decoder_ = __nccwpck_require__(71576);
// EXTERNAL MODULE: external "stream"
var external_stream_ = __nccwpck_require__(12781);
// EXTERNAL MODULE: ./node_modules/rfdc/index.js
var rfdc = __nccwpck_require__(11868);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __nccwpck_require__(6113);
;// CONCATENATED MODULE: ./node_modules/termost/node_modules/listr2/dist/index.js
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/constants/ansi-escape-codes.constants.ts
var ANSI_ESCAPE = "\x1B[";
var ANSI_ESCAPE_CODES = {
  CURSOR_HIDE: ANSI_ESCAPE + "?25l",
  CURSOR_SHOW: ANSI_ESCAPE + "?25h"
};

// src/constants/environment-variables.constants.ts
var ListrEnvironmentVariables = /* @__PURE__ */ ((ListrEnvironmentVariables2) => {
  ListrEnvironmentVariables2["FORCE_UNICODE"] = "LISTR_FORCE_UNICODE";
  ListrEnvironmentVariables2["FORCE_TTY"] = "LISTR_FORCE_TTY";
  ListrEnvironmentVariables2["DISABLE_COLOR"] = "NO_COLOR";
  ListrEnvironmentVariables2["FORCE_COLOR"] = "FORCE_COLOR";
  return ListrEnvironmentVariables2;
})(ListrEnvironmentVariables || {});

// src/constants/listr-error.constants.ts
var ListrErrorTypes = /* @__PURE__ */ ((ListrErrorTypes2) => {
  ListrErrorTypes2["WILL_RETRY"] = "WILL_RETRY";
  ListrErrorTypes2["WILL_ROLLBACK"] = "WILL_ROLLBACK";
  ListrErrorTypes2["HAS_FAILED_TO_ROLLBACK"] = "HAS_FAILED_TO_ROLLBACK";
  ListrErrorTypes2["HAS_FAILED"] = "HAS_FAILED";
  ListrErrorTypes2["HAS_FAILED_WITHOUT_ERROR"] = "HAS_FAILED_WITHOUT_ERROR";
  return ListrErrorTypes2;
})(ListrErrorTypes || {});

// src/constants/listr-events.constants.ts
var ListrEventType = /* @__PURE__ */ ((ListrEventType2) => {
  ListrEventType2["SHOULD_REFRESH_RENDER"] = "SHOUD_REFRESH_RENDER";
  return ListrEventType2;
})(ListrEventType || {});

// src/constants/listr-renderer.constants.ts
var ListrRendererSelection = /* @__PURE__ */ ((ListrRendererSelection2) => {
  ListrRendererSelection2["PRIMARY"] = "PRIMARY";
  ListrRendererSelection2["SECONDARY"] = "SECONDARY";
  ListrRendererSelection2["SILENT"] = "SILENT";
  return ListrRendererSelection2;
})(ListrRendererSelection || {});

// src/constants/listr-task-events.constants.ts
var ListrTaskEventType = /* @__PURE__ */ ((ListrTaskEventType2) => {
  ListrTaskEventType2["TITLE"] = "TITLE";
  ListrTaskEventType2["STATE"] = "STATE";
  ListrTaskEventType2["ENABLED"] = "ENABLED";
  ListrTaskEventType2["SUBTASK"] = "SUBTASK";
  ListrTaskEventType2["PROMPT"] = "PROMPT";
  ListrTaskEventType2["OUTPUT"] = "OUTPUT";
  ListrTaskEventType2["MESSAGE"] = "MESSAGE";
  ListrTaskEventType2["CLOSED"] = "CLOSED";
  return ListrTaskEventType2;
})(ListrTaskEventType || {});

// src/constants/listr-task-state.constants.ts
var ListrTaskState = /* @__PURE__ */ ((ListrTaskState2) => {
  ListrTaskState2["WAITING"] = "WAITING";
  ListrTaskState2["STARTED"] = "STARTED";
  ListrTaskState2["COMPLETED"] = "COMPLETED";
  ListrTaskState2["FAILED"] = "FAILED";
  ListrTaskState2["SKIPPED"] = "SKIPPED";
  ListrTaskState2["ROLLING_BACK"] = "ROLLING_BACK";
  ListrTaskState2["ROLLED_BACK"] = "ROLLED_BACK";
  ListrTaskState2["RETRY"] = "RETRY";
  ListrTaskState2["PAUSED"] = "PAUSED";
  ListrTaskState2["PROMPT"] = "PROMPT";
  ListrTaskState2["PROMPT_COMPLETED"] = "PROMPT_COMPLETED";
  ListrTaskState2["PROMPT_FAILED"] = "PROMPT_FAILED";
  return ListrTaskState2;
})(ListrTaskState || {});

// src/lib/event-manager.ts

var EventManager = class {
  static {
    __name(this, "EventManager");
  }
  emitter = new node_modules_eventemitter3();
  emit(dispatch, args) {
    this.emitter.emit(dispatch, args);
  }
  on(dispatch, handler) {
    this.emitter.addListener(dispatch, handler);
  }
  once(dispatch, handler) {
    this.emitter.once(dispatch, handler);
  }
  off(dispatch, handler) {
    this.emitter.off(dispatch, handler);
  }
  complete() {
    this.emitter.removeAllListeners();
  }
};

// src/interfaces/event.interface.ts
var BaseEventMap = class {
  static {
    __name(this, "BaseEventMap");
  }
};

// src/utils/environment/is-observable.ts
function isObservable(obj) {
  return !!obj && typeof obj === "object" && typeof obj.lift === "function" && typeof obj.subscribe === "function";
}
__name(isObservable, "isObservable");

// src/utils/environment/is-readable.ts
function isReadable(obj) {
  return !!obj && typeof obj === "object" && obj.readable === true && typeof obj.read === "function" && typeof obj.on === "function";
}
__name(isReadable, "isReadable");

// src/utils/environment/is-unicode-supported.ts
function isUnicodeSupported() {
  return !!process.env["LISTR_FORCE_UNICODE" /* FORCE_UNICODE */] || process.platform !== "win32" || !!process.env.CI || !!process.env.WT_SESSION || process.env.TERM_PROGRAM === "vscode" || process.env.TERM === "xterm-256color" || process.env.TERM === "alacritty";
}
__name(isUnicodeSupported, "isUnicodeSupported");

// src/utils/format/cleanse-ansi.constants.ts
var CLEAR_LINE_REGEX = "(?:\\u001b|\\u009b)\\[[\\=><~/#&.:=?%@~_-]*[0-9]*[\\a-ln-tqyz=><~/#&.:=?%@~_-]+";
var BELL_REGEX = /\u0007/;

// src/utils/format/cleanse-ansi.ts
function cleanseAnsi(chunk) {
  return String(chunk).replace(new RegExp(CLEAR_LINE_REGEX, "gmi"), "").replace(new RegExp(BELL_REGEX, "gmi"), "").trim();
}
__name(cleanseAnsi, "cleanseAnsi");

// src/utils/format/color.ts

var color = createColors();

// src/utils/format/indent.ts
function indent(string, count) {
  return string.replace(/^(?!\s*$)/gm, " ".repeat(count));
}
__name(indent, "indent");

// src/utils/format/figures.ts
var FIGURES_MAIN = {
  warning: "\u26A0",
  cross: "\u2716",
  arrowDown: "\u2193",
  tick: "\u2714",
  arrowRight: "\u2192",
  pointer: "\u276F",
  checkboxOn: "\u2612",
  arrowLeft: "\u2190",
  squareSmallFilled: "\u25FC",
  pointerSmall: "\u203A"
};
var FIGURES_FALLBACK = {
  ...FIGURES_MAIN,
  warning: "\u203C",
  cross: "\xD7",
  tick: "\u221A",
  pointer: ">",
  checkboxOn: "[\xD7]",
  squareSmallFilled: "\u25A0"
};
var figures = isUnicodeSupported() ? FIGURES_MAIN : FIGURES_FALLBACK;

// src/utils/format/splat.ts

function splat(message, ...splat2) {
  return (0,external_util_.format)(String(message), ...splat2);
}
__name(splat, "splat");

// src/utils/logger/logger.constants.ts
var ListrLogLevels = /* @__PURE__ */ ((ListrLogLevels2) => {
  ListrLogLevels2["STARTED"] = "STARTED";
  ListrLogLevels2["COMPLETED"] = "COMPLETED";
  ListrLogLevels2["FAILED"] = "FAILED";
  ListrLogLevels2["SKIPPED"] = "SKIPPED";
  ListrLogLevels2["OUTPUT"] = "OUTPUT";
  ListrLogLevels2["TITLE"] = "TITLE";
  ListrLogLevels2["ROLLBACK"] = "ROLLBACK";
  ListrLogLevels2["RETRY"] = "RETRY";
  ListrLogLevels2["PROMPT"] = "PROMPT";
  ListrLogLevels2["PAUSED"] = "PAUSED";
  return ListrLogLevels2;
})(ListrLogLevels || {});
var LISTR_LOGGER_STYLE = {
  icon: {
    ["STARTED" /* STARTED */]: figures.pointer,
    ["FAILED" /* FAILED */]: figures.cross,
    ["SKIPPED" /* SKIPPED */]: figures.arrowDown,
    ["COMPLETED" /* COMPLETED */]: figures.tick,
    ["OUTPUT" /* OUTPUT */]: figures.pointerSmall,
    ["TITLE" /* TITLE */]: figures.arrowRight,
    ["RETRY" /* RETRY */]: figures.warning,
    ["ROLLBACK" /* ROLLBACK */]: figures.arrowLeft,
    ["PAUSED" /* PAUSED */]: figures.squareSmallFilled
  },
  color: {
    ["STARTED" /* STARTED */]: color.yellow,
    ["FAILED" /* FAILED */]: color.red,
    ["SKIPPED" /* SKIPPED */]: color.yellow,
    ["COMPLETED" /* COMPLETED */]: color.green,
    ["RETRY" /* RETRY */]: color.yellowBright,
    ["ROLLBACK" /* ROLLBACK */]: color.redBright,
    ["PAUSED" /* PAUSED */]: color.yellowBright
  }
};
var LISTR_LOGGER_STDERR_LEVELS = ["RETRY" /* RETRY */, "ROLLBACK" /* ROLLBACK */, "FAILED" /* FAILED */];

// src/utils/logger/logger.ts

var ListrLogger = class {
  constructor(options) {
    this.options = options;
    this.options = {
      useIcons: true,
      toStderr: [],
      ...options ?? {}
    };
    this.options.fields ??= {};
    this.options.fields.prefix ??= [];
    this.options.fields.suffix ??= [];
    this.process = this.options.processOutput ?? new ProcessOutput();
  }
  static {
    __name(this, "ListrLogger");
  }
  process;
  log(level, message, options) {
    const output = this.format(level, message, options);
    if (this.options.toStderr.includes(level)) {
      this.process.toStderr(output);
      return;
    }
    this.process.toStdout(output);
  }
  toStdout(message, options, eol = true) {
    this.process.toStdout(this.format(null, message, options), eol);
  }
  toStderr(message, options, eol = true) {
    this.process.toStderr(this.format(null, message, options), eol);
  }
  wrap(message, options) {
    if (!message) {
      return message;
    }
    return this.applyFormat(`[${message}]`, options);
  }
  splat(...args) {
    const message = args.shift() ?? "";
    return args.length === 0 ? message : splat(message, args);
  }
  suffix(message, ...suffixes) {
    suffixes.filter(Boolean).forEach((suffix) => {
      message += this.spacing(message);
      if (typeof suffix === "string") {
        message += this.wrap(suffix);
      } else if (typeof suffix === "object") {
        suffix.args ??= [];
        if (typeof suffix.condition === "function" ? !suffix.condition(...suffix.args) : !(suffix.condition ?? true)) {
          return message;
        }
        message += this.wrap(typeof suffix.field === "function" ? suffix.field(...suffix.args) : suffix.field, {
          format: suffix?.format(...suffix.args)
        });
      }
    });
    return message;
  }
  prefix(message, ...prefixes) {
    prefixes.filter(Boolean).forEach((prefix) => {
      message = this.spacing(message) + message;
      if (typeof prefix === "string") {
        message = this.wrap(prefix) + message;
      } else if (typeof prefix === "object") {
        prefix.args ??= [];
        if (typeof prefix.condition === "function" ? !prefix.condition(...prefix.args) : !(prefix.condition ?? true)) {
          return message;
        }
        message = this.wrap(typeof prefix.field === "function" ? prefix.field(...prefix.args) : prefix.field, {
          format: prefix?.format()
        }) + message;
      }
    });
    return message;
  }
  fields(message, options) {
    if (this.options?.fields?.prefix) {
      message = this.prefix(message, ...this.options.fields.prefix);
    }
    if (options?.prefix) {
      message = this.prefix(message, ...options.prefix);
    }
    if (options?.suffix) {
      message = this.suffix(message, ...options.suffix);
    }
    if (this.options?.fields?.suffix) {
      message = this.suffix(message, ...this.options.fields.suffix);
    }
    return message;
  }
  icon(level, icon) {
    if (!level) {
      return null;
    }
    icon ||= this.options.icon?.[level];
    const coloring = this.options.color?.[level];
    if (icon && coloring) {
      icon = coloring(icon);
    }
    return icon;
  }
  format(level, message, options) {
    if (!Array.isArray(message)) {
      message = [message];
    }
    message = this.splat(message.shift(), ...message).toString().split(external_os_.EOL).filter((m) => !m || m.trim() !== "").map((m) => {
      return this.style(
        level,
        this.fields(m, {
          prefix: Array.isArray(options?.prefix) ? options.prefix : [options?.prefix],
          suffix: Array.isArray(options?.suffix) ? options.suffix : [options?.suffix]
        })
      );
    }).join(external_os_.EOL);
    return message;
  }
  style(level, message) {
    if (!level || !message) {
      return message;
    }
    const icon = this.icon(level, !this.options.useIcons && this.wrap(level));
    if (icon) {
      message = icon + " " + message;
    }
    return message;
  }
  applyFormat(message, options) {
    if (options?.format) {
      return options.format(message);
    }
    return message;
  }
  spacing(message) {
    return typeof message === "undefined" || message.trim() === "" ? "" : " ";
  }
};

// src/utils/process-output/process-output-buffer.ts

var ProcessOutputBuffer = class {
  constructor(options) {
    this.options = options;
  }
  static {
    __name(this, "ProcessOutputBuffer");
  }
  buffer = [];
  decoder = new external_string_decoder_.StringDecoder();
  get all() {
    return this.buffer;
  }
  get last() {
    return this.buffer.at(-1);
  }
  get length() {
    return this.buffer.length;
  }
  write(data, ...args) {
    const callback = args[args.length - 1];
    this.buffer.push({
      time: Date.now(),
      stream: this.options?.stream,
      entry: this.decoder.write(typeof data === "string" ? Buffer.from(data, typeof args[0] === "string" ? args[0] : void 0) : Buffer.from(data))
    });
    if (this.options?.limit) {
      this.buffer = this.buffer.slice(-this.options.limit);
    }
    if (typeof callback === "function") {
      callback();
    }
    return true;
  }
  reset() {
    this.buffer = [];
  }
};

// src/utils/process-output/process-output-stream.ts
var ProcessOutputStream = class {
  constructor(stream) {
    this.stream = stream;
    this.method = stream.write;
    this.buffer = new ProcessOutputBuffer({ stream });
  }
  static {
    __name(this, "ProcessOutputStream");
  }
  method;
  buffer;
  get out() {
    return Object.assign({}, this.stream, {
      write: this.write.bind(this)
    });
  }
  hijack() {
    this.stream.write = this.buffer.write.bind(this.buffer);
  }
  release() {
    this.stream.write = this.method;
    const buffer = [...this.buffer.all];
    this.buffer.reset();
    return buffer;
  }
  write(...args) {
    return this.method.apply(this.stream, args);
  }
};

// src/utils/process-output/process-output.ts

var ProcessOutput = class {
  constructor(stdout, stderr, options) {
    this.options = options;
    this.stream = {
      stdout: new ProcessOutputStream(stdout ?? process.stdout),
      stderr: new ProcessOutputStream(stderr ?? process.stderr)
    };
    this.options = {
      dump: ["stdout", "stderr"],
      leaveEmptyLine: true,
      ...options
    };
  }
  static {
    __name(this, "ProcessOutput");
  }
  stream;
  active;
  get stdout() {
    return this.stream.stdout.out;
  }
  get stderr() {
    return this.stream.stderr.out;
  }
  hijack() {
    if (this.active) {
      throw new Error("ProcessOutput has been already hijacked!");
    }
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE);
    Object.values(this.stream).forEach((stream) => stream.hijack());
    this.active = true;
  }
  release() {
    const output = Object.entries(this.stream).map(([name, stream]) => ({ name, buffer: stream.release() })).filter((output2) => this.options.dump.includes(output2.name)).flatMap((output2) => output2.buffer).sort((a, b) => a.time - b.time).map((message) => {
      return {
        ...message,
        entry: cleanseAnsi(message.entry)
      };
    }).filter((message) => message.entry);
    if (output.length > 0) {
      if (this.options.leaveEmptyLine) {
        this.stdout.write(external_os_.EOL);
      }
      output.forEach((message) => {
        const stream = message.stream ?? this.stdout;
        stream.write(message.entry + external_os_.EOL);
      });
    }
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW);
    this.active = false;
  }
  toStdout(buffer, eol = true) {
    if (eol) {
      buffer = buffer + external_os_.EOL;
    }
    return this.stream.stdout.write(buffer);
  }
  toStderr(buffer, eol = true) {
    if (eol) {
      buffer = buffer + external_os_.EOL;
    }
    return this.stream.stderr.write(buffer);
  }
};

// src/utils/process-output/writable.ts

function createWritable(cb) {
  const writable = new external_stream_.Writable();
  writable.write = (chunk) => {
    cb(chunk.toString());
    return true;
  };
  return writable;
}
__name(createWritable, "createWritable");

// src/utils/prompts/adapter.ts
var ListrPromptAdapter = class {
  constructor(task, wrapper) {
    this.task = task;
    this.wrapper = wrapper;
  }
  static {
    __name(this, "ListrPromptAdapter");
  }
  state;
  reportStarted() {
    this.state = this.task.state;
    if (this.task.prompt) {
      throw new PromptError("There is already an active prompt attached to this task which may not be cleaned up properly.");
    }
    this.task.prompt = this;
    this.task.state$ = "PROMPT" /* PROMPT */;
  }
  reportFailed() {
    this.task.state$ = "PROMPT_FAILED" /* PROMPT_FAILED */;
    this.restoreState();
  }
  reportCompleted() {
    this.task.state$ = "PROMPT_COMPLETED" /* PROMPT_COMPLETED */;
    this.restoreState();
  }
  restoreState() {
    this.task.prompt = void 0;
    if (this.state) {
      this.task.state = this.state;
    }
  }
};

// src/utils/ui/spinner.ts
var Spinner = class {
  static {
    __name(this, "Spinner");
  }
  spinner = !isUnicodeSupported() ? ["-", "\\", "|", "/"] : ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
  id;
  spinnerPosition = 0;
  spin() {
    this.spinnerPosition = ++this.spinnerPosition % this.spinner.length;
  }
  fetch() {
    return this.spinner[this.spinnerPosition];
  }
  isRunning() {
    return !!this.id;
  }
  start(cb, interval = 100) {
    this.id = setInterval(() => {
      this.spin();
      if (cb) {
        cb();
      }
    }, interval);
  }
  stop() {
    clearInterval(this.id);
  }
};

// src/renderer/default/renderer.constants.ts
var ListrDefaultRendererLogLevels = /* @__PURE__ */ ((ListrDefaultRendererLogLevels2) => {
  ListrDefaultRendererLogLevels2["SKIPPED_WITH_COLLAPSE"] = "SKIPPED_WITH_COLLAPSE";
  ListrDefaultRendererLogLevels2["SKIPPED_WITHOUT_COLLAPSE"] = "SKIPPED_WITHOUT_COLLAPSE";
  ListrDefaultRendererLogLevels2["OUTPUT"] = "OUTPUT";
  ListrDefaultRendererLogLevels2["OUTPUT_WITH_BOTTOMBAR"] = "OUTPUT_WITH_BOTTOMBAR";
  ListrDefaultRendererLogLevels2["PENDING"] = "PENDING";
  ListrDefaultRendererLogLevels2["COMPLETED"] = "COMPLETED";
  ListrDefaultRendererLogLevels2["COMPLETED_WITH_FAILED_SUBTASKS"] = "COMPLETED_WITH_FAILED_SUBTASKS";
  ListrDefaultRendererLogLevels2["COMPLETED_WITH_FAILED_SISTER_TASKS"] = "COMPLETED_WITH_SISTER_TASKS_FAILED";
  ListrDefaultRendererLogLevels2["RETRY"] = "RETRY";
  ListrDefaultRendererLogLevels2["ROLLING_BACK"] = "ROLLING_BACK";
  ListrDefaultRendererLogLevels2["ROLLED_BACK"] = "ROLLED_BACK";
  ListrDefaultRendererLogLevels2["FAILED"] = "FAILED";
  ListrDefaultRendererLogLevels2["FAILED_WITH_FAILED_SUBTASKS"] = "FAILED_WITH_SUBTASKS";
  ListrDefaultRendererLogLevels2["WAITING"] = "WAITING";
  ListrDefaultRendererLogLevels2["PAUSED"] = "PAUSED";
  return ListrDefaultRendererLogLevels2;
})(ListrDefaultRendererLogLevels || {});
var LISTR_DEFAULT_RENDERER_STYLE = {
  icon: {
    ["SKIPPED_WITH_COLLAPSE" /* SKIPPED_WITH_COLLAPSE */]: figures.arrowDown,
    ["SKIPPED_WITHOUT_COLLAPSE" /* SKIPPED_WITHOUT_COLLAPSE */]: figures.warning,
    ["OUTPUT" /* OUTPUT */]: figures.pointerSmall,
    ["OUTPUT_WITH_BOTTOMBAR" /* OUTPUT_WITH_BOTTOMBAR */]: figures.pointerSmall,
    ["PENDING" /* PENDING */]: figures.pointer,
    ["COMPLETED" /* COMPLETED */]: figures.tick,
    ["COMPLETED_WITH_FAILED_SUBTASKS" /* COMPLETED_WITH_FAILED_SUBTASKS */]: figures.warning,
    ["COMPLETED_WITH_SISTER_TASKS_FAILED" /* COMPLETED_WITH_FAILED_SISTER_TASKS */]: figures.squareSmallFilled,
    ["RETRY" /* RETRY */]: figures.warning,
    ["ROLLING_BACK" /* ROLLING_BACK */]: figures.warning,
    ["ROLLED_BACK" /* ROLLED_BACK */]: figures.arrowLeft,
    ["FAILED" /* FAILED */]: figures.cross,
    ["FAILED_WITH_SUBTASKS" /* FAILED_WITH_FAILED_SUBTASKS */]: figures.pointer,
    ["WAITING" /* WAITING */]: figures.squareSmallFilled,
    ["PAUSED" /* PAUSED */]: figures.squareSmallFilled
  },
  color: {
    ["SKIPPED_WITH_COLLAPSE" /* SKIPPED_WITH_COLLAPSE */]: color.yellow,
    ["SKIPPED_WITHOUT_COLLAPSE" /* SKIPPED_WITHOUT_COLLAPSE */]: color.yellow,
    ["PENDING" /* PENDING */]: color.yellow,
    ["COMPLETED" /* COMPLETED */]: color.green,
    ["COMPLETED_WITH_FAILED_SUBTASKS" /* COMPLETED_WITH_FAILED_SUBTASKS */]: color.yellow,
    ["COMPLETED_WITH_SISTER_TASKS_FAILED" /* COMPLETED_WITH_FAILED_SISTER_TASKS */]: color.red,
    ["RETRY" /* RETRY */]: color.yellowBright,
    ["ROLLING_BACK" /* ROLLING_BACK */]: color.redBright,
    ["ROLLED_BACK" /* ROLLED_BACK */]: color.redBright,
    ["FAILED" /* FAILED */]: color.red,
    ["FAILED_WITH_SUBTASKS" /* FAILED_WITH_FAILED_SUBTASKS */]: color.red,
    ["WAITING" /* WAITING */]: color.dim,
    ["PAUSED" /* PAUSED */]: color.yellowBright
  }
};

// src/renderer/default/renderer.ts


// src/presets/timer/parser.ts
function parseTimer(duration) {
  const seconds = Math.floor(duration / 1e3);
  const minutes = Math.floor(seconds / 60);
  let parsedTime;
  if (seconds === 0 && minutes === 0) {
    parsedTime = `0.${Math.floor(duration / 100)}s`;
  }
  if (seconds > 0) {
    parsedTime = `${seconds % 60}s`;
  }
  if (minutes > 0) {
    parsedTime = `${minutes}m${parsedTime}`;
  }
  return parsedTime;
}
__name(parseTimer, "parseTimer");

// src/presets/timer/preset.ts
var PRESET_TIMER = {
  condition: true,
  field: parseTimer,
  format: () => color.dim
};

// src/presets/timestamp/parser.ts
function parseTimestamp() {
  const now = /* @__PURE__ */ new Date();
  return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + ":" + String(now.getSeconds()).padStart(2, "0");
}
__name(parseTimestamp, "parseTimestamp");

// src/presets/timestamp/preset.ts
var PRESET_TIMESTAMP = {
  condition: true,
  field: parseTimestamp,
  format: () => color.dim
};

// src/renderer/default/renderer.ts
var DefaultRenderer = class _DefaultRenderer {
  constructor(tasks, options, events) {
    this.tasks = tasks;
    this.options = options;
    this.events = events;
    this.options = {
      ..._DefaultRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_DEFAULT_RENDERER_STYLE.icon,
        ...options?.icon ?? {}
      },
      color: {
        ...LISTR_DEFAULT_RENDERER_STYLE.color,
        ...options?.color ?? {}
      }
    };
    this.spinner = this.options.spinner ?? new Spinner();
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: true, toStderr: [] });
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
  }
  static {
    __name(this, "DefaultRenderer");
  }
  static nonTTY = false;
  static rendererOptions = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapseSubtasks: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: false,
    collapseErrors: true,
    showErrorMessage: true,
    suffixRetries: true,
    lazy: false,
    removeEmptyLines: true,
    formatOutput: "wrap",
    pausedTimer: {
      ...PRESET_TIMER,
      format: () => color.yellowBright
    }
  };
  static rendererTaskOptions = {
    outputBar: true
  };
  prompt;
  activePrompt;
  spinner;
  logger;
  updater;
  truncate;
  wrap;
  buffer = {
    output: /* @__PURE__ */ new Map(),
    bottom: /* @__PURE__ */ new Map()
  };
  cache = {
    render: /* @__PURE__ */ new Map(),
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  };
  async render() {
    const { createLogUpdate } = await Promise.all(/* import() */[__nccwpck_require__.e(291), __nccwpck_require__.e(866)]).then(__nccwpck_require__.bind(__nccwpck_require__, 47866));
    const { default: truncate } = await Promise.all(/* import() */[__nccwpck_require__.e(291), __nccwpck_require__.e(605)]).then(__nccwpck_require__.bind(__nccwpck_require__, 72605));
    const { default: wrap } = await Promise.all(/* import() */[__nccwpck_require__.e(291), __nccwpck_require__.e(548)]).then(__nccwpck_require__.bind(__nccwpck_require__, 88548));
    this.updater = createLogUpdate(this.logger.process.stdout);
    this.truncate = truncate;
    this.wrap = wrap;
    this.logger.process.hijack();
    if (!this.options?.lazy) {
      this.spinner.start(() => {
        this.update();
      });
    }
    this.events.on("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */, () => {
      this.update();
    });
  }
  update() {
    this.updater(this.create());
  }
  end() {
    this.spinner.stop();
    this.updater.clear();
    this.updater.done();
    if (!this.options.clearOutput) {
      this.logger.process.toStdout(this.create({ prompt: false }));
    }
    this.logger.process.release();
  }
  create(options) {
    options = {
      tasks: true,
      bottomBar: true,
      prompt: true,
      ...options
    };
    const render = [];
    const renderTasks = this.renderer(this.tasks);
    const renderBottomBar = this.renderBottomBar();
    const renderPrompt = this.renderPrompt();
    if (options.tasks && renderTasks.length > 0) {
      render.push(...renderTasks);
    }
    if (options.bottomBar && renderBottomBar.length > 0) {
      if (render.length > 0) {
        render.push("");
      }
      render.push(...renderBottomBar);
    }
    if (options.prompt && renderPrompt.length > 0) {
      if (render.length > 0) {
        render.push("");
      }
      render.push(...renderPrompt);
    }
    return render.join(external_os_.EOL);
  }
  // eslint-disable-next-line complexity
  style(task, output = false) {
    const rendererOptions = this.cache.rendererOptions.get(task.id);
    if (task.isSkipped()) {
      if (output || rendererOptions.collapseSkips) {
        return this.logger.icon("SKIPPED_WITH_COLLAPSE" /* SKIPPED_WITH_COLLAPSE */);
      } else if (rendererOptions.collapseSkips === false) {
        return this.logger.icon("SKIPPED_WITHOUT_COLLAPSE" /* SKIPPED_WITHOUT_COLLAPSE */);
      }
    }
    if (output) {
      if (this.shouldOutputToBottomBar(task)) {
        return this.logger.icon("OUTPUT_WITH_BOTTOMBAR" /* OUTPUT_WITH_BOTTOMBAR */);
      }
      return this.logger.icon("OUTPUT" /* OUTPUT */);
    }
    if (task.hasSubtasks()) {
      if (task.isStarted() || task.isPrompt() && rendererOptions.showSubtasks !== false && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
        return this.logger.icon("PENDING" /* PENDING */);
      } else if (task.isCompleted() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return this.logger.icon("COMPLETED_WITH_FAILED_SUBTASKS" /* COMPLETED_WITH_FAILED_SUBTASKS */);
      } else if (task.hasFailed()) {
        return this.logger.icon("FAILED_WITH_SUBTASKS" /* FAILED_WITH_FAILED_SUBTASKS */);
      }
    }
    if (task.isStarted() || task.isPrompt()) {
      return this.logger.icon("PENDING" /* PENDING */, !this.options?.lazy && this.spinner.fetch());
    } else if (task.isCompleted()) {
      return this.logger.icon("COMPLETED" /* COMPLETED */);
    } else if (task.isRetrying()) {
      return this.logger.icon("RETRY" /* RETRY */, !this.options?.lazy && this.spinner.fetch());
    } else if (task.isRollingBack()) {
      return this.logger.icon("ROLLING_BACK" /* ROLLING_BACK */, !this.options?.lazy && this.spinner.fetch());
    } else if (task.hasRolledBack()) {
      return this.logger.icon("ROLLED_BACK" /* ROLLED_BACK */);
    } else if (task.hasFailed()) {
      return this.logger.icon("FAILED" /* FAILED */);
    } else if (task.isPaused()) {
      return this.logger.icon("PAUSED" /* PAUSED */);
    }
    return this.logger.icon("WAITING" /* WAITING */);
  }
  format(message, icon, level) {
    if (message.trim() === "") {
      return [];
    }
    if (icon) {
      message = icon + " " + message;
    }
    let parsed;
    const columns = (process.stdout.columns ?? 80) - level * this.options.indentation - 2;
    switch (this.options.formatOutput) {
      case "truncate":
        parsed = message.split(external_os_.EOL).map((s, i) => {
          return this.truncate(this.indent(s, i), columns);
        });
        break;
      case "wrap":
        parsed = this.wrap(message, columns, { hard: true }).split(external_os_.EOL).map((s, i) => this.indent(s, i));
        break;
      default:
        throw new ListrRendererError("Format option for the renderer is wrong.");
    }
    if (this.options.removeEmptyLines) {
      parsed = parsed.filter(Boolean);
    }
    return parsed.map((str) => indent(str, level * this.options.indentation));
  }
  shouldOutputToOutputBar(task) {
    const outputBar = this.cache.rendererTaskOptions.get(task.id).outputBar;
    return typeof outputBar === "number" && outputBar !== 0 || typeof outputBar === "boolean" && outputBar !== false;
  }
  shouldOutputToBottomBar(task) {
    const bottomBar = this.cache.rendererTaskOptions.get(task.id).bottomBar;
    return typeof bottomBar === "number" && bottomBar !== 0 || typeof bottomBar === "boolean" && bottomBar !== false || !task.hasTitle();
  }
  renderer(tasks, level = 0) {
    return tasks.flatMap((task) => {
      if (!task.isEnabled()) {
        return [];
      }
      if (this.cache.render.has(task.id)) {
        return this.cache.render.get(task.id);
      }
      this.calculate(task);
      this.setupBuffer(task);
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      const output = [];
      if (task.isPrompt()) {
        if (this.activePrompt && this.activePrompt !== task.id) {
          throw new ListrRendererError("Only one prompt can be active at the given time, please re-evaluate your task design.");
        } else if (!this.activePrompt) {
          task.on("PROMPT" /* PROMPT */, (prompt) => {
            const cleansed = cleanseAnsi(prompt);
            if (cleansed) {
              this.prompt = cleansed;
            }
          });
          task.on("STATE" /* STATE */, (state) => {
            if (state === "PROMPT_COMPLETED" /* PROMPT_COMPLETED */ || task.hasFinalized() || task.hasReset()) {
              this.prompt = null;
              this.activePrompt = null;
              task.off("PROMPT" /* PROMPT */);
            }
          });
          this.activePrompt = task.id;
        }
      }
      if (task.hasTitle()) {
        if (!(tasks.some((task2) => task2.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
          if (task.hasFailed() && rendererOptions.collapseErrors) {
            output.push(...this.format(!task.hasSubtasks() && task.message.error && rendererOptions.showErrorMessage ? task.message.error : task.title, this.style(task), level));
          } else if (task.isSkipped() && rendererOptions.collapseSkips) {
            output.push(
              ...this.format(
                this.logger.suffix(task.message.skip && rendererOptions.showSkipMessage ? task.message.skip : task.title, {
                  field: "SKIPPED" /* SKIPPED */,
                  condition: rendererOptions.suffixSkips,
                  format: () => color.dim
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isRetrying()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  field: `${"RETRY" /* RETRY */}:${task.message.retry.count}`,
                  format: () => color.yellow,
                  condition: rendererOptions.suffixRetries
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isCompleted() && task.hasTitle() && assertFunctionOrSelf(rendererTaskOptions.timer?.condition, task.message.duration)) {
            output.push(
              ...this.format(
                this.logger.suffix(task?.title, {
                  ...rendererTaskOptions.timer,
                  args: [task.message.duration]
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isPaused()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  ...rendererOptions.pausedTimer,
                  args: [task.message.paused - Date.now()]
                }),
                this.style(task),
                level
              )
            );
          } else {
            output.push(...this.format(task.title, this.style(task), level));
          }
        } else {
          output.push(...this.format(task.title, this.logger.icon("COMPLETED_WITH_SISTER_TASKS_FAILED" /* COMPLETED_WITH_FAILED_SISTER_TASKS */), level));
        }
      }
      if (!task.hasSubtasks() || !rendererOptions.showSubtasks) {
        if (task.hasFailed() && rendererOptions.collapseErrors === false && (rendererOptions.showErrorMessage || !rendererOptions.showSubtasks)) {
          output.push(...this.dump(task, level, "FAILED" /* FAILED */));
        } else if (task.isSkipped() && rendererOptions.collapseSkips === false && (rendererOptions.showSkipMessage || !rendererOptions.showSubtasks)) {
          output.push(...this.dump(task, level, "SKIPPED" /* SKIPPED */));
        }
      }
      if (task.isPending() || rendererTaskOptions.persistentOutput) {
        output.push(...this.renderOutputBar(task, level));
      }
      if (
        // check if renderer option is on first
        rendererOptions.showSubtasks !== false && // if it doesnt have subtasks no need to check
        task.hasSubtasks() && (task.isPending() || task.hasFinalized() && !task.hasTitle() || // have to be completed and have subtasks
        task.isCompleted() && rendererOptions.collapseSubtasks === false && !task.subtasks.some((subtask) => this.cache.rendererOptions.get(subtask.id)?.collapseSubtasks === true) || // if any of the subtasks have the collapse option of
        task.subtasks.some((subtask) => this.cache.rendererOptions.get(subtask.id)?.collapseSubtasks === false) || // if any of the subtasks has failed
        task.subtasks.some((subtask) => subtask.hasFailed()) || // if any of the subtasks rolled back
        task.subtasks.some((subtask) => subtask.hasRolledBack()))
      ) {
        const subtaskLevel = !task.hasTitle() ? level : level + 1;
        const subtaskRender = this.renderer(task.subtasks, subtaskLevel);
        output.push(...subtaskRender);
      }
      if (task.hasFinalized()) {
        if (!rendererTaskOptions.persistentOutput) {
          this.buffer.bottom.delete(task.id);
          this.buffer.output.delete(task.id);
        }
      }
      if (task.isClosed()) {
        this.cache.render.set(task.id, output);
        this.reset(task);
      }
      return output;
    });
  }
  renderOutputBar(task, level) {
    const output = this.buffer.output.get(task.id);
    if (!output) {
      return [];
    }
    return output.all.flatMap((o) => this.dump(task, level, "OUTPUT" /* OUTPUT */, o.entry));
  }
  renderBottomBar() {
    if (this.buffer.bottom.size === 0) {
      return [];
    }
    return Array.from(this.buffer.bottom.values()).flatMap((output) => output.all).sort((a, b) => a.time - b.time).map((output) => output.entry);
  }
  renderPrompt() {
    if (!this.prompt) {
      return [];
    }
    return [this.prompt];
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._DefaultRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  setupBuffer(task) {
    if (this.buffer.bottom.has(task.id) || this.buffer.output.has(task.id)) {
      return;
    }
    const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
    if (this.shouldOutputToBottomBar(task) && !this.buffer.bottom.has(task.id)) {
      this.buffer.bottom.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.bottomBar === "number" ? rendererTaskOptions.bottomBar : 1 }));
      task.on("OUTPUT" /* OUTPUT */, (output) => {
        const data = this.dump(task, -1, "OUTPUT" /* OUTPUT */, output);
        this.buffer.bottom.get(task.id).write(data.join(external_os_.EOL));
      });
      task.on("STATE" /* STATE */, (state) => {
        switch (state) {
          case ("RETRY" /* RETRY */ || 0 /* ROLLING_BACK */):
            this.buffer.bottom.delete(task.id);
            break;
        }
      });
    } else if (this.shouldOutputToOutputBar(task) && !this.buffer.output.has(task.id)) {
      this.buffer.output.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.outputBar === "number" ? rendererTaskOptions.outputBar : 1 }));
      task.on("OUTPUT" /* OUTPUT */, (output) => {
        this.buffer.output.get(task.id).write(output);
      });
      task.on("STATE" /* STATE */, (state) => {
        switch (state) {
          case ("RETRY" /* RETRY */ || 0 /* ROLLING_BACK */):
            this.buffer.output.delete(task.id);
            break;
        }
      });
    }
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
    this.buffer.output.delete(task.id);
  }
  dump(task, level, source = "OUTPUT" /* OUTPUT */, data) {
    if (!data) {
      switch (source) {
        case "OUTPUT" /* OUTPUT */:
          data = task.output;
          break;
        case "SKIPPED" /* SKIPPED */:
          data = task.message.skip;
          break;
        case "FAILED" /* FAILED */:
          data = task.message.error;
          break;
      }
    }
    if (task.hasTitle() && source === "FAILED" /* FAILED */ && data === task.title || typeof data !== "string") {
      return [];
    }
    if (source === "OUTPUT" /* OUTPUT */) {
      data = cleanseAnsi(data);
    }
    return this.format(data, this.style(task, true), level + 1);
  }
  indent(str, i) {
    return i > 0 ? indent(str.trim(), this.options.indentation) : str.trim();
  }
};

// src/renderer/silent/renderer.ts
var SilentRenderer = class {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
  }
  static {
    __name(this, "SilentRenderer");
  }
  static nonTTY = true;
  static rendererOptions;
  static rendererTaskOptions;
  render() {
    return;
  }
  end() {
    return;
  }
};

// src/renderer/simple/renderer.ts
var SimpleRenderer = class _SimpleRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = {
      ..._SimpleRenderer.rendererOptions,
      ...options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ...options?.icon ?? {}
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ...options?.color ?? {}
      }
    };
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: true, toStderr: LISTR_LOGGER_STDERR_LEVELS });
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp);
    }
  }
  static {
    __name(this, "SimpleRenderer");
  }
  static nonTTY = true;
  static rendererOptions = {
    pausedTimer: {
      ...PRESET_TIMER,
      field: (time) => `${"PAUSED" /* PAUSED */}:${time}`,
      format: () => color.yellowBright
    }
  };
  static rendererTaskOptions = {};
  logger;
  cache = {
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  render() {
    this.renderer(this.tasks);
  }
  renderer(tasks) {
    tasks.forEach((task) => {
      this.calculate(task);
      task.once("CLOSED" /* CLOSED */, () => {
        this.reset(task);
      });
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      task.on("SUBTASK" /* SUBTASK */, (subtasks) => {
        this.renderer(subtasks);
      });
      task.on("STATE" /* STATE */, (state) => {
        if (!task.hasTitle()) {
          return;
        }
        if (state === "STARTED" /* STARTED */) {
          this.logger.log("STARTED" /* STARTED */, task.title);
        } else if (state === "COMPLETED" /* COMPLETED */) {
          const timer = rendererTaskOptions?.timer;
          this.logger.log(
            "COMPLETED" /* COMPLETED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!task.message?.duration && timer.condition,
                args: [task.message.duration]
              }
            }
          );
        } else if (state === "PROMPT" /* PROMPT */) {
          this.logger.process.hijack();
          task.on("PROMPT" /* PROMPT */, (prompt) => {
            this.logger.process.toStderr(prompt, false);
          });
        } else if (state === "PROMPT_COMPLETED" /* PROMPT_COMPLETED */) {
          task.off("PROMPT" /* PROMPT */);
          this.logger.process.release();
        }
      });
      task.on("OUTPUT" /* OUTPUT */, (output) => {
        this.logger.log("OUTPUT" /* OUTPUT */, output);
      });
      task.on("MESSAGE" /* MESSAGE */, (message) => {
        if (message.error) {
          this.logger.log("FAILED" /* FAILED */, task.title, {
            suffix: {
              field: `${"FAILED" /* FAILED */}: ${message.error}`,
              format: () => color.red
            }
          });
        } else if (message.skip) {
          this.logger.log("SKIPPED" /* SKIPPED */, task.title, {
            suffix: {
              field: `${"SKIPPED" /* SKIPPED */}: ${message.skip}`,
              format: () => color.yellow
            }
          });
        } else if (message.rollback) {
          this.logger.log("ROLLBACK" /* ROLLBACK */, task.title, {
            suffix: {
              field: `${"ROLLBACK" /* ROLLBACK */}: ${message.rollback}`,
              format: () => color.red
            }
          });
        } else if (message.retry) {
          this.logger.log("RETRY" /* RETRY */, task.title, {
            suffix: {
              field: `${"RETRY" /* RETRY */}:${message.retry.count}`,
              format: () => color.red
            }
          });
        } else if (message.paused) {
          const timer = rendererOptions?.pausedTimer;
          this.logger.log(
            "PAUSED" /* PAUSED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!message?.paused && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          );
        }
      });
    });
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._SimpleRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
  }
};

// src/renderer/test/serializer.ts
var TestRendererSerializer = class {
  constructor(options) {
    this.options = options;
  }
  static {
    __name(this, "TestRendererSerializer");
  }
  serialize(event, data, task) {
    return JSON.stringify(this.generate(event, data, task));
  }
  generate(event, data, task) {
    const output = {
      event,
      data
    };
    if (typeof this.options?.task !== "boolean") {
      const t = Object.fromEntries(
        this.options.task.map((entity) => {
          const property = task[entity];
          if (typeof property === "function") {
            return [entity, property.call(task)];
          }
          return [entity, property];
        })
      );
      if (Object.keys(task).length > 0) {
        output.task = t;
      }
    }
    return output;
  }
};

// src/renderer/test/renderer.ts
var TestRenderer = class _TestRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = { ..._TestRenderer.rendererOptions, ...this.options };
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: false });
    this.serializer = new TestRendererSerializer(this.options);
  }
  static {
    __name(this, "TestRenderer");
  }
  static nonTTY = true;
  static rendererOptions = {
    subtasks: true,
    state: Object.values(ListrTaskState),
    output: true,
    prompt: true,
    title: true,
    messages: ["skip", "error", "retry", "rollback", "paused"],
    messagesToStderr: ["error", "rollback", "retry"],
    task: [
      "hasRolledBack",
      "isRollingBack",
      "isCompleted",
      "isSkipped",
      "hasFinalized",
      "hasSubtasks",
      "title",
      "hasReset",
      "hasTitle",
      "isPrompt",
      "isPaused",
      "isPending",
      "isSkipped",
      "isStarted",
      "hasFailed",
      "isEnabled",
      "isRetrying",
      "path"
    ]
  };
  static rendererTaskOptions;
  logger;
  serializer;
  render() {
    this.renderer(this.tasks);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  // verbose renderer multi-level
  renderer(tasks) {
    tasks.forEach((task) => {
      if (this.options.subtasks) {
        task.on("SUBTASK" /* SUBTASK */, (subtasks) => {
          this.renderer(subtasks);
        });
      }
      if (this.options.state) {
        task.on("STATE" /* STATE */, (state) => {
          this.logger.toStdout(this.serializer.serialize("STATE" /* STATE */, state, task));
        });
      }
      if (this.options.output) {
        task.on("OUTPUT" /* OUTPUT */, (data) => {
          this.logger.toStdout(this.serializer.serialize("OUTPUT" /* OUTPUT */, data, task));
        });
      }
      if (this.options.prompt) {
        task.on("PROMPT" /* PROMPT */, (prompt) => {
          this.logger.toStdout(this.serializer.serialize("PROMPT" /* PROMPT */, prompt, task));
        });
      }
      if (this.options.title) {
        task.on("TITLE" /* TITLE */, (title) => {
          this.logger.toStdout(this.serializer.serialize("TITLE" /* TITLE */, title, task));
        });
      }
      task.on("MESSAGE" /* MESSAGE */, (message) => {
        const parsed = Object.fromEntries(
          Object.entries(message).map(([key, value]) => {
            if (this.options.messages.includes(key)) {
              return [key, value];
            }
          }).filter(Boolean)
        );
        if (Object.keys(parsed).length > 0) {
          const output = this.serializer.serialize("MESSAGE" /* MESSAGE */, parsed, task);
          if (this.options.messagesToStderr.some((state) => Object.keys(parsed).includes(state))) {
            this.logger.toStderr(output);
          } else {
            this.logger.toStdout(output);
          }
        }
      });
    });
  }
};

// src/renderer/verbose/renderer.ts
var VerboseRenderer = class _VerboseRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = {
      ..._VerboseRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ...options?.icon ?? {}
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ...options?.color ?? {}
      }
    };
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: false, toStderr: LISTR_LOGGER_STDERR_LEVELS });
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp);
    }
  }
  static {
    __name(this, "VerboseRenderer");
  }
  static nonTTY = true;
  static rendererOptions = {
    logTitleChange: false,
    pausedTimer: {
      ...PRESET_TIMER,
      format: () => color.yellowBright
    }
  };
  static rendererTaskOptions;
  logger;
  cache = {
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  };
  render() {
    this.renderer(this.tasks);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  renderer(tasks) {
    tasks.forEach((task) => {
      this.calculate(task);
      task.once("CLOSED" /* CLOSED */, () => {
        this.reset(task);
      });
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      task.on("SUBTASK" /* SUBTASK */, (subtasks) => {
        this.renderer(subtasks);
      });
      task.on("STATE" /* STATE */, (state) => {
        if (!task.hasTitle()) {
          return;
        }
        if (state === "STARTED" /* STARTED */) {
          this.logger.log("STARTED" /* STARTED */, task.title);
        } else if (state === "COMPLETED" /* COMPLETED */) {
          const timer = rendererTaskOptions.timer;
          this.logger.log(
            "COMPLETED" /* COMPLETED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!task.message?.duration && timer.condition,
                args: [task.message.duration]
              }
            }
          );
        }
      });
      task.on("OUTPUT" /* OUTPUT */, (data) => {
        this.logger.log("OUTPUT" /* OUTPUT */, data);
      });
      task.on("PROMPT" /* PROMPT */, (prompt) => {
        const cleansed = cleanseAnsi(prompt);
        if (cleansed) {
          this.logger.log("PROMPT" /* PROMPT */, cleansed);
        }
      });
      if (this.options?.logTitleChange !== false) {
        task.on("TITLE" /* TITLE */, (title) => {
          this.logger.log("TITLE" /* TITLE */, title);
        });
      }
      task.on("MESSAGE" /* MESSAGE */, (message) => {
        if (message?.error) {
          this.logger.log("FAILED" /* FAILED */, message.error);
        } else if (message?.skip) {
          this.logger.log("SKIPPED" /* SKIPPED */, message.skip);
        } else if (message?.rollback) {
          this.logger.log("ROLLBACK" /* ROLLBACK */, message.rollback);
        } else if (message?.retry) {
          this.logger.log("RETRY" /* RETRY */, task.title, { suffix: message.retry.count.toString() });
        } else if (message?.paused) {
          const timer = rendererOptions?.pausedTimer;
          this.logger.log(
            "PAUSED" /* PAUSED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!message?.paused && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          );
        }
      });
    });
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._VerboseRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
  }
};

// src/utils/ui/renderer.ts
var RENDERERS = {
  default: DefaultRenderer,
  simple: SimpleRenderer,
  verbose: VerboseRenderer,
  test: TestRenderer,
  silent: SilentRenderer
};
function isRendererSupported(renderer) {
  return process.stdout.isTTY === true || renderer.nonTTY === true;
}
__name(isRendererSupported, "isRendererSupported");
function getRendererClass(renderer) {
  if (typeof renderer === "string") {
    return RENDERERS[renderer] ?? RENDERERS.default;
  }
  return typeof renderer === "function" ? renderer : RENDERERS.default;
}
__name(getRendererClass, "getRendererClass");
function getRenderer(options) {
  if (assertFunctionOrSelf(options?.silentRendererCondition)) {
    return { renderer: getRendererClass("silent"), selection: "SILENT" /* SILENT */ };
  }
  const r = {
    renderer: getRendererClass(options.renderer),
    options: options.rendererOptions,
    selection: "PRIMARY" /* PRIMARY */
  };
  if (!isRendererSupported(r.renderer) || assertFunctionOrSelf(options?.fallbackRendererCondition)) {
    return {
      renderer: getRendererClass(options.fallbackRenderer),
      options: options.fallbackRendererOptions,
      selection: "SECONDARY" /* SECONDARY */
    };
  }
  return r;
}
__name(getRenderer, "getRenderer");

// src/utils/assert.ts
function assertFunctionOrSelf(functionOrSelf, ...args) {
  if (typeof functionOrSelf === "function") {
    return functionOrSelf(...args);
  } else {
    return functionOrSelf;
  }
}
__name(assertFunctionOrSelf, "assertFunctionOrSelf");

// src/utils/clone.ts

var clone = rfdc({ circles: true });
function cloneObject(obj) {
  return clone(obj);
}
__name(cloneObject, "cloneObject");

// src/utils/concurrency.ts
var Concurrency = class {
  static {
    __name(this, "Concurrency");
  }
  concurrency;
  count;
  queue;
  constructor(options) {
    this.concurrency = options.concurrency;
    this.count = 0;
    this.queue = /* @__PURE__ */ new Set();
  }
  add(fn) {
    if (this.count < this.concurrency) {
      return this.run(fn);
    }
    return new Promise((resolve) => {
      const callback = /* @__PURE__ */ __name(() => resolve(this.run(fn)), "callback");
      this.queue.add(callback);
    });
  }
  flush() {
    for (const callback of this.queue) {
      if (this.count >= this.concurrency) {
        break;
      }
      this.queue.delete(callback);
      callback();
    }
  }
  run(fn) {
    this.count++;
    const promise = fn();
    const cleanup = /* @__PURE__ */ __name(() => {
      this.count--;
      this.flush();
    }, "cleanup");
    promise.then(cleanup, () => {
      this.queue.clear();
    });
    return promise;
  }
};

// src/utils/delay.ts
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
__name(delay, "delay");

// src/interfaces/listr-error.interface.ts
var ListrError = class extends Error {
  constructor(error, type, task) {
    super(error.message);
    this.error = error;
    this.type = type;
    this.task = task;
    this.name = "ListrError";
    this.path = task.path;
    if (task?.options.collectErrors === "full") {
      this.task = cloneObject(task);
      this.ctx = cloneObject(task.listr.ctx);
    }
    this.stack = error?.stack;
  }
  static {
    __name(this, "ListrError");
  }
  path;
  ctx;
};

// src/interfaces/listr-renderer-error.interface.ts
var ListrRendererError = class extends Error {
  static {
    __name(this, "ListrRendererError");
  }
};

// src/interfaces/prompt-error.interface.ts
var PromptError = class extends Error {
  static {
    __name(this, "PromptError");
  }
};

// src/lib/task-wrapper.ts
var TaskWrapper = class {
  constructor(task) {
    this.task = task;
  }
  static {
    __name(this, "TaskWrapper");
  }
  /* istanbul ignore next */
  get title() {
    return this.task.title;
  }
  /**
   * Title of the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/title.html}
   */
  set title(title) {
    title = Array.isArray(title) ? title : [title];
    this.task.title$ = splat(title.shift(), ...title);
  }
  /* istanbul ignore next */
  get output() {
    return this.task.output;
  }
  /* istanbul ignore next */
  /**
   * Send output from the current task to the renderer.
   *
   * @see {@link https://listr2.kilic.dev/task/output.html}
   */
  set output(output) {
    output = Array.isArray(output) ? output : [output];
    this.task.output$ = splat(output.shift(), ...output);
  }
  /* istanbul ignore next */
  /** Send an output to the output channel as prompt. */
  set promptOutput(output) {
    this.task.promptOutput$ = output;
  }
  /**
   * Creates a new set of Listr subtasks.
   *
   * @see {@link https://listr2.kilic.dev/task/subtasks.html}
   */
  newListr(task, options) {
    let tasks;
    if (typeof task === "function") {
      tasks = task(this);
    } else {
      tasks = task;
    }
    return new Listr(tasks, options, this.task);
  }
  /**
   * Report an error that has to be collected and handled.
   *
   * @see {@link https://listr2.kilic.dev/task/error-handling.html}
   */
  report(error, type) {
    if (this.task.options.collectErrors !== false) {
      this.task.listr.errors.push(new ListrError(error, type, this.task));
    }
    this.task.message$ = { error: error.message ?? this.task?.title };
  }
  /**
   * Skip the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/skip.html}
   */
  skip(message, ...metadata) {
    this.task.state$ = "SKIPPED" /* SKIPPED */;
    if (message) {
      this.task.message$ = { skip: message ? splat(message, ...metadata) : this.task?.title };
    }
  }
  /**
   * Check whether this task is currently in a retry state.
   *
   * @see {@link https://listr2.kilic.dev/task/retry.html}
   */
  isRetrying() {
    return this.task.isRetrying() ? this.task.retry : { count: 0 };
  }
  /* istanbul ignore next */
  /**
   * Create a new prompt for getting user input through the prompt adapter.
   * This will create a new prompt through the adapter if the task is not currently rendering a prompt or will return the active instance.
   *
   * This part of the application requires optional peer dependencies, please refer to documentation.
   *
   * @see {@link https://listr2.kilic.dev/task/prompt.html}
   */
  prompt(adapter) {
    if (this.task.prompt) {
      return this.task.prompt;
    }
    return new adapter(this.task, this);
  }
  /* istanbul ignore next */
  /**
   * Generates a fake stdout for your use case, where it will be tunnelled through Listr to handle the rendering process.
   *
   * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
   */
  stdout(type) {
    return createWritable((chunk) => {
      switch (type) {
        case "PROMPT" /* PROMPT */:
          this.promptOutput = chunk;
          break;
        default:
          this.output = chunk;
      }
    });
  }
  /** Run this task. */
  run(ctx) {
    return this.task.run(ctx, this);
  }
};

// src/lib/task.ts


// src/lib/listr-task-event-manager.ts
var ListrTaskEventManager = class extends EventManager {
  static {
    __name(this, "ListrTaskEventManager");
  }
};

// src/lib/task.ts
var Task = class extends ListrTaskEventManager {
  constructor(listr, task, options, rendererOptions, rendererTaskOptions) {
    super();
    this.listr = listr;
    this.task = task;
    this.options = options;
    this.rendererOptions = rendererOptions;
    this.rendererTaskOptions = rendererTaskOptions;
    if (task.title) {
      const title = Array.isArray(task?.title) ? task.title : [task.title];
      this.title = splat(title.shift(), ...title);
      this.initialTitle = this.title;
    }
    this.taskFn = task.task;
    this.parent = listr.parentTask;
  }
  static {
    __name(this, "Task");
  }
  /** Unique id per task, can be used for identifying a Task. */
  id = (0,external_crypto_.randomUUID)();
  /** The current state of the task. */
  state = "WAITING" /* WAITING */;
  /** Subtasks of the current task. */
  subtasks;
  /** Title of the task. */
  title;
  /** Initial/Untouched version of the title for using whenever task has a reset. */
  initialTitle;
  /** Output channel for the task. */
  output;
  /** Current state of the retry process whenever the task is retrying. */
  retry;
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  message = {};
  /** Current prompt instance or prompt error whenever the task is prompting. */
  prompt;
  /** Parent task of the current task. */
  parent;
  /** Enable flag of this task. */
  enabled;
  /** User provided Task callback function to run. */
  taskFn;
  /** Marks the task as closed. This is different from finalized since this is not really related to task itself. */
  closed;
  /**
   * Update the current state of the Task and emit the neccassary events.
   */
  set state$(state) {
    this.state = state;
    this.emit("STATE" /* STATE */, state);
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks) {
        if (subtask.state === "STARTED" /* STARTED */) {
          subtask.state$ = "FAILED" /* FAILED */;
        }
      }
    }
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Update the current output of the Task and emit the neccassary events.
   */
  set output$(data) {
    this.output = data;
    this.emit("OUTPUT" /* OUTPUT */, data);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Update the current prompt output of the Task and emit the neccassary events.
   */
  set promptOutput$(data) {
    this.emit("PROMPT" /* PROMPT */, data);
    if (cleanseAnsi(data)) {
      this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
    }
  }
  /**
   * Update or extend the current message of the Task and emit the neccassary events.
   */
  set message$(data) {
    this.message = { ...this.message, ...data };
    this.emit("MESSAGE" /* MESSAGE */, data);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Update the current title of the Task and emit the neccassary events.
   */
  set title$(title) {
    this.title = title;
    this.emit("TITLE" /* TITLE */, title);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Current task path in the hierarchy.
   */
  get path() {
    return [...this.listr.path, this.initialTitle];
  }
  /**
   * Checks whether the current task with the given context should be set as enabled.
   */
  async check(ctx) {
    if (this.state === "WAITING" /* WAITING */) {
      this.enabled = await assertFunctionOrSelf(this.task?.enabled ?? true, ctx);
      this.emit("ENABLED" /* ENABLED */, this.enabled);
      this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
    }
    return this.enabled;
  }
  /** Returns whether this task has subtasks. */
  hasSubtasks() {
    return this.subtasks?.length > 0;
  }
  /** Returns whether this task is finalized in someform. */
  hasFinalized() {
    return this.isCompleted() || this.hasFailed() || this.isSkipped() || this.hasRolledBack();
  }
  /** Returns whether this task is in progress. */
  isPending() {
    return this.isStarted() || this.isPrompt() || this.hasReset();
  }
  /** Returns whether this task has started. */
  isStarted() {
    return this.state === "STARTED" /* STARTED */;
  }
  /** Returns whether this task is skipped. */
  isSkipped() {
    return this.state === "SKIPPED" /* SKIPPED */;
  }
  /** Returns whether this task has been completed. */
  isCompleted() {
    return this.state === "COMPLETED" /* COMPLETED */;
  }
  /** Returns whether this task has been failed. */
  hasFailed() {
    return this.state === "FAILED" /* FAILED */;
  }
  /** Returns whether this task has an active rollback task going on. */
  isRollingBack() {
    return this.state === "ROLLING_BACK" /* ROLLING_BACK */;
  }
  /** Returns whether the rollback action was successful. */
  hasRolledBack() {
    return this.state === "ROLLED_BACK" /* ROLLED_BACK */;
  }
  /** Returns whether this task has an actively retrying task going on. */
  isRetrying() {
    return this.state === "RETRY" /* RETRY */;
  }
  /** Returns whether this task has some kind of reset like retry and rollback going on. */
  hasReset() {
    return this.state === "RETRY" /* RETRY */ || this.state === "ROLLING_BACK" /* ROLLING_BACK */;
  }
  /** Returns whether enabled function resolves to true. */
  isEnabled() {
    return this.enabled;
  }
  /** Returns whether this task actually has a title. */
  hasTitle() {
    return typeof this?.title === "string";
  }
  /** Returns whether this task has a prompt inside. */
  isPrompt() {
    return this.state === "PROMPT" /* PROMPT */ || this.state === "PROMPT_COMPLETED" /* PROMPT_COMPLETED */;
  }
  /** Returns whether this task is currently paused. */
  isPaused() {
    return this.state === "PAUSED" /* PAUSED */;
  }
  /** Returns whether this task is closed. */
  isClosed() {
    return this.closed;
  }
  /** Pause the given task for certain time. */
  async pause(time) {
    const state = this.state;
    this.state$ = "PAUSED" /* PAUSED */;
    this.message$ = {
      paused: Date.now() + time
    };
    await delay(time);
    this.state$ = state;
    this.message$ = {
      paused: null
    };
  }
  /** Run the current task. */
  async run(context, wrapper) {
    const handleResult = /* @__PURE__ */ __name((result) => {
      if (result instanceof Listr) {
        result.options = { ...this.options, ...result.options };
        result.rendererClass = getRendererClass("silent");
        this.subtasks = result.tasks;
        result.errors = this.listr.errors;
        this.emit("SUBTASK" /* SUBTASK */, this.subtasks);
        result = result.run(context);
      } else if (result instanceof Promise) {
        result = result.then(handleResult);
      } else if (isReadable(result)) {
        result = new Promise((resolve, reject) => {
          result.on("data", (data) => {
            this.output$ = data.toString();
          });
          result.on("error", (error) => reject(error));
          result.on("end", () => resolve(null));
        });
      } else if (isObservable(result)) {
        result = new Promise((resolve, reject) => {
          result.subscribe({
            next: (data) => {
              this.output$ = data;
            },
            error: reject,
            complete: resolve
          });
        });
      }
      return result;
    }, "handleResult");
    const startTime = Date.now();
    this.state$ = "STARTED" /* STARTED */;
    const skipped = await assertFunctionOrSelf(this.task?.skip ?? false, context);
    if (skipped) {
      if (typeof skipped === "string") {
        this.message$ = { skip: skipped };
      } else if (this.hasTitle()) {
        this.message$ = { skip: this.title };
      } else {
        this.message$ = { skip: "Skipped task without a title." };
      }
      this.state$ = "SKIPPED" /* SKIPPED */;
      return;
    }
    try {
      const retryCount = typeof this.task?.retry === "number" && this.task.retry > 0 ? this.task.retry + 1 : typeof this.task?.retry === "object" && this.task.retry.tries > 0 ? this.task.retry.tries + 1 : 1;
      const retryDelay = typeof this.task.retry === "object" && this.task.retry.delay;
      for (let retries = 1; retries <= retryCount; retries++) {
        try {
          await handleResult(this.taskFn(context, wrapper));
          break;
        } catch (err) {
          if (retries !== retryCount) {
            this.retry = { count: retries, error: err };
            this.message$ = { retry: this.retry };
            this.title$ = this.initialTitle;
            this.output = void 0;
            wrapper.report(err, "WILL_RETRY" /* WILL_RETRY */);
            this.state$ = "RETRY" /* RETRY */;
            if (retryDelay) {
              await this.pause(retryDelay);
            }
          } else {
            throw err;
          }
        }
      }
      if (this.isStarted() || this.isRetrying()) {
        this.message$ = { duration: Date.now() - startTime };
        this.state$ = "COMPLETED" /* COMPLETED */;
      }
    } catch (error) {
      if (this.prompt instanceof PromptError) {
        error = this.prompt;
      }
      if (this.task?.rollback) {
        wrapper.report(error, "WILL_ROLLBACK" /* WILL_ROLLBACK */);
        try {
          this.state$ = "ROLLING_BACK" /* ROLLING_BACK */;
          await this.task.rollback(context, wrapper);
          this.message$ = { rollback: this.title };
          this.state$ = "ROLLED_BACK" /* ROLLED_BACK */;
        } catch (err) {
          this.state$ = "FAILED" /* FAILED */;
          wrapper.report(err, "HAS_FAILED_TO_ROLLBACK" /* HAS_FAILED_TO_ROLLBACK */);
          this.close();
          throw err;
        }
        if (this.listr.options?.exitAfterRollback !== false) {
          this.close();
          throw error;
        }
      } else {
        this.state$ = "FAILED" /* FAILED */;
        if (this.listr.options.exitOnError !== false && await assertFunctionOrSelf(this.task?.exitOnError, context) !== false) {
          wrapper.report(error, "HAS_FAILED" /* HAS_FAILED */);
          this.close();
          throw error;
        } else if (!this.hasSubtasks()) {
          wrapper.report(error, "HAS_FAILED_WITHOUT_ERROR" /* HAS_FAILED_WITHOUT_ERROR */);
        }
      }
    } finally {
      this.close();
    }
  }
  close() {
    this.emit("CLOSED" /* CLOSED */);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
    this.complete();
  }
};

// src/lib/listr-event-manager.ts
var ListrEventManager = class extends EventManager {
  static {
    __name(this, "ListrEventManager");
  }
};

// src/listr.ts
var Listr = class {
  constructor(task, options, parentTask) {
    this.task = task;
    this.options = options;
    this.parentTask = parentTask;
    this.options = {
      concurrent: false,
      renderer: "default",
      fallbackRenderer: "simple",
      exitOnError: true,
      exitAfterRollback: true,
      collectErrors: false,
      registerSignalListeners: true,
      ...this.parentTask?.options ?? {},
      ...options
    };
    if (this.options.concurrent === true) {
      this.options.concurrent = Infinity;
    } else if (typeof this.options.concurrent !== "number") {
      this.options.concurrent = 1;
    }
    this.concurrency = new Concurrency({ concurrency: this.options.concurrent });
    if (parentTask) {
      this.path = [...parentTask.listr.path, parentTask.title];
      this.errors = parentTask.listr.errors;
    }
    if (this.parentTask?.listr.events instanceof ListrEventManager) {
      this.events = this.parentTask.listr.events;
    } else {
      this.events = new ListrEventManager();
    }
    const renderer = getRenderer({
      renderer: this.options.renderer,
      rendererOptions: this.options.rendererOptions,
      fallbackRenderer: this.options.fallbackRenderer,
      fallbackRendererOptions: this.options.fallbackRendererOptions,
      fallbackRendererCondition: this.options?.fallbackRendererCondition,
      silentRendererCondition: this.options?.silentRendererCondition
    });
    this.rendererClass = renderer.renderer;
    this.rendererClassOptions = renderer.options;
    this.rendererSelection = renderer.selection;
    this.add(task ?? []);
    if (this.options.registerSignalListeners) {
      this.boundSignalHandler = this.signalHandler.bind(this);
      process.once("SIGINT", this.boundSignalHandler).setMaxListeners(0);
    }
    if (this.options?.forceTTY || process.env["LISTR_FORCE_TTY" /* FORCE_TTY */]) {
      process.stdout.isTTY = true;
      process.stderr.isTTY = true;
    }
    if (this.options?.forceUnicode) {
      process.env["LISTR_FORCE_UNICODE" /* FORCE_UNICODE */] = "1";
    }
  }
  static {
    __name(this, "Listr");
  }
  tasks = [];
  errors = [];
  ctx;
  events;
  path = [];
  rendererClass;
  rendererClassOptions;
  rendererSelection;
  boundSignalHandler;
  concurrency;
  renderer;
  /**
   * Whether this is the root task.
   */
  isRoot() {
    return !this.parentTask;
  }
  /**
   * Whether this is a subtask of another task list.
   */
  isSubtask() {
    return !!this.parentTask;
  }
  /**
   * Add tasks to current task list.
   *
   * @see {@link https://listr2.kilic.dev/task/task.html}
   */
  add(tasks) {
    this.tasks.push(...this.generate(tasks));
  }
  /**
   * Run the task list.
   *
   * @see {@link https://listr2.kilic.dev/listr/listr.html#run-the-generated-task-list}
   */
  async run(context) {
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions, this.events);
    }
    await this.renderer.render();
    this.ctx = this.options?.ctx ?? context ?? {};
    await Promise.all(this.tasks.map((task) => task.check(this.ctx)));
    try {
      await Promise.all(this.tasks.map((task) => this.concurrency.add(() => this.runTask(task))));
      this.renderer.end();
      this.removeSignalHandler();
    } catch (err) {
      if (this.options.exitOnError !== false) {
        this.renderer.end(err);
        this.removeSignalHandler();
        throw err;
      }
    }
    return this.ctx;
  }
  generate(tasks) {
    tasks = Array.isArray(tasks) ? tasks : [tasks];
    return tasks.map((task) => {
      let rendererTaskOptions;
      if (this.rendererSelection === "PRIMARY" /* PRIMARY */) {
        rendererTaskOptions = task.rendererOptions;
      } else if (this.rendererSelection === "SECONDARY" /* SECONDARY */) {
        rendererTaskOptions = task.fallbackRendererOptions;
      }
      return new Task(
        this,
        task,
        this.options,
        this.rendererClassOptions,
        rendererTaskOptions
      );
    });
  }
  async runTask(task) {
    if (!await task.check(this.ctx)) {
      return;
    }
    return new TaskWrapper(task).run(this.ctx);
  }
  signalHandler() {
    this.tasks?.forEach(async (task) => {
      if (task.isPending()) {
        task.state$ = "FAILED" /* FAILED */;
      }
    });
    if (this.isRoot()) {
      this.renderer.end(new Error("Interrupted."));
      process.exit(127);
    }
  }
  removeSignalHandler() {
    if (this.boundSignalHandler) {
      process.removeListener("SIGINT", this.boundSignalHandler);
    }
  }
};


// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(57147);
// EXTERNAL MODULE: external "path"
var external_path_ = __nccwpck_require__(71017);
;// CONCATENATED MODULE: ./node_modules/termost/dist/index.mjs
var k=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,t)=>(typeof require<"u"?require:n)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var V=async(e,n={hasLiveOutput:!1})=>new Promise((t,s)=>{let o="",c="",[r,...i]=e.split(" "),a=(0,external_child_process_.spawn)(r,i,{cwd:n.cwd,env:{...process.env,FORCE_COLOR:"1"},shell:!0,stdio:n.hasLiveOutput?"inherit":"pipe"});a.stdout?.on("data",l=>{o+=l}),a.stderr?.on("data",l=>{c+=l}),a.on("close",l=>{if(l!==0){let u=`${c}${o}`;s(u.trim())}else t(o.trim())})});var y=(e,{color:n,modifiers:t}={color:"white",modifiers:[]})=>{let s=[];return s.push(picocolors[H[n??"white"]]),(t??[]).forEach(o=>{o==="uppercase"?e=e.toUpperCase():o==="lowercase"?e=e.toLowerCase():s.push(picocolors[J[o]])}),G(...s)(e)},G=(...e)=>e.reduce((n,t)=>s=>n(t(s)),e[0]),O=(e,{label:n,type:t="information"}={})=>{let{color:s,defaultLabel:o,icon:c,method:r}=q[t],i=typeof e=="string"?[e]:e;r(y(`
${c} ${n??o}`,{color:s,modifiers:["bold"]}));for(let a of i)r(y(`   ${a}`,{color:s}))},q={error:{color:"red",defaultLabel:"Error",icon:"\u274C",method:console.error},information:{color:"blue",defaultLabel:"Information",icon:"\u2139\uFE0F ",method:console.info},success:{color:"green",defaultLabel:"Success",icon:"\u2705",method:console.log},warning:{color:"yellow",defaultLabel:"Warning",icon:"\u26A0\uFE0F ",method:console.warn}},H={black:"black",blue:"blue",cyan:"cyan",green:"green",grey:"gray",magenta:"magenta",red:"red",white:"white",yellow:"yellow"},J={bold:"bold",italic:"italic",strikethrough:"strikethrough",underline:"underline"};var P=()=>{let e=[];return{dequeue(){return e.shift()},enqueue(n){e.push(n)},isEmpty(){return e.length===0}}};var g=e=>{let n=v[e];if(!n)throw new Error(`No controller has been set for the \`${e}\` command.
Have you run the \`termost\` constructor?`);return n},L=(e,n)=>{let t=P(),s={},o={description:n,options:{"-h, --help":"Display the help center","-v, --version":"Print the version"}},c={addInstruction(r){t.enqueue(r)},addOptionDescription(r,i){o.options[r]=i},addValue(r,i){s[r]=i},async enable(){for(;!t.isEmpty();){let r=t.dequeue();r&&await r()}},getContext(r){return e!==r&&(s={...g(r).getContext(r),...s}),s},getMetadata(r){if(e!==r){let i=g(r).getMetadata(r);o.options={...i.options,...o.options}}return o}};return K[e]=n,v[e]=c,c},I=()=>K,v={},K={};var T=({name:e,description:n},{name:t,argv:s,version:o})=>{let c=e===t,r=s.command===e,i=L(e,n),a=g(t);return setTimeout(()=>{if(c&&!r&&a.enable(),r){let l=Object.keys(s.options);if(l.includes(j[0])||l.includes(j[1])){Q({controller:i,currentCommandName:e,isRootCommand:c,rootCommandName:t});return}if(l.includes(M[0])||l.includes(M[1])){console.info(o);return}i.enable()}},0),e},j=["help","h"],M=["version","v"],Q=({controller:e,currentCommandName:n,isRootCommand:t,rootCommandName:s})=>{let o=e.getMetadata(s),{description:c,options:r}=o,i=I(),a=Object.keys(o.options),l=Object.keys(i),u=a.length>0,p=t&&l.length>1;C("Usage"),b(`${y(`${s}${t?"":` ${String(n)}`}`,{color:"green"})} ${p?"<command> ":""}${u?"[...options]":""}`),c&&(C("Description"),b(c));let f=[...l,...a].reduce((m,d)=>Math.max(m,d.length),0);if(p){C("Commands");for(let m of l){if(m===s)continue;let d=i[m];d&&w(m,d,f)}}if(u){C("Options");for(let m of a)w(m,r[m],f)}},b=(...e)=>{console.log(y(...e))},C=e=>{b(`
${e}:`,{color:"yellow",modifiers:["bold","underline","uppercase"]})},w=(e,n,t)=>{b(`  ${y(e.padEnd(t+1," "),{color:"green"})} ${n}`)};var E=e=>{let{key:n,label:t,defaultValue:s,type:o}=e;return async function(r,i){let a={name:n,initial:s,message:typeof t=="function"?t(r,i):t,type:o};if(e.type==="select"||e.type==="multiselect"){let u=e.type==="multiselect",f=e.options.map(m=>({title:m,value:m,...u&&{selected:(s||[]).includes(m)}}));a.choices=f}let l=await (0,enquirer.prompt)(a);return{key:n,value:l[n]}}};var N=(e,{argv:n})=>t=>{let{key:s,name:o,description:c,defaultValue:r}=t,i=typeof o=="string"?[o]:[o.short,o.long],a=i.map((l,u)=>"-".repeat(i.length>1?u+1:2)+l).join(", ");return e.addOptionDescription(a,c),async function(){let u;for(let p of i)if(p in n.options){u=n.options[p];break}return Promise.resolve({key:s,value:u??r})}};var R=e=>{let{key:n,label:t,handler:s}=e,o=t?new Listr([],{rendererOptions:{collapseErrors:!1,formatOutput:"wrap",showErrorMessage:!0,timer:PRESET_TIMER}}):null;return async function(r,i){let a;return o?(o.add({...t&&{title:typeof t=="function"?t(r,i):t},task:async()=>a=await s(r,i)}),await o.run()):a=await s(r,i),{key:n,value:a}}};var S=e=>{let n=external_path_.resolve(e,"package.json");return W(n)?k(n):S(external_path_.resolve(e,".."))},W=e=>{try{return external_fs_.accessSync(e,external_fs_.constants.F_OK),!0}catch{return!1}},_=()=>{let e=k.main?.filename;if(!e)throw new Error("Termost was unable to retrieve automatically the package name and version. To fix it, use `termost({ name, description, version })` to define them manually.");return S(external_path_.dirname(e))};var D=()=>{let e=process.argv.slice(2),n,t=[],s={},o,c=(i,a)=>{a?s[i]=typeof a=="string"?A(a):!0:o=i},r=()=>{o&&(s[o]=!0,o=void 0)};for(let i of e){let a=z.exec(i)?.groups,l=Y.exec(i)?.groups;if(a?.name){r();let u=a.name.split(""),p=u.length-1;u.forEach((f,m)=>{c(f,p===m?void 0:!0)})}else l?.name?(r(),c(l.name,l.value)):o?(s[o]=A(i),o=void 0):n?t.push(i):n=i}return r(),{command:n,operands:t,options:s}},z=/^-(?<name>(?!-).*)$/,Y=/^--(?<name>.*?)(?:=(?<value>.+))?$/,A=e=>{try{return JSON.parse(e)}catch{return e}};function Z(e,n={}){let{name:t,description:s,version:o}=ne(e)?e:{name:void 0,description:e,version:void 0};if(t===void 0||s===void 0||o===void 0){let a=_();t??(t=a.name),s??(s=a.description),o??(o=a.version)}let{command:c=t,operands:r,options:i}=D();return te(n),ee({name:t,description:s,argv:{command:c,operands:r,options:i},version:o})}var ee=e=>{let{name:n,description:t,argv:s}=e,o=n,c=o,r=(a,l)=>{let u=a(l),p=g(c);p.addInstruction(async()=>{let{skip:f}=l,m=p.getContext(o);if(f?.(m,s))return;let d=await u(m,s);!d||!d.key||p.addValue(d.key,d.value)})},i={command(a){return c=T(a,e),this},input(a){return r(E,a),this},option(a){return r(N(g(c),e),a),this},task(a){return r(R,a),this}};return i.command({name:n,description:t}),i},te=({onException:e=()=>{},onShutdown:n=()=>{}})=>{process.on("SIGTERM",()=>{n(),process.exit(0)}),process.on("SIGINT",()=>{n(),process.exit(0)}),process.on("uncaughtException",t=>{e(t),process.exit(1)}),process.on("unhandledRejection",t=>{t instanceof Error&&e(t),process.exit(1)})},ne=e=>e!==null&&typeof e=="object";var Ee={exec:V,format:y,message:O};
//# sourceMappingURL=index.mjs.map

// EXTERNAL MODULE: ./dist/bin/tools/readThisNpmPackageVersion.js
var readThisNpmPackageVersion = __nccwpck_require__(64795);
// EXTERNAL MODULE: ./node_modules/chalk/source/index.js
var source = __nccwpck_require__(78818);
var source_default = /*#__PURE__*/__nccwpck_require__.n(source);
;// CONCATENATED MODULE: ./dist/bin/tools/assertNoPnpmDlx.js


function assertNoPnpmDlx() {
    if (__dirname.includes(`${external_path_.sep}pnpm${external_path_.sep}dlx${external_path_.sep}`)) {
        console.log([
            source_default().red("Please don't use `pnpm dlx keycloakify` (download and execute)"),
            "\nUse `npx keycloakify` or `pnpm exec keycloakify` instead since you want to use the keycloakify",
            "version that is installed in your project and not download and run the latest NPM version of keycloakify."
        ].join(" "));
        process.exit(1);
    }
}
//# sourceMappingURL=assertNoPnpmDlx.js.map
// EXTERNAL MODULE: ./dist/bin/shared/buildContext.js + 3 modules
var buildContext = __nccwpck_require__(85400);
;// CONCATENATED MODULE: ./dist/bin/main.js





assertNoPnpmDlx();
const program = Z({
    name: "keycloakify",
    description: "Keycloakify CLI",
    version: (0,readThisNpmPackageVersion/* readThisNpmPackageVersion */.K)()
}, {
    onException: error => {
        console.error(error);
        process.exit(1);
    }
});
const optionsKeys = [];
program.option({
    key: "projectDirPath",
    name: (() => {
        const long = "project";
        const short = "p";
        optionsKeys.push(long, short);
        return { long, short };
    })(),
    description: [
        `For monorepos, path to the keycloakify project.`,
        "Example: `npx keycloakify build --project packages/keycloak-theme`",
        "https://docs.keycloakify.dev/build-options#project-or-p-cli-option"
    ].join(" "),
    defaultValue: undefined
});
function skip(_context, argv) {
    const unrecognizedOptionKey = Object.keys(argv.options).find(key => !optionsKeys.includes(key));
    if (unrecognizedOptionKey !== undefined) {
        console.error(`keycloakify: Unrecognized option: ${unrecognizedOptionKey.length === 1 ? "-" : "--"}${unrecognizedOptionKey}`);
        process.exit(1);
    }
    return false;
}
program
    .command({
    name: "build",
    description: "Build the theme (default subcommand)."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(309), __nccwpck_require__.e(674), __nccwpck_require__.e(712)]).then(__nccwpck_require__.bind(__nccwpck_require__, 35712));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "start-keycloak",
    description: "Spin up a pre configured Docker image of Keycloak to test your theme."
})
    .option({
    key: "port",
    name: (() => {
        const name = "port";
        optionsKeys.push(name);
        return name;
    })(),
    description: ["Keycloak server port.", "Example `--port 8085`"].join(" "),
    defaultValue: undefined
})
    .option({
    key: "keycloakVersion",
    name: (() => {
        const name = "keycloak-version";
        optionsKeys.push(name);
        return name;
    })(),
    description: [
        "Use a specific version of Keycloak.",
        "Example `--keycloak-version 21.1.1`"
    ].join(" "),
    defaultValue: undefined
})
    .option({
    key: "realmJsonFilePath",
    name: (() => {
        const name = "import";
        optionsKeys.push(name);
        return name;
    })(),
    defaultValue: undefined,
    description: [
        "Import your own realm configuration file",
        "Example `--import path/to/myrealm-realm.json`"
    ].join(" ")
})
    .task({
    skip,
    handler: async ({ projectDirPath, keycloakVersion, port, realmJsonFilePath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(69), __nccwpck_require__.e(910), __nccwpck_require__.e(375)]).then(__nccwpck_require__.bind(__nccwpck_require__, 64097));
        await command({
            buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }),
            cliCommandOptions: {
                keycloakVersion: keycloakVersion === undefined ? undefined : `${keycloakVersion}`,
                port,
                realmJsonFilePath
            }
        });
    }
});
program
    .command({
    name: "init",
    description: "(BETA) Initialize a new theme type (login/account/admin/email)"
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(309), __nccwpck_require__.e(762)]).then(__nccwpck_require__.bind(__nccwpck_require__, 70762));
        await command({ projectDirPath: projectDirPath !== null && projectDirPath !== void 0 ? projectDirPath : process.cwd() });
    }
});
program
    .command({
    name: "eject-page",
    description: "Eject a Keycloak page."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(949), __nccwpck_require__.e(453)]).then(__nccwpck_require__.bind(__nccwpck_require__, 93453));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "add-story",
    description: "Add *.stories.tsx file for a specific page to in your Storybook."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(949), __nccwpck_require__.e(369)]).then(__nccwpck_require__.bind(__nccwpck_require__, 98097));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "initialize-email-theme",
    description: "Initialize an email theme."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(502), __nccwpck_require__.e(932)]).then(__nccwpck_require__.bind(__nccwpck_require__, 16932));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "initialize-account-theme",
    description: "Initialize an Account Single-Page or Multi-Page custom Account UI."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await __nccwpck_require__.e(/* import() */ 780).then(__nccwpck_require__.bind(__nccwpck_require__, 75780));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "initialize-admin-theme",
    description: "Initialize an Admin Console custom UI."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(502), __nccwpck_require__.e(355)]).then(__nccwpck_require__.bind(__nccwpck_require__, 60355));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "copy-keycloak-resources-to-public",
    description: "(Internal) Copy Keycloak default theme resources to the public directory."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await __nccwpck_require__.e(/* import() */ 40).then(__nccwpck_require__.bind(__nccwpck_require__, 18040));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "update-kc-gen",
    description: "(Webpack/Create-React-App only) Create/update the kc.gen.ts file in your project."
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(786), __nccwpck_require__.e(30)]).then(__nccwpck_require__.bind(__nccwpck_require__, 10786));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "sync-extensions",
    description: [
        "Synchronizes all installed Keycloakify extension modules with your project.",
        "",
        "Example of extension modules: '@keycloakify/keycloak-account-ui', '@keycloakify/keycloak-admin-ui', '@keycloakify/keycloak-ui-shared'",
        "",
        "This command ensures that:",
        "- All required files from installed extensions are copied into your project.",
        "- The copied files are correctly ignored by Git to help you distinguish between your custom source files",
        "  and those provided by the extensions.",
        "- Peer dependencies declared by the extensions are automatically added to your package.json.",
        "",
        "You can safely run this command multiple times. It will only update the files and dependencies if needed,",
        "ensuring your project stays in sync with the installed extensions.",
        "",
        "Typical usage:",
        "- Should be run as a postinstall script of your project.",
        ""
    ].join("\n")
})
    .task({
    skip,
    handler: async ({ projectDirPath }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(69), __nccwpck_require__.e(786), __nccwpck_require__.e(97), __nccwpck_require__.e(946)]).then(__nccwpck_require__.bind(__nccwpck_require__, 74946));
        await command({ buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }) });
    }
});
program
    .command({
    name: "own",
    description: [
        "Manages ownership of auto-generated files provided by Keycloakify extensions.",
        "",
        "This command allows you to take ownership of a specific file or directory generated",
        "by an extension. Once owned, you can freely modify and version-control the file.",
        "",
        "You can also use the --revert flag to relinquish ownership and restore the file",
        "or directory to its original auto-generated state.",
        "",
        "For convenience, the exact command to take ownership of any file is included as a comment",
        "in the header of each extension-generated file.",
        "",
        "Examples:",
        "$ npx keycloakify own --path admin/KcPage.tsx"
    ].join("\n")
})
    .option({
    key: "path",
    name: (() => {
        const long = "path";
        const short = "t";
        optionsKeys.push(long, short);
        return { long, short };
    })(),
    description: [
        "Specifies the relative path of the file or directory to take ownership of.",
        "This path should be relative to your theme directory.",
        "Example: `--path 'admin/KcPage.tsx'`"
    ].join(" ")
})
    .option({
    key: "revert",
    name: (() => {
        const long = "revert";
        const short = "r";
        optionsKeys.push(long, short);
        return { long, short };
    })(),
    description: [
        "Restores a file or directory to its original auto-generated state,",
        "removing your ownership claim and reverting any modifications."
    ].join(" "),
    defaultValue: false
})
    .option({
    key: "public",
    name: (() => {
        const long = "public";
        const short = "p";
        optionsKeys.push(long, short);
        return { long, short };
    })(),
    description: [
        "Flag to use when targeting a file or directory in the public directory",
        "instead of the src"
    ].join(" "),
    defaultValue: false
})
    .task({
    skip,
    handler: async ({ projectDirPath, path, revert, public: public_params }) => {
        const { command } = await Promise.all(/* import() */[__nccwpck_require__.e(69), __nccwpck_require__.e(786), __nccwpck_require__.e(97), __nccwpck_require__.e(930)]).then(__nccwpck_require__.bind(__nccwpck_require__, 71930));
        await command({
            buildContext: (0,buildContext/* getBuildContext */.s)({ projectDirPath }),
            cliCommandOptions: { path, isRevert: revert, isPublic: public_params }
        });
    }
});
// Fallback to build command if no command is provided
{
    const [, , ...rest] = process.argv;
    if (rest.length === 0 ||
        (rest[0].startsWith("-") && rest[0] !== "--help" && rest[0] !== "-h")) {
        const { status } = external_child_process_.spawnSync("npx", ["keycloakify", "build", ...rest], {
            stdio: "inherit"
        });
        process.exit(status !== null && status !== void 0 ? status : 1);
    }
}
//# sourceMappingURL=main.js.map
})();

module.exports = __webpack_exports__;
/******/ })()
;