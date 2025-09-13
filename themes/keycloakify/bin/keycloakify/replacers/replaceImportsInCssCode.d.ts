export type BuildContextLike = {
    urlPathname: string | undefined;
};
export declare function replaceImportsInCssCode(params: {
    cssCode: string;
    cssFileRelativeDirPath: string | undefined;
    buildContext: BuildContextLike;
}): {
    fixedCssCode: string;
};
