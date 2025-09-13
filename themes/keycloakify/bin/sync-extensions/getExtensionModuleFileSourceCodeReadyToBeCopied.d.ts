/// <reference types="node" />
export type BuildContextLike = {
    themeSrcDirPath: string;
    publicDirPath: string;
};
export declare function getExtensionModuleFileSourceCodeReadyToBeCopied(params: {
    buildContext: BuildContextLike;
    isPublic: boolean;
    fileRelativePath: string;
    isOwnershipAction: boolean;
    extensionModuleDirPath: string;
    extensionModuleName: string;
    extensionModuleVersion: string;
}): Promise<Buffer>;
