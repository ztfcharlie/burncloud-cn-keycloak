"use strict";
exports.id = 69;
exports.ids = [69,30];
exports.modules = {

/***/ 50689:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VoidDeferred = exports.Deferred = void 0;
var overwriteReadonlyProp_1 = __webpack_require__(47803);
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this_1 = this;
        this.isPending = true;
        var resolve;
        var reject;
        this.pr = new Promise(function (resolve_, reject_) {
            resolve = function (value) {
                (0, overwriteReadonlyProp_1.overwriteReadonlyProp)(_this_1, "isPending", false);
                resolve_(value);
            };
            reject = function (error) {
                (0, overwriteReadonlyProp_1.overwriteReadonlyProp)(_this_1, "isPending", false);
                reject_(error);
            };
        });
        this.resolve = resolve;
        this.reject = reject;
    }
    return Deferred;
}());
exports.Deferred = Deferred;
var VoidDeferred = /** @class */ (function (_super) {
    __extends(VoidDeferred, _super);
    function VoidDeferred() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VoidDeferred;
}(Deferred));
exports.VoidDeferred = VoidDeferred;
//# sourceMappingURL=Deferred.js.map

/***/ }),

/***/ 53501:
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPrototypeChain = void 0;
function getPrototypeChain(obj, callback) {
    var proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return [];
    }
    var doContinue = callback === null || callback === void 0 ? void 0 : callback(proto);
    if (!doContinue) {
        return [proto];
    }
    return __spreadArray([proto], __read(getPrototypeChain(proto)), false);
}
exports.getPrototypeChain = getPrototypeChain;
getPrototypeChain.isMatched = function (obj, regExp) {
    var out = false;
    getPrototypeChain(obj, function (_a) {
        var constructor = _a.constructor;
        out = regExp.test(constructor.name);
        return !out;
    });
    return out;
};
//# sourceMappingURL=getPrototypeChain.js.map

/***/ }),

/***/ 33805:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sameFactory = exports.same = void 0;
// @denoify-line-ignore
var Set_1 = __webpack_require__(44105);
// @denoify-line-ignore
__webpack_require__(12903);
var types_1 = __webpack_require__(5725);
var allEquals_1 = __webpack_require__(32243);
/**
 * Function that perform a in depth comparison of two things of arbitrary type T
 * to see if they represent the same date regardless of object references.
 *
 * Think of it as JSON.stringify(o1) === JSON.stringify(o2)
 * but unlike a test performed with JSON.stringify the order in the property
 * have been assigned to an object does not matter and circular references are supported.
 *
 *
 * If takeIntoAccountArraysOrdering === false then
 * representsSameData(["a", "b"], ["b", "a"]) will return true.
 *
 * If Date are compared via .getTime()
 *
 * The objects can includes Map and Set.
 * */
