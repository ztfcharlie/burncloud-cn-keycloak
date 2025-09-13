"use strict";
exports.id = 712;
exports.ids = [712];
exports.modules = {

/***/ 73817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ generateMessageProperties)
/* harmony export */ });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(173);
/* harmony import */ var _tools_crawl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73036);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsafe_symToStr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(76030);
/* harmony import */ var recast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48128);
/* harmony import */ var _babel_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(85026);
/* harmony import */ var _babel_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92332);
/* harmony import */ var _babel_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7912);
/* harmony import */ var _babel_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tools_escapeStringForPropertiesFile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(27190);
/* harmony import */ var _tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(58822);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(29041);
/* harmony import */ var _tools_getAbsoluteAndInOsFormatPath__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(84794);
/* harmony import */ var json5__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(86904);
/* harmony import */ var json5__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(json5__WEBPACK_IMPORTED_MODULE_11__);














(0,tsafe_assert__WEBPACK_IMPORTED_MODULE_9__/* .assert */ .h)();
function generateMessageProperties(params) {
    const { buildContext, themeType } = params;
    const baseMessagesDirPath = (0,path__WEBPACK_IMPORTED_MODULE_2__.join)((0,_tools_getThisCodebaseRootDirPath__WEBPACK_IMPORTED_MODULE_7__/* .getThisCodebaseRootDirPath */ .e)(), "src", themeType, "i18n", "messages_defaultSet");
    const messages_defaultSet_by_languageTag_defaultSet = Object.fromEntries(fs__WEBPACK_IMPORTED_MODULE_8__.readdirSync(baseMessagesDirPath)
        .filter(basename => basename !== "index.ts" && basename !== "types.ts")
        .map(basename => ({
        languageTag: basename.replace(/\.ts$/, ""),
        filePath: (0,path__WEBPACK_IMPORTED_MODULE_2__.join)(baseMessagesDirPath, basename)
    }))
        .map(({ languageTag, filePath }) => {
        const lines = fs__WEBPACK_IMPORTED_MODULE_8__.readFileSync(filePath).toString("utf8").split(/\r?\n/);
        let messagesJson = "{";
        let isInDeclaration = false;
        for (const line of lines) {
            if (!isInDeclaration) {
                if (line.startsWith("const messages")) {
                    isInDeclaration = true;
                }
                continue;
            }
            if (line.startsWith("}")) {
                messagesJson += "}";
                break;
            }
            messagesJson += line;
        }
        const messages = json5__WEBPACK_IMPORTED_MODULE_11___default().parse(messagesJson);
        return [languageTag, messages];
    }));
    const { i18nTsFilePath } = (() => {
        let files = (0,_tools_crawl__WEBPACK_IMPORTED_MODULE_1__/* .crawl */ .J)({
            dirPath: (0,path__WEBPACK_IMPORTED_MODULE_2__.join)(buildContext.themeSrcDirPath, themeType),
            returnedPathsType: "absolute"
        });
        files = files.filter(file => {
            const regex = /\.(js|ts|tsx)$/;
            return regex.test(file);
        });
        files = files.sort((a, b) => {
            const regex = /\.i18n\.(ts|js|tsx)$/;
            const aIsI18nFile = regex.test(a);
            const bIsI18nFile = regex.test(b);
            return aIsI18nFile === bIsI18nFile ? 0 : aIsI18nFile ? -1 : 1;
        });
        files = files.sort((a, b) => a.length - b.length);
        files = files.filter(file => fs__WEBPACK_IMPORTED_MODULE_8__.readFileSync(file).toString("utf8").includes("i18nBuilder"));
        const i18nTsFilePath = files[0];
        return { i18nTsFilePath };
    })();
    const i18nTsRoot = (() => {
        if (i18nTsFilePath === undefined) {
            return undefined;
        }
        const root = recastParseTs(i18nTsFilePath);
        return root;
    })();
    const messages_defaultSet_by_languageTag_notInDefaultSet = (() => {
        if (i18nTsRoot === undefined) {
            return undefined;
        }
        let extraLanguageEntryByLanguageTag = {};
        recast__WEBPACK_IMPORTED_MODULE_3__/* .visit */ .Vn(i18nTsRoot, {
            visitCallExpression: function (path) {
                const node = path.node;
                // Check if the callee is a MemberExpression with property 'withExtraLanguages'
                if (node.callee.type === "MemberExpression" &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "withExtraLanguages") {
                    const arg = node.arguments[0];
                    if (arg && arg.type === "ObjectExpression") {
                        // Iterate over the properties of the object
                        arg.properties.forEach(prop => {
                            if (prop.type === "ObjectProperty") {
                                if (prop.key.type !== "Identifier" &&
                                    prop.key.type !== "StringLiteral") {
                                    return;
                                }
                                const lang = prop.key.type === "Identifier"
                                    ? prop.key.name
                                    : prop.key.value;
                                const value = prop.value;
                                if (value.type === "ObjectExpression") {
                                    let label = undefined;
                                    let pathStr = undefined;
                                    // Iterate over the properties of the language object
                                    value.properties.forEach(p => {
                                        if (p.type === "ObjectProperty" &&
                                            p.key.type === "Identifier") {
                                            if (p.key.name === "label" &&
                                                p.value.type === "StringLiteral") {
                                                label = p.value.value;
                                            }
                                            if (p.key.name === "getMessages" &&
                                                (p.value.type ===
                                                    "ArrowFunctionExpression" ||
                                                    p.value.type === "FunctionExpression")) {
                                                // Extract the import path from the function body
                                                const body = p.value.body;
                                                if (body.type === "CallExpression" &&
                                                    body.callee.type === "Import") {
                                                    const importArg = body.arguments[0];
                                                    if (importArg.type === "StringLiteral") {
                                                        pathStr = importArg.value;
                                                    }
                                                }
                                                else if (body.type === "BlockStatement") {
                                                    // If the function body is a block (e.g., function with braces {})
                                                    // Look for return statement
                                                    body.body.forEach(statement => {
                                                        if (statement.type ===
                                                            "ReturnStatement" &&
                                                            statement.argument &&
                                                            statement.argument.type ===
                                                                "CallExpression" &&
                                                            statement.argument.callee
                                                                .type === "Import") {
                                                            const importArg = statement.argument
                                                                .arguments[0];
                                                            if (importArg.type ===
                                                                "StringLiteral") {
                                                                pathStr = importArg.value;
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    if (label && pathStr) {
                                        extraLanguageEntryByLanguageTag[lang] = {
                                            label,
                                            path: pathStr
                                        };
                                    }
                                }
                            }
                        });
                    }
                    return false; // Stop traversing this path
                }
                this.traverse(path); // Continue traversing other paths
            }
        });
        const messages_defaultSet_by_languageTag_notInDefaultSet = Object.fromEntries(Object.entries(extraLanguageEntryByLanguageTag).map(([languageTag, { path: relativePathWithoutExt }]) => [
            languageTag,
            (() => {
                const filePath = (0,_tools_getAbsoluteAndInOsFormatPath__WEBPACK_IMPORTED_MODULE_10__/* .getAbsoluteAndInOsFormatPath */ .c)({
                    pathIsh: relativePathWithoutExt.endsWith(".ts")
                        ? relativePathWithoutExt
                        : `${relativePathWithoutExt}.ts`,
                    cwd: (0,path__WEBPACK_IMPORTED_MODULE_2__.dirname)(i18nTsFilePath)
                });
                const root = recastParseTs(filePath);
                let declarationCode = "";
                recast__WEBPACK_IMPORTED_MODULE_3__/* .visit */ .Vn(root, {
                    visitVariableDeclarator: function (path) {
                        const node = path.node;
                        // Check if the variable name is 'messages'
                        if (node.id.type === "Identifier" &&
                            node.id.name === "messages") {
                            // Ensure there is an initializer
                            if (node.init) {
                                // Generate code from the initializer, preserving comments
                                declarationCode = recast__WEBPACK_IMPORTED_MODULE_3__/* .print */ .S0(node.init)
                                    .code.replace(/}.*$/, "}");
                            }
                            return false; // Stop traversing this path
                        }
                        this.traverse(path); // Continue traversing other paths
                    }
                });
                (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_9__/* .assert */ .h)(declarationCode !== undefined, `${filePath} does not contain a 'messages' variable declaration`);
                let messages = {};
                try {
                    eval(`${(0,tsafe_symToStr__WEBPACK_IMPORTED_MODULE_12__/* .symToStr */ .r)({ messages })} = ${declarationCode};`);
                }
                catch (_a) {
                    throw new Error(`The declaration of 'message' in ${filePath} cannot be statically evaluated: ${declarationCode}`);
                }
                return messages;
            })()
        ]));
        return messages_defaultSet_by_languageTag_notInDefaultSet;
    })();
    const messages_defaultSet_by_languageTag = Object.assign(Object.assign({}, messages_defaultSet_by_languageTag_defaultSet), messages_defaultSet_by_languageTag_notInDefaultSet);
    const messages_themeDefined_by_languageTag = (() => {
        if (i18nTsRoot === undefined) {
            return undefined;
        }
        let firstArgumentCode = undefined;
        recast__WEBPACK_IMPORTED_MODULE_3__/* .visit */ .Vn(i18nTsRoot, {
            visitCallExpression: function (path) {
                const node = path.node;
                if (node.callee.type === "MemberExpression" &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "withCustomTranslations") {
                    firstArgumentCode = (0,_babel_generator__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP)(node.arguments[0]).code;
                    return false;
                }
                this.traverse(path);
            }
        });
        if (firstArgumentCode === undefined) {
            return undefined;
        }
        let messages_themeDefined_by_languageTag = {};
        try {
            eval(`${(0,tsafe_symToStr__WEBPACK_IMPORTED_MODULE_12__/* .symToStr */ .r)({ messages_themeDefined_by_languageTag })} = ${firstArgumentCode}`);
        }
        catch (_a) {
            console.warn([
                "WARNING: The argument of withCustomTranslations can't be statically evaluated!",
                "This needs to be fixed refer to the documentation: https://docs.keycloakify.dev/i18n",
                firstArgumentCode
            ].join(" "));
            return undefined;
        }
        return messages_themeDefined_by_languageTag;
    })();
    const languageTags = Object.keys(messages_defaultSet_by_languageTag);
    return {
        languageTags,
        writeMessagePropertiesFiles: ({ messageDirPath, themeName }) => {
            for (const languageTag of languageTags) {
                const messages = Object.assign({}, messages_defaultSet_by_languageTag[languageTag]);
                add_theme_defined_messages: {
                    if (messages_themeDefined_by_languageTag === undefined) {
                        break add_theme_defined_messages;
                    }
                    let messages_themeDefined = messages_themeDefined_by_languageTag[languageTag];
                    if (messages_themeDefined === undefined) {
                        messages_themeDefined =
                            messages_themeDefined_by_languageTag[_shared_constants__WEBPACK_IMPORTED_MODULE_0__/* .FALLBACK_LANGUAGE_TAG */ ._L];
                    }
                    if (messages_themeDefined === undefined) {
                        messages_themeDefined =
                            messages_themeDefined_by_languageTag[Object.keys(messages_themeDefined_by_languageTag)[0]];
                    }
                    if (messages_themeDefined === undefined) {
                        break add_theme_defined_messages;
                    }
                    for (const [key, messageOrMessageByThemeName] of Object.entries(messages_themeDefined)) {
                        const message = (() => {
                            if (typeof messageOrMessageByThemeName === "string") {
                                return messageOrMessageByThemeName;
                            }
                            const message = messageOrMessageByThemeName[themeName];
                            (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_9__/* .assert */ .h)(message !== undefined);
                            return message;
                        })();
                        messages[key] = message;
                    }
                }
                const propertiesFileSource = [
                    "",
                    ...Object.entries(messages).map(([key, value]) => `${key}=${(0,_tools_escapeStringForPropertiesFile__WEBPACK_IMPORTED_MODULE_13__/* .escapeStringForPropertiesFile */ .y)(value)}`),
                    ""
                ].join("\n");
                fs__WEBPACK_IMPORTED_MODULE_8__.mkdirSync(messageDirPath, { recursive: true });
                fs__WEBPACK_IMPORTED_MODULE_8__.writeFileSync((0,path__WEBPACK_IMPORTED_MODULE_2__.join)(messageDirPath, `messages_${languageTag.replace(/\-/g, "_")}.properties`), Buffer.from(propertiesFileSource, "utf8"));
            }
        }
    };
}
function recastParseTs(filePath) {
    return recast__WEBPACK_IMPORTED_MODULE_3__/* .parse */ .Qc(fs__WEBPACK_IMPORTED_MODULE_8__.readFileSync(filePath).toString("utf8"), {
        parser: {
            parse: (code) => _babel_parser__WEBPACK_IMPORTED_MODULE_4__/* .parse */ .Qc(code, {
                sourceType: "module",
                plugins: ["typescript"]
            }),
            generator: _babel_generator__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .ZP,
            types: _babel_types__WEBPACK_IMPORTED_MODULE_6__
        }
    });
}
//# sourceMappingURL=generateMessageProperties.js.map

/***/ }),

/***/ 35712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "command": () => (/* reexport */ command)
});

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(57147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: ./dist/bin/tools/fs.rmSync.js
var fs_rmSync = __webpack_require__(89693);
// EXTERNAL MODULE: ./dist/bin/tools/transformCodebase.js
var transformCodebase = __webpack_require__(60332);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
// EXTERNAL MODULE: ./node_modules/tsafe/esm/assert.mjs + 1 modules
var assert = __webpack_require__(29041);
// EXTERNAL MODULE: ./dist/bin/shared/constants.js
var constants = __webpack_require__(173);
;// CONCATENATED MODULE: ./dist/bin/tools/String.prototype.replaceAll.js
function replaceAll(string, searchValue, replaceValue) {
    if (string.replaceAll !== undefined) {
        return string.replaceAll(searchValue, replaceValue);
    }
    // If the searchValue is a string
    if (typeof searchValue === "string") {
        // Escape special characters in the string to be used in a regex
        var escapedSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var regex = new RegExp(escapedSearchValue, "g");
        return string.replace(regex, replaceValue);
    }
    // If the searchValue is a global RegExp, use it directly
    if (searchValue instanceof RegExp && searchValue.global) {
        return string.replace(searchValue, replaceValue);
    }
    // If the searchValue is a non-global RegExp, throw an error
    if (searchValue instanceof RegExp) {
        throw new TypeError("replaceAll must be called with a global RegExp");
    }
    // Convert searchValue to string if it's not a string or RegExp
    var searchString = String(searchValue);
    var regexFromString = new RegExp(searchString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    return string.replace(regexFromString, replaceValue);
}
//# sourceMappingURL=String.prototype.replaceAll.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/replacers/replaceImportsInJsCode/vite.js




(0,assert/* assert */.h)();
function replaceImportsInJsCode_vite(params) {
    const { jsCode, buildContext, basenameOfAssetsFiles, systemType = external_path_.sep === "/" ? "posix" : "win32" } = params;
    const { relative: pathRelative, sep: pathSep } = external_path_[systemType];
    let fixedJsCode = jsCode;
    replace_base_js_import: {
        if (buildContext.urlPathname === undefined) {
            break replace_base_js_import;
        }
        // Optimization
        if (!jsCode.includes(buildContext.urlPathname)) {
            break replace_base_js_import;
        }
        // Replace `Hv=function(e){return"/abcde12345/"+e}` by `Hv=function(e){return"/"+e}`
        fixedJsCode = fixedJsCode.replace(new RegExp(`([\\w\\$][\\w\\d\\$]*)=function\\(([\\w\\$][\\w\\d\\$]*)\\)\\{return"${replaceAll(buildContext.urlPathname, "/", "\\/")}"\\+\\2\\}`, "g"), (...[, funcName, paramName]) => `${funcName}=function(${paramName}){return"/"+${paramName}}`);
    }
    replace_javascript_relatives_import_paths: {
        // Example: "assets/ or "foo/bar/"
        const staticDir = (() => {
            let out = pathRelative(buildContext.projectBuildDirPath, buildContext.assetsDirPath);
            out = replaceAll(out, pathSep, "/") + "/";
            if (out === "/") {
                throw new Error(`The assetsDirPath must be a subdirectory of projectBuildDirPath`);
            }
            return out;
        })();
        // Optimization
        if (!jsCode.includes(staticDir)) {
            break replace_javascript_relatives_import_paths;
        }
        basenameOfAssetsFiles
            .map(basenameOfAssetsFile => `${staticDir}${basenameOfAssetsFile}`)
            .forEach(relativePathOfAssetFile => {
            var _a;
            fixedJsCode = replaceAll(fixedJsCode, `"${relativePathOfAssetFile}"`, `(window.kcContext["x-keycloakify"].resourcesPath.substring(1) + "/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}/${relativePathOfAssetFile}")`);
            fixedJsCode = replaceAll(fixedJsCode, `"${(_a = buildContext.urlPathname) !== null && _a !== void 0 ? _a : "/"}${relativePathOfAssetFile}"`, `(window.kcContext["x-keycloakify"].resourcesPath + "/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}/${relativePathOfAssetFile}")`);
        });
    }
    return { fixedJsCode };
}
//# sourceMappingURL=vite.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/replacers/replaceImportsInJsCode/webpack.js




(0,assert/* assert */.h)();
function replaceImportsInJsCode_webpack(params) {
    const { jsCode, buildContext, systemType = external_path_.sep === "/" ? "posix" : "win32" } = params;
    const { relative: pathRelative, sep: pathSep } = external_path_[systemType];
    let fixedJsCode = jsCode;
    if (buildContext.urlPathname !== undefined) {
        // "__esModule",{value:!0})},n.p="/foo-bar/",function(){if("undefined"  -> ... n.p="/" ...
        fixedJsCode = fixedJsCode.replace(new RegExp(`,([a-zA-Z]\\.[a-zA-Z])="${replaceAll(buildContext.urlPathname, "/", "\\/")}",`, "g"), (...[, assignTo]) => `,${assignTo}="/",`);
    }
    // Example: "static/ or "foo/bar/"
    const staticDir = (() => {
        let out = pathRelative(buildContext.projectBuildDirPath, buildContext.assetsDirPath);
        out = replaceAll(out, pathSep, "/") + "/";
        if (out === "/") {
            throw new Error(`The assetsDirPath must be a subdirectory of projectBuildDirPath`);
        }
        return out;
    })();
    const getReplaceArgs = (language) => [
        new RegExp(`([a-zA-Z_]+)\\.([a-zA-Z]+)=(function\\(([a-z]+)\\){return|([a-z]+)=>)"${staticDir.replace(/\//g, "\\/")}${language}\\/"`, "g"),
        (...[, n, u, matchedFunction, eForFunction]) => {
            const isArrowFunction = matchedFunction.includes("=>");
            const e = isArrowFunction
                ? matchedFunction.replace("=>", "").trim()
                : eForFunction;
            return `
            ${n}[(function(){
                var pd = Object.getOwnPropertyDescriptor(${n}, "p");
                if( pd === undefined || pd.configurable ){
                    Object.defineProperty(${n}, "p", {
                        get: function() { return window.kcContext["x-keycloakify"].resourcesPath; },
                        set: function() {}
                    });
                }
                return "${u}";
            })()] = ${isArrowFunction ? `${e} =>` : `function(${e}) { return `} "/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}/${staticDir}${language}/"`
                .replace(/\s+/g, " ")
                .trim();
        }
    ];
    fixedJsCode = fixedJsCode
        .replace(...getReplaceArgs("js"))
        .replace(...getReplaceArgs("css"))
        .replace(new RegExp(`[a-zA-Z]+\\.[a-zA-Z]+\\+"${staticDir.replace(/\//g, "\\/")}`, "g"), `window.kcContext["x-keycloakify"].resourcesPath + "/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}/${staticDir}`);
    return { fixedJsCode };
}
//# sourceMappingURL=webpack.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/replacers/replaceImportsInJsCode/replaceImportsInJsCode.js




(0,assert/* assert */.h)();
function replaceImportsInJsCode(params) {
    const { jsCode, buildContext } = params;
    const { fixedJsCode } = (() => {
        switch (buildContext.bundler) {
            case "vite":
                return replaceImportsInJsCode_vite({
                    jsCode,
                    buildContext,
                    basenameOfAssetsFiles: readAssetsDirSync({
                        assetsDirPath: params.buildContext.assetsDirPath
                    })
                });
            case "webpack":
                return replaceImportsInJsCode_webpack({
                    jsCode,
                    buildContext
                });
        }
    })();
    return { fixedJsCode };
}
const { readAssetsDirSync } = (() => {
    let cache = undefined;
    function readAssetsDirSync(params) {
        const { assetsDirPath } = params;
        if (cache !== undefined && cache.assetsDirPath === assetsDirPath) {
            return cache.basenameOfAssetsFiles;
        }
        const basenameOfAssetsFiles = external_fs_.readdirSync(assetsDirPath);
        cache = {
            assetsDirPath,
            basenameOfAssetsFiles
        };
        return basenameOfAssetsFiles;
    }
    return { readAssetsDirSync };
})();
//# sourceMappingURL=replaceImportsInJsCode.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/replacers/replaceImportsInJsCode/index.js

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/replacers/replaceImportsInCssCode.js



(0,assert/* assert */.h)();
function replaceImportsInCssCode(params) {
    const { cssCode, cssFileRelativeDirPath, buildContext } = params;
    let fixedCssCode = cssCode;
    [
        /url\("(\/[^/][^"]+)"\)/g,
        /url\('(\/[^/][^']+)'\)/g,
        /url\((\/[^/][^)]+)\)/g
    ].forEach(regex => (fixedCssCode = fixedCssCode.replace(regex, (match, assetFileAbsoluteUrlPathname) => {
        if (buildContext.urlPathname !== undefined) {
            if (!assetFileAbsoluteUrlPathname.startsWith(buildContext.urlPathname)) {
                // NOTE: Should never happen
                return match;
            }
            assetFileAbsoluteUrlPathname =
                assetFileAbsoluteUrlPathname.replace(buildContext.urlPathname, "/");
        }
        inline_style_in_html: {
            if (cssFileRelativeDirPath !== undefined) {
                break inline_style_in_html;
            }
            return `url("\${xKeycloakify.resourcesPath}/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}${assetFileAbsoluteUrlPathname}")`;
        }
        const assetFileRelativeUrlPathname = external_path_.posix.relative(cssFileRelativeDirPath.replace(/\\/g, "/"), assetFileAbsoluteUrlPathname.replace(/^\//, ""));
        return `url("${assetFileRelativeUrlPathname}")`;
    })));
    return { fixedCssCode };
}
//# sourceMappingURL=replaceImportsInCssCode.js.map
// EXTERNAL MODULE: ./node_modules/cheerio/lib/esm/index.js + 76 modules
var esm = __webpack_require__(46489);
// EXTERNAL MODULE: ./dist/bin/tools/getThisCodebaseRootDirPath.js
var getThisCodebaseRootDirPath = __webpack_require__(58822);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/generateFtl/generateFtl.js








(0,assert/* assert */.h)();
function generateFtlFilesCodeFactory(params) {
    var _a;
    const { themeName, indexHtmlCode, buildContext, keycloakifyVersion, themeType, fieldNames } = params;
    const $ = esm/* load */.zD(indexHtmlCode);
    fix_imports_statements: {
        $("script:not([src])").each((...[, element]) => {
            const jsCode = $(element).html();
            (0,assert/* assert */.h)(jsCode !== null);
            const { fixedJsCode } = replaceImportsInJsCode({
                jsCode,
                buildContext
            });
            $(element).text(fixedJsCode);
        });
        $("style").each((...[, element]) => {
            const cssCode = $(element).html();
            (0,assert/* assert */.h)(cssCode !== null);
            const { fixedCssCode } = replaceImportsInCssCode({
                cssCode,
                cssFileRelativeDirPath: undefined,
                buildContext
            });
            $(element).text(fixedCssCode);
        });
        [
            ["link", "href"],
            ["script", "src"],
            ["script", "data-src"]
        ].forEach(([selector, attrName]) => $(selector).each((...[, element]) => {
            var _a;
            const href = $(element).attr(attrName);
            if (href === undefined) {
                return;
            }
            $(element).attr(attrName, href.replace(new RegExp(`^${((_a = buildContext.urlPathname) !== null && _a !== void 0 ? _a : "/").replace(/\//g, "\\/")}`), `\${xKeycloakify.resourcesPath}/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}/`));
        }));
    }
    $("head base").remove();
    //FTL is no valid html, we can't insert with cheerio, we put placeholder for injecting later.
    const kcContextDeclarationTemplateFtl = external_fs_.readFileSync((0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "src", "bin", "keycloakify", "generateFtl", "kcContextDeclarationTemplate.ftl"))
        .toString("utf8")
        .replace("{{themeType}}", themeType)
        .replace("{{themeName}}", themeName)
        .replace("{{keycloakifyVersion}}", keycloakifyVersion)
        .replace("{{themeVersion}}", buildContext.themeVersion)
        .replace("{{fieldNames}}", fieldNames.map(name => `"${name}"`).join(", "))
        .replace("{{RESOURCES_COMMON}}", constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.RESOURCES_COMMON */.Ju.RESOURCES_COMMON)
        .replace("{{KEYCLOAKIFY_SPA_DEV_SERVER_PORT}}", constants/* KEYCLOAKIFY_SPA_DEV_SERVER_PORT */.Sz)
        .replace("{{userDefinedExclusions}}", (_a = buildContext.kcContextExclusionsFtlCode) !== null && _a !== void 0 ? _a : "");
    const ftlObjectToJsCodeDeclaringAnObjectPlaceholder = '{ "x": "vIdLqMeOed9sdLdIdOxdK0d" }';
    $("head").prepend([
        `<script>\n${ftlObjectToJsCodeDeclaringAnObjectPlaceholder}\n</script>`,
        `<base href="\${xKeycloakify.resourcesPath}/${constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST}/" />`
    ].join("\n"));
    // Remove part of the document marked as ignored.
    {
        const startTags = $('meta[name="keycloakify-ignore-start"]');
        startTags.each((...[, startTag]) => {
            const $startTag = $(startTag);
            const $endTag = $startTag
                .nextAll('meta[name="keycloakify-ignore-end"]')
                .first();
            if ($endTag.length) {
                let currentNode = $startTag.next();
                while (currentNode.length && !currentNode.is($endTag)) {
                    currentNode.remove();
                    currentNode = $startTag.next();
                }
                $startTag.remove();
                $endTag.remove();
            }
        });
    }
    const partiallyFixedIndexHtmlCode = $.html();
    function generateFtlFilesCode(params) {
        const { pageId } = params;
        const $ = esm/* load */.zD(partiallyFixedIndexHtmlCode);
        let ftlCode = $.html();
        Object.entries({
            [ftlObjectToJsCodeDeclaringAnObjectPlaceholder]: kcContextDeclarationTemplateFtl,
            "{{pageId}}": pageId,
            "{{ftlTemplateFileName}}": pageId
        }).map(([searchValue, replaceValue]) => (ftlCode = ftlCode.replace(searchValue, replaceValue)));
        return { ftlCode };
    }
    return { generateFtlFilesCode };
}
//# sourceMappingURL=generateFtl.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/generateFtl/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./dist/bin/tools/crawl.js
var crawl = __webpack_require__(73036);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/generateResources/readFieldNameUsage.js




/** Assumes the theme type exists */
function readFieldNameUsage(params) {
    const { themeSrcDirPath, themeType } = params;
    // NOTE: We pre-populate with the synthetic user attributes defined in useUserProfileForm (can't be parsed automatically)
    const fieldNames = new Set([
        "firstName",
        "lastName",
        "email",
        "username",
        "password",
        "password-confirm"
    ]);
    for (const srcDirPath of [
        (0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "src", themeType),
        (0,external_path_.join)(themeSrcDirPath, themeType)
    ]) {
        const filePaths = (0,crawl/* crawl */.J)({
            dirPath: srcDirPath,
            returnedPathsType: "absolute"
        }).filter(filePath => /\.(ts|tsx|js|jsx)$/.test(filePath));
        for (const filePath of filePaths) {
            const rawSourceFile = external_fs_.readFileSync(filePath).toString("utf8");
            if (!rawSourceFile.includes("messagesPerField")) {
                continue;
            }
            for (const functionName of [
                "printIfExists",
                "existsError",
                "get",
                "exists",
                "getFirstError"
            ]) {
                if (!rawSourceFile.includes(functionName)) {
                    continue;
                }
                try {
                    rawSourceFile
                        .split(functionName)
                        .filter(part => part.startsWith("("))
                        .map(part => {
                        let [p1] = part.split(")");
                        p1 = p1.slice(1);
                        return p1;
                    })
                        .map(part => {
                        return part
                            .split(",")
                            .map(a => a.trim())
                            .filter((...[, i]) => functionName !== "printIfExists" ? true : i === 0)
                            .filter(a => a.startsWith('"') ||
                            a.startsWith("'") ||
                            a.startsWith("`"))
                            .filter(a => a.endsWith('"') ||
                            a.endsWith("'") ||
                            a.endsWith("`"))
                            .map(a => a.slice(1).slice(0, -1));
                    })
                        .flat()
                        .forEach(fieldName => fieldNames.add(fieldName));
                }
                catch (_a) { }
            }
        }
    }
    return Array.from(fieldNames);
}
//# sourceMappingURL=readFieldNameUsage.js.map
// EXTERNAL MODULE: ./node_modules/tsafe/esm/id.mjs
var id = __webpack_require__(38469);
// EXTERNAL MODULE: ./node_modules/evt/tools/reducers/removeDuplicates.js
var removeDuplicates = __webpack_require__(78300);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/generateResources/readExtraPageNames.js






function readExtraPagesNames(params) {
    const { themeSrcDirPath, themeType } = params;
    const filePaths = (0,crawl/* crawl */.J)({
        dirPath: (0,external_path_.join)(themeSrcDirPath, themeType),
        returnedPathsType: "absolute"
    }).filter(filePath => /\.(ts|tsx|js|jsx)$/.test(filePath));
    const candidateFilePaths = filePaths.filter(filePath => /[kK]cContext\.[^.]+$/.test(filePath));
    if (candidateFilePaths.length === 0) {
        candidateFilePaths.push(...filePaths);
    }
    const extraPages = [];
    for (const candidateFilPath of candidateFilePaths) {
        const rawSourceFile = external_fs_.readFileSync(candidateFilPath).toString("utf8");
        extraPages.push(...Array.from(rawSourceFile.matchAll(/["']([^.\s]+.ftl)["']:/g), m => m[1]));
    }
    return extraPages.reduce(...(0,removeDuplicates.removeDuplicates)()).filter(pageId => {
        switch (themeType) {
            case "account":
                return !(0,id.id)(constants/* ACCOUNT_THEME_PAGE_IDS */.yV).includes(pageId);
            case "login":
                return !(0,id.id)(constants/* LOGIN_THEME_PAGE_IDS */.XV).includes(pageId);
        }
    });
}
//# sourceMappingURL=readExtraPageNames.js.map
// EXTERNAL MODULE: ./dist/bin/keycloakify/generateResources/generateMessageProperties.js
var generateMessageProperties = __webpack_require__(73817);
// EXTERNAL MODULE: ./dist/bin/tools/readThisNpmPackageVersion.js
var readThisNpmPackageVersion = __webpack_require__(64795);
// EXTERNAL MODULE: ./dist/bin/tools/escapeStringForPropertiesFile.js
var escapeStringForPropertiesFile = __webpack_require__(27190);
// EXTERNAL MODULE: ./node_modules/properties-parser/index.js
var properties_parser = __webpack_require__(44414);
var properties_parser_default = /*#__PURE__*/__webpack_require__.n(properties_parser);
;// CONCATENATED MODULE: ./dist/bin/tools/createObjectThatThrowsIfAccessed.js
const keyIsTrapped = "isTrapped_zSskDe9d";
class AccessError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
function createObjectThatThrowsIfAccessed(params) {
    const { debugMessage = "", isPropertyWhitelisted = () => false } = params !== null && params !== void 0 ? params : {};
    const get = (...args) => {
        const [, prop] = args;
        if (isPropertyWhitelisted(prop)) {
            return Reflect.get(...args);
        }
        if (prop === keyIsTrapped) {
            return true;
        }
        throw new AccessError(`Cannot access ${String(prop)} yet ${debugMessage}`);
    };
    const trappedObject = new Proxy({}, {
        get,
        set: get
    });
    return trappedObject;
}
function createObjectThatThrowsIfAccessedFactory(params) {
    const { isPropertyWhitelisted } = params;
    return {
        createObjectThatThrowsIfAccessed: (params) => {
            const { debugMessage } = params !== null && params !== void 0 ? params : {};
            return createObjectThatThrowsIfAccessed({
                debugMessage,
                isPropertyWhitelisted
            });
        }
    };
}
function isObjectThatThrowIfAccessed(obj) {
    return obj[keyIsTrapped] === true;
}
const THROW_IF_ACCESSED = {
    __brand: "THROW_IF_ACCESSED"
};
function createObjectWithSomePropertiesThatThrowIfAccessed(obj, debugMessage) {
    return Object.defineProperties(obj, Object.fromEntries(Object.entries(obj)
        .filter(([, value]) => value === THROW_IF_ACCESSED)
        .map(([key]) => {
        const getAndSet = () => {
            throw new AccessError(`Cannot access ${key} yet ${debugMessage !== null && debugMessage !== void 0 ? debugMessage : ""}`);
        };
        const pd = {
            get: getAndSet,
            set: getAndSet,
            enumerable: true
        };
        return [key, pd];
    })));
}
//# sourceMappingURL=createObjectThatThrowsIfAccessed.js.map
// EXTERNAL MODULE: ./dist/bin/tools/listInstalledModules.js
var listInstalledModules = __webpack_require__(75564);
// EXTERNAL MODULE: ./dist/bin/tools/isInside.js
var isInside = __webpack_require__(90665);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/generateResources/generateResources.js





















(0,assert/* assert */.h)();
async function generateResources(params) {
    var _a;
    const start = Date.now();
    const { resourcesDirPath, buildContext } = params;
    const [themeName] = buildContext.themeNames;
    if (external_fs_default().existsSync(resourcesDirPath)) {
        (0,fs_rmSync/* rmSync */.a)(resourcesDirPath, { recursive: true });
    }
    const getThemeTypeDirPath = (params) => {
        const { themeType, themeName } = params;
        return (0,external_path_.join)(resourcesDirPath, "theme", themeName, themeType);
    };
    const writeMessagePropertiesFilesByThemeType = {};
    for (const themeType of [...constants/* THEME_TYPES */.Jh, "email"]) {
        let isNative;
        {
            const v = buildContext.implementedThemeTypes[themeType];
            if (!v.isImplemented && !v.isImplemented_native) {
                continue;
            }
            isNative = !v.isImplemented && v.isImplemented_native;
        }
        const getAccountThemeType = () => {
            (0,assert/* assert */.h)(themeType === "account");
            (0,assert/* assert */.h)(buildContext.implementedThemeTypes.account.isImplemented);
            return buildContext.implementedThemeTypes.account.type;
        };
        const isSpa = (() => {
            switch (themeType) {
                case "login":
                    return false;
                case "account":
                    return getAccountThemeType() === "Single-Page";
                case "admin":
                    return true;
                case "email":
                    return false;
            }
        })();
        const themeTypeDirPath = getThemeTypeDirPath({ themeName, themeType });
        apply_replacers_and_move_to_theme_resources: {
            if (isNative) {
                break apply_replacers_and_move_to_theme_resources;
            }
            const destDirPath = (0,external_path_.join)(themeTypeDirPath, "resources", constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST);
            // NOTE: Prevent accumulation of files in the assets dir, as names are hashed they pile up.
            (0,fs_rmSync/* rmSync */.a)(destDirPath, { recursive: true, force: true });
            if (themeType !== "login" &&
                buildContext.implementedThemeTypes.login.isImplemented) {
                // NOTE: We prevent doing it twice, it has been done for the login theme.
                (0,transformCodebase/* transformCodebase */.N)({
                    srcDirPath: (0,external_path_.join)(getThemeTypeDirPath({
                        themeName,
                        themeType: "login"
                    }), "resources", constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST),
                    destDirPath
                });
                break apply_replacers_and_move_to_theme_resources;
            }
            for (const directoryBasename of [
                constants/* KEYCLOAK_THEME */.PC,
                // NOTE: This is legacy and should eventually be removed
                constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.KEYCLOAKIFY_DEV_RESOURCES */.Ju.KEYCLOAKIFY_DEV_RESOURCES
            ]) {
                const dirPath = (0,external_path_.join)(buildContext.projectBuildDirPath, directoryBasename);
                if (external_fs_default().existsSync(dirPath)) {
                    (0,assert/* assert */.h)(buildContext.bundler === "webpack");
                    throw new Error([
                        `Keycloakify build error: The ${directoryBasename} directory shouldn't exist in your build directory.`,
                        `(${(0,external_path_.relative)(process.cwd(), dirPath)}).\n`,
                        `Theses assets are only required for local development with Storybook.",
                            "Please remove this directory as an additional step of your command.\n`,
                        `For example: \`"build": "... && rimraf ${(0,external_path_.relative)(buildContext.projectDirPath, dirPath)}"\``
                    ].join(" "));
                }
            }
            (0,transformCodebase/* transformCodebase */.N)({
                srcDirPath: buildContext.projectBuildDirPath,
                destDirPath,
                transformSourceCode: ({ filePath, fileRelativePath, sourceCode }) => {
                    if (filePath.endsWith(".css")) {
                        const { fixedCssCode } = replaceImportsInCssCode({
                            cssCode: sourceCode.toString("utf8"),
                            cssFileRelativeDirPath: (0,external_path_.dirname)(fileRelativePath),
                            buildContext
                        });
                        return {
                            modifiedSourceCode: Buffer.from(fixedCssCode, "utf8")
                        };
                    }
                    if (filePath.endsWith(".js")) {
                        const { fixedJsCode } = replaceImportsInJsCode({
                            jsCode: sourceCode.toString("utf8"),
                            buildContext
                        });
                        return {
                            modifiedSourceCode: Buffer.from(fixedJsCode, "utf8")
                        };
                    }
                    return { modifiedSourceCode: sourceCode };
                }
            });
        }
        generate_ftl_files: {
            if (isNative) {
                break generate_ftl_files;
            }
            (0,assert/* assert */.h)(themeType !== "email");
            const { generateFtlFilesCode } = generateFtlFilesCodeFactory({
                themeName,
                indexHtmlCode: external_fs_default().readFileSync((0,external_path_.join)(buildContext.projectBuildDirPath, "index.html"))
                    .toString("utf8"),
                buildContext,
                keycloakifyVersion: (0,readThisNpmPackageVersion/* readThisNpmPackageVersion */.K)(),
                themeType,
                fieldNames: isSpa
                    ? []
                    : ((0,assert/* assert */.h)(themeType !== "admin"),
                        readFieldNameUsage({
                            themeSrcDirPath: buildContext.themeSrcDirPath,
                            themeType
                        }))
            });
            [
                ...(() => {
                    switch (themeType) {
                        case "login":
                            return constants/* LOGIN_THEME_PAGE_IDS */.XV;
                        case "account":
                            return getAccountThemeType() === "Single-Page"
                                ? ["index.ftl"]
                                : constants/* ACCOUNT_THEME_PAGE_IDS */.yV;
                        case "admin":
                            return ["index.ftl"];
                    }
                })(),
                ...(isSpa
                    ? []
                    : readExtraPagesNames({
                        themeType,
                        themeSrcDirPath: buildContext.themeSrcDirPath
                    }))
            ].forEach(pageId => {
                const { ftlCode } = generateFtlFilesCode({ pageId });
                external_fs_default().writeFileSync((0,external_path_.join)(themeTypeDirPath, pageId), Buffer.from(ftlCode, "utf8"));
            });
        }
        copy_native_theme: {
            if (!isNative) {
                break copy_native_theme;
            }
            const dirPath = (0,external_path_.join)(buildContext.themeSrcDirPath, themeType);
            (0,transformCodebase/* transformCodebase */.N)({
                srcDirPath: dirPath,
                destDirPath: getThemeTypeDirPath({ themeName, themeType }),
                transformSourceCode: ({ fileRelativePath, sourceCode }) => {
                    if ((0,isInside/* isInside */.V)({ dirPath: "messages", filePath: fileRelativePath })) {
                        return undefined;
                    }
                    return { modifiedSourceCode: sourceCode };
                }
            });
        }
        let languageTags = undefined;
        i18n_multi_page: {
            if (isNative) {
                break i18n_multi_page;
            }
            if (isSpa) {
                break i18n_multi_page;
            }
            (0,assert/* assert */.h)(themeType !== "admin" && themeType !== "email");
            const wrap = (0,generateMessageProperties/* generateMessageProperties */.k)({
                buildContext,
                themeType
            });
            languageTags = wrap.languageTags;
            const { writeMessagePropertiesFiles } = wrap;
            writeMessagePropertiesFilesByThemeType[themeType] =
                writeMessagePropertiesFiles;
        }
        let isLegacyAccountSpa = false;
        // NOTE: Eventually remove this block.
        i18n_single_page_account_legacy: {
            if (!isSpa) {
                break i18n_single_page_account_legacy;
            }
            if (themeType !== "account") {
                break i18n_single_page_account_legacy;
            }
            const [moduleMeta] = await (0,listInstalledModules/* listInstalledModules */.P)({
                packageJsonFilePath: buildContext.packageJsonFilePath,
                filter: ({ moduleName }) => moduleName === "@keycloakify/keycloak-account-ui"
            });
            (0,assert/* assert */.h)(moduleMeta !== undefined, `@keycloakify/keycloak-account-ui is supposed to be installed`);
            {
                const [majorStr] = moduleMeta.version.split(".");
                if (majorStr.length === 6) {
                    // NOTE: Now we use the format MMmmpp (Major, minor, patch) for example for
                    // 26.0.7 it would be 260007.
                    break i18n_single_page_account_legacy;
                }
                else {
                    // 25.0.4-rc.5 or later
                    isLegacyAccountSpa = true;
                }
            }
            const messageDirPath_defaults = (0,external_path_.join)(moduleMeta.dirPath, "messages");
            if (!external_fs_default().existsSync(messageDirPath_defaults)) {
                throw new Error(`Please update @keycloakify/keycloak-account-ui to 25.0.4-rc.5 or later.`);
            }
            isLegacyAccountSpa = true;
            const messagesDirPath_dest = (0,external_path_.join)(getThemeTypeDirPath({ themeName, themeType: "account" }), "messages");
            (0,transformCodebase/* transformCodebase */.N)({
                srcDirPath: messageDirPath_defaults,
                destDirPath: messagesDirPath_dest
            });
            apply_theme_changes: {
                const messagesDirPath_theme = (0,external_path_.join)(buildContext.themeSrcDirPath, "account", "messages");
                if (!external_fs_default().existsSync(messagesDirPath_theme)) {
                    break apply_theme_changes;
                }
                external_fs_default().readdirSync(messagesDirPath_theme).forEach(basename => {
                    const filePath_src = (0,external_path_.join)(messagesDirPath_theme, basename);
                    const filePath_dest = (0,external_path_.join)(messagesDirPath_dest, basename);
                    if (!external_fs_default().existsSync(filePath_dest)) {
                        external_fs_default().cpSync(filePath_src, filePath_dest);
                    }
                    const messages_src = properties_parser_default().parse(external_fs_default().readFileSync(filePath_src).toString("utf8"));
                    const messages_dest = properties_parser_default().parse(external_fs_default().readFileSync(filePath_dest).toString("utf8"));
                    const messages = Object.assign(Object.assign({}, messages_dest), messages_src);
                    const editor = properties_parser_default().createEditor();
                    Object.entries(messages).forEach(([key, value]) => {
                        editor.set(key, value);
                    });
                    external_fs_default().writeFileSync(filePath_dest, Buffer.from(editor.toString(), "utf8"));
                });
            }
            languageTags = external_fs_default().readdirSync(messagesDirPath_dest)
                .map(basename => basename.replace(/^messages_/, "").replace(/\.properties$/, ""));
        }
        i18n_for_spas_and_native: {
            if (!isSpa && !isNative) {
                break i18n_for_spas_and_native;
            }
            if (isLegacyAccountSpa) {
                break i18n_for_spas_and_native;
            }
            const messagesDirPath_theme = (0,external_path_.join)(buildContext.themeSrcDirPath, themeType, isNative ? "messages" : "i18n");
            if (!external_fs_default().existsSync(messagesDirPath_theme)) {
                break i18n_for_spas_and_native;
            }
            const propertiesByLang = {};
            external_fs_default().readdirSync(messagesDirPath_theme).forEach(basename => {
                var _a;
                var _b;
                const parsedBasename = (() => {
                    const match = basename.match(/^messages_([^.]+)\.properties$/);
                    if (match === null) {
                        return undefined;
                    }
                    const discriminator = match[1];
                    const split = discriminator.split("_override");
                    if (split.length === 1) {
                        return {
                            lang: discriminator,
                            isOverride: false
                        };
                    }
                    (0,assert/* assert */.h)(split.length === 2);
                    if (split[1] === "") {
                        return {
                            lang: split[0],
                            isOverride: true,
                            themeName: undefined
                        };
                    }
                    const match2 = split[1].match(/^_(.+)$/);
                    (0,assert/* assert */.h)(match2 !== null);
                    return {
                        lang: split[0],
                        isOverride: true,
                        themeName: match2[1]
                    };
                })();
                if (parsedBasename === undefined) {
                    return;
                }
                (_a = propertiesByLang[_b = parsedBasename.lang]) !== null && _a !== void 0 ? _a : (propertiesByLang[_b] = {
                    base: createObjectThatThrowsIfAccessed({
                        debugMessage: `No base ${parsedBasename.lang} translation for ${themeType} theme`
                    }),
                    override: undefined,
                    overrideByThemeName: {}
                });
                const buffer = external_fs_default().readFileSync((0,external_path_.join)(messagesDirPath_theme, basename));
                if (parsedBasename.isOverride === false) {
                    propertiesByLang[parsedBasename.lang].base = buffer;
                    return;
                }
                if (parsedBasename.themeName === undefined) {
                    propertiesByLang[parsedBasename.lang].override = buffer;
                    return;
                }
                propertiesByLang[parsedBasename.lang].overrideByThemeName[parsedBasename.themeName] = buffer;
            });
            languageTags = Object.keys(propertiesByLang);
            writeMessagePropertiesFilesByThemeType[themeType] = ({ messageDirPath, themeName }) => {
                if (!external_fs_default().existsSync(messageDirPath)) {
                    external_fs_default().mkdirSync(messageDirPath, { recursive: true });
                }
                Object.entries(propertiesByLang).forEach(([lang, { base, override, overrideByThemeName }]) => {
                    const messages = properties_parser_default().parse(base.toString("utf8"));
                    if (override !== undefined) {
                        const overrideMessages = properties_parser_default().parse(override.toString("utf8"));
                        Object.entries(overrideMessages).forEach(([key, value]) => (messages[key] = value));
                    }
                    if (themeName in overrideByThemeName) {
                        const overrideMessages = properties_parser_default().parse(overrideByThemeName[themeName].toString("utf8"));
                        Object.entries(overrideMessages).forEach(([key, value]) => (messages[key] = value));
                    }
                    const editor = properties_parser_default().createEditor();
                    Object.entries(messages).forEach(([key, value]) => {
                        editor.set(key, value);
                    });
                    external_fs_default().writeFileSync((0,external_path_.join)(messageDirPath, `messages_${lang}.properties`), Buffer.from(editor.toString(), "utf8"));
                });
            };
        }
        // NOTE: Legacy
        keycloak_static_resources: {
            if (isNative) {
                break keycloak_static_resources;
            }
            if (isSpa) {
                break keycloak_static_resources;
            }
            // TODO: Implement a check to skip that.
            (0,transformCodebase/* transformCodebase */.N)({
                srcDirPath: (0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "res", "public", constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.KEYCLOAKIFY_DEV_RESOURCES */.Ju.KEYCLOAKIFY_DEV_RESOURCES, themeType),
                destDirPath: (0,external_path_.join)(themeTypeDirPath, "resources")
            });
        }
        extensions_static_resources: {
            if (isNative) {
                break extensions_static_resources;
            }
            if (isSpa) {
                break extensions_static_resources;
            }
            const dirPath = (0,external_path_.join)(buildContext.publicDirPath, constants/* KEYCLOAK_THEME */.PC, themeType);
            if (!external_fs_default().existsSync(dirPath)) {
                break extensions_static_resources;
            }
            (0,transformCodebase/* transformCodebase */.N)({
                srcDirPath: dirPath,
                destDirPath: (0,external_path_.join)(themeTypeDirPath, "resources", constants/* WELL_KNOWN_DIRECTORY_BASE_NAME.DIST */.Ju.DIST, constants/* KEYCLOAK_THEME */.PC, themeType)
            });
        }
        bring_in_account_v1: {
            if (isNative) {
                break bring_in_account_v1;
            }
            if (themeType !== "account") {
                break bring_in_account_v1;
            }
            (0,assert/* assert */.h)(buildContext.implementedThemeTypes.account.isImplemented);
            if (buildContext.implementedThemeTypes.account.type !== "Multi-Page") {
                break bring_in_account_v1;
            }
            (0,transformCodebase/* transformCodebase */.N)({
                srcDirPath: (0,external_path_.join)((0,getThisCodebaseRootDirPath/* getThisCodebaseRootDirPath */.e)(), "res", "account-v1"),
                destDirPath: getThemeTypeDirPath({
                    themeName: "account-v1",
                    themeType: "account"
                })
            });
        }
        generate_theme_properties: {
            const getEnvironmentVariableLines = (environmentVariables) => environmentVariables.map(({ name, default: defaultValue }) => `${name}=\${env.${name}:${(0,escapeStringForPropertiesFile/* escapeStringForPropertiesFile */.y)(defaultValue)}}`);
            if (isNative) {
                external_fs_default().writeFileSync((0,external_path_.join)(themeTypeDirPath, "theme.properties"), Buffer.from([
                    external_fs_default().readFileSync((0,external_path_.join)(themeTypeDirPath, "theme.properties")),
                    ...getEnvironmentVariableLines(buildContext.environmentVariables)
                ].join("\n\n"), "utf8"));
                break generate_theme_properties;
            }
            (0,assert/* assert */.h)(themeType !== "email");
            external_fs_default().writeFileSync((0,external_path_.join)(themeTypeDirPath, "theme.properties"), Buffer.from([
                `parent=${(() => {
                    switch (themeType) {
                        case "account":
                            switch (getAccountThemeType()) {
                                case "Multi-Page":
                                    return "account-v1";
                                case "Single-Page":
                                    return "base";
                            }
                        case "login":
                            return "keycloak";
                        case "admin":
                            return "base";
                    }
                    assert/* assert */.h;
                })()}`,
                "darkMode=true",
                ...(themeType === "account" &&
                    getAccountThemeType() === "Single-Page"
                    ? ["deprecatedMode=false"]
                    : []),
                ...((_a = buildContext.extraThemeProperties) !== null && _a !== void 0 ? _a : []),
                ...getEnvironmentVariableLines([
                    ...buildContext.environmentVariables,
                    { name: constants/* KEYCLOAKIFY_SPA_DEV_SERVER_PORT */.Sz, default: "" }
                ]),
                ...(languageTags === undefined
                    ? []
                    : [`locales=${languageTags.join(",")}`])
            ].join("\n\n"), "utf8"));
        }
    }
    for (const themeVariantName of [...buildContext.themeNames].reverse()) {
        for (const themeType of [...constants/* THEME_TYPES */.Jh, "email"]) {
            copy_main_theme_to_theme_variant_theme: {
                let isNative;
                {
                    const v = buildContext.implementedThemeTypes[themeType];
                    if (!v.isImplemented && !v.isImplemented_native) {
                        break copy_main_theme_to_theme_variant_theme;
                    }
                    isNative = !v.isImplemented && v.isImplemented_native;
                }
                if (!isNative && themeVariantName === themeName) {
                    break copy_main_theme_to_theme_variant_theme;
                }
                (0,transformCodebase/* transformCodebase */.N)({
                    srcDirPath: getThemeTypeDirPath({ themeName, themeType }),
                    destDirPath: getThemeTypeDirPath({
                        themeName: themeVariantName,
                        themeType
                    }),
                    transformSourceCode: ({ fileRelativePath, sourceCode }) => {
                        patch_xKeycloakify_themeName: {
                            if (!fileRelativePath.endsWith(".ftl")) {
                                break patch_xKeycloakify_themeName;
                            }
                            if (!isNative &&
                                (0,external_path_.basename)(fileRelativePath) !== fileRelativePath) {
                                break patch_xKeycloakify_themeName;
                            }
                            const modifiedSourceCode = Buffer.from(Buffer.from(sourceCode)
                                .toString("utf-8")
                                .replace(...(0,id.id)(isNative
                                ? [
                                    /xKeycloakify\.themeName/g,
                                    `"${themeVariantName}"`
                                ]
                                : [
                                    `"themeName": "${themeName}"`,
                                    `"themeName": "${themeVariantName}"`
                                ])), "utf8");
                            if (!isNative) {
                                (0,assert/* assert */.h)(Buffer.compare(modifiedSourceCode, sourceCode) !== 0);
                            }
                            return { modifiedSourceCode };
                        }
                        return { modifiedSourceCode: sourceCode };
                    }
                    //TODO: Env var
                });
            }
            run_writeMessagePropertiesFiles: {
                const writeMessagePropertiesFiles = writeMessagePropertiesFilesByThemeType[themeType];
                if (writeMessagePropertiesFiles === undefined) {
                    break run_writeMessagePropertiesFiles;
                }
                writeMessagePropertiesFiles({
                    messageDirPath: (0,external_path_.join)(getThemeTypeDirPath({ themeName: themeVariantName, themeType }), "messages"),
                    themeName: themeVariantName
                });
            }
        }
    }
    console.log(`Generated resources in ${Date.now() - start}ms`);
}
//# sourceMappingURL=generateResources.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/generateResources/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(32081);
var external_child_process_default = /*#__PURE__*/__webpack_require__.n(external_child_process_);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/buildJars/extensionVersions.js
// NOTE: v0.5 is a dummy version.
const keycloakAccountV1Versions = [null, "0.3", "0.4", "0.6", "0.7"];
const keycloakThemeAdditionalInfoExtensionVersions = [null, "1.1.5"];
//# sourceMappingURL=extensionVersions.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/buildJars/getKeycloakVersionRangeForJar.js

function getKeycloakVersionRangeForJar(params) {
    const { keycloakAccountV1Version, keycloakThemeAdditionalInfoExtensionVersion, doesImplementAccountV1Theme } = params;
    if (doesImplementAccountV1Theme) {
        const keycloakVersionRange = (() => {
            switch (keycloakAccountV1Version) {
                case null:
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return "21-and-below";
                        case "1.1.5":
                            return undefined;
                        default:
                            (0,assert/* assert */.h)(false);
                    }
                case "0.3":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return undefined;
                        case "1.1.5":
                            return "23";
                        default:
                            (0,assert/* assert */.h)(false);
                    }
                case "0.4":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return undefined;
                        case "1.1.5":
                            return "24";
                        default:
                            (0,assert/* assert */.h)(false);
                    }
                case "0.6":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return "26.0-to-26.1";
                        case "1.1.5":
                            return "25";
                        default:
                            (0,assert/* assert */.h)(false);
                    }
                case "0.7":
                    switch (keycloakThemeAdditionalInfoExtensionVersion) {
                        case null:
                            return "26.2-and-above";
                        case "1.1.5":
                            return undefined;
                        default:
                            (0,assert/* assert */.h)(false);
                    }
                default:
                    (0,assert/* assert */.h)(false);
            }
        })();
        (0,assert/* assert */.h)();
        return keycloakVersionRange;
    }
    else {
        const keycloakVersionRange = (() => {
            if (keycloakAccountV1Version !== null) {
                return undefined;
            }
            switch (keycloakThemeAdditionalInfoExtensionVersion) {
                case null:
                    return "all-other-versions";
                case "1.1.5":
                    return "22-to-25";
            }
            (0,assert/* assert */.h)(false);
        })();
        (0,assert/* assert */.h)();
        return keycloakVersionRange;
    }
}
//# sourceMappingURL=getKeycloakVersionRangeForJar.js.map
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(73292);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/buildJars/generatePom.js

(0,assert/* assert */.h)();
function generatePom(params) {
    const { keycloakAccountV1Version, keycloakThemeAdditionalInfoExtensionVersion, buildContext } = params;
    const { pomFileCode } = (function generatePomFileCode() {
        const pomFileCode = [
            `<?xml version="1.0"?>`,
            `<project xmlns="http://maven.apache.org/POM/4.0.0"`,
            `	 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`,
            `	 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">`,
            `  <modelVersion>4.0.0</modelVersion>`,
            `	<groupId>${buildContext.groupId}</groupId>`,
            `	<artifactId>${buildContext.artifactId}</artifactId>`,
            `	<version>${buildContext.themeVersion}</version>`,
            `	<name>${buildContext.artifactId}</name>`,
            `  <description />`,
            `  <packaging>jar</packaging>`,
            `  <properties>`,
            `    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>`,
            `  </properties>`,
            ...(keycloakAccountV1Version !== null ||
                keycloakThemeAdditionalInfoExtensionVersion !== null
                ? [
                    `  <build>`,
                    `    <plugins>`,
                    `      <plugin>`,
                    `        <groupId>org.apache.maven.plugins</groupId>`,
                    `        <artifactId>maven-shade-plugin</artifactId>`,
                    `	     <version>3.5.1</version>`,
                    `        <executions>`,
                    `          <execution>`,
                    `            <phase>package</phase>`,
                    `            <goals>`,
                    `              <goal>shade</goal>`,
                    `            </goals>`,
                    `          </execution>`,
                    `        </executions>`,
                    `      </plugin>`,
                    `    </plugins>`,
                    `  </build>`,
                    `  <dependencies>`,
                    ...(keycloakAccountV1Version !== null
                        ? [
                            `    <dependency>`,
                            `      <groupId>io.phasetwo.keycloak</groupId>`,
                            `      <artifactId>keycloak-account-v1</artifactId>`,
                            `      <version>${keycloakAccountV1Version}</version>`,
                            `    </dependency>`
                        ]
                        : []),
                    ...(keycloakThemeAdditionalInfoExtensionVersion !== null
                        ? [
                            `    <dependency>`,
                            `      <groupId>dev.jcputney</groupId>`,
                            `      <artifactId>keycloak-theme-additional-info-extension</artifactId>`,
                            `      <version>${keycloakThemeAdditionalInfoExtensionVersion}</version>`,
                            `    </dependency>`
                        ]
                        : []),
                    `  </dependencies>`
                ]
                : []),
            `</project>`
        ].join("\n");
        return { pomFileCode };
    })();
    return { pomFileCode };
}
//# sourceMappingURL=generatePom.js.map
// EXTERNAL MODULE: ./dist/bin/tools/fs.existsAsync.js
var fs_existsAsync = __webpack_require__(43765);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/buildJars/buildJar.js










(0,assert/* assert */.h)();
async function buildJar(params) {
    const { jarFileBasename, keycloakAccountV1Version, keycloakThemeAdditionalInfoExtensionVersion, resourcesDirPath, doesImplementAccountV1Theme, buildContext } = params;
    const keycloakifyBuildCacheDirPath = (0,external_path_.join)(buildContext.cacheDirPath, "maven", jarFileBasename.replace(".jar", ""));
    const tmpResourcesDirPath = (0,external_path_.join)(keycloakifyBuildCacheDirPath, "src", "main", "resources");
    (0,fs_rmSync/* rmSync */.a)(tmpResourcesDirPath, { recursive: true, force: true });
    (0,transformCodebase/* transformCodebase */.N)({
        srcDirPath: resourcesDirPath,
        destDirPath: tmpResourcesDirPath,
        transformSourceCode: !doesImplementAccountV1Theme || keycloakAccountV1Version !== null
            ? undefined
            : (params) => {
                const { fileRelativePath, sourceCode } = params;
                if ((0,isInside/* isInside */.V)({
                    dirPath: (0,external_path_.join)("theme", "account-v1"),
                    filePath: fileRelativePath
                })) {
                    return undefined;
                }
                for (const themeName of buildContext.themeNames) {
                    if (fileRelativePath ===
                        (0,external_path_.join)("theme", themeName, "account", "theme.properties")) {
                        const modifiedSourceCode = Buffer.from(sourceCode
                            .toString("utf8")
                            .replace(`parent=account-v1`, "parent=keycloak"), "utf8");
                        (0,assert/* assert */.h)(Buffer.compare(modifiedSourceCode, sourceCode) !== 0);
                        return { modifiedSourceCode };
                    }
                }
                return { modifiedSourceCode: sourceCode };
            }
    });
    {
        const filePath = (0,external_path_.join)(tmpResourcesDirPath, "META-INF", "keycloak-themes.json");
        await promises_.mkdir((0,external_path_.dirname)(filePath));
        await promises_.writeFile(filePath, Buffer.from(JSON.stringify({
            themes: await (async () => {
                const dirPath = (0,external_path_.join)(tmpResourcesDirPath, "theme");
                const themeNames = (await promises_.readdir(dirPath)).sort((a, b) => {
                    const indexA = buildContext.themeNames.indexOf(a);
                    const indexB = buildContext.themeNames.indexOf(b);
                    const orderA = indexA === -1 ? Infinity : indexA;
                    const orderB = indexB === -1 ? Infinity : indexB;
                    return orderA - orderB;
                });
                return Promise.all(themeNames.map(async (themeName) => {
                    const types = await promises_.readdir((0,external_path_.join)(dirPath, themeName));
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
            const ftlFilePath = (0,external_path_.join)(tmpResourcesDirPath, "theme", themeName, "login", pageId);
            // NOTE: https://github.com/keycloakify/keycloakify/issues/665
            if (!(await (0,fs_existsAsync/* existsAsync */.o)(ftlFilePath))) {
                return;
            }
            const ftlFileContent = (0,external_fs_.readFileSync)(ftlFilePath).toString("utf8");
            const ftlFileBasename = (() => {
                switch (pageId) {
                    case "register.ftl":
                        return "register-user-profile.ftl";
                    case "login-update-profile.ftl":
                        return "update-user-profile.ftl";
                }
                (0,assert/* assert */.h)(false);
            })();
            const modifiedFtlFileContent = ftlFileContent.replace(`"ftlTemplateFileName": "${pageId}"`, `"ftlTemplateFileName": "${ftlFileBasename}"`);
            (0,assert/* assert */.h)(modifiedFtlFileContent !== ftlFileContent);
            await promises_.writeFile((0,external_path_.join)((0,external_path_.dirname)(ftlFilePath), ftlFileBasename), Buffer.from(modifiedFtlFileContent, "utf8"));
        }))
            .flat());
    }
    {
        const { pomFileCode } = generatePom({
            buildContext,
            keycloakAccountV1Version,
            keycloakThemeAdditionalInfoExtensionVersion
        });
        await promises_.writeFile((0,external_path_.join)(keycloakifyBuildCacheDirPath, "pom.xml"), Buffer.from(pomFileCode, "utf8"));
    }
    {
        const mvnBuildCmd = `mvn clean install -Dmaven.repo.local="${(0,external_path_.join)(keycloakifyBuildCacheDirPath, ".m2")}"`;
        await new Promise((resolve, reject) => external_child_process_default().exec(mvnBuildCmd, { cwd: keycloakifyBuildCacheDirPath }, error => {
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
    await promises_.rename((0,external_path_.join)(keycloakifyBuildCacheDirPath, "target", `${buildContext.artifactId}-${buildContext.themeVersion}.jar`), (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, jarFileBasename));
}
//# sourceMappingURL=buildJar.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/buildJars/buildJars.js




(0,assert/* assert */.h)();
async function buildJars(params) {
    const { resourcesDirPath, buildContext } = params;
    const doesImplementAccountV1Theme = buildContext.implementedThemeTypes.account.isImplemented &&
        buildContext.implementedThemeTypes.account.type === "Multi-Page";
    await Promise.all(keycloakAccountV1Versions.map(keycloakAccountV1Version => keycloakThemeAdditionalInfoExtensionVersions.map(keycloakThemeAdditionalInfoExtensionVersion => {
        const keycloakVersionRange = getKeycloakVersionRangeForJar({
            doesImplementAccountV1Theme,
            keycloakAccountV1Version,
            keycloakThemeAdditionalInfoExtensionVersion
        });
        if (keycloakVersionRange === undefined) {
            return undefined;
        }
        const jarTarget = buildContext.jarTargets.find(jarTarget => jarTarget.keycloakVersionRange === keycloakVersionRange);
        if (jarTarget === undefined) {
            return undefined;
        }
        const { jarFileBasename } = jarTarget;
        return buildJar({
            jarFileBasename,
            keycloakAccountV1Version,
            keycloakThemeAdditionalInfoExtensionVersion,
            resourcesDirPath,
            doesImplementAccountV1Theme,
            buildContext
        });
    }))
        .flat());
}
//# sourceMappingURL=buildJars.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/buildJars/index.js

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/chalk/source/index.js
var source = __webpack_require__(78818);
var source_default = /*#__PURE__*/__webpack_require__.n(source);
// EXTERNAL MODULE: external "os"
var external_os_ = __webpack_require__(22037);
;// CONCATENATED MODULE: ./dist/bin/keycloakify/keycloakify.js










async function command(params) {
    const { buildContext } = params;
    exit_if_maven_not_installed: {
        let commandOutput = undefined;
        try {
            commandOutput = external_child_process_.execSync("mvn --version", {
                stdio: ["ignore", "pipe", "ignore"]
            });
        }
        catch (_a) { }
        if (commandOutput === null || commandOutput === void 0 ? void 0 : commandOutput.toString("utf8").includes("Apache Maven")) {
            break exit_if_maven_not_installed;
        }
        if (external_fs_.readFileSync(buildContext.packageJsonFilePath)
            .toString("utf8")
            .includes(`"mvn"`)) {
            console.log(source_default().red([
                "Please remove the 'mvn' package from your package.json'dependencies list,",
                "reinstall your dependencies and try again.",
                "We need the Apache Maven CLI, not this: https://www.npmjs.com/package/mvn"
            ].join(" ")));
        }
        else {
            const installationCommand = (() => {
                switch (external_os_.platform()) {
                    case "darwin":
                        return "brew install mvn";
                    case "win32":
                        return "choco install mvn";
                    case "linux":
                    default:
                        return "sudo apt-get install mvn";
                }
            })();
            console.log(`${source_default().red("Apache Maven required.")} Install it with \`${source_default().bold(installationCommand)}\` (for example)`);
        }
        process.exit(1);
    }
    console.log([
        source_default().cyan(`keycloakify v${(0,readThisNpmPackageVersion/* readThisNpmPackageVersion */.K)()}`),
        source_default().green(`Building the keycloak theme in .${external_path_.sep}${(0,external_path_.relative)(process.cwd(), buildContext.keycloakifyBuildDirPath)} ...`)
    ].join(" "));
    const startTime = Date.now();
    {
        if (!external_fs_.existsSync(buildContext.keycloakifyBuildDirPath)) {
            external_fs_.mkdirSync(buildContext.keycloakifyBuildDirPath, {
                recursive: true
            });
        }
        external_fs_.writeFileSync((0,external_path_.join)(buildContext.keycloakifyBuildDirPath, ".gitignore"), Buffer.from("*", "utf8"));
    }
    const resourcesDirPath = (0,external_path_.join)(buildContext.keycloakifyBuildDirPath, "resources");
    await generateResources({
        resourcesDirPath,
        buildContext
    });
    run_post_build_script: {
        if (buildContext.bundler !== "vite") {
            break run_post_build_script;
        }
        external_child_process_.execSync("npx vite", {
            cwd: buildContext.projectDirPath,
            env: Object.assign(Object.assign({}, process.env), { [constants/* VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RUN_POST_BUILD_SCRIPT */.TE.RUN_POST_BUILD_SCRIPT]: JSON.stringify({
                    resourcesDirPath,
                    buildContext
                }) })
        });
    }
    await buildJars({
        resourcesDirPath,
        buildContext
    });
    (0,fs_rmSync/* rmSync */.a)(resourcesDirPath, { recursive: true });
    console.log(source_default().green(`✓ keycloak theme built in ${((Date.now() - startTime) / 1000).toFixed(2)}s`));
}
//# sourceMappingURL=keycloakify.js.map
;// CONCATENATED MODULE: ./dist/bin/keycloakify/index.js

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

/***/ 27190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ escapeStringForPropertiesFile)
/* harmony export */ });
// Convert a JavaScript string to UTF-16 encoding
function toUTF16(codePoint) {
    if (codePoint <= 0xffff) {
        // BMP character
        return "\\u" + codePoint.toString(16).padStart(4, "0");
    }
    else {
        // Non-BMP character
        codePoint -= 0x10000;
        let highSurrogate = (codePoint >> 10) + 0xd800;
        let lowSurrogate = (codePoint % 0x400) + 0xdc00;
        return ("\\u" +
            highSurrogate.toString(16).padStart(4, "0") +
            "\\u" +
            lowSurrogate.toString(16).padStart(4, "0"));
    }
}
// Escapes special characters for use in a .properties file
function escapeStringForPropertiesFile(str) {
    let escapedStr = "";
    for (const char of [...str]) {
        const codePoint = char.codePointAt(0);
        if (!codePoint)
            continue;
        switch (char) {
            case "\n":
                escapedStr += "\\n";
                break;
            case "\r":
                escapedStr += "\\r";
                break;
            case "\t":
                escapedStr += "\\t";
                break;
            case "\\":
                escapedStr += "\\\\";
                break;
            case ":":
                escapedStr += "\\:";
                break;
            case "=":
                escapedStr += "\\=";
                break;
            case "#":
                escapedStr += "\\#";
                break;
            case "!":
                escapedStr += "\\!";
                break;
            case "'":
                escapedStr += "''";
                break;
            default:
                if (codePoint > 0x7f) {
                    escapedStr += toUTF16(codePoint); // Non-ASCII characters
                }
                else {
                    escapedStr += char; // ASCII character needs no escape
                }
        }
    }
    return escapedStr;
}
//# sourceMappingURL=escapeStringForPropertiesFile.js.map

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

/***/ 89693:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ rmSync)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SemVer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12171);



/**
 * Polyfill of fs.rmSync(dirPath, { "recursive": true })
 * For older version of Node
 */
function rmSync(dirPath, options) {
    if (_SemVer__WEBPACK_IMPORTED_MODULE_2__/* .SemVer.compare */ .h.compare(_SemVer__WEBPACK_IMPORTED_MODULE_2__/* .SemVer.parse */ .h.parse(process.version), _SemVer__WEBPACK_IMPORTED_MODULE_2__/* .SemVer.parse */ .h.parse("14.14.0")) > 0) {
        fs__WEBPACK_IMPORTED_MODULE_0__.rmSync(dirPath, options);
        return;
    }
    const { force = true } = options;
    if (force && !fs__WEBPACK_IMPORTED_MODULE_0__.existsSync(dirPath)) {
        return;
    }
    const removeDir_rec = (dirPath) => fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync(dirPath).forEach(basename => {
        const fileOrDirPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dirPath, basename);
        if (fs__WEBPACK_IMPORTED_MODULE_0__.lstatSync(fileOrDirPath).isDirectory()) {
            removeDir_rec(fileOrDirPath);
            return;
        }
        else {
            fs__WEBPACK_IMPORTED_MODULE_0__.unlinkSync(fileOrDirPath);
        }
    });
    removeDir_rec(dirPath);
}
//# sourceMappingURL=fs.rmSync.js.map

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

/***/ 75564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ readPackageJsonDependencies),
/* harmony export */   "P": () => (/* binding */ listInstalledModules)
/* harmony export */ });
/* harmony import */ var tsafe_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29041);
/* harmony import */ var tsafe_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38469);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49622);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tools_getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(93721);
/* harmony import */ var tsafe_exclude__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(83101);







async function listInstalledModules(params) {
    const { packageJsonFilePath, filter } = params;
    const parsedPackageJson = await readPackageJsonDependencies({
        packageJsonFilePath
    });
    const extensionModuleNames = [parsedPackageJson.dependencies, parsedPackageJson.devDependencies]
        .filter((0,tsafe_exclude__WEBPACK_IMPORTED_MODULE_4__/* .exclude */ .D)(undefined))
        .map(obj => Object.keys(obj))
        .flat()
        .filter(moduleName => filter({ moduleName }));
    const result = await Promise.all(extensionModuleNames.map(async (moduleName) => {
        const dirPath = await (0,_tools_getInstalledModuleDirPath__WEBPACK_IMPORTED_MODULE_3__/* .getInstalledModuleDirPath */ .p)({
            moduleName,
            packageJsonDirPath: (0,path__WEBPACK_IMPORTED_MODULE_1__.dirname)(packageJsonFilePath)
        });
        const { version, peerDependencies } = await readPackageJsonVersionAndPeerDependencies({
            packageJsonFilePath: (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dirPath, "package.json")
        });
        return { moduleName, version, peerDependencies, dirPath };
    }));
    return result;
}
const { readPackageJsonDependencies } = (() => {
    const zParsedPackageJson = (() => {
        const zTargetType = zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ry({
            dependencies: zod__WEBPACK_IMPORTED_MODULE_5__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .Z_()).optional(),
            devDependencies: zod__WEBPACK_IMPORTED_MODULE_5__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .Z_()).optional()
        });
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)();
        return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_6__.id)(zTargetType);
    })();
    async function readPackageJsonDependencies(params) {
        const { packageJsonFilePath } = params;
        const parsedPackageJson = JSON.parse((await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_0__.is)(parsedPackageJson));
        return parsedPackageJson;
    }
    return { readPackageJsonDependencies };
})();
const { readPackageJsonVersionAndPeerDependencies } = (() => {
    const zParsedPackageJson = (() => {
        const zTargetType = zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ry({
            version: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .Z_(),
            peerDependencies: zod__WEBPACK_IMPORTED_MODULE_5__/* .record */ .IM(zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .Z_()).optional()
        });
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)();
        return (0,tsafe_id__WEBPACK_IMPORTED_MODULE_6__.id)(zTargetType);
    })();
    async function readPackageJsonVersionAndPeerDependencies(params) {
        var _a;
        const { packageJsonFilePath } = params;
        const parsedPackageJson = JSON.parse((await fs_promises__WEBPACK_IMPORTED_MODULE_2__.readFile(packageJsonFilePath)).toString("utf8"));
        zParsedPackageJson.parse(parsedPackageJson);
        (0,tsafe_assert__WEBPACK_IMPORTED_MODULE_0__/* .assert */ .h)((0,tsafe_assert__WEBPACK_IMPORTED_MODULE_0__.is)(parsedPackageJson));
        return {
            version: parsedPackageJson.version,
            peerDependencies: (_a = parsedPackageJson.peerDependencies) !== null && _a !== void 0 ? _a : {}
        };
    }
    return { readPackageJsonVersionAndPeerDependencies };
})();
//# sourceMappingURL=listInstalledModules.js.map

