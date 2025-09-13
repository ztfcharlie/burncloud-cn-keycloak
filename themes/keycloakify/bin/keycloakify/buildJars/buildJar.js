import { assert } from "tsafe/assert";
import { join as pathJoin, dirname as pathDirname } from "path";
import { transformCodebase } from "../../tools/transformCodebase";
import * as fs from "fs/promises";
import { generatePom } from "./generatePom";
import { readFileSync } from "fs";
import { isInside } from "../../tools/isInside";
import child_process from "child_process";
import { rmSync } from "../../tools/fs.rmSync";
import { existsAsync } from "../../tools/fs.existsAsync";
assert();
export async function buildJar(params) {
    const { jarFileBasename, keycloakAccountV1Version, keycloakThemeAdditionalInfoExtensionVersion, resourcesDirPath, doesImplementAccountV1Theme, buildContext } = params;
    const keycloakifyBuildCacheDirPath = pathJoin(buildContext.cacheDirPath, "maven", jarFileBasename.replace(".jar", ""));
    const tmpResourcesDirPath = pathJoin(keycloakifyBuildCacheDirPath, "src", "main", "resources");
    rmSync(tmpResourcesDirPath, { recursive: true, force: true });
    transformCodebase({
        srcDirPath: resourcesDirPath,
        destDirPath: tmpResourcesDirPath,
        transformSourceCode: !doesImplementAccountV1Theme || keycloakAccountV1Version !== null
            ? undefined
            : (params) => {
                const { fileRelativePath, sourceCode } = params;
                if (isInside({
                    dirPath: pathJoin("theme", "account-v1"),
                    filePath: fileRelativePath
                })) {
                    return undefined;
                }
                for (const themeName of buildContext.themeNames) {
                    if (fileRelativePath ===
                        pathJoin("theme", themeName, "account", "theme.properties")) {
                        const modifiedSourceCode = Buffer.from(sourceCode
                            .toString("utf8")
                            .replace(`parent=account-v1`, "parent=keycloak"), "utf8");
                        assert(Buffer.compare(modifiedSourceCode, sourceCode) !== 0);
                        return { modifiedSourceCode };
                    }
                }
                return { modifiedSourceCode: sourceCode };
            }
    });
    {
        const filePath = pathJoin(tmpResourcesDirPath, "META-INF", "keycloak-themes.json");
        await fs.mkdir(pathDirname(filePath));
        await fs.writeFile(filePath, Buffer.from(JSON.stringify({
            themes: await (async () => {
                const dirPath = pathJoin(tmpResourcesDirPath, "theme");
                const themeNames = (await fs.readdir(dirPath)).sort((a, b) => {
                    const indexA = buildContext.themeNames.indexOf(a);
                    const indexB = buildContext.themeNames.indexOf(b);
                    const orderA = indexA === -1 ? Infinity : indexA;
                    const orderB = indexB === -1 ? Infinity : indexB;
                    return orderA - orderB;
                });
                return Promise.all(themeNames.map(async (themeName) => {
                    const types = await fs.readdir(pathJoin(dirPath, themeName));
                    return {
                        name: themeName,
                        types
                    };
                }));
            })()
        }, null, 2), "utf8"));
    }
    route_legacy_pages: {
        if (!buildContext.implementedThemeTypes.login.isImplemented) {
            break route_legacy_pages;
        }
        await Promise.all(["register.ftl", "login-update-profile.ftl"]
            .map(pageId => buildContext.themeNames.map(async (themeName) => {
            const ftlFilePath = pathJoin(tmpResourcesDirPath, "theme", themeName, "login", pageId);
            // NOTE: https://github.com/keycloakify/keycloakify/issues/665
            if (!(await existsAsync(ftlFilePath))) {
                return;
            }
            const ftlFileContent = readFileSync(ftlFilePath).toString("utf8");
            const ftlFileBasename = (() => {
                switch (pageId) {
                    case "register.ftl":
                        return "register-user-profile.ftl";
                    case "login-update-profile.ftl":
                        return "update-user-profile.ftl";
                }
                assert(false);
            })();
            const modifiedFtlFileContent = ftlFileContent.replace(`"ftlTemplateFileName": "${pageId}"`, `"ftlTemplateFileName": "${ftlFileBasename}"`);
            assert(modifiedFtlFileContent !== ftlFileContent);
            await fs.writeFile(pathJoin(pathDirname(ftlFilePath), ftlFileBasename), Buffer.from(modifiedFtlFileContent, "utf8"));
        }))
            .flat());
    }
    {
        const { pomFileCode } = generatePom({
            buildContext,
            keycloakAccountV1Version,
            keycloakThemeAdditionalInfoExtensionVersion
        });
        await fs.writeFile(pathJoin(keycloakifyBuildCacheDirPath, "pom.xml"), Buffer.from(pomFileCode, "utf8"));
    }
    {
        const mvnBuildCmd = `mvn clean install -Dmaven.repo.local="${pathJoin(keycloakifyBuildCacheDirPath, ".m2")}"`;
        await new Promise((resolve, reject) => child_process.exec(mvnBuildCmd, { cwd: keycloakifyBuildCacheDirPath }, error => {
            if (error !== null) {
                console.error([
                    `Build jar failed: ${JSON.stringify({
                        jarFileBasename,
                        keycloakAccountV1Version,
                        keycloakThemeAdditionalInfoExtensionVersion
                    }, null, 2)}`,
                    "Try running the following command to debug the issue (you are probably under a restricted network and you need to configure your proxy):",
                    `cd ${keycloakifyBuildCacheDirPath} && ${mvnBuildCmd}`
                ].join("\n"));
                reject(error);
                return;
            }
            resolve();
        }));
    }
    await fs.rename(pathJoin(keycloakifyBuildCacheDirPath, "target", `${buildContext.artifactId}-${buildContext.themeVersion}.jar`), pathJoin(buildContext.keycloakifyBuildDirPath, jarFileBasename));
}
//# sourceMappingURL=buildJar.js.map