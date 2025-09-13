import { dirname as pathDirname, relative as pathRelative, sep as pathSep } from "path";
import { assert } from "tsafe/assert";
assert();
export function addSyncExtensionsToPostinstallScript(params) {
    var _a;
    const { parsedPackageJson, buildContext } = params;
    const cmd_base = "keycloakify sync-extensions";
    const projectCliOptionValue = (() => {
        const packageJsonDirPath = pathDirname(buildContext.packageJsonFilePath);
        const relativePath = pathRelative(packageJsonDirPath, buildContext.projectDirPath);
        if (relativePath === "") {
            return undefined;
        }
        return relativePath.split(pathSep).join("/");
    })();
    const generateCmd = (params) => {
        const { cmd_preexisting } = params;
        let cmd = cmd_preexisting === undefined ? "" : `${cmd_preexisting} && `;
        cmd += cmd_base;
        if (projectCliOptionValue !== undefined) {
            cmd += ` -p ${projectCliOptionValue}`;
        }
        return cmd;
    };
    {
        const scripts = ((_a = parsedPackageJson.scripts) !== null && _a !== void 0 ? _a : (parsedPackageJson.scripts = {}));
        for (const scriptName of ["postinstall", "prepare"]) {
            const cmd_preexisting = scripts[scriptName];
            if (cmd_preexisting === undefined) {
                continue;
            }
            if (!cmd_preexisting.includes(cmd_base)) {
                scripts[scriptName] = generateCmd({ cmd_preexisting });
                return;
            }
        }
    }
    parsedPackageJson.scripts = Object.assign({ postinstall: generateCmd({ cmd_preexisting: undefined }) }, parsedPackageJson.scripts);
}
//# sourceMappingURL=addSyncExtensionsToPostinstallScript.js.map