"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 36:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MovieManager() {
  var API = "http://localhost:3000";
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    brand = _useState4[0],
    setBrand = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    engineType = _useState6[0],
    setEngine = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    engineHp = _useState8[0],
    setHp = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    data = _useState10[0],
    setData = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    dergo = _useState12[0],
    setDergo = _useState12[1];
  var randomId = Math.floor(Math.random() * 10000).toFixed(0);
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setDergo(true);
  };
  var postForm = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = {
                id: parseInt(randomId).toString(),
                name: name,
                brand: brand,
                engine: {
                  type: engineType,
                  hp: engineHp
                }
              };
              _context.next = 3;
              return fetch("".concat(API, "/movies"), {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(function (response) {
                return response.json();
              }).then(function (data) {
                console.log(data);
              })["catch"](function (error) {
                console.log(error);
              });
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function postForm() {
      return _ref.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (dergo === true) {
      postForm();
    } else {
      return;
    }
  }, [dergo]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "name",
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "brand",
    value: brand,
    onChange: function onChange(e) {
      return setBrand(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Petrol",
    value: engineType,
    onChange: function onChange(e) {
      return setEngine(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "PS",
    value: engineHp,
    onChange: function onChange(e) {
      return setHp(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "submit",
    name: "button",
    value: "submit"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieManager);

/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _CarsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _AddMovie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);






var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CarsManager__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/add-car",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddMovie__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.HashRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null)), document.getElementById("app"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("eb8b35ddfb83bb7fcd4c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBVztFQUFJLEVBQUcsZUFDNUMsMkRBQUMsbURBQUs7SUFBQyxJQUFJLEVBQUMsVUFBVTtJQUFDLE9BQU8sZUFBRSwyREFBQyxpREFBUTtFQUFJLEVBQUcsQ0FDM0MsQ0FDSCxDQUVIO0FBRVgsQ0FBQztBQUVEUiw2Q0FBZSxlQUNmLDJEQUFDLHdEQUFVLHFCQUNQLDJEQUFDLEdBQUcsT0FBRyxDQUNFLEVBQ2JVLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztVQzlCL0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvQWRkTW92aWUuanMiLCJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL2FwcC5qcyIsIndlYnBhY2s6Ly9yZWFjdC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuXHJcbmZ1bmN0aW9uIE1vdmllTWFuYWdlcigpIHtcclxuXHJcbmNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG5jb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZShcIlwiKVxyXG5jb25zdCBbYnJhbmQsIHNldEJyYW5kXSA9IHVzZVN0YXRlKFwiXCIpXHJcbmNvbnN0IFtlbmdpbmVUeXBlLCBzZXRFbmdpbmVdID0gdXNlU3RhdGUoXCJcIilcclxuY29uc3QgW2VuZ2luZUhwLCBzZXRIcF0gPSB1c2VTdGF0ZShcIlwiKVxyXG5jb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuY29uc3QgW2RlcmdvLCBzZXREZXJnb10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG5jb25zdCByYW5kb21JZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKS50b0ZpeGVkKDApXHJcblxyXG5jb25zdCBoYW5kbGVTdWJtaXQgPSAoZXZlbnQpID0+IHtcclxuZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuc2V0RGVyZ28odHJ1ZSlcclxuXHJcbn1cclxuXHJcbmNvbnN0IHBvc3RGb3JtID0gYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBpZDogcGFyc2VJbnQocmFuZG9tSWQpLnRvU3RyaW5nKCksXHJcbiAgICBuYW1lOiBuYW1lLFxyXG4gICAgYnJhbmQ6IGJyYW5kLFxyXG4gICAgZW5naW5lOiB7dHlwZTplbmdpbmVUeXBlLCBocDogZW5naW5lSHB9XHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIGF3YWl0IGZldGNoKGAke0FQSX0vbW92aWVzYCwge1xyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgIH1cclxuICAgIH0pXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxudXNlRWZmZWN0KCgpID0+IHtcclxuaWYoZGVyZ28gPT09IHRydWUpIHtcclxucG9zdEZvcm0oKTtcclxuXHJcbn0gZWxzZSB7XHJcbnJldHVyblxyXG59XHJcblxyXG59LFtkZXJnb10pXHJcblxyXG5cclxucmV0dXJuIChcclxuPD5cclxuICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiYnJhbmRcIiB2YWx1ZT17YnJhbmR9IG9uQ2hhbmdlPXsoZSk9PiBzZXRCcmFuZChlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUGV0cm9sXCIgdmFsdWU9e2VuZ2luZVR5cGV9IG9uQ2hhbmdlPXsoZSk9PiBzZXRFbmdpbmUoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBTXCIgdmFsdWU9e2VuZ2luZUhwfSBvbkNoYW5nZT17KGUpPT4gc2V0SHAoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XHJcblxyXG4gIDwvZm9ybT5cclxuPC8+XHJcbilcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW92aWVNYW5hZ2VyIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBDYXJzTWFuYWdlciBmcm9tIFwiLi9DYXJzTWFuYWdlclwiO1xuaW1wb3J0IEFkZE1vdmllIGZyb20gXCIuL0FkZE1vdmllXCJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4vTmF2YmFyXCI7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBIYXNoUm91dGVyLCBSb3V0ZSwgUm91dGVzIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgPD5cblxuICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8Q2Fyc01hbmFnZXIgLz59IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZGQtY2FyXCIgZWxlbWVudD17PEFkZE1vdmllIC8+fSAvPlxuICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuXG5SZWFjdERPTS5yZW5kZXIoIFxuPEhhc2hSb3V0ZXI+XG4gICAgPEFwcCAvPlxuPC9IYXNoUm91dGVyPiAsIFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZWI4YjM1ZGRmYjgzYmI3ZmNkNGNcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk1vdmllTWFuYWdlciIsIkFQSSIsIm5hbWUiLCJzZXROYW1lIiwiYnJhbmQiLCJzZXRCcmFuZCIsImVuZ2luZVR5cGUiLCJzZXRFbmdpbmUiLCJlbmdpbmVIcCIsInNldEhwIiwiZGF0YSIsInNldERhdGEiLCJkZXJnbyIsInNldERlcmdvIiwicmFuZG9tSWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b0ZpeGVkIiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInBvc3RGb3JtIiwiaWQiLCJwYXJzZUludCIsInRvU3RyaW5nIiwiZW5naW5lIiwidHlwZSIsImhwIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZSIsInRhcmdldCIsInZhbHVlIiwiUmVhY3RET00iLCJDYXJzTWFuYWdlciIsIkFkZE1vdmllIiwiTmF2YmFyIiwiQnJvd3NlclJvdXRlciIsIkhhc2hSb3V0ZXIiLCJSb3V0ZSIsIlJvdXRlcyIsIkFwcCIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9