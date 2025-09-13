import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
export default function WebauthnError(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayMessage: true, headerNode: msg("webauthn-error-title") }, { children: [_jsxs("form", Object.assign({ id: "kc-error-credential-form", className: kcClsx("kcFormClass"), action: url.loginAction, method: "post" }, { children: [_jsx("input", { type: "hidden", id: "executionValue", name: "authenticationExecution" }), _jsx("input", { type: "hidden", id: "isSetRetry", name: "isSetRetry" })] })), _jsx("input", { tabIndex: 4, onClick: () => {
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("isSetRetry").value = "retry";
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("executionValue").value = "${execution}";
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("kc-error-credential-form").requestSubmit();
                }, type: "button", className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), name: "try-again", id: "kc-try-again", value: msgStr("doTryAgain") }), isAppInitiatedAction && (_jsx("form", Object.assign({ action: url.loginAction, className: kcClsx("kcFormClass"), id: "kc-webauthn-settings-form", method: "post" }, { children: _jsx("button", Object.assign({ type: "submit", className: kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass"), id: "cancelWebAuthnAIA", name: "cancel-aia", value: "true" }, { children: msgStr("doCancel") })) })))] })));
}
//# sourceMappingURL=WebauthnError.js.map