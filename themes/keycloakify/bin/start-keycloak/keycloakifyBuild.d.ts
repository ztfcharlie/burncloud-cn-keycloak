export type BuildContextLike = {
    projectDirPath: string;
    keycloakifyBuildDirPath: string;
};
export declare function keycloakifyBuild(params: {
    buildForKeycloakMajorVersionNumber: number;
    buildContext: BuildContextLike;
}): Promise<{
    isKeycloakifyBuildSuccess: boolean;
}>;
