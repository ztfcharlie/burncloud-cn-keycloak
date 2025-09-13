import type { KeycloakAccountV1Version, KeycloakThemeAdditionalInfoExtensionVersion } from "./extensionVersions";
export type BuildContextLike = {
    groupId: string;
    artifactId: string;
    themeVersion: string;
};
export declare function generatePom(params: {
    keycloakAccountV1Version: KeycloakAccountV1Version;
    keycloakThemeAdditionalInfoExtensionVersion: KeycloakThemeAdditionalInfoExtensionVersion;
    buildContext: BuildContextLike;
}): {
    pomFileCode: string;
};
