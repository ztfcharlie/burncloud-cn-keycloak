import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIsPasswordRevealed } from "../../tools/useIsPasswordRevealed";
import { kcSanitize } from "../../lib/kcSanitize";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function LoginUpdatePassword(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: !messagesPerField.existsError("password", "password-confirm"), headerNode: msg("updatePasswordTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-passwd-update-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "password-new", className: kcClsx("kcLabelClass") }, { children: msg("passwordNew") })) })), _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [_jsx(PasswordWrapper, Object.assign({ kcClsx: kcClsx, i18n: i18n, passwordInputId: "password-new" }, { children: _jsx("input", { type: "password", id: "password-new", name: "password-new", className: kcClsx("kcInputClass"), autoFocus: true, autoComplete: "new-password", "aria-invalid": messagesPerField.existsError("password", "password-confirm") }) })), messagesPerField.existsError("password") && (_jsx("span", { id: "input-error-password", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                        __html: kcSanitize(messagesPerField.get("password"))
                                    } }))] }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "password-confirm", className: kcClsx("kcLabelClass") }, { children: msg("passwordConfirm") })) })), _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [_jsx(PasswordWrapper, Object.assign({ kcClsx: kcClsx, i18n: i18n, passwordInputId: "password-confirm" }, { children: _jsx("input", { type: "password", id: "password-confirm", name: "password-confirm", className: kcClsx("kcInputClass"), autoComplete: "new-password", "aria-invalid": messagesPerField.existsError("password", "password-confirm") }) })), messagesPerField.existsError("password-confirm") && (_jsx("span", { id: "input-error-password-confirm", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                        __html: kcSanitize(messagesPerField.get("password-confirm"))
                                    } }))] }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx(LogoutOtherSessions, { kcClsx: kcClsx, i18n: i18n }), _jsxs("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: [_jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", !isAppInitiatedAction && "kcButtonBlockClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doSubmit") }), isAppInitiatedAction && (_jsx("button", Object.assign({ className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass"), type: "submit", name: "cancel-aia", value: "true" }, { children: msg("doCancel") })))] }))] }))] })) })));
}
function LogoutOtherSessions(props) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsWrapperClass") }, { children: _jsx("div", Object.assign({ className: "checkbox" }, { children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", id: "logout-sessions", name: "logout-sessions", value: "on", defaultChecked: true }), msg("logoutOtherSessions")] }) })) })) })));
}
function PasswordWrapper(props) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });
    return (_jsxs("div", Object.assign({ className: kcClsx("kcInputGroup") }, { children: [children, _jsx("button", Object.assign({ type: "button", className: kcClsx("kcFormPasswordVisibilityButtonClass"), "aria-label": msgStr(isPasswordRevealed ? "hidePassword" : "showPassword"), "aria-controls": passwordInputId, onClick: toggleIsPasswordRevealed }, { children: _jsx("i", { className: kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow"), "aria-hidden": true }) }))] })));
}
//# sourceMappingURL=LoginUpdatePassword.js.map