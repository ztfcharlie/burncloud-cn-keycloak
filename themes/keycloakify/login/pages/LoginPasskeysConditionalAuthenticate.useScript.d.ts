type KcContextLike = {
    url: {
        resourcesPath: string;
    };
    isUserIdentified: boolean | "true" | "false";
    challenge: string;
    userVerification: string;
    rpId: string;
    createTimeout: number | string;
};
type I18nLike = {
    msgStr: (key: "webauthn-unsupported-browser-text" | "passkey-unsupported-browser-text") => string;
    isFetchingTranslations: boolean;
};
export declare function useScript(params: {
    authButtonId: string;
    kcContext: KcContextLike;
    i18n: I18nLike;
}): void;
export {};
