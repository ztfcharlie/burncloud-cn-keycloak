import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function FrontchannelLogout(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { logout } = kcContext;
    const { msg, msgStr } = i18n;
    const [iframeLoadCount, setIframeLoadCount] = useState(0);
    useEffect(() => {
        if (!kcContext.logout.logoutRedirectUri) {
            return;
        }
        if (iframeLoadCount !== kcContext.logout.clients.length) {
            return;
        }
        window.location.replace(kcContext.logout.logoutRedirectUri);
    }, [iframeLoadCount]);
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, documentTitle: msgStr("frontchannel-logout.title"), headerNode: msg("frontchannel-logout.title") }, { children: [_jsx("p", { children: msg("frontchannel-logout.message") }), _jsx("ul", { children: logout.clients.map(client => (_jsxs("li", { children: [client.name, _jsx("iframe", { src: client.frontChannelLogoutUrl, style: { display: "none" }, onLoad: () => {
                                setIframeLoadCount(count => count + 1);
                            } })] }, client.name))) }), logout.logoutRedirectUri !== undefined && (_jsx("a", Object.assign({ id: "continue", className: "btn btn-primary", href: logout.logoutRedirectUri }, { children: msg("doContinue") })))] })));
}
//# sourceMappingURL=FrontchannelLogout.js.map