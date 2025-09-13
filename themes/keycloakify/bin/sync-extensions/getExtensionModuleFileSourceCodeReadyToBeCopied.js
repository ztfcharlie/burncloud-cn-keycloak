import { getIsPrettierAvailable, runPrettier } from "../tools/runPrettier";
import * as fsPr from "fs/promises";
import { join as pathJoin, sep as pathSep } from "path";
import { assert } from "tsafe/assert";
import { KEYCLOAK_THEME } from "../shared/constants";
assert();
export async function getExtensionModuleFileSourceCodeReadyToBeCopied(params) {
    const { buildContext, extensionModuleDirPath, isPublic, fileRelativePath, isOwnershipAction, extensionModuleName, extensionModuleVersion } = params;
    const { refSourceCode } = await (async () => {
        let sourceCode = undefined;
        const sourceCode_originalBuffer = await fsPr.readFile(pathJoin(extensionModuleDirPath, KEYCLOAK_THEME, isPublic ? "public" : ".", fileRelativePath));
        let hasBeenUpdated = false;
        const refSourceCode = {
            get current() {
                if (sourceCode === undefined) {
                    sourceCode = sourceCode_originalBuffer.toString("utf8");
                }
                return sourceCode;
            },
            set current(value) {
                hasBeenUpdated = true;
                sourceCode = value;
            },
            getAsBuffer: () => {
                if (!hasBeenUpdated) {
                    return sourceCode_originalBuffer;
                }
                return Buffer.from(refSourceCode.current, "utf8");
            }
        };
        return { refSourceCode };
    })();
    add_eslint_disable: {
        if (isOwnershipAction) {
            break add_eslint_disable;
        }
        if (!fileRelativePath.endsWith(".ts") && !fileRelativePath.endsWith(".tsx")) {
            break add_eslint_disable;
        }
        if (refSourceCode.current.includes("/* eslint-disable */")) {
            break add_eslint_disable;
        }
        refSourceCode.current = ["/* eslint-disable */", "", refSourceCode.current].join("\n");
    }
    addCommentToSourceCode({
        refSourceCode,
        fileRelativePath,
        commentLines: (() => {
            const path = fileRelativePath.split(pathSep).join("/");
            return isOwnershipAction
                ? [
                    `This file has been claimed for ownership from ${extensionModuleName} version ${extensionModuleVersion}.`,
                    `To relinquish ownership and restore this file to its original content, run the following command:`,
                    ``,
                    `$ npx keycloakify own --path "${path}" ${isPublic ? "--public " : ""}--revert`
                ]
                : [
                    `WARNING: Before modifying this file, run the following command:`,
                    ``,
                    `$ npx keycloakify own --path "${path}"${isPublic ? " --public" : ""}`,
                    ``,
                    `This file is provided by ${extensionModuleName} version ${extensionModuleVersion}.`,
                    `It was copied into your repository by the postinstall script: \`keycloakify sync-extensions\`.`
                ];
        })()
    });
    format: {
        if (!(await getIsPrettierAvailable())) {
            break format;
        }
        const sourceCode_buffer_before = refSourceCode.getAsBuffer();
        const sourceCode_buffer_after = await runPrettier({
            filePath: pathJoin(isPublic
                ? pathJoin(buildContext.publicDirPath, KEYCLOAK_THEME)
                : buildContext.themeSrcDirPath, fileRelativePath),
            sourceCode: sourceCode_buffer_before
        });
        if (sourceCode_buffer_before.compare(sourceCode_buffer_after) === 0) {
            break format;
        }
        refSourceCode.current = sourceCode_buffer_after.toString("utf8");
    }
    return refSourceCode.getAsBuffer();
}
function addCommentToSourceCode(params) {
    const { refSourceCode, fileRelativePath, commentLines } = params;
    const updateRef = (comment) => {
        refSourceCode.current = [comment, ``, refSourceCode.current].join("\n");
    };
    for (const ext of [".ts", ".tsx", ".css", ".less", ".sass", ".js", ".jsx"]) {
        if (!fileRelativePath.endsWith(ext)) {
            continue;
        }
        updateRef([`/**`, ...commentLines.map(line => ` * ${line}`), ` */`].join("\n"));
        return;
    }
    if (fileRelativePath.endsWith(".properties")) {
        updateRef(commentLines.map(line => `# ${line}`).join("\n"));
        return;
    }
    if (fileRelativePath.endsWith(".ftl")) {
        const comment = [`<#--`, ...commentLines.map(line => `  ${line}`), `-->`].join("\n");
        if (refSourceCode.current.trim().startsWith("<#ftl")) {
            const [first, ...rest] = refSourceCode.current.split(">");
            const last = rest.join(">");
            refSourceCode.current = [`${first}>`, comment, last].join("\n");
            return;
        }
        updateRef(comment);
        return;
    }
    if (fileRelativePath.endsWith(".html") || fileRelativePath.endsWith(".svg")) {
        const comment = [
            `<!--`,
            ...commentLines.map(line => ` ${line
                .replace("--path", "-t")
                .replace("--revert", "-r")
                .replace("Before modifying", "Before modifying or replacing")}`),
            `-->`
        ].join("\n");
        if (fileRelativePath.endsWith(".html") &&
            refSourceCode.current.trim().startsWith("<!")) {
            const [first, ...rest] = refSourceCode.current.split(">");
            const last = rest.join(">");
            refSourceCode.current = [`${first}>`, comment, last].join("\n");
            return;
        }
        if (fileRelativePath.endsWith(".svg") &&
            refSourceCode.current.trim().startsWith("<?")) {
            const [first, ...rest] = refSourceCode.current.split("?>");
            const last = rest.join("?>");
            refSourceCode.current = [`${first}?>`, comment, last].join("\n");
            return;
        }
        updateRef(comment);
        return;
    }
}
//# sourceMappingURL=getExtensionModuleFileSourceCodeReadyToBeCopied.js.map