type KcContextLike = {
    url: {
        resourcesPath: string;
    };
    challenge: string;
    userid: string;
    username: string;
    signatureAlgorithms: string[];
    rpEntityName: string;
    rpId: string;
    attestationConveyancePreference: string;
    authenticatorAttachment: string;
    requireResidentKey: string;
    userVerificationRequirement: string;
    createTimeout: number | string;
    excludeCredentialIds: string;
};
type I18nLike = {
    msgStr: (key: "webauthn-registration-init-label" | "webauthn-registration-init-label-prompt" | "webauthn-unsupported-browser-text") => string;
    isFetchingTranslations: boolean;
};
export declare function useScript(params: {
    authButtonId: string;
    kcContext: KcContextLike;
    i18n: I18nLike;
}): void;
export {};
