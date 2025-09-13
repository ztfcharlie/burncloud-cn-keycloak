import * as fsPr from "fs/promises";
import { join as pathJoin, relative as pathRelative } from "path";
import { assert } from "tsafe/assert";
/** List all files in a given directory return paths relative to the dir_path */
export async function crawlAsync(params) {
    const { dirPath, returnedPathsType, onFileFound } = params;
    await crawlAsyncRec({
        dirPath,
        onFileFound: async ({ filePath }) => {
            switch (returnedPathsType) {
                case "absolute":
                    await onFileFound(filePath);
                    return;
                case "relative to dirPath":
                    await onFileFound(pathRelative(dirPath, filePath));
                    return;
            }
            assert();
        }
    });
}
async function crawlAsyncRec(params) {
    const { dirPath, onFileFound } = params;
    await Promise.all((await fsPr.readdir(dirPath)).map(async (basename) => {
        const fileOrDirPath = pathJoin(dirPath, basename);
        const isDirectory = await fsPr
            .lstat(fileOrDirPath)
            .then(stat => stat.isDirectory());
        if (isDirectory) {
            await crawlAsyncRec({ dirPath: fileOrDirPath, onFileFound });
            return;
        }
        await onFileFound({ filePath: fileOrDirPath });
    }));
}
//# sourceMappingURL=crawlAsync.js.map