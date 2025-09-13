import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";
const crawlRec = (dirPath, filePaths) => {
    for (const basename of fs.readdirSync(dirPath)) {
        const fileOrDirPath = pathJoin(dirPath, basename);
        if (fs.lstatSync(fileOrDirPath).isDirectory()) {
            crawlRec(fileOrDirPath, filePaths);
            continue;
        }
        filePaths.push(fileOrDirPath);
    }
};
/** List all files in a given directory return paths relative to the dir_path */
export function crawl(params) {
    const { dirPath, returnedPathsType } = params;
    const filePaths = [];
    crawlRec(dirPath, filePaths);
    switch (returnedPathsType) {
        case "absolute":
            return filePaths;
        case "relative to dirPath":
            return filePaths.map(filePath => pathRelative(dirPath, filePath));
    }
}
//# sourceMappingURL=crawl.js.map