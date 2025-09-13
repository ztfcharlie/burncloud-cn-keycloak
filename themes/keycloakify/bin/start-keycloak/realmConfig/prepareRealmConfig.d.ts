import type { ParsedRealmJson } from "./ParsedRealmJson";
import { type ThemeType } from "../../shared/constants";
export declare function prepareRealmConfig(params: {
    parsedRealmJson: ParsedRealmJson;
    keycloakMajorVersionNumber: number;
    parsedKeycloakThemesJsonEntry: {
        name: string;
        types: (ThemeType | "email")[];
    };
}): {
    realmName: string;
    clientName: string;
    username: string;
};
