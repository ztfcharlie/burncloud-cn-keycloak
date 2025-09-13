export type BuildContextLike = {
    themeSrcDirPath: string;
    publicDirPath: string;
};
type ExtensionModuleMetaLike = {
    moduleName: string;
    version: string;
    files: {
        isPublic: boolean;
        fileRelativePath: string;
    }[];
};
export declare function writeManagedGitignoreFiles(params: {
    buildContext: BuildContextLike;
    extensionModuleMetas: ExtensionModuleMetaLike[];
    ownedFilesRelativePaths: {
        isPublic: boolean;
        fileRelativePath: string;
    }[];
}): Promise<void>;
export declare function readManagedGitignoresFile(params: {
    buildContext: BuildContextLike;
}): Promise<{
    ownedFilesRelativePaths: {
        isPublic: boolean;
        fileRelativePath: string;
    }[];
}>;
export {};
