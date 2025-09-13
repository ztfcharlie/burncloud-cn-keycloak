"use strict";
exports.id = 375;
exports.ids = [375];
exports.modules = {

/***/ 64097:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "command": () => (/* reexport */ command)
});

// EXTERNAL MODULE: ./node_modules/tsafe/esm/exclude.mjs
var exclude = __webpack_require__(83101);
// EXTERNAL MODULE: ./dist/bin/shared/constants.js
var constants = __webpack_require__(173);
// EXTERNAL MODULE: ./dist/bin/tools/SemVer.js
var SemVer = __webpack_require__(12171);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
var external_child_process_default = /*#__PURE__*/__webpack_require__.n(external_child_process_);
// EXTERNAL MODULE: ./node_modules/chalk/source/index.js
var source = __webpack_require__(78818);
var source_default = /*#__PURE__*/__webpack_require__.n(source);
// EXTERNAL MODULE: ./node_modules/chokidar/index.js
var chokidar = __webpack_require__(42677);
// EXTERNAL MODULE: ./node_modules/powerhooks/tools/waitForDebounce.js
var tools_waitForDebounce = __webpack_require__(18721);
// EXTERNAL MODULE: ./dist/bin/tools/getThisCodebaseRootDirPath.js
var getThisCodebaseRootDirPath = __webpack_require__(58822);
// EXTERNAL MODULE: ./dist/bin/tools/getAbsoluteAndInOsFormatPath.js
var getAbsoluteAndInOsFormatPath = __webpack_require__(84794);
// EXTERNAL MODULE: ./node_modules/cli-select/dist/index.js
var dist = __webpack_require__(99398);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);
// EXTERNAL MODULE: ./node_modules/run-exclusive/lib/runExclusive.js
var runExclusive = __webpack_require__(81708);
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(73292);
var promises_default = /*#__PURE__*/__webpack_require__.n(promises_);
// EXTERNAL MODULE: ./node_modules/yauzl/index.js
var yauzl = __webpack_require__(78781);
// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(12781);
var external_stream_default = /*#__PURE__*/__webpack_require__.n(external_stream_);
// EXTERNAL MODULE: ./node_modules/evt/tools/Deferred.js
var Deferred = __webpack_require__(50689);
// EXTERNAL MODULE: ./dist/bin/tools/fs.existsAsync.js
var fs_existsAsync = __webpack_require__(43765);
;// CONCATENATED MODULE: ./dist/bin/tools/extractArchive.js







async function extractArchive(params) {
    const { archiveFilePath, onArchiveFile } = params;
    const zipFile = await new Promise((resolve, reject) => {
        yauzl.open(archiveFilePath, { lazyEntries: true }, async (error, zipFile) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(zipFile);
        });
    });
    const dDone = new Deferred.Deferred();
    zipFile.once("end", () => {
        zipFile.close();
        dDone.resolve();
    });
    const writeFile = async (entry, params) => {
        const { filePath, modifiedData } = params;
        {
            const dirPath = (0,external_path_.dirname)(filePath);
            if (!(await (0,fs_existsAsync/* existsAsync */.o)(dirPath))) {
                await promises_default().mkdir(dirPath, { recursive: true });
            }
        }
        if (modifiedData !== undefined) {
            await promises_default().writeFile(filePath, modifiedData);
            return;
        }
        const readStream = await new Promise(resolve => zipFile.openReadStream(entry, async (error, readStream) => {
            if (error) {
                dDone.reject(error);
                return;
            }
            resolve(readStream);
        }));
        const dDoneWithFile = new Deferred.Deferred();
        external_stream_default().pipeline(readStream, external_fs_default().createWriteStream(filePath), error => {
            if (error) {
                dDone.reject(error);
                return;
            }
            dDoneWithFile.resolve();
        });
        await dDoneWithFile.pr;
    };
    const readFile = (entry) => new Promise(resolve => zipFile.openReadStream(entry, async (error, readStream) => {
        if (error) {
            dDone.reject(error);
            return;
        }
        const chunks = [];
        readStream.on("data", chunk => {
            chunks.push(chunk);
        });
        readStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readStream.on("error", error => {
            dDone.reject(error);
        });
    }));
    zipFile.on("entry", async (entry) => {
        handle_file: {
            // NOTE: Skip directories
            if (entry.fileName.endsWith("/")) {
                break handle_file;
            }
            let hasEarlyExitBeenCalled = false;
            await onArchiveFile({
                relativeFilePathInArchive: entry.fileName.split("/").join(external_path_.sep),
                readFile: () => readFile(entry),
                writeFile: params => writeFile(entry, params),
                earlyExit: () => {
                    hasEarlyExitBeenCalled = true;
                }
            });
            if (hasEarlyExitBeenCalled) {
                zipFile.close();
                dDone.resolve();
                return;
            }
        }
        zipFile.readEntry();
    });
    zipFile.readEntry();
    await dDone.pr;
}
//# sourceMappingURL=extractArchive.js.map
// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __webpack_require__(38469);
// EXTERNAL MODULE: ./node_modules/zod/v3/types.js + 4 modules
var types = __webpack_require__(49622);
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/appBuild.js










(0,assert/* assert */.h)();
async function appBuild(params) {
    var _a;
    const { buildContext } = params;
    const { parsedPackageJson } = (() => {
        const zParsedPackageJson = (() => {
            const zTargetType = types/* object */.Ry({
                scripts: types/* record */.IM(types/* string */.Z_()).optional()
            });
            (0,assert/* assert */.h)();
            return (0,id.id)(zTargetType);
        })();
        const parsedPackageJson = JSON.parse(external_fs_.readFileSync(buildContext.packageJsonFilePath).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,assert/* assert */.h)((0,assert.is)(parsedPackageJson));
        return { parsedPackageJson };
    })();
    const entries = Object.entries((_a = parsedPackageJson.scripts) !== null && _a !== void 0 ? _a : {}).filter(([, scriptCommand]) => scriptCommand.includes("keycloakify build"));
    if (entries.length === 0) {
        console.log(source_default().red([
            `You should have a script in your package.json at ${(0,external_path_.relative)(process.cwd(), (0,external_path_.dirname)(buildContext.packageJsonFilePath))}`,
            `that includes the 'keycloakify build' command`
        ].join(" ")));
        process.exit(-1);
    }
    const entry = entries.length === 1
        ? entries[0]
        : entries.find(([scriptName]) => scriptName === "build-keycloak-theme");
    if (entry === undefined) {
        console.log(source_default().red("There's multiple candidate script for building your app, name one 'build-keycloak-theme'"));
        process.exit(-1);
    }
    const [scriptName, scriptCommand] = entry;
    const { appBuildSubCommands } = (() => {
        const appBuildSubCommands = [];
        for (const subCmd of scriptCommand.split("&&").map(s => s.trim())) {
            if (subCmd.includes("keycloakify build")) {
                break;
            }
            appBuildSubCommands.push(subCmd);
        }
        return { appBuildSubCommands };
    })();
    if (appBuildSubCommands.length === 0) {
        console.log(source_default().red(`Your ${scriptName} script should look like "... && keycloakify build ..."`));
        process.exit(-1);
    }
    common_case: {
        if (appBuildSubCommands.length !== 1) {
            break common_case;
        }
        const [appBuildSubCommand] = appBuildSubCommands;
        const isNpmRunBuild = (() => {
            for (const packageManager of ["npm", "yarn", "pnpm", "bun", "deno"]) {
                for (const doUseRun of [true, false]) {
                    if (`${packageManager}${doUseRun ? " run " : " "}build` ===
                        appBuildSubCommand) {
                        return true;
                    }
                }
            }
            return false;
        })();
        if (!isNpmRunBuild) {
            break common_case;
        }
        const { scripts } = parsedPackageJson;
        (0,assert/* assert */.h)(scripts !== undefined);
        const buildCmd = scripts.build;
        if (buildCmd !== "tsc && vite build") {
            break common_case;
        }
        if (scripts.prebuild !== undefined) {
            break common_case;
        }
        if (scripts.postbuild !== undefined) {
            break common_case;
        }
        const dIsSuccess = new Deferred.Deferred();
        console.log(source_default().blue("$ npx vite build"));
        const child = external_child_process_.spawn("npx", ["vite", "build"], {
            cwd: buildContext.projectDirPath,
            shell: true
        });
        child.stdout.on("data", data => {
            if (data.toString("utf8").includes("gzip:")) {
                return;
            }
            process.stdout.write(data);
        });
        child.stderr.on("data", data => process.stderr.write(data));
        child.on("exit", code => dIsSuccess.resolve(code === 0));
        const isSuccess = await dIsSuccess.pr;
        return { isAppBuildSuccess: isSuccess };
    }
    let commandCwd = (0,external_path_.dirname)(buildContext.packageJsonFilePath);
    for (const subCommand of appBuildSubCommands) {
        const dIsSuccess = new Deferred.Deferred();
        const [command, ...args] = subCommand.split(" ");
        if (command === "cd") {
            const [pathIsh] = args;
            commandCwd = (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                pathIsh,
                cwd: commandCwd
            });
            continue;
        }
        console.log(source_default().blue(`$ ${subCommand}`));
        const child = external_child_process_.spawn(command, args, {
            cwd: commandCwd,
            env: Object.assign(Object.assign({}, process.env), { PATH: (() => {
                    var _a;
                    const separator = external_path_.sep === "/" ? ":" : ";";
                    return [
                        (0,external_path_.join)((0,external_path_.dirname)(buildContext.packageJsonFilePath), "node_modules", ".bin"),
                        ...((_a = process.env.PATH) !== null && _a !== void 0 ? _a : "").split(separator)
                    ].join(separator);
                })() }),
            shell: true
        });
        child.stdout.on("data", data => process.stdout.write(data));
        child.stderr.on("data", data => process.stderr.write(data));
        child.on("exit", code => dIsSuccess.resolve(code === 0));
        const isSuccess = await dIsSuccess.pr;
        if (!isSuccess) {
            return { isAppBuildSuccess: false };
        }
    }
    return { isAppBuildSuccess: true };
}
//# sourceMappingURL=appBuild.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/keycloakifyBuild.js





(0,assert/* assert */.h)();
async function keycloakifyBuild(params) {
    const { buildForKeycloakMajorVersionNumber, buildContext } = params;
    const dResult = new Deferred.Deferred();
    console.log(source_default().blue("$ npx keycloakify build"));
    const child = external_child_process_.spawn("npx", ["keycloakify", "build"], {
        cwd: buildContext.projectDirPath,
        env: Object.assign(Object.assign({}, process.env), { [constants/* BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME */.ac]: `${buildForKeycloakMajorVersionNumber}` }),
        shell: true
    });
    child.stdout.on("data", data => process.stdout.write(data));
    child.stderr.on("data", data => process.stderr.write(data));
    child.on("exit", code => dResult.resolve({ isSuccess: code === 0 }));
    const { isSuccess } = await dResult.pr;
    return { isKeycloakifyBuildSuccess: isSuccess };
}
//# sourceMappingURL=keycloakifyBuild.js.map
// EXTERNAL MODULE: ./dist/bin/tools/isInside.js
var isInside = __webpack_require__(90665);
;// CONCATENATED MODULE: ./dist/bin/tools/fs.rm.js



/**
 * Polyfill of fs.rm(dirPath, { "recursive": true })
 * For older version of Node
 */
