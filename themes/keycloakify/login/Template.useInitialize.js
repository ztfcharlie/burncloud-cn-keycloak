import { useEffect } from "react";
import { assert } from "../tools/assert";
import { useInsertScriptTags } from "../tools/useInsertScriptTags";
import { useInsertLinkTags } from "../tools/useInsertLinkTags";
assert();
assert();
export function useInitialize(params) {
    const { kcContext, doUseDefaultCss } = params;
    const { url, scripts } = kcContext;
    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                `${url.resourcesCommonPath}/node_modules/@patternfly/patternfly/patternfly.min.css`,
                `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
                `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                `${url.resourcesCommonPath}/lib/pficon/pficon.css`,
                `${url.resourcesPath}/css/login.css`
            ]
    });
    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "Template",
        scriptTags: [
            // NOTE: The importmap is added in by the FTL script because it's too late to add it here.
            {
                type: "module",
                src: `${url.resourcesPath}/js/menu-button-links.js`
            },
            ...(scripts === undefined
                ? []
                : scripts.map(src => ({
                    type: "text/javascript",
                    src
                }))),
            {
                type: "module",
                textContent: [
                    `import { startSessionPolling, checkAuthSession } from "${url.resourcesPath}/js/authChecker.js";`,
                    ``,
                    `startSessionPolling("${kcContext.url.ssoLoginInOtherTabsUrl}");`,
                    kcContext.authenticationSession === undefined
                        ? ""
                        : `checkAuthSession("${kcContext.authenticationSession.authSessionIdHash}");`
                ].join("\n")
            }
        ]
    });
    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);
    return { isReadyToRender: areAllStyleSheetsLoaded };
}
//# sourceMappingURL=Template.useInitialize.js.map