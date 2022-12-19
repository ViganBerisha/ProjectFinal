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

  //    useEffect(() => {
  //     fetch(`${API}/db`)
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //         setData(data.cars)
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     });
  // },[])

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
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
    type: "submit",
    name: "button",
    value: "submit"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("20b3bd2405ca0bb101e2")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssQ0FBQztJQUFBO0VBQUMsRUFBRSxlQUN4RztJQUFPLElBQUksRUFBQyxNQUFNO0lBQUMsV0FBVyxFQUFDLFFBQVE7SUFBQyxLQUFLLEVBQUU5QixRQUFTO0lBQUMsUUFBUSxFQUFFLGtCQUFDVSxDQUFDO01BQUEsT0FBS1QsS0FBSyxDQUFDUyxDQUFDLENBQUNtQixNQUFNLENBQUNDLEtBQUssQ0FBQztJQUFBO0VBQUMsRUFBRSxlQUNsRztJQUFPLElBQUksRUFBQyxRQUFRO0lBQUMsSUFBSSxFQUFDLFFBQVE7SUFBQyxLQUFLLEVBQUM7RUFBUSxFQUFHLENBRWhELENBQ0o7QUFFSjtBQUVBLGlFQUFldEMsV0FBVzs7Ozs7Ozs7VUN0RTFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QvLi8wN19EYXlfNC8wMl9KU09OX1NlcnZlci8wMV9FeGVyY2lzZS9qcy9BZGRDYXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcblxyXG5mdW5jdGlvbiBDYXJzTWFuYWdlcigpIHtcclxuXHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFticmFuZCwgc2V0QnJhbmRdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFtlbmdpbmVUeXBlLCBzZXRFbmdpbmVdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFtlbmdpbmVIcCwgc2V0SHBdID0gdXNlU3RhdGUoXCJcIilcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgcmFuZG9tSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkudG9GaXhlZCgwKVxyXG5cclxuICAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHBhcnNlSW50KHJhbmRvbUlkKSwgXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBicmFuZDogYnJhbmQsXHJcbiAgICAgICAgZW5naW5lOiB7dHlwZTplbmdpbmVUeXBlLCBocDogZW5naW5lSHB9XHJcbiAgICB9XHJcbiAgICBmZXRjaChgJHtBUEl9L2NhcnNgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcblxyXG4gICB9XHJcblxyXG4vLyAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4vLyAgICAgZmV0Y2goYCR7QVBJfS9kYmApXHJcbi8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAudGhlbihkYXRhID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuLy8gICAgICAgICBzZXREYXRhKGRhdGEuY2FycylcclxuLy8gICAgIH0pXHJcbi8vICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuLy8gICAgIH0pO1xyXG4vLyB9LFtdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuYW1lXCIgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiYnJhbmRcIiB2YWx1ZT17YnJhbmR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0QnJhbmQoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImVuZ2luZVwiIHZhbHVlPXtlbmdpbmVUeXBlfSBvbkNoYW5nZT17KGUpID0+IHNldEVuZ2luZShlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZW5naW5lXCIgdmFsdWU9e2VuZ2luZUhwfSBvbkNoYW5nZT17KGUpID0+IHNldEhwKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIiAvPlxyXG5cclxuIDwvZm9ybT5cclxuIDwvPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2Fyc01hbmFnZXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIyMGIzYmQyNDA1Y2EwYmIxMDFlMlwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ2Fyc01hbmFnZXIiLCJBUEkiLCJuYW1lIiwic2V0TmFtZSIsImJyYW5kIiwic2V0QnJhbmQiLCJlbmdpbmVUeXBlIiwic2V0RW5naW5lIiwiZW5naW5lSHAiLCJzZXRIcCIsImRhdGEiLCJzZXREYXRhIiwicmFuZG9tSWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b0ZpeGVkIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiaWQiLCJwYXJzZUludCIsImVuZ2luZSIsInR5cGUiLCJocCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRhcmdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==