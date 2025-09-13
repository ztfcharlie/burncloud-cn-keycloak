export var SemVer;
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