"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 35:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CarsManager() {
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
  var randomId = Math.floor(Math.random() * 10).toFixed(0);
  var handleSubmit = function handleSubmit(event) {
    // console.log(e);
    postForm();
    // e.preventDefault();
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
                id: parseInt(randomId),
                name: name,
                brand: brand,
                engine: {
                  type: engineType,
                  hp: engineHp
                }
              };
              _context.next = 3;
              return fetch("".concat(API, "/cars"), {
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
    if (dergo) {
      postForm();
    }
    fetch("".concat(API, "/db")).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      setData(data.cars);
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
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
    placeholder: "engine",
    value: engineType,
    onChange: function onChange(e) {
      return setEngine(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "engine",
    value: engineHp,
    onChange: function onChange(e) {
      return setHp(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "button",
    name: "button",
    value: "submit",
    onClick: function onClick(event) {
      return handleSubmit(event);
    }
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2cd1b62801acb1802d05")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxpQkFBQ3ZCLEtBQUs7TUFBQSxPQUFLRCxZQUFZLENBQUNDLEtBQUssQ0FBQztJQUFBO0VBQUMsRUFBRyxDQUV6RixDQUNKO0FBRUo7QUFFQSxpRUFBZXBCLFdBQVc7Ozs7Ozs7O1VDbEYxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvQWRkQ2FyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5cclxuZnVuY3Rpb24gQ2Fyc01hbmFnZXIoKSB7XHJcblxyXG4gICAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuICAgIFxyXG5cclxuICAgIGNvbnN0IFtuYW1lLCBzZXROYW1lXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbYnJhbmQsIHNldEJyYW5kXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbZW5naW5lVHlwZSwgc2V0RW5naW5lXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbZW5naW5lSHAsIHNldEhwXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuICAgIGNvbnN0IFtkZXJnbywgc2V0RGVyZ29dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgXHJcbiAgICBjb25zdCByYW5kb21JZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKS50b0ZpeGVkKDApXHJcblxyXG4gICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZXZlbnQpID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgcG9zdEZvcm0oKTtcclxuICAgICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBzZXREZXJnbyh0cnVlKVxyXG5cclxuXHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IHBvc3RGb3JtID0gYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHBhcnNlSW50KHJhbmRvbUlkKSwgXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBicmFuZDogYnJhbmQsXHJcbiAgICAgICAgZW5naW5lOiB7dHlwZTplbmdpbmVUeXBlLCBocDogZW5naW5lSHB9XHJcbiAgICB9XHJcbiAgIGF3YWl0IGZldGNoKGAke0FQSX0vY2Fyc2AsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgfVxyXG5cclxuICAgdXNlRWZmZWN0KCgpID0+IHtcclxuXHJcbiAgICBpZihkZXJnbykge1xyXG4gICAgICAgIHBvc3RGb3JtKClcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaChgJHtBUEl9L2RiYClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHNldERhdGEoZGF0YS5jYXJzKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbn0sW10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgPGZvcm0+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJicmFuZFwiIHZhbHVlPXticmFuZH0gb25DaGFuZ2U9eyhlKSA9PiBzZXRCcmFuZChlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZW5naW5lXCIgdmFsdWU9e2VuZ2luZVR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW5naW5lKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbmdpbmVcIiB2YWx1ZT17ZW5naW5lSHB9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0SHAoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU3VibWl0KGV2ZW50KX0gLz5cclxuXHJcbiA8L2Zvcm0+XHJcbiA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcnNNYW5hZ2VyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMmNkMWI2MjgwMWFjYjE4MDJkMDVcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNhcnNNYW5hZ2VyIiwiQVBJIiwibmFtZSIsInNldE5hbWUiLCJicmFuZCIsInNldEJyYW5kIiwiZW5naW5lVHlwZSIsInNldEVuZ2luZSIsImVuZ2luZUhwIiwic2V0SHAiLCJkYXRhIiwic2V0RGF0YSIsImRlcmdvIiwic2V0RGVyZ28iLCJyYW5kb21JZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvRml4ZWQiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInBvc3RGb3JtIiwicHJldmVudERlZmF1bHQiLCJpZCIsInBhcnNlSW50IiwiZW5naW5lIiwidHlwZSIsImhwIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiY2FycyIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=