/***/ }),

/***/ 60332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ transformCodebase)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _crawl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73036);
/* harmony import */ var _tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89693);




/**
 * Apply a transformation function to every file of directory
 * If source and destination are the same this function can be used to apply the transformation in place
 * like filtering out some files or modifying them.
 * */
function transformCodebase(params) {
    const { srcDirPath, transformSourceCode } = params;
    const isTargetSameAsSource = path__WEBPACK_IMPORTED_MODULE_1__.relative(srcDirPath, params.destDirPath) === "";
    const destDirPath = isTargetSameAsSource
        ? path__WEBPACK_IMPORTED_MODULE_1__.join(srcDirPath, "..", "tmp_xOsPdkPsTdzPs34sOkHs")
        : params.destDirPath;
    fs__WEBPACK_IMPORTED_MODULE_0__.mkdirSync(destDirPath, {
        recursive: true
    });
    for (const fileRelativePath of (0,_crawl__WEBPACK_IMPORTED_MODULE_2__/* .crawl */ .J)({
        dirPath: srcDirPath,
        returnedPathsType: "relative to dirPath"
    })) {
        const filePath = path__WEBPACK_IMPORTED_MODULE_1__.join(srcDirPath, fileRelativePath);
        const destFilePath = path__WEBPACK_IMPORTED_MODULE_1__.join(destDirPath, fileRelativePath);
        // NOTE: Optimization, if we don't need to transform the file, just copy
        // it using the lower level implementation.
        if (transformSourceCode === undefined) {
            fs__WEBPACK_IMPORTED_MODULE_0__.mkdirSync(path__WEBPACK_IMPORTED_MODULE_1__.dirname(destFilePath), {
                recursive: true
            });
            fs__WEBPACK_IMPORTED_MODULE_0__.copyFileSync(filePath, destFilePath);
            continue;
        }
        const transformSourceCodeResult = transformSourceCode({
            sourceCode: fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync(filePath),
            filePath,
            fileRelativePath
        });
        if (transformSourceCodeResult === undefined) {
            continue;
        }
        fs__WEBPACK_IMPORTED_MODULE_0__.mkdirSync(path__WEBPACK_IMPORTED_MODULE_1__.dirname(destFilePath), {
            recursive: true
        });
        const { newFileName, modifiedSourceCode } = transformSourceCodeResult;
        fs__WEBPACK_IMPORTED_MODULE_0__.writeFileSync(path__WEBPACK_IMPORTED_MODULE_1__.join(path__WEBPACK_IMPORTED_MODULE_1__.dirname(destFilePath), newFileName !== null && newFileName !== void 0 ? newFileName : path__WEBPACK_IMPORTED_MODULE_1__.basename(destFilePath)), modifiedSourceCode);
    }
    if (isTargetSameAsSource) {
        (0,_tools_fs_rmSync__WEBPACK_IMPORTED_MODULE_3__/* .rmSync */ .a)(srcDirPath, { recursive: true });
        fs__WEBPACK_IMPORTED_MODULE_0__.renameSync(destDirPath, srcDirPath);
    }
}
//# sourceMappingURL=transformCodebase.js.map

/***/ })

};
;