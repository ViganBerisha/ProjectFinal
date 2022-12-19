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
    setIdOfMovie(id);
    setUpdateFrom(true);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "wrapper"
  }, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "class": "card text-bg-dark"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      src: el.image,
      "class": "card-img",
      alt: "..."
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "class": "card-img-overlay"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h5", {
      "class": "card-title"
    }, el.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      "class": "card-text"
    }, el.directors), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      "class": "card-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", null, el.genres)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "WATCH NOW"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick(e) {
        return showFormUpdate(e, el.id);
      }
    }, "Update Movie")));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading")), updateForm ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Movies__WEBPACK_IMPORTED_MODULE_1__["default"], {
    movieId: IdOfMovie
  }) : null);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieManager);
// <div key={index} > 
//     <img src={el.image}></img>
//        <h1>{el.name}</h1>
//         <h3>{el.genres}</h3> 
//         <p>Directed by: {el.directors}</p>

//         <button type="button" onClick={(event) => handleSold(event, el.id)}>WATCH NOW</button>

//         <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
//     </div>
// (

// )
//   return       <div key={index} className="card" >
//   <img className="card-img-top" src={el.image} alt="Card image cap"></img>
//   <div className="card-body">
//     <h1 className="card-title">{el.name}</h1>
//     <h2>{el.genres}</h2>
//     <p>Directed by: {el.directors}</p>
//     <button type="button" onClick={(event) => handleSold(event, el.id)}>WATCH NOW</button>
//        <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
//   </div>
// </div>

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4e70cdabf5cc85ac325f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRUcsRUFBRSxDQUFDUCxFQUFFLENBQUM7TUFBQTtJQUFDLGtCQUF1QixDQUNwRSxDQUNGO0VBR04sQ0FBQyxDQUFDLGdCQUVGLGlGQUFnQixDQUVqQixFQUVDYixVQUFVLGdCQUV0QiwyREFBQywrQ0FBTTtJQUFDLE9BQU8sRUFBRUU7RUFBVSxFQUFHLEdBRWxCLElBQUksQ0FJUjtBQUVSO0FBR0EsaUVBQWVSLFlBQVk7QUFDM0I7QUFDRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBSUU7QUFDVTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUN0SGQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvTW92aWVNYW5hZ2VyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYUJsYWNrYm9hcmQsIGZhRGlzcGxheSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBNb3ZpZXMgZnJvbSAnLi9Nb3ZpZXMnO1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gTW92aWVNYW5hZ2VyKCkge1xyXG5cclxuICAgIC8vIGNvbnN0IEFQSSA9IFwiaHR0cHM6Ly9kdW1teWpzb24uY29tXCI7XHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cclxuICAgIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuXHJcbiAgICBjb25zdCBbdXBkYXRlRm9ybSwgc2V0VXBkYXRlRnJvbV0gPSB1c2VTdGF0ZShmYWxzZSlcclxuXHJcbiAgICBjb25zdCBbSWRPZk1vdmllLCBzZXRJZE9mTW92aWVdID0gdXNlU3RhdGUoKVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goYCR7QVBJfS9tb3ZpZXNgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFtdKVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNvbGQgPSAoZXZlbnQsIGlkKSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgZmV0Y2goYCR7QVBJfS9tb3ZpZXMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvcm1VcGRhdGUgPSAoZSwgaWQpID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBzZXRJZE9mTW92aWUoaWQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VXBkYXRlRnJvbSh0cnVlKVxyXG4gICAgfSAgIFxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzc05hbWU9J3dyYXBwZXInPiBcclxuICAgICAgICB7ICAgbG9hZGVkICYmIGRhdGEubGVuZ3RoID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICByZXR1cm4gICA8ZGl2IGNsYXNzPVwiY2FyZCB0ZXh0LWJnLWRhcmtcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz17ZWwuaW1hZ2V9IGNsYXNzPVwiY2FyZC1pbWdcIiBhbHQ9XCIuLi5cIj48L2ltZz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pbWctb3ZlcmxheVwiPlxyXG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPntlbC5uYW1lfTwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPntlbC5kaXJlY3RvcnN9PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIj48c21hbGw+e2VsLmdlbnJlc308L3NtYWxsPjwvcD5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPHAgIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCwgZWwuaWQpfT5XQVRDSCBOT1c8L3A+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGUgTW92aWU8L2J1dHRvbj4gXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6XHJcbiAgICAgICAgICAgIDxoMT5Mb2FkaW5nPC9oMT5cclxuICAgICAgICB9ICAgIFxyXG4gICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7ICAgdXBkYXRlRm9ybSA/XHJcblxyXG48TW92aWVzIG1vdmllSWQ9e0lkT2ZNb3ZpZX0gLz5cclxuICAgICAgICAgICAgOiBcclxuICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgfSAgIFxyXG5cclxuXHJcbiAgICAgPC8+XHJcbiAgKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW92aWVNYW5hZ2VyXHJcbi8vIDxkaXYga2V5PXtpbmRleH0gPiBcclxuICAvLyAgICAgPGltZyBzcmM9e2VsLmltYWdlfT48L2ltZz5cclxuICAvLyAgICAgICAgPGgxPntlbC5uYW1lfTwvaDE+XHJcbiAgLy8gICAgICAgICA8aDM+e2VsLmdlbnJlc308L2gzPiBcclxuICAvLyAgICAgICAgIDxwPkRpcmVjdGVkIGJ5OiB7ZWwuZGlyZWN0b3JzfTwvcD5cclxuICBcclxuICAvLyAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCwgZWwuaWQpfT5XQVRDSCBOT1c8L2J1dHRvbj5cclxuICBcclxuICAvLyAgICAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHNob3dGb3JtVXBkYXRlKGUsIGVsLmlkKX0gPlVwZGF0ZSBNb3ZpZTwvYnV0dG9uPiBcclxuICAvLyAgICAgPC9kaXY+XHJcbiAgLy8gKFxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgLy8gKVxyXG4gICAgICAgICAgICAgIC8vICAgcmV0dXJuICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiY2FyZFwiID5cclxuICAgICAgICAgICAgICAvLyAgIDxpbWcgY2xhc3NOYW1lPVwiY2FyZC1pbWctdG9wXCIgc3JjPXtlbC5pbWFnZX0gYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj48L2ltZz5cclxuICAgICAgICAgICAgICAvLyAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgLy8gICAgIDxoMSBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+e2VsLm5hbWV9PC9oMT5cclxuICAgICAgICAgICAgICAvLyAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj5cclxuICAgICAgICAgICAgICAvLyAgICAgPHA+RGlyZWN0ZWQgYnk6IHtlbC5kaXJlY3RvcnN9PC9wPlxyXG4gICAgICAgICAgICAgIC8vICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZVNvbGQoZXZlbnQsIGVsLmlkKX0+V0FUQ0ggTk9XPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgLy8gICAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHNob3dGb3JtVXBkYXRlKGUsIGVsLmlkKX0gPlVwZGF0ZSBNb3ZpZTwvYnV0dG9uPiBcclxuICAgICAgICAgICAgICAvLyAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIC8vIDwvZGl2PiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjRlNzBjZGFiZjVjYzg1YWMzMjVmXCIpIl0sIm5hbWVzIjpbImZhQmxhY2tib2FyZCIsImZhRGlzcGxheSIsIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJNb3ZpZXMiLCJNb3ZpZU1hbmFnZXIiLCJBUEkiLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJkYXRhIiwic2V0RGF0YSIsInVwZGF0ZUZvcm0iLCJzZXRVcGRhdGVGcm9tIiwiSWRPZk1vdmllIiwic2V0SWRPZk1vdmllIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiaGFuZGxlU29sZCIsImV2ZW50IiwiaWQiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsInNob3dGb3JtVXBkYXRlIiwiZSIsImxlbmd0aCIsIm1hcCIsImVsIiwiaW5kZXgiLCJpbWFnZSIsIm5hbWUiLCJkaXJlY3RvcnMiLCJnZW5yZXMiXSwic291cmNlUm9vdCI6IiJ9