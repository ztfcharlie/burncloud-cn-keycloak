export type BuildContextLike = {
    projectDirPath: string;
};
export declare function startViteDevServer(params: {
    buildContext: BuildContextLike;
}): Promise<{
    port: number;
}>;
