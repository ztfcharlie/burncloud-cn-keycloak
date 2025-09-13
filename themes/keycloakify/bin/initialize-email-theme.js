import cliSelect from "cli-select";
import { maybeDelegateCommandToCustomHandler } from "./shared/customHandler_delegate";
import { exitIfUncommittedChanges } from "./shared/exitIfUncommittedChanges";
import { dirname as pathDirname, join as pathJoin, relative as pathRelative } from "path";
import * as fs from "fs";
import { assert, is } from "tsafe/assert";
import { id } from "tsafe/id";
import { addSyncExtensionsToPostinstallScript } from "./shared/addSyncExtensionsToPostinstallScript";
import { getIsPrettierAvailable, runPrettier } from "./tools/runPrettier";
import { npmInstall } from "./tools/npmInstall";
import * as child_process from "child_process";
import { z } from "zod";
import chalk from "chalk";
export async function command(params) {
    var _a;
    const { buildContext } = params;
    const { hasBeenHandled } = await maybeDelegateCommandToCustomHandler({
        commandName: "initialize-email-theme",
        buildContext
    });
    if (hasBeenHandled) {
        return;
    }
    exitIfUncommittedChanges({
        projectDirPath: buildContext.projectDirPath
    });
    const emailThemeSrcDirPath = pathJoin(buildContext.themeSrcDirPath, "email");
    if (fs.existsSync(emailThemeSrcDirPath) &&
        fs.readdirSync(emailThemeSrcDirPath).length > 0) {
        console.warn(chalk.red(`There is already a ${pathRelative(process.cwd(), emailThemeSrcDirPath)} directory in your project. Aborting.`));
        process.exit(-1);
    }
    const { value: emailThemeType } = await cliSelect({
        values: [
            "native (FreeMarker)",
            "Another email templating solution"
        ]
    }).catch(() => {
        process.exit(-1);
    });
    if (emailThemeType === "Another email templating solution") {
        console.log([
            "There is currently no automated support for keycloakify-email, it has to be done manually, see documentation:",
            "https://docs.keycloakify.dev/theme-types/email-theme"
        ].join("\n"));
        process.exit(0);
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
    const moduleName = `@keycloakify/email-native`;
    const [version] = (() => {
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
        .filter(version => !version.includes("-"));
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
    console.log(chalk.green("Email theme initialized."));
}
//# sourceMappingURL=initialize-email-theme.js.map