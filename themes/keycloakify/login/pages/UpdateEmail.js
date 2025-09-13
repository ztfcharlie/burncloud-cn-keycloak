import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function UpdateEmail(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: messagesPerField.exists("global"), displayRequiredFields: true, headerNode: msg("updateEmailTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-update-email-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsx(UserProfileFormFields, { kcContext: kcContext, i18n: i18n, kcClsx: kcClsx, onIsFormSubmittableValueChange: setIsFormSubmittable, doMakeUserConfirmPassword: doMakeUserConfirmPassword }), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", { className: kcClsx("kcFormOptionsWrapperClass") }) })), _jsx(LogoutOtherSessions, { kcClsx: kcClsx, i18n: i18n }), _jsxs("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: [_jsx("input", { disabled: !isFormSubmittable, className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", (!isAppInitiatedAction) && "kcButtonBlockClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doSubmit") }), isAppInitiatedAction && (_jsx("button", Object.assign({ className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass"), type: "submit", name: "cancel-aia", value: "true" }, { children: msg("doCancel") })))] }))] }))] })) })));
}
function LogoutOtherSessions(props) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsWrapperClass") }, { children: _jsx("div", Object.assign({ className: "checkbox" }, { children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", id: "logout-sessions", name: "logout-sessions", value: "on", defaultChecked: true }), msg("logoutOtherSessions")] }) })) })) })));
}
//# sourceMappingURL=UpdateEmail.js.map