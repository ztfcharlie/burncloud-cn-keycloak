import { deepAssign } from "../../tools/deepAssign";
import { structuredCloneButFunctions } from "../../tools/structuredCloneButFunctions";
import { kcContextMocks, kcContextCommonMock } from "./kcContextMocks";
import { exclude } from "tsafe/exclude";
export function createGetKcContextMock(params) {
    const { kcContextExtension, kcContextExtensionPerPage, overrides: overrides_global, overridesPerPage: overridesPerPage_global } = params;
    function getKcContextMock(params) {
        var _a;
        const { pageId, overrides } = params;
        const kcContextMock = structuredCloneButFunctions((_a = kcContextMocks.find(kcContextMock => kcContextMock.pageId === pageId)) !== null && _a !== void 0 ? _a : Object.assign(Object.assign({}, kcContextCommonMock), { pageId }));
        [
            kcContextExtension,
            kcContextExtensionPerPage[pageId],
            overrides_global,
            overridesPerPage_global === null || overridesPerPage_global === void 0 ? void 0 : overridesPerPage_global[pageId],
            overrides
        ]
            .filter(exclude(undefined))
            .forEach(overrides => deepAssign({
            target: kcContextMock,
            source: overrides
        }));
        // @ts-expect-error
        return kcContextMock;
    }
    return { getKcContextMock };
}
//# sourceMappingURL=getKcContextMock.js.map