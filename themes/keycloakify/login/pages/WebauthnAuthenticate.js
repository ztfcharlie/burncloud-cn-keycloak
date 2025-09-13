import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from "react";
import { clsx } from "../../tools/clsx";
import { getKcClsx } from "../../login/lib/kcClsx";
import { useScript } from "../../login/pages/WebauthnAuthenticate.useScript";
export default function WebauthnAuthenticate(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const authButtonId = "authenticateWebAuthnButton";
    useScript({
        authButtonId,
        kcContext,
        i18n
    });
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayInfo: realm.registrationAllowed && !registrationDisabled, infoNode: _jsx("div", Object.assign({ id: "kc-registration" }, { children: _jsxs("span", { children: [msg("noAccount"), " ", _jsx("a", Object.assign({ tabIndex: 6, href: url.registrationUrl }, { children: msg("doRegister") }))] }) })), headerNode: msg("webauthn-login-title") }, { children: _jsxs("div", Object.assign({ id: "kc-form-webauthn", className: kcClsx("kcFormClass") }, { children: [_jsxs("form", Object.assign({ id: "webauth", action: url.loginAction, method: "post" }, { children: [_jsx("input", { type: "hidden", id: "clientDataJSON", name: "clientDataJSON" }), _jsx("input", { type: "hidden", id: "authenticatorData", name: "authenticatorData" }), _jsx("input", { type: "hidden", id: "signature", name: "signature" }), _jsx("input", { type: "hidden", id: "credentialId", name: "credentialId" }), _jsx("input", { type: "hidden", id: "userHandle", name: "userHandle" }), _jsx("input", { type: "hidden", id: "error", name: "error" })] })), _jsxs("div", Object.assign({ className: clsx(kcClsx("kcFormGroupClass"), "no-bottom-margin") }, { children: [authenticators && (_jsxs(_Fragment, { children: [_jsx("form", Object.assign({ id: "authn_select", className: kcClsx("kcFormClass") }, { children: authenticators.authenticators.map(authenticator => (_jsx("input", { type: "hidden", name: "authn_use_chk", value: authenticator.credentialId }))) })), shouldDisplayAuthenticators && (_jsxs(_Fragment, { children: [authenticators.authenticators.length > 1 && (_jsx("p", Object.assign({ className: kcClsx("kcSelectAuthListItemTitle") }, { children: msg("webauthn-available-authenticators") }))), _jsx("div", Object.assign({ className: kcClsx("kcFormOptionsClass") }, { children: authenticators.authenticators.map((authenticator, i) => {
                                                var _a;
                                                return (_jsxs("div", Object.assign({ id: `kc-webauthn-authenticator-item-${i}`, className: kcClsx("kcSelectAuthListItemClass") }, { children: [_jsx("div", Object.assign({ className: kcClsx("kcSelectAuthListItemIconClass") }, { children: _jsx("i", { className: clsx((() => {
                                                                    const className = kcClsx(authenticator.transports.iconClass);
                                                                    if (className === authenticator.transports.iconClass) {
                                                                        return kcClsx("kcWebAuthnDefaultIcon");
                                                                    }
                                                                    return className;
                                                                })(), kcClsx("kcSelectAuthListItemIconPropertyClass")) }) })), _jsxs("div", Object.assign({ className: kcClsx("kcSelectAuthListItemArrowIconClass") }, { children: [_jsx("div", Object.assign({ id: `kc-webauthn-authenticator-label-${i}`, className: kcClsx("kcSelectAuthListItemHeadingClass") }, { children: advancedMsg(authenticator.label) })), ((_a = authenticator.transports.displayNameProperties) === null || _a === void 0 ? void 0 : _a.length) && (_jsx("div", Object.assign({ id: `kc-webauthn-authenticator-transport-${i}`, className: kcClsx("kcSelectAuthListItemDescriptionClass") }, { children: authenticator.transports.displayNameProperties
                                                                        .map((displayNameProperty, i, arr) => ({
                                                                        displayNameProperty,
                                                                        hasNext: i !== arr.length - 1
                                                                    }))
                                                                        .map(({ displayNameProperty, hasNext }) => (_jsxs(Fragment, { children: [advancedMsg(displayNameProperty), hasNext && _jsx("span", { children: ", " })] }, displayNameProperty))) }))), _jsxs("div", Object.assign({ className: kcClsx("kcSelectAuthListItemDescriptionClass") }, { children: [_jsx("span", Object.assign({ id: `kc-webauthn-authenticator-createdlabel-${i}` }, { children: msg("webauthn-createdAt-label") })), _jsx("span", Object.assign({ id: `kc-webauthn-authenticator-created-${i}` }, { children: authenticator.createdAt }))] })), _jsx("div", { className: kcClsx("kcSelectAuthListItemFillClass") })] }))] }), i));
                                            }) }))] }))] })), _jsx("div", Object.assign({ id: "kc-form-buttons", className: kcClsx("kcFormButtonsClass") }, { children: _jsx("input", { id: authButtonId, type: "button", autoFocus: true, value: msgStr("webauthn-doAuthenticate"), className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass") }) }))] }))] })) })));
}
//# sourceMappingURL=WebauthnAuthenticate.js.map