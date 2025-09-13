var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from "react";
import { assert } from "tsafe/assert";
const Login = lazy(() => import("../login/pages/Login"));
const Register = lazy(() => import("../login/pages/Register"));
const Info = lazy(() => import("../login/pages/Info"));
const Error = lazy(() => import("../login/pages/Error"));
const LoginResetPassword = lazy(() => import("../login/pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("../login/pages/LoginVerifyEmail"));
const Terms = lazy(() => import("../login/pages/Terms"));
const LoginOauth2DeviceVerifyUserCode = lazy(() => import("../login/pages/LoginOauth2DeviceVerifyUserCode"));
const LoginOauthGrant = lazy(() => import("../login/pages/LoginOauthGrant"));
const LoginOtp = lazy(() => import("../login/pages/LoginOtp"));
const LoginPassword = lazy(() => import("../login/pages/LoginPassword"));
const LoginUsername = lazy(() => import("../login/pages/LoginUsername"));
const WebauthnAuthenticate = lazy(() => import("../login/pages/WebauthnAuthenticate"));
const WebauthnRegister = lazy(() => import("../login/pages/WebauthnRegister"));
const LoginUpdatePassword = lazy(() => import("../login/pages/LoginUpdatePassword"));
const LoginUpdateProfile = lazy(() => import("../login/pages/LoginUpdateProfile"));
const LoginIdpLinkConfirm = lazy(() => import("../login/pages/LoginIdpLinkConfirm"));
const LoginPageExpired = lazy(() => import("../login/pages/LoginPageExpired"));
const LoginIdpLinkEmail = lazy(() => import("../login/pages/LoginIdpLinkEmail"));
const LoginConfigTotp = lazy(() => import("../login/pages/LoginConfigTotp"));
const LogoutConfirm = lazy(() => import("../login/pages/LogoutConfirm"));
const IdpReviewUserProfile = lazy(() => import("../login/pages/IdpReviewUserProfile"));
const UpdateEmail = lazy(() => import("../login/pages/UpdateEmail"));
const SelectAuthenticator = lazy(() => import("../login/pages/SelectAuthenticator"));
const SamlPostForm = lazy(() => import("../login/pages/SamlPostForm"));
const DeleteCredential = lazy(() => import("../login/pages/DeleteCredential"));
const Code = lazy(() => import("../login/pages/Code"));
const DeleteAccountConfirm = lazy(() => import("../login/pages/DeleteAccountConfirm"));
const FrontchannelLogout = lazy(() => import("../login/pages/FrontchannelLogout"));
const LoginRecoveryAuthnCodeConfig = lazy(() => import("../login/pages/LoginRecoveryAuthnCodeConfig"));
const LoginRecoveryAuthnCodeInput = lazy(() => import("../login/pages/LoginRecoveryAuthnCodeInput"));
const LoginResetOtp = lazy(() => import("../login/pages/LoginResetOtp"));
const LoginX509Info = lazy(() => import("../login/pages/LoginX509Info"));
const WebauthnError = lazy(() => import("../login/pages/WebauthnError"));
const LoginPasskeysConditionalAuthenticate = lazy(() => import("../login/pages/LoginPasskeysConditionalAuthenticate"));
const LoginIdpLinkConfirmOverride = lazy(() => import("../login/pages/LoginIdpLinkConfirmOverride"));
export default function DefaultPage(props) {
    const { kcContext } = props, rest = __rest(props, ["kcContext"]);
    return (_jsx(Suspense, { children: (() => {
            switch (kcContext.pageId) {
                case "login.ftl":
                    return _jsx(Login, Object.assign({ kcContext: kcContext }, rest));
                case "register.ftl":
                    return _jsx(Register, Object.assign({ kcContext: kcContext }, rest));
                case "info.ftl":
                    return _jsx(Info, Object.assign({ kcContext: kcContext }, rest));
                case "error.ftl":
                    return _jsx(Error, Object.assign({ kcContext: kcContext }, rest));
                case "login-reset-password.ftl":
                    return _jsx(LoginResetPassword, Object.assign({ kcContext: kcContext }, rest));
                case "login-verify-email.ftl":
                    return _jsx(LoginVerifyEmail, Object.assign({ kcContext: kcContext }, rest));
                case "terms.ftl":
                    return _jsx(Terms, Object.assign({ kcContext: kcContext }, rest));
                case "login-oauth2-device-verify-user-code.ftl":
                    return _jsx(LoginOauth2DeviceVerifyUserCode, Object.assign({ kcContext: kcContext }, rest));
                case "login-oauth-grant.ftl":
                    return _jsx(LoginOauthGrant, Object.assign({ kcContext: kcContext }, rest));
                case "login-otp.ftl":
                    return _jsx(LoginOtp, Object.assign({ kcContext: kcContext }, rest));
                case "login-username.ftl":
                    return _jsx(LoginUsername, Object.assign({ kcContext: kcContext }, rest));
                case "login-password.ftl":
                    return _jsx(LoginPassword, Object.assign({ kcContext: kcContext }, rest));
                case "webauthn-authenticate.ftl":
                    return _jsx(WebauthnAuthenticate, Object.assign({ kcContext: kcContext }, rest));
                case "webauthn-register.ftl":
                    return _jsx(WebauthnRegister, Object.assign({ kcContext: kcContext }, rest));
                case "login-update-password.ftl":
                    return _jsx(LoginUpdatePassword, Object.assign({ kcContext: kcContext }, rest));
                case "login-update-profile.ftl":
                    return _jsx(LoginUpdateProfile, Object.assign({ kcContext: kcContext }, rest));
                case "login-idp-link-confirm.ftl":
                    return _jsx(LoginIdpLinkConfirm, Object.assign({ kcContext: kcContext }, rest));
                case "login-idp-link-email.ftl":
                    return _jsx(LoginIdpLinkEmail, Object.assign({ kcContext: kcContext }, rest));
                case "login-page-expired.ftl":
                    return _jsx(LoginPageExpired, Object.assign({ kcContext: kcContext }, rest));
                case "login-config-totp.ftl":
                    return _jsx(LoginConfigTotp, Object.assign({ kcContext: kcContext }, rest));
                case "logout-confirm.ftl":
                    return _jsx(LogoutConfirm, Object.assign({ kcContext: kcContext }, rest));
                case "idp-review-user-profile.ftl":
                    return _jsx(IdpReviewUserProfile, Object.assign({ kcContext: kcContext }, rest));
                case "update-email.ftl":
                    return _jsx(UpdateEmail, Object.assign({ kcContext: kcContext }, rest));
                case "select-authenticator.ftl":
                    return _jsx(SelectAuthenticator, Object.assign({ kcContext: kcContext }, rest));
                case "saml-post-form.ftl":
                    return _jsx(SamlPostForm, Object.assign({ kcContext: kcContext }, rest));
                case "delete-credential.ftl":
                    return _jsx(DeleteCredential, Object.assign({ kcContext: kcContext }, rest));
                case "code.ftl":
                    return _jsx(Code, Object.assign({ kcContext: kcContext }, rest));
                case "delete-account-confirm.ftl":
                    return _jsx(DeleteAccountConfirm, Object.assign({ kcContext: kcContext }, rest));
                case "frontchannel-logout.ftl":
                    return _jsx(FrontchannelLogout, Object.assign({ kcContext: kcContext }, rest));
                case "login-recovery-authn-code-config.ftl":
                    return _jsx(LoginRecoveryAuthnCodeConfig, Object.assign({ kcContext: kcContext }, rest));
                case "login-recovery-authn-code-input.ftl":
                    return _jsx(LoginRecoveryAuthnCodeInput, Object.assign({ kcContext: kcContext }, rest));
                case "login-reset-otp.ftl":
                    return _jsx(LoginResetOtp, Object.assign({ kcContext: kcContext }, rest));
                case "login-x509-info.ftl":
                    return _jsx(LoginX509Info, Object.assign({ kcContext: kcContext }, rest));
                case "webauthn-error.ftl":
                    return _jsx(WebauthnError, Object.assign({ kcContext: kcContext }, rest));
                case "login-passkeys-conditional-authenticate.ftl":
                    return _jsx(LoginPasskeysConditionalAuthenticate, Object.assign({ kcContext: kcContext }, rest));
                case "login-idp-link-confirm-override.ftl":
                    return _jsx(LoginIdpLinkConfirmOverride, Object.assign({ kcContext: kcContext }, rest));
            }
            assert(false);
        })() }));
}
//# sourceMappingURL=DefaultPage.js.map