async function rm(dirPath, options) {
    if (SemVer/* SemVer.compare */.h.compare(SemVer/* SemVer.parse */.h.parse(process.version), SemVer/* SemVer.parse */.h.parse("14.14.0")) > 0) {
        return promises_.rm(dirPath, options);
    }
    const { force = true } = options;
    if (force && !(await checkDirExists(dirPath))) {
        return;
    }
    const removeDir_rec = async (dirPath) => Promise.all((await promises_.readdir(dirPath)).map(async (basename) => {
        const fileOrDirpath = (0,external_path_.join)(dirPath, basename);
        if ((await promises_.lstat(fileOrDirpath)).isDirectory()) {
            await removeDir_rec(fileOrDirpath);
        }
        else {
            await promises_.unlink(fileOrDirpath);
        }
    }));
    await removeDir_rec(dirPath);
}
async function checkDirExists(dirPath) {
    try {
        await promises_.access(dirPath, promises_.constants.F_OK);
        return true;
    }
    catch (_a) {
        return false;
    }
}
//# sourceMappingURL=fs.rm.js.map
// EXTERNAL MODULE: ./node_modules/make-fetch-happen/lib/index.js
var lib = __webpack_require__(9525);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
;// CONCATENATED MODULE: ./dist/bin/tools/downloadAndExtractArchive.js








