import "../../../tools/Object.fromEntries";
import { type LanguageTag as LanguageTag_defaultSet, type MessageKey as MessageKey_defaultSet } from "../messages_defaultSet/types";
import type { GenericI18n_noJsx } from "./GenericI18n_noJsx";
export type KcContextLike = {
    themeName: string;
    realm: {
        internationalizationEnabled: boolean;
    };
    locale?: {
        currentLanguageTag: string;
        supported: {
            languageTag: string;
            url: string;
            label: string;
        }[];
        rtl?: boolean;
    };
    "x-keycloakify": {
        messages: Record<string, string>;
    };
};
export type ReturnTypeOfCreateGetI18n<MessageKey_themeDefined extends string, LanguageTag_notInDefaultSet extends string> = {
    getI18n: (params: {
        kcContext: KcContextLike;
    }) => {
        i18n: GenericI18n_noJsx<MessageKey_defaultSet | MessageKey_themeDefined, LanguageTag_defaultSet | LanguageTag_notInDefaultSet>;
        prI18n_currentLanguage: Promise<GenericI18n_noJsx<MessageKey_defaultSet | MessageKey_themeDefined, LanguageTag_defaultSet | LanguageTag_notInDefaultSet>> | undefined;
    };
    ofTypeI18n: GenericI18n_noJsx<MessageKey_defaultSet | MessageKey_themeDefined, LanguageTag_defaultSet | LanguageTag_notInDefaultSet>;
};
export declare function createGetI18n<ThemeName extends string = string, MessageKey_themeDefined extends string = never, LanguageTag_notInDefaultSet extends string = never>(params: {
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
}): ReturnTypeOfCreateGetI18n<MessageKey_themeDefined, LanguageTag_notInDefaultSet>;
