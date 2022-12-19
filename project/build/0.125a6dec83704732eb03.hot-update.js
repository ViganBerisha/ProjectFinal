self["webpackHotUpdatereact"](0,{

/***/ 36:
/***/ (() => {

var API = "http://localhost:3000";
var data = {
  name: "Polonez",
  brand: "Daewoo"
};
fetch("".concat(API, "/cars/1"), {
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

/***/ }),

/***/ 34:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var _Car__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Car__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function CarsManager() {
  // const API = "https://dummyjson.com";
  var API = "http://localhost:3000";
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    data = _useState4[0],
    setData = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetch("".concat(API, "/cars")).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      setLoaded(true);
      setData(data);
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
  var handleSold = function handleSold(event, id) {
    event.preventDefault();
    fetch("".concat(API, "/cars/").concat(id), {
      method: "DELETE"
    }).then(function (response) {
      setData(data);
    })["catch"](function (error) {
      console.log(error);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index
    }, " ", el.category, " ", el.brand, " ", el.title, " ", el.thumbnail, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "Sold!"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", null, "Update"), " ");
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading"));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f9f80c92f10bcb458963")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDO01BQUE7SUFBQyxXQUFlLG9CQUFDLG9GQUF1QixNQUFNO0VBQzlMLENBQUMsQ0FBQyxnQkFFRixpRkFBZ0IsQ0FFbEI7QUFFVjtBQUVBLGlFQUFlTixXQUFXOzs7Ozs7OztVQ25EMUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uLzA3X0RheV80LzAyX0pTT05fU2VydmVyLzAxX0V4ZXJjaXNlL2pzL0Nhci5qcyIsIndlYnBhY2s6Ly9yZWFjdC8uLzA3X0RheV80LzAyX0pTT05fU2VydmVyLzAxX0V4ZXJjaXNlL2pzL0NhcnNNYW5hZ2VyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuXG5jb25zdCBkYXRhID0ge1xuICBuYW1lOiBcIlBvbG9uZXpcIixcbiAgYnJhbmQ6IFwiRGFld29vXCJcbn07XG5cbmZldGNoKGAke0FQSX0vY2Fycy8xYCwge1xuICBtZXRob2Q6IFwiUE9TVFwiLFxuICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgaGVhZGVyczoge1xuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gIH1cbn0pXG4gIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH0pXG4gIC5jYXRjaChlcnJvciA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9KTsiLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgQ2FyIGZyb20gXCIuL0NhclwiO1xyXG5cclxuZnVuY3Rpb24gQ2Fyc01hbmFnZXIoKSB7XHJcblxyXG4gICAgLy8gY29uc3QgQVBJID0gXCJodHRwczovL2R1bW15anNvbi5jb21cIjtcclxuICAgIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBmZXRjaChgJHtBUEl9L2NhcnNgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFtdKVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNvbGQgPSAoZXZlbnQsIGlkKSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgZmV0Y2goYCR7QVBJfS9jYXJzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHVsPiBcclxuICAgICAgICB7ICAgbG9hZGVkICYmIGRhdGEubGVuZ3RoID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2luZGV4fT4ge2VsLmNhdGVnb3J5fSB7ZWwuYnJhbmR9IHtlbC50aXRsZX0ge2VsLnRodW1ibmFpbH0gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LGVsLmlkKX0+U29sZCE8L2J1dHRvbj4gPGJ1dHRvbj5VcGRhdGU8L2J1dHRvbj4gPC9saT5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICA8aDE+TG9hZGluZzwvaDE+XHJcbiAgICAgICAgfSAgICBcclxuICAgICA8L3VsPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2Fyc01hbmFnZXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJmOWY4MGM5MmYxMGJjYjQ1ODk2M1wiKSJdLCJuYW1lcyI6WyJBUEkiLCJkYXRhIiwibmFtZSIsImJyYW5kIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNhciIsIkNhcnNNYW5hZ2VyIiwibG9hZGVkIiwic2V0TG9hZGVkIiwic2V0RGF0YSIsImhhbmRsZVNvbGQiLCJldmVudCIsImlkIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJtYXAiLCJlbCIsImluZGV4IiwiY2F0ZWdvcnkiLCJ0aXRsZSIsInRodW1ibmFpbCJdLCJzb3VyY2VSb290IjoiIn0=