async function downloadAndExtractArchive(params) {
    var _a;
    const { url, uniqueIdOfOnArchiveFile, onArchiveFile, cacheDirPath, fetchOptions } = params;
    const archiveFileBasename = url.split("?")[0].split("/").reverse()[0];
    const archiveFilePath = (0,external_path_.join)(cacheDirPath, archiveFileBasename);
    download: {
        await (0,promises_.mkdir)((0,external_path_.dirname)(archiveFilePath), { recursive: true });
        if (await (0,fs_existsAsync/* existsAsync */.o)(archiveFilePath)) {
            const isDownloaded = await SuccessTracker.getIsDownloaded({
                cacheDirPath,
                archiveFileBasename
            });
            if (isDownloaded) {
                break download;
            }
            await (0,promises_.unlink)(archiveFilePath);
            await SuccessTracker.removeFromDownloaded({
                cacheDirPath,
                archiveFileBasename
            });
        }
        const response = await lib_default()(url, fetchOptions);
        (_a = response.body) === null || _a === void 0 ? void 0 : _a.setMaxListeners(Number.MAX_VALUE);
        (0,assert/* assert */.h)(typeof response.body !== "undefined" && response.body != null);
        await (0,promises_.writeFile)(archiveFilePath, response.body);
        await SuccessTracker.markAsDownloaded({
            cacheDirPath,
            archiveFileBasename
        });
    }
    const extractDirBasename = `${archiveFileBasename.replace(/\.([^.]+)$/, (...[, ext]) => `_${ext}`)}_${uniqueIdOfOnArchiveFile}_${external_crypto_.createHash("sha256")
        .update(onArchiveFile.toString())
        .digest("hex")
        .substring(0, 5)}`;
    await Promise.all((await (0,promises_.readdir)(cacheDirPath))
        .filter((() => {
        const prefix = extractDirBasename
            .split("_")
            .reverse()
            .slice(1)
            .reverse()
            .join("_");
        return basename => basename !== extractDirBasename && basename.startsWith(prefix);
    })())
        .map(async (extractDirBasename) => {
        await rm((0,external_path_.join)(cacheDirPath, extractDirBasename), {
            recursive: true
        });
        await SuccessTracker.removeFromExtracted({
            cacheDirPath,
            extractDirBasename
        });
    }));
    const extractedDirPath = (0,external_path_.join)(cacheDirPath, extractDirBasename);
    extract_and_transform: {
        if (await (0,fs_existsAsync/* existsAsync */.o)(extractedDirPath)) {
            const isExtracted = await SuccessTracker.getIsExtracted({
                cacheDirPath,
                extractDirBasename
            });
            if (isExtracted) {
                break extract_and_transform;
            }
            await rm(extractedDirPath, { recursive: true });
            await SuccessTracker.removeFromExtracted({
                cacheDirPath,
                extractDirBasename
            });
        }
        await extractArchive({
            archiveFilePath,
            onArchiveFile: async ({ relativeFilePathInArchive, readFile, writeFile }) => onArchiveFile({
                fileRelativePath: relativeFilePathInArchive,
                readFile,
                writeFile: ({ fileRelativePath, modifiedData }) => writeFile({
                    filePath: (0,external_path_.join)(extractedDirPath, fileRelativePath),
                    modifiedData
                })
            })
        });
        await SuccessTracker.markAsExtracted({
            cacheDirPath,
            extractDirBasename
        });
    }
    return { extractedDirPath, archiveFilePath };
}
var SuccessTracker;
(function (SuccessTracker) {
    async function read(params) {
        const { cacheDirPath } = params;
        const filePath = (0,external_path_.join)(cacheDirPath, "downloadAndExtractArchive.json");
        if (!(await (0,fs_existsAsync/* existsAsync */.o)(filePath))) {
            return { archiveFileBasenames: [], extractDirBasenames: [] };
        }
        return JSON.parse((await (0,promises_.readFile)(filePath)).toString("utf8"));
    }
    async function write(params) {
        const { cacheDirPath, successTracker } = params;
        const filePath = (0,external_path_.join)(cacheDirPath, "downloadAndExtractArchive.json");
        {
            const dirPath = (0,external_path_.dirname)(filePath);
            if (!(await (0,fs_existsAsync/* existsAsync */.o)(dirPath))) {
                await (0,promises_.mkdir)(dirPath, { recursive: true });
            }
        }
        await (0,promises_.writeFile)(filePath, JSON.stringify(successTracker));
    }
    async function markAsDownloaded(params) {
        const { cacheDirPath, archiveFileBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.archiveFileBasenames.push(archiveFileBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.markAsDownloaded = markAsDownloaded;
    async function getIsDownloaded(params) {
        const { cacheDirPath, archiveFileBasename } = params;
        const successTracker = await read({ cacheDirPath });
        return successTracker.archiveFileBasenames.includes(archiveFileBasename);
    }
    SuccessTracker.getIsDownloaded = getIsDownloaded;
    async function removeFromDownloaded(params) {
        const { cacheDirPath, archiveFileBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.archiveFileBasenames = successTracker.archiveFileBasenames.filter(basename => basename !== archiveFileBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.removeFromDownloaded = removeFromDownloaded;
    async function markAsExtracted(params) {
        const { cacheDirPath, extractDirBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.extractDirBasenames.push(extractDirBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.markAsExtracted = markAsExtracted;
    async function getIsExtracted(params) {
        const { cacheDirPath, extractDirBasename } = params;
        const successTracker = await read({ cacheDirPath });
        return successTracker.extractDirBasenames.includes(extractDirBasename);
    }
    SuccessTracker.getIsExtracted = getIsExtracted;
    async function removeFromExtracted(params) {
        const { cacheDirPath, extractDirBasename } = params;
        const successTracker = await read({ cacheDirPath });
        successTracker.extractDirBasenames = successTracker.extractDirBasenames.filter(basename => basename !== extractDirBasename);
        await write({ cacheDirPath, successTracker });
    }
    SuccessTracker.removeFromExtracted = removeFromExtracted;
})(SuccessTracker || (SuccessTracker = {}));
//# sourceMappingURL=downloadAndExtractArchive.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/startViteDevServer.js





(0,assert/* assert */.h)();
function startViteDevServer(params) {
    const { buildContext } = params;
    console.log(source_default().blue(`$ npx vite dev`));
    const child = external_child_process_.spawn("npx", ["vite", "dev"], {
        cwd: buildContext.projectDirPath,
        env: Object.assign(Object.assign({}, process.env), { [constants/* VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.READ_KC_CONTEXT_FROM_URL */.TE.READ_KC_CONTEXT_FROM_URL]: "true" }),
        shell: true
    });
    child.stdout.on("data", data => {
        if (!data.toString("utf8").includes("[vite] hmr")) {
            return;
        }
        process.stdout.write(data);
    });
    child.stderr.on("data", data => process.stderr.write(data));
    const dPort = new Deferred.Deferred();
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
            (0,assert/* assert */.h)(!isNaN(port));
            dPort.resolve(port);
        };
        child.stdout.on("data", onData);
    }
    return dPort.pr.then(port => ({ port }));
}
//# sourceMappingURL=startViteDevServer.js.map
// EXTERNAL MODULE: ./node_modules/tsafe/esm/is.mjs
var is = __webpack_require__(16453);
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/ParsedRealmJson/ParsedRealmJson.js



const zParsedRealmJson = (() => {
    const zTargetType = types/* object */.Ry({
        realm: types/* string */.Z_(),
        loginTheme: types/* string */.Z_().optional(),
        accountTheme: types/* string */.Z_().optional(),
        adminTheme: types/* string */.Z_().optional(),
        emailTheme: types/* string */.Z_().optional(),
        sslRequired: types/* string */.Z_().optional(),
        eventsListeners: types/* array */.IX(types/* string */.Z_()),
        users: types/* array */.IX(types/* object */.Ry({
            id: types/* string */.Z_(),
            email: types/* string */.Z_(),
            username: types/* string */.Z_(),
            credentials: types/* array */.IX(types/* object */.Ry({
                type: types/* string */.Z_()
            })),
            clientRoles: types/* record */.IM(types/* array */.IX(types/* string */.Z_())).optional()
        })),
        roles: types/* object */.Ry({
            client: types/* record */.IM(types/* array */.IX(types/* object */.Ry({
                name: types/* string */.Z_(),
                containerId: types/* string */.Z_()
            })))
        }),
        clients: types/* array */.IX(types/* object */.Ry({
            id: types/* string */.Z_(),
            clientId: types/* string */.Z_(),
            baseUrl: types/* string */.Z_().optional(),
            redirectUris: types/* array */.IX(types/* string */.Z_()).optional(),
            webOrigins: types/* array */.IX(types/* string */.Z_()).optional(),
            attributes: types/* object */.Ry({
                "post.logout.redirect.uris": types/* string */.Z_().optional()
            })
                .optional(),
            protocol: types/* string */.Z_().optional(),
            protocolMappers: types/* array */.IX(types/* object */.Ry({
                id: types/* string */.Z_(),
                name: types/* string */.Z_(),
                protocol: types/* string */.Z_(),
                protocolMapper: types/* string */.Z_(),
                consentRequired: types/* boolean */.O7(),
                config: types/* record */.IM(types/* string */.Z_()).optional()
            }))
                .optional()
        }))
    });
    assert/* assert */.h;
    return (0,id.id)(zTargetType);
})();
//# sourceMappingURL=ParsedRealmJson.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/ParsedRealmJson/readRealmJsonFile.js




function readRealmJsonFile(params) {
    const { realmJsonFilePath } = params;
    const parsedRealmJson = JSON.parse(external_fs_.readFileSync(realmJsonFilePath).toString("utf8"));
    zParsedRealmJson.parse(parsedRealmJson);
    (0,assert/* assert */.h)((0,is.is)(parsedRealmJson));
    return parsedRealmJson;
}
//# sourceMappingURL=readRealmJsonFile.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/defaultConfig/defaultConfig.js






function getDefaultRealmJsonFilePath(params) {
    const { keycloakMajorVersionNumber } = params;
    return (0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "src", "bin", "start-keycloak", "realmConfig", "defaultConfig", `realm-kc-${keycloakMajorVersionNumber}.json`);
}
const { getSupportedKeycloakMajorVersions } = (() => {
    let cache = undefined;
    function getSupportedKeycloakMajorVersions() {
        if (cache !== undefined) {
            return cache;
        }
        cache = external_fs_.readdirSync((0,external_path_.dirname)(getDefaultRealmJsonFilePath({ keycloakMajorVersionNumber: 0 })))
            .map(fileBasename => {
            const match = fileBasename.match(/^realm-kc-(\d+)\.json$/);
            if (match === null) {
                return undefined;
            }
            const n = parseInt(match[1]);
            (0,assert/* assert */.h)(!isNaN(n));
            return n;
        })
            .filter((0,exclude/* exclude */.D)(undefined))
            .sort((a, b) => b - a);
        return cache;
    }
    return { getSupportedKeycloakMajorVersions };
})();
function getDefaultConfig(params) {
    const { keycloakMajorVersionNumber } = params;
    (0,assert/* assert */.h)(getSupportedKeycloakMajorVersions().includes(keycloakMajorVersionNumber), `We do not have a default config for Keycloak ${keycloakMajorVersionNumber}`);
    return readRealmJsonFile({
        realmJsonFilePath: getDefaultRealmJsonFilePath({
            keycloakMajorVersionNumber
        })
    });
}
//# sourceMappingURL=defaultConfig.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/defaultConfig/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./dist/bin/tools/readThisNpmPackageVersion.js
var readThisNpmPackageVersion = __webpack_require__(64795);
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/getSupportedDockerImageTags.js











assert/* assert */.h;
async function getSupportedDockerImageTags(params) {
    const { buildContext } = params;
    {
        const result = await getCachedValue({ cacheDirPath: buildContext.cacheDirPath });
        if (result !== undefined) {
            return result;
        }
    }
    const tags_queryResponse = [];
    await (async function callee(url) {
        const r = await lib_default()(url, buildContext.fetchOptions);
        await Promise.all([
            (async () => {
                tags_queryResponse.push(...types/* object */.Ry({
                    tags: types/* array */.IX(types/* string */.Z_())
                })
                    .parse(await r.json()).tags);
            })(),
            (async () => {
                const link = r.headers.get("link");
                if (link === null) {
                    return;
                }
                const split = link.split(";").map(s => s.trim());
                (0,assert/* assert */.h)(split.length === 2);
                (0,assert/* assert */.h)(split[1] === 'rel="next"');
                const match = split[0].match(/^<(.+)>$/);
                (0,assert/* assert */.h)(match !== null);
                const nextUrl = new URL(url).origin + match[1];
                await callee(nextUrl);
            })()
        ]);
    })("https://quay.io/v2/keycloak/keycloak/tags/list");
    const supportedKeycloakMajorVersions = getSupportedKeycloakMajorVersions();
    const allSupportedTags_withVersion = tags_queryResponse
        .map(tag => ({
        tag,
        version: (() => {
            if (tag.includes("-")) {
                return undefined;
            }
            let version;
            try {
                version = SemVer/* SemVer.parse */.h.parse(tag);
            }
            catch (_a) {
                return undefined;
            }
            if (tag.split(".").length !== 3) {
                return undefined;
            }
            if (!supportedKeycloakMajorVersions.includes(version.major)) {
                return undefined;
            }
            return version;
        })()
    }))
        .map(({ tag, version }) => (version === undefined ? undefined : { tag, version }))
        .filter((0,exclude/* exclude */.D)(undefined))
        .sort(({ version: a }, { version: b }) => SemVer/* SemVer.compare */.h.compare(b, a));
    const latestTagByMajor = {};
    for (const { version } of allSupportedTags_withVersion) {
        const version_current = latestTagByMajor[version.major];
        if (version_current === undefined ||
            SemVer/* SemVer.compare */.h.compare(version_current, version) === -1) {
            latestTagByMajor[version.major] = version;
        }
    }
    const latestMajorTags = Object.entries(latestTagByMajor)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([, version]) => version)
        .map(version => {
        (0,assert/* assert */.h)(version !== undefined);
        if (!supportedKeycloakMajorVersions.includes(version.major)) {
            return undefined;
        }
        return SemVer/* SemVer.stringify */.h.stringify(version);
    })
        .filter((0,exclude/* exclude */.D)(undefined));
    const allSupportedTags = allSupportedTags_withVersion.map(({ tag }) => tag);
    const result = {
        latestMajorTags,
        allSupportedTags
    };
    await setCachedValue({ cacheDirPath: buildContext.cacheDirPath, result });
    return result;
}
const { getCachedValue, setCachedValue } = (() => {
    const zResult = (() => {
        const zTargetType = types/* object */.Ry({
            allSupportedTags: types/* array */.IX(types/* string */.Z_()),
            latestMajorTags: types/* array */.IX(types/* string */.Z_())
        });
        assert/* assert */.h;
        return (0,id.id)(zTargetType);
    })();
    const zCache = (() => {
        const zTargetType = types/* object */.Ry({
            keycloakifyVersion: types/* string */.Z_(),
            time: types/* number */.Rx(),
            result: zResult
        });
        assert/* assert */.h;
        return (0,id.id)(zTargetType);
    })();
    let inMemoryCachedResult = undefined;
    function getCacheFilePath(params) {
        const { cacheDirPath } = params;
        return (0,external_path_.join)(cacheDirPath, "supportedDockerImageTags.json");
    }
    async function getCachedValue(params) {
        const { cacheDirPath } = params;
        if (inMemoryCachedResult !== undefined) {
            return inMemoryCachedResult;
        }
        const cacheFilePath = getCacheFilePath({ cacheDirPath });
        if (!(await (0,fs_existsAsync/* existsAsync */.o)(cacheFilePath))) {
            return undefined;
        }
        let cache;
        try {
            cache = zCache.parse(JSON.parse(await promises_.readFile(cacheFilePath, "utf8")));
        }
        catch (_a) {
            return undefined;
        }
        if (cache.keycloakifyVersion !== (0,readThisNpmPackageVersion/* readThisNpmPackageVersion */.K)()) {
            return undefined;
        }
        if (Date.now() - cache.time > 3600 * 24) {
            return undefined;
        }
        inMemoryCachedResult = cache.result;
        return cache.result;
    }
    async function setCachedValue(params) {
        const { cacheDirPath, result } = params;
        inMemoryCachedResult = result;
        const cacheFilePath = getCacheFilePath({ cacheDirPath });
        {
            const dirPath = (0,external_path_.dirname)(cacheFilePath);
            if (!(await (0,fs_existsAsync/* existsAsync */.o)(dirPath))) {
                await promises_.mkdir(dirPath, { recursive: true });
            }
        }
        await promises_.writeFile(cacheFilePath, JSON.stringify(zCache.parse({
            keycloakifyVersion: (0,readThisNpmPackageVersion/* readThisNpmPackageVersion */.K)(),
            time: Date.now(),
            result
        }), null, 2));
    }
    return {
        getCachedValue,
        setCachedValue
    };
})();
//# sourceMappingURL=getSupportedDockerImageTags.js.map
// EXTERNAL MODULE: ./node_modules/evt/tools/inDepth/same.js
var same = __webpack_require__(33805);
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/prepareRealmConfig.js




function prepareRealmConfig(params) {
    const { parsedRealmJson, keycloakMajorVersionNumber, parsedKeycloakThemesJsonEntry } = params;
    const { username } = addOrEditTestUser({
        parsedRealmJson,
        keycloakMajorVersionNumber
    });
    const { clientId } = addOrEditClient({
        parsedRealmJson,
        keycloakMajorVersionNumber
    });
    editAccountConsoleAndSecurityAdminConsole({ parsedRealmJson });
    enableCustomThemes({
        parsedRealmJson,
        parsedKeycloakThemesJsonEntry
    });
    enable_custom_events_listeners: {
        const name = "keycloakify-logging";
        if (parsedRealmJson.eventsListeners.includes(name)) {
            break enable_custom_events_listeners;
        }
        parsedRealmJson.eventsListeners.push(name);
        parsedRealmJson.eventsListeners.sort();
    }
    parsedRealmJson.sslRequired = "none";
    return {
        realmName: parsedRealmJson.realm,
        clientName: clientId,
        username
    };
}
function enableCustomThemes(params) {
    const { parsedRealmJson, parsedKeycloakThemesJsonEntry } = params;
    for (const themeType of [...constants/* THEME_TYPES */.Jh, "email"]) {
        parsedRealmJson[`${themeType}Theme`] =
            !parsedKeycloakThemesJsonEntry.types.includes(themeType)
                ? ""
                : parsedKeycloakThemesJsonEntry.name;
    }
}
function addOrEditTestUser(params) {
    var _a, _b, _c, _d;
    const { parsedRealmJson, keycloakMajorVersionNumber } = params;
    const parsedRealmJson_default = getDefaultConfig({ keycloakMajorVersionNumber });
    const [defaultUser_default] = parsedRealmJson_default.users;
    (0,assert/* assert */.h)(defaultUser_default !== undefined);
    const defaultUser_preexisting = parsedRealmJson.users.find(user => user.username === defaultUser_default.username);
    const newUser = structuredClone((_a = defaultUser_preexisting !== null && defaultUser_preexisting !== void 0 ? defaultUser_preexisting : (() => {
        const firstUser = parsedRealmJson.users[0];
        if (firstUser === undefined) {
            return undefined;
        }
        const firstUserCopy = structuredClone(firstUser);
        firstUserCopy.id = defaultUser_default.id;
        return firstUserCopy;
    })()) !== null && _a !== void 0 ? _a : defaultUser_default);
    newUser.username = defaultUser_default.username;
    delete_existing_password_credential_if_any: {
        const i = newUser.credentials.findIndex(credential => credential.type === "password");
        if (i === -1) {
            break delete_existing_password_credential_if_any;
        }
        newUser.credentials.splice(i, 1);
    }
    {
        const credential = defaultUser_default.credentials.find(credential => credential.type === "password");
        (0,assert/* assert */.h)(credential !== undefined);
        newUser.credentials.push(credential);
    }
    {
        const nameByClientId = Object.fromEntries(parsedRealmJson.clients.map(client => [client.id, client.clientId]));
        const newClientRoles = {};
        for (const clientRole of Object.values(parsedRealmJson.roles.client).flat()) {
            const clientName = nameByClientId[clientRole.containerId];
            (0,assert/* assert */.h)(clientName !== undefined);
            ((_b = newClientRoles[clientName]) !== null && _b !== void 0 ? _b : (newClientRoles[clientName] = [])).push(clientRole.name);
        }
        const { same: sameSet } = (0,same.sameFactory)({
            takeIntoAccountArraysOrdering: false
        });
        for (const [clientName, roles] of Object.entries(newClientRoles)) {
            keep_previous_ordering_if_possible: {
                const roles_previous = (_c = newUser.clientRoles) === null || _c === void 0 ? void 0 : _c[clientName];
                if (roles_previous === undefined) {
                    break keep_previous_ordering_if_possible;
                }
                if (!sameSet(roles_previous, roles)) {
                    break keep_previous_ordering_if_possible;
                }
                continue;
            }
            ((_d = newUser.clientRoles) !== null && _d !== void 0 ? _d : (newUser.clientRoles = {}))[clientName] = roles;
        }
    }
    if (defaultUser_preexisting === undefined) {
        parsedRealmJson.users.push(newUser);
    }
    else {
        const i = parsedRealmJson.users.indexOf(defaultUser_preexisting);
        (0,assert/* assert */.h)(i !== -1);
        parsedRealmJson.users[i] = newUser;
    }
    return { username: newUser.username };
}
function addOrEditClient(params) {
    var _a;
    const { parsedRealmJson, keycloakMajorVersionNumber } = params;
    const parsedRealmJson_default = getDefaultConfig({ keycloakMajorVersionNumber });
    const testClient_default = (() => {
        const clients = parsedRealmJson_default.clients.filter(client => {
            return JSON.stringify(client).includes(constants/* TEST_APP_URL */.jp);
        });
        (0,assert/* assert */.h)(clients.length === 1);
        return clients[0];
    })();
    const clientIds_builtIn = parsedRealmJson_default.clients
        .map(client => client.clientId)
        .filter(clientId => clientId !== testClient_default.clientId);
    const testClient_preexisting = (() => {
        const clients = parsedRealmJson.clients
            .filter(client => !clientIds_builtIn.includes(client.clientId))
            .filter(client => client.protocol === "openid-connect");
        {
            const client = clients.find(client => client.clientId === testClient_default.clientId);
            if (client !== undefined) {
                return client;
            }
        }
        {
            const client = clients.find(client => {
                var _a;
                return ((_a = client.redirectUris) === null || _a === void 0 ? void 0 : _a.find(redirectUri => redirectUri.startsWith(constants/* TEST_APP_URL */.jp))) !== undefined;
            });
            if (client !== undefined) {
                return client;
            }
        }
        const [client] = clients;
        if (client === undefined) {
            return undefined;
        }
        return client;
    })();
    let testClient;
    if (testClient_preexisting !== undefined) {
        testClient = testClient_preexisting;
    }
    else {
        testClient = structuredClone(testClient_default);
        delete testClient.protocolMappers;
        parsedRealmJson.clients.push(testClient);
    }
    testClient.redirectUris = [
        `${constants/* TEST_APP_URL */.jp}/*`,
        "http://localhost*",
        "http://127.0.0.1*"
    ]
        .sort()
        .reverse();
    ((_a = testClient.attributes) !== null && _a !== void 0 ? _a : (testClient.attributes = {}))["post.logout.redirect.uris"] = "+";
    testClient.webOrigins = ["*"];
    return { clientId: testClient.clientId };
}
function editAccountConsoleAndSecurityAdminConsole(params) {
    var _a, _b, _c, _d, _e;
    const { parsedRealmJson } = params;
    for (const clientId of ["account-console", "security-admin-console"]) {
        const client = parsedRealmJson.clients.find(client => client.clientId === clientId);
        (0,assert/* assert */.h)(client !== undefined);
        {
            const arr = ((_a = client.redirectUris) !== null && _a !== void 0 ? _a : (client.redirectUris = []));
            for (const value of ["http://localhost*", "http://127.0.0.1*"]) {
                if (!arr.includes(value)) {
                    arr.push(value);
                }
            }
            (_b = client.redirectUris) === null || _b === void 0 ? void 0 : _b.sort().reverse();
        }
        ((_c = client.attributes) !== null && _c !== void 0 ? _c : (client.attributes = {}))["post.logout.redirect.uris"] = "+";
        client.webOrigins = ["*"];
        admin_specific: {
            if (clientId !== "security-admin-console") {
                break admin_specific;
            }
            const protocolMapper_preexisting = (_d = client.protocolMappers) === null || _d === void 0 ? void 0 : _d.find(protocolMapper => {
                if (protocolMapper.protocolMapper !== "oidc-hardcoded-claim-mapper") {
                    return false;
                }
                if (protocolMapper.protocol !== "openid-connect") {
                    return false;
                }
                if (protocolMapper.config === undefined) {
                    return false;
                }
                if (protocolMapper.config["claim.name"] !== "allowed-origins") {
                    return false;
                }
                return true;
            });
            let protocolMapper;
            const config = {
                "introspection.token.claim": "true",
                "claim.value": '["*"]',
                "userinfo.token.claim": "true",
                "id.token.claim": "false",
                "lightweight.claim": "true",
                "access.token.claim": "true",
                "claim.name": "allowed-origins",
                "jsonType.label": "JSON",
                "access.tokenResponse.claim": "false"
            };
            if (protocolMapper_preexisting !== undefined) {
                protocolMapper = protocolMapper_preexisting;
            }
            else {
                protocolMapper = {
                    id: "8fd0d584-7052-4d04-a615-d18a71050873",
                    name: "allowed-origins",
                    protocol: "openid-connect",
                    protocolMapper: "oidc-hardcoded-claim-mapper",
                    consentRequired: false,
                    config
                };
                ((_e = client.protocolMappers) !== null && _e !== void 0 ? _e : (client.protocolMappers = [])).push(protocolMapper);
            }
            (0,assert/* assert */.h)(protocolMapper.config !== undefined);
            if (config !== protocolMapper.config) {
                Object.assign(protocolMapper.config, config);
            }
        }
    }
}
//# sourceMappingURL=prepareRealmConfig.js.map
// EXTERNAL MODULE: ./dist/bin/tools/runPrettier.js
var runPrettier = __webpack_require__(48433);
// EXTERNAL MODULE: ./node_modules/zod/v3/ZodError.js
var ZodError = __webpack_require__(35674);
;// CONCATENATED MODULE: ./dist/bin/tools/Stringifyable.js




const zStringifyableAtomic = (() => {
    const zTargetType = types/* union */.G0([types/* string */.Z_(), types/* number */.Rx(), types/* boolean */.O7(), types/* null */.lB()]);
    (0,assert/* assert */.h)();
    return (0,id.id)(zTargetType);
})();
const zStringifyable = types/* any */.Yj()
    .superRefine((val, ctx) => {
    const isStringifyable = (0,same.same)(JSON.parse(JSON.stringify(val)), val);
    if (!isStringifyable) {
        ctx.addIssue({
            code: ZodError/* ZodIssueCode.custom */.NL.custom,
            message: "Not stringifyable"
        });
    }
});
function getIsAtomic(stringifyable) {
    return (["string", "number", "boolean"].includes(typeof stringifyable) ||
        stringifyable === null);
}
const { getValueAtPath } = (() => {
    function getValueAtPath_rec(stringifyable, path) {
        if (path.length === 0) {
            return stringifyable;
        }
        if (getIsAtomic(stringifyable)) {
            return undefined;
        }
        const [first, ...rest] = path;
        let dereferenced;
        if (stringifyable instanceof Array) {
            if (typeof first !== "number") {
                return undefined;
            }
            dereferenced = stringifyable[first];
        }
        else {
            if (typeof first !== "string") {
                return undefined;
            }
            dereferenced = stringifyable[first];
        }
        if (dereferenced === undefined) {
            return undefined;
        }
        return getValueAtPath_rec(dereferenced, rest);
    }
    function getValueAtPath(stringifyableObjectOrArray, path) {
        return getValueAtPath_rec(stringifyableObjectOrArray, path);
    }
    return { getValueAtPath };
})();
//# sourceMappingURL=Stringifyable.js.map
;// CONCATENATED MODULE: ./dist/bin/tools/canonicalStringify.js

function canonicalStringify(params) {
    const { data, referenceData } = params;
    return JSON.stringify(makeDeterministicCopy({
        path: [],
        data,
        getCanonicalKeys: path => {
            const referenceValue = (() => {
                const path_patched = [];
                for (let i = 0; i < path.length; i++) {
                    let value_i = getValueAtPath(referenceData, [
                        ...path_patched,
                        path[i]
                    ]);
                    if (value_i !== undefined) {
                        path_patched.push(path[i]);
                        continue;
                    }
                    if (typeof path[i] !== "number") {
                        return undefined;
                    }
                    value_i = getValueAtPath(referenceData, [...path_patched, 0]);
                    if (value_i !== undefined) {
                        path_patched.push(0);
                        continue;
                    }
                    return undefined;
                }
                return getValueAtPath(referenceData, path_patched);
            })();
            if (referenceValue === undefined) {
                return undefined;
            }
            if (getIsAtomic(referenceValue)) {
                return undefined;
            }
            if (referenceValue instanceof Array) {
                return undefined;
            }
            return Object.keys(referenceValue);
        }
    }), null, 2);
}
function makeDeterministicCopy(params) {
    const { path, data, getCanonicalKeys } = params;
    if (getIsAtomic(data)) {
        return data;
    }
    if (data instanceof Array) {
        return makeDeterministicCopy_array({
            path,
            data,
            getCanonicalKeys
        });
    }
    return makeDeterministicCopy_record({
        path,
        data,
        getCanonicalKeys
    });
}
function makeDeterministicCopy_record(params) {
    const { path, data, getCanonicalKeys } = params;
    const keysOfAtomicValues = [];
    const keysOfNonAtomicValues = [];
    for (const [key, value] of Object.entries(data)) {
        if (getIsAtomic(value)) {
            keysOfAtomicValues.push(key);
        }
        else {
            keysOfNonAtomicValues.push(key);
        }
    }
    keysOfAtomicValues.sort();
    keysOfNonAtomicValues.sort();
    const keys = [...keysOfAtomicValues, ...keysOfNonAtomicValues];
    reorder_according_to_canonical: {
        const canonicalKeys = getCanonicalKeys(path);
        if (canonicalKeys === undefined) {
            break reorder_according_to_canonical;
        }
        const keys_toPrepend = [];
        for (const key of canonicalKeys) {
            const indexOfKey = keys.indexOf(key);
            if (indexOfKey === -1) {
                continue;
            }
            keys.splice(indexOfKey, 1);
            keys_toPrepend.push(key);
        }
        keys.unshift(...keys_toPrepend);
    }
    const result = {};
    for (const key of keys) {
        result[key] = makeDeterministicCopy({
            path: [...path, key],
            data: data[key],
            getCanonicalKeys
        });
    }
    return result;
}
function makeDeterministicCopy_array(params) {
    const { path, data, getCanonicalKeys } = params;
    return [...data].map((entry, i) => makeDeterministicCopy({
        path: [...path, i],
        data: entry,
        getCanonicalKeys
    }));
}
//# sourceMappingURL=canonicalStringify.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/ParsedRealmJson/writeRealmJsonFile.js




async function writeRealmJsonFile(params) {
    const { realmJsonFilePath, parsedRealmJson, keycloakMajorVersionNumber } = params;
    let sourceCode = canonicalStringify({
        data: parsedRealmJson,
        referenceData: getDefaultConfig({
            keycloakMajorVersionNumber
        })
    });
    if (await (0,runPrettier/* getIsPrettierAvailable */.MT)()) {
        sourceCode = await (0,runPrettier/* runPrettier */.eY)({
            sourceCode: sourceCode,
            filePath: realmJsonFilePath
        });
    }
    await promises_.writeFile(realmJsonFilePath, Buffer.from(sourceCode, "utf8"));
}
//# sourceMappingURL=writeRealmJsonFile.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/ParsedRealmJson/index.js


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/dumpContainerConfig.js







(0,assert/* assert */.h)();
async function dumpContainerConfig(params) {
    const { realmName, keycloakMajorVersionNumber, buildContext } = params;
    // https://github.com/keycloak/keycloak/issues/33800
    const doesUseLockedH2Database = keycloakMajorVersionNumber >= 25;
    if (doesUseLockedH2Database) {
        const dCompleted = new Deferred.Deferred();
        const cmd = `docker exec ${constants/* CONTAINER_NAME */.sv} sh -c "cp -rp /opt/keycloak/data/h2 /tmp"`;
        external_child_process_default().exec(cmd, error => {
            if (error !== null) {
                dCompleted.reject(error);
                return;
            }
            dCompleted.resolve();
        });
        try {
            await dCompleted.pr;
        }
        catch (error) {
            (0,assert/* assert */.h)((0,assert.is)(error));
            console.log(source_default().red(`Docker command failed: ${cmd}`));
            console.log(source_default().red(error.message));
            throw error;
        }
    }
    {
        const dCompleted = new Deferred.Deferred();
        const child = external_child_process_default().spawn("docker", [
            ...["exec", constants/* CONTAINER_NAME */.sv],
            ...["/opt/keycloak/bin/kc.sh", "export"],
            ...["--dir", "/tmp"],
            ...["--realm", realmName],
            ...["--users", "realm_file"],
            ...(!doesUseLockedH2Database
                ? []
                : [
                    ...["--db", "dev-file"],
                    ...[
                        "--db-url",
                        '"jdbc:h2:file:/tmp/h2/keycloakdb;NON_KEYWORDS=VALUE"'
                    ]
                ])
        ], { shell: true });
        let output = "";
        const onExit = (code) => {
            dCompleted.reject(new Error(`docker exec kc.sh export command failed with code ${code}`));
        };
        child.once("exit", onExit);
        child.stdout.on("data", data => {
            const outputStr = data.toString("utf8");
            if (outputStr.includes("Export finished successfully")) {
                child.removeListener("exit", onExit);
                // NOTE: On older Keycloak versions the process keeps running after the export is done.
                const timer = setTimeout(() => {
                    child.removeListener("exit", onExit2);
                    child.kill();
                    dCompleted.resolve();
                }, 1500);
                const onExit2 = () => {
                    clearTimeout(timer);
                    dCompleted.resolve();
                };
                child.once("exit", onExit2);
            }
            output += outputStr;
        });
        child.stderr.on("data", data => (output += source_default().red(data.toString("utf8"))));
        try {
            await dCompleted.pr;
        }
        catch (error) {
            (0,assert/* assert */.h)((0,assert.is)(error));
            console.log(source_default().red(error.message));
            console.log(output);
            throw error;
        }
    }
    if (doesUseLockedH2Database) {
        const dCompleted = new Deferred.Deferred();
        const cmd = `docker exec ${constants/* CONTAINER_NAME */.sv} sh -c "rm -rf /tmp/h2"`;
        external_child_process_default().exec(cmd, error => {
            if (error !== null) {
                dCompleted.reject(error);
                return;
            }
            dCompleted.resolve();
        });
        try {
            await dCompleted.pr;
        }
        catch (error) {
            (0,assert/* assert */.h)((0,assert.is)(error));
            console.log(source_default().red(`Docker command failed: ${cmd}`));
            console.log(source_default().red(error.message));
            throw error;
        }
    }
    const targetRealmConfigJsonFilePath_tmp = (0,external_path_.join)(buildContext.cacheDirPath, "realm.json");
    {
        const dCompleted = new Deferred.Deferred();
        const cmd = `docker cp ${constants/* CONTAINER_NAME */.sv}:/tmp/${realmName}-realm.json ${(0,external_path_.basename)(targetRealmConfigJsonFilePath_tmp)}`;
        external_child_process_default().exec(cmd, {
            cwd: (0,external_path_.dirname)(targetRealmConfigJsonFilePath_tmp)
        }, error => {
            if (error !== null) {
                dCompleted.reject(error);
                return;
            }
            dCompleted.resolve();
        });
        try {
            await dCompleted.pr;
        }
        catch (error) {
            (0,assert/* assert */.h)((0,assert.is)(error));
            console.log(source_default().red(`Docker command failed: ${cmd}`));
            console.log(source_default().red(error.message));
            throw error;
        }
    }
    return readRealmJsonFile({
        realmJsonFilePath: targetRealmConfigJsonFilePath_tmp
    });
}
//# sourceMappingURL=dumpContainerConfig.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/realmConfig.js











assert/* assert */.h;
async function getRealmConfig(params) {
    const { keycloakMajorVersionNumber, realmJsonFilePath_userProvided, parsedKeycloakThemesJsonEntry, buildContext } = params;
    const realmJsonFilePath = (0,external_path_.join)(buildContext.projectDirPath, ".keycloakify", `realm-kc-${keycloakMajorVersionNumber}.json`);
    const parsedRealmJson = await (async () => {
        if (realmJsonFilePath_userProvided !== undefined) {
            return readRealmJsonFile({
                realmJsonFilePath: realmJsonFilePath_userProvided
            });
        }
        if (await (0,fs_existsAsync/* existsAsync */.o)(realmJsonFilePath)) {
            return readRealmJsonFile({
                realmJsonFilePath
            });
        }
        return getDefaultConfig({ keycloakMajorVersionNumber });
    })();
    const { clientName, realmName, username } = prepareRealmConfig({
        parsedRealmJson,
        keycloakMajorVersionNumber,
        parsedKeycloakThemesJsonEntry
    });
    {
        const dirPath = (0,external_path_.dirname)(realmJsonFilePath);
        if (!(await (0,fs_existsAsync/* existsAsync */.o)(dirPath))) {
            external_fs_.mkdirSync(dirPath, { recursive: true });
        }
    }
    await writeRealmJsonFile({
        realmJsonFilePath,
        parsedRealmJson,
        keycloakMajorVersionNumber
    });
    const { onRealmConfigChange } = (() => {
        const run = runExclusive.build(async () => {
            const start = Date.now();
            console.log(source_default().grey(`Changes detected to the '${realmName}' config, backing up...`));
            let parsedRealmJson;
            try {
                parsedRealmJson = await dumpContainerConfig({
                    buildContext,
                    realmName,
                    keycloakMajorVersionNumber
                });
            }
            catch (error) {
                console.log(source_default().red(`Failed to backup '${realmName}' config:`));
                return;
            }
            await writeRealmJsonFile({
                realmJsonFilePath,
                parsedRealmJson,
                keycloakMajorVersionNumber
            });
            console.log([
                source_default().grey(`Save changed to \`.${external_path_.sep}${(0,external_path_.relative)(buildContext.projectDirPath, realmJsonFilePath)}\``),
                source_default().grey(`Next time you'll be running \`keycloakify start-keycloak\`, the realm '${realmName}' will be restored to this state.`),
                source_default().green(`✓ '${realmName}' config backed up completed in ${Date.now() - start}ms`)
            ].join("\n"));
        });
        const { waitForDebounce } = (0,tools_waitForDebounce/* waitForDebounceFactory */.z)({
            delay: 1000
        });
        async function onRealmConfigChange() {
            await waitForDebounce();
            run();
        }
        return { onRealmConfigChange };
    })();
    return {
        realmJsonFilePath,
        clientName,
        realmName,
        username,
        onRealmConfigChange
    };
}
//# sourceMappingURL=realmConfig.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/realmConfig/index.js

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/start-keycloak.js


























async function command(params) {
    var _a, _b, _c, _d;
    exit_if_docker_not_installed: {
        let commandOutput = undefined;
        try {
            commandOutput = external_child_process_.execSync("docker --version", {
                stdio: ["ignore", "pipe", "ignore"]
            })
                .toString("utf8");
        }
        catch (_e) {
            commandOutput = "";
        }
        commandOutput = commandOutput.trim().toLowerCase();
        for (const term of ["docker", "podman"]) {
            if (commandOutput.includes(term)) {
                break exit_if_docker_not_installed;
            }
        }
        console.log([
            `${source_default().red("Docker required.")}`,
            `Install it with Docker Desktop: ${source_default().bold.underline("https://www.docker.com/products/docker-desktop/")}`,
            `(or any other way)`
        ].join(" "));
        process.exit(1);
    }
    exit_if_docker_not_running: {
        let isDockerRunning;
        try {
            external_child_process_.execSync("docker info", { stdio: "ignore" });
            isDockerRunning = true;
        }
        catch (_f) {
            isDockerRunning = false;
        }
        if (isDockerRunning) {
            break exit_if_docker_not_running;
        }
        console.log([
            `${source_default().red("Docker daemon is not running.")}`,
            `Please start Docker Desktop and try again.`
        ].join(" "));
        process.exit(1);
    }
    const { cliCommandOptions, buildContext } = params;
    const { allSupportedTags, latestMajorTags } = await getSupportedDockerImageTags({
        buildContext
    });
    const { dockerImageTag } = await (async () => {
        if (cliCommandOptions.keycloakVersion !== undefined) {
            const cliCommandOptions_keycloakVersion = cliCommandOptions.keycloakVersion;
            if (buildContext.implementedThemeTypes.account.isImplemented &&
                buildContext.implementedThemeTypes.account.type === "Multi-Page" &&
                (cliCommandOptions_keycloakVersion.startsWith("26.0") ||
                    cliCommandOptions_keycloakVersion.startsWith("26.1"))) {
                console.error(source_default().red([
                    `Sorry, for internal technical reasons you can't test your theme`,
                    `with Keycloak 26.0 and 26.1, use 26.2 or newer.`
                ].join(" ")));
                process.exit(-1);
            }
            const tag = allSupportedTags.find(tag => tag.startsWith(cliCommandOptions_keycloakVersion));
            if (tag === undefined) {
                console.log(source_default().red([
                    `We could not find a Keycloak Docker image for ${cliCommandOptions_keycloakVersion}`,
                    `Example of valid values: --keycloak-version 26, --keycloak-version 26.0.7`
                ].join("\n")));
                process.exit(1);
            }
            return { dockerImageTag: tag };
        }
        if (buildContext.startKeycloakOptions.dockerImage !== undefined) {
            return {
                dockerImageTag: buildContext.startKeycloakOptions.dockerImage.tag
            };
        }
        console.log([
            source_default().cyan("On which version of Keycloak do you want to test your theme?"),
            source_default().gray("You can also explicitly provide the version with `npx keycloakify start-keycloak --keycloak-version 26` (or any other version)")
        ].join("\n"));
        const tag_userSelected = await (async () => {
            let tag;
            let latestMajorTags_copy = [...latestMajorTags];
            while (true) {
                const { value } = await dist_default()({
                    values: latestMajorTags_copy
                }).catch(() => {
                    process.exit(-1);
                });
                tag = value;
                {
                    const doImplementAccountMpa = buildContext.implementedThemeTypes.account.isImplemented &&
                        buildContext.implementedThemeTypes.account.type === "Multi-Page";
                    if (doImplementAccountMpa && tag.startsWith("22.")) {
                        console.log(source_default().yellow(`You are implementing a Multi-Page Account theme. Keycloak 22 is not supported, select another version`));
                        latestMajorTags_copy = latestMajorTags_copy.filter(tag => !tag.startsWith("22."));
                        continue;
                    }
                }
                const readMajor = (tag) => {
                    const major = parseInt(tag.split(".")[0]);
                    (0,assert/* assert */.h)(!isNaN(major));
                    return major;
                };
                {
                    const major = readMajor(tag);
                    const doImplementAdminTheme = buildContext.implementedThemeTypes.admin.isImplemented;
                    const getIsSupported = (major) => major >= 23;
                    if (doImplementAdminTheme && !getIsSupported(major)) {
                        console.log(source_default().yellow(`You are implementing an Admin theme. Only Keycloak 23 and later are supported, select another version`));
                        latestMajorTags_copy = latestMajorTags_copy.filter(tag => getIsSupported(readMajor(tag)));
                        continue;
                    }
                }
                {
                    const doImplementAccountSpa = buildContext.implementedThemeTypes.account.isImplemented &&
                        buildContext.implementedThemeTypes.account.type === "Single-Page";
                    const major = readMajor(tag);
                    const getIsSupported = (major) => major >= 19;
                    if (doImplementAccountSpa && !getIsSupported(major)) {
                        console.log(source_default().yellow(`You are implementing a Single-Page Account theme. Only Keycloak 19 and later are supported, select another version`));
                        latestMajorTags_copy = latestMajorTags_copy.filter(tag => getIsSupported(readMajor(tag)));
                        continue;
                    }
                }
                break;
            }
            return tag;
        })();
        console.log(`→ ${tag_userSelected}`);
        return { dockerImageTag: tag_userSelected };
    })();
    const keycloakMajorVersionNumber = (() => {
        const [wrap] = getSupportedKeycloakMajorVersions()
            .map(majorVersionNumber => ({
            majorVersionNumber,
            index: dockerImageTag.indexOf(`${majorVersionNumber}`)
        }))
            .filter(({ index }) => index !== -1)
            .sort((a, b) => a.index - b.index);
        if (wrap === undefined) {
            try {
                const version = SemVer/* SemVer.parse */.h.parse(dockerImageTag);
                console.error(source_default().yellow(`Keycloak version ${version.major} is not supported, supported versions are ${getSupportedKeycloakMajorVersions().join(", ")}`));
                process.exit(1);
            }
            catch (_a) {
                // NOTE: Latest version
                const [n] = getSupportedKeycloakMajorVersions();
                console.warn(source_default().yellow(`Could not determine the major Keycloak version number from the docker image tag ${dockerImageTag}. Assuming ${n}`));
                return n;
            }
        }
        return wrap.majorVersionNumber;
    })();
    {
        const { isAppBuildSuccess } = await appBuild({
            buildContext
        });
        if (!isAppBuildSuccess) {
            console.log(source_default().red(`App build failed, exiting. Try building your app (e.g 'npm run build') and see what's wrong.`));
            process.exit(1);
        }
        const { isKeycloakifyBuildSuccess } = await keycloakifyBuild({
            buildForKeycloakMajorVersionNumber: keycloakMajorVersionNumber,
            buildContext
        });
        if (!isKeycloakifyBuildSuccess) {
            console.log(source_default().red(`Keycloakify build failed, exiting. Try running 'npx keycloakify build' and see what's wrong.`));
            process.exit(1);
        }
    }
    const jarFilePath = external_fs_.readdirSync(buildContext.keycloakifyBuildDirPath)
        .filter(fileBasename => fileBasename.endsWith(".jar"))
        .map(fileBasename => (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, fileBasename))
        .sort((a, b) => external_fs_.statSync(b).mtimeMs - external_fs_.statSync(a).mtimeMs)[0];
    (0,assert/* assert */.h)(jarFilePath !== undefined);
    const extensionJarFilePaths = [
        ...(keycloakMajorVersionNumber <= 20
            ? (console.log(source_default().yellow("WARNING: With older version of keycloak your changes to the realm configuration are not persisted")),
                [])
            : [
                (0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "src", "bin", "start-keycloak", constants/* KEYCLOAKIFY_LOGIN_JAR_BASENAME */.Tr)
            ]),
        ...(await Promise.all(buildContext.startKeycloakOptions.extensionJars.map(async (extensionJar) => {
            switch (extensionJar.type) {
                case "path": {
                    (0,assert/* assert */.h)(await (0,fs_existsAsync/* existsAsync */.o)(extensionJar.path), `${extensionJar.path} does not exist`);
                    return extensionJar.path;
                }
                case "url": {
                    const { archiveFilePath } = await downloadAndExtractArchive({
                        cacheDirPath: buildContext.cacheDirPath,
                        fetchOptions: buildContext.fetchOptions,
                        url: extensionJar.url,
                        uniqueIdOfOnArchiveFile: "no extraction",
                        onArchiveFile: async () => { }
                    });
                    return archiveFilePath;
                }
            }
            (0,assert/* assert */.h)(false);
        })))
    ];
    let parsedKeycloakThemesJson = (0,id.id)(undefined);
    async function extractThemeResourcesFromJar() {
        await extractArchive({
            archiveFilePath: jarFilePath,
            onArchiveFile: async ({ relativeFilePathInArchive, writeFile, readFile }) => {
                if (relativeFilePathInArchive ===
                    (0,external_path_.join)("META-INF", "keycloak-themes.json") &&
                    parsedKeycloakThemesJson === undefined) {
                    parsedKeycloakThemesJson = JSON.parse((await readFile()).toString("utf8"));
                }
                if ((0,isInside/* isInside */.V)({ dirPath: "theme", filePath: relativeFilePathInArchive })) {
                    await writeFile({
                        filePath: (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, relativeFilePathInArchive)
                    });
                }
            }
        });
    }
    {
        const destDirPath = (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, "theme");
        if (await (0,fs_existsAsync/* existsAsync */.o)(destDirPath)) {
            await rm(destDirPath, { recursive: true });
        }
    }
    await extractThemeResourcesFromJar();
    (0,assert/* assert */.h)(parsedKeycloakThemesJson !== undefined);
    const { clientName, onRealmConfigChange, realmJsonFilePath, realmName, username } = await getRealmConfig({
        keycloakMajorVersionNumber,
        parsedKeycloakThemesJsonEntry: (() => {
            const entry = parsedKeycloakThemesJson.themes.find(({ name }) => name === buildContext.themeNames[0]);
            (0,assert/* assert */.h)(entry !== undefined);
            return entry;
        })(),
        realmJsonFilePath_userProvided: await (async () => {
            if (cliCommandOptions.realmJsonFilePath !== undefined) {
                return (0,getAbsoluteAndInOsFormatPath/* getAbsoluteAndInOsFormatPath */.c)({
                    pathIsh: cliCommandOptions.realmJsonFilePath,
                    cwd: process.cwd()
                });
            }
            if (buildContext.startKeycloakOptions.realmJsonFilePath !== undefined) {
                (0,assert/* assert */.h)(await (0,fs_existsAsync/* existsAsync */.o)(buildContext.startKeycloakOptions.realmJsonFilePath), `${(0,external_path_.relative)(process.cwd(), buildContext.startKeycloakOptions.realmJsonFilePath)} does not exist`);
                return buildContext.startKeycloakOptions.realmJsonFilePath;
            }
            return undefined;
        })(),
        buildContext
    });
    const jarFilePath_cacheDir = (0,external_path_.join)(buildContext.cacheDirPath, (0,external_path_.basename)(jarFilePath));
    external_fs_.copyFileSync(jarFilePath, jarFilePath_cacheDir);
    try {
        external_child_process_.execSync(`docker rm --force ${constants/* CONTAINER_NAME */.sv}`, {
            stdio: "ignore"
        });
    }
    catch (_g) { }
    const port = (_b = (_a = cliCommandOptions.port) !== null && _a !== void 0 ? _a : buildContext.startKeycloakOptions.port) !== null && _b !== void 0 ? _b : 8080;
    const doStartDevServer = (() => {
        const hasSpaUi = buildContext.implementedThemeTypes.admin.isImplemented ||
            (buildContext.implementedThemeTypes.account.isImplemented &&
                buildContext.implementedThemeTypes.account.type === "Single-Page");
        if (!hasSpaUi) {
            return false;
        }
        if (buildContext.bundler !== "vite") {
            console.log(source_default().yellow([
                `WARNING: Since you are using ${buildContext.bundler} instead of Vite,`,
                `you'll have to wait serval seconds for the changes you made on your account or admin theme to be reflected in the browser.\n`,
                `For a better development experience, consider migrating to Vite.`
            ].join(" ")));
            return false;
        }
        if (keycloakMajorVersionNumber < 25) {
            console.log(source_default().yellow([
                `WARNING: Your account or admin theme can't be tested with hot module replacement on Keycloak ${keycloakMajorVersionNumber}.`,
                `This mean that you'll have to wait serval seconds for the changes to be reflected in the browser.`,
                `For a better development experience, select a more recent version of Keycloak.`
            ].join("\n")));
            return false;
        }
        if (process.env.NO_DEV_SERVER === "true") {
            return false;
        }
        return true;
    })();
    let devServerPort = undefined;
    if (doStartDevServer) {
        const { port } = await startViteDevServer({ buildContext });
        devServerPort = port;
    }
    const SPACE_PLACEHOLDER = "SPACE_PLACEHOLDER_xKLmdPd";
    const dockerRunArgs = [
        `-p${SPACE_PLACEHOLDER}${port}:8080`,
        `--name${SPACE_PLACEHOLDER}${constants/* CONTAINER_NAME */.sv}`,
        ...(keycloakMajorVersionNumber >= 26
            ? [
                `-e${SPACE_PLACEHOLDER}KC_BOOTSTRAP_ADMIN_USERNAME=admin`,
                `-e${SPACE_PLACEHOLDER}KC_BOOTSTRAP_ADMIN_PASSWORD=admin`
            ]
            : [
                `-e${SPACE_PLACEHOLDER}KEYCLOAK_ADMIN=admin`,
                `-e${SPACE_PLACEHOLDER}KEYCLOAK_ADMIN_PASSWORD=admin`
            ]),
        ...(devServerPort === undefined
            ? []
            : [
                `-e${SPACE_PLACEHOLDER}${constants/* KEYCLOAKIFY_SPA_DEV_SERVER_PORT */.Sz}=${devServerPort}`
            ]),
        ...(buildContext.startKeycloakOptions.dockerExtraArgs.length === 0
            ? []
            : [
                buildContext.startKeycloakOptions.dockerExtraArgs.join(SPACE_PLACEHOLDER)
            ]),
        ...(realmJsonFilePath === undefined
            ? []
            : [
                `-v${SPACE_PLACEHOLDER}"${realmJsonFilePath}":/opt/keycloak/data/import/${realmName}-realm.json`
            ]),
        `-v${SPACE_PLACEHOLDER}"${jarFilePath_cacheDir}":/opt/keycloak/providers/keycloak-theme.jar`,
        ...extensionJarFilePaths.map(jarFilePath => `-v${SPACE_PLACEHOLDER}"${jarFilePath}":/opt/keycloak/providers/${(0,external_path_.basename)(jarFilePath)}`),
        ...(keycloakMajorVersionNumber <= 20
            ? [`-e${SPACE_PLACEHOLDER}JAVA_OPTS=-Dkeycloak.profile=preview`]
            : []),
        ...(keycloakMajorVersionNumber < 25
            ? [`-e${SPACE_PLACEHOLDER}KC_HOSTNAME_STRICT_HTTPS=false`]
            : []),
        ...[
            ...buildContext.themeNames,
            ...(external_fs_.existsSync((0,external_path_.join)(buildContext.keycloakifyBuildDirPath, "theme", "account-v1"))
                ? ["account-v1"]
                : [])
        ]
            .map(themeName => ({
            localDirPath: (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, "theme", themeName),
            containerDirPath: `/opt/keycloak/themes/${themeName}`
        }))
            .map(({ localDirPath, containerDirPath }) => `-v${SPACE_PLACEHOLDER}"${localDirPath}":${containerDirPath}:rw`),
        ...buildContext.environmentVariables
            .map(({ name }) => ({ name, envValue: process.env[name] }))
            .map(({ name, envValue }) => envValue === undefined ? undefined : { name, envValue })
            .filter((0,exclude/* exclude */.D)(undefined))
            .map(({ name, envValue }) => `--env${SPACE_PLACEHOLDER}${name}='${envValue.replace(/'/g, "'\\''")}'`),
        `${(_d = (_c = buildContext.startKeycloakOptions.dockerImage) === null || _c === void 0 ? void 0 : _c.reference) !== null && _d !== void 0 ? _d : "quay.io/keycloak/keycloak"}:${dockerImageTag}`,
        "start-dev",
        ...(21 <= keycloakMajorVersionNumber && keycloakMajorVersionNumber < 24
            ? ["--features=declarative-user-profile"]
            : []),
        ...(realmJsonFilePath === undefined ? [] : ["--import-realm"]),
        ...(buildContext.startKeycloakOptions.keycloakExtraArgs.length === 0
            ? []
            : [
                buildContext.startKeycloakOptions.keycloakExtraArgs.join(SPACE_PLACEHOLDER)
            ])
    ];
    console.log(source_default().blue([
        `$ docker run \\`,
        ...dockerRunArgs
            .map(arg => arg.replace(new RegExp(SPACE_PLACEHOLDER, "g"), " "))
            .map((line, i, arr) => `    ${line}${arr.length - 1 === i ? "" : " \\"}`)
    ].join("\n")));
    const child = external_child_process_.spawn("docker", ["run", ...dockerRunArgs.map(line => line.split(SPACE_PLACEHOLDER)).flat()], { shell: true });
    child.stdout.on("data", async (data) => {
        if (data.toString("utf8").includes("keycloakify-logging: REALM_CONFIG_CHANGED")) {
            await onRealmConfigChange();
            return;
        }
        process.stdout.write(data);
    });
    child.stderr.on("data", data => process.stderr.write(data));
    child.on("exit", process.exit);
    const srcDirPath = (0,external_path_.join)(buildContext.projectDirPath, "src");
    {
        const kcHttpRelativePath = (() => {
            const match = buildContext.startKeycloakOptions.dockerExtraArgs
                .join(" ")
                .match(/KC_HTTP_RELATIVE_PATH=([^ ]+)/);
            if (match === null) {
                return undefined;
            }
            return match[1];
        })();
        const handler = async (data) => {
            if (!data.toString("utf8").includes("Listening on: http://0.0.0.0:8080")) {
                return;
            }
            child.stdout.off("data", handler);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log([
                "",
                `The ftl files from ${source_default().bold(`.${external_path_.sep}${(0,external_path_.relative)(process.cwd(), (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, "theme"))}`)} are mounted in the Keycloak container.`,
                "",
                `Keycloak Admin console: ${source_default().cyan.bold(`http://localhost:${port}${kcHttpRelativePath !== null && kcHttpRelativePath !== void 0 ? kcHttpRelativePath : ""}`)}`,
                `- user:     ${source_default().cyan.bold("admin")}`,
                `- password: ${source_default().cyan.bold("admin")}`,
                "",
                "",
                `${source_default().green("Your theme is accessible at:")}`,
                `${source_default().green("➜")} ${source_default().cyan.bold((() => {
                    const url = new URL(constants/* TEST_APP_URL */.jp);
                    if (port !== 8080) {
                        url.searchParams.set("port", `${port}`);
                    }
                    if (kcHttpRelativePath !== undefined) {
                        url.searchParams.set("kcHttpRelativePath", kcHttpRelativePath);
                    }
                    if (realmName !== "myrealm") {
                        url.searchParams.set("realm", realmName);
                    }
                    if (clientName !== "myclient") {
                        url.searchParams.set("client", clientName);
                    }
                    return url.href;
                })())}`,
                "",
                "You can login with the following credentials:",
                `- username: ${source_default().cyan.bold(username)}`,
                `- password: ${source_default().cyan.bold("password123")}`,
                "",
                `Watching for changes in ${source_default().bold(`.${external_path_.sep}${(0,external_path_.relative)(process.cwd(), buildContext.projectDirPath)}`)}`
            ].join("\n"));
        };
        child.stdout.on("data", handler);
    }
    {
        const runFullBuild = runExclusive.build(async () => {
            console.log(source_default().cyan("Detected changes in the theme. Rebuilding ..."));
            const { isAppBuildSuccess } = await appBuild({
                buildContext
            });
            if (!isAppBuildSuccess) {
                return;
            }
            const { isKeycloakifyBuildSuccess } = await keycloakifyBuild({
                buildForKeycloakMajorVersionNumber: keycloakMajorVersionNumber,
                buildContext
            });
            if (!isKeycloakifyBuildSuccess) {
                return;
            }
            await extractThemeResourcesFromJar();
            console.log(source_default().green("Theme rebuilt and updated in Keycloak."));
        });
        const { waitForDebounce } = (0,tools_waitForDebounce/* waitForDebounceFactory */.z)({ delay: 400 });
        chokidar.watch([
            srcDirPath,
            buildContext.publicDirPath,
            (0,external_path_.join)(buildContext.projectDirPath, "package.json"),
            (0,external_path_.join)(buildContext.projectDirPath, "vite.config.ts"),
            (0,external_path_.join)(buildContext.projectDirPath, "vite.config.js"),
            (0,external_path_.join)(buildContext.projectDirPath, "index.html"),
            (0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "src")
        ], {
            ignoreInitial: true
        })
            .on("all", async (...[, filePath]) => {
            ignore_path_covered_by_hmr: {
                if (filePath.endsWith(".properties")) {
                    break ignore_path_covered_by_hmr;
                }
                if (!doStartDevServer) {
                    break ignore_path_covered_by_hmr;
                }
                ignore_account_spa: {
                    const doImplementAccountSpa = buildContext.implementedThemeTypes.account.isImplemented &&
                        buildContext.implementedThemeTypes.account.type ===
                            "Single-Page";
                    if (!doImplementAccountSpa) {
                        break ignore_account_spa;
                    }
                    if (!(0,isInside/* isInside */.V)({
                        dirPath: (0,external_path_.join)(buildContext.themeSrcDirPath, "account"),
                        filePath
                    })) {
                        break ignore_account_spa;
                    }
                    return;
                }
                ignore_admin: {
                    if (!buildContext.implementedThemeTypes.admin.isImplemented) {
                        break ignore_admin;
                    }
                    if (!(0,isInside/* isInside */.V)({
                        dirPath: (0,external_path_.join)(buildContext.themeSrcDirPath, "admin"),
                        filePath
                    })) {
                        break ignore_admin;
                    }
                    return;
                }
                ignore_patternfly: {
                    if (!(0,isInside/* isInside */.V)({
                        dirPath: (0,external_path_.join)(buildContext.themeSrcDirPath, "shared", "@patternfly"),
                        filePath
                    })) {
                        break ignore_patternfly;
                    }
                    return;
                }
                ignore_keycloak_ui_shared: {
                    if (!(0,isInside/* isInside */.V)({
                        dirPath: (0,external_path_.join)(buildContext.themeSrcDirPath, "shared", "keycloak-ui-shared"),
                        filePath
                    })) {
                        break ignore_keycloak_ui_shared;
                    }
                    return;
                }
            }
            console.log(`Detected changes in ${filePath}`);
            await waitForDebounce();
            runFullBuild();
        });
    }
}
//# sourceMappingURL=start-keycloak.js.map
;// CONCATENATED MODULE: ./dist/bin/start-keycloak/index.js

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 12171:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ SemVer)
/* harmony export */ });
var SemVer;
(function (SemVer) {
    const bumpTypes = ["major", "minor", "patch", "rc", "no bump"];
    function parse(versionStr) {
        const match = versionStr.match(/^v?([0-9]+)\.([0-9]+)(?:\.([0-9]+))?(?:-rc.([0-9]+))?$/);
        if (!match) {
            throw new Error(`${versionStr} is not a valid semantic version`);
        }
        const semVer = Object.assign({ major: parseInt(match[1]), minor: parseInt(match[2]), patch: (() => {
                const str = match[3];
                return str === undefined ? 0 : parseInt(str);
            })() }, (() => {
            const str = match[4];
            return str === undefined ? {} : { rc: parseInt(str) };
        })());
        const initialStr = stringify(semVer);
        Object.defineProperty(semVer, "parsedFrom", {
            enumerable: true,
            get: function () {
                const currentStr = stringify(this);
                if (currentStr !== initialStr) {
                    throw new Error(`SemVer.parsedFrom can't be read anymore, the version have been modified from ${initialStr} to ${currentStr}`);
                }
                return versionStr;
            }
        });
        return semVer;
    }
    SemVer.parse = parse;
    function stringify(v) {
        return `${v.major}.${v.minor}.${v.patch}${v.rc === undefined ? "" : `-rc.${v.rc}`}`;
    }
    SemVer.stringify = stringify;
    /**
     *
     * v1  <  v2  => -1
     * v1 === v2  => 0
     * v1  >  v2  => 1
     *
     */
    function compare(v1, v2) {
        const sign = (diff) => (diff === 0 ? 0 : diff < 0 ? -1 : 1);
        const noUndefined = (n) => n !== null && n !== void 0 ? n : Infinity;
        for (const level of ["major", "minor", "patch", "rc"]) {
            if (noUndefined(v1[level]) !== noUndefined(v2[level])) {
                return sign(noUndefined(v1[level]) - noUndefined(v2[level]));
            }
        }
        return 0;
    }
    SemVer.compare = compare;
    /*
    console.log(compare(parse("3.0.0-rc.3"), parse("3.0.0")) === -1 )
    console.log(compare(parse("3.0.0-rc.3"), parse("3.0.0-rc.4")) === -1 )
    console.log(compare(parse("3.0.0-rc.3"), parse("4.0.0")) === -1 )
    */
    function bumpType(params) {
        const versionAhead = typeof params.versionAhead === "string"
            ? parse(params.versionAhead)
            : params.versionAhead;
        const versionBehind = typeof params.versionBehind === "string"
            ? parse(params.versionBehind)
            : params.versionBehind;
        if (compare(versionBehind, versionAhead) === 1) {
            throw new Error(`Version regression ${stringify(versionBehind)} -> ${stringify(versionAhead)}`);
        }
        for (const level of ["major", "minor", "patch", "rc"]) {
            if (versionBehind[level] !== versionAhead[level]) {
                return level;
            }
        }
        return "no bump";
    }
    SemVer.bumpType = bumpType;
})(SemVer || (SemVer = {}));
//# sourceMappingURL=SemVer.js.map

/***/ }),

/***/ 43765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ existsAsync)
/* harmony export */ });
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_0__);

