"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _MovieManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _AddMovie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(38);






var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MovieManager__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/add-movie",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddMovie__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/update-movie",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(UpdateMovie, null)
  }))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.HashRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null)), document.getElementById("app"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("760bbbdf430bb686d395")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC4yMWI2YmM0YzdlY2QyZmJlYTFkMS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNPO0FBQ1M7QUFDVDtBQUNIO0FBQzhDO0FBRTVFLElBQU1TLEdBQUcsR0FBRyxTQUFOQSxHQUFHLEdBQVM7RUFHZCxvQkFFSSx1SUFFQSwyREFBQywrQ0FBTSxPQUFHLGVBQ1Y7SUFBSyxTQUFTLEVBQUM7RUFBVyxnQkFDMUIsMkRBQUMsb0RBQU0scUJBQ0gsMkRBQUMsbURBQUs7SUFBQyxJQUFJLEVBQUMsR0FBRztJQUFDLE9BQU8sZUFBRSwyREFBQyxxREFBWTtFQUFJLEVBQUcsZUFDN0MsMkRBQUMsbURBQUs7SUFBQyxJQUFJLEVBQUMsWUFBWTtJQUFDLE9BQU8sZUFBRSwyREFBQyxpREFBUTtFQUFJLEVBQUcsZUFDbEQsMkRBQUMsbURBQUs7SUFBQyxJQUFJLEVBQUMsZUFBZTtJQUFDLE9BQU8sZUFBRSwyREFBQyxXQUFXO0VBQUksRUFBRyxDQUVuRCxDQUNILENBRUg7QUFFWCxDQUFDO0FBRURSLDZDQUFlLGVBQ2YsMkRBQUMsd0RBQVUscUJBQ1AsMkRBQUMsR0FBRyxPQUFHLENBQ0UsRUFDYlUsUUFBUSxDQUFDQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7O1VDaEMvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vcHJvamVjdC9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgTW92aWVNYW5hZ2VyIGZyb20gXCIuL01vdmllTWFuYWdlclwiO1xuaW1wb3J0IEFkZE1vdmllIGZyb20gXCIuL0FkZE1vdmllXCJcbmltcG9ydCBOYXZiYXIgZnJvbSBcIi4vTmF2YmFyXCI7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBIYXNoUm91dGVyLCBSb3V0ZSwgUm91dGVzIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgPD5cblxuICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8TW92aWVNYW5hZ2VyIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvYWRkLW1vdmllXCIgZWxlbWVudD17PEFkZE1vdmllIC8+fSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvdXBkYXRlLW1vdmllXCIgZWxlbWVudD17PFVwZGF0ZU1vdmllIC8+fSAvPlxuXG4gICAgICAgIDwvUm91dGVzPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8Lz5cbiAgICApXG59XG5cblJlYWN0RE9NLnJlbmRlciggXG48SGFzaFJvdXRlcj5cbiAgICA8QXBwIC8+XG48L0hhc2hSb3V0ZXI+ICwgXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSk7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3NjBiYmJkZjQzMGJiNjg2ZDM5NVwiKSJdLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0RE9NIiwiTW92aWVNYW5hZ2VyIiwiQWRkTW92aWUiLCJOYXZiYXIiLCJCcm93c2VyUm91dGVyIiwiSGFzaFJvdXRlciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=