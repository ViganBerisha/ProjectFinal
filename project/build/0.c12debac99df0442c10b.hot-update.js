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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: index
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
/******/ 	__webpack_require__.h = () => ("ef4cca06d3215c3ccdc3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtFQUNKLENBQUMsQ0FBQyxnQkFFRixpRkFBZ0IsQ0FFakIsRUFFQ2IsVUFBVSxnQkFFViwyREFBQywrQ0FBTTtJQUFDLE9BQU8sRUFBRUU7RUFBVSxFQUFHLEdBRTlCLElBQUksQ0FJUjtBQUVSO0FBRUEsaUVBQWVSLFlBQVk7Ozs7Ozs7O1VDeEczQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9Nb3ZpZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZhQmxhY2tib2FyZCwgZmFEaXNwbGF5IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IE1vdmllcyBmcm9tICcuL01vdmllcyc7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBNb3ZpZU1hbmFnZXIoKSB7XHJcblxyXG4gICAgLy8gY29uc3QgQVBJID0gXCJodHRwczovL2R1bW15anNvbi5jb21cIjtcclxuICAgIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcblxyXG5cclxuICAgIGNvbnN0IFt1cGRhdGVGb3JtLCBzZXRVcGRhdGVGcm9tXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IFtJZE9mTW92aWUsIHNldElkT2ZNb3ZpZV0gPSB1c2VTdGF0ZSgpXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllc2ApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sW10pXHJcblxyXG4gICAgY29uc3QgaGFuZGxlU29sZCA9IChldmVudCwgaWQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllcy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93Rm9ybVVwZGF0ZSA9IChlLCBpZCkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoZSlcclxuXHJcbiAgICAgICAgc2V0SWRPZk1vdmllKGlkKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFVwZGF0ZUZyb20odHJ1ZSlcclxuICAgIH0gICBcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICBcclxuICAgIDxkaXY+IFxyXG4gICAgICAgIHsgICBsb2FkZWQgJiYgZGF0YS5sZW5ndGggPyBcclxuICAgICAgICAgICAgZGF0YS5tYXAoKGVsLGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIDxkaXYga2V5PXtpbmRleH0gPiBcclxuICAgICAgICAgICAgICAgICAgICAgICA8aDE+e2VsLm5hbWV9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57ZWwuZGlyZWN0b3JzfTwvaDM+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PldBVENIIE5PVzwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gc2hvd0Zvcm1VcGRhdGUoZSwgZWwuaWQpfSA+VXBkYXRlIE1vdmllPC9idXR0b24+IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgLy8gKFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJjYXJkXCIgPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgIDxpbWcgY2xhc3NOYW1lPVwiY2FyZC1pbWctdG9wXCIgc3JjPVwiLi4uXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj48L2ltZz5cclxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGgxIGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57ZWwubmFtZX08L2gxPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgIDxoMz57ZWwuZGlyZWN0b3JzfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZVNvbGQoZXZlbnQsIGVsLmlkKX0+V0FUQ0ggTk9XPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGUgTW92aWU8L2J1dHRvbj4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAvLyAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6XHJcbiAgICAgICAgICAgIDxoMT5Mb2FkaW5nPC9oMT5cclxuICAgICAgICB9ICAgIFxyXG4gICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7ICAgdXBkYXRlRm9ybSA/XHJcblxyXG4gICAgICAgICAgICA8TW92aWVzIG1vdmllSWQ9e0lkT2ZNb3ZpZX0gLz5cclxuICAgICAgICAgICAgOiBcclxuICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgIH0gICBcclxuXHJcblxyXG4gICAgIDwvPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW92aWVNYW5hZ2VyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZWY0Y2NhMDZkMzIxNWMzY2NkYzNcIikiXSwibmFtZXMiOlsiZmFCbGFja2JvYXJkIiwiZmFEaXNwbGF5IiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk1vdmllcyIsIk1vdmllTWFuYWdlciIsIkFQSSIsImxvYWRlZCIsInNldExvYWRlZCIsImRhdGEiLCJzZXREYXRhIiwidXBkYXRlRm9ybSIsInNldFVwZGF0ZUZyb20iLCJJZE9mTW92aWUiLCJzZXRJZE9mTW92aWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJoYW5kbGVTb2xkIiwiZXZlbnQiLCJpZCIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwic2hvd0Zvcm1VcGRhdGUiLCJlIiwibGVuZ3RoIiwibWFwIiwiZWwiLCJpbmRleCIsIm5hbWUiLCJnZW5yZXMiLCJkaXJlY3RvcnMiXSwic291cmNlUm9vdCI6IiJ9