async function existsAsync(path) {
    try {
        await fs_promises__WEBPACK_IMPORTED_MODULE_0__.stat(path);
        return true;
    }
    catch (error) {
        if (error.code === "ENOENT")
            return false;
        throw error;
    }
}
//# sourceMappingURL=fs.existsAsync.js.map

/***/ }),

/***/ 93721:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "p": () => (/* binding */ getInstalledModuleDirPath)
});

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: ./dist/bin/tools/fs.existsAsync.js
var fs_existsAsync = __webpack_require__(43765);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
;// CONCATENATED MODULE: ./dist/bin/tools/isRootPath.js

function getIsRootPath(filePath) {
    const path_normalized = (0,external_path_.normalize)(filePath);
    // Unix-like root ("/")
    if (path_normalized === "/") {
        return true;
    }
    // Check for Windows drive root (e.g., "C:\\")
    if (/^[a-zA-Z]:\\$/.test(path_normalized)) {
        return true;
    }
    // Check for UNC root (e.g., "\\server\share")
    if (/^\\\\[^\\]+\\[^\\]+\\?$/.test(path_normalized)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=isRootPath.js.map
;// CONCATENATED MODULE: ./dist/bin/tools/getInstalledModuleDirPath.js





async function getInstalledModuleDirPath(params) {
    const { moduleName, packageJsonDirPath } = params;
    {
        let dirPath = packageJsonDirPath;
        while (true) {
            const dirPath_candidate = (0,external_path_.join)(dirPath, "node_modules", ...moduleName.split("/"));
            let doesExist;
            try {
                doesExist = await (0,fs_existsAsync/* existsAsync */.o)(dirPath_candidate);
            }
            catch (_a) {
                doesExist = false;
            }
            if (doesExist) {
                return dirPath_candidate;
            }
            if (getIsRootPath(dirPath)) {
                break;
            }
            dirPath = (0,external_path_.join)(dirPath, "..");
        }
    }
    const dirPath = external_child_process_.execSync(`npm list ${moduleName}`, {
        cwd: packageJsonDirPath
    })
        .toString("utf8")
        .trim();
    (0,assert/* assert */.h)(dirPath !== "");
    return dirPath;
}
//# sourceMappingURL=getInstalledModuleDirPath.js.map

/***/ }),

