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
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    engineType = _useState6[0],
    setEngine = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    engineHp = _useState8[0],
    setHp = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    data = _useState10[0],
    setData = _useState10[1];
  var randomId = Math.floor(Math.random() * 10).toFixed(0);
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    postForm();
  };
  var postForm = function postForm(e) {
    e.preventDefault();
    var data = {
      id: parseInt(randomId),
      name: name,
      brand: brand,
      engine: {
        type: engineType,
        hp: engineHp
      }
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
      setData(data.cars);
    })["catch"](function (error) {
      console.log(error);
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
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
    value: engineType,
    onChange: function onChange(e) {
      return setEngine(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "text",
    placeholder: "engine",
    value: engineHp,
    onChange: function onChange(e) {
      return setHp(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "button",
    name: "button",
    onClick: function onClick(e) {
      return handleSubmit(e);
    }
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5d87362e7eeb6e153841")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztNQUFBLE9BQUtmLE9BQU8sQ0FBQ2UsQ0FBQyxDQUFDcUIsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDOUY7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxPQUFPO0lBQUMsS0FBSyxFQUFFcEMsS0FBTTtJQUFDLFFBQVEsRUFBRSxrQkFBQ2MsQ0FBQztNQUFBLE9BQUtiLFFBQVEsQ0FBQ2EsQ0FBQyxDQUFDcUIsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDakc7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFFbEMsVUFBVztJQUFDLFFBQVEsRUFBRSxrQkFBQ1ksQ0FBQztNQUFBLE9BQUtYLFNBQVMsQ0FBQ1csQ0FBQyxDQUFDcUIsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDeEc7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFFaEMsUUFBUztJQUFDLFFBQVEsRUFBRSxrQkFBQ1UsQ0FBQztNQUFBLE9BQUtULEtBQUssQ0FBQ1MsQ0FBQyxDQUFDcUIsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDbEc7SUFBTyxJQUFJLEVBQUMsUUFBUTtJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsT0FBTyxFQUFFLGlCQUFDdEIsQ0FBQztNQUFBLE9BQUtELFlBQVksQ0FBQ0MsQ0FBQyxDQUFDO0lBQUE7RUFBQyxFQUFHLENBRWxFLENBQ0o7QUFFSjtBQUVBLGlFQUFlbEIsV0FBVzs7Ozs7Ozs7VUM3RTFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi8wN19EYXlfNC8wMl9KU09OX1NlcnZlci8wMV9FeGVyY2lzZS9qcy9BZGRDYXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcblxyXG5mdW5jdGlvbiBDYXJzTWFuYWdlcigpIHtcclxuXHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFticmFuZCwgc2V0QnJhbmRdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFtlbmdpbmVUeXBlLCBzZXRFbmdpbmVdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFtlbmdpbmVIcCwgc2V0SHBdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgcmFuZG9tSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkudG9GaXhlZCgwKVxyXG5cclxuICAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBwb3N0Rm9ybSgpO1xyXG4gICAgXHJcblxyXG5cclxuICAgfVxyXG5cclxuICAgY29uc3QgcG9zdEZvcm0gPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHBhcnNlSW50KHJhbmRvbUlkKSwgXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBicmFuZDogYnJhbmQsXHJcbiAgICAgICAgZW5naW5lOiB7dHlwZTplbmdpbmVUeXBlLCBocDogZW5naW5lSHB9XHJcbiAgICB9XHJcbiAgICBmZXRjaChgJHtBUEl9L2NhcnNgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgIH1cclxuXHJcbiAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBmZXRjaChgJHtBUEl9L2RiYClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHNldERhdGEoZGF0YS5jYXJzKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbn0sW10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgPGZvcm0+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIm5hbWVcIiB2YWx1ZT17bmFtZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJicmFuZFwiIHZhbHVlPXticmFuZH0gb25DaGFuZ2U9eyhlKSA9PiBzZXRCcmFuZChlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZW5naW5lXCIgdmFsdWU9e2VuZ2luZVR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW5naW5lKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbmdpbmVcIiB2YWx1ZT17ZW5naW5lSHB9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0SHAoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJidXR0b25cIiBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlU3VibWl0KGUpfSAvPlxyXG5cclxuIDwvZm9ybT5cclxuIDwvPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2Fyc01hbmFnZXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI1ZDg3MzYyZTdlZWI2ZTE1Mzg0MVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ2Fyc01hbmFnZXIiLCJBUEkiLCJuYW1lIiwic2V0TmFtZSIsImJyYW5kIiwic2V0QnJhbmQiLCJlbmdpbmVUeXBlIiwic2V0RW5naW5lIiwiZW5naW5lSHAiLCJzZXRIcCIsImRhdGEiLCJzZXREYXRhIiwicmFuZG9tSWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b0ZpeGVkIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwicG9zdEZvcm0iLCJpZCIsInBhcnNlSW50IiwiZW5naW5lIiwidHlwZSIsImhwIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiY2FycyIsInRhcmdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==