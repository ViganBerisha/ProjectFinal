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

var Car = function Car() {
  var API = "http://localhost:3000";
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    brand = _useState4[0],
    setBrand = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    engineType = _useState6[0],
    setEngine = _useState6[1];
  var _useState7 = useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    engineHp = _useState8[0],
    setHp = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    dergo = _useState10[0],
    setDergo = _useState10[1];
  var data = {
    name: name,
    brand: brand,
    engineType: engineType,
    engineHp: engineHp
  };
  var update = function update(e, id) {
    e.preventDefault();
    fetch("".concat(API, "/cars/").concat(id), {
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

/***/ }),

/***/ 34:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function CarsManager() {
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetch("".concat(API, "/cars")).then(function (response) {
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
    fetch("".concat(API, "/cars/").concat(id), {
      method: "DELETE"
    }).then(function (response) {
      setData(data);
    })["catch"](function (error) {
      console.log(error);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index
    }, " ", el.category, " ", el.brand, " ", el.title, " ", el.thumbnail, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "Sold!"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", null, "Update"), " ");
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading"));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e2c796309c0db0e417b6")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0lBQ2pCLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQWdCLEtBQUssRUFBSTtNQUNkRixPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztFQUNWLENBQUM7RUFFSCxvQkFDRSx1RUFDUUssTUFBTSxJQUFJckIsSUFBSSxDQUFDMEIsTUFBTSxHQUNyQjFCLElBQUksQ0FBQzJCLEdBQUcsQ0FBQyxVQUFDQyxFQUFFLEVBQUNDLEtBQUssRUFBSztJQUNuQixvQkFBTztNQUFJLEdBQUcsRUFBRUE7SUFBTSxRQUFHRCxFQUFFLENBQUNFLFFBQVEsT0FBR0YsRUFBRSxDQUFDcEMsS0FBSyxPQUFHb0MsRUFBRSxDQUFDRyxLQUFLLE9BQUdILEVBQUUsQ0FBQ0ksU0FBUyxvQkFBRTtNQUFRLElBQUksRUFBQyxRQUFRO01BQUMsT0FBTyxFQUFFLGlCQUFDUCxLQUFLO1FBQUEsT0FBS0QsVUFBVSxDQUFDQyxLQUFLLEVBQUNHLEVBQUUsQ0FBQ3pCLEVBQUUsQ0FBQztNQUFBO0lBQUMsV0FBZSxvQkFBQyxvRkFBdUIsTUFBTTtFQUM5TCxDQUFDLENBQUMsZ0JBRUYsaUZBQWdCLENBRWxCO0FBRVY7QUFFQSxpRUFBZWlCLFdBQVc7Ozs7Ozs7O1VDbkQxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvQ2FyLmpzIiwid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvQ2Fyc01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgQ2FyID0gKCkgPT4ge1xuICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuXG4gIGNvbnN0IFtuYW1lLCBzZXROYW1lXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFticmFuZCwgc2V0QnJhbmRdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2VuZ2luZVR5cGUsIHNldEVuZ2luZV0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZW5naW5lSHAsIHNldEhwXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtkZXJnbywgc2V0RGVyZ29dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBicmFuZDogYnJhbmQsXG4gICAgZW5naW5lVHlwZTogZW5naW5lVHlwZSxcbiAgICBlbmdpbmVIcDogZW5naW5lSHBcbiAgfTtcbiAgXG4gIGNvbnN0IHVwZGF0ZSA9IChlLCBpZCkgPT57XG4gICAgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGZldGNoKGAke0FQSX0vY2Fycy8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgIDxmb3JtIG9uU3VibWl0PXt1cGRhdGV9PlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmFtZVwiIHZhbHVlPXtuYW1lfSBvbkNoYW5nZT17KGUpPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImJyYW5kXCIgdmFsdWU9e2JyYW5kfSBvbkNoYW5nZT17KGUpPT4gc2V0QnJhbmQoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJQZXRyb2xcIiB2YWx1ZT17ZW5naW5lVHlwZX0gb25DaGFuZ2U9eyhlKT0+IHNldEVuZ2luZShlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBTXCIgdmFsdWU9e2VuZ2luZUhwfSBvbkNoYW5nZT17KGUpPT4gc2V0SHAoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwiYnV0dG9uXCIgdmFsdWU9XCJzdWJtaXRcIiAvPlxuICAgIDwvZm9ybT5cbiAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IENhciBmcm9tIFwiLi9DYXJcIjtcclxuXHJcbmZ1bmN0aW9uIENhcnNNYW5hZ2VyKCkge1xyXG5cclxuICAgIC8vIGNvbnN0IEFQSSA9IFwiaHR0cHM6Ly9kdW1teWpzb24uY29tXCI7XHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cclxuICAgIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZmV0Y2goYCR7QVBJfS9jYXJzYClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcclxuICAgICAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxbXSlcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTb2xkID0gKGV2ZW50LCBpZCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGZldGNoKGAke0FQSX0vY2Fycy8ke2lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDx1bD4gXHJcbiAgICAgICAgeyAgIGxvYWRlZCAmJiBkYXRhLmxlbmd0aCA/IFxyXG4gICAgICAgICAgICBkYXRhLm1hcCgoZWwsaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpbmRleH0+IHtlbC5jYXRlZ29yeX0ge2VsLmJyYW5kfSB7ZWwudGl0bGV9IHtlbC50aHVtYm5haWx9IDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldmVudCkgPT4gaGFuZGxlU29sZChldmVudCxlbC5pZCl9PlNvbGQhPC9idXR0b24+IDxidXR0b24+VXBkYXRlPC9idXR0b24+IDwvbGk+XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgPGgxPkxvYWRpbmc8L2gxPlxyXG4gICAgICAgIH0gICAgXHJcbiAgICAgPC91bD5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcnNNYW5hZ2VyIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZTJjNzk2MzA5YzBkYjBlNDE3YjZcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJDYXIiLCJBUEkiLCJ1c2VTdGF0ZSIsIm5hbWUiLCJzZXROYW1lIiwiYnJhbmQiLCJzZXRCcmFuZCIsImVuZ2luZVR5cGUiLCJzZXRFbmdpbmUiLCJlbmdpbmVIcCIsInNldEhwIiwiZGVyZ28iLCJzZXREZXJnbyIsImRhdGEiLCJ1cGRhdGUiLCJlIiwiaWQiLCJwcmV2ZW50RGVmYXVsdCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInRhcmdldCIsInZhbHVlIiwidXNlRWZmZWN0IiwiQ2Fyc01hbmFnZXIiLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJzZXREYXRhIiwiaGFuZGxlU29sZCIsImV2ZW50IiwibGVuZ3RoIiwibWFwIiwiZWwiLCJpbmRleCIsImNhdGVnb3J5IiwidGl0bGUiLCJ0aHVtYm5haWwiXSwic291cmNlUm9vdCI6IiJ9