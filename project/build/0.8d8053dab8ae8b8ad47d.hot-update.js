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
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    data = _useState8[0],
    setData = _useState8[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var data = {
      id: data.length + 1,
      name: name,
      brand: brand,
      engine: engine
    };
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetch("".concat(API, "/db")).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      setLoaded(true);
      setData(data.cars);
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
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
/******/ 	__webpack_require__.h = () => ("62a8e608e9a2f682d6a4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLGVBQ2pHO0lBQU8sSUFBSSxFQUFDLE1BQU07SUFBQyxXQUFXLEVBQUMsUUFBUTtJQUFDLEtBQUssRUFBRXhCLE1BQU0sQ0FBQ0YsSUFBSztJQUFDLFFBQVEsRUFBRSxrQkFBQ08sQ0FBQztNQUFBLE9BQUtKLFNBQVMsQ0FBQ0ksQ0FBQyxDQUFDa0IsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDekc7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFFeEIsTUFBTSxDQUFDRCxLQUFNO0lBQUMsUUFBUSxFQUFFLGtCQUFDTSxDQUFDO01BQUEsT0FBS0osU0FBUyxDQUFDSSxDQUFDLENBQUNrQixNQUFNLENBQUNDLEtBQUssQ0FBQztJQUFBO0VBQUMsRUFBRSxlQUMxRztJQUFPLElBQUksRUFBQyxRQUFRO0lBQUMsSUFBSSxFQUFDLFFBQVE7SUFBQyxLQUFLLEVBQUM7RUFBUSxFQUFHLENBQ2hEO0FBRVI7QUFFQSxpRUFBZWhDLFdBQVc7Ozs7Ozs7O1VDL0QxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvQWRkQ2FyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5cclxuZnVuY3Rpb24gQ2Fyc01hbmFnZXIoKSB7XHJcblxyXG4gICAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuICAgIFxyXG5cclxuICAgIGNvbnN0IFtuYW1lLCBzZXROYW1lXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbYnJhbmQsIHNldEJyYW5kXSA9IHVzZVN0YXRlKFwiXCIpXHJcbiAgICBjb25zdCBbZW5naW5lLCBzZXRFbmdpbmVdID0gdXNlU3RhdGUoe3R5cGU6XCJcIiwgcG93ZXI6IFwiXCJ9KVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcbiAgICBcclxuXHJcblxyXG4gICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBpZDpkYXRhLmxlbmd0aCArIDEsIFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgYnJhbmQ6IGJyYW5kLFxyXG4gICAgICAgIGVuZ2luZTogZW5naW5lXHJcbiAgICB9XHJcbiAgICBmZXRjaChgJHtBUEl9L2NhcnNgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICB9XHJcblxyXG4gICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZmV0Y2goYCR7QVBJfS9kYmApXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICBzZXREYXRhKGRhdGEuY2FycylcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG59LFtdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJicmFuZFwiIHZhbHVlPXticmFuZH0gb25DaGFuZ2U9eyhlKSA9PiBzZXRCcmFuZChlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZW5naW5lXCIgdmFsdWU9e2VuZ2luZS50eXBlfSBvbkNoYW5nZT17KGUpID0+IHNldEVuZ2luZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZW5naW5lXCIgdmFsdWU9e2VuZ2luZS5wb3dlcn0gb25DaGFuZ2U9eyhlKSA9PiBzZXRFbmdpbmUoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XHJcbiA8L2Zvcm0+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJzTWFuYWdlciIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjYyYThlNjA4ZTlhMmY2ODJkNmE0XCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJDYXJzTWFuYWdlciIsIkFQSSIsIm5hbWUiLCJzZXROYW1lIiwiYnJhbmQiLCJzZXRCcmFuZCIsInR5cGUiLCJwb3dlciIsImVuZ2luZSIsInNldEVuZ2luZSIsImRhdGEiLCJzZXREYXRhIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiaWQiLCJsZW5ndGgiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzZXRMb2FkZWQiLCJjYXJzIiwidGFyZ2V0IiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9