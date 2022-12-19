"use strict";
self["webpackHotUpdatereact"](0,{

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

var Car = function Car(props) {
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
    console.log(props.carId);
    fetch("".concat(API, "/cars/").concat(props.carId), {
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
    placeholder: "brand",
    value: brand,
    onChange: function onChange(e) {
      return setBrand(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "Petrol",
    value: engineType,
    onChange: function onChange(e) {
      return setEngine(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "PS",
    value: engineHp,
    onChange: function onChange(e) {
      return setHp(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "submit",
    name: "button",
    value: "submit"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Car);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f084370659897dc3eaae")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxFQUFDLFFBQVE7SUFBQyxLQUFLLEVBQUM7RUFBUSxFQUFHLENBQzdDLENBQ047QUFFTCxDQUFDO0FBRUQsaUVBQWU3QixHQUFHOzs7Ozs7OztVQ3BEbEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3Byb2plY3QvanMvQ2FyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IENhciA9IChwcm9wcykgPT4ge1xuXG4gIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG5cbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2dlbnJlcywgc2V0R2VucmVzXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtkaXJlY3RvcnMsc2V0RGlyZWN0b3JzIF0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZGVyZ28sIHNldERlcmdvXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBkYXRhID0ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgZ2VucmVzOiBnZW5yZXMsXG4gICAgZGlyZWN0b3JzOiBkaXJlY3RvcnNcbiAgfTtcbiAgXG4gIGNvbnN0IHVwZGF0ZSA9IChlKSA9PntcbiAgICBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc29sZS5sb2cocHJvcHMuY2FySWQpO1xuICAgIFxuICAgIGZldGNoKGAke0FQSX0vY2Fycy8ke3Byb3BzLmNhcklkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgPGZvcm0gb25TdWJtaXQ9e3VwZGF0ZX0+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuYW1lXCIgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXsoZSk9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiYnJhbmRcIiB2YWx1ZT17YnJhbmR9IG9uQ2hhbmdlPXsoZSk9PiBzZXRCcmFuZChlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBldHJvbFwiIHZhbHVlPXtlbmdpbmVUeXBlfSBvbkNoYW5nZT17KGUpPT4gc2V0RW5naW5lKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUFNcIiB2YWx1ZT17ZW5naW5lSHB9IG9uQ2hhbmdlPXsoZSk9PiBzZXRIcChlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XG4gICAgPC9mb3JtPlxuICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJmMDg0MzcwNjU5ODk3ZGMzZWFhZVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiQ2FyIiwicHJvcHMiLCJBUEkiLCJuYW1lIiwic2V0TmFtZSIsImdlbnJlcyIsInNldEdlbnJlcyIsImRpcmVjdG9ycyIsInNldERpcmVjdG9ycyIsImRlcmdvIiwic2V0RGVyZ28iLCJkYXRhIiwidXBkYXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29uc29sZSIsImxvZyIsImNhcklkIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZXJyb3IiLCJ0YXJnZXQiLCJ2YWx1ZSIsImJyYW5kIiwic2V0QnJhbmQiLCJlbmdpbmVUeXBlIiwic2V0RW5naW5lIiwiZW5naW5lSHAiLCJzZXRIcCJdLCJzb3VyY2VSb290IjoiIn0=