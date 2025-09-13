export type BuildContextLike = {
    projectBuildDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
};
export declare function replaceImportsInJsCode_vite(params: {
    jsCode: string;
    buildContext: BuildContextLike;
    basenameOfAssetsFiles: string[];
    systemType?: "posix" | "win32";
}): {
    fixedJsCode: string;
};
