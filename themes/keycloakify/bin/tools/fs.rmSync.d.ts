/**
 * Polyfill of fs.rmSync(dirPath, { "recursive": true })
 * For older version of Node
 */
export declare function rmSync(dirPath: string, options: {
    recursive: true;
    force?: true;
}): void;
