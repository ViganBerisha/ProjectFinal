"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 34:
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



function MovieManager() {
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
    IdOfMovie = _useState8[0],
    setIdOfMovie = _useState8[1];
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
    setIdOfMovie(id);
    setUpdateFrom(true);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, el.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, el.genres), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, el.directors), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
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
    movieId: IdOfMovie
  }) : null);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieManager);

/***/ }),

/***/ 35:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Movies = function Movies(props) {
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
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    dergo = _useState8[0],
    setDergo = _useState8[1];
  var data = {
    name: name,
    genres: genres,
    directors: directors
  };
  var update = function update(e) {
    e.preventDefault();
    console.log(props.movieId);
    fetch("".concat(API, "/movies/").concat(props.movieId), {
      method: "PUT",
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
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: update
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "name",
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "genres",
    value: genres,
    onChange: function onChange(e) {
      return setGenres(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "directors",
    value: directors,
    onChange: function onChange(e) {
      return setDirectors(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "submit",
    name: "button",
    value: "submit"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Movies);

/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _MovieManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _AddMovie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);






var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MovieManager__WEBPACK_IMPORTED_MODULE_2__["default"], null)
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
/******/ 	__webpack_require__.h = () => ("5fae653ba6054100f725")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBUztFQUdkLG9CQUVJLHVJQUVBLDJEQUFDLCtDQUFNLE9BQUcsZUFDVjtJQUFLLFNBQVMsRUFBQztFQUFXLGdCQUMxQiwyREFBQyxvREFBTSxxQkFDSCwyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxHQUFHO0lBQUMsT0FBTyxlQUFFLDJEQUFDLHFEQUFZO0VBQUksRUFBRyxlQUM3QywyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxVQUFVO0lBQUMsT0FBTyxlQUFFLDJEQUFDLGlEQUFRO0VBQUksRUFBRyxDQUMzQyxDQUNILENBRUg7QUFFWCxDQUFDO0FBRURQLDZDQUFlLGVBQ2YsMkRBQUMsd0RBQVUscUJBQ1AsMkRBQUMsR0FBRyxPQUFHLENBQ0UsRUFDYlMsUUFBUSxDQUFDQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O1VDOUIvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9Nb3ZpZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL01vdmllcy5qcyIsIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvYXBwLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYUJsYWNrYm9hcmQgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTW92aWVzIGZyb20gJy4vTW92aWVzJztcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE1vdmllTWFuYWdlcigpIHtcclxuXHJcbiAgICAvLyBjb25zdCBBUEkgPSBcImh0dHBzOi8vZHVtbXlqc29uLmNvbVwiO1xyXG4gICAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHJcbiAgICBjb25zdCBbbG9hZGVkLCBzZXRMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuXHJcblxyXG4gICAgY29uc3QgW3VwZGF0ZUZvcm0sIHNldFVwZGF0ZUZyb21dID0gdXNlU3RhdGUoZmFsc2UpXHJcblxyXG4gICAgY29uc3QgW0lkT2ZNb3ZpZSwgc2V0SWRPZk1vdmllXSA9IHVzZVN0YXRlKClcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGZldGNoKGAke0FQSX0vbW92aWVzYClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxbXSlcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTb2xkID0gKGV2ZW50LCBpZCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGZldGNoKGAke0FQSX0vbW92aWVzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dGb3JtVXBkYXRlID0gKGUsIGlkKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdChlKVxyXG5cclxuICAgICAgICBzZXRJZE9mTW92aWUoaWQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VXBkYXRlRnJvbSh0cnVlKVxyXG4gICAgfSAgIFxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgIFxyXG4gICAgPHVsPiBcclxuICAgICAgICB7ICAgbG9hZGVkICYmIGRhdGEubGVuZ3RoID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgIGtleT17aW5kZXh9PiBcclxuICAgICAgICAgICAgICAgICAgICAgICA8aDE+e2VsLm5hbWV9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57ZWwuZGlyZWN0b3JzfTwvaDM+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PlNvbGQhPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGU8L2J1dHRvbj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgPGgxPkxvYWRpbmc8L2gxPlxyXG4gICAgICAgIH0gICAgXHJcbiAgICAgPC91bD5cclxuXHJcbiAgICAgICAgeyAgIHVwZGF0ZUZvcm0gP1xyXG5cclxuICAgICAgICAgICAgPE1vdmllcyBtb3ZpZUlkPXtJZE9mTW92aWV9IC8+XHJcbiAgICAgICAgICAgIDogXHJcbiAgICAgICAgICAgIG51bGxcclxuICAgICAgICB9ICAgXHJcblxyXG5cclxuICAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vdmllTWFuYWdlciIsImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcblxuY29uc3QgTW92aWVzID0gKHByb3BzKSA9PiB7XG5cbiAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcblxuICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZ2VucmVzLCBzZXRHZW5yZXNdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2RpcmVjdG9ycyxzZXREaXJlY3RvcnMgXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtkZXJnbywgc2V0RGVyZ29dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBnZW5yZXM6IGdlbnJlcyxcbiAgICBkaXJlY3RvcnM6IGRpcmVjdG9yc1xuICB9O1xuICBcbiAgY29uc3QgdXBkYXRlID0gKGUpID0+e1xuICAgIFxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhwcm9wcy5tb3ZpZUlkKTtcbiAgICBcbiAgICBmZXRjaChgJHtBUEl9L21vdmllcy8ke3Byb3BzLm1vdmllSWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICA8Zm9ybSBvblN1Ym1pdD17dXBkYXRlfT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlKT0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJnZW5yZXNcIiB2YWx1ZT17Z2VucmVzfSBvbkNoYW5nZT17KGUpPT4gc2V0R2VucmVzKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZGlyZWN0b3JzXCIgdmFsdWU9e2RpcmVjdG9yc30gb25DaGFuZ2U9eyhlKT0+IHNldERpcmVjdG9ycyhlLnRhcmdldC52YWx1ZSl9Lz5cblxuICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgbmFtZT1cImJ1dHRvblwiIHZhbHVlPVwic3VibWl0XCIgLz5cbiAgICA8L2Zvcm0+XG4gIDwvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vdmllcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgTW92aWVNYW5hZ2VyIGZyb20gXCIuL01vdmllTWFuYWdlclwiO1xuaW1wb3J0IEFkZE1vdmllIGZyb20gXCIuL0FkZE1vdmllXCJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4vTmF2YmFyXCI7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBIYXNoUm91dGVyLCBSb3V0ZSwgUm91dGVzIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgPD5cblxuICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8TW92aWVNYW5hZ2VyIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRkLWNhclwiIGVsZW1lbnQ9ezxBZGRNb3ZpZSAvPn0gLz5cbiAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvPlxuICAgIClcbn1cblxuUmVhY3RET00ucmVuZGVyKCBcbjxIYXNoUm91dGVyPlxuICAgIDxBcHAgLz5cbjwvSGFzaFJvdXRlcj4gLCBcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjVmYWU2NTNiYTYwNTQxMDBmNzI1XCIpIl0sIm5hbWVzIjpbImZhQmxhY2tib2FyZCIsIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJNb3ZpZXMiLCJNb3ZpZU1hbmFnZXIiLCJBUEkiLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJkYXRhIiwic2V0RGF0YSIsInVwZGF0ZUZvcm0iLCJzZXRVcGRhdGVGcm9tIiwiSWRPZk1vdmllIiwic2V0SWRPZk1vdmllIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiaGFuZGxlU29sZCIsImV2ZW50IiwiaWQiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsInNob3dGb3JtVXBkYXRlIiwiZSIsImxlbmd0aCIsIm1hcCIsImVsIiwiaW5kZXgiLCJuYW1lIiwiZ2VucmVzIiwiZGlyZWN0b3JzIiwicHJvcHMiLCJzZXROYW1lIiwic2V0R2VucmVzIiwic2V0RGlyZWN0b3JzIiwiZGVyZ28iLCJzZXREZXJnbyIsInVwZGF0ZSIsIm1vdmllSWQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0YXJnZXQiLCJ2YWx1ZSIsIlJlYWN0RE9NIiwiQWRkTW92aWUiLCJOYXZiYXIiLCJCcm93c2VyUm91dGVyIiwiSGFzaFJvdXRlciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=