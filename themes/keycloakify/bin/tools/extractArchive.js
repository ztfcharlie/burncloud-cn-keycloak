import fs from "fs/promises";
import fsSync from "fs";
import yauzl from "yauzl";
import stream from "stream";
import { Deferred } from "evt/tools/Deferred";
import { dirname as pathDirname, sep as pathSep } from "path";
import { existsAsync } from "./fs.existsAsync";
export async function extractArchive(params) {
    const { archiveFilePath, onArchiveFile } = params;
    const zipFile = await new Promise((resolve, reject) => {
        yauzl.open(archiveFilePath, { lazyEntries: true }, async (error, zipFile) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(zipFile);
        });
    });
    const dDone = new Deferred();
    zipFile.once("end", () => {
        zipFile.close();
        dDone.resolve();
    });
    const writeFile = async (entry, params) => {
        const { filePath, modifiedData } = params;
        {
            const dirPath = pathDirname(filePath);
            if (!(await existsAsync(dirPath))) {
                await fs.mkdir(dirPath, { recursive: true });
            }
        }
        if (modifiedData !== undefined) {
            await fs.writeFile(filePath, modifiedData);
            return;
        }
        const readStream = await new Promise(resolve => zipFile.openReadStream(entry, async (error, readStream) => {
            if (error) {
                dDone.reject(error);
                return;
            }
            resolve(readStream);
        }));
        const dDoneWithFile = new Deferred();
        stream.pipeline(readStream, fsSync.createWriteStream(filePath), error => {
            if (error) {
                dDone.reject(error);
                return;
            }
            dDoneWithFile.resolve();
        });
        await dDoneWithFile.pr;
    };
    const readFile = (entry) => new Promise(resolve => zipFile.openReadStream(entry, async (error, readStream) => {
        if (error) {
            dDone.reject(error);
            return;
        }
        const chunks = [];
        readStream.on("data", chunk => {
            chunks.push(chunk);
        });
        readStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readStream.on("error", error => {
            dDone.reject(error);
        });
    }));
    zipFile.on("entry", async (entry) => {
        handle_file: {
            // NOTE: Skip directories
            if (entry.fileName.endsWith("/")) {
                break handle_file;
            }
            let hasEarlyExitBeenCalled = false;
            await onArchiveFile({
                relativeFilePathInArchive: entry.fileName.split("/").join(pathSep),
                readFile: () => readFile(entry),
                writeFile: params => writeFile(entry, params),
                earlyExit: () => {
                    hasEarlyExitBeenCalled = true;
                }
            });
            if (hasEarlyExitBeenCalled) {
                zipFile.close();
                dDone.resolve();
                return;
            }
        }
        zipFile.readEntry();
    });
    zipFile.readEntry();
    await dDone.pr;
}
//# sourceMappingURL=extractArchive.js.map