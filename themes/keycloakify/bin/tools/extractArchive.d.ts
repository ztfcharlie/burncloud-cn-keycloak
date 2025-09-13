/// <reference types="node" />
export declare function extractArchive(params: {
    archiveFilePath: string;
    onArchiveFile: (params: {
        relativeFilePathInArchive: string;
        readFile: () => Promise<Buffer>;
        /** NOTE: Will create the directory if it does not exist */
        writeFile: (params: {
            filePath: string;
            modifiedData?: Buffer;
        }) => Promise<void>;
        earlyExit: () => void;
    }) => Promise<void>;
}): Promise<void>;
