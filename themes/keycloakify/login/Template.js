import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { clsx } from "../tools/clsx";
import { kcSanitize } from "../lib/kcSanitize";
import { getKcClsx } from "../login/lib/kcClsx";
import { useSetClassName } from "../tools/useSetClassName";
import { useInitialize } from "../login/Template.useInitialize";
export default function Template(props) {
    const { displayInfo = false, displayMessage = true, displayRequiredFields = false, headerNode, socialProvidersNode = null, infoNode = null, documentTitle, bodyClassName, kcContext, i18n, doUseDefaultCss, classes, children } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;
    useEffect(() => {
        document.title = documentTitle !== null && documentTitle !== void 0 ? documentTitle : msgStr("loginTitle", realm.displayName);
    }, []);
    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });
    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName !== null && bodyClassName !== void 0 ? bodyClassName : kcClsx("kcBodyClass")
    });
    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
    if (!isReadyToRender) {
        return null;
    }
    return (_jsxs("div", Object.assign({ className: kcClsx("kcLoginClass") }, { children: [_jsx("div", Object.assign({ id: "kc-header", className: kcClsx("kcHeaderClass") }, { children: _jsx("div", Object.assign({ id: "kc-header-wrapper", className: kcClsx("kcHeaderWrapperClass") }, { children: msg("loginTitleHtml", realm.displayNameHtml) })) })), _jsxs("div", Object.assign({ className: kcClsx("kcFormCardClass") }, { children: [_jsxs("header", Object.assign({ className: kcClsx("kcFormHeaderClass") }, { children: [enabledLanguages.length > 1 && (_jsx("div", Object.assign({ className: kcClsx("kcLocaleMainClass"), id: "kc-locale" }, { children: _jsx("div", Object.assign({ id: "kc-locale-wrapper", className: kcClsx("kcLocaleWrapperClass") }, { children: _jsxs("div", Object.assign({ id: "kc-locale-dropdown", className: clsx("menu-button-links", kcClsx("kcLocaleDropDownClass")) }, { children: [_jsx("button", Object.assign({ tabIndex: 1, id: "kc-current-locale-link", "aria-label": msgStr("languages"), "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "language-switch1" }, { children: currentLanguage.label })), _jsx("ul", Object.assign({ role: "menu", tabIndex: -1, "aria-labelledby": "kc-current-locale-link", "aria-activedescendant": "", id: "language-switch1", className: kcClsx("kcLocaleListClass") }, { children: enabledLanguages.map(({ languageTag, label, href }, i) => (_jsx("li", Object.assign({ className: kcClsx("kcLocaleListItemClass"), role: "none" }, { children: _jsx("a", Object.assign({ role: "menuitem", id: `language-${i + 1}`, className: kcClsx("kcLocaleItemClass"), href: href }, { children: label })) }), languageTag))) }))] })) })) }))), (() => {
                                const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (_jsx("h1", Object.assign({ id: "kc-page-title" }, { children: headerNode }))) : (_jsxs("div", Object.assign({ id: "kc-username", className: kcClsx("kcFormGroupClass") }, { children: [_jsx("label", Object.assign({ id: "kc-attempted-username" }, { children: auth.attemptedUsername })), _jsx("a", Object.assign({ id: "reset-login", href: url.loginRestartFlowUrl, "aria-label": msgStr("restartLoginTooltip") }, { children: _jsxs("div", Object.assign({ className: "kc-login-tooltip" }, { children: [_jsx("i", { className: kcClsx("kcResetFlowIcon") }), _jsx("span", Object.assign({ className: "kc-tooltip-text" }, { children: msg("restartLoginTooltip") }))] })) }))] })));
                                if (displayRequiredFields) {
                                    return (_jsxs("div", Object.assign({ className: kcClsx("kcContentWrapperClass") }, { children: [_jsx("div", Object.assign({ className: clsx(kcClsx("kcLabelWrapperClass"), "subtitle") }, { children: _jsxs("span", Object.assign({ className: "subtitle" }, { children: [_jsx("span", Object.assign({ className: "required" }, { children: "*" })), msg("requiredFields")] })) })), _jsx("div", Object.assign({ className: "col-md-10" }, { children: node }))] })));
                                }
                                return node;
                            })()] })), _jsx("div", Object.assign({ id: "kc-content" }, { children: _jsxs("div", Object.assign({ id: "kc-content-wrapper" }, { children: [displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (_jsxs("div", Object.assign({ className: clsx(`alert-${message.type}`, kcClsx("kcAlertClass"), `pf-m-${(message === null || message === void 0 ? void 0 : message.type) === "error" ? "danger" : message.type}`) }, { children: [_jsxs("div", Object.assign({ className: "pf-c-alert__icon" }, { children: [message.type === "success" && _jsx("span", { className: kcClsx("kcFeedbackSuccessIcon") }), message.type === "warning" && _jsx("span", { className: kcClsx("kcFeedbackWarningIcon") }), message.type === "error" && _jsx("span", { className: kcClsx("kcFeedbackErrorIcon") }), message.type === "info" && _jsx("span", { className: kcClsx("kcFeedbackInfoIcon") })] })), _jsx("span", { className: kcClsx("kcAlertTitleClass"), dangerouslySetInnerHTML: {
                                                __html: kcSanitize(message.summary)
                                            } })] }))), children, auth !== undefined && auth.showTryAnotherWayLink && (_jsx("form", Object.assign({ id: "kc-select-try-another-way-form", action: url.loginAction, method: "post" }, { children: _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("input", { type: "hidden", name: "tryAnotherWay", value: "on" }), _jsx("a", Object.assign({ href: "#", id: "try-another-way", onClick: () => {
                                                    document.forms["kc-select-try-another-way-form"].requestSubmit();
                                                    return false;
                                                } }, { children: msg("doTryAnotherWay") }))] })) }))), socialProvidersNode, displayInfo && (_jsx("div", Object.assign({ id: "kc-info", className: kcClsx("kcSignUpClass") }, { children: _jsx("div", Object.assign({ id: "kc-info-wrapper", className: kcClsx("kcInfoAreaWrapperClass") }, { children: infoNode })) })))] })) }))] }))] })));
}
//# sourceMappingURL=Template.js.map