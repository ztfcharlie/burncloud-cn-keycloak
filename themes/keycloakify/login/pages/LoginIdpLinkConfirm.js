import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function LoginIdpLinkConfirm(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, idpAlias } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("confirmLinkIdpTitle") }, { children: _jsx("form", Object.assign({ id: "kc-register-form", action: url.loginAction, method: "post" }, { children: _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, { children: [_jsx("button", Object.assign({ type: "submit", className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "submitAction", id: "updateProfile", value: "updateProfile" }, { children: msg("confirmLinkIdpReviewProfile") })), _jsx("button", Object.assign({ type: "submit", className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "submitAction", id: "linkAccount", value: "linkAccount" }, { children: msg("confirmLinkIdpContinue", idpAlias) }))] })) })) })));
}
//# sourceMappingURL=LoginIdpLinkConfirm.js.map