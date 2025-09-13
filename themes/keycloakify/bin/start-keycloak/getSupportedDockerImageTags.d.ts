import type { BuildContext } from "../shared/buildContext";
export type BuildContextLike = {
    fetchOptions: BuildContext["fetchOptions"];
    cacheDirPath: string;
};
export declare function getSupportedDockerImageTags(params: {
    buildContext: BuildContextLike;
}): Promise<{
    allSupportedTags: string[];
    latestMajorTags: string[];
}>;
