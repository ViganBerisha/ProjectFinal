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
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CarsManager() {
  var API = "http://localhost:3000";
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    brand = _useState4[0],
    setBrand = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      type: "",
      power: ""
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    engine = _useState6[0],
    setEngine = _useState6[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var data = [name, brand, engine];
    fetch("".concat(API, "/cars"), {
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit
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
    placeholder: "engine",
    value: engine.type,
    onChange: function onChange(e) {
      return setEngine(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "engine",
    value: engine.power,
    onChange: function onChange(e) {
      return setEngine(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "submit",
    name: "button",
    value: "submit"
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2fbacb51ec605b350002")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c2UvanMvQWRkQ2FyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5cclxuZnVuY3Rpb24gQ2Fyc01hbmFnZXIoKSB7XHJcblxyXG4gICAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuICAgIFxyXG5cclxuICAgIGNvbnN0IFtuYW1lLCBzZXROYW1lXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbYnJhbmQsIHNldEJyYW5kXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbZW5naW5lLCBzZXRFbmdpbmVdID0gdXNlU3RhdGUoe3R5cGU6XCJcIiwgcG93ZXI6IFwiXCJ9KVxyXG4gICAgXHJcblxyXG5cclxuICAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGRhdGEgPSBbbmFtZSwgYnJhbmQsIGVuZ2luZV1cclxuICAgIGZldGNoKGAke0FQSX0vY2Fyc2AsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgIH1cclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpID0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImJyYW5kXCIgdmFsdWU9e2JyYW5kfSBvbkNoYW5nZT17KGUpID0+IHNldEJyYW5kKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbmdpbmVcIiB2YWx1ZT17ZW5naW5lLnR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW5naW5lKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbmdpbmVcIiB2YWx1ZT17ZW5naW5lLnBvd2VyfSBvbkNoYW5nZT17KGUpID0+IHNldEVuZ2luZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgbmFtZT1cImJ1dHRvblwiIHZhbHVlPVwic3VibWl0XCIgLz5cclxuIDwvZm9ybT5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcnNNYW5hZ2VyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMmZiYWNiNTFlYzYwNWIzNTAwMDJcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNhcnNNYW5hZ2VyIiwiQVBJIiwibmFtZSIsInNldE5hbWUiLCJicmFuZCIsInNldEJyYW5kIiwidHlwZSIsInBvd2VyIiwiZW5naW5lIiwic2V0RW5naW5lIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRhcmdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==