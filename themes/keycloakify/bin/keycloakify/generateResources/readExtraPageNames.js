import { crawl } from "../../tools/crawl";
import { id } from "tsafe/id";
import { removeDuplicates } from "evt/tools/reducers/removeDuplicates";
import * as fs from "fs";
import { join as pathJoin } from "path";
import { ACCOUNT_THEME_PAGE_IDS, LOGIN_THEME_PAGE_IDS } from "../../shared/constants";
export function readExtraPagesNames(params) {
    const { themeSrcDirPath, themeType } = params;
    const filePaths = crawl({
        dirPath: pathJoin(themeSrcDirPath, themeType),
        returnedPathsType: "absolute"
    }).filter(filePath => /\.(ts|tsx|js|jsx)$/.test(filePath));
    const candidateFilePaths = filePaths.filter(filePath => /[kK]cContext\.[^.]+$/.test(filePath));
    if (candidateFilePaths.length === 0) {
        candidateFilePaths.push(...filePaths);
    }
    const extraPages = [];
    for (const candidateFilPath of candidateFilePaths) {
        const rawSourceFile = fs.readFileSync(candidateFilPath).toString("utf8");
        extraPages.push(...Array.from(rawSourceFile.matchAll(/["']([^.\s]+.ftl)["']:/g), m => m[1]));
    }
    return extraPages.reduce(...removeDuplicates()).filter(pageId => {
        switch (themeType) {
            case "account":
                return !id(ACCOUNT_THEME_PAGE_IDS).includes(pageId);
            case "login":
                return !id(LOGIN_THEME_PAGE_IDS).includes(pageId);
        }
    });
}
//# sourceMappingURL=readExtraPageNames.js.map