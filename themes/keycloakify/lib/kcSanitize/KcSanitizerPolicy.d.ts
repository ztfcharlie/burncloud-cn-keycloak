import type { DOMPurify as ofTypeDomPurify } from "../../tools/vendor/dompurify";
export declare class KcSanitizerPolicy {
    static readonly COLOR_NAME: RegExp;
    static readonly COLOR_CODE: RegExp;
    static readonly NUMBER_OR_PERCENT: RegExp;
    static readonly PARAGRAPH: RegExp;
    static readonly HTML_ID: RegExp;
    static readonly HTML_TITLE: RegExp;
    static readonly HTML_CLASS: RegExp;
    static readonly ONSITE_URL: RegExp;
    static readonly OFFSITE_URL: RegExp;
    static readonly NUMBER: RegExp;
    static readonly NAME: RegExp;
    static readonly ALIGN: RegExp;
    static readonly VALIGN: RegExp;
    static readonly HISTORY_BACK: RegExp;
    static readonly ONE_CHAR: RegExp;
    private static COLOR_NAME_OR_COLOR_CODE;
    private static ONSITE_OR_OFFSITE_URL;
    static sanitize(html: string, dependencyInjections: Partial<{
        DOMPurify: typeof ofTypeDomPurify;
    }>): string;
}
