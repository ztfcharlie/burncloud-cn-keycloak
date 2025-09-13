import "../../../tools/Object.fromEntries";
import { assert, is } from "tsafe/assert";
import { extractLastParenthesisContent } from "../../../tools/extractLastParenthesisContent";
import messages_defaultSet_fallbackLanguage from "../messages_defaultSet/en";
import { fetchMessages_defaultSet } from "../messages_defaultSet";
import { FALLBACK_LANGUAGE_TAG } from "../../../bin/shared/constants";
import { id } from "tsafe/id";
import { Reflect } from "tsafe/Reflect";
import { languageTags as languageTags_defaultSet } from "../messages_defaultSet/types";
assert();
export function createGetI18n(params) {
    const { extraLanguageTranslations, messagesByLanguageTag_themeDefined } = params;
    Object.keys(extraLanguageTranslations).forEach(languageTag_notInDefaultSet => {
        if (id(languageTags_defaultSet).includes(languageTag_notInDefaultSet)) {
            throw new Error([
                `Language "${languageTag_notInDefaultSet}" is already in the default set, you don't need to provide your own base translations for it`,
                `If you want to override some translations for this language, you can use the "withCustomTranslations" method`
            ].join(" "));
        }
    });
    const cachedResultByKcContext = new WeakMap();
    function getI18n(params) {
        var _a, _b, _c;
        const { kcContext } = params;
        use_cache: {
            const cachedResult = cachedResultByKcContext.get(kcContext);
            if (cachedResult === undefined) {
                break use_cache;
            }
            return cachedResult;
        }
        const kcContextLocale = params.kcContext.realm.internationalizationEnabled ? params.kcContext.locale : undefined;
        {
            const currentLanguageTag = (_a = kcContextLocale === null || kcContextLocale === void 0 ? void 0 : kcContextLocale.currentLanguageTag) !== null && _a !== void 0 ? _a : FALLBACK_LANGUAGE_TAG;
            const html = document.querySelector("html");
            assert(html !== null);
            html.lang = currentLanguageTag;
            const isRtl = (() => {
                const { rtl } = kcContextLocale !== null && kcContextLocale !== void 0 ? kcContextLocale : {};
                if (rtl !== undefined) {
                    return rtl;
                }
                return [
                    /* spell-checker: disable */
                    // Common RTL languages
                    "ar",
                    "fa",
                    "he",
                    "ur",
                    "ps",
                    "syr",
                    "dv",
                    "ku",
                    "ug",
                    "az",
                    "sd",
                    // Less common RTL languages
                    "yi",
                    "ha",
                    "ks",
                    "bal",
                    "khw",
                    "brh",
                    "tmh",
                    "bgn",
                    "arc",
                    "sam",
                    "prd",
                    "huz",
                    "gbz",
                    "urj" // Urdu in Romanized script (not always RTL, but to account for edge cases)
                    /* spell-checker: enable */
                ].includes(currentLanguageTag);
            })();
            html.dir = isRtl ? "rtl" : "ltr";
        }
        const getLanguageLabel = (languageTag) => {
            form_user_added_languages: {
                if (!(languageTag in extraLanguageTranslations)) {
                    break form_user_added_languages;
                }
                assert(is(languageTag));
                const entry = extraLanguageTranslations[languageTag];
                return entry.label;
            }
            from_server: {
                if (kcContextLocale === undefined) {
                    break from_server;
                }
                const supportedEntry = kcContextLocale.supported.find(entry => entry.languageTag === languageTag);
                if (supportedEntry === undefined) {
                    break from_server;
                }
                const lastParenthesisContent = extractLastParenthesisContent(supportedEntry.label);
                if (lastParenthesisContent !== undefined) {
                    return lastParenthesisContent;
                }
                return supportedEntry.label;
            }
            // NOTE: This should never happen
            return languageTag;
        };
        const currentLanguage = (() => {
            var _a;
            const languageTag = id((_a = kcContextLocale === null || kcContextLocale === void 0 ? void 0 : kcContextLocale.currentLanguageTag) !== null && _a !== void 0 ? _a : FALLBACK_LANGUAGE_TAG);
            return {
                languageTag,
                label: getLanguageLabel(languageTag)
            };
        })();
        const enabledLanguages = (() => {
            var _a;
            const enabledLanguages = [];
            if (kcContextLocale !== undefined) {
                for (const entry of (_a = kcContextLocale.supported) !== null && _a !== void 0 ? _a : []) {
                    const languageTag = id(entry.languageTag);
                    enabledLanguages.push({
                        languageTag,
                        label: getLanguageLabel(languageTag),
                        href: entry.url
                    });
                }
            }
            if (enabledLanguages.find(({ languageTag }) => languageTag === currentLanguage.languageTag) === undefined) {
                enabledLanguages.push({
                    languageTag: currentLanguage.languageTag,
                    label: getLanguageLabel(currentLanguage.languageTag),
                    href: "#"
                });
            }
            return enabledLanguages;
        })();
        const { createI18nTranslationFunctions } = createI18nTranslationFunctionsFactory({
            themeName: kcContext.themeName,
            messages_themeDefined: (_c = (_b = messagesByLanguageTag_themeDefined[currentLanguage.languageTag]) !== null && _b !== void 0 ? _b : messagesByLanguageTag_themeDefined[id(FALLBACK_LANGUAGE_TAG)]) !== null && _c !== void 0 ? _c : (() => {
                const firstLanguageTag = Object.keys(messagesByLanguageTag_themeDefined)[0];
                if (firstLanguageTag === undefined) {
                    return undefined;
                }
                return messagesByLanguageTag_themeDefined[firstLanguageTag];
            })(),
            messages_fromKcServer: kcContext["x-keycloakify"].messages
        });
        const isCurrentLanguageFallbackLanguage = currentLanguage.languageTag === FALLBACK_LANGUAGE_TAG;
        const result = {
            i18n: Object.assign(Object.assign({ currentLanguage,
                enabledLanguages }, createI18nTranslationFunctions({
                messages_defaultSet_currentLanguage: isCurrentLanguageFallbackLanguage ? messages_defaultSet_fallbackLanguage : undefined
            })), { isFetchingTranslations: !isCurrentLanguageFallbackLanguage }),
            prI18n_currentLanguage: isCurrentLanguageFallbackLanguage
                ? undefined
                : (async () => {
                    const messages_defaultSet_currentLanguage = await (async () => {
                        const currentLanguageTag = currentLanguage.languageTag;
                        const fromDefaultSet = await fetchMessages_defaultSet(currentLanguageTag);
                        const isEmpty = (() => {
                            for (let _key in fromDefaultSet) {
                                return false;
                            }
                            return true;
                        })();
                        if (isEmpty) {
                            assert(is(currentLanguageTag));
                            const entry = extraLanguageTranslations[currentLanguageTag];
                            assert(entry !== undefined);
                            return entry.getMessages().then(({ default: messages }) => messages);
                        }
                        return fromDefaultSet;
                    })();
                    const i18n_currentLanguage = Object.assign(Object.assign({ currentLanguage,
                        enabledLanguages }, createI18nTranslationFunctions({ messages_defaultSet_currentLanguage })), { isFetchingTranslations: false });
                    // NOTE: This promise.resolve is just because without it we TypeScript
                    // gives a Variable 'result' is used before being assigned. error
                    await Promise.resolve().then(() => {
                        result.i18n = i18n_currentLanguage;
                        result.prI18n_currentLanguage = undefined;
                    });
                    return i18n_currentLanguage;
                })()
        };
        cachedResultByKcContext.set(kcContext, result);
        return result;
    }
    return {
        getI18n,
        ofTypeI18n: Reflect()
    };
}
function createI18nTranslationFunctionsFactory(params) {
    const { themeName, messages_themeDefined, messages_fromKcServer } = params;
    function createI18nTranslationFunctions(params) {
        const { messages_defaultSet_currentLanguage } = params;
        function resolveMsg(props) {
            var _a, _b, _c, _d, _e;
            const { key, args } = props;
            const message = (_d = (_b = (_a = id(messages_fromKcServer)[key]) !== null && _a !== void 0 ? _a : (() => {
                var _a;
                const messageOrMap = (_a = id(messages_themeDefined)) === null || _a === void 0 ? void 0 : _a[key];
                if (messageOrMap === undefined) {
                    return undefined;
                }
                if (typeof messageOrMap === "string") {
                    return messageOrMap;
                }
                const message = messageOrMap[themeName];
                assert(message !== undefined, `No translation for theme variant "${themeName}" for key "${key}"`);
                return message;
            })()) !== null && _b !== void 0 ? _b : (_c = id(messages_defaultSet_currentLanguage)) === null || _c === void 0 ? void 0 : _c[key]) !== null && _d !== void 0 ? _d : id(messages_defaultSet_fallbackLanguage)[key];
            if (message === undefined) {
                return undefined;
            }
            const startIndex = (_e = message
                .match(/{[0-9]+}/g)) === null || _e === void 0 ? void 0 : _e.map(g => g.match(/{([0-9]+)}/)[1]).map(indexStr => parseInt(indexStr)).sort((a, b) => a - b)[0];
            if (startIndex === undefined) {
                // No {0} in message (no arguments expected)
                return message;
            }
            let messageWithArgsInjected = message;
            args.forEach((arg, i) => {
                if (arg === undefined) {
                    return;
                }
                messageWithArgsInjected = messageWithArgsInjected.replace(new RegExp(`\\{${i + startIndex}\\}`, "g"), arg);
            });
            return messageWithArgsInjected;
        }
        function resolveMsgAdvanced(props) {
            var _a;
            const { key, args } = props;
            const match = key.match(/^\$\{(.+)\}$/);
            return (_a = resolveMsg({ key: match !== null ? match[1] : key, args })) !== null && _a !== void 0 ? _a : key;
        }
        return {
            msgStr: (key, ...args) => {
                const resolvedMessage = resolveMsg({ key, args });
                assert(resolvedMessage !== undefined, `Message with key "${key}" not found`);
                return resolvedMessage;
            },
            advancedMsgStr: (key, ...args) => resolveMsgAdvanced({ key, args })
        };
    }
    return { createI18nTranslationFunctions };
}
//# sourceMappingURL=getI18n.js.map