exports.same = (function () {
    function sameRec(o1, o2, _a, o1Path, o2Path, o1RealRef, o2RealRef) {
        var e_1, _b, e_2, _c;
        var _d = _a === void 0 ? { "takeIntoAccountArraysOrdering": true } : _a, takeIntoAccountArraysOrdering = _d.takeIntoAccountArraysOrdering;
        if (o1RealRef === void 0) { o1RealRef = o1; }
        if (o2RealRef === void 0) { o2RealRef = o2; }
        if (Object.is(o1, o2)) {
            return true;
        }
        {
            var i1 = o1Path.map(function (_a) {
                var obj = _a.obj;
                return obj;
            }).indexOf(o1RealRef);
            if (i1 >= 0) {
                var i2 = o2Path.map(function (_a) {
                    var obj = _a.obj;
                    return obj;
                }).indexOf(o2RealRef);
                if (i1 !== i2) {
                    return false;
                }
                return (0, allEquals_1.arrAllEquals)([o1Path, o2Path]
                    .map(function (oPath) { return oPath
                    .map(function (_a) {
                    var key = _a.key;
                    return key;
                })
                    .join(""); }));
            }
        }
        if (!(o1 instanceof Object && o2 instanceof Object)) {
            return false;
        }
        if (typeof o1 === "function" || typeof o2 === "function") {
            return false;
        }
        if (types_1.DateLike.match(o1)) {
            if (!types_1.DateLike.match(o2)) {
                return false;
            }
            return o1.getTime() === o2.getTime();
        }
        if (types_1.MapLike.match(o1)) {
            if (!types_1.MapLike.match(o2)) {
                return false;
            }
            var newO1 = new Set_1.Polyfill();
            var newO2 = new Set_1.Polyfill();
            try {
                for (var _e = __values([o1, o2]), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var o = _f.value;
                    var newO = o === o1 ? newO1 : newO2;
                    var arr = Array.from(o.keys());
                    for (var i = 0; i < arr.length; i++) {
                        var key = arr[i];
                        var value = o.get(key);
                        newO.add({ key: key, value: value });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return sameRec(newO1, newO2, { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, o1Path, o2Path, o1RealRef, o2RealRef);
        }
        var takeIntoAccountArraysOrderingOv = undefined;
        if (types_1.SetLike.match(o1)) {
            if (!types_1.SetLike.match(o2)) {
                return false;
            }
            o1 = Array.from(o1.values());
            o2 = Array.from(o2.values());
            takeIntoAccountArraysOrderingOv = false;
        }
        if (types_1.ArrayLike.match(o1)) {
            if (!types_1.ArrayLike.match(o2)) {
                return false;
            }
            if (o1.length !== o2.length) {
                return false;
            }
            if (!(takeIntoAccountArraysOrderingOv !== undefined ?
                takeIntoAccountArraysOrderingOv :
                takeIntoAccountArraysOrdering)) {
                var o2Set = new Set_1.Polyfill(Array.from(o2));
                for (var i = 0; i < o1.length; i++) {
                    if (!("".concat(i) in o1)) {
                        continue;
                    }
                    var val1 = o1[i];
                    if (o2Set.has(val1)) {
                        o2Set.delete(val1);
                        continue;
                    }
                    var isFound = false;
                    try {
                        for (var _g = (e_2 = void 0, __values(o2Set.values())), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var val2 = _h.value;
                            if (!sameRec(val1, val2, { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, __spreadArray(__spreadArray([], __read(o1Path), false), [{ "obj": o1RealRef, "key": "*" }], false), __spreadArray(__spreadArray([], __read(o2Path), false), [{ "obj": o2RealRef, "key": "*" }], false))) {
                                continue;
                            }
                            isFound = true;
                            o2Set.delete(val2);
                            break;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (!isFound) {
                        return false;
                    }
                }
                return true;
            }
            //continue
        }
        else if (!sameRec(Object.keys(o1).filter(function (key) { return o1[key] !== undefined; }), Object.keys(o2).filter(function (key) { return o2[key] !== undefined; }), { "takeIntoAccountArraysOrdering": false }, [], [])) {
            return false;
        }
        for (var key in o1) {
            if (!sameRec(o1[key], o2[key], { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, __spreadArray(__spreadArray([], __read(o1Path), false), [{ "obj": o1RealRef, key: key }], false), __spreadArray(__spreadArray([], __read(o2Path), false), [{ "obj": o2RealRef, key: key }], false))) {
                return false;
            }
        }
        return true;
    }
    return function same(o1, o2, _a) {
        var _b = _a === void 0 ? { "takeIntoAccountArraysOrdering": true } : _a, takeIntoAccountArraysOrdering = _b.takeIntoAccountArraysOrdering;
        return sameRec(o1, o2, { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }, [], []);
    };
})();
/**
 * Return the "same" function with "takeIntoAccountArraysOrdering" default value set as desired.
 * */
function sameFactory(_a) {
    var takeIntoAccountArraysOrdering = _a.takeIntoAccountArraysOrdering;
    return {
        "same": function (o1, o2, prop) {
            if (prop === void 0) { prop = { takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }; }
            return (0, exports.same)(o1, o2, prop);
        }
    };
}
exports.sameFactory = sameFactory;
//# sourceMappingURL=same.js.map

/***/ }),

/***/ 5725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateLike = exports.ArrayLike = exports.MapLike = exports.SetLike = void 0;
var typeGuard_1 = __webpack_require__(47393);
var getPrototypeChain_1 = __webpack_require__(53501);
var SetLike;
(function (SetLike) {
    function match(set) {
        return ((0, typeGuard_1.typeGuard)(set, true) &&
            typeof set.values === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(set, /Set/));
    }
    SetLike.match = match;
})(SetLike = exports.SetLike || (exports.SetLike = {}));
var MapLike;
(function (MapLike) {
    function match(map) {
        return ((0, typeGuard_1.typeGuard)(map, true) &&
            typeof map.keys === "function" &&
            typeof map.get === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(map, /Map/));
    }
    MapLike.match = match;
})(MapLike = exports.MapLike || (exports.MapLike = {}));
var ArrayLike;
(function (ArrayLike) {
    function match(arr) {
        return ((0, typeGuard_1.typeGuard)(arr, true) &&
            typeof arr.length === "number" &&
            arr.length !== 0 ?
            ("".concat(arr.length - 1) in arr) :
            getPrototypeChain_1.getPrototypeChain.isMatched(arr, /Array/));
    }
    ArrayLike.match = match;
})(ArrayLike = exports.ArrayLike || (exports.ArrayLike = {}));
var DateLike;
(function (DateLike) {
    function match(date) {
        return ((0, typeGuard_1.typeGuard)(date, true) &&
            typeof date.getTime === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(date, /Date/));
    }
    DateLike.match = match;
})(DateLike = exports.DateLike || (exports.DateLike = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 32243:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.allEqualsFactory = exports.allEquals = exports.arrAllEquals = void 0;
var allEqualsTo_1 = __webpack_require__(49685);
var reduceify_1 = __webpack_require__(37560);
function arrAllEquals(arr, areEquals) {
    if (areEquals === void 0) { areEquals = function (e1, e2) { return e1 === e2; }; }
    if (arr.length === 0) {
        return true;
    }
    return arr.reduce.apply(arr, __spreadArray([], __read((0, allEqualsTo_1.allEqualsTo)(arr[0], areEquals)), false));
}
exports.arrAllEquals = arrAllEquals;
;
function allEquals(areEquals) {
    return (0, reduceify_1.toReduceArguments)(arrAllEquals, areEquals);
}
exports.allEquals = allEquals;
function allEqualsFactory(_a) {
    var areEquals = _a.areEquals;
    return { "allEquals": function () { return allEquals(areEquals); } };
}
exports.allEqualsFactory = allEqualsFactory;
//# sourceMappingURL=allEquals.js.map

/***/ }),

/***/ 49685:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.allEqualsToFactory = exports.allEqualsTo = exports.arrAllEqualsTo = void 0;
var reduceify_1 = __webpack_require__(37560);
var every_1 = __webpack_require__(9594);
function arrAllEqualsTo(arr, to, areEquals) {
    if (areEquals === void 0) { areEquals = function (e, to) { return e === to; }; }
    return arr.reduce.apply(arr, __spreadArray([], __read((0, every_1.every)(function (e) { return areEquals(e, to); })), false));
}
exports.arrAllEqualsTo = arrAllEqualsTo;
;
function allEqualsTo(to, areEquals) {
    return (0, reduceify_1.toReduceArguments)(arrAllEqualsTo, to, areEquals);
}
exports.allEqualsTo = allEqualsTo;
function allEqualsToFactory(_a) {
    var areEquals = _a.areEquals;
    return { "allEqualsTo": function (to) { return allEqualsTo(to, areEquals); } };
}
exports.allEqualsToFactory = allEqualsToFactory;
//# sourceMappingURL=allEqualsTo.js.map

/***/ }),

/***/ 9594:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.every = exports.arrEvery = void 0;
var reduceify_1 = __webpack_require__(37560);
function arrEvery(arr, test) {
    if (test === void 0) { test = function (e) { return !!e; }; }
    return arr
        .map(function (e) { return test(e); })
        .reduce(function (prev, curr) { return curr && prev; }, true);
}
exports.arrEvery = arrEvery;
function every(test) {
    return (0, reduceify_1.toReduceArguments)(arrEvery, test);
}
exports.every = every;
//# sourceMappingURL=every.js.map

/***/ }),

/***/ 37560:
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toReduceArguments = void 0;
function toReduceArguments(arrOp) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var outWrap = [];
    var reduceCallbackFunction = function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 4), array = _b[3];
        var out;
        if (outWrap.length === 1) {
            out = outWrap[0];
        }
        else {
            out = arrOp.apply(void 0, __spreadArray([array], __read(params), false));
            outWrap = [out];
        }
        return out;
    };
    return [
        reduceCallbackFunction,
        arrOp.apply(void 0, __spreadArray([[]], __read(params), false))
    ];
}
exports.toReduceArguments = toReduceArguments;
//# sourceMappingURL=reduceify.js.map

