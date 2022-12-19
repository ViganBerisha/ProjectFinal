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
  var randomId = Math.floor(Math.random() * 10000).toFixed(0);
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

// useEffect(() => {
// if(dergo === true) {
// updateForm();

// } else {
// return
// }

// },[dergo])

// return (
// <>
//   <form onSubmit={handleSubmit} className='forma'>
//     <input type="text" placeholder="Type the name of the movie"  value={name} onChange={(e)=> setName(e.target.value)}/><br/>
//     <input type="text" placeholder="Choose the genres" value={genres} onChange={(e)=> setGenres(e.target.value)}/><br/>
//     <input type="text" placeholder="Made By" value={directors} onChange={(e)=> setDirectors(e.target.value)}/><br/>
//     <input type="text" placeholder="Image" value={image} onChange={(e)=> setImage(e.target.value)}/><br/>
//     <button type="submit" name="button" value="submit">Submit</button>
//   </form>

// </>
// )
// }

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
/******/ 	__webpack_require__.h = () => ("5a23bd4e54309fefb405")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZSxNQUFNLENBQUNDLEtBQUssQ0FBQztJQUFBO0VBQUMsRUFBRSxlQUU1RztJQUFPLElBQUksRUFBQyxRQUFRO0lBQUMsSUFBSSxFQUFDLFFBQVE7SUFBQyxLQUFLLEVBQUM7RUFBUSxFQUFHLENBQzdDLENBQ047QUFFSDtBQUVBLGlFQUFldkMsV0FBVzs7QUFFMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGd0I7QUFDTztBQUNTO0FBQ1Q7QUFDSDtBQUNTO0FBQ3FDO0FBRTVFLElBQU1pRCxHQUFHLEdBQUcsU0FBTkEsR0FBRyxHQUFTO0VBR2Qsb0JBRUksdUlBRUEsMkRBQUMsK0NBQU0sT0FBRyxlQUNWO0lBQUssU0FBUyxFQUFDO0VBQVcsZ0JBQzFCLDJEQUFDLG9EQUFNLHFCQUNILDJEQUFDLG1EQUFLO0lBQUMsSUFBSSxFQUFDLEdBQUc7SUFBQyxPQUFPLGVBQUUsMkRBQUMscURBQVk7RUFBSSxFQUFHLGVBQzdDLDJEQUFDLG1EQUFLO0lBQUMsSUFBSSxFQUFDLFlBQVk7SUFBQyxPQUFPLGVBQUUsMkRBQUMsaURBQVE7RUFBSSxFQUFHLENBRTdDLENBQ0gsQ0FFSDtBQUVYLENBQUM7QUFFRFQsNkNBQWUsZUFDZiwyREFBQyx3REFBVSxxQkFDUCwyREFBQyxHQUFHLE9BQUcsQ0FDRSxFQUNiVyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7VUNoQy9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL1VwZGF0ZU1vdmllLmpzIiwid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcblxyXG5mdW5jdGlvbiBNb3ZpZVVwZGF0ZSgpIHtcclxuXHJcbmNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG5jb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZShcIlwiKVxyXG5jb25zdCBbZ2VucmVzLCBzZXRHZW5yZXNdID0gdXNlU3RhdGUoXCJcIilcclxuY29uc3QgW2RpcmVjdG9ycywgc2V0RGlyZWN0b3JzXSA9IHVzZVN0YXRlKFwiXCIpXHJcbmNvbnN0IFtpbWFnZSwgc2V0SW1hZ2VdID0gdXNlU3RhdGUoXCJcIilcclxuXHJcbmNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5jb25zdCBbZGVyZ28sIHNldERlcmdvXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbmNvbnN0IHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApLnRvRml4ZWQoMClcclxuXHJcbmNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudCkgPT4ge1xyXG5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5zZXREZXJnbyh0cnVlKVxyXG5cclxufVxyXG5cclxuY29uc3QgdXBkYXRlID0gKGUpID0+e1xyXG4gICAgXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKHByb3BzLm1vdmllSWQpO1xyXG4gICAgXHJcbiAgICBmZXRjaChgJHtBUEl9L21vdmllcy8ke3Byb3BzLm1vdmllSWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICA8Zm9ybSBvblN1Ym1pdD17dXBkYXRlfT5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZ2VucmVzXCIgdmFsdWU9e2dlbnJlc30gb25DaGFuZ2U9eyhlKT0+IHNldEdlbnJlcyhlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZGlyZWN0b3JzXCIgdmFsdWU9e2RpcmVjdG9yc30gb25DaGFuZ2U9eyhlKT0+IHNldERpcmVjdG9ycyhlLnRhcmdldC52YWx1ZSl9Lz5cclxuXHJcbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XHJcbiAgICA8L2Zvcm0+XHJcbiAgPC8+XHJcbiAgKVxyXG4gIH1cclxuICBcclxuICBleHBvcnQgZGVmYXVsdCBNb3ZpZVVwZGF0ZVxyXG4gIFxyXG4gIC8vIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgLy8gaWYoZGVyZ28gPT09IHRydWUpIHtcclxuICAvLyB1cGRhdGVGb3JtKCk7XHJcbiAgXHJcbiAgLy8gfSBlbHNlIHtcclxuICAvLyByZXR1cm5cclxuICAvLyB9XHJcbiAgXHJcbiAgLy8gfSxbZGVyZ29dKVxyXG4gIFxyXG4gIFxyXG4gIC8vIHJldHVybiAoXHJcbiAgLy8gPD5cclxuICAvLyAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT0nZm9ybWEnPlxyXG4gIC8vICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlR5cGUgdGhlIG5hbWUgb2YgdGhlIG1vdmllXCIgIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz48YnIvPlxyXG4gIC8vICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNob29zZSB0aGUgZ2VucmVzXCIgdmFsdWU9e2dlbnJlc30gb25DaGFuZ2U9eyhlKT0+IHNldEdlbnJlcyhlLnRhcmdldC52YWx1ZSl9Lz48YnIvPlxyXG4gIC8vICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk1hZGUgQnlcIiB2YWx1ZT17ZGlyZWN0b3JzfSBvbkNoYW5nZT17KGUpPT4gc2V0RGlyZWN0b3JzKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbiAgLy8gICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiSW1hZ2VcIiB2YWx1ZT17aW1hZ2V9IG9uQ2hhbmdlPXsoZSk9PiBzZXRJbWFnZShlLnRhcmdldC52YWx1ZSl9Lz48YnIvPlxyXG4gIC8vICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cclxuICAvLyAgIDwvZm9ybT5cclxuICAgIFxyXG4gICBcclxuICBcclxuICBcclxuICAvLyA8Lz5cclxuICAvLyApXHJcbiAgLy8gfSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgTW92aWVNYW5hZ2VyIGZyb20gXCIuL01vdmllTWFuYWdlclwiO1xuaW1wb3J0IEFkZE1vdmllIGZyb20gXCIuL0FkZE1vdmllXCJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4vTmF2YmFyXCI7XG5pbXBvcnQgVXBkYXRlTW92aWUgZnJvbSAnLi9VcGRhdGVNb3ZpZSdcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEhhc2hSb3V0ZXIsIFJvdXRlLCBSb3V0ZXMgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5jb25zdCBBcHAgPSAoKSA9PiB7XG5cblxuICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICA8PlxuXG4gICAgICAgIDxOYXZiYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPFJvdXRlcz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxNb3ZpZU1hbmFnZXIgLz59IC8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9hZGQtbW92aWVcIiBlbGVtZW50PXs8QWRkTW92aWUgLz59IC8+XG5cbiAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvPlxuICAgIClcbn1cblxuUmVhY3RET00ucmVuZGVyKCBcbjxIYXNoUm91dGVyPlxuICAgIDxBcHAgLz5cbjwvSGFzaFJvdXRlcj4gLCBcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjVhMjNiZDRlNTQzMDlmZWZiNDA1XCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJNb3ZpZVVwZGF0ZSIsIkFQSSIsIm5hbWUiLCJzZXROYW1lIiwiZ2VucmVzIiwic2V0R2VucmVzIiwiZGlyZWN0b3JzIiwic2V0RGlyZWN0b3JzIiwiaW1hZ2UiLCJzZXRJbWFnZSIsImRhdGEiLCJzZXREYXRhIiwiZGVyZ28iLCJzZXREZXJnbyIsInJhbmRvbUlkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9GaXhlZCIsImhhbmRsZVN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1cGRhdGUiLCJlIiwiY29uc29sZSIsImxvZyIsInByb3BzIiwibW92aWVJZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImVycm9yIiwidGFyZ2V0IiwidmFsdWUiLCJSZWFjdERPTSIsIk1vdmllTWFuYWdlciIsIkFkZE1vdmllIiwiTmF2YmFyIiwiVXBkYXRlTW92aWUiLCJCcm93c2VyUm91dGVyIiwiSGFzaFJvdXRlciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=