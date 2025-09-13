import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function LoginIdpLinkEmail(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, realm, brokerContext, idpAlias } = kcContext;
    const { msg } = i18n;
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("emailLinkIdpTitle", idpAlias) }, { children: [_jsx("p", Object.assign({ id: "instruction1", className: "instruction" }, { children: msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName) })), _jsxs("p", Object.assign({ id: "instruction2", className: "instruction" }, { children: [msg("emailLinkIdp2"), " ", _jsx("a", Object.assign({ href: url.loginAction }, { children: msg("doClickHere") })), " ", msg("emailLinkIdp3")] })), _jsxs("p", Object.assign({ id: "instruction3", className: "instruction" }, { children: [msg("emailLinkIdp4"), " ", _jsx("a", Object.assign({ href: url.loginAction }, { children: msg("doClickHere") })), " ", msg("emailLinkIdp5")] }))] })));
}
//# sourceMappingURL=LoginIdpLinkEmail.js.map