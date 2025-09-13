import * as child_process from "child_process";
import * as fs from "fs";
import { exclude } from "tsafe/exclude";
export function getProxyFetchOptions(params) {
    var _a, _b, _c;
    const { npmConfigGetCwd } = params;
    const cfg = (() => {
        const output = child_process
            .execSync("npm config get", { cwd: npmConfigGetCwd })
            .toString("utf8");
        return output
            .split("\n")
            .filter(line => !line.startsWith(";"))
            .map(line => line.trim())
            .map(line => {
            const [key, value] = line.split("=");
            if (key === undefined) {
                return undefined;
            }
            if (value === undefined) {
                return undefined;
            }
            return [key.trim(), value.trim()];
        })
            .filter(exclude(undefined))
            .filter(([key]) => key !== "")
            .map(([key, value]) => {
            if (value.startsWith('"') && value.endsWith('"')) {
                return [key, value.slice(1, -1)];
            }
            if (value === "true" || value === "false") {
                return [key, value];
            }
            return undefined;
        })
            .filter(exclude(undefined))
            .reduce((cfg, [key, value]) => key in cfg
            ? Object.assign(Object.assign({}, cfg), { [key]: [...ensureArray(cfg[key]), value] }) : Object.assign(Object.assign({}, cfg), { [key]: value }), {});
    })();
    const proxy = ensureSingleOrNone((_a = cfg["https-proxy"]) !== null && _a !== void 0 ? _a : cfg["proxy"]);
    const noProxy = (_b = cfg["noproxy"]) !== null && _b !== void 0 ? _b : cfg["no-proxy"];
    const strictSSL = ensureSingleOrNone(cfg["strict-ssl"]) === "true";
    const cert = cfg["cert"];
    const ca = ensureArray((_c = cfg["ca"]) !== null && _c !== void 0 ? _c : cfg["ca[]"]);
    const cafile = ensureSingleOrNone(cfg["cafile"]);
    if (cafile !== undefined) {
        ca.push(...(() => {
            const cafileContent = fs.readFileSync(cafile).toString("utf8");
            const newLinePlaceholder = "NEW_LINE_PLACEHOLDER_xIsPsK23svt";
            const chunks = (arr, size = 2) => arr
                .map((_, i) => i % size == 0 && arr.slice(i, i + size))
                .filter(Boolean);
            return chunks(cafileContent.split(/(-----END CERTIFICATE-----)/), 2).map(ca => ca
                .join("")
                .replace(/\r?\n/g, newLinePlaceholder)
                .replace(new RegExp(`^${newLinePlaceholder}`), "")
                .replace(new RegExp(newLinePlaceholder, "g"), "\\n"));
        })());
    }
    return {
        proxy,
        noProxy,
        strictSSL,
        cert,
        ca: ca.length === 0 ? undefined : ca
    };
}
function ensureArray(arg0) {
    return Array.isArray(arg0) ? arg0 : arg0 === undefined ? [] : [arg0];
}
function ensureSingleOrNone(arg0) {
    if (!Array.isArray(arg0))
        return arg0;
    if (arg0.length === 0)
        return undefined;
    if (arg0.length === 1)
        return arg0[0];
    throw new Error("Illegal configuration, expected a single value but found multiple: " +
        arg0.map(String).join(", "));
}
//# sourceMappingURL=fetchProxyOptions.js.map