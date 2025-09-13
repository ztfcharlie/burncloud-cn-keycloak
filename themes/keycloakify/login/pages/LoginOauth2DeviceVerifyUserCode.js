import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function LoginOauth2DeviceVerifyUserCode(props) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;
    const { msg, msgStr } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("oauth2DeviceVerificationTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-user-verify-device-user-code-form", className: kcClsx("kcFormClass"), action: url.oauth2DeviceVerificationAction, method: "post" }, { children: [_jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ htmlFor: "device-user-code", className: kcClsx("kcLabelClass") }, { children: msg("verifyOAuth2DeviceUserCode") })) })), _jsx("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: _jsx("input", { id: "device-user-code", name: "device_user_code", autoComplete: "off", type: "text", className: kcClsx("kcInputClass"), autoFocus: true }) }))] })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", { className: kcClsx("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcFormButtonsWrapperClass") }, { children: _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doSubmit") }) })) }))] }))] })) })));
}
//# sourceMappingURL=LoginOauth2DeviceVerifyUserCode.js.map