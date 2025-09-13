import { useEffect } from "react";
import { useInsertScriptTags } from "../../tools/useInsertScriptTags";
import { assert } from "../../tools/assert";
import { waitForElementMountedOnDom } from "../../tools/waitForElementMountedOnDom";
assert();
assert();
export function useScript(params) {
    const { authButtonId, kcContext, i18n } = params;
    const { url, isUserIdentified, challenge, userVerification, rpId, createTimeout } = kcContext;
    const { msgStr, isFetchingTranslations } = i18n;
    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "LoginRecoveryAuthnCodeConfig",
        scriptTags: [
            {
                type: "module",
                textContent: () => `
                    import { authenticateByWebAuthn } from "${url.resourcesPath}/js/webauthnAuthenticate.js";
                    import { initAuthenticate } from "${url.resourcesPath}/js/passkeysConditionalAuth.js";

                    const authButton = document.getElementById("${authButtonId}");
                    const input = {
                        isUserIdentified : ${isUserIdentified},
                        challenge : ${JSON.stringify(challenge)},
                        userVerification : ${JSON.stringify(userVerification)},
                        rpId : ${JSON.stringify(rpId)},
                        createTimeout : ${createTimeout}
                    };
                    authButton.addEventListener("click", () => {
                        authenticateByWebAuthn({
                            ...input,
                            errmsg : ${JSON.stringify(msgStr("webauthn-unsupported-browser-text"))}
                        });
                    });

                    initAuthenticate({
                        ...input,
                        errmsg : ${JSON.stringify(msgStr("passkey-unsupported-browser-text"))}
                    });
                `
            }
        ]
    });
    useEffect(() => {
        if (isFetchingTranslations) {
            return;
        }
        (async () => {
            await waitForElementMountedOnDom({
                elementId: authButtonId
            });
            insertScriptTags();
        })();
    }, [isFetchingTranslations]);
}
//# sourceMappingURL=LoginPasskeysConditionalAuthenticate.useScript.js.map