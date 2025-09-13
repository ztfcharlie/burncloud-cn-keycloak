import type { BuildContext } from "../../shared/buildContext";
import { type BuildContextLike as BuildContextLike_kcContextExclusionsFtlCode } from "../generateFtl";
import { type BuildContextLike as BuildContextLike_generateMessageProperties } from "./generateMessageProperties";
export type BuildContextLike = BuildContextLike_kcContextExclusionsFtlCode & BuildContextLike_generateMessageProperties & {
    themeNames: string[];
    extraThemeProperties: string[] | undefined;
    projectDirPath: string;
    projectBuildDirPath: string;
    publicDirPath: string;
    environmentVariables: {
        name: string;
        default: string;
    }[];
    implementedThemeTypes: BuildContext["implementedThemeTypes"];
    themeSrcDirPath: string;
    bundler: "vite" | "webpack";
    packageJsonFilePath: string;
};
export declare function generateResources(params: {
    buildContext: BuildContextLike;
    resourcesDirPath: string;
}): Promise<void>;
