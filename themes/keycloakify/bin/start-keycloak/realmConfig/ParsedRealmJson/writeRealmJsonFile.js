import * as fsPr from "fs/promises";
import { getIsPrettierAvailable, runPrettier } from "../../../tools/runPrettier";
import { canonicalStringify } from "../../../tools/canonicalStringify";
import { getDefaultConfig } from "../defaultConfig";
export async function writeRealmJsonFile(params) {
    const { realmJsonFilePath, parsedRealmJson, keycloakMajorVersionNumber } = params;
    let sourceCode = canonicalStringify({
        data: parsedRealmJson,
        referenceData: getDefaultConfig({
            keycloakMajorVersionNumber
        })
    });
    if (await getIsPrettierAvailable()) {
        sourceCode = await runPrettier({
            sourceCode: sourceCode,
            filePath: realmJsonFilePath
        });
    }
    await fsPr.writeFile(realmJsonFilePath, Buffer.from(sourceCode, "utf8"));
}
//# sourceMappingURL=writeRealmJsonFile.js.map