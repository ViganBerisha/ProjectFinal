"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 41:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Movies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
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
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    updateForm = _useState6[0],
    setUpdateFrom = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    IdofCar = _useState8[0],
    setIdOfCar = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetch("".concat(API, "/movies")).then(function (response) {
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
    fetch("".concat(API, "/movies/").concat(id), {
      method: "DELETE"
    }).then(function (response) {
      setData(data);
    })["catch"](function (error) {
      console.log(error);
    });
  };
  var showFormUpdate = function showFormUpdate(e, id) {
    e.preventDefault(e);
    setIdOfCar(id);
    setUpdateFrom(true);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index
    }, " ", el.name, " ", el.brand, " ", el.engine.type, " ", el.engine.hp, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "Sold!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick(e) {
        return showFormUpdate(e, el.id);
      }
    }, "Update"));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading")), updateForm ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Movies__WEBPACK_IMPORTED_MODULE_1__["default"], {
    carId: IdofCar
  }) : null);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieManager);

/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _MovieManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _AddMovie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);






var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MovieManager, null)
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
/******/ 	__webpack_require__.h = () => ("ea570e47983dd477f5c9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQUMsS0FBSyxFQUFFRTtFQUFRLEVBQUcsR0FFMUIsSUFBSSxDQUlSO0FBRVI7QUFFQSxpRUFBZXlCLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRkQ7QUFDTztBQUNRO0FBQ1I7QUFDSDtBQUM4QztBQUU1RSxJQUFNUSxHQUFHLEdBQUcsU0FBTkEsR0FBRyxHQUFTO0VBR2Qsb0JBRUksdUlBRUEsMkRBQUMsK0NBQU0sT0FBRyxlQUNWO0lBQUssU0FBUyxFQUFDO0VBQVcsZ0JBQzFCLDJEQUFDLG9EQUFNLHFCQUNILDJEQUFDLG1EQUFLO0lBQUMsSUFBSSxFQUFDLEdBQUc7SUFBQyxPQUFPLGVBQUUsMkRBQUMsWUFBWTtFQUFJLEVBQUcsZUFDN0MsMkRBQUMsbURBQUs7SUFBQyxJQUFJLEVBQUMsVUFBVTtJQUFDLE9BQU8sZUFBRSwyREFBQyxpREFBUTtFQUFJLEVBQUcsQ0FDM0MsQ0FDSCxDQUVIO0FBRVgsQ0FBQztBQUVEUCw2Q0FBZSxlQUNmLDJEQUFDLHdEQUFVLHFCQUNQLDJEQUFDLEdBQUcsT0FBRyxDQUNFLEVBQ2JTLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztVQzlCL0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvTW92aWVNYW5hZ2VyLmpzIiwid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBNb3ZpZXMgZnJvbSAnLi9Nb3ZpZXMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIENhcnNNYW5hZ2VyKCkge1xyXG5cclxuICAgIC8vIGNvbnN0IEFQSSA9IFwiaHR0cHM6Ly9kdW1teWpzb24uY29tXCI7XHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cclxuICAgIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuXHJcbiAgICBjb25zdCBbdXBkYXRlRm9ybSwgc2V0VXBkYXRlRnJvbV0gPSB1c2VTdGF0ZShmYWxzZSlcclxuXHJcbiAgICBjb25zdCBbSWRvZkNhciwgc2V0SWRPZkNhcl0gPSB1c2VTdGF0ZSgpXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllc2ApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sW10pXHJcblxyXG4gICAgY29uc3QgaGFuZGxlU29sZCA9IChldmVudCwgaWQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllcy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93Rm9ybVVwZGF0ZSA9IChlLCBpZCkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoZSlcclxuXHJcbiAgICAgICAgc2V0SWRPZkNhcihpZClcclxuICAgICAgICBcclxuICAgICAgICBzZXRVcGRhdGVGcm9tKHRydWUpXHJcbiAgICB9ICAgXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgXHJcbiAgICA8dWw+IFxyXG4gICAgICAgIHsgICBsb2FkZWQgJiYgZGF0YS5sZW5ndGggPyBcclxuICAgICAgICAgICAgZGF0YS5tYXAoKGVsLGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aW5kZXh9PiB7ZWwubmFtZX0ge2VsLmJyYW5kfSB7ZWwuZW5naW5lLnR5cGV9IHtlbC5lbmdpbmUuaHB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZVNvbGQoZXZlbnQsIGVsLmlkKX0+U29sZCE8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHNob3dGb3JtVXBkYXRlKGUsIGVsLmlkKX0gPlVwZGF0ZTwvYnV0dG9uPiBcclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6XHJcbiAgICAgICAgICAgIDxoMT5Mb2FkaW5nPC9oMT5cclxuICAgICAgICB9ICAgIFxyXG4gICAgIDwvdWw+XHJcblxyXG4gICAgICAgIHsgICB1cGRhdGVGb3JtID9cclxuXHJcbiAgICAgICAgICAgIDxNb3ZpZXMgY2FySWQ9e0lkb2ZDYXJ9IC8+XHJcbiAgICAgICAgICAgIDogXHJcbiAgICAgICAgICAgIG51bGxcclxuICAgICAgICB9ICAgXHJcblxyXG5cclxuICAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vdmllTWFuYWdlciIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgQ2Fyc01hbmFnZXIgZnJvbSBcIi4vTW92aWVNYW5hZ2VyXCI7XG5pbXBvcnQgQWRkTW92aWUgZnJvbSBcIi4vQWRkTW92aWVcIlxuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi9OYXZiYXJcIjtcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEhhc2hSb3V0ZXIsIFJvdXRlLCBSb3V0ZXMgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG5cblxuICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICA8PlxuXG4gICAgICAgIDxOYXZiYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPFJvdXRlcz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxNb3ZpZU1hbmFnZXIgLz59IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZGQtY2FyXCIgZWxlbWVudD17PEFkZE1vdmllIC8+fSAvPlxuICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuXG5SZWFjdERPTS5yZW5kZXIoIFxuPEhhc2hSb3V0ZXI+XG4gICAgPEFwcCAvPlxuPC9IYXNoUm91dGVyPiAsIFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZWE1NzBlNDc5ODNkZDQ3N2Y1YzlcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk1vdmllcyIsIkNhcnNNYW5hZ2VyIiwiQVBJIiwibG9hZGVkIiwic2V0TG9hZGVkIiwiZGF0YSIsInNldERhdGEiLCJ1cGRhdGVGb3JtIiwic2V0VXBkYXRlRnJvbSIsIklkb2ZDYXIiLCJzZXRJZE9mQ2FyIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiaGFuZGxlU29sZCIsImV2ZW50IiwiaWQiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsInNob3dGb3JtVXBkYXRlIiwiZSIsImxlbmd0aCIsIm1hcCIsImVsIiwiaW5kZXgiLCJuYW1lIiwiYnJhbmQiLCJlbmdpbmUiLCJ0eXBlIiwiaHAiLCJNb3ZpZU1hbmFnZXIiLCJSZWFjdERPTSIsIkFkZE1vdmllIiwiTmF2YmFyIiwiQnJvd3NlclJvdXRlciIsIkhhc2hSb3V0ZXIiLCJSb3V0ZSIsIlJvdXRlcyIsIkFwcCIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9