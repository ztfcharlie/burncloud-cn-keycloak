import type { ParsedRealmJson } from "../ParsedRealmJson/ParsedRealmJson";
export declare const getSupportedKeycloakMajorVersions: () => number[];
export declare function getDefaultConfig(params: {
    keycloakMajorVersionNumber: number;
}): ParsedRealmJson;