/***/ 90665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ isInside)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);

function isInside(params) {
    const { dirPath, filePath } = params;
    return !(0,path__WEBPACK_IMPORTED_MODULE_0__.relative)(dirPath, filePath).startsWith("..");
}
//# sourceMappingURL=isInside.js.map

/***/ }),

/***/ 73776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ getNodeModulesBinDirPath)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58822);
/* harmony import */ var _getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93721);
/* harmony import */ var _fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43765);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49622);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29041);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38469);








let cache_bestEffort = undefined;
/** NOTE: Careful, this function can fail when the binary
 *  Used is not in the node_modules directory of the project
 * (for example when running tests with vscode extension we'll get
 * '/Users/dylan/.vscode/extensions/vitest.explorer-1.16.0/dist/worker.js'
 *
 * instead of
 * '/Users/joseph/.nvm/versions/node/v22.12.0/bin/node'
 * or
 * '/Users/joseph/github/keycloakify-starter/node_modules/.bin/vite'
 *
 * as the value of process.argv[1]
 */
function getNodeModulesBinDirPath_bestEffort() {
    if (cache_bestEffort !== undefined) {
        return cache_bestEffort;
    }
    const binPath = process.argv[1];
    special_case_running_not_from_distribution: {
        if (!binPath.endsWith(".ts")) {
            break special_case_running_not_from_distribution;
        }
        const packageJsonDirPath = (0,_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_1__/* .getNearestPackageJsonDirPath */ .B)((0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(binPath));
        const nodeModulesBinDirPath = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(packageJsonDirPath, "node_modules", ".bin");
        return nodeModulesBinDirPath;
    }
    const segments = [".bin"];
    let foundNodeModules = false;
    for (const segment of binPath.split(path__WEBPACK_IMPORTED_MODULE_0__.sep).reverse()) {
        skip_segment: {
            if (foundNodeModules) {
                break skip_segment;
            }
            if (segment === "node_modules") {
                foundNodeModules = true;
                break skip_segment;
            }
            continue;
        }
        segments.unshift(segment);
    }
    if (!foundNodeModules) {
        throw new Error(`Could not find node_modules in path ${binPath}`);
    }
    const nodeModulesBinDirPath = segments.join(path__WEBPACK_IMPORTED_MODULE_0__.sep);
    cache_bestEffort = nodeModulesBinDirPath;
    return nodeModulesBinDirPath;
}
let cache_withPackageJsonFileDirPath = undefined;
async function getNodeModulesBinDirPath_withPackageJsonFileDirPath(params) {
    const { packageJsonFilePath } = params;
    use_cache: {
        if (cache_withPackageJsonFileDirPath === undefined) {
            break use_cache;
        }
        if (cache_withPackageJsonFileDirPath.packageJsonFilePath !== packageJsonFilePath) {
            cache_withPackageJsonFileDirPath = undefined;
            break use_cache;
        }
        return cache_withPackageJsonFileDirPath.nodeModulesBinDirPath;
    }
    // [...]node_modules/keycloakify
    const installedModuleDirPath = await (0,_getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_2__/* .getInstalledModuleDirPath */ .p)({
        // Here it will always be "keycloakify" but since we are in tools/ we make something generic
        moduleName: await (async () => {
            const zParsedPackageJson = (() => {
                const zTargetType = zod__WEBPACK_IMPORTED_MODULE_6__/* .object */ .Ry({
                    name: zod__WEBPACK_IMPORTED_MODULE_6__/* .string */ .Z_()
                });
                tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h;
                return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(zTargetType);
            })();
            const parsedPackageJson = JSON.parse((await fs_promises__WEBPACK_IMPORTED_MODULE_4__.readFile((0,path__WEBPACK_IMPORTED_MODULE_0__.join)((0,_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_1__/* .getThisCodebaseRootDirPath */ .e)(), "package.json"))).toString("utf8"));
            zParsedPackageJson.parse(parsedPackageJson);
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_5__.is)(parsedPackageJson));
            return parsedPackageJson.name;
        })(),
        packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_0__.dirname)(packageJsonFilePath)
    });
    const segments = installedModuleDirPath.split(path__WEBPACK_IMPORTED_MODULE_0__.sep);
    while (true) {
        const segment = segments.pop();
        if (segment === undefined) {
            throw new Error(`Could not find .bin directory relative to ${packageJsonFilePath}`);
        }
        if (segment !== "node_modules") {
            continue;
        }
        const candidate = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(segments.join(path__WEBPACK_IMPORTED_MODULE_0__.sep), segment, ".bin");
        if (!(await (0,_fs_existsAsync__WEBPACK_IMPORTED_MODULE_3__/* .existsAsync */ .o)(candidate))) {
            continue;
        }
        cache_withPackageJsonFileDirPath = {
            packageJsonFilePath,
            nodeModulesBinDirPath: candidate
        };
        break;
    }
    return cache_withPackageJsonFileDirPath.nodeModulesBinDirPath;
}
function getNodeModulesBinDirPath(params) {
    const { packageJsonFilePath } = params !== null && params !== void 0 ? params : {};
    return packageJsonFilePath === undefined
        ? getNodeModulesBinDirPath_bestEffort()
        : getNodeModulesBinDirPath_withPackageJsonFileDirPath({ packageJsonFilePath });
}
//# sourceMappingURL=nodeModulesBinDirPath.js.map

