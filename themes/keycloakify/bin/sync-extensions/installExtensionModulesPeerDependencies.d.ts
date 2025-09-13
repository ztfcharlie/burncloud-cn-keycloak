export type BuildContextLike = {
    packageJsonFilePath: string;
};
export type ExtensionModuleMetaLike = {
    moduleName: string;
    peerDependencies: Record<string, string>;
};
export declare function installExtensionModulesPeerDependencies(params: {
    buildContext: BuildContextLike;
    extensionModuleMetas: ExtensionModuleMetaLike[];
}): Promise<void | never>;
