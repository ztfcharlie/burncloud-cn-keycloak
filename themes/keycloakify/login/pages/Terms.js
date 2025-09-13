import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function Terms(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { msg, msgStr } = i18n;
    const { url } = kcContext;
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: false, headerNode: msg("termsTitle") }, { children: [_jsx("div", Object.assign({ id: "kc-terms-text" }, { children: msg("termsText") })), _jsxs("form", Object.assign({ className: "form-actions", action: url.loginAction, method: "POST" }, { children: [_jsx("input", { className: kcClsx("kcButtonClass", "kcButtonClass", "kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass"), name: "accept", id: "kc-accept", type: "submit", value: msgStr("doAccept") }), _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass"), name: "cancel", id: "kc-decline", type: "submit", value: msgStr("doDecline") })] })), _jsx("div", { className: "clearfix" })] })));
}
//# sourceMappingURL=Terms.js.map