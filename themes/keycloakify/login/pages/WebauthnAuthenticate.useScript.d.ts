import { KcContext } from "../../login/KcContext/KcContext";
type KcContextLike = {
    url: {
        resourcesPath: string;
    };
    isUserIdentified: "true" | "false";
    challenge: string;
    userVerification: KcContext.WebauthnAuthenticate["userVerification"];
    rpId: string;
    createTimeout: number | string;
};
type I18nLike = {
    msgStr: (key: "webauthn-unsupported-browser-text") => string;
    isFetchingTranslations: boolean;
};
export declare function useScript(params: {
    authButtonId: string;
    kcContext: KcContextLike;
    i18n: I18nLike;
}): void;
export {};