/***/ }),

/***/ 65134:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Polyfill = exports.LightMapImpl = void 0;
var LightMapImpl = /** @class */ (function () {
    function LightMapImpl() {
        this.record = [];
    }
    LightMapImpl.prototype.has = function (key) {
        return this.record
            .map(function (_a) {
            var _key = _a[0];
            return _key;
        })
            .indexOf(key) >= 0;
    };
    LightMapImpl.prototype.get = function (key) {
        var entry = this.record
            .filter(function (_a) {
            var _key = _a[0];
            return _key === key;
        })[0];
        if (entry === undefined) {
            return undefined;
        }
        return entry[1];
    };
    LightMapImpl.prototype.set = function (key, value) {
        var entry = this.record
            .filter(function (_a) {
            var _key = _a[0];
            return _key === key;
        })[0];
        if (entry === undefined) {
            this.record.push([key, value]);
        }
        else {
            entry[1] = value;
        }
        return this;
    };
    LightMapImpl.prototype["delete"] = function (key) {
        var index = this.record.map(function (_a) {
            var key = _a[0];
            return key;
        }).indexOf(key);
        if (index < 0) {
            return false;
        }
        this.record.splice(index, 1);
        return true;
    };
    LightMapImpl.prototype.keys = function () {
        return this.record.map(function (_a) {
            var key = _a[0];
            return key;
        });
    };
    return LightMapImpl;
}());
exports.LightMapImpl = LightMapImpl;
exports.Polyfill = typeof Map !== "undefined" ? Map : LightMapImpl;
//# sourceMappingURL=Map.js.map

