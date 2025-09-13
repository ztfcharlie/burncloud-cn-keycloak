import type { BuildContext } from "./shared/buildContext";
export declare function command(params: {
    buildContext: BuildContext;
    cliCommandOptions: {
        path: string;
        isRevert: boolean;
        isPublic: boolean;
    };
}): Promise<void>;
