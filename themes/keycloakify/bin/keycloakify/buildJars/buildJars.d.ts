import { BuildContextLike as BuildContextLike_buildJar } from "./buildJar";
import type { BuildContext } from "../../shared/buildContext";
export type BuildContextLike = BuildContextLike_buildJar & {
    projectDirPath: string;
    keycloakifyBuildDirPath: string;
    implementedThemeTypes: BuildContext["implementedThemeTypes"];
    jarTargets: BuildContext["jarTargets"];
};
export declare function buildJars(params: {
    resourcesDirPath: string;
    buildContext: BuildContextLike;
}): Promise<void>;
