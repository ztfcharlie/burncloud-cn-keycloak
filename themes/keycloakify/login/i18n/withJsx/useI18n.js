import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { kcSanitize } from "../../../lib/kcSanitize";
import { createGetI18n } from "../noJsx/getI18n";
import { Reflect } from "tsafe/Reflect";
export function createUseI18n(params) {
    const { extraLanguageTranslations, messagesByLanguageTag_themeDefined } = params;
    const { withJsx } = (() => {
        const cache = new WeakMap();
        function renderHtmlString(params) {
            const { htmlString, msgKey } = params;
            const htmlString_sanitized = kcSanitize(htmlString);
            const Element = (() => {
                if (htmlString_sanitized.includes("<") && htmlString_sanitized.includes(">")) {
                    for (const tagName of ["div", "section", "article", "ul", "ol"]) {
                        if (htmlString_sanitized.includes(`<${tagName}`)) {
                            return "div";
                        }
                    }
                }
                return "span";
            })();
            return (_jsx(Element, { "data-kc-msg": msgKey, dangerouslySetInnerHTML: {
                    __html: htmlString_sanitized
                } }));
        }
        function withJsx(i18n_noJsx) {
            use_cache: {
                const i18n = cache.get(i18n_noJsx);
                if (i18n === undefined) {
                    break use_cache;
                }
                return i18n;
            }
            const i18n = Object.assign(Object.assign({}, i18n_noJsx), { msg: (msgKey, ...args) => renderHtmlString({ htmlString: i18n_noJsx.msgStr(msgKey, ...args), msgKey }), advancedMsg: (msgKey, ...args) => renderHtmlString({ htmlString: i18n_noJsx.advancedMsgStr(msgKey, ...args), msgKey }) });
            cache.set(i18n_noJsx, i18n);
            return i18n;
        }
        return { withJsx };
    })();
    add_style: {
        const attributeName = "data-kc-msg";
        // Check if already exists in head
        if (document.querySelector(`style[${attributeName}]`) !== null) {
            break add_style;
        }
        const styleElement = document.createElement("style");
        styleElement.attributes.setNamedItem(document.createAttribute(attributeName));
        styleElement.textContent = `div[${attributeName}] { display: inline-block; }`;
        document.head.prepend(styleElement);
    }
    const { getI18n } = createGetI18n({ extraLanguageTranslations, messagesByLanguageTag_themeDefined });
    function useI18n(params) {
        const { kcContext } = params;
        const { i18n, prI18n_currentLanguage } = getI18n({ kcContext });
        const [i18n_toReturn, setI18n_toReturn] = useState(withJsx(i18n));
        useEffect(() => {
            let isActive = true;
            prI18n_currentLanguage === null || prI18n_currentLanguage === void 0 ? void 0 : prI18n_currentLanguage.then(i18n => {
                if (!isActive) {
                    return;
                }
                setI18n_toReturn(withJsx(i18n));
            });
            return () => {
                isActive = false;
            };
        }, []);
        return { i18n: i18n_toReturn };
    }
    return { useI18n, ofTypeI18n: Reflect() };
}
//# sourceMappingURL=useI18n.js.map