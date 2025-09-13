import type { ParsedRealmJson } from "./ParsedRealmJson";
export declare function writeRealmJsonFile(params: {
    realmJsonFilePath: string;
    parsedRealmJson: ParsedRealmJson;
    keycloakMajorVersionNumber: number;
}): Promise<void>;
