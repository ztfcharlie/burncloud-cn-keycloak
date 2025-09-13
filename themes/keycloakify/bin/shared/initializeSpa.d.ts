import { type BuildContextLike as BuildContextLike_addSyncExtensionsToPostinstallScript } from "./addSyncExtensionsToPostinstallScript";
export type BuildContextLike = BuildContextLike_addSyncExtensionsToPostinstallScript & {
    themeSrcDirPath: string;
    packageJsonFilePath: string;
};
export declare function initializeSpa(params: {
    themeType: "account" | "admin";
    buildContext: BuildContextLike;
}): Promise<void>;
