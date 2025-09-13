import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function DeleteCredential(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msgStr, msg } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, credentialLabel } = kcContext;
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: false, headerNode: msg("deleteCredentialTitle", credentialLabel) }, { children: [_jsx("div", Object.assign({ id: "kc-delete-text" }, { children: msg("deleteCredentialMessage", credentialLabel) })), _jsxs("form", Object.assign({ className: "form-actions", action: url.loginAction, method: "POST" }, { children: [_jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass"), name: "accept", id: "kc-accept", type: "submit", value: msgStr("doConfirmDelete") }), _jsx("input", { className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass"), name: "cancel-aia", value: msgStr("doCancel"), id: "kc-decline", type: "submit" })] })), _jsx("div", { className: "clearfix" })] })));
}
//# sourceMappingURL=DeleteCredential.js.map