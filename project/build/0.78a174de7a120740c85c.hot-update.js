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

  // const showFormUpdate = (e, id) => {

  //     setIdOfMovie(id)

  //     setUpdateFrom(true)
  // }   

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
/******/ 	__webpack_require__.h = () => ("fc5378c0d0b6e271ab10")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsS0FBSyxFQUFDO0VBQVEsRUFBRyxDQUM3QyxDQUNOO0FBRUwsQ0FBQztBQUVELGlFQUFlOUMsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwREs7QUFDTztBQUNTO0FBQ1Q7QUFDSDtBQUNTO0FBQ3FDO0FBRTVFLElBQU11RCxHQUFHLEdBQUcsU0FBTkEsR0FBRyxHQUFTO0VBR2Qsb0JBRUksdUlBRUEsMkRBQUMsK0NBQU0sT0FBRyxlQUNWO0lBQUssU0FBUyxFQUFDO0VBQVcsZ0JBQzFCLDJEQUFDLG9EQUFNLHFCQUNILDJEQUFDLG1EQUFLO0lBQUMsSUFBSSxFQUFDLEdBQUc7SUFBQyxPQUFPLGVBQUUsMkRBQUMscURBQVk7RUFBSSxFQUFHLGVBQzdDLDJEQUFDLG1EQUFLO0lBQUMsSUFBSSxFQUFDLFlBQVk7SUFBQyxPQUFPLGVBQUUsMkRBQUMsaURBQVE7RUFBSSxFQUFHLGVBQ2xELDJEQUFDLG1EQUFLO0lBQUMsSUFBSSxFQUFDLGVBQWU7SUFBQyxPQUFPLGVBQUUsMkRBQUMsb0RBQVc7RUFBSSxFQUFHLENBRW5ELENBQ0gsQ0FFSDtBQUVYLENBQUM7QUFFRFIsNkNBQWUsZUFDZiwyREFBQyx3REFBVSxxQkFDUCwyREFBQyxHQUFHLE9BQUcsQ0FDRSxFQUNiVSxRQUFRLENBQUNDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7VUNqQy9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL01vdmllTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvTW92aWVzLmpzIiwid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZhQmxhY2tib2FyZCwgZmFEaXNwbGF5IH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IE1vdmllcyBmcm9tICcuL01vdmllcyc7XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBNb3ZpZU1hbmFnZXIoKSB7XHJcblxyXG4gICAgLy8gY29uc3QgQVBJID0gXCJodHRwczovL2R1bW15anNvbi5jb21cIjtcclxuICAgIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcblxyXG5cclxuICAgIGNvbnN0IFt1cGRhdGVGb3JtLCBzZXRVcGRhdGVGcm9tXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IFtJZE9mTW92aWUsIHNldElkT2ZNb3ZpZV0gPSB1c2VTdGF0ZSgpXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllc2ApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sW10pXHJcblxyXG4gICAgY29uc3QgaGFuZGxlU29sZCA9IChldmVudCwgaWQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBmZXRjaChgJHtBUEl9L21vdmllcy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBzaG93Rm9ybVVwZGF0ZSA9IChlLCBpZCkgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIHNldElkT2ZNb3ZpZShpZClcclxuICAgICAgICBcclxuICAgIC8vICAgICBzZXRVcGRhdGVGcm9tKHRydWUpXHJcbiAgICAvLyB9ICAgXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT0nd3JhcHBlcic+IFxyXG4gICAgICAgIHsgICBsb2FkZWQgJiYgZGF0YS5sZW5ndGggPyBcclxuICAgICAgICAgICAgZGF0YS5tYXAoKGVsLGluZGV4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImNhcmRcIiA+XHJcbiAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJjYXJkLWltZy10b3BcIiBzcmM9e2VsLmltYWdlfSBhbHQ9XCJDYXJkIGltYWdlIGNhcFwiPjwvaW1nPlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPntlbC5uYW1lfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICA8aDI+e2VsLmdlbnJlc308L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgPHA+RGlyZWN0ZWQgYnk6IHtlbC5kaXJlY3RvcnN9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PldBVENIIE5PVzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoZSkgPT4gc2hvd0Zvcm1VcGRhdGUoZSwgZWwuaWQpfSA+VXBkYXRlIE1vdmllPC9idXR0b24+IFxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICA8aDE+TG9hZGluZzwvaDE+XHJcbiAgICAgICAgfSAgICBcclxuICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgeyAgIHVwZGF0ZUZvcm0gP1xyXG5cclxuPE1vdmllcyBtb3ZpZUlkPXtJZE9mTW92aWV9IC8+XHJcbiAgICAgICAgICAgIDogXHJcbiAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgIH0gICBcclxuXHJcblxyXG4gICAgIDwvPlxyXG4gIClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vdmllTWFuYWdlclxyXG4vLyA8ZGl2IGtleT17aW5kZXh9ID4gXHJcbiAgLy8gICAgIDxpbWcgc3JjPXtlbC5pbWFnZX0+PC9pbWc+XHJcbiAgLy8gICAgICAgIDxoMT57ZWwubmFtZX08L2gxPlxyXG4gIC8vICAgICAgICAgPGgzPntlbC5nZW5yZXN9PC9oMz4gXHJcbiAgLy8gICAgICAgICA8cD5EaXJlY3RlZCBieToge2VsLmRpcmVjdG9yc308L3A+XHJcbiAgXHJcbiAgLy8gICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZVNvbGQoZXZlbnQsIGVsLmlkKX0+V0FUQ0ggTk9XPC9idXR0b24+XHJcbiAgXHJcbiAgLy8gICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGUgTW92aWU8L2J1dHRvbj4gXHJcbiAgLy8gICAgIDwvZGl2PlxyXG4gIC8vIChcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIC8vIClcclxuICAgICAgICAgICAgICAvLyAgIHJldHVybiAgICAgICA8ZGl2IGtleT17aW5kZXh9IGNsYXNzTmFtZT1cImNhcmRcIiA+XHJcbiAgICAgICAgICAgICAgLy8gICA8aW1nIGNsYXNzTmFtZT1cImNhcmQtaW1nLXRvcFwiIHNyYz17ZWwuaW1hZ2V9IGFsdD1cIkNhcmQgaW1hZ2UgY2FwXCI+PC9pbWc+XHJcbiAgICAgICAgICAgICAgLy8gICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgIC8vICAgICA8aDEgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPntlbC5uYW1lfTwvaDE+XHJcbiAgICAgICAgICAgICAgLy8gICAgIDxoMj57ZWwuZ2VucmVzfTwvaDI+XHJcbiAgICAgICAgICAgICAgLy8gICAgIDxwPkRpcmVjdGVkIGJ5OiB7ZWwuZGlyZWN0b3JzfTwvcD5cclxuICAgICAgICAgICAgICAvLyAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PldBVENIIE5PVzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIC8vICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGUgTW92aWU8L2J1dHRvbj4gXHJcbiAgICAgICAgICAgICAgLy8gICA8L2Rpdj5cclxuICAgICAgICAgICAgICAvLyA8L2Rpdj4iLCJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IE1vdmllcyA9IChwcm9wcykgPT4ge1xuXG4gIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG5cbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2dlbnJlcywgc2V0R2VucmVzXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtkaXJlY3RvcnMsc2V0RGlyZWN0b3JzIF0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZGVyZ28sIHNldERlcmdvXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBkYXRhID0ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgZ2VucmVzOiBnZW5yZXMsXG4gICAgZGlyZWN0b3JzOiBkaXJlY3RvcnNcbiAgfTtcbiAgXG4gIGNvbnN0IHVwZGF0ZSA9IChlKSA9PntcbiAgICBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc29sZS5sb2cocHJvcHMubW92aWVJZCk7XG4gICAgXG4gICAgZmV0Y2goYCR7QVBJfS9tb3ZpZXMvJHtwcm9wcy5tb3ZpZUlkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgPGZvcm0gb25TdWJtaXQ9e3VwZGF0ZX0+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuYW1lXCIgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXsoZSk9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZ2VucmVzXCIgdmFsdWU9e2dlbnJlc30gb25DaGFuZ2U9eyhlKT0+IHNldEdlbnJlcyhlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImRpcmVjdG9yc1wiIHZhbHVlPXtkaXJlY3RvcnN9IG9uQ2hhbmdlPXsoZSk9PiBzZXREaXJlY3RvcnMoZS50YXJnZXQudmFsdWUpfS8+XG5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XG4gICAgPC9mb3JtPlxuICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb3ZpZXMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IE1vdmllTWFuYWdlciBmcm9tIFwiLi9Nb3ZpZU1hbmFnZXJcIjtcbmltcG9ydCBBZGRNb3ZpZSBmcm9tIFwiLi9BZGRNb3ZpZVwiXG5pbXBvcnQgTmF2YmFyIGZyb20gXCIuL05hdmJhclwiO1xuaW1wb3J0IFVwZGF0ZU1vdmllIGZyb20gJy4vVXBkYXRlTW92aWUnXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBIYXNoUm91dGVyLCBSb3V0ZSwgUm91dGVzIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgPD5cblxuICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8TW92aWVNYW5hZ2VyIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRkLW1vdmllXCIgZWxlbWVudD17PEFkZE1vdmllIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXBkYXRlLW1vdmllXCIgZWxlbWVudD17PFVwZGF0ZU1vdmllIC8+fSAvPlxuXG4gICAgICAgIDwvUm91dGVzPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8Lz5cbiAgICApXG59XG5cblJlYWN0RE9NLnJlbmRlciggXG48SGFzaFJvdXRlcj5cbiAgICA8QXBwIC8+XG48L0hhc2hSb3V0ZXI+ICwgXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSk7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJmYzUzNzhjMGQwYjZlMjcxYWIxMFwiKSJdLCJuYW1lcyI6WyJmYUJsYWNrYm9hcmQiLCJmYURpc3BsYXkiLCJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTW92aWVzIiwiTW92aWVNYW5hZ2VyIiwiQVBJIiwibG9hZGVkIiwic2V0TG9hZGVkIiwiZGF0YSIsInNldERhdGEiLCJ1cGRhdGVGb3JtIiwic2V0VXBkYXRlRnJvbSIsIklkT2ZNb3ZpZSIsInNldElkT2ZNb3ZpZSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImhhbmRsZVNvbGQiLCJldmVudCIsImlkIiwicHJldmVudERlZmF1bHQiLCJtZXRob2QiLCJsZW5ndGgiLCJtYXAiLCJlbCIsImluZGV4IiwiaW1hZ2UiLCJuYW1lIiwiZ2VucmVzIiwiZGlyZWN0b3JzIiwiZSIsInNob3dGb3JtVXBkYXRlIiwicHJvcHMiLCJzZXROYW1lIiwic2V0R2VucmVzIiwic2V0RGlyZWN0b3JzIiwiZGVyZ28iLCJzZXREZXJnbyIsInVwZGF0ZSIsIm1vdmllSWQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0YXJnZXQiLCJ2YWx1ZSIsIlJlYWN0RE9NIiwiQWRkTW92aWUiLCJOYXZiYXIiLCJVcGRhdGVNb3ZpZSIsIkJyb3dzZXJSb3V0ZXIiLCJIYXNoUm91dGVyIiwiUm91dGUiLCJSb3V0ZXMiLCJBcHAiLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sInNvdXJjZVJvb3QiOiIifQ==