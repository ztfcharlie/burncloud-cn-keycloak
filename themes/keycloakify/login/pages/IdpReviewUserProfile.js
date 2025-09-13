import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function IdpReviewUserProfile(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const { url, messagesPerField } = kcContext;
    const [isFomSubmittable, setIsFomSubmittable] = useState(false);
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: messagesPerField.exists("global"), displayRequiredFields: true, headerNode: msg("loginIdpReviewProfileTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-idp-review-profile-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsx(UserProfileFormFields, { kcContext: kcContext, i18n: i18n, onIsFormSubmittableValueChange: setIsFomSubmittable, kcClsx: kcClsx, doMakeUserConfirmPassword: doMakeUserConfirmPassword }), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", { className: kcClsx("kcFormOptionsWrapperClass") }) })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doSubmit"), disabled: !isFomSubmittable }) }))] }))] })) })));
}
//# sourceMappingURL=IdpReviewUserProfile.js.map