export type KcContextLike = {
    url: {
        resourcesCommonPath: string;
        resourcesPath: string;
    };
};
export declare function useInitialize(params: {
    kcContext: KcContextLike;
    doUseDefaultCss: boolean;
}): {
    isReadyToRender: boolean;
};
