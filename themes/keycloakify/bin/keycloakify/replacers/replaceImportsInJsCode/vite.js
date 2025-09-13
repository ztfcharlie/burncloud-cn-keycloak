import { WELL_KNOWN_DIRECTORY_BASE_NAME } from "../../../shared/constants";
import { assert } from "tsafe/assert";
import * as nodePath from "path";
import { replaceAll } from "../../../tools/String.prototype.replaceAll";
assert();
export function replaceImportsInJsCode_vite(params) {
    const { jsCode, buildContext, basenameOfAssetsFiles, systemType = nodePath.sep === "/" ? "posix" : "win32" } = params;
    const { relative: pathRelative, sep: pathSep } = nodePath[systemType];
    let fixedJsCode = jsCode;
    replace_base_js_import: {
        if (buildContext.urlPathname === undefined) {
            break replace_base_js_import;
        }
        // Optimization
        if (!jsCode.includes(buildContext.urlPathname)) {
            break replace_base_js_import;
        }
        // Replace `Hv=function(e){return"/abcde12345/"+e}` by `Hv=function(e){return"/"+e}`
        fixedJsCode = fixedJsCode.replace(new RegExp(`([\\w\\$][\\w\\d\\$]*)=function\\(([\\w\\$][\\w\\d\\$]*)\\)\\{return"${replaceAll(buildContext.urlPathname, "/", "\\/")}"\\+\\2\\}`, "g"), (...[, funcName, paramName]) => `${funcName}=function(${paramName}){return"/"+${paramName}}`);
    }
    replace_javascript_relatives_import_paths: {
        // Example: "assets/ or "foo/bar/"
        const staticDir = (() => {
            let out = pathRelative(buildContext.projectBuildDirPath, buildContext.assetsDirPath);
            out = replaceAll(out, pathSep, "/") + "/";
            if (out === "/") {
                throw new Error(`The assetsDirPath must be a subdirectory of projectBuildDirPath`);
            }
            return out;
        })();
        // Optimization
        if (!jsCode.includes(staticDir)) {
            break replace_javascript_relatives_import_paths;
        }
        basenameOfAssetsFiles
            .map(basenameOfAssetsFile => `${staticDir}${basenameOfAssetsFile}`)
            .forEach(relativePathOfAssetFile => {
            var _a;
            fixedJsCode = replaceAll(fixedJsCode, `"${relativePathOfAssetFile}"`, `(window.kcContext["x-keycloakify"].resourcesPath.substring(1) + "/${WELL_KNOWN_DIRECTORY_BASE_NAME.DIST}/${relativePathOfAssetFile}")`);
            fixedJsCode = replaceAll(fixedJsCode, `"${(_a = buildContext.urlPathname) !== null && _a !== void 0 ? _a : "/"}${relativePathOfAssetFile}"`, `(window.kcContext["x-keycloakify"].resourcesPath + "/${WELL_KNOWN_DIRECTORY_BASE_NAME.DIST}/${relativePathOfAssetFile}")`);
        });
    }
    return { fixedJsCode };
}
//# sourceMappingURL=vite.js.map