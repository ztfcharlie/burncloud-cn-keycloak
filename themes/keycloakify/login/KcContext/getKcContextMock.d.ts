import type { ExtendKcContext, KcContext as KcContextBase } from "./KcContext";
import type { LoginThemePageId } from "../../bin/shared/constants";
import type { DeepPartial } from "../../tools/DeepPartial";
export declare function createGetKcContextMock<KcContextExtension extends {
    properties?: Record<string, string | undefined>;
}, KcContextExtensionPerPage extends Record<`${string}.ftl`, Record<string, unknown>>>(params: {
    kcContextExtension: KcContextExtension;
    kcContextExtensionPerPage: KcContextExtensionPerPage;
    overrides?: DeepPartial<KcContextExtension & KcContextBase.Common>;
    overridesPerPage?: {
        [PageId in LoginThemePageId | keyof KcContextExtensionPerPage]?: DeepPartial<Extract<ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>, {
            pageId: PageId;
        }>>;
    };
}): {
    getKcContextMock: <PageId extends "login.ftl" | "login-username.ftl" | "login-password.ftl" | "webauthn-authenticate.ftl" | "webauthn-register.ftl" | "register.ftl" | "info.ftl" | "error.ftl" | "login-reset-password.ftl" | "login-verify-email.ftl" | "terms.ftl" | "login-oauth2-device-verify-user-code.ftl" | "login-oauth-grant.ftl" | "login-otp.ftl" | "login-update-profile.ftl" | "login-update-password.ftl" | "login-idp-link-confirm.ftl" | "login-idp-link-email.ftl" | "login-page-expired.ftl" | "login-config-totp.ftl" | "logout-confirm.ftl" | "idp-review-user-profile.ftl" | "update-email.ftl" | "select-authenticator.ftl" | "saml-post-form.ftl" | "delete-credential.ftl" | "code.ftl" | "delete-account-confirm.ftl" | "frontchannel-logout.ftl" | "login-recovery-authn-code-config.ftl" | "login-recovery-authn-code-input.ftl" | "login-reset-otp.ftl" | "login-x509-info.ftl" | "webauthn-error.ftl" | "login-passkeys-conditional-authenticate.ftl" | "login-idp-link-confirm-override.ftl" | keyof KcContextExtensionPerPage>(params: {
        pageId: PageId;
        overrides?: DeepPartial<Extract<ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>, {
            pageId: PageId;
        }>> | undefined;
    }) => Extract<ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>, {
        pageId: PageId;
    }>;
};
