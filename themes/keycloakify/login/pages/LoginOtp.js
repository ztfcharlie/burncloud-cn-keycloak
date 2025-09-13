import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState } from "react";
import { getKcClsx } from "../../login/lib/kcClsx";
import { kcSanitize } from "../../lib/kcSanitize";
export default function LoginOtp(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { otpLogin, url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: !messagesPerField.existsError("totp"), headerNode: msg("doLogIn") }, { children: _jsxs("form", Object.assign({ id: "kc-otp-login-form", className: kcClsx("kcFormClass"), action: url.loginAction, onSubmit: () => {
                setIsSubmitting(true);
                return true;
            }, method: "post" }, { children: [otpLogin.userOtpCredentials.length > 1 && (_jsx("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: otpLogin.userOtpCredentials.map((otpCredential, index) => (_jsxs(Fragment, { children: [_jsx("input", { id: `kc-otp-credential-${index}`, className: kcClsx("kcLoginOTPListInputClass"), type: "radio", name: "selectedCredentialId", value: otpCredential.id, defaultChecked: otpCredential.id === otpLogin.selectedCredentialId }), _jsx("label", Object.assign({ htmlFor: `kc-otp-credential-${index}`, className: kcClsx("kcLoginOTPListClass"), tabIndex: index }, { children: _jsxs("span", Object.assign({ className: kcClsx("kcLoginOTPListItemHeaderClass") }, { children: [_jsx("span", Object.assign({ className: kcClsx("kcLoginOTPListItemIconBodyClass") }, { children: _jsx("i", { className: kcClsx("kcLoginOTPListItemIconClass"), "aria-hidden": "true" }) })), _jsx("span", Object.assign({ className: kcClsx("kcLoginOTPListItemTitleClass") }, { children: otpCredential.userLabel }))] })) }))] }, index))) })) }))), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "otp", className: kcClsx("kcLabelClass") }, { children: msg("loginOtpOneTime") })) })), _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [_jsx("input", { id: "otp", name: "otp", autoComplete: "off", type: "text", className: kcClsx("kcInputClass"), autoFocus: true, "aria-invalid": messagesPerField.existsError("totp") }), messagesPerField.existsError("totp") && (_jsx("span", { id: "input-error-otp-code", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                        __html: kcSanitize(messagesPerField.get("totp"))
                                    } }))] }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", { className: kcClsx("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "login", id: "kc-login", type: "submit", value: msgStr("doLogIn"), disabled: isSubmitting }) }))] }))] })) })));
}
//# sourceMappingURL=LoginOtp.js.map