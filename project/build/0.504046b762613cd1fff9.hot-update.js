"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 36:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Car = function Car(props) {
  var API = "http://localhost:3000";
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    brand = _useState4[0],
    setBrand = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    engineType = _useState6[0],
    setEngine = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    engineHp = _useState8[0],
    setHp = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    dergo = _useState10[0],
    setDergo = _useState10[1];
  var data = {
    name: name,
    brand: brand,
    engineType: engineType,
    engineHp: engineHp
  };
  var update = function update(e) {
    e.preventDefault();
    console.log(_typeof(props.carId));
    fetch("".concat(API, "/cars/").concat(props.carId), {
      method: "POST",
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
/******/ 	__webpack_require__.h = () => ("da2c99516cac393492c7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNLLENBQUMsQ0FBQ2UsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDN0Y7SUFBTyxJQUFJLEVBQUMsUUFBUTtJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFDO0VBQVEsRUFBRyxDQUM3QyxDQUNOO0FBRUwsQ0FBQztBQUVELGlFQUFlL0IsR0FBRzs7Ozs7Ozs7VUNwRGxCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi8wN19EYXlfNC8wMl9KU09OX1NlcnZlci8wMV9FeGVyY2lzZS9qcy9DYXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcblxuY29uc3QgQ2FyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG5cbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2JyYW5kLCBzZXRCcmFuZF0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZW5naW5lVHlwZSwgc2V0RW5naW5lXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtlbmdpbmVIcCwgc2V0SHBdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2RlcmdvLCBzZXREZXJnb10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGJyYW5kOiBicmFuZCxcbiAgICBlbmdpbmVUeXBlOiBlbmdpbmVUeXBlLFxuICAgIGVuZ2luZUhwOiBlbmdpbmVIcFxuICB9O1xuICBcbiAgY29uc3QgdXBkYXRlID0gKGUpID0+e1xuICAgIFxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgcHJvcHMuY2FySWQpO1xuICAgIFxuICAgIGZldGNoKGAke0FQSX0vY2Fycy8ke3Byb3BzLmNhcklkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgIDxmb3JtIG9uU3VibWl0PXt1cGRhdGV9PlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImJyYW5kXCIgdmFsdWU9e2JyYW5kfSBvbkNoYW5nZT17KGUpPT4gc2V0QnJhbmQoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJQZXRyb2xcIiB2YWx1ZT17ZW5naW5lVHlwZX0gb25DaGFuZ2U9eyhlKT0+IHNldEVuZ2luZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBTXCIgdmFsdWU9e2VuZ2luZUhwfSBvbkNoYW5nZT17KGUpPT4gc2V0SHAoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIiAvPlxuICAgIDwvZm9ybT5cbiAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZGEyYzk5NTE2Y2FjMzkzNDkyYzdcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkNhciIsInByb3BzIiwiQVBJIiwibmFtZSIsInNldE5hbWUiLCJicmFuZCIsInNldEJyYW5kIiwiZW5naW5lVHlwZSIsInNldEVuZ2luZSIsImVuZ2luZUhwIiwic2V0SHAiLCJkZXJnbyIsInNldERlcmdvIiwiZGF0YSIsInVwZGF0ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJjYXJJZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImVycm9yIiwidGFyZ2V0IiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9