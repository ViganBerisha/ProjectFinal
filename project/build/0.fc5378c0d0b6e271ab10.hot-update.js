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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c52293493327250d1efa")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQVksQ0FBQ1csQ0FBQyxDQUFDZ0IsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFFNUc7SUFBTyxJQUFJLEVBQUMsUUFBUTtJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFDO0VBQVEsRUFBRyxDQUM3QyxDQUNOO0FBRUg7QUFHQSxpRUFBZW5DLFdBQVcsRUFBQzs7QUFFN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTs7Ozs7Ozs7VUM3RkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvVXBkYXRlTW92aWUuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcblxyXG5mdW5jdGlvbiBNb3ZpZVVwZGF0ZSgpIHtcclxuXHJcbmNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG5jb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZShcIlwiKVxyXG5jb25zdCBbZ2VucmVzLCBzZXRHZW5yZXNdID0gdXNlU3RhdGUoXCJcIilcclxuY29uc3QgW2RpcmVjdG9ycywgc2V0RGlyZWN0b3JzXSA9IHVzZVN0YXRlKFwiXCIpXHJcbmNvbnN0IFtpbWFnZSwgc2V0SW1hZ2VdID0gdXNlU3RhdGUoXCJcIilcclxuXHJcbmNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5jb25zdCBbZGVyZ28sIHNldERlcmdvXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcblxyXG5jb25zdCBoYW5kbGVTdWJtaXQgPSAoZXZlbnQpID0+IHtcclxuZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuc2V0RGVyZ28odHJ1ZSlcclxuXHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZSA9IChlKSA9PntcclxuICAgIFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhwcm9wcy5tb3ZpZUlkKTtcclxuICAgIFxyXG4gICAgZmV0Y2goYCR7QVBJfS9tb3ZpZXMvJHtwcm9wcy5tb3ZpZUlkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gIGlmKGRlcmdvID09PSB0cnVlKSB7XHJcbiAgdXBkYXRlRm9ybSgpO1xyXG4gIFxyXG4gIH0gZWxzZSB7XHJcbiAgcmV0dXJuXHJcbiAgfVxyXG4gIFxyXG4gIH0sW2RlcmdvXSlcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICA8Zm9ybSBvblN1Ym1pdD17dXBkYXRlfT5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZ2VucmVzXCIgdmFsdWU9e2dlbnJlc30gb25DaGFuZ2U9eyhlKT0+IHNldEdlbnJlcyhlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZGlyZWN0b3JzXCIgdmFsdWU9e2RpcmVjdG9yc30gb25DaGFuZ2U9eyhlKT0+IHNldERpcmVjdG9ycyhlLnRhcmdldC52YWx1ZSl9Lz5cclxuXHJcbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XHJcbiAgICA8L2Zvcm0+XHJcbiAgPC8+XHJcbiAgKVxyXG4gIH1cclxuXHJcbiAgXHJcbiAgZXhwb3J0IGRlZmF1bHQgTW92aWVVcGRhdGU7XHJcbiAgXHJcbi8vICAgdXNlRWZmZWN0KCgpID0+IHtcclxuLy8gICBpZihkZXJnbyA9PT0gdHJ1ZSkge1xyXG4vLyAgIHVwZGF0ZUZvcm0oKTtcclxuICBcclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgIHJldHVyblxyXG4vLyAgIH1cclxuICBcclxuLy8gICB9LFtkZXJnb10pXHJcbiAgXHJcbiAgXHJcbi8vICAgcmV0dXJuIChcclxuLy8gICA8PlxyXG4vLyAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPSdmb3JtYSc+XHJcbi8vICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVHlwZSB0aGUgbmFtZSBvZiB0aGUgbW92aWVcIiAgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXsoZSk9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbi8vICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQ2hvb3NlIHRoZSBnZW5yZXNcIiB2YWx1ZT17Z2VucmVzfSBvbkNoYW5nZT17KGUpPT4gc2V0R2VucmVzKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbi8vICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTWFkZSBCeVwiIHZhbHVlPXtkaXJlY3RvcnN9IG9uQ2hhbmdlPXsoZSk9PiBzZXREaXJlY3RvcnMoZS50YXJnZXQudmFsdWUpfS8+PGJyLz5cclxuLy8gICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJJbWFnZVwiIHZhbHVlPXtpbWFnZX0gb25DaGFuZ2U9eyhlKT0+IHNldEltYWdlKGUudGFyZ2V0LnZhbHVlKX0vPjxici8+XHJcbi8vICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4vLyAgICAgPC9mb3JtPlxyXG4gICAgXHJcbiAgIFxyXG4gIFxyXG4gIFxyXG4vLyAgIDwvPlxyXG4vLyAgICkiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJjNTIyOTM0OTMzMjcyNTBkMWVmYVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTW92aWVVcGRhdGUiLCJBUEkiLCJuYW1lIiwic2V0TmFtZSIsImdlbnJlcyIsInNldEdlbnJlcyIsImRpcmVjdG9ycyIsInNldERpcmVjdG9ycyIsImltYWdlIiwic2V0SW1hZ2UiLCJkYXRhIiwic2V0RGF0YSIsImRlcmdvIiwic2V0RGVyZ28iLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwcm9wcyIsIm1vdmllSWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlcnJvciIsInVwZGF0ZUZvcm0iLCJ0YXJnZXQiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=