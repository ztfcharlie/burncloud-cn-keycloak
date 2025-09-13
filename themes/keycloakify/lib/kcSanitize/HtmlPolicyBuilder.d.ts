import { DOMPurify } from "../../tools/vendor/dompurify";
export declare class HtmlPolicyBuilder {
    private globalAttributesAllowed;
    private tagsAllowed;
    private tagsAllowedWithNoAttribute;
    private currentAttribute;
    private isStylingAllowed;
    private allowedProtocols;
    private enforceRelNofollow;
    private DOMPurify;
    constructor(dependencyInjections: Partial<{
        DOMPurify: typeof DOMPurify;
    }>);
    allowWithoutAttributes(tag: string): this;
    allowAttributes(...args: string[]): this;
    matching(matchingPattern: RegExp | ((value: string) => boolean)): this;
    globally(): this;
    allowStyling(): this;
    onElements(...tags: string[]): this;
    allowElements(...tags: string[]): this;
    requireRelNofollowOnLinks(): this;
    allowStandardUrlProtocols(): this;
    apply(html: string): string;
    private setupHooks;
    private getAllowedAttributes;
    private getAllowedUriRegexp;
}
