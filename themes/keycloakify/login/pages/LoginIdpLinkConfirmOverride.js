import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function LoginIdpLinkConfirmOverride(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, idpDisplayName } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("confirmOverrideIdpTitle") }, { children: _jsxs("form", Object.assign({ id: "kc-register-form", action: url.loginAction, method: "post" }, { children: [msg("pageExpiredMsg1"), " ", _jsx("a", Object.assign({ id: "loginRestartLink", href: url.loginRestartFlowUrl }, { children: msg("doClickHere") })), _jsx("br", {}), _jsx("br", {}), _jsx("button", Object.assign({ type: "submit", className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "submitAction", id: "confirmOverride", value: "confirmOverride" }, { children: msg("confirmOverrideIdpContinue", idpDisplayName) }))] })) })));
}
//# sourceMappingURL=LoginIdpLinkConfirmOverride.js.map