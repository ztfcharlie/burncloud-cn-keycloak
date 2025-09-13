import { type KcContextLike } from "../noJsx/getI18n";
import type { GenericI18n } from "./GenericI18n";
import type { LanguageTag as LanguageTag_defaultSet, MessageKey as MessageKey_defaultSet } from "../messages_defaultSet/types";
export type ReturnTypeOfCreateUseI18n<MessageKey_themeDefined extends string, LanguageTag_notInDefaultSet extends string> = {
    useI18n: (params: {
        kcContext: KcContextLike;
    }) => {
        i18n: GenericI18n<MessageKey_defaultSet | MessageKey_themeDefined, LanguageTag_defaultSet | LanguageTag_notInDefaultSet>;
    };
    ofTypeI18n: GenericI18n<MessageKey_defaultSet | MessageKey_themeDefined, LanguageTag_defaultSet | LanguageTag_notInDefaultSet>;
};
export { KcContextLike };
export declare function createUseI18n<ThemeName extends string = string, MessageKey_themeDefined extends string = never, LanguageTag_notInDefaultSet extends string = never>(params: {
    extraLanguageTranslations: {
        [languageTag in LanguageTag_notInDefaultSet]: {
            label: string;
            getMessages: () => Promise<{
                default: Record<MessageKey_defaultSet, string>;
            }>;
        };
    };
    messagesByLanguageTag_themeDefined: Partial<{
        [languageTag in LanguageTag_defaultSet | LanguageTag_notInDefaultSet]: {
            [key in MessageKey_themeDefined]: string | Record<ThemeName, string>;
        };
    }>;
}): ReturnTypeOfCreateUseI18n<MessageKey_themeDefined, LanguageTag_notInDefaultSet>;
