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

/***/ }),

/***/ 34:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
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
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    updateForm = _useState6[0],
    setUpdateFrom = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    IdofCar = _useState8[0],
    setIdOfCar = _useState8[1];
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
  var showFormUpdate = function showFormUpdate(e, id) {
    e.preventDefault(e);
    setIdOfCar(id);
    setUpdateFrom(true);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, loaded && data.length ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index
    }, " ", el.name, " ", el.brand, " ", el.engine.type, " ", el.engine.hp, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "Sold!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      onClick: function onClick(e) {
        return showFormUpdate(e, el.id);
      }
    }, "Update"));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading")), updateForm ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Car__WEBPACK_IMPORTED_MODULE_1__["default"], {
    carId: IdofCar
  }) : null);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _CarsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _AddMovie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);






var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CarsManager__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/add-car",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddMovie__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.HashRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null)), document.getElementById("app"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0e8d88025e3f8866c54f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDO1FBQUEsT0FBSzZCLGNBQWMsQ0FBQzdCLENBQUMsRUFBRWdDLEVBQUUsQ0FBQ0osRUFBRSxDQUFDO01BQUE7SUFBQyxZQUFpQixDQUNqRTtFQUNiLENBQUMsQ0FBQyxnQkFFRixpRkFBZ0IsQ0FFbEIsRUFFRU4sVUFBVSxnQkFFViwyREFBQyw0Q0FBRztJQUFDLEtBQUssRUFBRUU7RUFBUSxFQUFHLEdBRXZCLElBQUksQ0FJUjtBQUVSO0FBRUEsaUVBQWVOLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRkE7QUFDTztBQUNPO0FBQ1A7QUFDSDtBQUM4QztBQUU1RSxJQUFNdUIsR0FBRyxHQUFHLFNBQU5BLEdBQUcsR0FBUztFQUdkLG9CQUVJLHVJQUVBLDJEQUFDLCtDQUFNLE9BQUcsZUFDVjtJQUFLLFNBQVMsRUFBQztFQUFXLGdCQUMxQiwyREFBQyxvREFBTSxxQkFDSCwyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxHQUFHO0lBQUMsT0FBTyxlQUFFLDJEQUFDLG9EQUFXO0VBQUksRUFBRyxlQUM1QywyREFBQyxtREFBSztJQUFDLElBQUksRUFBQyxVQUFVO0lBQUMsT0FBTyxlQUFFLDJEQUFDLGlEQUFRO0VBQUksRUFBRyxDQUMzQyxDQUNILENBRUg7QUFFWCxDQUFDO0FBRURQLDZDQUFlLGVBQ2YsMkRBQUMsd0RBQVUscUJBQ1AsMkRBQUMsR0FBRyxPQUFHLENBQ0UsRUFDYlMsUUFBUSxDQUFDQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O1VDOUIvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9DYXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3QvLi9wcm9qZWN0L2pzL0NhcnNNYW5hZ2VyLmpzIiwid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcblxuY29uc3QgQ2FyID0gKHByb3BzKSA9PiB7XG5cbiAgY29uc3QgQVBJID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcblxuICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbYnJhbmQsIHNldEJyYW5kXSA9IHVzZVN0YXRlKFwiXCIpXG4gIGNvbnN0IFtlbmdpbmVUeXBlLCBzZXRFbmdpbmVdID0gdXNlU3RhdGUoXCJcIilcbiAgY29uc3QgW2VuZ2luZUhwLCBzZXRIcF0gPSB1c2VTdGF0ZShcIlwiKVxuICBjb25zdCBbZGVyZ28sIHNldERlcmdvXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBkYXRhID0ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgYnJhbmQ6IGJyYW5kLFxuICAgIGVuZ2luZTp7XG4gICAgICB0eXBlOmVuZ2luZVR5cGUsXG4gICAgICBocDogZW5naW5lSHAgXG4gICAgfSBcbiAgfTtcbiAgXG4gIGNvbnN0IHVwZGF0ZSA9IChlKSA9PntcbiAgICBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc29sZS5sb2cocHJvcHMuY2FySWQpO1xuICAgIFxuICAgIGZldGNoKGAke0FQSX0vY2Fycy8ke3Byb3BzLmNhcklkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgPGZvcm0gb25TdWJtaXQ9e3VwZGF0ZX0+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuYW1lXCIgdmFsdWU9e25hbWV9IG9uQ2hhbmdlPXsoZSk9PiBzZXROYW1lKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiYnJhbmRcIiB2YWx1ZT17YnJhbmR9IG9uQ2hhbmdlPXsoZSk9PiBzZXRCcmFuZChlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBldHJvbFwiIHZhbHVlPXtlbmdpbmVUeXBlfSBvbkNoYW5nZT17KGUpPT4gc2V0RW5naW5lKGUudGFyZ2V0LnZhbHVlKX0vPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUFNcIiB2YWx1ZT17ZW5naW5lSHB9IG9uQ2hhbmdlPXsoZSk9PiBzZXRIcChlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJidXR0b25cIiB2YWx1ZT1cInN1Ym1pdFwiIC8+XG4gICAgPC9mb3JtPlxuICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXIiLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgQ2FyIGZyb20gXCIuL0NhclwiO1xyXG5cclxuZnVuY3Rpb24gQ2Fyc01hbmFnZXIoKSB7XHJcblxyXG4gICAgLy8gY29uc3QgQVBJID0gXCJodHRwczovL2R1bW15anNvbi5jb21cIjtcclxuICAgIGNvbnN0IEFQSSA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblxyXG4gICAgY29uc3QgW2xvYWRlZCwgc2V0TG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoW10pXHJcblxyXG5cclxuICAgIGNvbnN0IFt1cGRhdGVGb3JtLCBzZXRVcGRhdGVGcm9tXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IFtJZG9mQ2FyLCBzZXRJZE9mQ2FyXSA9IHVzZVN0YXRlKClcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGZldGNoKGAke0FQSX0vY2Fyc2ApXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgc2V0TG9hZGVkKHRydWUpXHJcbiAgICAgICAgICAgIHNldERhdGEoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sW10pXHJcblxyXG4gICAgY29uc3QgaGFuZGxlU29sZCA9IChldmVudCwgaWQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBmZXRjaChgJHtBUEl9L2NhcnMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvcm1VcGRhdGUgPSAoZSwgaWQpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KGUpXHJcblxyXG4gICAgICAgIHNldElkT2ZDYXIoaWQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VXBkYXRlRnJvbSh0cnVlKVxyXG4gICAgfSAgIFxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgIFxyXG4gICAgPHVsPiBcclxuICAgICAgICB7ICAgbG9hZGVkICYmIGRhdGEubGVuZ3RoID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2luZGV4fT4ge2VsLm5hbWV9IHtlbC5icmFuZH0ge2VsLmVuZ2luZS50eXBlfSB7ZWwuZW5naW5lLmhwfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KGV2ZW50KSA9PiBoYW5kbGVTb2xkKGV2ZW50LCBlbC5pZCl9PlNvbGQhPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiBzaG93Rm9ybVVwZGF0ZShlLCBlbC5pZCl9ID5VcGRhdGU8L2J1dHRvbj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICA8aDE+TG9hZGluZzwvaDE+XHJcbiAgICAgICAgfSAgICBcclxuICAgICA8L3VsPlxyXG5cclxuICAgICAgICB7ICAgdXBkYXRlRm9ybSA/XHJcblxyXG4gICAgICAgICAgICA8Q2FyIGNhcklkPXtJZG9mQ2FyfSAvPlxyXG4gICAgICAgICAgICA6IFxyXG4gICAgICAgICAgICBudWxsXHJcbiAgICAgICAgfSAgIFxyXG5cclxuXHJcbiAgICAgPC8+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJzTWFuYWdlciIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgQ2Fyc01hbmFnZXIgZnJvbSBcIi4vQ2Fyc01hbmFnZXJcIjtcbmltcG9ydCBBZGRNb3ZpZSBmcm9tIFwiLi9BZGRNb3ZpZVwiXG5pbXBvcnQgTmF2YmFyIGZyb20gXCIuL05hdmJhclwiO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgSGFzaFJvdXRlciwgUm91dGUsIFJvdXRlcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgXG4gICAgICAgIDw+XG5cbiAgICAgICAgPE5hdmJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8Um91dGVzPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PENhcnNNYW5hZ2VyIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRkLWNhclwiIGVsZW1lbnQ9ezxBZGRNb3ZpZSAvPn0gLz5cbiAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvPlxuICAgIClcbn1cblxuUmVhY3RET00ucmVuZGVyKCBcbjxIYXNoUm91dGVyPlxuICAgIDxBcHAgLz5cbjwvSGFzaFJvdXRlcj4gLCBcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKTtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjBlOGQ4ODAyNWUzZjg4NjZjNTRmXCIpIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJDYXIiLCJwcm9wcyIsIkFQSSIsIm5hbWUiLCJzZXROYW1lIiwiYnJhbmQiLCJzZXRCcmFuZCIsImVuZ2luZVR5cGUiLCJzZXRFbmdpbmUiLCJlbmdpbmVIcCIsInNldEhwIiwiZGVyZ28iLCJzZXREZXJnbyIsImRhdGEiLCJlbmdpbmUiLCJ0eXBlIiwiaHAiLCJ1cGRhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwiY2FySWQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZGVycyIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJlcnJvciIsInRhcmdldCIsInZhbHVlIiwidXNlRWZmZWN0IiwiQ2Fyc01hbmFnZXIiLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJzZXREYXRhIiwidXBkYXRlRm9ybSIsInNldFVwZGF0ZUZyb20iLCJJZG9mQ2FyIiwic2V0SWRPZkNhciIsImhhbmRsZVNvbGQiLCJldmVudCIsImlkIiwic2hvd0Zvcm1VcGRhdGUiLCJsZW5ndGgiLCJtYXAiLCJlbCIsImluZGV4IiwiUmVhY3RET00iLCJBZGRNb3ZpZSIsIk5hdmJhciIsIkJyb3dzZXJSb3V0ZXIiLCJIYXNoUm91dGVyIiwiUm91dGUiLCJSb3V0ZXMiLCJBcHAiLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sInNvdXJjZVJvb3QiOiIifQ==