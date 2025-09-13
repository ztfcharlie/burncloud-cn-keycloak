import type { KeycloakAccountV1Version, KeycloakThemeAdditionalInfoExtensionVersion } from "./extensionVersions";
import type { BuildContext } from "../../shared/buildContext";
import { BuildContextLike as BuildContextLike_generatePom } from "./generatePom";
export type BuildContextLike = BuildContextLike_generatePom & {
    keycloakifyBuildDirPath: string;
    themeNames: string[];
    artifactId: string;
    themeVersion: string;
    cacheDirPath: string;
    implementedThemeTypes: BuildContext["implementedThemeTypes"];
};
export declare function buildJar(params: {
    jarFileBasename: string;
    keycloakAccountV1Version: KeycloakAccountV1Version;
    keycloakThemeAdditionalInfoExtensionVersion: KeycloakThemeAdditionalInfoExtensionVersion;
    resourcesDirPath: string;
    doesImplementAccountV1Theme: boolean;
    buildContext: BuildContextLike;
}): Promise<void>;
