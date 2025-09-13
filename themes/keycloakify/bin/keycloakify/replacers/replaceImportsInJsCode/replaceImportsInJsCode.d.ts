export type BuildContextLike = {
    projectBuildDirPath: string;
    assetsDirPath: string;
    urlPathname: string | undefined;
    bundler: "vite" | "webpack";
};
export declare function replaceImportsInJsCode(params: {
    jsCode: string;
    buildContext: BuildContextLike;
}): {
    fixedJsCode: string;
};
