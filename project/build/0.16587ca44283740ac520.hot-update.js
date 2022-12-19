"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 34:
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
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    data = _useState4[0],
    setData = _useState4[1];
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
  var handleSold = function handleSold(event, id) {
    event.preventDefault();
    fetch("".concat(API, "/cars/").concat(id), {
      method: "DELETE"
    }).then(function (response) {
      console.log(response);
    })["catch"](function (error) {
      console.log(error);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, loaded ? data.map(function (el, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index
    }, " ", el.name, " ", el.brand, " ", el.engine.type, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      type: "button",
      onClick: function onClick(event) {
        return handleSold(event, el.id);
      }
    }, "Sold!"), "  ");
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Loading"));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarsManager);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0aaa04fbb23a1a8e7703")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC4xNjU4N2NhNDQyODM3NDBhYzUyMC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrRDtBQUVsRCxTQUFTRyxXQUFXLEdBQUc7RUFFbkIsSUFBTUMsR0FBRyxHQUFHLHVCQUF1QjtFQUVuQyxnQkFBNEJGLCtDQUFRLENBQUMsS0FBSyxDQUFDO0lBQUE7SUFBcENHLE1BQU07SUFBRUMsU0FBUztFQUN4QixpQkFBd0JKLCtDQUFRLENBQUMsRUFBRSxDQUFDO0lBQUE7SUFBN0JLLElBQUk7SUFBRUMsT0FBTztFQUVwQlAsZ0RBQVMsQ0FBQyxZQUFNO0lBQ1pRLEtBQUssV0FBSUwsR0FBRyxTQUFNLENBQ2pCTSxJQUFJLENBQUMsVUFBQUMsUUFBUTtNQUFBLE9BQUlBLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFO0lBQUEsRUFBQyxDQUNqQ0YsSUFBSSxDQUFDLFVBQUFILElBQUksRUFBSTtNQUNWTSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1AsSUFBSSxDQUFDO01BQ2pCRCxTQUFTLENBQUMsSUFBSSxDQUFDO01BQ2ZFLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDUSxJQUFJLENBQUM7SUFDdEIsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFBQyxLQUFLLEVBQUk7TUFDWkgsT0FBTyxDQUFDQyxHQUFHLENBQUNFLEtBQUssQ0FBQztJQUN0QixDQUFDLENBQUM7RUFDTixDQUFDLEVBQUMsRUFBRSxDQUFDO0VBRUwsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQVUsQ0FBSUMsS0FBSyxFQUFFQyxFQUFFLEVBQUs7SUFDOUJELEtBQUssQ0FBQ0UsY0FBYyxFQUFFO0lBRXRCWCxLQUFLLFdBQUlMLEdBQUcsbUJBQVNlLEVBQUUsR0FBSTtNQUN2QkUsTUFBTSxFQUFFO0lBQ1YsQ0FBQyxDQUFDLENBQ0NYLElBQUksQ0FBQyxVQUFBQyxRQUFRLEVBQUk7TUFFZEUsT0FBTyxDQUFDQyxHQUFHLENBQUNILFFBQVEsQ0FBQztJQUN6QixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFLLEtBQUssRUFBSTtNQUNkSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0UsS0FBSyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztFQUNWLENBQUM7RUFFSCxvQkFDRSx1RUFDUVgsTUFBTSxHQUNORSxJQUFJLENBQUNlLEdBQUcsQ0FBQyxVQUFDQyxFQUFFLEVBQUNDLEtBQUssRUFBSztJQUNuQixvQkFBTztNQUFJLEdBQUcsRUFBRUE7SUFBTSxRQUFHRCxFQUFFLENBQUNFLElBQUksT0FBR0YsRUFBRSxDQUFDRyxLQUFLLE9BQUdILEVBQUUsQ0FBQ0ksTUFBTSxDQUFDQyxJQUFJLG9CQUFFO01BQVEsSUFBSSxFQUFDLFFBQVE7TUFBQyxPQUFPLEVBQUUsaUJBQUNWLEtBQUs7UUFBQSxPQUFLRCxVQUFVLENBQUNDLEtBQUssRUFBQ0ssRUFBRSxDQUFDSixFQUFFLENBQUM7TUFBQTtJQUFDLFdBQWUsT0FBTztFQUMxSixDQUFDLENBQUMsZ0JBRUYsaUZBQWdCLENBRWxCO0FBRVY7QUFFQSxpRUFBZWhCLFdBQVc7Ozs7Ozs7O1VDbEQxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvQ2Fyc01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcblxyXG5mdW5jdGlvbiBDYXJzTWFuYWdlcigpIHtcclxuXHJcbiAgICBjb25zdCBBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG4gICAgXHJcbiAgICBjb25zdCBbbG9hZGVkLCBzZXRMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSlcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGZldGNoKGAke0FQSX0vZGJgKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHNldExvYWRlZCh0cnVlKVxyXG4gICAgICAgICAgICBzZXREYXRhKGRhdGEuY2FycylcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sW10pXHJcblxyXG4gICAgY29uc3QgaGFuZGxlU29sZCA9IChldmVudCwgaWQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBmZXRjaChgJHtBUEl9L2NhcnMvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHVsPiBcclxuICAgICAgICB7ICAgbG9hZGVkID8gXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChlbCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2luZGV4fT4ge2VsLm5hbWV9IHtlbC5icmFuZH0ge2VsLmVuZ2luZS50eXBlfSA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZVNvbGQoZXZlbnQsZWwuaWQpfT5Tb2xkITwvYnV0dG9uPiAgPC9saT5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICA8aDE+TG9hZGluZzwvaDE+XHJcbiAgICAgICAgfSAgICBcclxuICAgICA8L3VsPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2Fyc01hbmFnZXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIwYWFhMDRmYmIyM2ExYThlNzcwM1wiKSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ2Fyc01hbmFnZXIiLCJBUEkiLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJkYXRhIiwic2V0RGF0YSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJjYXJzIiwiZXJyb3IiLCJoYW5kbGVTb2xkIiwiZXZlbnQiLCJpZCIsInByZXZlbnREZWZhdWx0IiwibWV0aG9kIiwibWFwIiwiZWwiLCJpbmRleCIsIm5hbWUiLCJicmFuZCIsImVuZ2luZSIsInR5cGUiXSwic291cmNlUm9vdCI6IiJ9