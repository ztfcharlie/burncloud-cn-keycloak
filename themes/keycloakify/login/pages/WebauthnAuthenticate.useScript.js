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
        componentOrHookName: "WebauthnAuthenticate",
        scriptTags: [
            {
                type: "module",
                textContent: () => `

                    import { authenticateByWebAuthn } from "${url.resourcesPath}/js/webauthnAuthenticate.js";
                    const authButton = document.getElementById('${authButtonId}');
                    authButton.addEventListener("click", function() {
                        const input = {
                            isUserIdentified : ${isUserIdentified},
                            challenge : '${challenge}',
                            userVerification : '${userVerification}',
                            rpId : '${rpId}',
                            createTimeout : ${createTimeout},
                            errmsg : ${JSON.stringify(msgStr("webauthn-unsupported-browser-text"))}
                        };
                        authenticateByWebAuthn(input);
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
//# sourceMappingURL=WebauthnAuthenticate.useScript.js.map