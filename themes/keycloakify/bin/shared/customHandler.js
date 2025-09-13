import { assert } from "tsafe/assert";
import { CUSTOM_HANDLER_ENV_NAMES } from "./constants";
export const BIN_NAME = "_keycloakify-custom-handler";
export const NOT_IMPLEMENTED_EXIT_CODE = 78;
export function readParams(params) {
    const { apiVersion } = params;
    assert(apiVersion === "v1");
    const commandName = (() => {
        const envValue = process.env[CUSTOM_HANDLER_ENV_NAMES.COMMAND_NAME];
        assert(envValue !== undefined);
        return envValue;
    })();
    const buildContext = (() => {
        const envValue = process.env[CUSTOM_HANDLER_ENV_NAMES.BUILD_CONTEXT];
        assert(envValue !== undefined);
        return JSON.parse(envValue);
    })();
    return { commandName, buildContext };
}
//# sourceMappingURL=customHandler.js.map