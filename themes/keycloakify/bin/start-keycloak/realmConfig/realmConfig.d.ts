import { type BuildContextLike as BuildContextLike_dumpContainerConfig } from "./dumpContainerConfig";
import type { ThemeType } from "../../shared/constants";
export type BuildContextLike = BuildContextLike_dumpContainerConfig & {
    projectDirPath: string;
};
export declare function getRealmConfig(params: {
    keycloakMajorVersionNumber: number;
    realmJsonFilePath_userProvided: string | undefined;
    parsedKeycloakThemesJsonEntry: {
        name: string;
        types: (ThemeType | "email")[];
    };
    buildContext: BuildContextLike;
}): Promise<{
    realmJsonFilePath: string;
    clientName: string;
    realmName: string;
    username: string;
    onRealmConfigChange: () => Promise<void>;
}>;
