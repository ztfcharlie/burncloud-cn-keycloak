"use strict";
exports.id = 930;
exports.ids = [930];
exports.modules = {

/***/ 71930:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "command": () => (/* binding */ command)
/* harmony export */ });
/* harmony import */ var _sync_extensions_getExtensionModuleFileSourceCodeReadyToBeCopied__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2237);
/* harmony import */ var _sync_extensions_sync_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91097);
/* harmony import */ var _sync_extensions_managedGitignoreFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86087);
/* harmony import */ var _sync_extensions_extensionModuleMeta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(77372);
/* harmony import */ var _tools_getAbsoluteAndInOsFormatPath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84794);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tools_getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93721);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _tools_isInside__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(90665);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(173);
/* harmony import */ var evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(33805);
/* harmony import */ var evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(78818);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_11__);












async function command(params) {
    const { buildContext, cliCommandOptions } = params;
    const extensionModuleMetas = await (0,_sync_extensions_extensionModuleMeta__WEBPACK_IMPORTED_MODULE_3__/* .getExtensionModuleMetas */ .f)({ buildContext });
    const { targetFileRelativePathsByExtensionModuleMeta } = await (async () => {
        const fileOrDirectoryRelativePath = (() => {
            const dirPath_ctx = cliCommandOptions.isPublic
                ? (0,path__WEBPACK_IMPORTED_MODULE_5__.join)(buildContext.publicDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_9__/* .KEYCLOAK_THEME */ .PC)
                : buildContext.themeSrcDirPath;
            return (0,path__WEBPACK_IMPORTED_MODULE_5__.relative)(dirPath_ctx, (0,_tools_getAbsoluteAndInOsFormatPath__WEBPACK_IMPORTED_MODULE_4__/* .getAbsoluteAndInOsFormatPath */ .c)({
                cwd: dirPath_ctx,
                pathIsh: cliCommandOptions.path
            }));
        })();
        const arr = extensionModuleMetas
            .map(extensionModuleMeta => ({
            extensionModuleMeta,
            fileRelativePaths: extensionModuleMeta.files
                .filter(({ fileRelativePath, isPublic }) => cliCommandOptions.isPublic === isPublic &&
                (fileRelativePath === fileOrDirectoryRelativePath ||
                    (0,_tools_isInside__WEBPACK_IMPORTED_MODULE_8__/* .isInside */ .V)({
                        dirPath: fileOrDirectoryRelativePath,
                        filePath: fileRelativePath
                    })))
                .map(({ fileRelativePath }) => fileRelativePath)
        }))
            .filter(({ fileRelativePaths }) => fileRelativePaths.length !== 0);
        const targetFileRelativePathsByExtensionModuleMeta = new Map();
        for (const { extensionModuleMeta, fileRelativePaths } of arr) {
            targetFileRelativePathsByExtensionModuleMeta.set(extensionModuleMeta, fileRelativePaths);
        }
        return { targetFileRelativePathsByExtensionModuleMeta };
    })();
    if (targetFileRelativePathsByExtensionModuleMeta.size === 0) {
        console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().yellow("There is no Keycloakify extension modules files matching the provided path."));
        process.exit(1);
    }
    const { ownedFilesRelativePaths: ownedFilesRelativePaths_current } = await (0,_sync_extensions_managedGitignoreFiles__WEBPACK_IMPORTED_MODULE_2__/* .readManagedGitignoresFile */ .P)({
        buildContext
    });
    await (cliCommandOptions.isRevert ? command_revert : command_own)({
        extensionModuleMetas,
        isPublic: cliCommandOptions.isPublic,
        targetFileRelativePathsByExtensionModuleMeta,
        ownedFilesRelativePaths_current,
        buildContext
    });
}
async function command_own(params) {
    const { extensionModuleMetas, isPublic, targetFileRelativePathsByExtensionModuleMeta, ownedFilesRelativePaths_current, buildContext } = params;
    await (0,_sync_extensions_managedGitignoreFiles__WEBPACK_IMPORTED_MODULE_2__/* .writeManagedGitignoreFiles */ .F)({
        buildContext,
        extensionModuleMetas,
        ownedFilesRelativePaths: [
            ...ownedFilesRelativePaths_current,
            ...Array.from(targetFileRelativePathsByExtensionModuleMeta.values())
                .flat()
                .filter(fileRelativePath => !ownedFilesRelativePaths_current.some(entry => (0,evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10__.same)(entry, { isPublic, fileRelativePath })))
                .map(fileRelativePath => ({ isPublic, fileRelativePath }))
        ]
    });
    const writeActions = [];
    for (const [extensionModuleMeta, fileRelativePaths] of targetFileRelativePathsByExtensionModuleMeta.entries()) {
        const extensionModuleDirPath = await (0,_tools_getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_6__/* .getInstalledModuleDirPath */ .p)({
            moduleName: extensionModuleMeta.moduleName,
            packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_5__.dirname)(buildContext.packageJsonFilePath)
        });
        for (const fileRelativePath of fileRelativePaths) {
            if (ownedFilesRelativePaths_current.some(entry => (0,evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10__.same)(entry, { isPublic, fileRelativePath }))) {
                console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().grey(`You already have ownership over '${fileRelativePath}'.`));
                continue;
            }
            writeActions.push(async () => {
                const sourceCode = await (0,_sync_extensions_getExtensionModuleFileSourceCodeReadyToBeCopied__WEBPACK_IMPORTED_MODULE_0__/* .getExtensionModuleFileSourceCodeReadyToBeCopied */ .p)({
                    buildContext,
                    isPublic,
                    fileRelativePath,
                    isOwnershipAction: true,
                    extensionModuleName: extensionModuleMeta.moduleName,
                    extensionModuleDirPath,
                    extensionModuleVersion: extensionModuleMeta.version
                });
                await fs_promises__WEBPACK_IMPORTED_MODULE_7__.writeFile((0,path__WEBPACK_IMPORTED_MODULE_5__.join)(isPublic
                    ? (0,path__WEBPACK_IMPORTED_MODULE_5__.join)(buildContext.publicDirPath, _shared_constants__WEBPACK_IMPORTED_MODULE_9__/* .KEYCLOAK_THEME */ .PC)
                    : buildContext.themeSrcDirPath, fileRelativePath), sourceCode);
                console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().green(`Ownership over '${fileRelativePath}' claimed.`));
            });
        }
    }
    if (writeActions.length === 0) {
        console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().yellow("No new file claimed."));
        return;
    }
    await Promise.all(writeActions.map(action => action()));
}
async function command_revert(params) {
    const { extensionModuleMetas, isPublic, targetFileRelativePathsByExtensionModuleMeta, ownedFilesRelativePaths_current, buildContext } = params;
    const ownedFilesRelativePaths_toRemove = Array.from(targetFileRelativePathsByExtensionModuleMeta.values())
        .flat()
        .filter(fileRelativePath => {
        if (!ownedFilesRelativePaths_current.some(entry => (0,evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10__.same)(entry, { isPublic, fileRelativePath }))) {
            console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().grey(`Ownership over '${fileRelativePath}' wasn't claimed.`));
            return false;
        }
        console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().green(`Ownership over '${fileRelativePath}' relinquished.`));
        return true;
    });
    if (ownedFilesRelativePaths_toRemove.length === 0) {
        console.log(chalk__WEBPACK_IMPORTED_MODULE_11___default().yellow("No file relinquished."));
        return;
    }
    await (0,_sync_extensions_managedGitignoreFiles__WEBPACK_IMPORTED_MODULE_2__/* .writeManagedGitignoreFiles */ .F)({
        buildContext,
        extensionModuleMetas,
        ownedFilesRelativePaths: ownedFilesRelativePaths_current.filter(entry => !ownedFilesRelativePaths_toRemove.some(fileRelativePath => (0,evt_tools_inDepth_same__WEBPACK_IMPORTED_MODULE_10__.same)(entry, { isPublic, fileRelativePath })))
    });
    await (0,_sync_extensions_sync_extension__WEBPACK_IMPORTED_MODULE_1__/* .command */ .W)({ buildContext });
}
//# sourceMappingURL=own.js.map

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

/***/ })

};
;