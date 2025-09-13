import { parse as urlParse } from "url";
import { join as pathJoin, sep as pathSep, resolve as pathResolve, dirname as pathDirname } from "path";
import { getAbsoluteAndInOsFormatPath } from "../tools/getAbsoluteAndInOsFormatPath";
import { z } from "zod";
import * as fs from "fs";
import { assert, is } from "tsafe/assert";
import * as child_process from "child_process";
import { VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES, BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME } from "./constants";
import { exclude } from "tsafe";
import { crawl } from "../tools/crawl";
import { KEYCLOAK_THEME } from "./constants";
import { objectEntries } from "tsafe/objectEntries";
import { id } from "tsafe/id";
import chalk from "chalk";
import { getProxyFetchOptions } from "../tools/fetchProxyOptions";
assert();
export function getBuildContext(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const projectDirPath = params.projectDirPath !== undefined
        ? getAbsoluteAndInOsFormatPath({
            pathIsh: params.projectDirPath,
            cwd: process.cwd()
        })
        : process.cwd();
    const { themeSrcDirPath } = (() => {
        const srcDirPath = pathJoin(projectDirPath, "src");
        const themeSrcDirPath = crawl({
            dirPath: srcDirPath,
            returnedPathsType: "relative to dirPath"
        })
            .map(fileRelativePath => {
            for (const themeSrcDirBasename of [
                KEYCLOAK_THEME,
                KEYCLOAK_THEME.replace(/-/g, "_")
            ]) {
                const split = fileRelativePath.split(themeSrcDirBasename);
                if (split.length === 2) {
                    return pathJoin(srcDirPath, split[0] + themeSrcDirBasename);
                }
            }
            return undefined;
        })
            .filter(exclude(undefined))[0];
        if (themeSrcDirPath !== undefined) {
            return { themeSrcDirPath };
        }
        return { themeSrcDirPath: srcDirPath };
    })();
    const { resolvedViteConfig } = (() => {
        if (fs
            .readdirSync(projectDirPath)
            .find(fileBasename => fileBasename.startsWith("vite.config")) ===
            undefined) {
            return { resolvedViteConfig: undefined };
        }
        let output;
        try {
            output = child_process
                .execSync("npx vite", {
                cwd: projectDirPath,
                stdio: ["pipe", "pipe", "ignore"],
                env: Object.assign(Object.assign({}, process.env), { [VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG]: "true" })
            })
                .toString("utf8");
        }
        catch (error) {
            throw new Error(`Failed to run \`npx vite\`: ${error}`);
        }
        assert(output.includes(VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG), "Seems like the Keycloakify's Vite plugin is not installed.");
        const resolvedViteConfigStr = output
            .split(VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG)
            .reverse()[0];
        const resolvedViteConfig = JSON.parse(resolvedViteConfigStr);
        return { resolvedViteConfig };
    })();
    const packageJsonFilePath = (function getPackageJSonDirPath(upCount) {
        var _a, _b;
        const dirPath = pathResolve(pathJoin(...[projectDirPath, ...Array(upCount).fill("..")]));
        assert(dirPath !== pathSep, "Root package.json not found");
        success: {
            const packageJsonFilePath = pathJoin(dirPath, "package.json");
            if (!fs.existsSync(packageJsonFilePath)) {
                break success;
            }
            const parsedPackageJson = z
                .object({
                name: z.string().optional(),
                dependencies: z.record(z.string()).optional(),
                devDependencies: z.record(z.string()).optional()
            })
                .parse(JSON.parse(fs.readFileSync(packageJsonFilePath).toString("utf8")));
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
            const zTargetType = z.object({
                accountThemeImplementation: z.literal("Multi-Page"),
                keycloakVersionTargets: z
                    .object({
                    "21-and-below": z.union([z.boolean(), z.string()]),
                    "23": z.union([z.boolean(), z.string()]),
                    "24": z.union([z.boolean(), z.string()]),
                    "25": z.union([z.boolean(), z.string()]),
                    "26.0-to-26.1": z.union([z.boolean(), z.string()]),
                    "26.2-and-above": z.union([z.boolean(), z.string()])
                })
                    .optional()
            });
            assert();
            return id(zTargetType);
        })();
        const zSinglePageApp = (() => {
            const zTargetType = z.object({
                accountThemeImplementation: z.union([
                    z.literal("Single-Page"),
                    z.literal("none")
                ]),
                keycloakVersionTargets: z
                    .object({
                    "22-to-25": z.union([z.boolean(), z.string()]),
                    "all-other-versions": z.union([z.boolean(), z.string()])
                })
                    .optional()
            });
            assert();
            return id(zTargetType);
        })();
        const zAccountThemeImplAndKeycloakVersionTargets = (() => {
            const zTargetType = z.union([zMultiPageApp, zSinglePageApp]);
            assert();
            return id(zTargetType);
        })();
        const zStartKeycloakOptions = (() => {
            const zTargetType = z.object({
                dockerImage: z.string().optional(),
                extensionJars: z.array(z.string()).optional(),
                realmJsonFilePath: z.string().optional(),
                dockerExtraArgs: z.array(z.string()).optional(),
                keycloakExtraArgs: z.array(z.string()).optional(),
                port: z.number().optional()
            });
            assert();
            return id(zTargetType);
        })();
        const zBuildOptions = (() => {
            const zTargetType = z.intersection(z.object({
                themeName: z.union([z.string(), z.array(z.string())]).optional(),
                themeVersion: z.string().optional(),
                environmentVariables: z
                    .array(z.object({
                    name: z.string(),
                    default: z.string()
                }))
                    .optional(),
                extraThemeProperties: z.array(z.string()).optional(),
                artifactId: z.string().optional(),
                groupId: z.string().optional(),
                keycloakifyBuildDirPath: z.string().optional(),
                kcContextExclusionsFtl: z.string().optional(),
                startKeycloakOptions: zStartKeycloakOptions.optional()
            }), zAccountThemeImplAndKeycloakVersionTargets);
            assert();
            return id(zTargetType);
        })();
        const zBuildOptions_packageJson = (() => {
            const zTargetType = z.intersection(zBuildOptions, z.object({
                projectBuildDirPath: z.string().optional(),
                staticDirPathInProjectBuildDirPath: z.string().optional(),
                publicDirPath: z.string().optional()
            }));
            assert();
            return id(zTargetType);
        })();
        const zParsedPackageJson = (() => {
            const zTargetType = z.object({
                name: z.string().optional(),
                version: z.string().optional(),
                homepage: z.string().optional(),
                keycloakify: zBuildOptions_packageJson.optional()
            });
            assert();
            return id(zTargetType);
        })();
        const configurationPackageJsonFilePath = (() => {
            const rootPackageJsonFilePath = pathJoin(projectDirPath, "package.json");
            return fs.existsSync(rootPackageJsonFilePath)
                ? rootPackageJsonFilePath
                : packageJsonFilePath;
        })();
        return zParsedPackageJson.parse(JSON.parse(fs.readFileSync(configurationPackageJsonFilePath).toString("utf8")));
    })();
    const bundler = resolvedViteConfig !== undefined ? "vite" : "webpack";
    if (bundler === "vite" && parsedPackageJson.keycloakify !== undefined) {
        console.error(chalk.red(`In vite projects, provide your Keycloakify options in vite.config.ts, not in package.json`));
        process.exit(-1);
    }
    const buildOptions = (() => {
        switch (bundler) {
            case "vite":
                assert(resolvedViteConfig !== undefined);
                return resolvedViteConfig.buildOptions;
            case "webpack":
                assert(parsedPackageJson.keycloakify !== undefined);
                return parsedPackageJson.keycloakify;
        }
        assert(false);
    })();
    const implementedThemeTypes = (() => {
        const getIsNative = (dirPath) => fs.existsSync(pathJoin(dirPath, "theme.properties"));
        return {
            login: (() => {
                const dirPath = pathJoin(themeSrcDirPath, "login");
                if (!fs.existsSync(dirPath)) {
                    return { isImplemented: false, isImplemented_native: false };
                }
                if (getIsNative(dirPath)) {
                    return { isImplemented: false, isImplemented_native: true };
                }
                return { isImplemented: true };
            })(),
            email: (() => {
                const dirPath = pathJoin(themeSrcDirPath, "email");
                if (!fs.existsSync(dirPath) || !getIsNative(dirPath)) {
                    return { isImplemented: false, isImplemented_native: false };
                }
                return { isImplemented: false, isImplemented_native: true };
            })(),
            account: (() => {
                const dirPath = pathJoin(themeSrcDirPath, "account");
                if (!fs.existsSync(dirPath)) {
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
                const dirPath = pathJoin(themeSrcDirPath, "admin");
                if (!fs.existsSync(dirPath)) {
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
        !fs.existsSync(pathJoin(themeSrcDirPath, "account"))) {
        console.error(chalk.red([
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
            assert(mainThemeName !== undefined);
            return [mainThemeName, ...themeVariantNames];
        })();
        for (const themeName of themeNames) {
            if (!/^[a-zA-Z0-9_-]+$/.test(themeName)) {
                console.error(chalk.red([
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
                return pathDirname(packageJsonFilePath);
        }
    })();
    const projectBuildDirPath = (() => {
        webpack: {
            if (bundler !== "webpack") {
                break webpack;
            }
            assert(parsedPackageJson.keycloakify !== undefined);
            if (parsedPackageJson.keycloakify.projectBuildDirPath !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: parsedPackageJson.keycloakify.projectBuildDirPath,
                    cwd: relativePathsCwd
                });
            }
            return pathJoin(projectDirPath, "build");
        }
        assert(bundler === "vite");
        assert(resolvedViteConfig !== undefined);
        return pathJoin(projectDirPath, resolvedViteConfig.buildDir);
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
                : (_e = (_d = (_c = urlParse(parsedPackageJson.homepage)
                    .host) === null || _c === void 0 ? void 0 : _c.replace(/:[0-9]+$/, "")) === null || _d === void 0 ? void 0 : _d.split(".").reverse().join(".")) !== null && _e !== void 0 ? _e : fallbackGroupId) + ".keycloak");
        })(),
        artifactId: (_d = (_c = process.env.KEYCLOAKIFY_ARTIFACT_ID) !== null && _c !== void 0 ? _c : buildOptions.artifactId) !== null && _d !== void 0 ? _d : `${themeNames[0]}-keycloak-theme`,
        projectDirPath,
        projectBuildDirPath,
        keycloakifyBuildDirPath: (() => {
            if (buildOptions.keycloakifyBuildDirPath !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: buildOptions.keycloakifyBuildDirPath,
                    cwd: relativePathsCwd
                });
            }
            return pathJoin(projectDirPath, (resolvedViteConfig === null || resolvedViteConfig === void 0 ? void 0 : resolvedViteConfig.buildDir) === undefined
                ? "build_keycloak"
                : `${resolvedViteConfig.buildDir}_keycloak`);
        })(),
        publicDirPath: (() => {
            if (process.env.PUBLIC_DIR_PATH !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: process.env.PUBLIC_DIR_PATH,
                    cwd: projectDirPath
                });
            }
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }
                assert(parsedPackageJson.keycloakify !== undefined);
                if (parsedPackageJson.keycloakify.publicDirPath !== undefined) {
                    return getAbsoluteAndInOsFormatPath({
                        pathIsh: parsedPackageJson.keycloakify.publicDirPath,
                        cwd: relativePathsCwd
                    });
                }
                return pathJoin(projectDirPath, "public");
            }
            assert(bundler === "vite");
            assert(resolvedViteConfig !== undefined);
            return pathJoin(projectDirPath, resolvedViteConfig.publicDir);
        })(),
        cacheDirPath: pathJoin((() => {
            if (process.env.XDG_CACHE_HOME !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: process.env.XDG_CACHE_HOME,
                    cwd: process.cwd()
                });
            }
            return pathJoin(pathDirname(packageJsonFilePath), "node_modules", ".cache");
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
            assert(bundler === "vite");
            assert(resolvedViteConfig !== undefined);
            return resolvedViteConfig.urlPathname;
        })(),
        assetsDirPath: (() => {
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }
                assert(parsedPackageJson.keycloakify !== undefined);
                if (parsedPackageJson.keycloakify.staticDirPathInProjectBuildDirPath !==
                    undefined) {
                    getAbsoluteAndInOsFormatPath({
                        pathIsh: parsedPackageJson.keycloakify
                            .staticDirPathInProjectBuildDirPath,
                        cwd: relativePathsCwd
                    });
                }
                return pathJoin(projectBuildDirPath, "static");
            }
            assert(bundler === "vite");
            assert(resolvedViteConfig !== undefined);
            return pathJoin(projectBuildDirPath, resolvedViteConfig.assetsDir);
        })(),
        kcContextExclusionsFtlCode: (() => {
            if (buildOptions.kcContextExclusionsFtl === undefined) {
                return undefined;
            }
            if (buildOptions.kcContextExclusionsFtl.endsWith(".ftl")) {
                const kcContextExclusionsFtlPath = getAbsoluteAndInOsFormatPath({
                    pathIsh: buildOptions.kcContextExclusionsFtl,
                    cwd: projectDirPath
                });
                return fs.readFileSync(kcContextExclusionsFtlPath).toString("utf8");
            }
            return buildOptions.kcContextExclusionsFtl;
        })(),
        environmentVariables: (_e = buildOptions.environmentVariables) !== null && _e !== void 0 ? _e : [],
        implementedThemeTypes,
        themeSrcDirPath,
        get fetchOptions() {
            return getProxyFetchOptions({
                npmConfigGetCwd: (function callee(upCount) {
                    const dirPath = pathResolve(pathJoin(...[projectDirPath, ...Array(upCount).fill("..")]));
                    assert(dirPath !== pathSep, "Couldn't find a place to run 'npm config get'");
                    try {
                        child_process.execSync("npm config get", {
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
                    const envValue = process.env[BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME];
                    if (envValue === undefined) {
                        return undefined;
                    }
                    const major = parseInt(envValue);
                    assert(!isNaN(major));
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
                            assert(buildForKeycloakMajorVersionNumber !== 22);
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
                        assert();
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
                        assert();
                        return keycloakVersionRange;
                    }
                })();
                const jarFileBasename = (() => {
                    use_custom_jar_basename: {
                        const { keycloakVersionTargets } = buildOptions;
                        assert(is(keycloakVersionTargets));
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
                        assert(true);
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
                        assert(true);
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
                assert(is(keycloakVersionTargets));
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
                    console.log(chalk.red(`Bad ${jarFileBasename} should end with '.jar'\n`));
                    process.exit(1);
                }
                if (jarFileBasename.includes("/") || jarFileBasename.includes("\\")) {
                    console.log(chalk.red([
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
                console.log(chalk.red("All jar targets are disabled. Please enable at least one jar target."));
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
                assert(reference !== undefined && tag !== undefined && rest.length === 0, `Invalid docker image: ${buildOptions.startKeycloakOptions.dockerImage}`);
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
                    path: getAbsoluteAndInOsFormatPath({
                        pathIsh: urlOrPath,
                        cwd: relativePathsCwd
                    })
                };
            }),
            realmJsonFilePath: ((_m = buildOptions.startKeycloakOptions) === null || _m === void 0 ? void 0 : _m.realmJsonFilePath) === undefined
                ? undefined
                : getAbsoluteAndInOsFormatPath({
                    pathIsh: buildOptions.startKeycloakOptions.realmJsonFilePath,
                    cwd: relativePathsCwd
                }),
            port: (_o = buildOptions.startKeycloakOptions) === null || _o === void 0 ? void 0 : _o.port
        }
    };
}
//# sourceMappingURL=buildContext.js.map