/***/ }),

/***/ 48433:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LG": () => (/* binding */ getPrettier),
/* harmony export */   "MT": () => (/* binding */ getIsPrettierAvailable),
/* harmony export */   "eY": () => (/* binding */ runPrettier)
/* harmony export */ });
/* harmony import */ var _nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73776);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38469);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29041);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tsafe_symToStr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(76030);
/* harmony import */ var _readThisNpmPackageVersion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(64795);
/* module decorator */ module = __webpack_require__.hmd(module);









getIsPrettierAvailable.cache = (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(undefined);
async function getIsPrettierAvailable() {
    var _a;
    if (getIsPrettierAvailable.cache !== undefined) {
        return getIsPrettierAvailable.cache;
    }
    const nodeModulesBinDirPath = (0,_nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getNodeModulesBinDirPath */ .K)({
        packageJsonFilePath: undefined
    });
    const prettierBinPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(nodeModulesBinDirPath, "prettier");
    const stats = await fs_promises__WEBPACK_IMPORTED_MODULE_2__.stat(prettierBinPath).catch(() => undefined);
    const isPrettierAvailable = (_a = stats === null || stats === void 0 ? void 0 : stats.isFile()) !== null && _a !== void 0 ? _a : false;
    getIsPrettierAvailable.cache = isPrettierAvailable;
    return isPrettierAvailable;
}
getPrettier.cache = (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(undefined);
async function getPrettier() {
    (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(getIsPrettierAvailable());
    if (getPrettier.cache !== undefined) {
        return getPrettier.cache;
    }
    let prettier = (0,tsafe_id__WEBPACK_IMPORTED_MODULE_7__.id)(undefined);
    import_prettier: {
        // NOTE: When module is linked we want to make sure we import the correct version
        // of prettier, that is the one of the project, not the one of this repo.
        // So we do a sketchy eval to bypass ncc.
        // We make sure to only do that when linking, otherwise we import properly.
        if ((0,_readThisNpmPackageVersion__WEBPACK_IMPORTED_MODULE_6__/* .readThisNpmPackageVersion */ .K)().startsWith("0.0.0")) {
            const prettierDirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.resolve)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getNodeModulesBinDirPath */ .K)({ packageJsonFilePath: undefined }), "..", "prettier"));
            const isCJS =  true && module.exports;
            if (isCJS) {
                eval(`${(0,tsafe_symToStr__WEBPACK_IMPORTED_MODULE_8__/* .symToStr */ .r)({ prettier })} = require("${prettierDirPath}")`);
            }
            else {
                prettier = await new Promise(_resolve => {
                    eval(`import("file:///${(0,path__WEBPACK_IMPORTED_MODULE_1__.join)(prettierDirPath, "index.mjs").replace(/\\/g, "/")}").then(prettier => _resolve(prettier))`);
                });
            }
            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__/* .assert */ .h)(!(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_3__.is)(prettier));
            break import_prettier;
        }
        prettier = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 79421, 23));
    }
    const configHash = await (async () => {
        const configFilePath = await prettier.resolveConfigFile((0,path__WEBPACK_IMPORTED_MODULE_1__.join)((0,_nodeModulesBinDirPath__WEBPACK_IMPORTED_MODULE_0__/* .getNodeModulesBinDirPath */ .K)({ packageJsonFilePath: undefined }), "..", ".."));
        if (configFilePath === null) {
            return "";
        }
        const data = await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(configFilePath);
        return crypto__WEBPACK_IMPORTED_MODULE_5__.createHash("sha256").update(data).digest("hex");
    })();
    const prettierAndConfig = {
        prettier,
        configHash
    };
    getPrettier.cache = prettierAndConfig;
    return prettierAndConfig;
}
async function runPrettier(params) {
    const { sourceCode, filePath } = params;
    let formattedSourceCode;
    try {
        const { prettier } = await getPrettier();
        const { ignored, inferredParser } = await prettier.getFileInfo(filePath, {
            resolveConfig: true
        });
        if (ignored || inferredParser === null) {
            return sourceCode;
        }
        const config = await prettier.resolveConfig(filePath);
        formattedSourceCode = await prettier.format(typeof sourceCode === "string" ? sourceCode : sourceCode.toString("utf8"), Object.assign(Object.assign({}, config), { filePath, parser: inferredParser }));
    }
    catch (error) {
        console.log(chalk__WEBPACK_IMPORTED_MODULE_4___default().red(`You probably need to upgrade the version of prettier in your project`));
        throw error;
    }
    return typeof sourceCode === "string"
        ? formattedSourceCode
        : Buffer.from(formattedSourceCode, "utf8");
}
//# sourceMappingURL=runPrettier.js.map

/***/ })

};
;