/**
 * Polyfill of fs.rm(dirPath, { "recursive": true })
 * For older version of Node
 */
export declare function rm(dirPath: string, options: {
    recursive: true;
    force?: true;
}): Promise<void>;