/***/ }),

/***/ 12903:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
if (!Object.is) {
    Object.is = function (x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        }
        else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    };
}
//# sourceMappingURL=Object.is.js.map

/***/ }),

/***/ 44105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.Polyfill = exports.LightSetImpl = void 0;
var Map_1 = __webpack_require__(65134);
var LightSetImpl = /** @class */ (function () {
    function LightSetImpl(values) {
        this.map = new Map_1.Polyfill();
        if (values === undefined) {
            return;
        }
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            this.add(value);
        }
    }
    LightSetImpl.prototype.has = function (value) {
        return this.map.has(value);
    };
    LightSetImpl.prototype.add = function (value) {
        this.map.set(value, true);
        return this;
    };
    LightSetImpl.prototype.values = function () {
        return this.map.keys();
    };
    LightSetImpl.prototype["delete"] = function (value) {
        return this.map["delete"](value);
    };
    return LightSetImpl;
}());
exports.LightSetImpl = LightSetImpl;
exports.Polyfill = typeof Set !== "undefined" ? Set : LightSetImpl;
//# sourceMappingURL=Set.js.map

/***/ }),

/***/ 55247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.Polyfill = void 0;
var Map_1 = __webpack_require__(65134);
exports.Polyfill = typeof WeakMap !== "undefined" ? WeakMap : Map_1.Polyfill;
//# sourceMappingURL=WeakMap.js.map

/***/ }),

