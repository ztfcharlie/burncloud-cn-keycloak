import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
import { kcSanitize } from "../../lib/kcSanitize";
export default function LoginRecoveryAuthnCodeInput(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("auth-recovery-code-header"), displayMessage: !messagesPerField.existsError("recoveryCodeInput") }, { children: _jsxs("form", Object.assign({ id: "kc-recovery-code-login-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "recoveryCodeInput", className: kcClsx("kcLabelClass") }, { children: msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`) })) })), _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [_jsx("input", { tabIndex: 1, id: "recoveryCodeInput", name: "recoveryCodeInput", "aria-invalid": messagesPerField.existsError("recoveryCodeInput"), autoComplete: "off", type: "text", className: kcClsx("kcInputClass"), autoFocus: true }), messagesPerField.existsError("recoveryCodeInput") && (_jsx("span", { id: "input-error", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                        __html: kcSanitize(messagesPerField.get("recoveryCodeInput"))
                                    } }))] }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsWrapperClass") }, { children: _jsx("div", { className: kcClsx("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "login", id: "kc-login", type: "submit", value: msgStr("doLogIn") }) }))] }))] })) })));
}
//# sourceMappingURL=LoginRecoveryAuthnCodeInput.js.map