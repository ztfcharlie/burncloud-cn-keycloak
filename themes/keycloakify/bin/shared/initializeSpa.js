import { dirname as pathDirname, join as pathJoin, relative as pathRelative } from "path";
import * as fs from "fs";
import * as fsPr from "fs/promises";
import { assert, is } from "tsafe/assert";
import { id } from "tsafe/id";
import { addSyncExtensionsToPostinstallScript } from "./addSyncExtensionsToPostinstallScript";
import { getIsPrettierAvailable, runPrettier } from "../tools/runPrettier";
import { npmInstall } from "../tools/npmInstall";
import * as child_process from "child_process";
import { z } from "zod";
import chalk from "chalk";
import { existsAsync } from "../tools/fs.existsAsync";
assert();
export async function initializeSpa(params) {
    var _a;
    const { themeType, buildContext } = params;
    {
        const themeTypeSrcDirPath = pathJoin(buildContext.themeSrcDirPath, themeType);
        if (fs.existsSync(themeTypeSrcDirPath) &&
            fs.readdirSync(themeTypeSrcDirPath).length > 0) {
            console.warn(chalk.red(`There is already a ${pathRelative(process.cwd(), themeTypeSrcDirPath)} directory in your project. Aborting.`));
            process.exit(-1);
        }
    }
    const parsedPackageJson = (() => {
        const zParsedPackageJson = (() => {
            const zTargetType = z.object({
                scripts: z.record(z.union([z.string(), z.undefined()])).optional(),
                dependencies: z.record(z.union([z.string(), z.undefined()])).optional(),
                devDependencies: z.record(z.union([z.string(), z.undefined()])).optional()
            });
            assert;
            return id(zTargetType);
        })();
        const parsedPackageJson = JSON.parse(fs.readFileSync(buildContext.packageJsonFilePath).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        assert(is(parsedPackageJson));
        return parsedPackageJson;
    })();
    addSyncExtensionsToPostinstallScript({
        parsedPackageJson,
        buildContext
    });
    await disableVerbatimModuleSyntax({
        projectDirPath: buildContext.projectDirPath
    });
    const uiSharedMajor = (() => {
        const dependencies = Object.assign(Object.assign({}, parsedPackageJson.devDependencies), parsedPackageJson.dependencies);
        const version = dependencies["@keycloakify/keycloak-ui-shared"];
        if (version === undefined) {
            return undefined;
        }
        const match = version.match(/^[^~]?(\d+)\./);
        if (match === null) {
            return undefined;
        }
        return match[1];
    })();
    const moduleName = `@keycloakify/keycloak-${themeType}-ui`;
    const version = (() => {
        const cmdOutput = child_process
            .execSync(`npm show ${moduleName} versions --json`)
            .toString("utf8")
            .trim();
        const versions = JSON.parse(cmdOutput);
        // NOTE: Bug in some older npm versions
        if (typeof versions === "string") {
            return [versions];
        }
        return versions;
    })()
        .reverse()
        .filter(version => !version.includes("-"))
        .find(version => uiSharedMajor === undefined ? true : version.startsWith(`${uiSharedMajor}.`));
    assert(version !== undefined);
    ((_a = parsedPackageJson.dependencies) !== null && _a !== void 0 ? _a : (parsedPackageJson.dependencies = {}))[moduleName] = `~${version}`;
    if (parsedPackageJson.devDependencies !== undefined) {
        delete parsedPackageJson.devDependencies[moduleName];
    }
    {
        let sourceCode = JSON.stringify(parsedPackageJson, undefined, 2);
        if (await getIsPrettierAvailable()) {
            sourceCode = await runPrettier({
                sourceCode,
                filePath: buildContext.packageJsonFilePath
            });
        }
        fs.writeFileSync(buildContext.packageJsonFilePath, Buffer.from(sourceCode, "utf8"));
    }
    await npmInstall({
        packageJsonDirPath: pathDirname(buildContext.packageJsonFilePath)
    });
}
async function disableVerbatimModuleSyntax(params) {
    const { projectDirPath } = params;
    const filePath = pathJoin(projectDirPath, "tsconfig.app.json");
    if (!(await existsAsync(filePath))) {
        return;
    }
    let content = (await fsPr.readFile(filePath)).toString("utf8");
    const regExp = /"verbatimModuleSyntax"\s*:\s*true\s*(,?)/m;
    if (!regExp.test(content)) {
        return;
    }
    content = content.replace(regExp, `"verbatimModuleSyntax": false$1`);
    await fsPr.writeFile(filePath, Buffer.from(content, "utf8"));
}
//# sourceMappingURL=initializeSpa.js.map