/** List all files in a given directory return paths relative to the dir_path */
export declare function crawlAsync(params: {
    dirPath: string;
    returnedPathsType: "absolute" | "relative to dirPath";
    onFileFound: (filePath: string) => Promise<void>;
}): Promise<void>;
