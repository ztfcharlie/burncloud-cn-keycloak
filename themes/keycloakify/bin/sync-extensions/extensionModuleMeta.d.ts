/// <reference types="node" />
import { type BuildContextLike as BuildContextLike_getExtensionModuleFileSourceCodeReadyToBeCopied } from "./getExtensionModuleFileSourceCodeReadyToBeCopied";
export type ExtensionModuleMeta = {
    moduleName: string;
    version: string;
    files: {
        isPublic: boolean;
        fileRelativePath: string;
        hash: string;
        copyableFilePath: string;
    }[];
    peerDependencies: Record<string, string>;
};
export type BuildContextLike = BuildContextLike_getExtensionModuleFileSourceCodeReadyToBeCopied & {
    cacheDirPath: string;
    packageJsonFilePath: string;
    projectDirPath: string;
};
export declare function getExtensionModuleMetas(params: {
    buildContext: BuildContextLike;
}): Promise<ExtensionModuleMeta[]>;
export declare function computeHash(data: Buffer): string;
