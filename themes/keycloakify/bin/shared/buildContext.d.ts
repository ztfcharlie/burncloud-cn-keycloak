import type { KeycloakVersionRange } from "./KeycloakVersionRange";
import { type FetchOptionsLike } from "../tools/fetchProxyOptions";
export type BuildContext = {
    themeVersion: string;
    themeNames: [string, ...string[]];
    extraThemeProperties: string[] | undefined;
    groupId: string;
    artifactId: string;
    projectDirPath: string;
    projectBuildDirPath: string;
    /** Directory that keycloakify outputs to. Defaults to {cwd}/build_keycloak */
    keycloakifyBuildDirPath: string;
    publicDirPath: string;
    cacheDirPath: string;
    /** If your app is hosted under a subpath, it's the case in CRA if you have "homepage": "https://example.com/my-app" in your package.json
     * In this case the urlPathname will be "/my-app/" */
    urlPathname: string | undefined;
    assetsDirPath: string;
    fetchOptions: FetchOptionsLike;
    kcContextExclusionsFtlCode: string | undefined;
    environmentVariables: {
        name: string;
        default: string;
    }[];
    themeSrcDirPath: string;
    implementedThemeTypes: {
        login: {
            isImplemented: true;
        } | {
            isImplemented: false;
            isImplemented_native: boolean;
        };
        email: {
            isImplemented: false;
            isImplemented_native: boolean;
        };
        account: {
            isImplemented: false;
            isImplemented_native: boolean;
        } | {
            isImplemented: true;
            type: "Single-Page" | "Multi-Page";
        };
        admin: {
            isImplemented: true;
        } | {
            isImplemented: false;
            isImplemented_native: boolean;
        };
    };
    packageJsonFilePath: string;
    bundler: "vite" | "webpack";
    jarTargets: {
        keycloakVersionRange: KeycloakVersionRange;
        jarFileBasename: string;
    }[];
    startKeycloakOptions: {
        dockerImage: {
            reference: string;
            tag: string;
        } | undefined;
        dockerExtraArgs: string[];
        keycloakExtraArgs: string[];
        extensionJars: ({
            type: "path";
            path: string;
        } | {
            type: "url";
            url: string;
        })[];
        realmJsonFilePath: string | undefined;
        port: number | undefined;
    };
};
export type BuildOptions = {
    themeName?: string | string[];
    themeVersion?: string;
    environmentVariables?: {
        name: string;
        default: string;
    }[];
    extraThemeProperties?: string[];
    artifactId?: string;
    groupId?: string;
    keycloakifyBuildDirPath?: string;
    kcContextExclusionsFtl?: string;
    startKeycloakOptions?: {
        dockerImage?: string;
        dockerExtraArgs?: string[];
        keycloakExtraArgs?: string[];
        extensionJars?: string[];
        realmJsonFilePath?: string;
        port?: number;
    };
} & BuildOptions.AccountThemeImplAndKeycloakVersionTargets;
export declare namespace BuildOptions {
    type AccountThemeImplAndKeycloakVersionTargets = AccountThemeImplAndKeycloakVersionTargets.MultiPageApp | AccountThemeImplAndKeycloakVersionTargets.SinglePageAppOrNone;
    namespace AccountThemeImplAndKeycloakVersionTargets {
        type MultiPageApp = {
            accountThemeImplementation: "Multi-Page";
            keycloakVersionTargets?: Record<KeycloakVersionRange.WithAccountV1Theme, string | boolean>;
        };
        type SinglePageAppOrNone = {
            accountThemeImplementation: "Single-Page" | "none";
            keycloakVersionTargets?: Record<KeycloakVersionRange.WithoutAccountV1Theme, string | boolean>;
        };
    }
}
export type ResolvedViteConfig = {
    buildDir: string;
    publicDir: string;
    assetsDir: string;
    urlPathname: string | undefined;
    buildOptions: BuildOptions;
};
export declare function getBuildContext(params: {
    projectDirPath: string | undefined;
}): BuildContext;
