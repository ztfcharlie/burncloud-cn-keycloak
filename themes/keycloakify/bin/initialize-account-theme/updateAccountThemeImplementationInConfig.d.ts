import type { BuildContext } from "../shared/buildContext";
export type BuildContextLike = {
    bundler: BuildContext["bundler"];
    projectDirPath: string;
    packageJsonFilePath: string;
};
export declare function updateAccountThemeImplementationInConfig(params: {
    buildContext: BuildContextLike;
    accountThemeType: "Single-Page" | "Multi-Page";
}): void;
