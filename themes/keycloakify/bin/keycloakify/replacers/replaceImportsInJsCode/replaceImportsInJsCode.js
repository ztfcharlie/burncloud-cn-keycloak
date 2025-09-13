import { assert } from "tsafe/assert";
import { replaceImportsInJsCode_vite } from "./vite";
import { replaceImportsInJsCode_webpack } from "./webpack";
import * as fs from "fs";
assert();
export function replaceImportsInJsCode(params) {
    const { jsCode, buildContext } = params;
    const { fixedJsCode } = (() => {
        switch (buildContext.bundler) {
            case "vite":
                return replaceImportsInJsCode_vite({
                    jsCode,
                    buildContext,
                    basenameOfAssetsFiles: readAssetsDirSync({
                        assetsDirPath: params.buildContext.assetsDirPath
                    })
                });
            case "webpack":
                return replaceImportsInJsCode_webpack({
                    jsCode,
                    buildContext
                });
        }
    })();
    return { fixedJsCode };
}
const { readAssetsDirSync } = (() => {
    let cache = undefined;
    function readAssetsDirSync(params) {
        const { assetsDirPath } = params;
        if (cache !== undefined && cache.assetsDirPath === assetsDirPath) {
            return cache.basenameOfAssetsFiles;
        }
        const basenameOfAssetsFiles = fs.readdirSync(assetsDirPath);
        cache = {
            assetsDirPath,
            basenameOfAssetsFiles
        };
        return basenameOfAssetsFiles;
    }
    return { readAssetsDirSync };
})();
//# sourceMappingURL=replaceImportsInJsCode.js.map