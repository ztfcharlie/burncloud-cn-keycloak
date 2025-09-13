import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { clsx } from "../tools/clsx";
import { kcSanitize } from "../lib/kcSanitize";
import { getKcClsx } from "../account/lib/kcClsx";
import { useSetClassName } from "../tools/useSetClassName";
import { useInitialize } from "../account/Template.useInitialize";
export default function Template(props) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
    const { url, features, realm, message, referrer } = kcContext;
    useEffect(() => {
        document.title = msgStr("accountManagementTitle");
    }, []);
    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });
    useSetClassName({
        qualifiedName: "body",
        className: clsx("admin-console", "user", kcClsx("kcBodyClass"))
    });
    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
    if (!isReadyToRender) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx("header", Object.assign({ className: "navbar navbar-default navbar-pf navbar-main header" }, { children: _jsxs("nav", Object.assign({ className: "navbar", role: "navigation" }, { children: [_jsx("div", Object.assign({ className: "navbar-header" }, { children: _jsx("div", Object.assign({ className: "container" }, { children: _jsx("h1", Object.assign({ className: "navbar-title" }, { children: "Keycloak" })) })) })), _jsx("div", Object.assign({ className: "navbar-collapse navbar-collapse-1" }, { children: _jsx("div", Object.assign({ className: "container" }, { children: _jsxs("ul", Object.assign({ className: "nav navbar-nav navbar-utility" }, { children: [enabledLanguages.length > 1 && (_jsx("li", { children: _jsxs("div", Object.assign({ className: "kc-dropdown", id: "kc-locale-dropdown" }, { children: [_jsx("a", Object.assign({ href: "#", id: "kc-current-locale-link" }, { children: currentLanguage.label })), _jsx("ul", { children: enabledLanguages.map(({ languageTag, label, href }) => (_jsx("li", Object.assign({ className: "kc-dropdown-item" }, { children: _jsx("a", Object.assign({ href: href }, { children: label })) }), languageTag))) })] })) })), (referrer === null || referrer === void 0 ? void 0 : referrer.url) && (_jsx("li", { children: _jsx("a", Object.assign({ href: referrer.url, id: "referrer" }, { children: msg("backTo", referrer.name) })) })), _jsx("li", { children: _jsx("a", Object.assign({ href: url.getLogoutUrl() }, { children: msg("doSignOut") })) })] })) })) }))] })) })), _jsxs("div", Object.assign({ className: "container" }, { children: [_jsx("div", Object.assign({ className: "bs-sidebar col-sm-3" }, { children: _jsxs("ul", { children: [_jsx("li", Object.assign({ className: clsx(active === "account" && "active") }, { children: _jsx("a", Object.assign({ href: url.accountUrl }, { children: msg("account") })) })), features.passwordUpdateSupported && (_jsx("li", Object.assign({ className: clsx(active === "password" && "active") }, { children: _jsx("a", Object.assign({ href: url.passwordUrl }, { children: msg("password") })) }))), _jsx("li", Object.assign({ className: clsx(active === "totp" && "active") }, { children: _jsx("a", Object.assign({ href: url.totpUrl }, { children: msg("authenticator") })) })), features.identityFederation && (_jsx("li", Object.assign({ className: clsx(active === "social" && "active") }, { children: _jsx("a", Object.assign({ href: url.socialUrl }, { children: msg("federatedIdentity") })) }))), _jsx("li", Object.assign({ className: clsx(active === "sessions" && "active") }, { children: _jsx("a", Object.assign({ href: url.sessionsUrl }, { children: msg("sessions") })) })), _jsx("li", Object.assign({ className: clsx(active === "applications" && "active") }, { children: _jsx("a", Object.assign({ href: url.applicationsUrl }, { children: msg("applications") })) })), features.log && (_jsx("li", Object.assign({ className: clsx(active === "log" && "active") }, { children: _jsx("a", Object.assign({ href: url.logUrl }, { children: msg("log") })) }))), realm.userManagedAccessAllowed && features.authorization && (_jsx("li", Object.assign({ className: clsx(active === "authorization" && "active") }, { children: _jsx("a", Object.assign({ href: url.resourceUrl }, { children: msg("myResources") })) })))] }) })), _jsxs("div", Object.assign({ className: "col-sm-9 content-area" }, { children: [message !== undefined && (_jsxs("div", Object.assign({ className: clsx("alert", `alert-${message.type}`) }, { children: [message.type === "success" && _jsx("span", { className: "pficon pficon-ok" }), message.type === "error" && _jsx("span", { className: "pficon pficon-error-circle-o" }), _jsx("span", { className: "kc-feedback-text", dangerouslySetInnerHTML: {
                                            __html: kcSanitize(message.summary)
                                        } })] }))), children] }))] }))] }));
}
//# sourceMappingURL=Template.js.map