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
    genres = _useState4[0],
    setGenres = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    directors = _useState6[0],
    setDirectors = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    image = _useState8[0],
    setImage = _useState8[1];
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
                genres: genres,
                directors: directors,
                image: image
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
    onSubmit: handleSubmit,
    className: "forma"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Type the name of the movie",
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Choose the genres",
    value: genres,
    onChange: function onChange(e) {
      return setGenres(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Made By",
    value: directors,
    onChange: function onChange(e) {
      return setDirectors(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Image",
    value: image,
    onChange: function onChange(e) {
      return setImage(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    name: "button",
    value: "submit"
  }, "Submit")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("74ea109fa8743cbdca3e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUluQyxPQUFPLENBQUNtQyxDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO0lBQUE7RUFBQyxFQUFFLHFGQUFLLGVBQ3pIO0lBQU8sSUFBSSxFQUFDLE1BQU07SUFBQyxXQUFXLEVBQUMsbUJBQW1CO0lBQUMsS0FBSyxFQUFFcEMsTUFBTztJQUFDLFFBQVEsRUFBRSxrQkFBQ2tDLENBQUM7TUFBQSxPQUFJakMsU0FBUyxDQUFDaUMsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLEtBQUssQ0FBQztJQUFBO0VBQUMsRUFBRSxxRkFBSyxlQUNuSDtJQUFPLElBQUksRUFBQyxNQUFNO0lBQUMsV0FBVyxFQUFDLFNBQVM7SUFBQyxLQUFLLEVBQUVsQyxTQUFVO0lBQUMsUUFBUSxFQUFFLGtCQUFDZ0MsQ0FBQztNQUFBLE9BQUkvQixZQUFZLENBQUMrQixDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO0lBQUE7RUFBQyxFQUFFLHFGQUFLLGVBQy9HO0lBQU8sSUFBSSxFQUFDLE1BQU07SUFBQyxXQUFXLEVBQUMsT0FBTztJQUFDLEtBQUssRUFBRWhDLEtBQU07SUFBQyxRQUFRLEVBQUUsa0JBQUM4QixDQUFDO01BQUEsT0FBSTdCLFFBQVEsQ0FBQzZCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUscUZBQUssZUFDckc7SUFBUSxJQUFJLEVBQUMsUUFBUTtJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFDO0VBQVEsWUFBZ0IsQ0FDN0QsQ0FLTjtBQUVIO0FBRUEsaUVBQWV4QyxZQUFZOzs7Ozs7OztVQ2hGM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvQWRkTW92aWUuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcblxyXG5mdW5jdGlvbiBNb3ZpZU1hbmFnZXIoKSB7XHJcblxyXG5jb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cclxuY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcclxuY29uc3QgW2dlbnJlcywgc2V0R2VucmVzXSA9IHVzZVN0YXRlKFwiXCIpXHJcbmNvbnN0IFtkaXJlY3RvcnMsIHNldERpcmVjdG9yc10gPSB1c2VTdGF0ZShcIlwiKVxyXG5jb25zdCBbaW1hZ2UsIHNldEltYWdlXSA9IHVzZVN0YXRlKFwiXCIpXHJcblxyXG5jb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuY29uc3QgW2RlcmdvLCBzZXREZXJnb10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG5jb25zdCByYW5kb21JZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKS50b0ZpeGVkKDApXHJcblxyXG5jb25zdCBoYW5kbGVTdWJtaXQgPSAoZXZlbnQpID0+IHtcclxuZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuc2V0RGVyZ28odHJ1ZSlcclxuXHJcbn1cclxuXHJcbmNvbnN0IHBvc3RGb3JtID0gYXN5bmMgKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBpZDogcGFyc2VJbnQocmFuZG9tSWQpLnRvU3RyaW5nKCksXHJcbiAgICBuYW1lOiBuYW1lLFxyXG4gICAgZ2VucmVzOiBnZW5yZXMsXHJcbiAgICBkaXJlY3RvcnM6IGRpcmVjdG9ycyxcclxuICAgIGltYWdlIDogaW1hZ2VcclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgYXdhaXQgZmV0Y2goYCR7QVBJfS9tb3ZpZXNgLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgfVxyXG4gICAgfSlcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG51c2VFZmZlY3QoKCkgPT4ge1xyXG5pZihkZXJnbyA9PT0gdHJ1ZSkge1xyXG5wb3N0Rm9ybSgpO1xyXG5cclxufSBlbHNlIHtcclxucmV0dXJuXHJcbn1cclxuXHJcbn0sW2RlcmdvXSlcclxuXHJcblxyXG5yZXR1cm4gKFxyXG48PlxyXG4gIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT0nZm9ybWEnPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUeXBlIHRoZSBuYW1lIG9mIHRoZSBtb3ZpZVwiICB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlKT0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfS8+PGJyLz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQ2hvb3NlIHRoZSBnZW5yZXNcIiB2YWx1ZT17Z2VucmVzfSBvbkNoYW5nZT17KGUpPT4gc2V0R2VucmVzKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk1hZGUgQnlcIiB2YWx1ZT17ZGlyZWN0b3JzfSBvbkNoYW5nZT17KGUpPT4gc2V0RGlyZWN0b3JzKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkltYWdlXCIgdmFsdWU9e2ltYWdlfSBvbkNoYW5nZT17KGUpPT4gc2V0SW1hZ2UoZS50YXJnZXQudmFsdWUpfS8+PGJyLz5cclxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gIDwvZm9ybT5cclxuICBcclxuIFxyXG5cclxuXHJcbjwvPlxyXG4pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vdmllTWFuYWdlciIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjc0ZWExMDlmYTg3NDNjYmRjYTNlXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJNb3ZpZU1hbmFnZXIiLCJBUEkiLCJuYW1lIiwic2V0TmFtZSIsImdlbnJlcyIsInNldEdlbnJlcyIsImRpcmVjdG9ycyIsInNldERpcmVjdG9ycyIsImltYWdlIiwic2V0SW1hZ2UiLCJkYXRhIiwic2V0RGF0YSIsImRlcmdvIiwic2V0RGVyZ28iLCJyYW5kb21JZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvRml4ZWQiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwicG9zdEZvcm0iLCJpZCIsInBhcnNlSW50IiwidG9TdHJpbmciLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJlIiwidGFyZ2V0IiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9