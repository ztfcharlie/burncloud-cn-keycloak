import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
import { useScript } from "../../login/pages/WebauthnRegister.useScript";
export default function WebauthnRegister(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, isSetRetry, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const authButtonId = "authenticateWebAuthnButton";
    useScript({
        authButtonId,
        kcContext,
        i18n
    });
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: _jsxs(_Fragment, { children: [_jsx("span", { className: kcClsx("kcWebAuthnKeyIcon") }), msg("webauthn-registration-title")] }) }, { children: [_jsx("form", Object.assign({ id: "register", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("input", { type: "hidden", id: "clientDataJSON", name: "clientDataJSON" }), _jsx("input", { type: "hidden", id: "attestationObject", name: "attestationObject" }), _jsx("input", { type: "hidden", id: "publicKeyCredentialId", name: "publicKeyCredentialId" }), _jsx("input", { type: "hidden", id: "authenticatorLabel", name: "authenticatorLabel" }), _jsx("input", { type: "hidden", id: "transports", name: "transports" }), _jsx("input", { type: "hidden", id: "error", name: "error" }), _jsx(LogoutOtherSessions, { kcClsx: kcClsx, i18n: i18n })] })) })), _jsx("input", { type: "submit", className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), id: authButtonId, value: msgStr("doRegisterSecurityKey") }), !isSetRetry && isAppInitiatedAction && (_jsx("form", Object.assign({ action: url.loginAction, className: kcClsx("kcFormClass"), id: "kc-webauthn-settings-form", method: "post" }, { children: _jsx("button", Object.assign({ type: "submit", className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass"), id: "cancelWebAuthnAIA", name: "cancel-aia", value: "true" }, { children: msg("doCancel") })) })))] })));
}
function LogoutOtherSessions(props) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsWrapperClass") }, { children: _jsx("div", Object.assign({ className: "checkbox" }, { children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", id: "logout-sessions", name: "logout-sessions", value: "on", defaultChecked: true }), msg("logoutOtherSessions")] }) })) })) })));
}
//# sourceMappingURL=WebauthnRegister.js.map