/***/ 81708:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.buildMethodCb = exports.buildCb = exports.getPrComplete = exports.isRunning = exports.cancelAllQueuedCalls = exports.getQueuedCallCount = exports.buildMethod = exports.build = exports.createGroupRef = void 0;
// @denoify-line-ignore
var WeakMap_1 = __webpack_require__(55247);
var ExecQueue = /** @class */ (function () {
    function ExecQueue() {
        this.queuedCalls = [];
        this.isRunning = false;
        this.prComplete = Promise.resolve();
    }
    //TODO: move where it is used.
    ExecQueue.prototype.cancelAllQueuedCalls = function () {
        var n;
        this.queuedCalls.splice(0, n = this.queuedCalls.length);
        return n;
    };
    return ExecQueue;
}());
var globalContext = {};
var clusters = new WeakMap_1.Polyfill();
//console.log("Map version");
//export const clusters = new Map<Object, Map<GroupRef,ExecQueue>>();
function getOrCreateExecQueue(context, groupRef) {
    var execQueueByGroup = clusters.get(context);
    if (!execQueueByGroup) {
        execQueueByGroup = new WeakMap_1.Polyfill();
        clusters.set(context, execQueueByGroup);
    }
    var execQueue = execQueueByGroup.get(groupRef);
    if (!execQueue) {
        execQueue = new ExecQueue();
        execQueueByGroup.set(groupRef, execQueue);
    }
    return execQueue;
}
function createGroupRef() {
    return new Array(0);
}
exports.createGroupRef = createGroupRef;
function build() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnPromise(true, createGroupRef(), inputs[0]);
        case 2: return buildFnPromise(true, inputs[0], inputs[1]);
    }
}
exports.build = build;
function buildMethod() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnPromise(false, createGroupRef(), inputs[0]);
        case 2: return buildFnPromise(false, inputs[0], inputs[1]);
    }
}
exports.buildMethod = buildMethod;
/**
 *
 * Get the number of queued call of a run-exclusive function.
 * Note that if you call a runExclusive function and call this
 * directly after it will return 0 as there is one function call
 * execution ongoing but 0 queued.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 *
 * */
function getQueuedCallCount(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.queuedCalls.length : 0;
}
exports.getQueuedCallCount = getQueuedCallCount;
/**
 *
 * Cancel all queued calls of a run-exclusive function.
 * Note that the current running call will not be cancelled.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 *
 */
function cancelAllQueuedCalls(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.cancelAllQueuedCalls() : 0;
}
exports.cancelAllQueuedCalls = cancelAllQueuedCalls;
/**
 * Tell if a run-exclusive function has an instance of it's call currently being
 * performed.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 */
function isRunning(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.isRunning : false;
}
exports.isRunning = isRunning;
/**
 * Return a promise that resolve when all the current queued call of a runExclusive functions
 * have completed.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 */
