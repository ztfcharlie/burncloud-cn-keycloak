export type KeycloakVersionRange = KeycloakVersionRange.WithAccountV1Theme | KeycloakVersionRange.WithoutAccountV1Theme;
export declare namespace KeycloakVersionRange {
    type WithoutAccountV1Theme = "22-to-25" | "all-other-versions";
    type WithAccountV1Theme = "21-and-below" | "23" | "24" | "25" | "26.0-to-26.1" | "26.2-and-above";
}
