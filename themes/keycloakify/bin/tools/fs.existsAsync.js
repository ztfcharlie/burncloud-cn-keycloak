import * as fs from "fs/promises";
export async function existsAsync(path) {
    try {
        await fs.stat(path);
        return true;
    }
    catch (error) {
        if (error.code === "ENOENT")
            return false;
        throw error;
    }
}
//# sourceMappingURL=fs.existsAsync.js.map