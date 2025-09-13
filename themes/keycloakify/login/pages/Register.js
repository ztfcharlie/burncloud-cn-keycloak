import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useLayoutEffect } from "react";
import { kcSanitize } from "../../lib/kcSanitize";
import { getKcClsx } from "../../login/lib/kcClsx";
import { clsx } from "../../tools/clsx";
export default function Register(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    useLayoutEffect(() => {
        window["onSubmitRecaptcha"] = () => {
            // @ts-expect-error
            document.getElementById("kc-register-form").requestSubmit();
        };
        return () => {
            delete window["onSubmitRecaptcha"];
        };
    }, []);
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle"), displayMessage: messagesPerField.exists("global"), displayRequiredFields: true }, { children: _jsxs("form", Object.assign({ id: "kc-register-form", className: kcClsx("kcFormClass"), action: url.registrationAction, method: "post" }, { children: [_jsx(UserProfileFormFields, { kcContext: kcContext, i18n: i18n, kcClsx: kcClsx, onIsFormSubmittableValueChange: setIsFormSubmittable, doMakeUserConfirmPassword: doMakeUserConfirmPassword }), termsAcceptanceRequired && (_jsx(TermsAcceptance, { i18n: i18n, kcClsx: kcClsx, messagesPerField: messagesPerField, areTermsAccepted: areTermsAccepted, onAreTermsAcceptedValueChange: setAreTermsAccepted })), recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (_jsx("div", Object.assign({ className: "form-group" }, { children: _jsx("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: _jsx("div", { className: "g-recaptcha", "data-size": "compact", "data-sitekey": recaptchaSiteKey, "data-action": recaptchaAction }) })) }))), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("div", Object.assign({ id: "kc-form-options", className: kcClsx("kcFormOptionsClass") }, { children: _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsWrapperClass") }, { children: _jsx("span", { children: _jsx("a", Object.assign({ href: url.loginUrl }, { children: msg("backToLogin") })) }) })) })), recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (_jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("button", Object.assign({ className: clsx(kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), "g-recaptcha"), "data-sitekey": recaptchaSiteKey, "data-callback": "onSubmitRecaptcha", "data-action": recaptchaAction, type: "submit" }, { children: msg("doRegister") })) }))) : (_jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { disabled: !isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted), className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doRegister") }) })))] }))] })) })));
}
function TermsAcceptance(props) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;
    const { msg } = i18n;
    return (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: "form-group" }, { children: _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [msg("termsTitle"), _jsx("div", Object.assign({ id: "kc-registration-terms-text" }, { children: msg("termsText") }))] })) })), _jsxs("div", Object.assign({ className: "form-group" }, { children: [_jsxs("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: [_jsx("input", { type: "checkbox", id: "termsAccepted", name: "termsAccepted", className: kcClsx("kcCheckboxInputClass"), checked: areTermsAccepted, onChange: e => onAreTermsAcceptedValueChange(e.target.checked), "aria-invalid": messagesPerField.existsError("termsAccepted") }), _jsx("label", Object.assign({ htmlFor: "termsAccepted", className: kcClsx("kcLabelClass") }, { children: msg("acceptTerms") }))] })), messagesPerField.existsError("termsAccepted") && (_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("span", { id: "input-error-terms-accepted", className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite", dangerouslySetInnerHTML: {
                                __html: kcSanitize(messagesPerField.get("termsAccepted"))
                            } }) })))] }))] }));
}
//# sourceMappingURL=Register.js.map