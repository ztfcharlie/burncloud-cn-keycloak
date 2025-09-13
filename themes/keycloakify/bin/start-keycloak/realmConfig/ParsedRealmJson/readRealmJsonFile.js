import { assert } from "tsafe/assert";
import { is } from "tsafe/is";
import * as fs from "fs";
import { zParsedRealmJson } from "./ParsedRealmJson";
export function readRealmJsonFile(params) {
    const { realmJsonFilePath } = params;
    const parsedRealmJson = JSON.parse(fs.readFileSync(realmJsonFilePath).toString("utf8"));
    zParsedRealmJson.parse(parsedRealmJson);
    assert(is(parsedRealmJson));
    return parsedRealmJson;
}
//# sourceMappingURL=readRealmJsonFile.js.map