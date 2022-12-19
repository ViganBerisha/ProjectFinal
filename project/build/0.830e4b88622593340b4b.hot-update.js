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
      className: "mainCard"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: index,
      className: "card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      className: "card-img-top",
      src: "...",
      alt: "Card image cap"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
      className: "card-title"
    }, el.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, el.genres), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, el.directors), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "WATCH NOW"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick(e) {
        return showFormUpdate(e, el.id);
      }
    }, "Update Movie"))));
    // <div  key={index}> 
    //        <h1>{el.name}</h1>
    //         <h2>{el.genres}</h2> 
    //         <h3>{el.directors}</h3>

    //         <button type="button" onClick={(event) => handleSold(event, el.id)}>WATCH NOW</button>

    //         <button onClick={(e) => showFormUpdate(e, el.id)} >Update Movie</button> 
    //     </div>
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
/******/ 	__webpack_require__.h = () => ("0e27f1673a19959462cf")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBUSxPQUFPLEVBQUUsaUJBQUNJLENBQUM7UUFBQSxPQUFLRCxjQUFjLENBQUNDLENBQUMsRUFBRUcsRUFBRSxDQUFDUCxFQUFFLENBQUM7TUFBQTtJQUFDLGtCQUF1QixDQUN2RSxDQUNGLENBQ0E7SUFJUjtJQUNBO0lBQ0E7SUFDQTs7SUFFQTs7SUFFQTtJQUNBO0VBQ0osQ0FBQyxDQUFDLGdCQUVGLGlGQUFnQixDQUVsQixFQUVFYixVQUFVLGdCQUVWLDJEQUFDLCtDQUFNO0lBQUMsT0FBTyxFQUFFRTtFQUFVLEVBQUcsR0FFOUIsSUFBSSxDQUlSO0FBRVI7QUFFQSxpRUFBZVIsWUFBWTs7Ozs7Ozs7VUN4RzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL01vdmllTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9yZWFjdC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmFCbGFja2JvYXJkIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IE1vdmllcyBmcm9tICcuL01vdmllcyc7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBNb3ZpZU1hbmFnZXIoKSB7XHJcblxyXG4gICAgLy8gY29uc3QgQVBJID0gXCJodHRwczovL2R1bW15anNvbi5jb21cIjtcclxuICAgIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcblxyXG5cclxuICAgIGNvbnN0IFt1cGRhdGVGb3JtLCBzZXRVcGRhdGVGcm9tXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IFtJZE9mTW92aWUsIHNldElkT2ZNb3ZpZV0gPSB1c2VTdGF0ZSgpXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllc2ApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sW10pXHJcblxyXG4gICAgY29uc3QgaGFuZGxlU29sZCA9IChldmVudCwgaWQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllcy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93Rm9ybVVwZGF0ZSA9IChlLCBpZCkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoZSlcclxuXHJcbiAgICAgICAgc2V0SWRPZk1vdmllKGlkKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFVwZGF0ZUZyb20odHJ1ZSlcclxuICAgIH0gICBcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICBcclxuICAgIDx1bD4gXHJcbiAgICAgICAgeyAgIGxvYWRlZCAmJiBkYXRhLmxlbmd0aCA/IFxyXG4gICAgICAgICAgICBkYXRhLm1hcCgoZWwsaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21haW5DYXJkJz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImNhcmRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjYXJkLWltZy10b3BcIiBzcmM9XCIuLi5cIiBhbHQ9XCJDYXJkIGltYWdlIGNhcFwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPntlbC5uYW1lfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aDI+e2VsLmdlbnJlc308L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGgzPntlbC5kaXJlY3RvcnN9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCwgZWwuaWQpfT5XQVRDSCBOT1c8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHNob3dGb3JtVXBkYXRlKGUsIGVsLmlkKX0gPlVwZGF0ZSBNb3ZpZTwvYnV0dG9uPiBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAvLyA8ZGl2ICBrZXk9e2luZGV4fT4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgPGgxPntlbC5uYW1lfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIDxoMj57ZWwuZ2VucmVzfTwvaDI+IFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICA8aDM+e2VsLmRpcmVjdG9yc308L2gzPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCwgZWwuaWQpfT5XQVRDSCBOT1c8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHNob3dGb3JtVXBkYXRlKGUsIGVsLmlkKX0gPlVwZGF0ZSBNb3ZpZTwvYnV0dG9uPiBcclxuICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICA8aDE+TG9hZGluZzwvaDE+XHJcbiAgICAgICAgfSAgICBcclxuICAgICA8L3VsPlxyXG5cclxuICAgICAgICB7ICAgdXBkYXRlRm9ybSA/XHJcblxyXG4gICAgICAgICAgICA8TW92aWVzIG1vdmllSWQ9e0lkT2ZNb3ZpZX0gLz5cclxuICAgICAgICAgICAgOiBcclxuICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgIH0gICBcclxuXHJcblxyXG4gICAgIDwvPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW92aWVNYW5hZ2VyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMGUyN2YxNjczYTE5OTU5NDYyY2ZcIikiXSwibmFtZXMiOlsiZmFCbGFja2JvYXJkIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk1vdmllcyIsIk1vdmllTWFuYWdlciIsIkFQSSIsImxvYWRlZCIsInNldExvYWRlZCIsImRhdGEiLCJzZXREYXRhIiwidXBkYXRlRm9ybSIsInNldFVwZGF0ZUZyb20iLCJJZE9mTW92aWUiLCJzZXRJZE9mTW92aWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJoYW5kbGVTb2xkIiwiZXZlbnQiLCJpZCIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwic2hvd0Zvcm1VcGRhdGUiLCJlIiwibGVuZ3RoIiwibWFwIiwiZWwiLCJpbmRleCIsIm5hbWUiLCJnZW5yZXMiLCJkaXJlY3RvcnMiXSwic291cmNlUm9vdCI6IiJ9