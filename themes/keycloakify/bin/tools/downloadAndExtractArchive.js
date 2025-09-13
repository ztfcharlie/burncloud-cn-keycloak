import fetch from "make-fetch-happen";
import { mkdir, unlink, writeFile, readdir, readFile } from "fs/promises";
import { dirname as pathDirname, join as pathJoin } from "path";
import { assert } from "tsafe/assert";
import { extractArchive } from "./extractArchive";
import { existsAsync } from "./fs.existsAsync";
import * as crypto from "crypto";
import { rm } from "./fs.rm";
export async function downloadAndExtractArchive(params) {
    var _a;
    const { url, uniqueIdOfOnArchiveFile, onArchiveFile, cacheDirPath, fetchOptions } = params;
    const archiveFileBasename = url.split("?")[0].split("/").reverse()[0];
    const archiveFilePath = pathJoin(cacheDirPath, archiveFileBasename);
    download: {
        await mkdir(pathDirname(archiveFilePath), { recursive: true });
        if (await existsAsync(archiveFilePath)) {
            const isDownloaded = await SuccessTracker.getIsDownloaded({
                cacheDirPath,
                archiveFileBasename
            });
            if (isDownloaded) {
                break download;
            }
            await unlink(archiveFilePath);
            await SuccessTracker.removeFromDownloaded({
                cacheDirPath,
                archiveFileBasename
            });
        }
        const response = await fetch(url, fetchOptions);
        (_a = response.body) === null || _a === void 0 ? void 0 : _a.setMaxListeners(Number.MAX_VALUE);
        assert(typeof response.body !== "undefined" && response.body != null);
        await writeFile(archiveFilePath, response.body);
        await SuccessTracker.markAsDownloaded({
            cacheDirPath,
            archiveFileBasename
        });
    }
    const extractDirBasename = `${archiveFileBasename.replace(/\.([^.]+)$/, (...[, ext]) => `_${ext}`)}_${uniqueIdOfOnArchiveFile}_${crypto
        .createHash("sha256")
        .update(onArchiveFile.toString())
        .digest("hex")
        .substring(0, 5)}`;
    await Promise.all((await readdir(cacheDirPath))
        .filter((() => {
        const prefix = extractDirBasename
            .split("_")
            .reverse()
            .slice(1)
            .reverse()
            .join("_");
        return basename => basename !== extractDirBasename && basename.startsWith(prefix);
    })())
        .map(async (extractDirBasename) => {
        await rm(pathJoin(cacheDirPath, extractDirBasename), {
            recursive: true
        });
        await SuccessTracker.removeFromExtracted({
            cacheDirPath,
            extractDirBasename
        });
    }));
    const extractedDirPath = pathJoin(cacheDirPath, extractDirBasename);
    extract_and_transform: {
        if (await existsAsync(extractedDirPath)) {
            const isExtracted = await SuccessTracker.getIsExtracted({
                cacheDirPath,
                extractDirBasename
            });
            if (isExtracted) {
                break extract_and_transform;
            }
            await rm(extractedDirPath, { recursive: true });
            await SuccessTracker.removeFromExtracted({
                cacheDirPath,
                extractDirBasename
            });
        }
        await extractArchive({
            archiveFilePath,
            onArchiveFile: async ({ relativeFilePathInArchive, readFile, writeFile }) => onArchiveFile({
                fileRelativePath: relativeFilePathInArchive,
                readFile,
                writeFile: ({ fileRelativePath, modifiedData }) => writeFile({
                    filePath: pathJoin(extractedDirPath, fileRelativePath),
                    modifiedData
                })
            })
        });
        await SuccessTracker.markAsExtracted({
            cacheDirPath,
            extractDirBasename
        });
    }
    return { extractedDirPath, archiveFilePath };
}
var SuccessTracker;
(function (SuccessTracker) {
    async function read(params) {
        const { cacheDirPath } = params;
        const filePath = pathJoin(cacheDirPath, "downloadAndExtractArchive.json");
        if (!(await existsAsync(filePath))) {
            return { archiveFileBasenames: [], extractDirBasenames: [] };
        }
        return JSON.parse((await readFile(filePath)).toString("utf8"));
    }
    async function write(params) {
        const { cacheDirPath, successTracker } = params;
        const filePath = pathJoin(cacheDirPath, "downloadAndExtractArchive.json");
        {
            const dirPath = pathDirname(filePath);
            if (!(await existsAsync(dirPath))) {
                await mkdir(dirPath, { recursive: true });
            }
        }
        await writeFile(filePath, JSON.stringify(successTracker));
    }
    async function markAsDownloaded(params) {
        const { cacheDirPath, archiveFileBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.archiveFileBasenames.push(archiveFileBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.markAsDownloaded = markAsDownloaded;
    async function getIsDownloaded(params) {
        const { cacheDirPath, archiveFileBasename } = params;
        const successTracker = await read({ cacheDirPath });
        return successTracker.archiveFileBasenames.includes(archiveFileBasename);
    }
    SuccessTracker.getIsDownloaded = getIsDownloaded;
    async function removeFromDownloaded(params) {
        const { cacheDirPath, archiveFileBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.archiveFileBasenames = successTracker.archiveFileBasenames.filter(basename => basename !== archiveFileBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.removeFromDownloaded = removeFromDownloaded;
    async function markAsExtracted(params) {
        const { cacheDirPath, extractDirBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.extractDirBasenames.push(extractDirBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.markAsExtracted = markAsExtracted;
    async function getIsExtracted(params) {
        const { cacheDirPath, extractDirBasename } = params;
        const successTracker = await read({ cacheDirPath });
        return successTracker.extractDirBasenames.includes(extractDirBasename);
    }
    SuccessTracker.getIsExtracted = getIsExtracted;
    async function removeFromExtracted(params) {
        const { cacheDirPath, extractDirBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.extractDirBasenames = successTracker.extractDirBasenames.filter(basename => basename !== extractDirBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.removeFromExtracted = removeFromExtracted;
})(SuccessTracker || (SuccessTracker = {}));
//# sourceMappingURL=downloadAndExtractArchive.js.map