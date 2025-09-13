import type { KeycloakAccountV1Version, KeycloakThemeAdditionalInfoExtensionVersion } from "./extensionVersions";
import type { KeycloakVersionRange } from "../../shared/KeycloakVersionRange";
export declare function getKeycloakVersionRangeForJar(params: {
    doesImplementAccountV1Theme: boolean;
    keycloakAccountV1Version: KeycloakAccountV1Version;
    keycloakThemeAdditionalInfoExtensionVersion: KeycloakThemeAdditionalInfoExtensionVersion;
}): KeycloakVersionRange | undefined;
