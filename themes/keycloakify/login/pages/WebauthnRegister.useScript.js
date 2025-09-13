import { useEffect } from "react";
import { useInsertScriptTags } from "../../tools/useInsertScriptTags";
import { assert } from "../../tools/assert";
import { waitForElementMountedOnDom } from "../../tools/waitForElementMountedOnDom";
assert();
assert();
export function useScript(params) {
    const { authButtonId, kcContext, i18n } = params;
    const { url, challenge, userid, username, signatureAlgorithms, rpEntityName, rpId, attestationConveyancePreference, authenticatorAttachment, requireResidentKey, userVerificationRequirement, createTimeout, excludeCredentialIds } = kcContext;
    const { msgStr, isFetchingTranslations } = i18n;
    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "LoginRecoveryAuthnCodeConfig",
        scriptTags: [
            {
                type: "module",
                textContent: () => `
                    import { registerByWebAuthn } from "${url.resourcesPath}/js/webauthnRegister.js";
                    const registerButton = document.getElementById('${authButtonId}');
                    registerButton.addEventListener("click", function() {
                        const input = {
                            challenge : '${challenge}',
                            userid : '${userid}',
                            username : '${username}',
                            signatureAlgorithms : ${JSON.stringify(signatureAlgorithms)},
                            rpEntityName : ${JSON.stringify(rpEntityName)},
                            rpId : ${JSON.stringify(rpId)},
                            attestationConveyancePreference : ${JSON.stringify(attestationConveyancePreference)},
                            authenticatorAttachment : ${JSON.stringify(authenticatorAttachment)},
                            requireResidentKey : ${JSON.stringify(requireResidentKey)},
                            userVerificationRequirement : ${JSON.stringify(userVerificationRequirement)},
                            createTimeout : ${createTimeout},
                            excludeCredentialIds : ${JSON.stringify(excludeCredentialIds)},
                            initLabel : ${JSON.stringify(msgStr("webauthn-registration-init-label"))},
                            initLabelPrompt : ${JSON.stringify(msgStr("webauthn-registration-init-label-prompt"))},
                            errmsg : ${JSON.stringify(msgStr("webauthn-unsupported-browser-text"))}
                        };
                        registerByWebAuthn(input);
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
//# sourceMappingURL=WebauthnRegister.useScript.js.map