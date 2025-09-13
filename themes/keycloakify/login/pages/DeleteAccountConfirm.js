import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function DeleteAccountConfirm(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, triggered_from_aia } = kcContext;
    const { msg, msgStr } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("deleteAccountConfirm") }, { children: _jsxs("form", Object.assign({ action: url.loginAction, className: "form-vertical", method: "post" }, { children: [_jsxs("div", Object.assign({ className: "alert alert-warning", style: { marginTop: "0", marginBottom: "30px" } }, { children: [_jsx("span", { className: "pficon pficon-warning-triangle-o" }), msg("irreversibleAction")] })), _jsx("p", { children: msg("deletingImplies") }), _jsxs("ul", Object.assign({ style: {
                        color: "#72767b",
                        listStyle: "disc",
                        listStylePosition: "inside"
                    } }, { children: [_jsx("li", { children: msg("loggingOutImmediately") }), _jsx("li", { children: msg("errasingData") })] })), _jsx("p", Object.assign({ className: "delete-account-text" }, { children: msg("finalDeletionConfirmation") })), _jsxs("div", Object.assign({ id: "kc-form-buttons" }, { children: [_jsx("input", { className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass"), type: "submit", value: msgStr("doConfirmDelete") }), triggered_from_aia && (_jsx("button", Object.assign({ className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass"), style: { marginLeft: "calc(100% - 220px)" }, type: "submit", name: "cancel-aia", value: "true" }, { children: msgStr("doCancel") })))] }))] })) })));
}
//# sourceMappingURL=DeleteAccountConfirm.js.map