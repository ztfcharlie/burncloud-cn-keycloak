import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { kcSanitize } from "../../lib/kcSanitize";
import { clsx } from "../../tools/clsx";
import { useIsPasswordRevealed } from "../../tools/useIsPasswordRevealed";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function LoginPassword(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { realm, url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("doLogIn"), displayMessage: !messagesPerField.existsError("password") }, { children: _jsx("div", Object.assign({ id: "kc-form" }, { children: _jsx("div", Object.assign({ id: "kc-form-wrapper" }, { children: _jsxs("form", Object.assign({ id: "kc-form-login", onSubmit: () => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }, action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin") }, { children: [_jsx("hr", {}), _jsx("label", Object.assign({ htmlFor: "password", className: kcClsx("kcLabelClass") }, { children: msg("password") })), _jsx(PasswordWrapper, Object.assign({ kcClsx: kcClsx, i18n: i18n, passwordInputId: "password" }, { children: _jsx("input", { tabIndex: 2, id: "password", className: kcClsx("kcInputClass"), name: "password", type: "password", autoFocus: true, autoComplete: "on", "aria-invalid": messagesPerField.existsError("username", "password") }) })), messagesPerField.existsError("password") && (_jsx("span", { id: "input-error-password", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                        __html: kcSanitize(messagesPerField.get("password"))
                                    } }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass", "kcFormSettingClass") }, { children: [_jsx("div", { id: "kc-form-options" }), _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsWrapperClass") }, { children: realm.resetPasswordAllowed && (_jsx("span", { children: _jsx("a", Object.assign({ tabIndex: 5, href: url.loginResetCredentialsUrl }, { children: msg("doForgotPassword") })) })) }))] })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormGroupClass") }, { children: _jsx("input", { tabIndex: 4, className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "login", id: "kc-login", type: "submit", value: msgStr("doLogIn"), disabled: isLoginButtonDisabled }) }))] })) })) })) })));
}
function PasswordWrapper(props) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });
    return (_jsxs("div", Object.assign({ className: kcClsx("kcInputGroup") }, { children: [children, _jsx("button", Object.assign({ type: "button", className: kcClsx("kcFormPasswordVisibilityButtonClass"), "aria-label": msgStr(isPasswordRevealed ? "hidePassword" : "showPassword"), "aria-controls": passwordInputId, onClick: toggleIsPasswordRevealed }, { children: _jsx("i", { className: kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow"), "aria-hidden": true }) }))] })));
}
//# sourceMappingURL=LoginPassword.js.map