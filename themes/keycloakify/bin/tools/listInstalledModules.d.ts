export declare function listInstalledModules(params: {
    packageJsonFilePath: string;
    filter: (params: {
        moduleName: string;
    }) => boolean;
}): Promise<{
    moduleName: string;
    version: string;
    dirPath: string;
    peerDependencies: Record<string, string>;
}[]>;
export declare const readPackageJsonDependencies: (params: {
    packageJsonFilePath: string;
}) => Promise<{
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
}>;
