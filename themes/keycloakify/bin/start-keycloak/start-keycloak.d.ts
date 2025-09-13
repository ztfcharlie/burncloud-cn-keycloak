import type { BuildContext } from "../shared/buildContext";
export declare function command(params: {
    buildContext: BuildContext;
    cliCommandOptions: {
        port: number | undefined;
        keycloakVersion: string | undefined;
        realmJsonFilePath: string | undefined;
    };
}): Promise<void>;
