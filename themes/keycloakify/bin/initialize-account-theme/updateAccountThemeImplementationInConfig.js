import { join as pathJoin } from "path";
import { assert, is } from "tsafe/assert";
import * as fs from "fs";
import chalk from "chalk";
import { z } from "zod";
import { id } from "tsafe/id";
assert();
export function updateAccountThemeImplementationInConfig(params) {
    const { buildContext, accountThemeType } = params;
    switch (buildContext.bundler) {
        case "vite":
            {
                const viteConfigPath = pathJoin(buildContext.projectDirPath, "vite.config.ts");
                if (!fs.existsSync(viteConfigPath)) {
                    console.log(chalk.bold(`You must manually set the accountThemeImplementation to "${accountThemeType}" in your vite config`));
                    break;
                }
                const viteConfigContent = fs
                    .readFileSync(viteConfigPath)
                    .toString("utf8");
                const modifiedViteConfigContent = viteConfigContent.replace(/accountThemeImplementation\s*:\s*"none"/, `accountThemeImplementation: "${accountThemeType}"`);
                if (modifiedViteConfigContent === viteConfigContent) {
                    console.log(chalk.bold(`You must manually set the accountThemeImplementation to "${accountThemeType}" in your vite.config.ts`));
                    break;
                }
                fs.writeFileSync(viteConfigPath, modifiedViteConfigContent);
            }
            break;
        case "webpack":
            {
                const parsedPackageJson = (() => {
                    const zParsedPackageJson = (() => {
                        const zTargetType = z.object({
                            keycloakify: z.record(z.unknown())
                        });
                        assert();
                        return id(zTargetType);
                    })();
                    const parsedPackageJson = JSON.parse(fs.readFileSync(buildContext.packageJsonFilePath).toString("utf8"));
                    zParsedPackageJson.parse(parsedPackageJson);
                    assert(is(parsedPackageJson));
                    return parsedPackageJson;
                })();
                parsedPackageJson.keycloakify.accountThemeImplementation =
                    accountThemeType;
                fs.writeFileSync(buildContext.packageJsonFilePath, Buffer.from(JSON.stringify(parsedPackageJson, undefined, 4), "utf8"));
            }
            break;
    }
}
//# sourceMappingURL=updateAccountThemeImplementationInConfig.js.map