import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
import { kcSanitize } from "../../lib/kcSanitize";
export default function LoginResetPassword(props) {
    var _a;
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayInfo: true, displayMessage: !messagesPerField.existsError("username"), infoNode: realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction"), headerNode: msg("emailForgotTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-reset-password-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "username", className: kcClsx("kcLabelClass") }, { children: !realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email") })) })), _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [_jsx("input", { type: "text", id: "username", name: "username", className: kcClsx("kcInputClass"), autoFocus: true, defaultValue: (_a = auth.attemptedUsername) !== null && _a !== void 0 ? _a : "", "aria-invalid": messagesPerField.existsError("username") }), messagesPerField.existsError("username") && (_jsx("span", { id: "input-error-username", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                        __html: kcSanitize(messagesPerField.get("username"))
                                    } }))] }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass", "kcFormSettingClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsWrapperClass") }, { children: _jsx("span", { children: _jsx("a", Object.assign({ href: url.loginUrl }, { children: msg("backToLogin") })) }) })) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doSubmit") }) }))] }))] })) })));
}
//# sourceMappingURL=LoginResetPassword.js.map