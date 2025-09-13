import * as child_process from "child_process";
import { assert } from "tsafe/assert";
import chalk from "chalk";
import { VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES } from "../shared/constants";
import { Deferred } from "evt/tools/Deferred";
assert();
export function startViteDevServer(params) {
    const { buildContext } = params;
    console.log(chalk.blue(`$ npx vite dev`));
    const child = child_process.spawn("npx", ["vite", "dev"], {
        cwd: buildContext.projectDirPath,
        env: Object.assign(Object.assign({}, process.env), { [VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.READ_KC_CONTEXT_FROM_URL]: "true" }),
        shell: true
    });
    child.stdout.on("data", data => {
        if (!data.toString("utf8").includes("[vite] hmr")) {
            return;
        }
        process.stdout.write(data);
    });
    child.stderr.on("data", data => process.stderr.write(data));
    const dPort = new Deferred();
    {
        const onData = (data) => {
            //Local:   http://localhost:8083/
            const match = data
                .toString("utf8")
                .replace(/\x1b[[0-9;]*m/g, "")
                .match(/Local:\s*http:\/\/(?:localhost|127\.0\.0\.1):(\d+)\//);
            if (match === null) {
                return;
            }
            child.stdout.off("data", onData);
            const port = parseInt(match[1]);
            assert(!isNaN(port));
            dPort.resolve(port);
        };
        child.stdout.on("data", onData);
    }
    return dPort.pr.then(port => ({ port }));
}
//# sourceMappingURL=startViteDevServer.js.map