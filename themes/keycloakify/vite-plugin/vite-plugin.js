"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloakify = void 0;
const path_1 = require("path");
const constants_1 = require("../bin/shared/constants");
const id_1 = require("tsafe/id");
const fs_rm_1 = require("../bin/tools/fs.rm");
const copy_keycloak_resources_to_public_1 = require("../bin/copy-keycloak-resources-to-public");
const assert_1 = require("tsafe/assert");
const buildContext_1 = require("../bin/shared/buildContext");
const magic_string_1 = __importDefault(require("magic-string"));
const update_kc_gen_1 = require("../bin/update-kc-gen");
const String_prototype_replaceAll_1 = require("../bin/tools/String.prototype.replaceAll");
function keycloakify(params) {
    const { postBuild, ...buildOptions } = params;
    let projectDirPath = undefined;
    let urlPathname = undefined;
    let buildDirPath = undefined;
    let command = undefined;
    let shouldGenerateSourcemap = undefined;
    const plugin = {
        name: "keycloakify",
        configResolved: async (resolvedConfig) => {
            shouldGenerateSourcemap = resolvedConfig.build.sourcemap !== false;
            run_post_build_script_case: {
                const envValue = process.env[constants_1.VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RUN_POST_BUILD_SCRIPT];
                if (envValue === undefined) {
                    break run_post_build_script_case;
                }
                const { buildContext, resourcesDirPath } = JSON.parse(envValue);
                process.chdir(resourcesDirPath);
                await (postBuild === null || postBuild === void 0 ? void 0 : postBuild(buildContext));
                process.exit(0);
            }
            command = resolvedConfig.command;
            projectDirPath = resolvedConfig.root;
            urlPathname = (() => {
                var _a;
                let out = resolvedConfig.env.BASE_URL;
                if (out.startsWith(".") &&
                    command === "build" &&
                    ((_a = resolvedConfig.envPrefix) === null || _a === void 0 ? void 0 : _a.includes("STORYBOOK_")) !== true) {
                    throw new Error([
                        `BASE_URL=${out} is not supported By Keycloakify. Use an absolute path instead.`,
                        `If this is a problem, please open an issue at https://github.com/keycloakify/keycloakify/issues/new`
                    ].join("\n"));
                }
                if (out === undefined) {
                    return undefined;
                }
                if (!out.startsWith("/")) {
                    out = "/" + out;
                }
                if (!out.endsWith("/")) {
                    out += "/";
                }
                return out;
            })();
            buildDirPath = (0, path_1.join)(projectDirPath, resolvedConfig.build.outDir);
            resolve_vite_config_case: {
                const envValue = process.env[constants_1.VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG];
                if (envValue === undefined) {
                    break resolve_vite_config_case;
                }
                console.log(constants_1.VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG);
                console.log(JSON.stringify((0, id_1.id)({
                    publicDir: (0, path_1.relative)(projectDirPath, resolvedConfig.publicDir),
                    assetsDir: resolvedConfig.build.assetsDir,
                    buildDir: resolvedConfig.build.outDir,
                    urlPathname,
                    buildOptions
                })));
                process.exit(0);
            }
            const buildContext = (0, buildContext_1.getBuildContext)({
                projectDirPath
            });
            await (0, copy_keycloak_resources_to_public_1.command)({ buildContext });
            await (0, update_kc_gen_1.command)({ buildContext });
        },
        transform: (code, id) => {
            id = (0, String_prototype_replaceAll_1.replaceAll)(id, "/", path_1.sep);
            (0, assert_1.assert)(command !== undefined);
            (0, assert_1.assert)(shouldGenerateSourcemap !== undefined);
            if (command !== "build") {
                return;
            }
            (0, assert_1.assert)(projectDirPath !== undefined);
            {
                const isWithinSourceDirectory = id.startsWith((0, path_1.join)(projectDirPath, "src") + path_1.sep);
                if (!isWithinSourceDirectory) {
                    return;
                }
            }
            {
                const isJavascriptFile = id.endsWith(".js") || id.endsWith(".jsx");
                const isTypeScriptFile = id.endsWith(".ts") || id.endsWith(".tsx");
                const isSvelteFile = id.endsWith(".svelte");
                if (!isTypeScriptFile && !isJavascriptFile && !isSvelteFile) {
                    return;
                }
            }
            const transformedCode = new magic_string_1.default(code);
            transformedCode.replaceAll(/import\.meta\.env(?:(?:\.BASE_URL)|(?:\["BASE_URL"\]))/g, [
                `(`,
                `(window.kcContext === undefined || import.meta.env.MODE === "development")?`,
                `import.meta.env.BASE_URL:`,
                `(window.kcContext["x-keycloakify"].resourcesPath + "/${constants_1.WELL_KNOWN_DIRECTORY_BASE_NAME.DIST}/")`,
                `)`
            ].join(""));
            if (!transformedCode.hasChanged()) {
                return;
            }
            if (!shouldGenerateSourcemap) {
                return transformedCode.toString();
            }
            const map = transformedCode.generateMap({
                source: id,
                includeContent: true,
                hires: true
            });
            return {
                code: transformedCode.toString(),
                map: map.toString()
            };
        },
        closeBundle: async () => {
            (0, assert_1.assert)(command !== undefined);
            if (command !== "build") {
                return;
            }
            (0, assert_1.assert)(buildDirPath !== undefined);
            // NOTE: This is legacy and should eventually be removed
            await (0, fs_rm_1.rm)((0, path_1.join)(buildDirPath, constants_1.WELL_KNOWN_DIRECTORY_BASE_NAME.KEYCLOAKIFY_DEV_RESOURCES), {
                recursive: true,
                force: true
            });
            await (0, fs_rm_1.rm)((0, path_1.join)(buildDirPath, constants_1.KEYCLOAK_THEME), {
                recursive: true,
                force: true
            });
        },
        transformIndexHtml: html => {
            const doReadKcContextFromUrl = process.env.NODE_ENV === "development" &&
                process.env[constants_1.VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.READ_KC_CONTEXT_FROM_URL] === "true";
            if (!doReadKcContextFromUrl) {
                return html;
            }
            const scriptContent = `
(()=>{

    const url = new URL(window.location.href);

    const kcContext_str = url.searchParams.get("kcContext");

    if( kcContext_str === null ){

        const keycloakServerPort = sessionStorage.getItem("keycloakServerPort");

        if( keycloakServerPort === null ){
            return;
        }

        const redirectUrl = new URL(window.location.href);

        redirectUrl.port = keycloakServerPort;

        window.location.href = redirectUrl;

        return;

    }

    url.searchParams.delete("kcContext");

    {

        const keycloakServerPort = url.searchParams.get("keycloakServerPort");

        if( keycloakServerPort === null ){
            throw new Error("Wrong assertion");
        }

        sessionStorage.setItem("keycloakServerPort", keycloakServerPort);
        url.searchParams.delete("keycloakServerPort");

    }

    window.history.replaceState({}, "", url);

    window.kcContext = JSON.parse(kcContext_str);

})();
`;
            return html.replace(/<head>/, `<head><script>${scriptContent}</script>`);
        }
    };
    return plugin;
}
exports.keycloakify = keycloakify;
