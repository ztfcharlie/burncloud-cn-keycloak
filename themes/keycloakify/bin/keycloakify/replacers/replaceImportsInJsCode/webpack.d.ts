export type BuildContextLike = {
    projectBuildDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
};
export declare function replaceImportsInJsCode_webpack(params: {
    jsCode: string;
    buildContext: BuildContextLike;
    systemType?: "posix" | "win32";
}): {
    fixedJsCode: string;
};
