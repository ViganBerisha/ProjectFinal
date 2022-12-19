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
      key: index,
      className: "card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      className: "card-img-top",
      src: el.image,
      alt: "Card image cap"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
      className: "card-title"
    }, el.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, el.genres), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Directed by: ", el.directors), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Route, {
    path: "/update-movie",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_UpdateMovie__WEBPACK_IMPORTED_MODULE_5__["default"], null)
  }))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.HashRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null)), document.getElementById("app"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("14983b4ab014d3019248")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNaLENBQUMsQ0FBQ3FCLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO0lBQUE7RUFBQyxFQUFFLGVBRTVHO0lBQU8sSUFBSSxFQUFDLFFBQVE7SUFBQyxJQUFJLEVBQUMsUUFBUTtJQUFDLEtBQUssRUFBQztFQUFRLEVBQUcsQ0FDN0MsQ0FDTjtBQUVMLENBQUM7QUFFRCxpRUFBZTlDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERLO0FBQ087QUFDUztBQUNUO0FBQ0g7QUFDUztBQUNxQztBQUU1RSxJQUFNdUQsR0FBRyxHQUFHLFNBQU5BLEdBQUcsR0FBUztFQUdkLG9CQUVJLHVJQUVBLDJEQUFDLCtDQUFNLE9BQUcsZUFDVjtJQUFLLFNBQVMsRUFBQztFQUFXLGdCQUMxQiwyREFBQyxvREFBTSxxQkFDSCwyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxHQUFHO0lBQUMsT0FBTyxlQUFFLDJEQUFDLHFEQUFZO0VBQUksRUFBRyxlQUM3QywyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxZQUFZO0lBQUMsT0FBTyxlQUFFLDJEQUFDLGlEQUFRO0VBQUksRUFBRyxlQUNsRCwyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxlQUFlO0lBQUMsT0FBTyxlQUFFLDJEQUFDLG9EQUFXO0VBQUksRUFBRyxDQUVuRCxDQUNILENBRUg7QUFFWCxDQUFDO0FBRURSLDZDQUFlLGVBQ2YsMkRBQUMsd0RBQVUscUJBQ1AsMkRBQUMsR0FBRyxPQUFHLENBQ0UsRUFDYlUsUUFBUSxDQUFDQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O1VDakMvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9Nb3ZpZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL01vdmllcy5qcyIsIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvYXBwLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmYUJsYWNrYm9hcmQsIGZhRGlzcGxheSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBNb3ZpZXMgZnJvbSAnLi9Nb3ZpZXMnO1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gTW92aWVNYW5hZ2VyKCkge1xyXG5cclxuICAgIC8vIGNvbnN0IEFQSSA9IFwiaHR0cHM6Ly9kdW1teWpzb24uY29tXCI7XHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cclxuICAgIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuXHJcbiAgICBjb25zdCBbdXBkYXRlRm9ybSwgc2V0VXBkYXRlRnJvbV0gPSB1c2VTdGF0ZShmYWxzZSlcclxuXHJcbiAgICBjb25zdCBbSWRPZk1vdmllLCBzZXRJZE9mTW92aWVdID0gdXNlU3RhdGUoKVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goYCR7QVBJfS9tb3ZpZXNgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFtdKVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNvbGQgPSAoZXZlbnQsIGlkKSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgZmV0Y2goYCR7QVBJfS9tb3ZpZXMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvcm1VcGRhdGUgPSAoZSwgaWQpID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBzZXRJZE9mTW92aWUoaWQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VXBkYXRlRnJvbSh0cnVlKVxyXG4gICAgfSAgIFxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzc05hbWU9J3dyYXBwZXInPiBcclxuICAgICAgICB7ICAgbG9hZGVkICYmIGRhdGEubGVuZ3RoID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICByZXR1cm4gICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJjYXJkXCIgPlxyXG4gICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwiY2FyZC1pbWctdG9wXCIgc3JjPXtlbC5pbWFnZX0gYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj48L2ltZz5cclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57ZWwubmFtZX08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgPGgyPntlbC5nZW5yZXN9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgIDxwPkRpcmVjdGVkIGJ5OiB7ZWwuZGlyZWN0b3JzfTwvcD5cclxuICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCwgZWwuaWQpfT5XQVRDSCBOT1c8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KGUpID0+IHNob3dGb3JtVXBkYXRlKGUsIGVsLmlkKX0gPlVwZGF0ZSBNb3ZpZTwvYnV0dG9uPiBcclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgPGgxPkxvYWRpbmc8L2gxPlxyXG4gICAgICAgIH0gICAgXHJcbiAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsgICB1cGRhdGVGb3JtID9cclxuXHJcbjxNb3ZpZXMgbW92aWVJZD17SWRPZk1vdmllfSAvPlxyXG4gICAgICAgICAgICA6IFxyXG4gICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICB9ICAgXHJcblxyXG5cclxuICAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb3ZpZU1hbmFnZXJcclxuLy8gPGRpdiBrZXk9e2luZGV4fSA+IFxyXG4gIC8vICAgICA8aW1nIHNyYz17ZWwuaW1hZ2V9PjwvaW1nPlxyXG4gIC8vICAgICAgICA8aDE+e2VsLm5hbWV9PC9oMT5cclxuICAvLyAgICAgICAgIDxoMz57ZWwuZ2VucmVzfTwvaDM+IFxyXG4gIC8vICAgICAgICAgPHA+RGlyZWN0ZWQgYnk6IHtlbC5kaXJlY3RvcnN9PC9wPlxyXG4gIFxyXG4gIC8vICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PldBVENIIE5PVzwvYnV0dG9uPlxyXG4gIFxyXG4gIC8vICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gc2hvd0Zvcm1VcGRhdGUoZSwgZWwuaWQpfSA+VXBkYXRlIE1vdmllPC9idXR0b24+IFxyXG4gIC8vICAgICA8L2Rpdj5cclxuICAvLyAoXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAvLyApXHJcbiAgICAgICAgICAgICAgLy8gICByZXR1cm4gICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9XCJjYXJkXCIgPlxyXG4gICAgICAgICAgICAgIC8vICAgPGltZyBjbGFzc05hbWU9XCJjYXJkLWltZy10b3BcIiBzcmM9e2VsLmltYWdlfSBhbHQ9XCJDYXJkIGltYWdlIGNhcFwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgIC8vICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAvLyAgICAgPGgxIGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57ZWwubmFtZX08L2gxPlxyXG4gICAgICAgICAgICAgIC8vICAgICA8aDI+e2VsLmdlbnJlc308L2gyPlxyXG4gICAgICAgICAgICAgIC8vICAgICA8cD5EaXJlY3RlZCBieToge2VsLmRpcmVjdG9yc308L3A+XHJcbiAgICAgICAgICAgICAgLy8gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCwgZWwuaWQpfT5XQVRDSCBOT1c8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAvLyAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gc2hvd0Zvcm1VcGRhdGUoZSwgZWwuaWQpfSA+VXBkYXRlIE1vdmllPC9idXR0b24+IFxyXG4gICAgICAgICAgICAgIC8vICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgLy8gPC9kaXY+IiwiaW1wb3J0IFJlYWN0LCB7dXNlU3RhdGV9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBNb3ZpZXMgPSAocHJvcHMpID0+IHtcblxuICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuXG4gIGNvbnN0IFtuYW1lLCBzZXROYW1lXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtnZW5yZXMsIHNldEdlbnJlc10gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZGlyZWN0b3JzLHNldERpcmVjdG9ycyBdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2RlcmdvLCBzZXREZXJnb10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGdlbnJlczogZ2VucmVzLFxuICAgIGRpcmVjdG9yczogZGlyZWN0b3JzXG4gIH07XG4gIFxuICBjb25zdCB1cGRhdGUgPSAoZSkgPT57XG4gICAgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKHByb3BzLm1vdmllSWQpO1xuICAgIFxuICAgIGZldGNoKGAke0FQSX0vbW92aWVzLyR7cHJvcHMubW92aWVJZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgIDxmb3JtIG9uU3VibWl0PXt1cGRhdGV9PlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImdlbnJlc1wiIHZhbHVlPXtnZW5yZXN9IG9uQ2hhbmdlPXsoZSk9PiBzZXRHZW5yZXMoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJkaXJlY3RvcnNcIiB2YWx1ZT17ZGlyZWN0b3JzfSBvbkNoYW5nZT17KGUpPT4gc2V0RGlyZWN0b3JzKGUudGFyZ2V0LnZhbHVlKX0vPlxuXG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIiAvPlxuICAgIDwvZm9ybT5cbiAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTW92aWVzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBNb3ZpZU1hbmFnZXIgZnJvbSBcIi4vTW92aWVNYW5hZ2VyXCI7XG5pbXBvcnQgQWRkTW92aWUgZnJvbSBcIi4vQWRkTW92aWVcIlxuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi9OYXZiYXJcIjtcbmltcG9ydCBVcGRhdGVNb3ZpZSBmcm9tICcuL1VwZGF0ZU1vdmllJ1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgSGFzaFJvdXRlciwgUm91dGUsIFJvdXRlcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgXG4gICAgICAgIDw+XG5cbiAgICAgICAgPE5hdmJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8Um91dGVzPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PE1vdmllTWFuYWdlciAvPn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkZC1tb3ZpZVwiIGVsZW1lbnQ9ezxBZGRNb3ZpZSAvPn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3VwZGF0ZS1tb3ZpZVwiIGVsZW1lbnQ9ezxVcGRhdGVNb3ZpZSAvPn0gLz5cblxuICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuXG5SZWFjdERPTS5yZW5kZXIoIFxuPEhhc2hSb3V0ZXI+XG4gICAgPEFwcCAvPlxuPC9IYXNoUm91dGVyPiAsIFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMTQ5ODNiNGFiMDE0ZDMwMTkyNDhcIikiXSwibmFtZXMiOlsiZmFCbGFja2JvYXJkIiwiZmFEaXNwbGF5IiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIk1vdmllcyIsIk1vdmllTWFuYWdlciIsIkFQSSIsImxvYWRlZCIsInNldExvYWRlZCIsImRhdGEiLCJzZXREYXRhIiwidXBkYXRlRm9ybSIsInNldFVwZGF0ZUZyb20iLCJJZE9mTW92aWUiLCJzZXRJZE9mTW92aWUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJoYW5kbGVTb2xkIiwiZXZlbnQiLCJpZCIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwic2hvd0Zvcm1VcGRhdGUiLCJlIiwibGVuZ3RoIiwibWFwIiwiZWwiLCJpbmRleCIsImltYWdlIiwibmFtZSIsImdlbnJlcyIsImRpcmVjdG9ycyIsInByb3BzIiwic2V0TmFtZSIsInNldEdlbnJlcyIsInNldERpcmVjdG9ycyIsImRlcmdvIiwic2V0RGVyZ28iLCJ1cGRhdGUiLCJtb3ZpZUlkIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGFyZ2V0IiwidmFsdWUiLCJSZWFjdERPTSIsIkFkZE1vdmllIiwiTmF2YmFyIiwiVXBkYXRlTW92aWUiLCJCcm93c2VyUm91dGVyIiwiSGFzaFJvdXRlciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=