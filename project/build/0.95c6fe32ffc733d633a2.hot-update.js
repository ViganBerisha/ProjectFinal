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
    console.log(e);
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
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("73128f1969a134977687")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDOUY7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxPQUFPO0lBQUMsS0FBSyxFQUFFbkMsS0FBTTtJQUFDLFFBQVEsRUFBRSxrQkFBQ2MsQ0FBQztNQUFBLE9BQUtiLFFBQVEsQ0FBQ2EsQ0FBQyxDQUFDb0IsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDakc7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFFakMsVUFBVztJQUFDLFFBQVEsRUFBRSxrQkFBQ1ksQ0FBQztNQUFBLE9BQUtYLFNBQVMsQ0FBQ1csQ0FBQyxDQUFDb0IsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDeEc7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFFL0IsUUFBUztJQUFDLFFBQVEsRUFBRSxrQkFBQ1UsQ0FBQztNQUFBLE9BQUtULEtBQUssQ0FBQ1MsQ0FBQyxDQUFDb0IsTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDbEc7SUFBTyxJQUFJLEVBQUMsUUFBUTtJQUFDLElBQUksRUFBQyxRQUFRO0lBQUMsS0FBSyxFQUFDO0VBQVEsRUFBRyxDQUNoRDtBQUVSO0FBRUEsaUVBQWV2QyxXQUFXOzs7Ozs7OztVQ2xFMUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uLzA3X0RheV80LzAyX0pTT05fU2VydmVyLzAxX0V4ZXJjaXNlL2pzL0FkZENhci5qcyIsIndlYnBhY2s6Ly9yZWFjdC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuXHJcbmZ1bmN0aW9uIENhcnNNYW5hZ2VyKCkge1xyXG5cclxuICAgIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZShcIlwiKVxyXG4gICAgY29uc3QgW2JyYW5kLCBzZXRCcmFuZF0gPSB1c2VTdGF0ZShcIlwiKVxyXG4gICAgY29uc3QgW2VuZ2luZVR5cGUsIHNldEVuZ2luZV0gPSB1c2VTdGF0ZShcIlwiKVxyXG4gICAgY29uc3QgW2VuZ2luZUhwLCBzZXRIcF0gPSB1c2VTdGF0ZShcIlwiKVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcbiAgICBcclxuICAgIGNvbnN0IHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLnRvRml4ZWQoMClcclxuXHJcbiAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIFxyXG4gICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICBpZDogcGFyc2VJbnQocmFuZG9tSWQpLCBcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIGJyYW5kOiBicmFuZCxcclxuICAgICAgICBlbmdpbmU6IHt0eXBlOmVuZ2luZVR5cGUsIGhwOiBlbmdpbmVIcH1cclxuICAgIH1cclxuICAgIGZldGNoKGAke0FQSX0vY2Fyc2AsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuXHJcbiAgIH1cclxuXHJcbiAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBmZXRjaChgJHtBUEl9L2RiYClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgIHNldERhdGEoZGF0YS5jYXJzKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbn0sW10pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpID0+IHNldE5hbWUoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImJyYW5kXCIgdmFsdWU9e2JyYW5kfSBvbkNoYW5nZT17KGUpID0+IHNldEJyYW5kKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlbmdpbmVcIiB2YWx1ZT17ZW5naW5lVHlwZX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRFbmdpbmUoZS50YXJnZXQudmFsdWUpfS8+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImVuZ2luZVwiIHZhbHVlPXtlbmdpbmVIcH0gb25DaGFuZ2U9eyhlKSA9PiBzZXRIcChlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgbmFtZT1cImJ1dHRvblwiIHZhbHVlPVwic3VibWl0XCIgLz5cclxuIDwvZm9ybT5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcnNNYW5hZ2VyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNzMxMjhmMTk2OWExMzQ5Nzc2ODdcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkNhcnNNYW5hZ2VyIiwiQVBJIiwibmFtZSIsInNldE5hbWUiLCJicmFuZCIsInNldEJyYW5kIiwiZW5naW5lVHlwZSIsInNldEVuZ2luZSIsImVuZ2luZUhwIiwic2V0SHAiLCJkYXRhIiwic2V0RGF0YSIsInJhbmRvbUlkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9GaXhlZCIsImhhbmRsZVN1Ym1pdCIsImUiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJwYXJzZUludCIsImVuZ2luZSIsInR5cGUiLCJocCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImVycm9yIiwic2V0TG9hZGVkIiwiY2FycyIsInRhcmdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==