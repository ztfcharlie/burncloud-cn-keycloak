import { KcSanitizerPolicy } from "./KcSanitizerPolicy";
// implementation of keycloak java sanitize method ( KeycloakSanitizerMethod )
// https://github.com/keycloak/keycloak/blob/8ce8a4ba089eef25a0e01f58e09890399477b9ef/services/src/main/java/org/keycloak/theme/KeycloakSanitizerMethod.java#L33
export class KcSanitizer {
    static sanitize(html, dependencyInjections) {
        if (html === "")
            return "";
        html =
            (dependencyInjections === null || dependencyInjections === void 0 ? void 0 : dependencyInjections.htmlEntitiesDecode) !== undefined
                ? dependencyInjections.htmlEntitiesDecode(html)
                : this.decodeHtml(html);
        const sanitized = KcSanitizerPolicy.sanitize(html, dependencyInjections);
        return this.fixURLs(sanitized);
    }
    static decodeHtml(html) {
        if (!KcSanitizer.textarea) {
            KcSanitizer.textarea = document.createElement("textarea");
        }
        KcSanitizer.textarea.innerHTML = html;
        return KcSanitizer.textarea.value;
    }
    // This will remove unwanted characters from url
    static fixURLs(msg) {
        const HREF_PATTERN = this.HREF_PATTERN;
        const result = [];
        let last = 0;
        let match;
        do {
            match = HREF_PATTERN.exec(msg);
            if (match) {
                const href = match[0]
                    .replace(/&#61;/g, "=")
                    .replace(/\.\./g, ".")
                    .replace(/&amp;/g, "&");
                result.push(msg.substring(last, match.index));
                result.push(href);
                last = HREF_PATTERN.lastIndex;
            }
        } while (match);
        result.push(msg.substring(last));
        return result.join("");
    }
}
KcSanitizer.HREF_PATTERN = /\s+href="([^"]*)"/g;
KcSanitizer.textarea = null;
//# sourceMappingURL=KcSanitizer.js.map