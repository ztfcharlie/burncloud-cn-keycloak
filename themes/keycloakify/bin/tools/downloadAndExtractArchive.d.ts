/// <reference types="node" />
import { type FetchOptions } from "make-fetch-happen";
export declare function downloadAndExtractArchive(params: {
    url: string;
    uniqueIdOfOnArchiveFile: string;
    onArchiveFile: (params: {
        fileRelativePath: string;
        readFile: () => Promise<Buffer>;
        writeFile: (params: {
            fileRelativePath: string;
            modifiedData?: Buffer;
        }) => Promise<void>;
    }) => Promise<void>;
    cacheDirPath: string;
    fetchOptions: FetchOptions | undefined;
}): Promise<{
    extractedDirPath: string;
    archiveFilePath: string;
}>;
