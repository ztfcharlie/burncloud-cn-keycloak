import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { kcSanitize } from "../../lib/kcSanitize";
export default function Info(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { advancedMsgStr, msg } = i18n;
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: false, headerNode: _jsx("span", { dangerouslySetInnerHTML: {
                __html: kcSanitize(messageHeader !== null && messageHeader !== void 0 ? messageHeader : message.summary)
            } }) }, { children: _jsxs("div", Object.assign({ id: "kc-info-message" }, { children: [_jsx("p", { className: "instruction", dangerouslySetInnerHTML: {
                        __html: kcSanitize((() => {
                            var _a;
                            let html = (_a = message.summary) === null || _a === void 0 ? void 0 : _a.trim();
                            if (requiredActions) {
                                html += " <b>";
                                html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");
                                html += "</b>";
                            }
                            return html;
                        })())
                    } }), (() => {
                    if (skipLink) {
                        return null;
                    }
                    if (pageRedirectUri) {
                        return (_jsx("p", { children: _jsx("a", Object.assign({ href: pageRedirectUri }, { children: msg("backToApplication") })) }));
                    }
                    if (actionUri) {
                        return (_jsx("p", { children: _jsx("a", Object.assign({ href: actionUri }, { children: msg("proceedWithAction") })) }));
                    }
                    if (client.baseUrl) {
                        return (_jsx("p", { children: _jsx("a", Object.assign({ href: client.baseUrl }, { children: msg("backToApplication") })) }));
                    }
                })()] })) })));
}
//# sourceMappingURL=Info.js.map