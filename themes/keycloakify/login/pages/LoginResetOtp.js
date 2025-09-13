import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function LoginResetOtp(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, messagesPerField, configuredOtpCredentials } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: !messagesPerField.existsError("totp"), headerNode: msg("doLogIn") }, { children: [_jsx("form", Object.assign({ id: "kc-otp-reset-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: _jsx("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: _jsxs("div", Object.assign({ className: kcClsx("kcInfoAreaWrapperClass") }, { children: [_jsx("p", Object.assign({ id: "kc-otp-reset-form-description" }, { children: msg("otp-reset-description") })), configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (_jsxs(Fragment, { children: [_jsx("input", { id: `kc-otp-credential-${index}`, className: kcClsx("kcLoginOTPListInputClass"), type: "radio", name: "selectedCredentialId", value: otpCredential.id, defaultChecked: otpCredential.id === configuredOtpCredentials.selectedCredentialId }), _jsx("label", Object.assign({ htmlFor: `kc-otp-credential-${index}`, className: kcClsx("kcLoginOTPListClass"), tabIndex: index }, { children: _jsxs("span", Object.assign({ className: kcClsx("kcLoginOTPListItemHeaderClass") }, { children: [_jsx("span", Object.assign({ className: kcClsx("kcLoginOTPListItemIconBodyClass") }, { children: _jsx("i", { className: kcClsx("kcLoginOTPListItemIconClass"), "aria-hidden": "true" }) })), _jsx("span", Object.assign({ className: kcClsx("kcLoginOTPListItemTitleClass") }, { children: otpCredential.userLabel }))] })) }))] }, otpCredential.id))), _jsx("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { id: "kc-otp-reset-form-submit", className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doSubmit") }) })) }))] })) })) })), _jsx("div", { className: "clearfix" })] })));
}
//# sourceMappingURL=LoginResetOtp.js.map