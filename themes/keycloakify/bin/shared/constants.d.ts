export declare const WELL_KNOWN_DIRECTORY_BASE_NAME: {
    readonly KEYCLOAKIFY_DEV_RESOURCES: "keycloakify-dev-resources";
    readonly RESOURCES_COMMON: "resources-common";
    readonly DIST: "dist";
};
export declare const THEME_TYPES: readonly ["login", "account", "admin"];
export type ThemeType = (typeof THEME_TYPES)[number];
export declare const VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES: {
    readonly RUN_POST_BUILD_SCRIPT: "KEYCLOAKIFY_RUN_POST_BUILD_SCRIPT";
    readonly RESOLVE_VITE_CONFIG: "KEYCLOAKIFY_RESOLVE_VITE_CONFIG";
    readonly READ_KC_CONTEXT_FROM_URL: "KEYCLOAKIFY_READ_KC_CONTEXT_FROM_URL";
};
export declare const BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME = "KEYCLOAKIFY_BUILD_FOR_KEYCLOAK_MAJOR_VERSION";
export declare const LOGIN_THEME_PAGE_IDS: readonly ["login.ftl", "login-username.ftl", "login-password.ftl", "webauthn-authenticate.ftl", "webauthn-register.ftl", "register.ftl", "info.ftl", "error.ftl", "login-reset-password.ftl", "login-verify-email.ftl", "terms.ftl", "login-oauth2-device-verify-user-code.ftl", "login-oauth-grant.ftl", "login-otp.ftl", "login-update-profile.ftl", "login-update-password.ftl", "login-idp-link-confirm.ftl", "login-idp-link-email.ftl", "login-page-expired.ftl", "login-config-totp.ftl", "logout-confirm.ftl", "idp-review-user-profile.ftl", "update-email.ftl", "select-authenticator.ftl", "saml-post-form.ftl", "delete-credential.ftl", "code.ftl", "delete-account-confirm.ftl", "frontchannel-logout.ftl", "login-recovery-authn-code-config.ftl", "login-recovery-authn-code-input.ftl", "login-reset-otp.ftl", "login-x509-info.ftl", "webauthn-error.ftl", "login-passkeys-conditional-authenticate.ftl", "login-idp-link-confirm-override.ftl"];
export declare const ACCOUNT_THEME_PAGE_IDS: readonly ["password.ftl", "account.ftl", "sessions.ftl", "totp.ftl", "applications.ftl", "log.ftl", "federatedIdentity.ftl"];
export type LoginThemePageId = (typeof LOGIN_THEME_PAGE_IDS)[number];
export type AccountThemePageId = (typeof ACCOUNT_THEME_PAGE_IDS)[number];
export declare const CONTAINER_NAME = "keycloak-keycloakify";
export declare const FALLBACK_LANGUAGE_TAG = "en";
export declare const CUSTOM_HANDLER_ENV_NAMES: {
    COMMAND_NAME: string;
    BUILD_CONTEXT: string;
};
export declare const KEYCLOAK_THEME = "keycloak-theme";
export declare const KEYCLOAKIFY_SPA_DEV_SERVER_PORT = "KEYCLOAKIFY_SPA_DEV_SERVER_PORT";
export declare const KEYCLOAKIFY_LOGGING_VERSION = "1.0.3";
export declare const KEYCLOAKIFY_LOGIN_JAR_BASENAME: string;
export declare const TEST_APP_URL = "https://my-theme.keycloakify.dev";
