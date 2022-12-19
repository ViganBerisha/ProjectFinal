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
      key: index,
      style: display = flex
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, el.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, el.genres), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, el.directors), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "WATCH NOW"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick(e) {
        return showFormUpdate(e, el.id);
      }
    }, "Update Movie"));
    // (

    //     <div key={index} className="card" >
    //     <img className="card-img-top" src="..." alt="Card image cap"></img>
    //     <div className="card-body">
    //       <h1 className="card-title">{el.name}</h1>
    //       <h2>{el.genres}</h2>
    //       <h3>{el.directors}</h3>
    //       <button type="button" onClick={(event) => handleSold(event, el.id)}>WATCH NOW</button>
    //          <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
    //     </div>
    //   </div>

    // )
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading")), updateForm ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Movies__WEBPACK_IMPORTED_MODULE_1__["default"], {
    movieId: IdOfMovie
  }) : null);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e47dd562e0026d4c8f13")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUlBO0VBQ0osQ0FBQyxDQUFDLGdCQUVGLGlGQUFnQixDQUVsQixFQUVFYixVQUFVLGdCQUVWLDJEQUFDLCtDQUFNO0lBQUMsT0FBTyxFQUFFRTtFQUFVLEVBQUcsR0FFOUIsSUFBSSxDQUlSO0FBRVI7QUFFQSxpRUFBZVIsWUFBWTs7Ozs7Ozs7VUN4RzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL01vdmllTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9yZWFjdC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmFCbGFja2JvYXJkLCBmYURpc3BsYXkgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTW92aWVzIGZyb20gJy4vTW92aWVzJztcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE1vdmllTWFuYWdlcigpIHtcclxuXHJcbiAgICAvLyBjb25zdCBBUEkgPSBcImh0dHBzOi8vZHVtbXlqc29uLmNvbVwiO1xyXG4gICAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHJcbiAgICBjb25zdCBbbG9hZGVkLCBzZXRMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuXHJcblxyXG4gICAgY29uc3QgW3VwZGF0ZUZvcm0sIHNldFVwZGF0ZUZyb21dID0gdXNlU3RhdGUoZmFsc2UpXHJcblxyXG4gICAgY29uc3QgW0lkT2ZNb3ZpZSwgc2V0SWRPZk1vdmllXSA9IHVzZVN0YXRlKClcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGZldGNoKGAke0FQSX0vbW92aWVzYClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxbXSlcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTb2xkID0gKGV2ZW50LCBpZCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGZldGNoKGAke0FQSX0vbW92aWVzLyR7aWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dGb3JtVXBkYXRlID0gKGUsIGlkKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdChlKVxyXG5cclxuICAgICAgICBzZXRJZE9mTW92aWUoaWQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VXBkYXRlRnJvbSh0cnVlKVxyXG4gICAgfSAgIFxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgIFxyXG4gICAgPHVsPiBcclxuICAgICAgICB7ICAgbG9hZGVkICYmIGRhdGEubGVuZ3RoID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXtkaXNwbGF5PWZsZXh9PiBcclxuICAgICAgICAgICAgICAgICAgICAgICA8aDE+e2VsLm5hbWV9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57ZWwuZGlyZWN0b3JzfTwvaDM+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PldBVENIIE5PVzwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gc2hvd0Zvcm1VcGRhdGUoZSwgZWwuaWQpfSA+VXBkYXRlIE1vdmllPC9idXR0b24+IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgLy8gKFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJjYXJkXCIgPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgIDxpbWcgY2xhc3NOYW1lPVwiY2FyZC1pbWctdG9wXCIgc3JjPVwiLi4uXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj48L2ltZz5cclxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGgxIGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57ZWwubmFtZX08L2gxPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgIDxoMz57ZWwuZGlyZWN0b3JzfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZVNvbGQoZXZlbnQsIGVsLmlkKX0+V0FUQ0ggTk9XPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGUgTW92aWU8L2J1dHRvbj4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAvLyAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6XHJcbiAgICAgICAgICAgIDxoMT5Mb2FkaW5nPC9oMT5cclxuICAgICAgICB9ICAgIFxyXG4gICAgIDwvdWw+XHJcblxyXG4gICAgICAgIHsgICB1cGRhdGVGb3JtID9cclxuXHJcbiAgICAgICAgICAgIDxNb3ZpZXMgbW92aWVJZD17SWRPZk1vdmllfSAvPlxyXG4gICAgICAgICAgICA6IFxyXG4gICAgICAgICAgICBudWxsXHJcbiAgICAgICAgfSAgIFxyXG5cclxuXHJcbiAgICAgPC8+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb3ZpZU1hbmFnZXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJlNDdkZDU2MmUwMDI2ZDRjOGYxM1wiKSJdLCJuYW1lcyI6WyJmYUJsYWNrYm9hcmQiLCJmYURpc3BsYXkiLCJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTW92aWVzIiwiTW92aWVNYW5hZ2VyIiwiQVBJIiwibG9hZGVkIiwic2V0TG9hZGVkIiwiZGF0YSIsInNldERhdGEiLCJ1cGRhdGVGb3JtIiwic2V0VXBkYXRlRnJvbSIsIklkT2ZNb3ZpZSIsInNldElkT2ZNb3ZpZSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImhhbmRsZVNvbGQiLCJldmVudCIsImlkIiwicHJldmVudERlZmF1bHQiLCJtZXRob2QiLCJzaG93Rm9ybVVwZGF0ZSIsImUiLCJsZW5ndGgiLCJtYXAiLCJlbCIsImluZGV4IiwiZGlzcGxheSIsImZsZXgiLCJuYW1lIiwiZ2VucmVzIiwiZGlyZWN0b3JzIl0sInNvdXJjZVJvb3QiOiIifQ==