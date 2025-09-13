import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { kcSanitize } from "../../lib/kcSanitize";
export default function Error(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { message, client, skipLink } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: false, headerNode: msg("errorTitle") }, { children: _jsxs("div", Object.assign({ id: "kc-error-message" }, { children: [_jsx("p", { className: "instruction", dangerouslySetInnerHTML: { __html: kcSanitize(message.summary) } }), !skipLink && client !== undefined && client.baseUrl !== undefined && (_jsx("p", { children: _jsx("a", Object.assign({ id: "backToApplication", href: client.baseUrl }, { children: msg("backToApplication") })) }))] })) })));
}
//# sourceMappingURL=Error.js.map