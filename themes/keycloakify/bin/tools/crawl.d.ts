/** List all files in a given directory return paths relative to the dir_path */
export declare function crawl(params: {
    dirPath: string;
    returnedPathsType: "absolute" | "relative to dirPath";
}): string[];
