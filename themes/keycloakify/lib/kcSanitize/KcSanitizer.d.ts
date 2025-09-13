import type { DOMPurify as ofTypeDomPurify } from "../../tools/vendor/dompurify";
export declare class KcSanitizer {
    private static HREF_PATTERN;
    private static textarea;
    static sanitize(html: string, dependencyInjections: Partial<{
        DOMPurify: typeof ofTypeDomPurify;
        htmlEntitiesDecode: (html: string) => string;
    }>): string;
    private static decodeHtml;
    private static fixURLs;
}