function getPrComplete(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.prComplete : Promise.resolve();
}
exports.getPrComplete = getPrComplete;
var groupByRunExclusiveFunction = new WeakMap_1.Polyfill();
function getExecQueueByFunctionAndContext(runExclusiveFunction, context) {
    if (context === void 0) { context = globalContext; }
    var groupRef = groupByRunExclusiveFunction.get(runExclusiveFunction);
    if (!groupRef) {
        throw Error("Not a run exclusiveFunction");
    }
    var execQueueByGroup = clusters.get(context);
    if (!execQueueByGroup) {
        return undefined;
    }
    return execQueueByGroup.get(groupRef);
}
function buildFnPromise(isGlobal, groupRef, fun) {
    var execQueue;
    var runExclusiveFunction = (function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        if (!isGlobal) {
            if (!(this instanceof Object)) {
                throw new Error("Run exclusive, <this> should be an object");
            }
            execQueue = getOrCreateExecQueue(this, groupRef);
        }
        return new Promise(function (resolve, reject) {
            var onPrCompleteResolve;
            execQueue.prComplete = new Promise(function (resolve) {
                return onPrCompleteResolve = function () { return resolve(); };
            });
            var onComplete = function (result) {
                onPrCompleteResolve();
                execQueue.isRunning = false;
                if (execQueue.queuedCalls.length) {
                    execQueue.queuedCalls.shift()();
                }
                if ("data" in result) {
                    resolve(result.data);
                }
                else {
                    reject(result.reason);
                }
            };
            (function callee() {
                var _this = this;
                var inputs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inputs[_i] = arguments[_i];
                }
                if (execQueue.isRunning) {
                    execQueue.queuedCalls.push(function () { return callee.apply(_this, inputs); });
                    return;
                }
                execQueue.isRunning = true;
                try {
                    fun.apply(this, inputs)
                        .then(function (data) { return onComplete({ data: data }); })["catch"](function (reason) { return onComplete({ reason: reason }); });
                }
                catch (error) {
                    onComplete({ "reason": error });
                }
            }).apply(_this, inputs);
        });
    });
    if (isGlobal) {
        execQueue = getOrCreateExecQueue(globalContext, groupRef);
    }
    groupByRunExclusiveFunction.set(runExclusiveFunction, groupRef);
    return runExclusiveFunction;
}
function buildCb() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnCallback(true, createGroupRef(), inputs[0]);
        case 2: return buildFnCallback(true, inputs[0], inputs[1]);
    }
}
exports.buildCb = buildCb;
function buildMethodCb() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnCallback(false, createGroupRef(), inputs[0]);
        case 2: return buildFnCallback(false, inputs[0], inputs[1]);
    }
}
exports.buildMethodCb = buildMethodCb;
function buildFnCallback(isGlobal, groupRef, fun) {
    var execQueue;
    var runExclusiveFunction = (function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        if (!isGlobal) {
            if (!(this instanceof Object)) {
                throw new Error("Run exclusive, <this> should be an object");
            }
            execQueue = getOrCreateExecQueue(this, groupRef);
        }
        var callback = undefined;
        if (inputs.length && typeof inputs[inputs.length - 1] === "function") {
            callback = inputs.pop();
        }
        var onPrCompleteResolve;
        execQueue.prComplete = new Promise(function (resolve) {
            return onPrCompleteResolve = function () { return resolve(); };
        });
        var onComplete = function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            onPrCompleteResolve();
            execQueue.isRunning = false;
            if (execQueue.queuedCalls.length) {
                execQueue.queuedCalls.shift()();
            }
            if (callback) {
                callback.apply(_this, inputs);
            }
        };
        onComplete.hasCallback = !!callback;
        (function callee() {
            var _this = this;
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            if (execQueue.isRunning) {
                execQueue.queuedCalls.push(function () { return callee.apply(_this, inputs); });
                return;
            }
            execQueue.isRunning = true;
            try {
                fun.apply(this, __spreadArrays(inputs, [onComplete]));
            }
            catch (error) {
                error.message += " ( This exception should not have been thrown, miss use of run-exclusive buildCb )";
                throw error;
            }
        }).apply(this, inputs);
    });
    if (isGlobal) {
        execQueue = getOrCreateExecQueue(globalContext, groupRef);
    }
    groupByRunExclusiveFunction.set(runExclusiveFunction, groupRef);
    return runExclusiveFunction;
}
//# sourceMappingURL=runExclusive.js.map

/***/ }),

/***/ 47803:
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.overwriteReadonlyProp = void 0;
/**
 * Assign a value to a property even if the object is freezed or if the property is not writable
 * Throw if the assignation fail ( for example if the property is non configurable write: false )
 * */
var overwriteReadonlyProp = function (obj, propertyName, value) {
    try {
        obj[propertyName] = value;
    }
    catch (_a) { }
    if (obj[propertyName] === value) {
        return value;
    }
    var errorDefineProperty = undefined;
    var propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propertyName) || {
        "enumerable": true,
        "configurable": true,
    };
    if (!!propertyDescriptor.get) {
        throw new Error("Probably a wrong ides to overwrite ".concat(String(propertyName), " getter"));
    }
    try {
        Object.defineProperty(obj, propertyName, __assign(__assign({}, propertyDescriptor), { value: value }));
    }
    catch (error) {
        errorDefineProperty = error;
    }
    if (obj[propertyName] !== value) {
        throw errorDefineProperty || new Error("Can't assign");
    }
    return value;
};
exports.overwriteReadonlyProp = overwriteReadonlyProp;
//# sourceMappingURL=overwriteReadonlyProp.js.map

/***/ }),

/***/ 47393:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeGuard = typeGuard;
/** https://docs.tsafe.dev/typeguard */
function typeGuard(value, isMatched) {
    return isMatched;
}
//# sourceMappingURL=typeGuard.js.map

/***/ }),

/***/ 76030:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ symToStr)
/* harmony export */ });
/** @see <https://docs.tsafe.dev/main/symtostr> */
function symToStr(wrap) {
    // @ts-expect-error: We know better
    return Object.keys(wrap)[0];
}


//# sourceMappingURL=symToStr.mjs.map


/***/ })

};
;