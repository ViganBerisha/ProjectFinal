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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MovieUpdate() {
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
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setDergo(true);
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (dergo === true) {
      updateForm();
    } else {
      return;
    }
  }, [dergo]);
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieUpdate);

//   useEffect(() => {
//   if(dergo === true) {
//   updateForm();

//   } else {
//   return
//   }

//   },[dergo])

//   return (
//   <>
//     <form onSubmit={handleSubmit} className='forma'>
//       <input type="text" placeholder="Type the name of the movie"  value={name} onChange={(e)=> setName(e.target.value)}/><br/>
//       <input type="text" placeholder="Choose the genres" value={genres} onChange={(e)=> setGenres(e.target.value)}/><br/>
//       <input type="text" placeholder="Made By" value={directors} onChange={(e)=> setDirectors(e.target.value)}/><br/>
//       <input type="text" placeholder="Image" value={image} onChange={(e)=> setImage(e.target.value)}/><br/>
//       <button type="submit" name="button" value="submit">Submit</button>
//     </form>

//   </>
//   )

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
/* harmony import */ var _UpdateMovie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(38);







var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MovieManager__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Route, {
    path: "/add-movie",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddMovie__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.HashRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null)), document.getElementById("app"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("912039907566585b5e4f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQVksQ0FBQ1csQ0FBQyxDQUFDZ0IsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFFNUc7SUFBTyxJQUFJLEVBQUMsUUFBUTtJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFDO0VBQVEsRUFBRyxDQUM3QyxDQUNOO0FBRUg7QUFHQSxpRUFBZW5DLFdBQVcsRUFBQzs7QUFFN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RjBCO0FBQ087QUFDUztBQUNUO0FBQ0g7QUFDUztBQUNxQztBQUU1RSxJQUFNNkMsR0FBRyxHQUFHLFNBQU5BLEdBQUcsR0FBUztFQUdkLG9CQUVJLHVJQUVBLDJEQUFDLCtDQUFNLE9BQUcsZUFDVjtJQUFLLFNBQVMsRUFBQztFQUFXLGdCQUMxQiwyREFBQyxvREFBTSxxQkFDSCwyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxHQUFHO0lBQUMsT0FBTyxlQUFFLDJEQUFDLHFEQUFZO0VBQUksRUFBRyxlQUM3QywyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxZQUFZO0lBQUMsT0FBTyxlQUFFLDJEQUFDLGlEQUFRO0VBQUksRUFBRyxDQUU3QyxDQUNILENBRUg7QUFFWCxDQUFDO0FBRURULDZDQUFlLGVBQ2YsMkRBQUMsd0RBQVUscUJBQ1AsMkRBQUMsR0FBRyxPQUFHLENBQ0UsRUFDYlcsUUFBUSxDQUFDQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O1VDaEMvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9VcGRhdGVNb3ZpZS5qcyIsIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvYXBwLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5cclxuZnVuY3Rpb24gTW92aWVVcGRhdGUoKSB7XHJcblxyXG5jb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cclxuY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcclxuY29uc3QgW2dlbnJlcywgc2V0R2VucmVzXSA9IHVzZVN0YXRlKFwiXCIpXHJcbmNvbnN0IFtkaXJlY3RvcnMsIHNldERpcmVjdG9yc10gPSB1c2VTdGF0ZShcIlwiKVxyXG5jb25zdCBbaW1hZ2UsIHNldEltYWdlXSA9IHVzZVN0YXRlKFwiXCIpXHJcblxyXG5jb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuY29uc3QgW2RlcmdvLCBzZXREZXJnb10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG5cclxuY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2ZW50KSA9PiB7XHJcbmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbnNldERlcmdvKHRydWUpXHJcblxyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSAoZSkgPT57XHJcbiAgICBcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2cocHJvcHMubW92aWVJZCk7XHJcbiAgICBcclxuICAgIGZldGNoKGAke0FQSX0vbW92aWVzLyR7cHJvcHMubW92aWVJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICBpZihkZXJnbyA9PT0gdHJ1ZSkge1xyXG4gIHVwZGF0ZUZvcm0oKTtcclxuICBcclxuICB9IGVsc2Uge1xyXG4gIHJldHVyblxyXG4gIH1cclxuICBcclxuICB9LFtkZXJnb10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgPGZvcm0gb25TdWJtaXQ9e3VwZGF0ZX0+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlKT0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImdlbnJlc1wiIHZhbHVlPXtnZW5yZXN9IG9uQ2hhbmdlPXsoZSk9PiBzZXRHZW5yZXMoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImRpcmVjdG9yc1wiIHZhbHVlPXtkaXJlY3RvcnN9IG9uQ2hhbmdlPXsoZSk9PiBzZXREaXJlY3RvcnMoZS50YXJnZXQudmFsdWUpfS8+XHJcblxyXG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIiAvPlxyXG4gICAgPC9mb3JtPlxyXG4gIDwvPlxyXG4gIClcclxuICB9XHJcblxyXG4gIFxyXG4gIGV4cG9ydCBkZWZhdWx0IE1vdmllVXBkYXRlO1xyXG4gIFxyXG4vLyAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbi8vICAgaWYoZGVyZ28gPT09IHRydWUpIHtcclxuLy8gICB1cGRhdGVGb3JtKCk7XHJcbiAgXHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICByZXR1cm5cclxuLy8gICB9XHJcbiAgXHJcbi8vICAgfSxbZGVyZ29dKVxyXG4gIFxyXG4gIFxyXG4vLyAgIHJldHVybiAoXHJcbi8vICAgPD5cclxuLy8gICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT0nZm9ybWEnPlxyXG4vLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIG5hbWUgb2YgdGhlIG1vdmllXCIgIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz48YnIvPlxyXG4vLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNob29zZSB0aGUgZ2VucmVzXCIgdmFsdWU9e2dlbnJlc30gb25DaGFuZ2U9eyhlKT0+IHNldEdlbnJlcyhlLnRhcmdldC52YWx1ZSl9Lz48YnIvPlxyXG4vLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk1hZGUgQnlcIiB2YWx1ZT17ZGlyZWN0b3JzfSBvbkNoYW5nZT17KGUpPT4gc2V0RGlyZWN0b3JzKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbi8vICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiSW1hZ2VcIiB2YWx1ZT17aW1hZ2V9IG9uQ2hhbmdlPXsoZSk9PiBzZXRJbWFnZShlLnRhcmdldC52YWx1ZSl9Lz48YnIvPlxyXG4vLyAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cclxuLy8gICAgIDwvZm9ybT5cclxuICAgIFxyXG4gICBcclxuICBcclxuICBcclxuLy8gICA8Lz5cclxuLy8gICApIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBNb3ZpZU1hbmFnZXIgZnJvbSBcIi4vTW92aWVNYW5hZ2VyXCI7XG5pbXBvcnQgQWRkTW92aWUgZnJvbSBcIi4vQWRkTW92aWVcIlxuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi9OYXZiYXJcIjtcbmltcG9ydCBVcGRhdGVNb3ZpZSBmcm9tICcuL1VwZGF0ZU1vdmllJ1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgSGFzaFJvdXRlciwgUm91dGUsIFJvdXRlcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgXG4gICAgICAgIDw+XG5cbiAgICAgICAgPE5hdmJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8Um91dGVzPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PE1vdmllTWFuYWdlciAvPn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkZC1tb3ZpZVwiIGVsZW1lbnQ9ezxBZGRNb3ZpZSAvPn0gLz5cblxuICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuXG5SZWFjdERPTS5yZW5kZXIoIFxuPEhhc2hSb3V0ZXI+XG4gICAgPEFwcCAvPlxuPC9IYXNoUm91dGVyPiAsIFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiOTEyMDM5OTA3NTY2NTg1YjVlNGZcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk1vdmllVXBkYXRlIiwiQVBJIiwibmFtZSIsInNldE5hbWUiLCJnZW5yZXMiLCJzZXRHZW5yZXMiLCJkaXJlY3RvcnMiLCJzZXREaXJlY3RvcnMiLCJpbWFnZSIsInNldEltYWdlIiwiZGF0YSIsInNldERhdGEiLCJkZXJnbyIsInNldERlcmdvIiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVwZGF0ZSIsImUiLCJjb25zb2xlIiwibG9nIiwicHJvcHMiLCJtb3ZpZUlkIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZXJyb3IiLCJ1cGRhdGVGb3JtIiwidGFyZ2V0IiwidmFsdWUiLCJSZWFjdERPTSIsIk1vdmllTWFuYWdlciIsIkFkZE1vdmllIiwiTmF2YmFyIiwiVXBkYXRlTW92aWUiLCJCcm93c2VyUm91dGVyIiwiSGFzaFJvdXRlciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=