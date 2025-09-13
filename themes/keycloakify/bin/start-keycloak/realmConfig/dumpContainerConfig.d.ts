import { type ParsedRealmJson } from "./ParsedRealmJson";
export type BuildContextLike = {
    cacheDirPath: string;
};
export declare function dumpContainerConfig(params: {
    realmName: string;
    keycloakMajorVersionNumber: number;
    buildContext: BuildContextLike;
}): Promise<ParsedRealmJson>;
