import type { ExtendKcContext, KcContext as KcContextBase } from "./KcContext";
import type { AccountThemePageId } from "../../bin/shared/constants";
import type { DeepPartial } from "../../tools/DeepPartial";
export declare function createGetKcContextMock<KcContextExtension extends {
    properties?: Record<string, string | undefined>;
}, KcContextExtensionPerPage extends Record<`${string}.ftl`, Record<string, unknown>>>(params: {
    kcContextExtension: KcContextExtension;
    kcContextExtensionPerPage: KcContextExtensionPerPage;
    overrides?: DeepPartial<KcContextExtension & KcContextBase.Common>;
    overridesPerPage?: {
        [PageId in AccountThemePageId | keyof KcContextExtensionPerPage]?: DeepPartial<Extract<ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>, {
            pageId: PageId;
        }>>;
    };
}): {
    getKcContextMock: <PageId extends "password.ftl" | "account.ftl" | "sessions.ftl" | "totp.ftl" | "applications.ftl" | "log.ftl" | "federatedIdentity.ftl" | keyof KcContextExtensionPerPage>(params: {
        pageId: PageId;
        overrides?: DeepPartial<Extract<ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>, {
            pageId: PageId;
        }>> | undefined;
    }) => Extract<ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>, {
        pageId: PageId;
    }>;
};
