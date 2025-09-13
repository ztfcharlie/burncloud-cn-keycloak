import { assert } from "tsafe/assert";
import { CUSTOM_HANDLER_ENV_NAMES } from "./constants";
import { NOT_IMPLEMENTED_EXIT_CODE, BIN_NAME } from "./customHandler";
import * as child_process from "child_process";
import { getNodeModulesBinDirPath } from "../tools/nodeModulesBinDirPath";
import * as fs from "fs";
assert();
export async function maybeDelegateCommandToCustomHandler(params) {
    const { commandName, buildContext } = params;
    const nodeModulesBinDirPath = await getNodeModulesBinDirPath({
        packageJsonFilePath: buildContext.packageJsonFilePath
    });
    if (!fs.readdirSync(nodeModulesBinDirPath).includes(BIN_NAME)) {
        return { hasBeenHandled: false };
    }
    try {
        child_process.execSync(`npx ${BIN_NAME}`, {
            stdio: "inherit",
            env: Object.assign(Object.assign({}, process.env), { [CUSTOM_HANDLER_ENV_NAMES.COMMAND_NAME]: commandName, [CUSTOM_HANDLER_ENV_NAMES.BUILD_CONTEXT]: JSON.stringify(buildContext) })
        });
    }
    catch (error) {
        const status = error.status;
        if (status === NOT_IMPLEMENTED_EXIT_CODE) {
            return { hasBeenHandled: false };
        }
        process.exit(status);
    }
    return { hasBeenHandled: true };
}
//# sourceMappingURL=customHandler_delegate.js.map