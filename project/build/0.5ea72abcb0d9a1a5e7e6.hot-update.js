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
    engine: {
      type: engineType,
      hp: engineHp
    }
  };
  var update = function update(e) {
    e.preventDefault();
    console.log(props.carId);

    // fetch(`${API}/cars/${props.carId}`, {
    //   method: "PUT",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
/******/ 	__webpack_require__.h = () => ("1ad02827b71dfc6616b8")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC41ZWE3MmFiY2IwZDlhMWE1ZTdlNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQztBQUVyQyxJQUFNRSxHQUFHLEdBQUcsU0FBTkEsR0FBRyxDQUFJQyxLQUFLLEVBQUs7RUFFckIsSUFBTUMsR0FBRyxHQUFHLHVCQUF1QjtFQUVuQyxnQkFBd0JILCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUE7SUFBN0JJLElBQUk7SUFBRUMsT0FBTztFQUNwQixpQkFBMEJMLCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUE7SUFBL0JNLEtBQUs7SUFBRUMsUUFBUTtFQUN0QixpQkFBZ0NQLCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUE7SUFBckNRLFVBQVU7SUFBRUMsU0FBUztFQUM1QixpQkFBMEJULCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUE7SUFBL0JVLFFBQVE7SUFBRUMsS0FBSztFQUN0QixpQkFBMEJYLCtDQUFRLENBQUMsS0FBSyxDQUFDO0lBQUE7SUFBbENZLEtBQUs7SUFBRUMsUUFBUTtFQUV0QixJQUFNQyxJQUFJLEdBQUc7SUFDWFYsSUFBSSxFQUFFQSxJQUFJO0lBQ1ZFLEtBQUssRUFBRUEsS0FBSztJQUNaUyxNQUFNLEVBQUM7TUFDTEMsSUFBSSxFQUFDUixVQUFVO01BQ2ZTLEVBQUUsRUFBRVA7SUFDTjtFQUNGLENBQUM7RUFFRCxJQUFNUSxNQUFNLEdBQUcsU0FBVEEsTUFBTSxDQUFJQyxDQUFDLEVBQUk7SUFFbkJBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO0lBRWxCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ3BCLEtBQUssQ0FBQ3FCLEtBQUssQ0FBQzs7SUFFeEI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUNGLENBQUM7O0VBRUQsb0JBQ0UsdUlBQ0E7SUFBTSxRQUFRLEVBQUVMO0VBQU8sZ0JBQ3ZCO0lBQU8sSUFBSSxFQUFDLE1BQU07SUFBQyxXQUFXLEVBQUMsTUFBTTtJQUFDLEtBQUssRUFBRWQsSUFBSztJQUFDLFFBQVEsRUFBRSxrQkFBQ2UsQ0FBQztNQUFBLE9BQUlkLE9BQU8sQ0FBQ2MsQ0FBQyxDQUFDSyxNQUFNLENBQUNDLEtBQUssQ0FBQztJQUFBO0VBQUMsRUFBRSxlQUM3RjtJQUFPLElBQUksRUFBQyxNQUFNO0lBQUMsV0FBVyxFQUFDLE9BQU87SUFBQyxLQUFLLEVBQUVuQixLQUFNO0lBQUMsUUFBUSxFQUFFLGtCQUFDYSxDQUFDO01BQUEsT0FBSVosUUFBUSxDQUFDWSxDQUFDLENBQUNLLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO0lBQUE7RUFBQyxFQUFFLGVBQ2hHO0lBQU8sSUFBSSxFQUFDLE1BQU07SUFBQyxXQUFXLEVBQUMsUUFBUTtJQUFDLEtBQUssRUFBRWpCLFVBQVc7SUFBQyxRQUFRLEVBQUUsa0JBQUNXLENBQUM7TUFBQSxPQUFJVixTQUFTLENBQUNVLENBQUMsQ0FBQ0ssTUFBTSxDQUFDQyxLQUFLLENBQUM7SUFBQTtFQUFDLEVBQUUsZUFDdkc7SUFBTyxJQUFJLEVBQUMsTUFBTTtJQUFDLFdBQVcsRUFBQyxJQUFJO0lBQUMsS0FBSyxFQUFFZixRQUFTO0lBQUMsUUFBUSxFQUFFLGtCQUFDUyxDQUFDO01BQUEsT0FBSVIsS0FBSyxDQUFDUSxDQUFDLENBQUNLLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO0lBQUE7RUFBQyxFQUFFLGVBQzdGO0lBQU8sSUFBSSxFQUFDLFFBQVE7SUFBQyxJQUFJLEVBQUMsUUFBUTtJQUFDLEtBQUssRUFBQztFQUFRLEVBQUcsQ0FDN0MsQ0FDTjtBQUVMLENBQUM7QUFFRCxpRUFBZXhCLEdBQUc7Ozs7Ozs7O1VDeERsQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvQ2FyLmpzIiwid2VicGFjazovL3JlYWN0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IENhciA9IChwcm9wcykgPT4ge1xuXG4gIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG5cbiAgY29uc3QgW25hbWUsIHNldE5hbWVdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2JyYW5kLCBzZXRCcmFuZF0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZW5naW5lVHlwZSwgc2V0RW5naW5lXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtlbmdpbmVIcCwgc2V0SHBdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2RlcmdvLCBzZXREZXJnb10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGJyYW5kOiBicmFuZCxcbiAgICBlbmdpbmU6e1xuICAgICAgdHlwZTplbmdpbmVUeXBlLFxuICAgICAgaHA6IGVuZ2luZUhwIFxuICAgIH0gXG4gIH07XG4gIFxuICBjb25zdCB1cGRhdGUgPSAoZSkgPT57XG4gICAgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKHByb3BzLmNhcklkKTtcbiAgICBcbiAgICAvLyBmZXRjaChgJHtBUEl9L2NhcnMvJHtwcm9wcy5jYXJJZH1gLCB7XG4gICAgLy8gICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgLy8gICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAvLyAgIGhlYWRlcnM6IHtcbiAgICAvLyAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICAgIC8vICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC8vICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vICAgfSlcbiAgICAvLyAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAvLyAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgIDxmb3JtIG9uU3VibWl0PXt1cGRhdGV9PlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImJyYW5kXCIgdmFsdWU9e2JyYW5kfSBvbkNoYW5nZT17KGUpPT4gc2V0QnJhbmQoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJQZXRyb2xcIiB2YWx1ZT17ZW5naW5lVHlwZX0gb25DaGFuZ2U9eyhlKT0+IHNldEVuZ2luZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBTXCIgdmFsdWU9e2VuZ2luZUhwfSBvbkNoYW5nZT17KGUpPT4gc2V0SHAoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIiAvPlxuICAgIDwvZm9ybT5cbiAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMWFkMDI4MjdiNzFkZmM2NjE2YjhcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkNhciIsInByb3BzIiwiQVBJIiwibmFtZSIsInNldE5hbWUiLCJicmFuZCIsInNldEJyYW5kIiwiZW5naW5lVHlwZSIsInNldEVuZ2luZSIsImVuZ2luZUhwIiwic2V0SHAiLCJkZXJnbyIsInNldERlcmdvIiwiZGF0YSIsImVuZ2luZSIsInR5cGUiLCJocCIsInVwZGF0ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJjYXJJZCIsInRhcmdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==