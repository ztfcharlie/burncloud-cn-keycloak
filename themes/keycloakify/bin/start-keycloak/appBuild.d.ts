export type BuildContextLike = {
    projectDirPath: string;
    packageJsonFilePath: string;
};
export declare function appBuild(params: {
    buildContext: BuildContextLike;
}): Promise<{
    isAppBuildSuccess: boolean;
}>;
