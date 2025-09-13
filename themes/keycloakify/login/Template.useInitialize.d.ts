export type KcContextLike = {
    url: {
        resourcesCommonPath: string;
        resourcesPath: string;
        ssoLoginInOtherTabsUrl: string;
    };
    scripts?: string[];
    authenticationSession?: {
        authSessionIdHash: string;
    };
};
export declare function useInitialize(params: {
    kcContext: KcContextLike;
    doUseDefaultCss: boolean;
}): {
    isReadyToRender: boolean;
};
