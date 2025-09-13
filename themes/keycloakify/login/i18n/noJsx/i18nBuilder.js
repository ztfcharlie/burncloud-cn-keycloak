import { createGetI18n } from "./getI18n";
function createI18nBuilder(params) {
    const i18nBuilder = {
        withThemeName: () => createI18nBuilder({
            extraLanguageTranslations: params.extraLanguageTranslations,
            messagesByLanguageTag_themeDefined: params.messagesByLanguageTag_themeDefined
        }),
        withExtraLanguages: extraLanguageTranslations => createI18nBuilder({
            extraLanguageTranslations,
            messagesByLanguageTag_themeDefined: params.messagesByLanguageTag_themeDefined
        }),
        withCustomTranslations: messagesByLanguageTag_themeDefined => createI18nBuilder({
            extraLanguageTranslations: params.extraLanguageTranslations,
            messagesByLanguageTag_themeDefined
        }),
        build: () => createGetI18n({
            extraLanguageTranslations: params.extraLanguageTranslations,
            messagesByLanguageTag_themeDefined: params.messagesByLanguageTag_themeDefined
        })
    };
    return i18nBuilder;
}
export const i18nBuilder = createI18nBuilder({
    extraLanguageTranslations: {},
    messagesByLanguageTag_themeDefined: {}
});
//# sourceMappingURL=i18nBuilder.js.map