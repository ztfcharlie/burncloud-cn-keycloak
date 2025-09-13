import { type BuildContext, type BuildOptions } from "../bin/shared/buildContext";
export declare namespace keycloakify {
    type Params = BuildOptions & {
        postBuild?: (buildContext: Omit<BuildContext, "bundler">) => Promise<void>;
    };
}
export declare function keycloakify(params: keycloakify.Params): any;
