import type { BuildContext } from "./buildContext";
export declare const BIN_NAME = "_keycloakify-custom-handler";
export declare const NOT_IMPLEMENTED_EXIT_CODE = 78;
export type CommandName = "update-kc-gen" | "eject-page" | "add-story" | "initialize-login-theme" | "initialize-account-theme" | "initialize-admin-theme" | "initialize-admin-theme" | "initialize-email-theme" | "copy-keycloak-resources-to-public" | "init";
export type ApiVersion = "v1";
export declare function readParams(params: {
    apiVersion: ApiVersion;
}): {
    commandName: CommandName;
    buildContext: BuildContext;
};
