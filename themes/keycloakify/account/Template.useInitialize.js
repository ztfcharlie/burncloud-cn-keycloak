import { assert } from "../tools/assert";
import { useInsertLinkTags } from "../tools/useInsertLinkTags";
assert();
assert();
export function useInitialize(params) {
    const { kcContext, doUseDefaultCss } = params;
    const { url } = kcContext;
    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
                `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                `${url.resourcesPath}/css/account.css`
            ]
    });
    return { isReadyToRender: areAllStyleSheetsLoaded };
}
//# sourceMappingURL=Template.useInitialize.js.map