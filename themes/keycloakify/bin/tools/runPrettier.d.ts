/// <reference types="node" />
export declare function getIsPrettierAvailable(): Promise<boolean>;
export declare namespace getIsPrettierAvailable {
    var cache: boolean | undefined;
}
type PrettierAndConfigHash = {
    prettier: typeof import("prettier");
    configHash: string;
};
export declare function getPrettier(): Promise<PrettierAndConfigHash>;
export declare namespace getPrettier {
    var cache: PrettierAndConfigHash | undefined;
}
export declare function runPrettier(params: {
    sourceCode: string;
    filePath: string;
}): Promise<string>;
export declare function runPrettier(params: {
    sourceCode: Buffer;
    filePath: string;
}): Promise<Buffer>;
export {};
