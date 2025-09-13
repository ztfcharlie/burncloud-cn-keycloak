export type BuildContextLike = {
    projectDirPath: string;
    packageJsonFilePath: string;
};
export declare function addSyncExtensionsToPostinstallScript(params: {
    parsedPackageJson: {
        scripts?: Record<string, string | undefined>;
    };
    buildContext: BuildContextLike;
}): void;
