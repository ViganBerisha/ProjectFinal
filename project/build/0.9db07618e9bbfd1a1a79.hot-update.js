"use strict";
self["webpackHotUpdatereact"](0,{

/***/ 39:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* binding */ AbortedDeferredError),
/* harmony export */   "Action": () => (/* binding */ Action),
/* harmony export */   "ErrorResponse": () => (/* binding */ ErrorResponse),
/* harmony export */   "IDLE_FETCHER": () => (/* binding */ IDLE_FETCHER),
/* harmony export */   "IDLE_NAVIGATION": () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   "UNSAFE_convertRoutesToDataRoutes": () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   "UNSAFE_getPathContributingMatches": () => (/* binding */ getPathContributingMatches),
/* harmony export */   "createBrowserHistory": () => (/* binding */ createBrowserHistory),
/* harmony export */   "createHashHistory": () => (/* binding */ createHashHistory),
/* harmony export */   "createMemoryHistory": () => (/* binding */ createMemoryHistory),
/* harmony export */   "createPath": () => (/* binding */ createPath),
/* harmony export */   "createRouter": () => (/* binding */ createRouter),
/* harmony export */   "defer": () => (/* binding */ defer),
/* harmony export */   "generatePath": () => (/* binding */ generatePath),
/* harmony export */   "getStaticContextFromError": () => (/* binding */ getStaticContextFromError),
/* harmony export */   "getToPathname": () => (/* binding */ getToPathname),
/* harmony export */   "invariant": () => (/* binding */ invariant),
/* harmony export */   "isRouteErrorResponse": () => (/* binding */ isRouteErrorResponse),
/* harmony export */   "joinPaths": () => (/* binding */ joinPaths),
/* harmony export */   "json": () => (/* binding */ json),
/* harmony export */   "matchPath": () => (/* binding */ matchPath),
/* harmony export */   "matchRoutes": () => (/* binding */ matchRoutes),
/* harmony export */   "normalizePathname": () => (/* binding */ normalizePathname),
/* harmony export */   "parsePath": () => (/* binding */ parsePath),
/* harmony export */   "redirect": () => (/* binding */ redirect),
/* harmony export */   "resolvePath": () => (/* binding */ resolvePath),
/* harmony export */   "resolveTo": () => (/* binding */ resolveTo),
/* harmony export */   "stripBasename": () => (/* binding */ stripBasename),
/* harmony export */   "unstable_createStaticHandler": () => (/* binding */ unstable_createStaticHandler),
/* harmony export */   "warning": () => (/* binding */ warning)
/* harmony export */ });
/**
 * @remix-run/router v1.0.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////

/**
 * Actions represent the type of change to a location value.
 */
var Action;

(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));

const PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */

function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }

  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries; // Declare so we can access from createMemoryLocation

  entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;

  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }

  function getCurrentLocation() {
    return entries[index];
  }

  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }

    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }

  let history = {
    get index() {
      return index;
    },

    get action() {
      return action;
    },

    get location() {
      return getCurrentLocation();
    },

    createHref(to) {
      return typeof to === "string" ? to : createPath(to);
    },

    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },

    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);

      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation
        });
      }
    },

    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;

      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation
        });
      }
    },

    go(delta) {
      action = Action.Pop;
      index = clampIndex(index + delta);

      if (listener) {
        listener({
          action,
          location: getCurrentLocation()
        });
      }
    },

    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }

  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }

  function createBrowserLocation(window, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window.location;
    return createLocation("", {
      pathname,
      search,
      hash
    }, // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }

  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : createPath(to);
  }

  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }

  function createHashLocation(window, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window.location.hash.substr(1));
    return createLocation("", {
      pathname,
      search,
      hash
    }, // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }

  function createHashHref(window, to) {
    let base = window.document.querySelector("base");
    let href = "";

    if (base && base.getAttribute("href")) {
      let url = window.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }

    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }

  function validateHashLocation(location, to) {
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }

  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region UTILS
////////////////////////////////////////////////////////////////////////////////

function warning$1(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */


function getHistoryState(location) {
  return {
    usr: location.state,
    key: location.key
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */


function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }

  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });

  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */

function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */

function parsePath(path) {
  let parsedPath = {};

  if (path) {
    let hashIndex = path.indexOf("#");

    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    let searchIndex = path.indexOf("?");

    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}
function createURL(location) {
  // window.location.origin is "null" (the literal string value) in Firefox
  // under certain conditions, notably when serving from a local HTML file
  // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
  let base = typeof window !== "undefined" && typeof window.location !== "undefined" && window.location.origin !== "null" ? window.location.origin : "unknown://unknown";
  let href = typeof location === "string" ? location : createPath(location);
  return new URL(href, base);
}

function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }

  let {
    window = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener = null;

  function handlePop() {
    action = Action.Pop;

    if (listener) {
      listener({
        action,
        location: history.location
      });
    }
  }

  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    let historyState = getHistoryState(location);
    let url = history.createHref(location); // try...catch because iOS limits us to 100 pushState calls :/

    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }

    if (v5Compat && listener) {
      listener({
        action,
        location: history.location
      });
    }
  }

  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    let historyState = getHistoryState(location);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);

    if (v5Compat && listener) {
      listener({
        action,
        location: history.location
      });
    }
  }

  let history = {
    get action() {
      return action;
    },

    get location() {
      return getLocation(window, globalHistory);
    },

    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }

      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },

    createHref(to) {
      return createHref(window, to);
    },

    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(typeof to === "string" ? to : createPath(to));
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },

    push,
    replace,

    go(n) {
      return globalHistory.go(n);
    }

  };
  return history;
} //#endregion

var ResultType;

(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));

function isIndexRoute(route) {
  return route.index === true;
} // Walk the route tree generating unique IDs where necessary so we are working
// solely with AgnosticDataRouteObject's within the Router


function convertRoutesToDataRoutes(routes, parentPath, allIds) {
  if (parentPath === void 0) {
    parentPath = [];
  }

  if (allIds === void 0) {
    allIds = new Set();
  }

  return routes.map((route, index) => {
    let treePath = [...parentPath, index];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!allIds.has(id), "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    allIds.add(id);

    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, {
        id
      });

      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, {
        id,
        children: route.children ? convertRoutesToDataRoutes(route.children, treePath, allIds) : undefined
      });

      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/match-routes
 */

function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }

  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);

  if (pathname == null) {
    return null;
  }

  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;

  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    safelyDecodeURI(pathname));
  }

  return matches;
}

function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }

  if (parentsMeta === void 0) {
    parentsMeta = [];
  }

  if (parentPath === void 0) {
    parentPath = "";
  }

  routes.forEach((route, index) => {
    let meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };

    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }

    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      invariant( // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.


    if (route.path == null && !route.index) {
      return;
    }

    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  });
  return branches;
}

function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}

const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;

const isSplat = s => s === "*";

function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;

  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }

  if (index) {
    initialScore += indexRouteValue;
  }

  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}

function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}

function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];

  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });

    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }

  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/generate-path
 */


function generatePath(path, params) {
  if (params === void 0) {
    params = {};
  }

  return path.replace(/:(\w+)/g, (_, key) => {
    invariant(params[key] != null, "Missing \":" + key + "\" param");
    return params[key];
  }).replace(/(\/?)\*/, (_, prefix, __, str) => {
    const star = "*";

    if (params[star] == null) {
      // If no splat was provided, trim the trailing slash _unless_ it's
      // the entire path
      return str === "/*" ? "/" : "";
    } // Apply the splat


    return "" + prefix + params[star];
  });
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/match-path
 */

function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }

  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }

    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}

function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }

  if (end === void 0) {
    end = true;
  }

  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });

  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;

  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}

function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}

function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */


function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  } // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it


  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);

  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }

  return pathname.slice(startIndex) || "/";
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
/**
 * @private
 */

function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/resolve-path
 */

function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }

  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}

function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}

function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */


function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
/**
 * @private
 */

function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }

  let to;

  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }

  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from; // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.


    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  let path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original "to" had one

  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"); // Or if this was a link to the current path which has a trailing slash

  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");

  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }

  return path;
}
/**
 * @private
 */

function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */

const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
/**
 * @private
 */

const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
 * @private
 */

const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
 * @private
 */

const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */

const json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }

  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }

  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class AbortedDeferredError extends Error {}
class DeferredData {
  constructor(data) {
    this.pendingKeys = new Set();
    this.subscriber = undefined;
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects"); // Set up an AbortController + Promise we can race against to exit early
    // cancellation

    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();

    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));

    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);

    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref) => {
      let [key, value] = _ref;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
  }

  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }

    this.pendingKeys.add(key); // We store a little wrapper promise that will be extended with
    // _data/_error props upon resolve/reject

    let promise = Promise.race([value, this.abortPromise]).then(data => this.onSettle(promise, key, null, data), error => this.onSettle(promise, key, error)); // Register rejection listeners to avoid uncaught promise rejections on
    // errors or aborted deferred values

    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }

  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }

    this.pendingKeys.delete(key);

    if (this.done) {
      // Nothing left to abort!
      this.unlistenAbortSignal();
    }

    const subscriber = this.subscriber;

    if (error) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      subscriber && subscriber(false);
      return Promise.reject(error);
    }

    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    subscriber && subscriber(false);
    return data;
  }

  subscribe(fn) {
    this.subscriber = fn;
  }

  cancel() {
    this.controller.abort();
    this.pendingKeys.forEach((v, k) => this.pendingKeys.delete(k));
    let subscriber = this.subscriber;
    subscriber && subscriber(true);
  }

  async resolveData(signal) {
    let aborted = false;

    if (!this.done) {
      let onAbort = () => this.cancel();

      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted => {
          signal.removeEventListener("abort", onAbort);

          if (aborted || this.done) {
            resolve(aborted);
          }
        });
      });
    }

    return aborted;
  }

  get done() {
    return this.pendingKeys.size === 0;
  }

  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }

}

function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}

function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }

  if (value._error) {
    throw value._error;
  }

  return value._data;
}

function defer(data) {
  return new DeferredData(data);
}
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */

const redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }

  let responseInit = init;

  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }

  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 */

class ErrorResponse {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }

    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;

    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }

}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response throw from an action/loader
 */

function isRouteErrorResponse(e) {
  return e instanceof ErrorResponse;
}

const validActionMethodsArr = ["post", "put", "patch", "delete"];
const validActionMethods = new Set(validActionMethodsArr);
const validRequestMethodsArr = ["get", ...validActionMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const isServer = !isBrowser; //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a router and listen to history POP navigations
 */

function createRouter(init) {
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let dataRoutes = convertRoutesToDataRoutes(init.routes); // Cleanup function for history

  let unlistenHistory = null; // Externally-provided functions to call on all state changes

  let subscribers = new Set(); // Externally-provided object to hold scroll restoration locations during routing

  let savedScrollPositions = null; // Externally-provided function to get scroll restoration keys

  let getScrollRestorationKey = null; // Externally-provided function to get current scroll position

  let getScrollPosition = null; // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition

  let initialScrollRestored = false;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, init.basename);
  let initialErrors = null;

  if (initialMatches == null) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }

  let initialized = !initialMatches.some(m => m.route.loader) || init.hydrationData != null;
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    restoreScrollPosition: null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map()
  }; // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)

  let pendingAction = Action.Pop; // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?

  let pendingPreventScrollReset = false; // AbortController for the active navigation

  let pendingNavigationController; // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted

  let isUninterruptedRevalidation = false; // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidate()
  //  - X-Remix-Revalidate (from redirect)

  let isRevalidationRequired = false; // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission

  let cancelledDeferredRoutes = []; // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation

  let cancelledFetcherLoads = []; // AbortControllers for any in-flight fetchers

  let fetchControllers = new Map(); // Track loads based on the order in which they started

  let incrementingLoadId = 0; // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation

  let pendingNavigationLoadId = -1; // Fetchers that triggered data reloads as a result of their actions

  let fetchReloadIds = new Map(); // Fetchers that triggered redirect navigations from their actions

  let fetchRedirectIds = new Set(); // Most recent href/match for fetcher.load calls for fetchers

  let fetchLoadMatches = new Map(); // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.

  let activeDeferreds = new Map(); // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();

  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location
      } = _ref;
      return startNavigation(historyAction, location);
    }); // Kick off initial data load if needed.  Use Pop to avoid modifying history

    if (!state.initialized) {
      startNavigation(Action.Pop, state.location);
    }

    return router;
  } // Clean up a router and it's side effects


  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }

    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
  } // Subscribe to state updates for the router


  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  } // Update our state and notify the calling context of the change


  function updateState(newState) {
    state = _extends({}, state, newState);
    subscribers.forEach(subscriber => subscriber(state));
  } // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState


  function completeNavigation(location, newState) {
    var _state$navigation$for;

    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a submission
    // - We're past the submitting state and into the loading state
    // - The location we've finished loading is different from the submission
    //   location, indicating we redirected from the action (avoids false
    //   positives for loading/submissionRedirect when actionData returned
    //   on a prior submission)
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && state.navigation.state === "loading" && ((_state$navigation$for = state.navigation.formAction) == null ? void 0 : _state$navigation$for.split("?")[0]) === location.pathname; // Always preserve any existing loaderData from re-used routes

    let newLoaderData = newState.loaderData ? {
      loaderData: mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [])
    } : {};
    updateState(_extends({}, isActionReload ? {} : {
      actionData: null
    }, newState, newLoaderData, {
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      // Don't restore on submission navigations
      restoreScrollPosition: state.navigation.formData ? false : getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset: pendingPreventScrollReset
    }));

    if (isUninterruptedRevalidation) ; else if (pendingAction === Action.Pop) ; else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    } // Reset stateful navigation vars


    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  } // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission


  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }

    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(to, opts);
    let location = createLocation(state.location, path, opts && opts.state); // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
    // URL from window.location, so we need to encode it here so the behavior
    // remains the same as POP and non-data-router usages.  new URL() does all
    // the same encoding we'd get from a history.pushState/window.location read
    // without having to touch history

    location = _extends({}, location, init.history.encodeLocation(location));
    let historyAction = (opts && opts.replace) === true || submission != null ? Action.Replace : Action.Push;
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
    return await startNavigation(historyAction, location, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  } // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round


  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    }); // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders

    if (state.navigation.state === "submitting") {
      return;
    } // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation


    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    } // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes


    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  } // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation


  async function startNavigation(historyAction, location, opts) {
    // Abort any in-progress navigations and start a new one. Unset any ongoing
    // uninterrupted revalidations unless told otherwise, since we want this
    // new navigation to update history normally
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true; // Save the current scroll position every time we start a new navigation,
    // and track whether we should reset scroll on completion

    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(dataRoutes, location, init.basename); // Short circuit with a 404 on the root error boundary if we match nothing

    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes); // Cancel all pending deferred on 404s since we don't keep any routes

      cancelActiveDeferreds();
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    } // Short circuit if it's only a hash change


    if (isHashChangeOnly(state.location, location)) {
      completeNavigation(location, {
        matches
      });
      return;
    } // Create a controller/Request for this navigation


    pendingNavigationController = new AbortController();
    let request = createRequest(location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionData;
    let pendingError;

    if (opts && opts.pendingError) {
      // If we have a pendingError, it means the user attempted a GET submission
      // with binary FormData so assign here and skip to handleLoaders.  That
      // way we handle calling loaders above the boundary etc.  It's not really
      // different from an actionError in that sense.
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    } else if (opts && opts.submission) {
      // Call action if we received an action submission
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });

      if (actionOutput.shortCircuited) {
        return;
      }

      pendingActionData = actionOutput.pendingActionData;
      pendingError = actionOutput.pendingActionError;

      let navigation = _extends({
        state: "loading",
        location
      }, opts.submission);

      loadingNavigation = navigation;
    } // Call loaders


    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.replace, pendingActionData, pendingError);

    if (shortCircuited) {
      return;
    } // Clean up now that the action/loaders have completed.  Don't clean up if
    // we short circuited because pendingNavigationController will have already
    // been assigned to a new controller for the next navigation


    pendingNavigationController = null;
    completeNavigation(location, {
      matches,
      loaderData,
      errors
    });
  } // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors


  async function handleAction(request, location, submission, matches, opts) {
    interruptActiveLoads(); // Put us in a submitting state

    let navigation = _extends({
      state: "submitting",
      location
    }, submission);

    updateState({
      navigation
    }); // Call our action and get the result

    let result;
    let actionMatch = getTargetMatch(matches, location);

    if (!actionMatch.route.action) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, router.basename);

      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }

    if (isRedirectResult(result)) {
      await startRedirectNavigation(state, result, opts && opts.replace === true);
      return {
        shortCircuited: true
      };
    }

    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id); // By default, all submissions are REPLACE navigations, but if the
      // action threw an error that'll be rendered in an errorElement, we fall
      // back to PUSH so that the user can use the back button to get back to
      // the pre-submission form location to try again

      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }

      return {
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }

    if (isDeferredResult(result)) {
      throw new Error("defer() is not supported in actions");
    }

    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  } // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.


  async function handleLoaders(request, location, matches, overrideNavigation, submission, replace, pendingActionData, pendingError) {
    // Figure out the right navigation we want to use for data loading
    let loadingNavigation = overrideNavigation;

    if (!loadingNavigation) {
      let navigation = {
        state: "loading",
        location,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      };
      loadingNavigation = navigation;
    }

    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, pendingActionData, pendingError, fetchLoadMatches); // Cancel pending deferreds for no-longer-matched routes or routes we're
    // about to reload.  Note that if this is an action reload we would have
    // already cancelled all pending deferreds so this would be a no-op

    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId)); // Short circuit if we have no loaders to run

    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      completeNavigation(location, {
        matches,
        loaderData: mergeLoaderData(state.loaderData, {}, matches),
        // Commit pending error if we're short circuiting
        errors: pendingError || null,
        actionData: pendingActionData || null
      });
      return {
        shortCircuited: true
      };
    } // If this is an uninterrupted revalidation, we remain in our current idle
    // state.  If not, we need to switch to our loading state and load data,
    // preserving any new action data or existing action data (in the case of
    // a revalidation interrupting an actionReload)


    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach(_ref2 => {
        let [key] = _ref2;
        let fetcher = state.fetchers.get(key);
        let revalidatingFetcher = {
          state: "loading",
          data: fetcher && fetcher.data,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined
        };
        state.fetchers.set(key, revalidatingFetcher);
      });
      updateState(_extends({
        navigation: loadingNavigation,
        actionData: pendingActionData || state.actionData || null
      }, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }

    pendingNavigationLoadId = ++incrementingLoadId;
    revalidatingFetchers.forEach(_ref3 => {
      let [key] = _ref3;
      return fetchControllers.set(key, pendingNavigationController);
    });
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);

    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    } // Clean up _after_ loaders have completed.  Don't clean up if we short
    // circuited because fetchControllers would have been aborted and
    // reassigned to new controllers for the next navigation


    revalidatingFetchers.forEach(_ref4 => {
      let [key] = _ref4;
      return fetchControllers.delete(key);
    }); // If any loaders returned a redirect Response, start a new REPLACE navigation

    let redirect = findRedirect(results);

    if (redirect) {
      await startRedirectNavigation(state, redirect, replace);
      return {
        shortCircuited: true
      };
    } // Process and commit output from loaders


    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds); // Wire up subscribers to update loaderData as promises settle

    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        // Note: No need to updateState here since the TrackedPromise on
        // loaderData is stable across resolve/reject
        // Remove this instance if we were aborted or if promises have settled
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    return _extends({
      loaderData,
      errors
    }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }

  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  } // Trigger a fetcher load/submit for the given fetcher key


  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }

    if (fetchControllers.has(key)) abortFetcher(key);
    let matches = matchRoutes(dataRoutes, href, init.basename);

    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: href
      }));
      return;
    }

    let {
      path,
      submission
    } = normalizeNavigateOptions(href, opts, true);
    let match = getTargetMatch(matches, path);

    if (submission) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    } // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations


    fetchLoadMatches.set(key, [path, match, matches]);
    handleFetcherLoader(key, routeId, path, match, matches);
  } // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation


  async function handleFetcherAction(key, routeId, path, match, requestMatches, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);

    if (!match.route.action) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId: routeId
      });
      setFetcherError(key, routeId, error);
      return;
    } // Put this fetcher into it's submitting state


    let existingFetcher = state.fetchers.get(key);

    let fetcher = _extends({
      state: "submitting"
    }, submission, {
      data: existingFetcher && existingFetcher.data
    });

    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }); // Call the action for the fetcher

    let abortController = new AbortController();
    let fetchRequest = createRequest(path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, router.basename);

    if (fetchRequest.signal.aborted) {
      // We can delete this so long as we weren't aborted by ou our own fetcher
      // re-submit which would have put _new_ controller is in fetchControllers
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }

      return;
    }

    if (isRedirectResult(actionResult)) {
      fetchControllers.delete(key);
      fetchRedirectIds.add(key);

      let loadingFetcher = _extends({
        state: "loading"
      }, submission, {
        data: undefined
      });

      state.fetchers.set(key, loadingFetcher);
      updateState({
        fetchers: new Map(state.fetchers)
      });
      return startRedirectNavigation(state, actionResult);
    } // Process any non-redirect errors thrown


    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }

    if (isDeferredResult(actionResult)) {
      invariant(false, "defer() is not supported in actions");
    } // Start the data load for current matches, or the next location if we're
    // in the middle of a navigation


    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createRequest(nextLocation, abortController.signal);
    let matches = state.navigation.state !== "idle" ? matchRoutes(dataRoutes, state.navigation.location, init.basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);

    let loadFetcher = _extends({
      state: "loading",
      data: actionResult.data
    }, submission);

    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(state, matches, submission, nextLocation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, {
      [match.route.id]: actionResult.data
    }, undefined, // No need to send through errors since we short circuit above
    fetchLoadMatches); // Put all revalidating fetchers into the loading state, except for the
    // current fetcher which we want to keep in it's current loading state which
    // contains it's action submission info + action data

    revalidatingFetchers.filter(_ref5 => {
      let [staleKey] = _ref5;
      return staleKey !== key;
    }).forEach(_ref6 => {
      let [staleKey] = _ref6;
      let existingFetcher = state.fetchers.get(staleKey);
      let revalidatingFetcher = {
        state: "loading",
        data: existingFetcher && existingFetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      };
      state.fetchers.set(staleKey, revalidatingFetcher);
      fetchControllers.set(staleKey, abortController);
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);

    if (abortController.signal.aborted) {
      return;
    }

    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(_ref7 => {
      let [staleKey] = _ref7;
      return fetchControllers.delete(staleKey);
    });
    let redirect = findRedirect(results);

    if (redirect) {
      return startRedirectNavigation(state, redirect);
    } // Process and commit output from loaders


    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds);
    let doneFetcher = {
      state: "idle",
      data: actionResult.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined
    };
    state.fetchers.set(key, doneFetcher);
    let didAbortFetchLoads = abortStaleFetchLoads(loadId); // If we are currently in a navigation loading state and this fetcher is
    // more recent than the navigation, we want the newer data so abort the
    // navigation and complete it with the fetcher data

    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      // otherwise just update with the fetcher data, preserving any existing
      // loaderData for loaders that did not need to reload.  We have to
      // manually merge here since we aren't going through completeNavigation
      updateState(_extends({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches)
      }, didAbortFetchLoads ? {
        fetchers: new Map(state.fetchers)
      } : {}));
      isRevalidationRequired = false;
    }
  } // Call the matched loader for fetcher.load(), handling redirects, errors, etc.


  async function handleFetcherLoader(key, routeId, path, match, matches) {
    let existingFetcher = state.fetchers.get(key); // Put this fetcher into it's loading state

    let loadingFetcher = {
      state: "loading",
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      data: existingFetcher && existingFetcher.data
    };
    state.fetchers.set(key, loadingFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }); // Call the loader for this fetcher route match

    let abortController = new AbortController();
    let fetchRequest = createRequest(path, abortController.signal);
    fetchControllers.set(key, abortController);
    let result = await callLoaderOrAction("loader", fetchRequest, match, matches, router.basename); // Deferred isn't supported or fetcher loads, await everything and treat it
    // as a normal load.  resolveDeferredData will return undefined if this
    // fetcher gets aborted, so we just leave result untouched and short circuit
    // below if that happens

    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    } // We can delete this so long as we weren't aborted by ou our own fetcher
    // re-load which would have put _new_ controller is in fetchControllers


    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }

    if (fetchRequest.signal.aborted) {
      return;
    } // If the loader threw a redirect Response, start a new REPLACE navigation


    if (isRedirectResult(result)) {
      await startRedirectNavigation(state, result);
      return;
    } // Process any non-redirect errors thrown


    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key); // TODO: In remix, this would reset to IDLE_NAVIGATION if it was a catch -
      // do we need to behave any differently with our non-redirect errors?
      // What if it was a non-redirect Response?

      updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }

    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data"); // Put the fetcher back into an idle state

    let doneFetcher = {
      state: "idle",
      data: result.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined
    };
    state.fetchers.set(key, doneFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */


  async function startRedirectNavigation(state, redirect, replace) {
    if (redirect.revalidate) {
      isRevalidationRequired = true;
    }

    let redirectLocation = createLocation(state.location, redirect.location);
    invariant(redirectLocation, "Expected a location on the redirect navigation");

    if (redirect.external && typeof window !== "undefined" && typeof window.location !== "undefined") {
      if (replace) {
        window.location.replace(redirect.location);
      } else {
        window.location.assign(redirect.location);
      }

      return;
    } // There's no need to abort on redirects, since we don't detect the
    // redirect until the action/loaders have settled


    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
    let {
      formMethod,
      formAction,
      formEncType,
      formData
    } = state.navigation; // If this was a 307/308 submission we want to preserve the HTTP method and
    // re-submit the POST/PUT/PATCH/DELETE as a submission navigation to the
    // redirected location

    if (redirectPreserveMethodStatusCodes.has(redirect.status) && formMethod && isSubmissionMethod(formMethod) && formEncType && formData) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: {
          formMethod,
          formAction: redirect.location,
          formEncType,
          formData
        }
      });
    } else {
      // Otherwise, we kick off a new loading navigation, preserving the
      // submission info for the duration of this navigation
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: {
          state: "loading",
          location: redirectLocation,
          formMethod: formMethod || undefined,
          formAction: formAction || undefined,
          formEncType: formEncType || undefined,
          formData: formData || undefined
        }
      });
    }
  }

  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    // Call all navigation loaders and revalidating fetcher loaders in parallel,
    // then slice off the results into separate arrays so we can handle them
    // accordingly
    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, router.basename)), ...fetchersToLoad.map(_ref8 => {
      let [, href, match, fetchMatches] = _ref8;
      return callLoaderOrAction("loader", createRequest(href, request.signal), match, fetchMatches, router.basename);
    })]);
    let loaderResults = results.slice(0, matchesToLoad.length);
    let fetcherResults = results.slice(matchesToLoad.length);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, request.signal, false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(_ref9 => {
      let [,, match] = _ref9;
      return match;
    }), fetcherResults, request.signal, true)]);
    return {
      results,
      loaderResults,
      fetcherResults
    };
  }

  function interruptActiveLoads() {
    // Every interruption triggers a revalidation
    isRevalidationRequired = true; // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation

    cancelledDeferredRoutes.push(...cancelActiveDeferreds()); // Abort in-flight fetcher loads

    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }

  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }

  function deleteFetcher(key) {
    if (fetchControllers.has(key)) abortFetcher(key);
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    state.fetchers.delete(key);
  }

  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }

  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = {
        state: "idle",
        data: fetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      };
      state.fetchers.set(key, doneFetcher);
    }
  }

  function markFetchRedirectsDone() {
    let doneKeys = [];

    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);

      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
      }
    }

    markFetchersDone(doneKeys);
  }

  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];

    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);

        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }

    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }

  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  } // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component


  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;

    getScrollRestorationKey = getKey || (location => location.key); // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available


    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);

      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }

    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }

  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions[key] = getScrollPosition();
    }
  }

  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      let y = savedScrollPositions[key];

      if (typeof y === "number") {
        return y;
      }
    }

    return null;
  }

  router = {
    get basename() {
      return init.basename;
    },

    get state() {
      return state;
    },

    get routes() {
      return dataRoutes;
    },

    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds
  };
  return router;
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////

function unstable_createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to unstable_createStaticHandler");
  let dataRoutes = convertRoutesToDataRoutes(routes);
  let basename = (opts ? opts.basename : null) || "/";
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   */

  async function query(request) {
    let url = new URL(request.url);
    let method = request.method.toLowerCase();
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't

    if (!isValidMethod(method) && method !== "head") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }

    let result = await queryImpl(request, location, matches);

    if (result instanceof Response) {
      return result;
    } // When returning StaticHandlerContext, we patch back in the location here
    // since we need it for React Context.  But this helps keep our submit and
    // loadRouteData operating on a Request instead of a Location


    return _extends({
      location,
      basename
    }, result);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   */


  async function queryRoute(request, routeId) {
    let url = new URL(request.url);
    let method = request.method.toLowerCase();
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't

    if (!isValidMethod(method) && method !== "head") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }

    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);

    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      // This should never hit I don't think?
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }

    let result = await queryImpl(request, location, matches, match);

    if (result instanceof Response) {
      return result;
    }

    let error = result.errors ? Object.values(result.errors)[0] : undefined;

    if (error !== undefined) {
      // If we got back result.errors, that means the loader/action threw
      // _something_ that wasn't a Response, but it's not guaranteed/required
      // to be an `instanceof Error` either, so we have to use throw here to
      // preserve the "error" state outside of queryImpl.
      throw error;
    } // Pick off the right state value to return


    let routeData = [result.actionData, result.loaderData].find(v => v);
    return Object.values(routeData || {})[0];
  }

  async function queryImpl(request, location, matches, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");

    try {
      if (isSubmissionMethod(request.method.toLowerCase())) {
        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), routeMatch != null);
        return result;
      }

      let result = await loadRouteData(request, matches, routeMatch);
      return result instanceof Response ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      // If the user threw/returned a Response in callLoaderOrAction, we throw
      // it to bail out and then return or throw here based on whether the user
      // returned or threw
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response)) {
          throw e.response;
        }

        return e.response;
      } // Redirects are always returned since they don't propagate to catch
      // boundaries


      if (isRedirectResponse(e)) {
        return e;
      }

      throw e;
    }
  }

  async function submit(request, matches, actionMatch, isRouteRequest) {
    let result;

    if (!actionMatch.route.action) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: createURL(request.url).pathname,
        routeId: actionMatch.route.id
      });

      if (isRouteRequest) {
        throw error;
      }

      result = {
        type: ResultType.error,
        error
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, basename, true, isRouteRequest);

      if (request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query";
        throw new Error(method + "() call aborted");
      }
    }

    if (isRedirectResult(result)) {
      // Uhhhh - this should never happen, we should always throw these from
      // callLoaderOrAction, but the type narrowing here keeps TS happy and we
      // can get back on the "throw all redirect responses" train here should
      // this ever happen :/
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    }

    if (isDeferredResult(result)) {
      throw new Error("defer() is not supported in actions");
    }

    if (isRouteRequest) {
      // Note: This should only be non-Response values if we get here, since
      // isRouteRequest should throw any Response received in callLoaderOrAction
      if (isErrorResult(result)) {
        throw result.error;
      }

      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }

    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      let context = await loadRouteData(request, matches, undefined, {
        [boundaryMatch.route.id]: result.error
      }); // action status codes take precedence over loader status codes

      return _extends({}, context, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }

    let context = await loadRouteData(request, matches);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }

  async function loadRouteData(request, matches, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null; // Short circuit if we have no loaders to run (queryRoute())

    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: createURL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }

    let requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
    let matchesToLoad = requestMatches.filter(m => m.route.loader); // Short circuit if we have no loaders to run (query())

    if (matchesToLoad.length === 0) {
      return {
        matches,
        loaderData: {},
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }

    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, basename, true, isRouteRequest))]);

    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    } // Can't do anything with these without the Remix side of things, so just
    // cancel them for now


    results.forEach(result => {
      if (isDeferredResult(result)) {
        result.deferredData.cancel();
      }
    }); // Process and commit output from loaders

    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError);
    return _extends({}, context, {
      matches
    });
  }

  return {
    dataRoutes,
    query,
    queryRoute
  };
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */

function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });

  return newContext;
}

function isSubmissionNavigation(opts) {
  return opts != null && "formData" in opts;
} // Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params


function normalizeNavigateOptions(to, opts, isFetcher) {
  if (isFetcher === void 0) {
    isFetcher = false;
  }

  let path = typeof to === "string" ? to : createPath(to); // Return location verbatim on non-submission navigations

  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }

  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  } // Create a Submission on non-GET navigations


  if (opts.formMethod && isSubmissionMethod(opts.formMethod)) {
    return {
      path,
      submission: {
        formMethod: opts.formMethod,
        formAction: stripHashFromPath(path),
        formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
        formData: opts.formData
      }
    };
  } // Flatten submission onto URLSearchParams for GET submissions


  let parsedPath = parsePath(path);

  try {
    let searchParams = convertFormDataToSearchParams(opts.formData); // Since fetcher GET submissions only run a single loader (as opposed to
    // navigation GET submissions which run all loaders), we need to preserve
    // any incoming ?index params

    if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
      searchParams.append("index", "");
    }

    parsedPath.search = "?" + searchParams;
  } catch (e) {
    return {
      path,
      error: getInternalRouterError(400)
    };
  }

  return {
    path: createPath(parsedPath)
  };
} // Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them


function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;

  if (boundaryId) {
    let index = matches.findIndex(m => m.route.id === boundaryId);

    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }

  return boundaryMatches;
}

function getMatchesToLoad(state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, pendingActionData, pendingError, fetchLoadMatches) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : null; // Pick navigation matches that are net-new or qualify for revalidation

  let boundaryId = pendingError ? Object.keys(pendingError)[0] : undefined;
  let boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
  let navigationMatches = boundaryMatches.filter((match, index) => match.route.loader != null && (isNewLoader(state.loaderData, state.matches[index], match) || // If this route had a pending deferred cancelled it must be revalidated
  cancelledDeferredRoutes.some(id => id === match.route.id) || shouldRevalidateLoader(state.location, state.matches[index], submission, location, match, isRevalidationRequired, actionResult))); // Pick fetcher.loads that need to be revalidated

  let revalidatingFetchers = [];
  fetchLoadMatches && fetchLoadMatches.forEach((_ref10, key) => {
    let [href, match, fetchMatches] = _ref10;

    // This fetcher was cancelled from a prior action submission - force reload
    if (cancelledFetcherLoads.includes(key)) {
      revalidatingFetchers.push([key, href, match, fetchMatches]);
    } else if (isRevalidationRequired) {
      let shouldRevalidate = shouldRevalidateLoader(href, match, submission, href, match, isRevalidationRequired, actionResult);

      if (shouldRevalidate) {
        revalidatingFetchers.push([key, href, match, fetchMatches]);
      }
    }
  });
  return [navigationMatches, revalidatingFetchers];
}

function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = // [a] -> [a, b]
  !currentMatch || // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id; // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred

  let isMissingData = currentLoaderData[match.route.id] === undefined; // Always load if this is a net-new route or we don't yet have data

  return isNew || isMissingData;
}

function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (// param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}

function shouldRevalidateLoader(currentLocation, currentMatch, submission, location, match, isRevalidationRequired, actionResult) {
  let currentUrl = createURL(currentLocation);
  let currentParams = currentMatch.params;
  let nextUrl = createURL(location);
  let nextParams = match.params; // This is the default implementation as to when we revalidate.  If the route
  // provides it's own implementation, then we give them full control but
  // provide this value so they can leverage it if needed after they check
  // their own specific use cases
  // Note that fetchers always provide the same current/next locations so the
  // URL-based checks here don't apply to fetcher shouldRevalidate calls

  let defaultShouldRevalidate = isNewRouteInstance(currentMatch, match) || // Clicked the same link, resubmitted a GET form
  currentUrl.toString() === nextUrl.toString() || // Search params affect all loaders
  currentUrl.search !== nextUrl.search || // Forced revalidation due to submission, useRevalidate, or X-Remix-Revalidate
  isRevalidationRequired;

  if (match.route.shouldRevalidate) {
    let routeChoice = match.route.shouldRevalidate(_extends({
      currentUrl,
      currentParams,
      nextUrl,
      nextParams
    }, submission, {
      actionResult,
      defaultShouldRevalidate
    }));

    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }

  return defaultShouldRevalidate;
}

async function callLoaderOrAction(type, request, match, matches, basename, isStaticRequest, isRouteRequest) {
  if (basename === void 0) {
    basename = "/";
  }

  if (isStaticRequest === void 0) {
    isStaticRequest = false;
  }

  if (isRouteRequest === void 0) {
    isRouteRequest = false;
  }

  let resultType;
  let result; // Setup a promise we can race against so that abort signals short circuit

  let reject;
  let abortPromise = new Promise((_, r) => reject = r);

  let onReject = () => reject();

  request.signal.addEventListener("abort", onReject);

  try {
    let handler = match.route[type];
    invariant(handler, "Could not find the " + type + " to run on the \"" + match.route.id + "\" route");
    result = await Promise.race([handler({
      request,
      params: match.params
    }), abortPromise]);
    invariant(result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error;
    result = e;
  } finally {
    request.signal.removeEventListener("abort", onReject);
  }

  if (result instanceof Response) {
    let status = result.status; // Process redirects

    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"); // Check if this an external redirect that goes to a new origin

      let external = createURL(location).origin !== createURL("/").origin; // Support relative routing in internal redirects

      if (!external) {
        let activeMatches = matches.slice(0, matches.indexOf(match) + 1);
        let routePathnames = getPathContributingMatches(activeMatches).map(match => match.pathnameBase);
        let requestPath = createURL(request.url).pathname;
        let resolvedLocation = resolveTo(location, routePathnames, requestPath);
        invariant(createPath(resolvedLocation), "Unable to resolve redirect location: " + location); // Prepend the basename to the redirect location if we have one

        if (basename) {
          let path = resolvedLocation.pathname;
          resolvedLocation.pathname = path === "/" ? basename : joinPaths([basename, path]);
        }

        location = createPath(resolvedLocation);
      } // Don't process redirects in the router during static requests requests.
      // Instead, throw the Response and let the server handle it with an HTTP
      // redirect.  We also update the Location header in place in this flow so
      // basename and relative routing is taken into account


      if (isStaticRequest) {
        result.headers.set("Location", location);
        throw result;
      }

      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null,
        external
      };
    } // For SSR single-route requests, we want to hand Responses back directly
    // without unwrapping.  We do this with the QueryRouteResponse wrapper
    // interface so we can know whether it was returned or thrown


    if (isRouteRequest) {
      // eslint-disable-next-line no-throw-literal
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    }

    let data;
    let contentType = result.headers.get("Content-Type");

    if (contentType && contentType.startsWith("application/json")) {
      data = await result.json();
    } else {
      data = await result.text();
    }

    if (resultType === ResultType.error) {
      return {
        type: resultType,
        error: new ErrorResponse(status, result.statusText, data),
        headers: result.headers
      };
    }

    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }

  if (resultType === ResultType.error) {
    return {
      type: resultType,
      error: result
    };
  }

  if (result instanceof DeferredData) {
    return {
      type: ResultType.deferred,
      deferredData: result
    };
  }

  return {
    type: ResultType.data,
    data: result
  };
}

function createRequest(location, signal, submission) {
  let url = createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };

  if (submission) {
    let {
      formMethod,
      formEncType,
      formData
    } = submission;
    init.method = formMethod.toUpperCase();
    init.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  } // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)


  return new Request(url, init);
}

function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();

  for (let [key, value] of formData.entries()) {
    invariant(typeof value === "string", 'File inputs are not supported with encType "application/x-www-form-urlencoded", ' + 'please use "multipart/form-data" instead.');
    searchParams.append(key, value);
  }

  return searchParams;
}

function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  // Fill in loaderData/errors from our loaders
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {}; // Process loader results into state.loaderData/state.errors

  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");

    if (isErrorResult(result)) {
      // Look upwards from the matched route for the closest ancestor
      // error boundary, defaulting to the root match
      let boundaryMatch = findNearestBoundary(matches, id);
      let error = result.error; // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed

      if (pendingError) {
        error = Object.values(pendingError)[0];
        pendingError = undefined;
      }

      errors = Object.assign(errors || {}, {
        [boundaryMatch.route.id]: error
      }); // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding

      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }

      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else if (isDeferredResult(result)) {
      activeDeferreds && activeDeferreds.set(id, result.deferredData);
      loaderData[id] = result.deferredData.data; // TODO: Add statusCode/headers once we wire up streaming in Remix
    } else {
      loaderData[id] = result.data; // Error status codes always override success status codes, but if all
      // loaders are successful we take the deepest status code.

      if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }

      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  }); // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here

  if (pendingError) {
    errors = pendingError;
  }

  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}

function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds); // Process results from our revalidating fetchers

  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let [key,, match] = revalidatingFetchers[index];
    invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    let result = fetcherResults[index]; // Process fetcher non-redirect errors

    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match.route.id);

      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }

      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      throw new Error("Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      throw new Error("Unhandled fetcher deferred data");
    } else {
      let doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      };
      state.fetchers.set(key, doneFetcher);
    }
  }

  return {
    loaderData,
    errors
  };
}

function mergeLoaderData(loaderData, newLoaderData, matches) {
  let mergedLoaderData = _extends({}, newLoaderData);

  matches.forEach(match => {
    let id = match.route.id;

    if (newLoaderData[id] === undefined && loaderData[id] !== undefined) {
      mergedLoaderData[id] = loaderData[id];
    }
  });
  return mergedLoaderData;
} // Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match


function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}

function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  let route = routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}

function getInternalRouterError(status, _temp) {
  let {
    pathname,
    routeId,
    method,
    message
  } = _temp === void 0 ? {} : _temp;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";

  if (status === 400) {
    statusText = "Bad Request";

    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else {
      errorMessage = "Cannot submit binary form data using GET";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";

    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }

  return new ErrorResponse(status || 500, statusText, new Error(errorMessage), true);
} // Find any returned redirect errors, starting from the lowest match


function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];

    if (isRedirectResult(result)) {
      return result;
    }
  }
}

function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}

function isHashChangeOnly(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash !== b.hash;
}

function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}

function isErrorResult(result) {
  return result.type === ResultType.error;
}

function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}

function isRedirectResponse(result) {
  if (!(result instanceof Response)) {
    return false;
  }

  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}

function isQueryRouteResponse(obj) {
  return obj && obj.response instanceof Response && (obj.type === ResultType.data || ResultType.error);
}

function isValidMethod(method) {
  return validRequestMethods.has(method);
}

function isSubmissionMethod(method) {
  return validActionMethods.has(method);
}

async function resolveDeferredResults(currentMatches, matchesToLoad, results, signal, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    let match = matchesToLoad[index];
    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;

    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      await resolveDeferredData(result, signal, isFetcher).then(result => {
        if (result) {
          results[index] = result || results[index];
        }
      });
    }
  }
}

async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }

  let aborted = await result.deferredData.resolveData(signal);

  if (aborted) {
    return;
  }

  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      // Handle any TrackedPromise._error values encountered while unwrapping
      return {
        type: ResultType.error,
        error: e
      };
    }
  }

  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}

function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
} // Note: This should match the format exported by useMatches, so if you change
// this please also change that :)  Eventually we'll DRY this up


function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}

function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;

  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  } // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)


  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
} //#endregion


//# sourceMappingURL=router.js.map


/***/ }),

/***/ 37:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);


var Navbar = function Navbar() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/"
  }, "Navigation"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/CarsMenager"
  }, " Cars "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/AddCar"
  }, " Cars ")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _CarsManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _AddCar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);






var App = function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/",
    element: _CarsManager__WEBPACK_IMPORTED_MODULE_2__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, {
    path: "/add-car",
    element: _AddCar__WEBPACK_IMPORTED_MODULE_3__["default"]
  }))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null), document.getElementById("app"));

/***/ }),

/***/ 38:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   "Await": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Await),
/* harmony export */   "BrowserRouter": () => (/* binding */ BrowserRouter),
/* harmony export */   "Form": () => (/* binding */ Form),
/* harmony export */   "HashRouter": () => (/* binding */ HashRouter),
/* harmony export */   "Link": () => (/* binding */ Link),
/* harmony export */   "MemoryRouter": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.MemoryRouter),
/* harmony export */   "NavLink": () => (/* binding */ NavLink),
/* harmony export */   "Navigate": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Navigate),
/* harmony export */   "NavigationType": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   "Outlet": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Outlet),
/* harmony export */   "Route": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Route),
/* harmony export */   "Router": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Router),
/* harmony export */   "RouterProvider": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.RouterProvider),
/* harmony export */   "Routes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Routes),
/* harmony export */   "ScrollRestoration": () => (/* binding */ ScrollRestoration),
/* harmony export */   "UNSAFE_DataRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterContext),
/* harmony export */   "UNSAFE_DataRouterStateContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext),
/* harmony export */   "UNSAFE_DataStaticRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataStaticRouterContext),
/* harmony export */   "UNSAFE_LocationContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_LocationContext),
/* harmony export */   "UNSAFE_NavigationContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext),
/* harmony export */   "UNSAFE_RouteContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext),
/* harmony export */   "UNSAFE_enhanceManualRouteObjects": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_enhanceManualRouteObjects),
/* harmony export */   "createBrowserRouter": () => (/* binding */ createBrowserRouter),
/* harmony export */   "createHashRouter": () => (/* binding */ createHashRouter),
/* harmony export */   "createMemoryRouter": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createMemoryRouter),
/* harmony export */   "createPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   "createRoutesFromChildren": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createRoutesFromChildren),
/* harmony export */   "createRoutesFromElements": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createRoutesFromElements),
/* harmony export */   "createSearchParams": () => (/* binding */ createSearchParams),
/* harmony export */   "defer": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   "generatePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   "isRouteErrorResponse": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   "json": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   "matchPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   "matchRoutes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   "parsePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   "redirect": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   "renderMatches": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.renderMatches),
/* harmony export */   "resolvePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   "unstable_HistoryRouter": () => (/* binding */ HistoryRouter),
/* harmony export */   "useActionData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useActionData),
/* harmony export */   "useAsyncError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useAsyncError),
/* harmony export */   "useAsyncValue": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useAsyncValue),
/* harmony export */   "useFetcher": () => (/* binding */ useFetcher),
/* harmony export */   "useFetchers": () => (/* binding */ useFetchers),
/* harmony export */   "useFormAction": () => (/* binding */ useFormAction),
/* harmony export */   "useHref": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useHref),
/* harmony export */   "useInRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useInRouterContext),
/* harmony export */   "useLinkClickHandler": () => (/* binding */ useLinkClickHandler),
/* harmony export */   "useLoaderData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useLoaderData),
/* harmony export */   "useLocation": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation),
/* harmony export */   "useMatch": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useMatch),
/* harmony export */   "useMatches": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useMatches),
/* harmony export */   "useNavigate": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate),
/* harmony export */   "useNavigation": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigation),
/* harmony export */   "useNavigationType": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigationType),
/* harmony export */   "useOutlet": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useOutlet),
/* harmony export */   "useOutletContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useOutletContext),
/* harmony export */   "useParams": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useParams),
/* harmony export */   "useResolvedPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath),
/* harmony export */   "useRevalidator": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRevalidator),
/* harmony export */   "useRouteError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRouteError),
/* harmony export */   "useRouteLoaderData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRouteLoaderData),
/* harmony export */   "useRoutes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRoutes),
/* harmony export */   "useSearchParams": () => (/* binding */ useSearchParams),
/* harmony export */   "useSubmit": () => (/* binding */ useSubmit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* provided dependency */ var process = __webpack_require__(9);
/**
 * React Router DOM v6.4.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */





function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function shouldProcessLinkClick(event, target) {
  return event.button === 0 && ( // Ignore everything but left clicks
  !target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */

function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }

  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);

  for (let key of defaultSearchParams.keys()) {
    if (!searchParams.has(key)) {
      defaultSearchParams.getAll(key).forEach(value => {
        searchParams.append(key, value);
      });
    }
  }

  return searchParams;
}
function getFormSubmissionInfo(target, defaultAction, options) {
  let method;
  let action;
  let encType;
  let formData;

  if (isFormElement(target)) {
    let submissionTrigger = options.submissionTrigger;
    method = options.method || target.getAttribute("method") || defaultMethod;
    action = options.action || target.getAttribute("action") || defaultAction;
    encType = options.encType || target.getAttribute("enctype") || defaultEncType;
    formData = new FormData(target);

    if (submissionTrigger && submissionTrigger.name) {
      formData.append(submissionTrigger.name, submissionTrigger.value);
    }
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;

    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    } // <button>/<input type="submit"> may override attributes of <form>


    method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    action = options.action || target.getAttribute("formaction") || form.getAttribute("action") || defaultAction;
    encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType;
    formData = new FormData(form); // Include name + value from a <button>, appending in case the button name
    // matches an existing input name

    if (target.name) {
      formData.append(target.name, target.value);
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = options.method || defaultMethod;
    action = options.action || defaultAction;
    encType = options.encType || defaultEncType;

    if (target instanceof FormData) {
      formData = target;
    } else {
      formData = new FormData();

      if (target instanceof URLSearchParams) {
        for (let [name, value] of target) {
          formData.append(name, value);
        }
      } else if (target != null) {
        for (let name of Object.keys(target)) {
          formData.append(name, target[name]);
        }
      }
    }
  }

  let {
    protocol,
    host
  } = window.location;
  let url = new URL(action, protocol + "//" + host);
  return {
    url,
    method,
    encType,
    formData
  };
}

const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
      _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"],
      _excluded3 = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
//#region Routers
////////////////////////////////////////////////////////////////////////////////

function createBrowserRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_enhanceManualRouteObjects)(routes)
  }).initialize();
}
function createHashRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createHashHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_enhanceManualRouteObjects)(routes)
  }).initialize();
}

function parseHydrationData() {
  var _window;

  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;

  if (state && state.errors) {
    state = _extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }

  return state;
}

function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};

  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // serializeErrors in react-router-dom/server.tsx :)
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new react_router__WEBPACK_IMPORTED_MODULE_1__.ErrorResponse(val.status, val.statusText, val.data, val.internal === true);
    } else {
      serialized[key] = val;
    }
  }

  return serialized;
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */


function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window
  } = _ref;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();

  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)({
      window,
      v5Compat: true
    });
  }

  let history = historyRef.current;
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */

function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();

  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createHashHistory)({
      window,
      v5Compat: true
    });
  }

  let history = historyRef.current;
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */

function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3;
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

if (process.env.NODE_ENV !== "production") {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
/**
 * The public API for rendering a history-aware <a>.
 */

const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset
  } = _ref4,
      rest = _objectWithoutPropertiesLoose(_ref4, _excluded);

  let href = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useHref)(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });

  function handleClick(event) {
    if (onClick) onClick(event);

    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }

  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", _extends({}, rest, {
      href: href,
      onClick: reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
});

if (process.env.NODE_ENV !== "production") {
  Link.displayName = "Link";
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function NavLinkWithRef(_ref5, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    children
  } = _ref5,
      rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);

  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(to, {
    relative: rest.relative
  });
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext);
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;

  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }

  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;

  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive,
      isPending
    });
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
  }

  let style = typeof styleProp === "function" ? styleProp({
    isActive,
    isPending
  }) : styleProp;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to
  }), typeof children === "function" ? children({
    isActive,
    isPending
  }) : children);
});

if (process.env.NODE_ENV !== "production") {
  NavLink.displayName = "NavLink";
}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */


const Form = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormImpl, _extends({}, props, {
    ref: ref
  }));
});

if (process.env.NODE_ENV !== "production") {
  Form.displayName = "Form";
}

const FormImpl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref6, forwardedRef) => {
  let {
    reloadDocument,
    replace,
    method = defaultMethod,
    action,
    onSubmit,
    fetcherKey,
    routeId,
    relative
  } = _ref6,
      props = _objectWithoutPropertiesLoose(_ref6, _excluded3);

  let submit = useSubmitImpl(fetcherKey, routeId);
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let formAction = useFormAction(action, {
    relative
  });

  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    submit(submitter || event.currentTarget, {
      method,
      replace,
      relative
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});

if (process.env.NODE_ENV !== "production") {
  FormImpl.displayName = "FormImpl";
}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */


function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}

if (process.env.NODE_ENV !== "production") {
  ScrollRestoration.displayName = "ScrollRestoration";
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////


var DataRouterHook;

(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));

var DataRouterStateHook;

(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));

function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.";
}

function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, getDataRouterConsoleError(hookName)) : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
  return ctx;
}

function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext);
  !state ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, getDataRouterConsoleError(hookName)) : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
  return state;
}
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */


function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(to, {
    relative
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set

      let replace = replaceProp !== undefined ? replaceProp : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(location) === (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */

function useSearchParams(defaultInit) {
  process.env.NODE_ENV !== "production" ? warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") : void 0;
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => getSearchParamsForLocation(location.search, defaultSearchParamsRef.current), [location.search]);
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */

function useSubmit() {
  return useSubmitImpl();
}

function useSubmitImpl(fetcherKey, routeId) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmitImpl);
  let defaultAction = useFormAction();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }

    if (typeof document === "undefined") {
      throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
    }

    let {
      method,
      encType,
      formData,
      url
    } = getFormSubmissionInfo(target, defaultAction, options);
    let href = url.pathname + url.search;
    let opts = {
      replace: options.replace,
      formData,
      formMethod: method,
      formEncType: encType
    };

    if (fetcherKey) {
      !(routeId != null) ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "No routeId available for useFetcher()") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
      router.fetch(fetcherKey, routeId, href, opts);
    } else {
      router.navigate(href, opts);
    }
  }, [defaultAction, router, fetcherKey, routeId]);
}

function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext);
  !routeContext ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "useFormAction must be used inside a RouteContext") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let resolvedAction = action != null ? action : "."; // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath

  let path = _extends({}, (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(resolvedAction, {
    relative
  })); // Previously we set the default action to ".". The problem with this is that
  // `useResolvedPath(".")` excludes search params and the hash of the resolved
  // URL. This is the intended behavior of when "." is specifically provided as
  // the form action, but inconsistent w/ browsers when the action is omitted.
  // https://github.com/remix-run/remix/issues/927


  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();

  if (action == null) {
    // Safe to write to these directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    // or hash
    path.search = location.search;
    path.hash = location.hash; // When grabbing search params from the URL, remove the automatically
    // inserted ?index param so we match the useResolvedPath search behavior
    // which would not include ?index

    if (match.route.index) {
      let params = new URLSearchParams(path.search);
      params.delete("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }

  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  } // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions


  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
  }

  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(path);
}

function createFetcherForm(fetcherKey, routeId) {
  let FetcherForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormImpl, _extends({}, props, {
      ref: ref,
      fetcherKey: fetcherKey,
      routeId: routeId
    }));
  });

  if (process.env.NODE_ENV !== "production") {
    FetcherForm.displayName = "fetcher.Form";
  }

  return FetcherForm;
}

let fetcherId = 0;
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */

function useFetcher() {
  var _route$matches;

  let {
    router
  } = useDataRouterContext(DataRouterHook.UseFetcher);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext);
  !route ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "useFetcher must be used inside a RouteContext") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !(routeId != null) ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "useFetcher can only be used on routes that contain a unique \"id\"") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
  let [fetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => String(++fetcherId));
  let [Form] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
    !routeId ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "No routeId available for fetcher.Form()") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
    return createFetcherForm(fetcherKey, routeId);
  });
  let [load] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => href => {
    !router ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "No router available for fetcher.load()") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
    !routeId ? process.env.NODE_ENV !== "production" ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, "No routeId available for fetcher.load()") : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.invariant)(false) : void 0;
    router.fetch(fetcherKey, routeId, href);
  });
  let submit = useSubmitImpl(fetcherKey, routeId);
  let fetcher = router.getFetcher(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => _extends({
    Form,
    submit,
    load
  }, fetcher), [fetcher, Form, submit, load]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // Is this busted when the React team gets real weird and calls effects
    // twice on mount?  We really just need to garbage collect here when this
    // fetcher is no longer around.
    return () => {
      if (!router) {
        console.warn("No fetcher available to clean up from useFetcher()");
        return;
      }

      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */

function useFetchers() {
  let state = useDataRouterState(DataRouterStateHook.UseFetchers);
  return [...state.fetchers.values()];
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */

function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let matches = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useMatches)();
  let navigation = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigation)(); // Trigger manual scroll restoration while we're active

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []); // Save positions on unload

  useBeforeUnload(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }

    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])); // Read in any saved scroll locations

  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    try {
      let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);

      if (sessionPositions) {
        savedScrollPositions = JSON.parse(sessionPositions);
      }
    } catch (e) {// no-op, use default empty object
    }
  }, [storageKey]); // Enable scroll restoration in the router

  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey);
    return () => disableScrollRestoration && disableScrollRestoration();
  }, [router, getKey]); // Restore scrolling when state.restoreScrollPosition changes

  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
    // Explicit false means don't do anything (used for submissions)
    if (restoreScrollPosition === false) {
      return;
    } // been here before, scroll to it


    if (typeof restoreScrollPosition === "number") {
      window.scrollTo(0, restoreScrollPosition);
      return;
    } // try to scroll to the hash


    if (location.hash) {
      let el = document.getElementById(location.hash.slice(1));

      if (el) {
        el.scrollIntoView();
        return;
      }
    } // Opt out of scroll reset if this link requested it


    if (preventScrollReset === true) {
      return;
    } // otherwise go to the top on new locations


    window.scrollTo(0, 0);
  }, [location, restoreScrollPosition, preventScrollReset]);
}

function useBeforeUnload(callback) {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.addEventListener("beforeunload", callback);
    return () => {
      window.removeEventListener("beforeunload", callback);
    };
  }, [callback]);
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Utils
////////////////////////////////////////////////////////////////////////////////


function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
} //#endregion


//# sourceMappingURL=index.js.map


/***/ }),

/***/ 40:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.AbortedDeferredError),
/* harmony export */   "Await": () => (/* binding */ Await),
/* harmony export */   "MemoryRouter": () => (/* binding */ MemoryRouter),
/* harmony export */   "Navigate": () => (/* binding */ Navigate),
/* harmony export */   "NavigationType": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.Action),
/* harmony export */   "Outlet": () => (/* binding */ Outlet),
/* harmony export */   "Route": () => (/* binding */ Route),
/* harmony export */   "Router": () => (/* binding */ Router),
/* harmony export */   "RouterProvider": () => (/* binding */ RouterProvider),
/* harmony export */   "Routes": () => (/* binding */ Routes),
/* harmony export */   "UNSAFE_DataRouterContext": () => (/* binding */ DataRouterContext),
/* harmony export */   "UNSAFE_DataRouterStateContext": () => (/* binding */ DataRouterStateContext),
/* harmony export */   "UNSAFE_DataStaticRouterContext": () => (/* binding */ DataStaticRouterContext),
/* harmony export */   "UNSAFE_LocationContext": () => (/* binding */ LocationContext),
/* harmony export */   "UNSAFE_NavigationContext": () => (/* binding */ NavigationContext),
/* harmony export */   "UNSAFE_RouteContext": () => (/* binding */ RouteContext),
/* harmony export */   "UNSAFE_enhanceManualRouteObjects": () => (/* binding */ enhanceManualRouteObjects),
/* harmony export */   "createMemoryRouter": () => (/* binding */ createMemoryRouter),
/* harmony export */   "createPath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.createPath),
/* harmony export */   "createRoutesFromChildren": () => (/* binding */ createRoutesFromChildren),
/* harmony export */   "createRoutesFromElements": () => (/* binding */ createRoutesFromChildren),
/* harmony export */   "defer": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.defer),
/* harmony export */   "generatePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.generatePath),
/* harmony export */   "isRouteErrorResponse": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.isRouteErrorResponse),
/* harmony export */   "json": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.json),
/* harmony export */   "matchPath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.matchPath),
/* harmony export */   "matchRoutes": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.matchRoutes),
/* harmony export */   "parsePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.parsePath),
/* harmony export */   "redirect": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.redirect),
/* harmony export */   "renderMatches": () => (/* binding */ renderMatches),
/* harmony export */   "resolvePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.resolvePath),
/* harmony export */   "useActionData": () => (/* binding */ useActionData),
/* harmony export */   "useAsyncError": () => (/* binding */ useAsyncError),
/* harmony export */   "useAsyncValue": () => (/* binding */ useAsyncValue),
/* harmony export */   "useHref": () => (/* binding */ useHref),
/* harmony export */   "useInRouterContext": () => (/* binding */ useInRouterContext),
/* harmony export */   "useLoaderData": () => (/* binding */ useLoaderData),
/* harmony export */   "useLocation": () => (/* binding */ useLocation),
/* harmony export */   "useMatch": () => (/* binding */ useMatch),
/* harmony export */   "useMatches": () => (/* binding */ useMatches),
/* harmony export */   "useNavigate": () => (/* binding */ useNavigate),
/* harmony export */   "useNavigation": () => (/* binding */ useNavigation),
/* harmony export */   "useNavigationType": () => (/* binding */ useNavigationType),
/* harmony export */   "useOutlet": () => (/* binding */ useOutlet),
/* harmony export */   "useOutletContext": () => (/* binding */ useOutletContext),
/* harmony export */   "useParams": () => (/* binding */ useParams),
/* harmony export */   "useResolvedPath": () => (/* binding */ useResolvedPath),
/* harmony export */   "useRevalidator": () => (/* binding */ useRevalidator),
/* harmony export */   "useRouteError": () => (/* binding */ useRouteError),
/* harmony export */   "useRouteLoaderData": () => (/* binding */ useRouteLoaderData),
/* harmony export */   "useRoutes": () => (/* binding */ useRoutes)
/* harmony export */ });
/* harmony import */ var _remix_run_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var process = __webpack_require__(9);
/**
 * React Router v6.4.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function isPolyfill(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

const is = typeof Object.is === "function" ? Object.is : isPolyfill; // Intentionally not using named imports because Rollup uses dynamic
// dispatch for CommonJS interop named imports.

const {
  useState,
  useEffect,
  useLayoutEffect,
  useDebugValue
} = react__WEBPACK_IMPORTED_MODULE_1__;
let didWarnOld18Alpha = false;
let didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore$2(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  if (process.env.NODE_ENV !== "production") {
    if (!didWarnOld18Alpha) {
      if (true) {
        didWarnOld18Alpha = true;
        console.error("You are using an outdated, pre-release alpha of React 18 that " + "does not support useSyncExternalStore. The " + "use-sync-external-store shim will not work correctly. Upgrade " + "to a newer pre-release.");
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  const value = getSnapshot();

  if (process.env.NODE_ENV !== "production") {
    if (!didWarnUncachedGetSnapshot) {
      const cachedValue = getSnapshot();

      if (!is(value, cachedValue)) {
        console.error("The result of getSnapshot should be cached to avoid an infinite loop");
        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  const [{
    inst
  }, forceUpdate] = useState({
    inst: {
      value,
      getSnapshot
    }
  }); // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.

  useLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [subscribe, value, getSnapshot]);
  useEffect(() => {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst
      });
    }

    const handleStoreChange = () => {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;

  try {
    const nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

/**
 * Inlined into the react-router repo since use-sync-external-store does not
 * provide a UMD-compatible package, so we need this to be able to distribute
 * UMD react-router bundles
 */
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const isServerEnvironment = !canUseDOM;
const shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
const useSyncExternalStore = true ? (module => module.useSyncExternalStore)(react__WEBPACK_IMPORTED_MODULE_1__) : shim;

// Contexts for data routers
const DataStaticRouterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  DataStaticRouterContext.displayName = "DataStaticRouterContext";
}

const DataRouterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  DataRouterContext.displayName = "DataRouter";
}

const DataRouterStateContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  DataRouterStateContext.displayName = "DataRouterState";
}

const AwaitContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  AwaitContext.displayName = "Await";
}

const NavigationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  NavigationContext.displayName = "Navigation";
}

const LocationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  LocationContext.displayName = "Location";
}

const RouteContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext({
  outlet: null,
  matches: []
});

if (process.env.NODE_ENV !== "production") {
  RouteContext.displayName = "Route";
}

const RouteErrorContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);

if (process.env.NODE_ENV !== "production") {
  RouteErrorContext.displayName = "RouteError";
}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-href
 */

function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useHref() may be used only in the context of a <Router> component.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname; // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links

  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.joinPaths)([basename, pathname]);
  }

  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-in-router-context
 */

function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_1__.useContext(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-location
 */

function useLocation() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useLocation() may be used only in the context of a <Router> component.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  return react__WEBPACK_IMPORTED_MODULE_1__.useContext(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-navigation-type
 */

function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_1__.useContext(LocationContext).navigationType;
}
/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-match
 */

function useMatch(pattern) {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useMatch() may be used only in the context of a <Router> component.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  let {
    pathname
  } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.matchPath)(pattern, pathname), [pathname, pattern]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-navigate
 */
function useNavigate() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useNavigate() may be used only in the context of a <Router> component.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(false);
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }

    process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.warning)(activeRef.current, "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.") : void 0;
    if (!activeRef.current) return;

    if (typeof to === "number") {
      navigator.go(to);
      return;
    }

    let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path"); // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history.  If this is a root navigation, then we
    // navigate to the raw basename which allows the basename to have full
    // control over the presence of a trailing slash on root links

    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.joinPaths)([basename, path.pathname]);
    }

    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
const OutletContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext(null);
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
 */

function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_1__.useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-outlet
 */

function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext).outlet;

  if (outlet) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }

  return outlet;
}
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-params
 */

function useParams() {
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-resolved-path
 */

function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase));
  return react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-routes
 */

function useRoutes(routes, locationArg) {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useRoutes() may be used only in the context of a <Router> component.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(NavigationContext);
  let dataRouterStateContext = react__WEBPACK_IMPORTED_MODULE_1__.useContext(DataRouterStateContext);
  let {
    matches: parentMatches
  } = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;

  if (process.env.NODE_ENV !== "production") {
    // You won't get a warning about 2 different <Routes> under a <Route>
    // without a trailing *, but this is a best-effort warning anyway since we
    // cannot even give the warning unless they land at the parent route.
    //
    // Example:
    //
    // <Routes>
    //   {/* This route path MUST end with /* because otherwise
    //       it will never match /blog/post/123 */}
    //   <Route path="blog" element={<Blog />} />
    //   <Route path="blog/feed" element={<BlogFeed />} />
    // </Routes>
    //
    // function Blog() {
    //   return (
    //     <Routes>
    //       <Route path="post/:id" element={<Post />} />
    //     </Routes>
    //   );
    // }
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + (parentPath === "/" ? "*" : parentPath + "/*") + "\">."));
  }

  let locationFromContext = useLocation();
  let location;

  if (locationArg) {
    var _parsedLocationArg$pa;

    let parsedLocationArg = typeof locationArg === "string" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.parsePath)(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, " + "the location pathname must begin with the portion of the URL pathname that was " + ("matched by all parent routes. The current pathname base is \"" + parentPathnameBase + "\" ") + ("but pathname \"" + parsedLocationArg.pathname + "\" was given in the `location` prop.")) : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }

  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.matchRoutes)(routes, {
    pathname: remainingPathname
  });

  if (process.env.NODE_ENV !== "production") {
    process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.warning)(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") : void 0;
    process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.warning)(matches == null || matches[matches.length - 1].route.element !== undefined, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + "\" does not have an element. " + "This means it will render an <Outlet /> with a null value by default resulting in an \"empty\" page.") : void 0;
  }

  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.joinPaths)([parentPathnameBase, // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.joinPaths)([parentPathnameBase, // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
  })), parentMatches, dataRouterStateContext || undefined); // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.


  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.Action.Pop
      }
    }, renderedMatches);
  }

  return renderedMatches;
}

function DefaultErrorElement() {
  let error = useRouteError();
  let message = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.isRouteErrorResponse)(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", null, "Unhandled Thrown Error!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("pre", {
    style: preStyles
  }, stack) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("code", {
    style: codeStyles
  }, "errorElement"), " props on\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("code", {
    style: codeStyles
  }, "<Route>")));
}

class RenderErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      error: props.error
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }

  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application, that will have no effect--the error page continues to display.
    // This gives us a mechanism to recover from the error when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location) {
      return {
        error: props.error,
        location: props.location
      };
    } // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.


    return {
      error: props.error || state.error,
      location: state.location
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }

  render() {
    return this.state.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    }) : this.props.children;
  }

}

function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataStaticRouterContext = react__WEBPACK_IMPORTED_MODULE_1__.useContext(DataStaticRouterContext); // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter

  if (dataStaticRouterContext && match.route.errorElement) {
    dataStaticRouterContext._deepestRenderedBoundaryId = match.route.id;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}

function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }

  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }

  let renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;

  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    !(errorIndex >= 0) ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "Could not find a matching route for the current errors: " + errors) : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }

  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

    let errorElement = dataRouterState ? match.route.errorElement || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(DefaultErrorElement, null) : null;

    let getChildren = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(RenderedRoute, {
      match: match,
      routeContext: {
        outlet,
        matches: parentMatches.concat(renderedMatches.slice(0, index + 1))
      }
    }, error ? errorElement : match.route.element !== undefined ? match.route.element : outlet); // Only wrap in an error boundary within data router usages when we have an
    // errorElement on this route.  Otherwise let it bubble up to an ancestor
    // errorElement


    return dataRouterState && (match.route.errorElement || index === 0) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error: error,
      children: getChildren()
    }) : getChildren();
  }, null);
}
var DataRouterHook;

(function (DataRouterHook) {
  DataRouterHook["UseRevalidator"] = "useRevalidator";
})(DataRouterHook || (DataRouterHook = {}));

var DataRouterStateHook;

(function (DataRouterStateHook) {
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
})(DataRouterStateHook || (DataRouterStateHook = {}));

function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.";
}

function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_1__.useContext(DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, getDataRouterConsoleError(hookName)) : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  return ctx;
}

function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_1__.useContext(DataRouterStateContext);
  !state ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, getDataRouterConsoleError(hookName)) : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  return state;
}
/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */


function useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}
/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */

function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */

function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => matches.map(match => {
    let {
      pathname,
      params
    } = match; // Note: This structure matches that created by createUseMatchesMatch
    // in the @remix-run/router , so if you change this please also change
    // that :)  Eventually we'll DRY this up

    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}
/**
 * Returns the loader data for the nearest ancestor Route loader
 */

function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  let route = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  !route ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "useLoaderData must be used inside a RouteContext") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "useLoaderData can only be used on routes that contain a unique \"id\"") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  return state.loaderData[thisRoute.route.id];
}
/**
 * Returns the loaderData for the given routeId
 */

function useRouteLoaderData(routeId) {
  let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}
/**
 * Returns the action data for the nearest ancestor Route action
 */

function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  let route = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  !route ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "useActionData must be used inside a RouteContext") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  return Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * errorElement to display a proper error message.
 */

function useRouteError() {
  var _state$errors;

  let error = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let route = react__WEBPACK_IMPORTED_MODULE_1__.useContext(RouteContext);
  let thisRoute = route.matches[route.matches.length - 1]; // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary

  if (error) {
    return error;
  }

  !route ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "useRouteError must be used inside a RouteContext") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  !thisRoute.route.id ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "useRouteError can only be used on routes that contain a unique \"id\"") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0; // Otherwise look for errors from our data router state

  return (_state$errors = state.errors) == null ? void 0 : _state$errors[thisRoute.route.id];
}
/**
 * Returns the happy-path data from the nearest ancestor <Await /> value
 */

function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_1__.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
/**
 * Returns the error from the nearest ancestor <Await /> value
 */

function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_1__.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
const alreadyWarned = {};

function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.warning)(false, message) : void 0;
  }
}

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router
  } = _ref;
  // Sync router state to our component state to force re-renders
  let state = useSyncExternalStore(router.subscribe, () => router.state, // We have to provide this so React@18 doesn't complain during hydration,
  // but we pass our serialized hydration data into the router so state here
  // is already synced with what the server saw
  () => router.state);
  let navigator = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(DataRouterContext.Provider, {
    value: {
      router,
      navigator,
      static: false,
      // Do we need this?
      basename
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Router, {
    basename: router.basename,
    location: router.state.location,
    navigationType: router.state.historyAction,
    navigator: navigator
  }, router.state.initialized ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Routes, null) : fallbackElement)));
}

/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/docs/en/v6/routers/memory-router
 */
function MemoryRouter(_ref2) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex
  } = _ref2;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef();

  if (historyRef.current == null) {
    historyRef.current = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.createMemoryHistory)({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }

  let history = historyRef.current;
  let [state, setState] = react__WEBPACK_IMPORTED_MODULE_1__.useState({
    action: history.action,
    location: history.location
  });
  react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/docs/en/v6/components/navigate
 */
function Navigate(_ref3) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref3;
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, // TODO: This error is probably because they somehow have 2 versions of
  // the router loaded. We can help them understand how to avoid that.
  "<Navigate> may be used only in the context of a <Router> component.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
  process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.warning)(!react__WEBPACK_IMPORTED_MODULE_1__.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") : void 0;
  let dataRouterState = react__WEBPACK_IMPORTED_MODULE_1__.useContext(DataRouterStateContext);
  let navigate = useNavigate();
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    // Avoid kicking off multiple navigations if we're in the middle of a
    // data-router navigation, since components get re-rendered when we enter
    // a submitting/loading state
    if (dataRouterState && dataRouterState.navigation.state !== "idle") {
      return;
    }

    navigate(to, {
      replace,
      state,
      relative
    });
  });
  return null;
}

/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/docs/en/v6/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}

/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/docs/en/v6/components/route
 */
function Route(_props) {
  process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) ;
}

/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/docs/en/v6/routers/router
 */
function Router(_ref4) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.Action.Pop,
    navigator,
    static: staticProp = false
  } = _ref4;
  !!useInRouterContext() ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0; // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app

  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);

  if (typeof locationProp === "string") {
    locationProp = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.parsePath)(locationProp);
  }

  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    let trailingPathname = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.stripBasename)(pathname, basename);

    if (trailingPathname == null) {
      return null;
    }

    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.warning)(location != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") : void 0;

  if (location == null) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(LocationContext.Provider, {
    children: children,
    value: {
      location,
      navigationType
    }
  }));
}

/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/docs/en/v6/components/routes
 */
function Routes(_ref5) {
  let {
    children,
    location
  } = _ref5;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_1__.useContext(DataRouterContext); // When in a DataRouterContext _without_ children, we use the router routes
  // directly.  If we have children, then we're in a descendant tree and we
  // need to use child routes.

  let routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes, location);
}

/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref6) {
  let {
    children,
    errorElement,
    resolve
  } = _ref6;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus;

(function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));

const neverSettledPromise = new Promise(() => {});

class AwaitErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }

  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;

    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings

      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status = promise._error !== undefined ? AwaitRenderStatus.error : promise._data !== undefined ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then(data => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), error => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }

    if (status === AwaitRenderStatus.error && promise._error instanceof _remix_run_router__WEBPACK_IMPORTED_MODULE_0__.AbortedDeferredError) {
      // Freeze the UI by throwing a never resolved promise
      throw neverSettledPromise;
    }

    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }

    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }

    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(AwaitContext.Provider, {
        value: promise,
        children: children
      });
    } // Throw to the suspense boundary


    throw promise;
  }

}
/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on <Await>
 */


function ResolveAwait(_ref7) {
  let {
    children
  } = _ref7;
  let data = useAsyncValue();

  if (typeof children === "function") {
    return children(data);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, children);
} ///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/create-routes-from-children
 */


function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }

  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_1__.Children.forEach(children, (element, index) => {
    if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.type === react__WEBPACK_IMPORTED_MODULE_1__.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }

    !(element.type === Route) ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
    !(!element.props.index || !element.props.children) ? process.env.NODE_ENV !== "production" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false, "An index route cannot have child routes.") : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.invariant)(false) : void 0;
    let treePath = [...parentPath, index];
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      hasErrorBoundary: element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle
    };

    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }

    routes.push(route);
  });
  return routes;
}
/**
 * Renders the result of `matchRoutes()` into a React element.
 */

function renderMatches(matches) {
  return _renderMatches(matches);
}
/**
 * @private
 * Walk the route tree and add hasErrorBoundary if it's not provided, so that
 * users providing manual route arrays can just specify errorElement
 */

function enhanceManualRouteObjects(routes) {
  return routes.map(route => {
    let routeClone = _extends({}, route);

    if (routeClone.hasErrorBoundary == null) {
      routeClone.hasErrorBoundary = routeClone.errorElement != null;
    }

    if (routeClone.children) {
      routeClone.children = enhanceManualRouteObjects(routeClone.children);
    }

    return routeClone;
  });
}

function createMemoryRouter(routes, opts) {
  return (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    history: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_0__.createMemoryHistory)({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: enhanceManualRouteObjects(routes)
  }).initialize();
} ///////////////////////////////////////////////////////////////////////////////


//# sourceMappingURL=index.js.map


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("03ca4a38af2a413bfe26")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC45ZGIwNzYxOGU5YmJmZDFhMWE3OS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLHdCQUF3Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDOztBQUVqQztBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLE1BQU07QUFDTix5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQix3Q0FBd0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07OztBQUdOO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUcsSUFBSTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQixJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxjQUFjO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1CQUFtQjtBQUM1QyxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047OztBQUdBO0FBQ0E7O0FBRUEsb0NBQW9DOztBQUVwQywrRkFBK0Y7O0FBRS9GOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBLG1EQUFtRDtBQUNuRDs7QUFFQSx1REFBdUQ7QUFDdkQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0dBQStHO0FBQy9HOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUssSUFBSTtBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtCQUErQjtBQUMvQjs7QUFFQSwrSkFBK0o7QUFDL0o7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLLElBQUk7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sb0JBQW9CO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUEsOERBQThEOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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Sjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLGdEQUFtQixDQUFDLDJDQUFjO0FBQ3hELEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsbURBQXNCO0FBQ3hCLHVCQUF1QixpREFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLDJDQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxPQUFPLGlDQUFpQyw0REFBUyxrTUFBa00sNERBQVM7QUFDNVIseURBQXlELE9BQU8saUNBQWlDLDREQUFTLHNEQUFzRCw0REFBUztBQUN6SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLFNBQVMsK0RBQVk7QUFDckI7QUFDQSxhQUFhLHNFQUFtQjtBQUNoQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFNDBCO0FBQzkwQjs7Ozs7Ozs7O1VDejBDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0Ly4vbm9kZV9tb2R1bGVzL0ByZW1peC1ydW4vcm91dGVyL2Rpc3Qvcm91dGVyLmpzIiwid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvTmF2YmFyLmpzIiwid2VicGFjazovL3JlYWN0Ly4vMDdfRGF5XzQvMDJfSlNPTl9TZXJ2ZXIvMDFfRXhlcmNpc2UvanMvYXBwLmpzIiwid2VicGFjazovL3JlYWN0Ly4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZWFjdC8uL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZWFjdC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAcmVtaXgtcnVuL3JvdXRlciB2MS4wLjRcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIFJlbWl4IFNvZnR3YXJlIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UubWQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8jcmVnaW9uIFR5cGVzIGFuZCBDb25zdGFudHNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8qKlxuICogQWN0aW9ucyByZXByZXNlbnQgdGhlIHR5cGUgb2YgY2hhbmdlIHRvIGEgbG9jYXRpb24gdmFsdWUuXG4gKi9cbnZhciBBY3Rpb247XG5cbihmdW5jdGlvbiAoQWN0aW9uKSB7XG4gIC8qKlxuICAgKiBBIFBPUCBpbmRpY2F0ZXMgYSBjaGFuZ2UgdG8gYW4gYXJiaXRyYXJ5IGluZGV4IGluIHRoZSBoaXN0b3J5IHN0YWNrLCBzdWNoXG4gICAqIGFzIGEgYmFjayBvciBmb3J3YXJkIG5hdmlnYXRpb24uIEl0IGRvZXMgbm90IGRlc2NyaWJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlXG4gICAqIG5hdmlnYXRpb24sIG9ubHkgdGhhdCB0aGUgY3VycmVudCBpbmRleCBjaGFuZ2VkLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGlzIHRoZSBkZWZhdWx0IGFjdGlvbiBmb3IgbmV3bHkgY3JlYXRlZCBoaXN0b3J5IG9iamVjdHMuXG4gICAqL1xuICBBY3Rpb25bXCJQb3BcIl0gPSBcIlBPUFwiO1xuICAvKipcbiAgICogQSBQVVNIIGluZGljYXRlcyBhIG5ldyBlbnRyeSBiZWluZyBhZGRlZCB0byB0aGUgaGlzdG9yeSBzdGFjaywgc3VjaCBhcyB3aGVuXG4gICAqIGEgbGluayBpcyBjbGlja2VkIGFuZCBhIG5ldyBwYWdlIGxvYWRzLiBXaGVuIHRoaXMgaGFwcGVucywgYWxsIHN1YnNlcXVlbnRcbiAgICogZW50cmllcyBpbiB0aGUgc3RhY2sgYXJlIGxvc3QuXG4gICAqL1xuXG4gIEFjdGlvbltcIlB1c2hcIl0gPSBcIlBVU0hcIjtcbiAgLyoqXG4gICAqIEEgUkVQTEFDRSBpbmRpY2F0ZXMgdGhlIGVudHJ5IGF0IHRoZSBjdXJyZW50IGluZGV4IGluIHRoZSBoaXN0b3J5IHN0YWNrXG4gICAqIGJlaW5nIHJlcGxhY2VkIGJ5IGEgbmV3IG9uZS5cbiAgICovXG5cbiAgQWN0aW9uW1wiUmVwbGFjZVwiXSA9IFwiUkVQTEFDRVwiO1xufSkoQWN0aW9uIHx8IChBY3Rpb24gPSB7fSkpO1xuXG5jb25zdCBQb3BTdGF0ZUV2ZW50VHlwZSA9IFwicG9wc3RhdGVcIjtcbi8qKlxuICogTWVtb3J5IGhpc3Rvcnkgc3RvcmVzIHRoZSBjdXJyZW50IGxvY2F0aW9uIGluIG1lbW9yeS4gSXQgaXMgZGVzaWduZWQgZm9yIHVzZVxuICogaW4gc3RhdGVmdWwgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzIGxpa2UgdGVzdHMgYW5kIFJlYWN0IE5hdGl2ZS5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGxldCB7XG4gICAgaW5pdGlhbEVudHJpZXMgPSBbXCIvXCJdLFxuICAgIGluaXRpYWxJbmRleCxcbiAgICB2NUNvbXBhdCA9IGZhbHNlXG4gIH0gPSBvcHRpb25zO1xuICBsZXQgZW50cmllczsgLy8gRGVjbGFyZSBzbyB3ZSBjYW4gYWNjZXNzIGZyb20gY3JlYXRlTWVtb3J5TG9jYXRpb25cblxuICBlbnRyaWVzID0gaW5pdGlhbEVudHJpZXMubWFwKChlbnRyeSwgaW5kZXgpID0+IGNyZWF0ZU1lbW9yeUxvY2F0aW9uKGVudHJ5LCB0eXBlb2YgZW50cnkgPT09IFwic3RyaW5nXCIgPyBudWxsIDogZW50cnkuc3RhdGUsIGluZGV4ID09PSAwID8gXCJkZWZhdWx0XCIgOiB1bmRlZmluZWQpKTtcbiAgbGV0IGluZGV4ID0gY2xhbXBJbmRleChpbml0aWFsSW5kZXggPT0gbnVsbCA/IGVudHJpZXMubGVuZ3RoIC0gMSA6IGluaXRpYWxJbmRleCk7XG4gIGxldCBhY3Rpb24gPSBBY3Rpb24uUG9wO1xuICBsZXQgbGlzdGVuZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGNsYW1wSW5kZXgobikge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChuLCAwKSwgZW50cmllcy5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gZW50cmllc1tpbmRleF07XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVNZW1vcnlMb2NhdGlvbih0bywgc3RhdGUsIGtleSkge1xuICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oZW50cmllcyA/IGdldEN1cnJlbnRMb2NhdGlvbigpLnBhdGhuYW1lIDogXCIvXCIsIHRvLCBzdGF0ZSwga2V5KTtcbiAgICB3YXJuaW5nJDEobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApID09PSBcIi9cIiwgXCJyZWxhdGl2ZSBwYXRobmFtZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gbWVtb3J5IGhpc3Rvcnk6IFwiICsgSlNPTi5zdHJpbmdpZnkodG8pKTtcbiAgICByZXR1cm4gbG9jYXRpb247XG4gIH1cblxuICBsZXQgaGlzdG9yeSA9IHtcbiAgICBnZXQgaW5kZXgoKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSxcblxuICAgIGdldCBhY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBnZXQgbG9jYXRpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0Q3VycmVudExvY2F0aW9uKCk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUhyZWYodG8pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyB0byA6IGNyZWF0ZVBhdGgodG8pO1xuICAgIH0sXG5cbiAgICBlbmNvZGVMb2NhdGlvbih0bykge1xuICAgICAgbGV0IHBhdGggPSB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBwYXJzZVBhdGgodG8pIDogdG87XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogcGF0aC5wYXRobmFtZSB8fCBcIlwiLFxuICAgICAgICBzZWFyY2g6IHBhdGguc2VhcmNoIHx8IFwiXCIsXG4gICAgICAgIGhhc2g6IHBhdGguaGFzaCB8fCBcIlwiXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBwdXNoKHRvLCBzdGF0ZSkge1xuICAgICAgYWN0aW9uID0gQWN0aW9uLlB1c2g7XG4gICAgICBsZXQgbmV4dExvY2F0aW9uID0gY3JlYXRlTWVtb3J5TG9jYXRpb24odG8sIHN0YXRlKTtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgZW50cmllcy5sZW5ndGgsIG5leHRMb2NhdGlvbik7XG5cbiAgICAgIGlmICh2NUNvbXBhdCAmJiBsaXN0ZW5lcikge1xuICAgICAgICBsaXN0ZW5lcih7XG4gICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBuZXh0TG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlcGxhY2UodG8sIHN0YXRlKSB7XG4gICAgICBhY3Rpb24gPSBBY3Rpb24uUmVwbGFjZTtcbiAgICAgIGxldCBuZXh0TG9jYXRpb24gPSBjcmVhdGVNZW1vcnlMb2NhdGlvbih0bywgc3RhdGUpO1xuICAgICAgZW50cmllc1tpbmRleF0gPSBuZXh0TG9jYXRpb247XG5cbiAgICAgIGlmICh2NUNvbXBhdCAmJiBsaXN0ZW5lcikge1xuICAgICAgICBsaXN0ZW5lcih7XG4gICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgIGxvY2F0aW9uOiBuZXh0TG9jYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdvKGRlbHRhKSB7XG4gICAgICBhY3Rpb24gPSBBY3Rpb24uUG9wO1xuICAgICAgaW5kZXggPSBjbGFtcEluZGV4KGluZGV4ICsgZGVsdGEpO1xuXG4gICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICBsb2NhdGlvbjogZ2V0Q3VycmVudExvY2F0aW9uKClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGxpc3Rlbihmbikge1xuICAgICAgbGlzdGVuZXIgPSBmbjtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuXG4gIH07XG4gIHJldHVybiBoaXN0b3J5O1xufVxuLyoqXG4gKiBCcm93c2VyIGhpc3Rvcnkgc3RvcmVzIHRoZSBsb2NhdGlvbiBpbiByZWd1bGFyIFVSTHMuIFRoaXMgaXMgdGhlIHN0YW5kYXJkIGZvclxuICogbW9zdCB3ZWIgYXBwcywgYnV0IGl0IHJlcXVpcmVzIHNvbWUgY29uZmlndXJhdGlvbiBvbiB0aGUgc2VydmVyIHRvIGVuc3VyZSB5b3VcbiAqIHNlcnZlIHRoZSBzYW1lIGFwcCBhdCBtdWx0aXBsZSBVUkxzLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlbWl4LXJ1bi9oaXN0b3J5L3RyZWUvbWFpbi9kb2NzL2FwaS1yZWZlcmVuY2UubWQjY3JlYXRlYnJvd3Nlcmhpc3RvcnlcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVCcm93c2VySGlzdG9yeShvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVCcm93c2VyTG9jYXRpb24od2luZG93LCBnbG9iYWxIaXN0b3J5KSB7XG4gICAgbGV0IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2VhcmNoLFxuICAgICAgaGFzaFxuICAgIH0gPSB3aW5kb3cubG9jYXRpb247XG4gICAgcmV0dXJuIGNyZWF0ZUxvY2F0aW9uKFwiXCIsIHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2VhcmNoLFxuICAgICAgaGFzaFxuICAgIH0sIC8vIHN0YXRlIGRlZmF1bHRzIHRvIGBudWxsYCBiZWNhdXNlIGB3aW5kb3cuaGlzdG9yeS5zdGF0ZWAgZG9lc1xuICAgIGdsb2JhbEhpc3Rvcnkuc3RhdGUgJiYgZ2xvYmFsSGlzdG9yeS5zdGF0ZS51c3IgfHwgbnVsbCwgZ2xvYmFsSGlzdG9yeS5zdGF0ZSAmJiBnbG9iYWxIaXN0b3J5LnN0YXRlLmtleSB8fCBcImRlZmF1bHRcIik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVCcm93c2VySHJlZih3aW5kb3csIHRvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IHRvIDogY3JlYXRlUGF0aCh0byk7XG4gIH1cblxuICByZXR1cm4gZ2V0VXJsQmFzZWRIaXN0b3J5KGNyZWF0ZUJyb3dzZXJMb2NhdGlvbiwgY3JlYXRlQnJvd3NlckhyZWYsIG51bGwsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBIYXNoIGhpc3Rvcnkgc3RvcmVzIHRoZSBsb2NhdGlvbiBpbiB3aW5kb3cubG9jYXRpb24uaGFzaC4gVGhpcyBtYWtlcyBpdCBpZGVhbFxuICogZm9yIHNpdHVhdGlvbnMgd2hlcmUgeW91IGRvbid0IHdhbnQgdG8gc2VuZCB0aGUgbG9jYXRpb24gdG8gdGhlIHNlcnZlciBmb3JcbiAqIHNvbWUgcmVhc29uLCBlaXRoZXIgYmVjYXVzZSB5b3UgZG8gY2Fubm90IGNvbmZpZ3VyZSBpdCBvciB0aGUgVVJMIHNwYWNlIGlzXG4gKiByZXNlcnZlZCBmb3Igc29tZXRoaW5nIGVsc2UuXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVtaXgtcnVuL2hpc3RvcnkvdHJlZS9tYWluL2RvY3MvYXBpLXJlZmVyZW5jZS5tZCNjcmVhdGVoYXNoaGlzdG9yeVxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc2hIaXN0b3J5KG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhhc2hMb2NhdGlvbih3aW5kb3csIGdsb2JhbEhpc3RvcnkpIHtcbiAgICBsZXQge1xuICAgICAgcGF0aG5hbWUgPSBcIi9cIixcbiAgICAgIHNlYXJjaCA9IFwiXCIsXG4gICAgICBoYXNoID0gXCJcIlxuICAgIH0gPSBwYXJzZVBhdGgod2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpKTtcbiAgICByZXR1cm4gY3JlYXRlTG9jYXRpb24oXCJcIiwge1xuICAgICAgcGF0aG5hbWUsXG4gICAgICBzZWFyY2gsXG4gICAgICBoYXNoXG4gICAgfSwgLy8gc3RhdGUgZGVmYXVsdHMgdG8gYG51bGxgIGJlY2F1c2UgYHdpbmRvdy5oaXN0b3J5LnN0YXRlYCBkb2VzXG4gICAgZ2xvYmFsSGlzdG9yeS5zdGF0ZSAmJiBnbG9iYWxIaXN0b3J5LnN0YXRlLnVzciB8fCBudWxsLCBnbG9iYWxIaXN0b3J5LnN0YXRlICYmIGdsb2JhbEhpc3Rvcnkuc3RhdGUua2V5IHx8IFwiZGVmYXVsdFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhhc2hIcmVmKHdpbmRvdywgdG8pIHtcbiAgICBsZXQgYmFzZSA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYmFzZVwiKTtcbiAgICBsZXQgaHJlZiA9IFwiXCI7XG5cbiAgICBpZiAoYmFzZSAmJiBiYXNlLmdldEF0dHJpYnV0ZShcImhyZWZcIikpIHtcbiAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgIGxldCBoYXNoSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIik7XG4gICAgICBocmVmID0gaGFzaEluZGV4ID09PSAtMSA/IHVybCA6IHVybC5zbGljZSgwLCBoYXNoSW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBocmVmICsgXCIjXCIgKyAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiID8gdG8gOiBjcmVhdGVQYXRoKHRvKSk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUhhc2hMb2NhdGlvbihsb2NhdGlvbiwgdG8pIHtcbiAgICB3YXJuaW5nJDEobG9jYXRpb24ucGF0aG5hbWUuY2hhckF0KDApID09PSBcIi9cIiwgXCJyZWxhdGl2ZSBwYXRobmFtZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gaGFzaCBoaXN0b3J5LnB1c2goXCIgKyBKU09OLnN0cmluZ2lmeSh0bykgKyBcIilcIik7XG4gIH1cblxuICByZXR1cm4gZ2V0VXJsQmFzZWRIaXN0b3J5KGNyZWF0ZUhhc2hMb2NhdGlvbiwgY3JlYXRlSGFzaEhyZWYsIHZhbGlkYXRlSGFzaExvY2F0aW9uLCBvcHRpb25zKTtcbn0gLy8jZW5kcmVnaW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8jcmVnaW9uIFVUSUxTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5mdW5jdGlvbiB3YXJuaW5nJDEoY29uZCwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFdlbGNvbWUgdG8gZGVidWdnaW5nIGhpc3RvcnkhXG4gICAgICAvL1xuICAgICAgLy8gVGhpcyBlcnJvciBpcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB5b3UgY2FuIG1vcmUgZWFzaWx5XG4gICAgICAvLyBmaW5kIHRoZSBzb3VyY2UgZm9yIGEgd2FybmluZyB0aGF0IGFwcGVhcnMgaW4gdGhlIGNvbnNvbGUgYnlcbiAgICAgIC8vIGVuYWJsaW5nIFwicGF1c2Ugb24gZXhjZXB0aW9uc1wiIGluIHlvdXIgSmF2YVNjcmlwdCBkZWJ1Z2dlci5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOCk7XG59XG4vKipcbiAqIEZvciBicm93c2VyLWJhc2VkIGhpc3Rvcmllcywgd2UgY29tYmluZSB0aGUgc3RhdGUgYW5kIGtleSBpbnRvIGFuIG9iamVjdFxuICovXG5cblxuZnVuY3Rpb24gZ2V0SGlzdG9yeVN0YXRlKGxvY2F0aW9uKSB7XG4gIHJldHVybiB7XG4gICAgdXNyOiBsb2NhdGlvbi5zdGF0ZSxcbiAgICBrZXk6IGxvY2F0aW9uLmtleVxuICB9O1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgTG9jYXRpb24gb2JqZWN0IHdpdGggYSB1bmlxdWUga2V5IGZyb20gdGhlIGdpdmVuIFBhdGhcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKGN1cnJlbnQsIHRvLCBzdGF0ZSwga2V5KSB7XG4gIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUgPSBudWxsO1xuICB9XG5cbiAgbGV0IGxvY2F0aW9uID0gX2V4dGVuZHMoe1xuICAgIHBhdGhuYW1lOiB0eXBlb2YgY3VycmVudCA9PT0gXCJzdHJpbmdcIiA/IGN1cnJlbnQgOiBjdXJyZW50LnBhdGhuYW1lLFxuICAgIHNlYXJjaDogXCJcIixcbiAgICBoYXNoOiBcIlwiXG4gIH0sIHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IHBhcnNlUGF0aCh0bykgOiB0bywge1xuICAgIHN0YXRlLFxuICAgIC8vIFRPRE86IFRoaXMgY291bGQgYmUgY2xlYW5lZCB1cC4gIHB1c2gvcmVwbGFjZSBzaG91bGQgcHJvYmFibHkganVzdCB0YWtlXG4gICAgLy8gZnVsbCBMb2NhdGlvbnMgbm93IGFuZCBhdm9pZCB0aGUgbmVlZCB0byBydW4gdGhyb3VnaCB0aGlzIGZsb3cgYXQgYWxsXG4gICAgLy8gQnV0IHRoYXQncyBhIHByZXR0eSBiaWcgcmVmYWN0b3IgdG8gdGhlIGN1cnJlbnQgdGVzdCBzdWl0ZSBzbyBnb2luZyB0b1xuICAgIC8vIGtlZXAgYXMgaXMgZm9yIHRoZSB0aW1lIGJlaW5nIGFuZCBqdXN0IGxldCBhbnkgaW5jb21pbmcga2V5cyB0YWtlIHByZWNlZGVuY2VcbiAgICBrZXk6IHRvICYmIHRvLmtleSB8fCBrZXkgfHwgY3JlYXRlS2V5KClcbiAgfSk7XG5cbiAgcmV0dXJuIGxvY2F0aW9uO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgc3RyaW5nIFVSTCBwYXRoIGZyb20gdGhlIGdpdmVuIHBhdGhuYW1lLCBzZWFyY2gsIGFuZCBoYXNoIGNvbXBvbmVudHMuXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlUGF0aChfcmVmKSB7XG4gIGxldCB7XG4gICAgcGF0aG5hbWUgPSBcIi9cIixcbiAgICBzZWFyY2ggPSBcIlwiLFxuICAgIGhhc2ggPSBcIlwiXG4gIH0gPSBfcmVmO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaCAhPT0gXCI/XCIpIHBhdGhuYW1lICs9IHNlYXJjaC5jaGFyQXQoMCkgPT09IFwiP1wiID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4gIGlmIChoYXNoICYmIGhhc2ggIT09IFwiI1wiKSBwYXRobmFtZSArPSBoYXNoLmNoYXJBdCgwKSA9PT0gXCIjXCIgPyBoYXNoIDogXCIjXCIgKyBoYXNoO1xuICByZXR1cm4gcGF0aG5hbWU7XG59XG4vKipcbiAqIFBhcnNlcyBhIHN0cmluZyBVUkwgcGF0aCBpbnRvIGl0cyBzZXBhcmF0ZSBwYXRobmFtZSwgc2VhcmNoLCBhbmQgaGFzaCBjb21wb25lbnRzLlxuICovXG5cbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIGxldCBwYXJzZWRQYXRoID0ge307XG5cbiAgaWYgKHBhdGgpIHtcbiAgICBsZXQgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNoSW5kZXggPj0gMCkge1xuICAgICAgcGFyc2VkUGF0aC5oYXNoID0gcGF0aC5zdWJzdHIoaGFzaEluZGV4KTtcbiAgICAgIHBhdGggPSBwYXRoLnN1YnN0cigwLCBoYXNoSW5kZXgpO1xuICAgIH1cblxuICAgIGxldCBzZWFyY2hJbmRleCA9IHBhdGguaW5kZXhPZihcIj9cIik7XG5cbiAgICBpZiAoc2VhcmNoSW5kZXggPj0gMCkge1xuICAgICAgcGFyc2VkUGF0aC5zZWFyY2ggPSBwYXRoLnN1YnN0cihzZWFyY2hJbmRleCk7XG4gICAgICBwYXRoID0gcGF0aC5zdWJzdHIoMCwgc2VhcmNoSW5kZXgpO1xuICAgIH1cblxuICAgIGlmIChwYXRoKSB7XG4gICAgICBwYXJzZWRQYXRoLnBhdGhuYW1lID0gcGF0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFyc2VkUGF0aDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVVSTChsb2NhdGlvbikge1xuICAvLyB3aW5kb3cubG9jYXRpb24ub3JpZ2luIGlzIFwibnVsbFwiICh0aGUgbGl0ZXJhbCBzdHJpbmcgdmFsdWUpIGluIEZpcmVmb3hcbiAgLy8gdW5kZXIgY2VydGFpbiBjb25kaXRpb25zLCBub3RhYmx5IHdoZW4gc2VydmluZyBmcm9tIGEgbG9jYWwgSFRNTCBmaWxlXG4gIC8vIFNlZSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04NzgyOTdcbiAgbGV0IGJhc2UgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cubG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uLm9yaWdpbiAhPT0gXCJudWxsXCIgPyB3aW5kb3cubG9jYXRpb24ub3JpZ2luIDogXCJ1bmtub3duOi8vdW5rbm93blwiO1xuICBsZXQgaHJlZiA9IHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJzdHJpbmdcIiA/IGxvY2F0aW9uIDogY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gIHJldHVybiBuZXcgVVJMKGhyZWYsIGJhc2UpO1xufVxuXG5mdW5jdGlvbiBnZXRVcmxCYXNlZEhpc3RvcnkoZ2V0TG9jYXRpb24sIGNyZWF0ZUhyZWYsIHZhbGlkYXRlTG9jYXRpb24sIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGxldCB7XG4gICAgd2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcsXG4gICAgdjVDb21wYXQgPSBmYWxzZVxuICB9ID0gb3B0aW9ucztcbiAgbGV0IGdsb2JhbEhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgbGV0IGFjdGlvbiA9IEFjdGlvbi5Qb3A7XG4gIGxldCBsaXN0ZW5lciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaGFuZGxlUG9wKCkge1xuICAgIGFjdGlvbiA9IEFjdGlvbi5Qb3A7XG5cbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogaGlzdG9yeS5sb2NhdGlvblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHVzaCh0bywgc3RhdGUpIHtcbiAgICBhY3Rpb24gPSBBY3Rpb24uUHVzaDtcbiAgICBsZXQgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihoaXN0b3J5LmxvY2F0aW9uLCB0bywgc3RhdGUpO1xuICAgIGlmICh2YWxpZGF0ZUxvY2F0aW9uKSB2YWxpZGF0ZUxvY2F0aW9uKGxvY2F0aW9uLCB0byk7XG4gICAgbGV0IGhpc3RvcnlTdGF0ZSA9IGdldEhpc3RvcnlTdGF0ZShsb2NhdGlvbik7XG4gICAgbGV0IHVybCA9IGhpc3RvcnkuY3JlYXRlSHJlZihsb2NhdGlvbik7IC8vIHRyeS4uLmNhdGNoIGJlY2F1c2UgaU9TIGxpbWl0cyB1cyB0byAxMDAgcHVzaFN0YXRlIGNhbGxzIDovXG5cbiAgICB0cnkge1xuICAgICAgZ2xvYmFsSGlzdG9yeS5wdXNoU3RhdGUoaGlzdG9yeVN0YXRlLCBcIlwiLCB1cmwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBUaGV5IGFyZSBnb2luZyB0byBsb3NlIHN0YXRlIGhlcmUsIGJ1dCB0aGVyZSBpcyBubyByZWFsXG4gICAgICAvLyB3YXkgdG8gd2FybiB0aGVtIGFib3V0IGl0IHNpbmNlIHRoZSBwYWdlIHdpbGwgcmVmcmVzaC4uLlxuICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbih1cmwpO1xuICAgIH1cblxuICAgIGlmICh2NUNvbXBhdCAmJiBsaXN0ZW5lcikge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICBhY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uOiBoaXN0b3J5LmxvY2F0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKHRvLCBzdGF0ZSkge1xuICAgIGFjdGlvbiA9IEFjdGlvbi5SZXBsYWNlO1xuICAgIGxldCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKGhpc3RvcnkubG9jYXRpb24sIHRvLCBzdGF0ZSk7XG4gICAgaWYgKHZhbGlkYXRlTG9jYXRpb24pIHZhbGlkYXRlTG9jYXRpb24obG9jYXRpb24sIHRvKTtcbiAgICBsZXQgaGlzdG9yeVN0YXRlID0gZ2V0SGlzdG9yeVN0YXRlKGxvY2F0aW9uKTtcbiAgICBsZXQgdXJsID0gaGlzdG9yeS5jcmVhdGVIcmVmKGxvY2F0aW9uKTtcbiAgICBnbG9iYWxIaXN0b3J5LnJlcGxhY2VTdGF0ZShoaXN0b3J5U3RhdGUsIFwiXCIsIHVybCk7XG5cbiAgICBpZiAodjVDb21wYXQgJiYgbGlzdGVuZXIpIHtcbiAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBsb2NhdGlvbjogaGlzdG9yeS5sb2NhdGlvblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGhpc3RvcnkgPSB7XG4gICAgZ2V0IGFjdGlvbigpIHtcbiAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIGdldCBsb2NhdGlvbigpIHtcbiAgICAgIHJldHVybiBnZXRMb2NhdGlvbih3aW5kb3csIGdsb2JhbEhpc3RvcnkpO1xuICAgIH0sXG5cbiAgICBsaXN0ZW4oZm4pIHtcbiAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIGhpc3Rvcnkgb25seSBhY2NlcHRzIG9uZSBhY3RpdmUgbGlzdGVuZXJcIik7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnRUeXBlLCBoYW5kbGVQb3ApO1xuICAgICAgbGlzdGVuZXIgPSBmbjtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFBvcFN0YXRlRXZlbnRUeXBlLCBoYW5kbGVQb3ApO1xuICAgICAgICBsaXN0ZW5lciA9IG51bGw7XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBjcmVhdGVIcmVmKHRvKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSHJlZih3aW5kb3csIHRvKTtcbiAgICB9LFxuXG4gICAgZW5jb2RlTG9jYXRpb24odG8pIHtcbiAgICAgIC8vIEVuY29kZSBhIExvY2F0aW9uIHRoZSBzYW1lIHdheSB3aW5kb3cubG9jYXRpb24gd291bGRcbiAgICAgIGxldCB1cmwgPSBjcmVhdGVVUkwodHlwZW9mIHRvID09PSBcInN0cmluZ1wiID8gdG8gOiBjcmVhdGVQYXRoKHRvKSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRobmFtZTogdXJsLnBhdGhuYW1lLFxuICAgICAgICBzZWFyY2g6IHVybC5zZWFyY2gsXG4gICAgICAgIGhhc2g6IHVybC5oYXNoXG4gICAgICB9O1xuICAgIH0sXG5cbiAgICBwdXNoLFxuICAgIHJlcGxhY2UsXG5cbiAgICBnbyhuKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsSGlzdG9yeS5nbyhuKTtcbiAgICB9XG5cbiAgfTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59IC8vI2VuZHJlZ2lvblxuXG52YXIgUmVzdWx0VHlwZTtcblxuKGZ1bmN0aW9uIChSZXN1bHRUeXBlKSB7XG4gIFJlc3VsdFR5cGVbXCJkYXRhXCJdID0gXCJkYXRhXCI7XG4gIFJlc3VsdFR5cGVbXCJkZWZlcnJlZFwiXSA9IFwiZGVmZXJyZWRcIjtcbiAgUmVzdWx0VHlwZVtcInJlZGlyZWN0XCJdID0gXCJyZWRpcmVjdFwiO1xuICBSZXN1bHRUeXBlW1wiZXJyb3JcIl0gPSBcImVycm9yXCI7XG59KShSZXN1bHRUeXBlIHx8IChSZXN1bHRUeXBlID0ge30pKTtcblxuZnVuY3Rpb24gaXNJbmRleFJvdXRlKHJvdXRlKSB7XG4gIHJldHVybiByb3V0ZS5pbmRleCA9PT0gdHJ1ZTtcbn0gLy8gV2FsayB0aGUgcm91dGUgdHJlZSBnZW5lcmF0aW5nIHVuaXF1ZSBJRHMgd2hlcmUgbmVjZXNzYXJ5IHNvIHdlIGFyZSB3b3JraW5nXG4vLyBzb2xlbHkgd2l0aCBBZ25vc3RpY0RhdGFSb3V0ZU9iamVjdCdzIHdpdGhpbiB0aGUgUm91dGVyXG5cblxuZnVuY3Rpb24gY29udmVydFJvdXRlc1RvRGF0YVJvdXRlcyhyb3V0ZXMsIHBhcmVudFBhdGgsIGFsbElkcykge1xuICBpZiAocGFyZW50UGF0aCA9PT0gdm9pZCAwKSB7XG4gICAgcGFyZW50UGF0aCA9IFtdO1xuICB9XG5cbiAgaWYgKGFsbElkcyA9PT0gdm9pZCAwKSB7XG4gICAgYWxsSWRzID0gbmV3IFNldCgpO1xuICB9XG5cbiAgcmV0dXJuIHJvdXRlcy5tYXAoKHJvdXRlLCBpbmRleCkgPT4ge1xuICAgIGxldCB0cmVlUGF0aCA9IFsuLi5wYXJlbnRQYXRoLCBpbmRleF07XG4gICAgbGV0IGlkID0gdHlwZW9mIHJvdXRlLmlkID09PSBcInN0cmluZ1wiID8gcm91dGUuaWQgOiB0cmVlUGF0aC5qb2luKFwiLVwiKTtcbiAgICBpbnZhcmlhbnQocm91dGUuaW5kZXggIT09IHRydWUgfHwgIXJvdXRlLmNoaWxkcmVuLCBcIkNhbm5vdCBzcGVjaWZ5IGNoaWxkcmVuIG9uIGFuIGluZGV4IHJvdXRlXCIpO1xuICAgIGludmFyaWFudCghYWxsSWRzLmhhcyhpZCksIFwiRm91bmQgYSByb3V0ZSBpZCBjb2xsaXNpb24gb24gaWQgXFxcIlwiICsgaWQgKyBcIlxcXCIuICBSb3V0ZSBcIiArIFwiaWQncyBtdXN0IGJlIGdsb2JhbGx5IHVuaXF1ZSB3aXRoaW4gRGF0YSBSb3V0ZXIgdXNhZ2VzXCIpO1xuICAgIGFsbElkcy5hZGQoaWQpO1xuXG4gICAgaWYgKGlzSW5kZXhSb3V0ZShyb3V0ZSkpIHtcbiAgICAgIGxldCBpbmRleFJvdXRlID0gX2V4dGVuZHMoe30sIHJvdXRlLCB7XG4gICAgICAgIGlkXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGluZGV4Um91dGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXRoT3JMYXlvdXRSb3V0ZSA9IF9leHRlbmRzKHt9LCByb3V0ZSwge1xuICAgICAgICBpZCxcbiAgICAgICAgY2hpbGRyZW46IHJvdXRlLmNoaWxkcmVuID8gY29udmVydFJvdXRlc1RvRGF0YVJvdXRlcyhyb3V0ZS5jaGlsZHJlbiwgdHJlZVBhdGgsIGFsbElkcykgOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcGF0aE9yTGF5b3V0Um91dGU7XG4gICAgfVxuICB9KTtcbn1cbi8qKlxuICogTWF0Y2hlcyB0aGUgZ2l2ZW4gcm91dGVzIHRvIGEgbG9jYXRpb24gYW5kIHJldHVybnMgdGhlIG1hdGNoIGRhdGEuXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L3V0aWxzL21hdGNoLXJvdXRlc1xuICovXG5cbmZ1bmN0aW9uIG1hdGNoUm91dGVzKHJvdXRlcywgbG9jYXRpb25BcmcsIGJhc2VuYW1lKSB7XG4gIGlmIChiYXNlbmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgYmFzZW5hbWUgPSBcIi9cIjtcbiAgfVxuXG4gIGxldCBsb2NhdGlvbiA9IHR5cGVvZiBsb2NhdGlvbkFyZyA9PT0gXCJzdHJpbmdcIiA/IHBhcnNlUGF0aChsb2NhdGlvbkFyZykgOiBsb2NhdGlvbkFyZztcbiAgbGV0IHBhdGhuYW1lID0gc3RyaXBCYXNlbmFtZShsb2NhdGlvbi5wYXRobmFtZSB8fCBcIi9cIiwgYmFzZW5hbWUpO1xuXG4gIGlmIChwYXRobmFtZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsZXQgYnJhbmNoZXMgPSBmbGF0dGVuUm91dGVzKHJvdXRlcyk7XG4gIHJhbmtSb3V0ZUJyYW5jaGVzKGJyYW5jaGVzKTtcbiAgbGV0IG1hdGNoZXMgPSBudWxsO1xuXG4gIGZvciAobGV0IGkgPSAwOyBtYXRjaGVzID09IG51bGwgJiYgaSA8IGJyYW5jaGVzLmxlbmd0aDsgKytpKSB7XG4gICAgbWF0Y2hlcyA9IG1hdGNoUm91dGVCcmFuY2goYnJhbmNoZXNbaV0sIC8vIEluY29taW5nIHBhdGhuYW1lcyBhcmUgZ2VuZXJhbGx5IGVuY29kZWQgZnJvbSBlaXRoZXIgd2luZG93LmxvY2F0aW9uXG4gICAgLy8gb3IgZnJvbSByb3V0ZXIubmF2aWdhdGUsIGJ1dCB3ZSB3YW50IHRvIG1hdGNoIGFnYWluc3QgdGhlIHVuZW5jb2RlZFxuICAgIC8vIHBhdGhzIGluIHRoZSByb3V0ZSBkZWZpbml0aW9ucy4gIE1lbW9yeSByb3V0ZXIgbG9jYXRpb25zIHdvbid0IGJlXG4gICAgLy8gZW5jb2RlZCBoZXJlIGJ1dCB0aGVyZSBhbHNvIHNob3VsZG4ndCBiZSBhbnl0aGluZyB0byBkZWNvZGUgc28gdGhpc1xuICAgIC8vIHNob3VsZCBiZSBhIHNhZmUgb3BlcmF0aW9uLiAgVGhpcyBhdm9pZHMgbmVlZGluZyBtYXRjaFJvdXRlcyB0byBiZVxuICAgIC8vIGhpc3RvcnktYXdhcmUuXG4gICAgc2FmZWx5RGVjb2RlVVJJKHBhdGhuYW1lKSk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlcztcbn1cblxuZnVuY3Rpb24gZmxhdHRlblJvdXRlcyhyb3V0ZXMsIGJyYW5jaGVzLCBwYXJlbnRzTWV0YSwgcGFyZW50UGF0aCkge1xuICBpZiAoYnJhbmNoZXMgPT09IHZvaWQgMCkge1xuICAgIGJyYW5jaGVzID0gW107XG4gIH1cblxuICBpZiAocGFyZW50c01ldGEgPT09IHZvaWQgMCkge1xuICAgIHBhcmVudHNNZXRhID0gW107XG4gIH1cblxuICBpZiAocGFyZW50UGF0aCA9PT0gdm9pZCAwKSB7XG4gICAgcGFyZW50UGF0aCA9IFwiXCI7XG4gIH1cblxuICByb3V0ZXMuZm9yRWFjaCgocm91dGUsIGluZGV4KSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICByZWxhdGl2ZVBhdGg6IHJvdXRlLnBhdGggfHwgXCJcIixcbiAgICAgIGNhc2VTZW5zaXRpdmU6IHJvdXRlLmNhc2VTZW5zaXRpdmUgPT09IHRydWUsXG4gICAgICBjaGlsZHJlbkluZGV4OiBpbmRleCxcbiAgICAgIHJvdXRlXG4gICAgfTtcblxuICAgIGlmIChtZXRhLnJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKFwiL1wiKSkge1xuICAgICAgaW52YXJpYW50KG1ldGEucmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgocGFyZW50UGF0aCksIFwiQWJzb2x1dGUgcm91dGUgcGF0aCBcXFwiXCIgKyBtZXRhLnJlbGF0aXZlUGF0aCArIFwiXFxcIiBuZXN0ZWQgdW5kZXIgcGF0aCBcIiArIChcIlxcXCJcIiArIHBhcmVudFBhdGggKyBcIlxcXCIgaXMgbm90IHZhbGlkLiBBbiBhYnNvbHV0ZSBjaGlsZCByb3V0ZSBwYXRoIFwiKSArIFwibXVzdCBzdGFydCB3aXRoIHRoZSBjb21iaW5lZCBwYXRoIG9mIGFsbCBpdHMgcGFyZW50IHJvdXRlcy5cIik7XG4gICAgICBtZXRhLnJlbGF0aXZlUGF0aCA9IG1ldGEucmVsYXRpdmVQYXRoLnNsaWNlKHBhcmVudFBhdGgubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IGpvaW5QYXRocyhbcGFyZW50UGF0aCwgbWV0YS5yZWxhdGl2ZVBhdGhdKTtcbiAgICBsZXQgcm91dGVzTWV0YSA9IHBhcmVudHNNZXRhLmNvbmNhdChtZXRhKTsgLy8gQWRkIHRoZSBjaGlsZHJlbiBiZWZvcmUgYWRkaW5nIHRoaXMgcm91dGUgdG8gdGhlIGFycmF5IHNvIHdlIHRyYXZlcnNlIHRoZVxuICAgIC8vIHJvdXRlIHRyZWUgZGVwdGgtZmlyc3QgYW5kIGNoaWxkIHJvdXRlcyBhcHBlYXIgYmVmb3JlIHRoZWlyIHBhcmVudHMgaW5cbiAgICAvLyB0aGUgXCJmbGF0dGVuZWRcIiB2ZXJzaW9uLlxuXG4gICAgaWYgKHJvdXRlLmNoaWxkcmVuICYmIHJvdXRlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGludmFyaWFudCggLy8gT3VyIHR5cGVzIGtub3cgYmV0dGVyLCBidXQgcnVudGltZSBKUyBtYXkgbm90IVxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgcm91dGUuaW5kZXggIT09IHRydWUsIFwiSW5kZXggcm91dGVzIG11c3Qgbm90IGhhdmUgY2hpbGQgcm91dGVzLiBQbGVhc2UgcmVtb3ZlIFwiICsgKFwiYWxsIGNoaWxkIHJvdXRlcyBmcm9tIHJvdXRlIHBhdGggXFxcIlwiICsgcGF0aCArIFwiXFxcIi5cIikpO1xuICAgICAgZmxhdHRlblJvdXRlcyhyb3V0ZS5jaGlsZHJlbiwgYnJhbmNoZXMsIHJvdXRlc01ldGEsIHBhdGgpO1xuICAgIH0gLy8gUm91dGVzIHdpdGhvdXQgYSBwYXRoIHNob3VsZG4ndCBldmVyIG1hdGNoIGJ5IHRoZW1zZWx2ZXMgdW5sZXNzIHRoZXkgYXJlXG4gICAgLy8gaW5kZXggcm91dGVzLCBzbyBkb24ndCBhZGQgdGhlbSB0byB0aGUgbGlzdCBvZiBwb3NzaWJsZSBicmFuY2hlcy5cblxuXG4gICAgaWYgKHJvdXRlLnBhdGggPT0gbnVsbCAmJiAhcm91dGUuaW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBicmFuY2hlcy5wdXNoKHtcbiAgICAgIHBhdGgsXG4gICAgICBzY29yZTogY29tcHV0ZVNjb3JlKHBhdGgsIHJvdXRlLmluZGV4KSxcbiAgICAgIHJvdXRlc01ldGFcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBicmFuY2hlcztcbn1cblxuZnVuY3Rpb24gcmFua1JvdXRlQnJhbmNoZXMoYnJhbmNoZXMpIHtcbiAgYnJhbmNoZXMuc29ydCgoYSwgYikgPT4gYS5zY29yZSAhPT0gYi5zY29yZSA/IGIuc2NvcmUgLSBhLnNjb3JlIC8vIEhpZ2hlciBzY29yZSBmaXJzdFxuICA6IGNvbXBhcmVJbmRleGVzKGEucm91dGVzTWV0YS5tYXAobWV0YSA9PiBtZXRhLmNoaWxkcmVuSW5kZXgpLCBiLnJvdXRlc01ldGEubWFwKG1ldGEgPT4gbWV0YS5jaGlsZHJlbkluZGV4KSkpO1xufVxuXG5jb25zdCBwYXJhbVJlID0gL146XFx3KyQvO1xuY29uc3QgZHluYW1pY1NlZ21lbnRWYWx1ZSA9IDM7XG5jb25zdCBpbmRleFJvdXRlVmFsdWUgPSAyO1xuY29uc3QgZW1wdHlTZWdtZW50VmFsdWUgPSAxO1xuY29uc3Qgc3RhdGljU2VnbWVudFZhbHVlID0gMTA7XG5jb25zdCBzcGxhdFBlbmFsdHkgPSAtMjtcblxuY29uc3QgaXNTcGxhdCA9IHMgPT4gcyA9PT0gXCIqXCI7XG5cbmZ1bmN0aW9uIGNvbXB1dGVTY29yZShwYXRoLCBpbmRleCkge1xuICBsZXQgc2VnbWVudHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgbGV0IGluaXRpYWxTY29yZSA9IHNlZ21lbnRzLmxlbmd0aDtcblxuICBpZiAoc2VnbWVudHMuc29tZShpc1NwbGF0KSkge1xuICAgIGluaXRpYWxTY29yZSArPSBzcGxhdFBlbmFsdHk7XG4gIH1cblxuICBpZiAoaW5kZXgpIHtcbiAgICBpbml0aWFsU2NvcmUgKz0gaW5kZXhSb3V0ZVZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHNlZ21lbnRzLmZpbHRlcihzID0+ICFpc1NwbGF0KHMpKS5yZWR1Y2UoKHNjb3JlLCBzZWdtZW50KSA9PiBzY29yZSArIChwYXJhbVJlLnRlc3Qoc2VnbWVudCkgPyBkeW5hbWljU2VnbWVudFZhbHVlIDogc2VnbWVudCA9PT0gXCJcIiA/IGVtcHR5U2VnbWVudFZhbHVlIDogc3RhdGljU2VnbWVudFZhbHVlKSwgaW5pdGlhbFNjb3JlKTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZUluZGV4ZXMoYSwgYikge1xuICBsZXQgc2libGluZ3MgPSBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5zbGljZSgwLCAtMSkuZXZlcnkoKG4sIGkpID0+IG4gPT09IGJbaV0pO1xuICByZXR1cm4gc2libGluZ3MgPyAvLyBJZiB0d28gcm91dGVzIGFyZSBzaWJsaW5ncywgd2Ugc2hvdWxkIHRyeSB0byBtYXRjaCB0aGUgZWFybGllciBzaWJsaW5nXG4gIC8vIGZpcnN0LiBUaGlzIGFsbG93cyBwZW9wbGUgdG8gaGF2ZSBmaW5lLWdyYWluZWQgY29udHJvbCBvdmVyIHRoZSBtYXRjaGluZ1xuICAvLyBiZWhhdmlvciBieSBzaW1wbHkgcHV0dGluZyByb3V0ZXMgd2l0aCBpZGVudGljYWwgcGF0aHMgaW4gdGhlIG9yZGVyIHRoZXlcbiAgLy8gd2FudCB0aGVtIHRyaWVkLlxuICBhW2EubGVuZ3RoIC0gMV0gLSBiW2IubGVuZ3RoIC0gMV0gOiAvLyBPdGhlcndpc2UsIGl0IGRvZXNuJ3QgcmVhbGx5IG1ha2Ugc2Vuc2UgdG8gcmFuayBub24tc2libGluZ3MgYnkgaW5kZXgsXG4gIC8vIHNvIHRoZXkgc29ydCBlcXVhbGx5LlxuICAwO1xufVxuXG5mdW5jdGlvbiBtYXRjaFJvdXRlQnJhbmNoKGJyYW5jaCwgcGF0aG5hbWUpIHtcbiAgbGV0IHtcbiAgICByb3V0ZXNNZXRhXG4gIH0gPSBicmFuY2g7XG4gIGxldCBtYXRjaGVkUGFyYW1zID0ge307XG4gIGxldCBtYXRjaGVkUGF0aG5hbWUgPSBcIi9cIjtcbiAgbGV0IG1hdGNoZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc01ldGEubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgbWV0YSA9IHJvdXRlc01ldGFbaV07XG4gICAgbGV0IGVuZCA9IGkgPT09IHJvdXRlc01ldGEubGVuZ3RoIC0gMTtcbiAgICBsZXQgcmVtYWluaW5nUGF0aG5hbWUgPSBtYXRjaGVkUGF0aG5hbWUgPT09IFwiL1wiID8gcGF0aG5hbWUgOiBwYXRobmFtZS5zbGljZShtYXRjaGVkUGF0aG5hbWUubGVuZ3RoKSB8fCBcIi9cIjtcbiAgICBsZXQgbWF0Y2ggPSBtYXRjaFBhdGgoe1xuICAgICAgcGF0aDogbWV0YS5yZWxhdGl2ZVBhdGgsXG4gICAgICBjYXNlU2Vuc2l0aXZlOiBtZXRhLmNhc2VTZW5zaXRpdmUsXG4gICAgICBlbmRcbiAgICB9LCByZW1haW5pbmdQYXRobmFtZSk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gICAgT2JqZWN0LmFzc2lnbihtYXRjaGVkUGFyYW1zLCBtYXRjaC5wYXJhbXMpO1xuICAgIGxldCByb3V0ZSA9IG1ldGEucm91dGU7XG4gICAgbWF0Y2hlcy5wdXNoKHtcbiAgICAgIC8vIFRPRE86IENhbiB0aGlzIGFzIGJlIGF2b2lkZWQ/XG4gICAgICBwYXJhbXM6IG1hdGNoZWRQYXJhbXMsXG4gICAgICBwYXRobmFtZTogam9pblBhdGhzKFttYXRjaGVkUGF0aG5hbWUsIG1hdGNoLnBhdGhuYW1lXSksXG4gICAgICBwYXRobmFtZUJhc2U6IG5vcm1hbGl6ZVBhdGhuYW1lKGpvaW5QYXRocyhbbWF0Y2hlZFBhdGhuYW1lLCBtYXRjaC5wYXRobmFtZUJhc2VdKSksXG4gICAgICByb3V0ZVxuICAgIH0pO1xuXG4gICAgaWYgKG1hdGNoLnBhdGhuYW1lQmFzZSAhPT0gXCIvXCIpIHtcbiAgICAgIG1hdGNoZWRQYXRobmFtZSA9IGpvaW5QYXRocyhbbWF0Y2hlZFBhdGhuYW1lLCBtYXRjaC5wYXRobmFtZUJhc2VdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlcztcbn1cbi8qKlxuICogUmV0dXJucyBhIHBhdGggd2l0aCBwYXJhbXMgaW50ZXJwb2xhdGVkLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni91dGlscy9nZW5lcmF0ZS1wYXRoXG4gKi9cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBhdGgocGF0aCwgcGFyYW1zKSB7XG4gIGlmIChwYXJhbXMgPT09IHZvaWQgMCkge1xuICAgIHBhcmFtcyA9IHt9O1xuICB9XG5cbiAgcmV0dXJuIHBhdGgucmVwbGFjZSgvOihcXHcrKS9nLCAoXywga2V5KSA9PiB7XG4gICAgaW52YXJpYW50KHBhcmFtc1trZXldICE9IG51bGwsIFwiTWlzc2luZyBcXFwiOlwiICsga2V5ICsgXCJcXFwiIHBhcmFtXCIpO1xuICAgIHJldHVybiBwYXJhbXNba2V5XTtcbiAgfSkucmVwbGFjZSgvKFxcLz8pXFwqLywgKF8sIHByZWZpeCwgX18sIHN0cikgPT4ge1xuICAgIGNvbnN0IHN0YXIgPSBcIipcIjtcblxuICAgIGlmIChwYXJhbXNbc3Rhcl0gPT0gbnVsbCkge1xuICAgICAgLy8gSWYgbm8gc3BsYXQgd2FzIHByb3ZpZGVkLCB0cmltIHRoZSB0cmFpbGluZyBzbGFzaCBfdW5sZXNzXyBpdCdzXG4gICAgICAvLyB0aGUgZW50aXJlIHBhdGhcbiAgICAgIHJldHVybiBzdHIgPT09IFwiLypcIiA/IFwiL1wiIDogXCJcIjtcbiAgICB9IC8vIEFwcGx5IHRoZSBzcGxhdFxuXG5cbiAgICByZXR1cm4gXCJcIiArIHByZWZpeCArIHBhcmFtc1tzdGFyXTtcbiAgfSk7XG59XG4vKipcbiAqIFBlcmZvcm1zIHBhdHRlcm4gbWF0Y2hpbmcgb24gYSBVUkwgcGF0aG5hbWUgYW5kIHJldHVybnMgaW5mb3JtYXRpb24gYWJvdXRcbiAqIHRoZSBtYXRjaC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvdXRpbHMvbWF0Y2gtcGF0aFxuICovXG5cbmZ1bmN0aW9uIG1hdGNoUGF0aChwYXR0ZXJuLCBwYXRobmFtZSkge1xuICBpZiAodHlwZW9mIHBhdHRlcm4gPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXR0ZXJuID0ge1xuICAgICAgcGF0aDogcGF0dGVybixcbiAgICAgIGNhc2VTZW5zaXRpdmU6IGZhbHNlLFxuICAgICAgZW5kOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIGxldCBbbWF0Y2hlciwgcGFyYW1OYW1lc10gPSBjb21waWxlUGF0aChwYXR0ZXJuLnBhdGgsIHBhdHRlcm4uY2FzZVNlbnNpdGl2ZSwgcGF0dGVybi5lbmQpO1xuICBsZXQgbWF0Y2ggPSBwYXRobmFtZS5tYXRjaChtYXRjaGVyKTtcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG4gIGxldCBtYXRjaGVkUGF0aG5hbWUgPSBtYXRjaFswXTtcbiAgbGV0IHBhdGhuYW1lQmFzZSA9IG1hdGNoZWRQYXRobmFtZS5yZXBsYWNlKC8oLilcXC8rJC8sIFwiJDFcIik7XG4gIGxldCBjYXB0dXJlR3JvdXBzID0gbWF0Y2guc2xpY2UoMSk7XG4gIGxldCBwYXJhbXMgPSBwYXJhbU5hbWVzLnJlZHVjZSgobWVtbywgcGFyYW1OYW1lLCBpbmRleCkgPT4ge1xuICAgIC8vIFdlIG5lZWQgdG8gY29tcHV0ZSB0aGUgcGF0aG5hbWVCYXNlIGhlcmUgdXNpbmcgdGhlIHJhdyBzcGxhdCB2YWx1ZVxuICAgIC8vIGluc3RlYWQgb2YgdXNpbmcgcGFyYW1zW1wiKlwiXSBsYXRlciBiZWNhdXNlIGl0IHdpbGwgYmUgZGVjb2RlZCB0aGVuXG4gICAgaWYgKHBhcmFtTmFtZSA9PT0gXCIqXCIpIHtcbiAgICAgIGxldCBzcGxhdFZhbHVlID0gY2FwdHVyZUdyb3Vwc1tpbmRleF0gfHwgXCJcIjtcbiAgICAgIHBhdGhuYW1lQmFzZSA9IG1hdGNoZWRQYXRobmFtZS5zbGljZSgwLCBtYXRjaGVkUGF0aG5hbWUubGVuZ3RoIC0gc3BsYXRWYWx1ZS5sZW5ndGgpLnJlcGxhY2UoLyguKVxcLyskLywgXCIkMVwiKTtcbiAgICB9XG5cbiAgICBtZW1vW3BhcmFtTmFtZV0gPSBzYWZlbHlEZWNvZGVVUklDb21wb25lbnQoY2FwdHVyZUdyb3Vwc1tpbmRleF0gfHwgXCJcIiwgcGFyYW1OYW1lKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwge30pO1xuICByZXR1cm4ge1xuICAgIHBhcmFtcyxcbiAgICBwYXRobmFtZTogbWF0Y2hlZFBhdGhuYW1lLFxuICAgIHBhdGhuYW1lQmFzZSxcbiAgICBwYXR0ZXJuXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXRoKHBhdGgsIGNhc2VTZW5zaXRpdmUsIGVuZCkge1xuICBpZiAoY2FzZVNlbnNpdGl2ZSA9PT0gdm9pZCAwKSB7XG4gICAgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdm9pZCAwKSB7XG4gICAgZW5kID0gdHJ1ZTtcbiAgfVxuXG4gIHdhcm5pbmcocGF0aCA9PT0gXCIqXCIgfHwgIXBhdGguZW5kc1dpdGgoXCIqXCIpIHx8IHBhdGguZW5kc1dpdGgoXCIvKlwiKSwgXCJSb3V0ZSBwYXRoIFxcXCJcIiArIHBhdGggKyBcIlxcXCIgd2lsbCBiZSB0cmVhdGVkIGFzIGlmIGl0IHdlcmUgXCIgKyAoXCJcXFwiXCIgKyBwYXRoLnJlcGxhY2UoL1xcKiQvLCBcIi8qXCIpICsgXCJcXFwiIGJlY2F1c2UgdGhlIGAqYCBjaGFyYWN0ZXIgbXVzdCBcIikgKyBcImFsd2F5cyBmb2xsb3cgYSBgL2AgaW4gdGhlIHBhdHRlcm4uIFRvIGdldCByaWQgb2YgdGhpcyB3YXJuaW5nLCBcIiArIChcInBsZWFzZSBjaGFuZ2UgdGhlIHJvdXRlIHBhdGggdG8gXFxcIlwiICsgcGF0aC5yZXBsYWNlKC9cXCokLywgXCIvKlwiKSArIFwiXFxcIi5cIikpO1xuICBsZXQgcGFyYW1OYW1lcyA9IFtdO1xuICBsZXQgcmVnZXhwU291cmNlID0gXCJeXCIgKyBwYXRoLnJlcGxhY2UoL1xcLypcXCo/JC8sIFwiXCIpIC8vIElnbm9yZSB0cmFpbGluZyAvIGFuZCAvKiwgd2UnbGwgaGFuZGxlIGl0IGJlbG93XG4gIC5yZXBsYWNlKC9eXFwvKi8sIFwiL1wiKSAvLyBNYWtlIHN1cmUgaXQgaGFzIGEgbGVhZGluZyAvXG4gIC5yZXBsYWNlKC9bXFxcXC4qK14kP3t9fCgpW1xcXV0vZywgXCJcXFxcJCZcIikgLy8gRXNjYXBlIHNwZWNpYWwgcmVnZXggY2hhcnNcbiAgLnJlcGxhY2UoLzooXFx3KykvZywgKF8sIHBhcmFtTmFtZSkgPT4ge1xuICAgIHBhcmFtTmFtZXMucHVzaChwYXJhbU5hbWUpO1xuICAgIHJldHVybiBcIihbXlxcXFwvXSspXCI7XG4gIH0pO1xuXG4gIGlmIChwYXRoLmVuZHNXaXRoKFwiKlwiKSkge1xuICAgIHBhcmFtTmFtZXMucHVzaChcIipcIik7XG4gICAgcmVnZXhwU291cmNlICs9IHBhdGggPT09IFwiKlwiIHx8IHBhdGggPT09IFwiLypcIiA/IFwiKC4qKSRcIiAvLyBBbHJlYWR5IG1hdGNoZWQgdGhlIGluaXRpYWwgLywganVzdCBtYXRjaCB0aGUgcmVzdFxuICAgIDogXCIoPzpcXFxcLyguKyl8XFxcXC8qKSRcIjsgLy8gRG9uJ3QgaW5jbHVkZSB0aGUgLyBpbiBwYXJhbXNbXCIqXCJdXG4gIH0gZWxzZSBpZiAoZW5kKSB7XG4gICAgLy8gV2hlbiBtYXRjaGluZyB0byB0aGUgZW5kLCBpZ25vcmUgdHJhaWxpbmcgc2xhc2hlc1xuICAgIHJlZ2V4cFNvdXJjZSArPSBcIlxcXFwvKiRcIjtcbiAgfSBlbHNlIGlmIChwYXRoICE9PSBcIlwiICYmIHBhdGggIT09IFwiL1wiKSB7XG4gICAgLy8gSWYgb3VyIHBhdGggaXMgbm9uLWVtcHR5IGFuZCBjb250YWlucyBhbnl0aGluZyBiZXlvbmQgYW4gaW5pdGlhbCBzbGFzaCxcbiAgICAvLyB0aGVuIHdlIGhhdmUgX3NvbWVfIGZvcm0gb2YgcGF0aCBpbiBvdXIgcmVnZXggc28gd2Ugc2hvdWxkIGV4cGVjdCB0b1xuICAgIC8vIG1hdGNoIG9ubHkgaWYgd2UgZmluZCB0aGUgZW5kIG9mIHRoaXMgcGF0aCBzZWdtZW50LiAgTG9vayBmb3IgYW4gb3B0aW9uYWxcbiAgICAvLyBub24tY2FwdHVyZWQgdHJhaWxpbmcgc2xhc2ggKHRvIG1hdGNoIGEgcG9ydGlvbiBvZiB0aGUgVVJMKSBvciB0aGUgZW5kXG4gICAgLy8gb2YgdGhlIHBhdGggKGlmIHdlJ3ZlIG1hdGNoZWQgdG8gdGhlIGVuZCkuICBXZSB1c2VkIHRvIGRvIHRoaXMgd2l0aCBhXG4gICAgLy8gd29yZCBib3VuZGFyeSBidXQgdGhhdCBnaXZlcyBmYWxzZSBwb3NpdGl2ZXMgb24gcm91dGVzIGxpa2VcbiAgICAvLyAvdXNlci1wcmVmZXJlbmNlcyBzaW5jZSBgLWAgY291bnRzIGFzIGEgd29yZCBib3VuZGFyeS5cbiAgICByZWdleHBTb3VyY2UgKz0gXCIoPzooPz1cXFxcL3wkKSlcIjtcbiAgfSBlbHNlIDtcblxuICBsZXQgbWF0Y2hlciA9IG5ldyBSZWdFeHAocmVnZXhwU291cmNlLCBjYXNlU2Vuc2l0aXZlID8gdW5kZWZpbmVkIDogXCJpXCIpO1xuICByZXR1cm4gW21hdGNoZXIsIHBhcmFtTmFtZXNdO1xufVxuXG5mdW5jdGlvbiBzYWZlbHlEZWNvZGVVUkkodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB3YXJuaW5nKGZhbHNlLCBcIlRoZSBVUkwgcGF0aCBcXFwiXCIgKyB2YWx1ZSArIFwiXFxcIiBjb3VsZCBub3QgYmUgZGVjb2RlZCBiZWNhdXNlIGl0IGlzIGlzIGEgXCIgKyBcIm1hbGZvcm1lZCBVUkwgc2VnbWVudC4gVGhpcyBpcyBwcm9iYWJseSBkdWUgdG8gYSBiYWQgcGVyY2VudCBcIiArIChcImVuY29kaW5nIChcIiArIGVycm9yICsgXCIpLlwiKSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVseURlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSwgcGFyYW1OYW1lKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgd2FybmluZyhmYWxzZSwgXCJUaGUgdmFsdWUgZm9yIHRoZSBVUkwgcGFyYW0gXFxcIlwiICsgcGFyYW1OYW1lICsgXCJcXFwiIHdpbGwgbm90IGJlIGRlY29kZWQgYmVjYXVzZVwiICsgKFwiIHRoZSBzdHJpbmcgXFxcIlwiICsgdmFsdWUgKyBcIlxcXCIgaXMgYSBtYWxmb3JtZWQgVVJMIHNlZ21lbnQuIFRoaXMgaXMgcHJvYmFibHlcIikgKyAoXCIgZHVlIHRvIGEgYmFkIHBlcmNlbnQgZW5jb2RpbmcgKFwiICsgZXJyb3IgKyBcIikuXCIpKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5cbmZ1bmN0aW9uIHN0cmlwQmFzZW5hbWUocGF0aG5hbWUsIGJhc2VuYW1lKSB7XG4gIGlmIChiYXNlbmFtZSA9PT0gXCIvXCIpIHJldHVybiBwYXRobmFtZTtcblxuICBpZiAoIXBhdGhuYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChiYXNlbmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9IC8vIFdlIHdhbnQgdG8gbGVhdmUgdHJhaWxpbmcgc2xhc2ggYmVoYXZpb3IgaW4gdGhlIHVzZXIncyBjb250cm9sLCBzbyBpZiB0aGV5XG4gIC8vIHNwZWNpZnkgYSBiYXNlbmFtZSB3aXRoIGEgdHJhaWxpbmcgc2xhc2gsIHdlIHNob3VsZCBzdXBwb3J0IGl0XG5cblxuICBsZXQgc3RhcnRJbmRleCA9IGJhc2VuYW1lLmVuZHNXaXRoKFwiL1wiKSA/IGJhc2VuYW1lLmxlbmd0aCAtIDEgOiBiYXNlbmFtZS5sZW5ndGg7XG4gIGxldCBuZXh0Q2hhciA9IHBhdGhuYW1lLmNoYXJBdChzdGFydEluZGV4KTtcblxuICBpZiAobmV4dENoYXIgJiYgbmV4dENoYXIgIT09IFwiL1wiKSB7XG4gICAgLy8gcGF0aG5hbWUgZG9lcyBub3Qgc3RhcnQgd2l0aCBiYXNlbmFtZS9cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXRobmFtZS5zbGljZShzdGFydEluZGV4KSB8fCBcIi9cIjtcbn1cbmZ1bmN0aW9uIGludmFyaWFudCh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHdhcm5pbmcoY29uZCwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IFJvdXRlciFcbiAgICAgIC8vXG4gICAgICAvLyBUaGlzIGVycm9yIGlzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHlvdSBjYW4gbW9yZSBlYXNpbHlcbiAgICAgIC8vIGZpbmQgdGhlIHNvdXJjZSBmb3IgYSB3YXJuaW5nIHRoYXQgYXBwZWFycyBpbiB0aGUgY29uc29sZSBieVxuICAgICAgLy8gZW5hYmxpbmcgXCJwYXVzZSBvbiBleGNlcHRpb25zXCIgaW4geW91ciBKYXZhU2NyaXB0IGRlYnVnZ2VyLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG59XG4vKipcbiAqIFJldHVybnMgYSByZXNvbHZlZCBwYXRoIG9iamVjdCByZWxhdGl2ZSB0byB0aGUgZ2l2ZW4gcGF0aG5hbWUuXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L3V0aWxzL3Jlc29sdmUtcGF0aFxuICovXG5cbmZ1bmN0aW9uIHJlc29sdmVQYXRoKHRvLCBmcm9tUGF0aG5hbWUpIHtcbiAgaWYgKGZyb21QYXRobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgZnJvbVBhdGhuYW1lID0gXCIvXCI7XG4gIH1cblxuICBsZXQge1xuICAgIHBhdGhuYW1lOiB0b1BhdGhuYW1lLFxuICAgIHNlYXJjaCA9IFwiXCIsXG4gICAgaGFzaCA9IFwiXCJcbiAgfSA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IHBhcnNlUGF0aCh0bykgOiB0bztcbiAgbGV0IHBhdGhuYW1lID0gdG9QYXRobmFtZSA/IHRvUGF0aG5hbWUuc3RhcnRzV2l0aChcIi9cIikgPyB0b1BhdGhuYW1lIDogcmVzb2x2ZVBhdGhuYW1lKHRvUGF0aG5hbWUsIGZyb21QYXRobmFtZSkgOiBmcm9tUGF0aG5hbWU7XG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBub3JtYWxpemVTZWFyY2goc2VhcmNoKSxcbiAgICBoYXNoOiBub3JtYWxpemVIYXNoKGhhc2gpXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVQYXRobmFtZShyZWxhdGl2ZVBhdGgsIGZyb21QYXRobmFtZSkge1xuICBsZXQgc2VnbWVudHMgPSBmcm9tUGF0aG5hbWUucmVwbGFjZSgvXFwvKyQvLCBcIlwiKS5zcGxpdChcIi9cIik7XG4gIGxldCByZWxhdGl2ZVNlZ21lbnRzID0gcmVsYXRpdmVQYXRoLnNwbGl0KFwiL1wiKTtcbiAgcmVsYXRpdmVTZWdtZW50cy5mb3JFYWNoKHNlZ21lbnQgPT4ge1xuICAgIGlmIChzZWdtZW50ID09PSBcIi4uXCIpIHtcbiAgICAgIC8vIEtlZXAgdGhlIHJvb3QgXCJcIiBzZWdtZW50IHNvIHRoZSBwYXRobmFtZSBzdGFydHMgYXQgL1xuICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA+IDEpIHNlZ21lbnRzLnBvcCgpO1xuICAgIH0gZWxzZSBpZiAoc2VnbWVudCAhPT0gXCIuXCIpIHtcbiAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHNlZ21lbnRzLmxlbmd0aCA+IDEgPyBzZWdtZW50cy5qb2luKFwiL1wiKSA6IFwiL1wiO1xufVxuXG5mdW5jdGlvbiBnZXRJbnZhbGlkUGF0aEVycm9yKGNoYXIsIGZpZWxkLCBkZXN0LCBwYXRoKSB7XG4gIHJldHVybiBcIkNhbm5vdCBpbmNsdWRlIGEgJ1wiICsgY2hhciArIFwiJyBjaGFyYWN0ZXIgaW4gYSBtYW51YWxseSBzcGVjaWZpZWQgXCIgKyAoXCJgdG8uXCIgKyBmaWVsZCArIFwiYCBmaWVsZCBbXCIgKyBKU09OLnN0cmluZ2lmeShwYXRoKSArIFwiXS4gIFBsZWFzZSBzZXBhcmF0ZSBpdCBvdXQgdG8gdGhlIFwiKSArIChcImB0by5cIiArIGRlc3QgKyBcImAgZmllbGQuIEFsdGVybmF0aXZlbHkgeW91IG1heSBwcm92aWRlIHRoZSBmdWxsIHBhdGggYXMgXCIpICsgXCJhIHN0cmluZyBpbiA8TGluayB0bz1cXFwiLi4uXFxcIj4gYW5kIHRoZSByb3V0ZXIgd2lsbCBwYXJzZSBpdCBmb3IgeW91LlwiO1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICpcbiAqIFdoZW4gcHJvY2Vzc2luZyByZWxhdGl2ZSBuYXZpZ2F0aW9uIHdlIHdhbnQgdG8gaWdub3JlIGFuY2VzdG9yIHJvdXRlcyB0aGF0XG4gKiBkbyBub3QgY29udHJpYnV0ZSB0byB0aGUgcGF0aCwgc3VjaCB0aGF0IGluZGV4L3BhdGhsZXNzIGxheW91dCByb3V0ZXMgZG9uJ3RcbiAqIGludGVyZmVyZS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgd2hlbiBtb3ZpbmcgYSByb3V0ZSBlbGVtZW50IGludG8gYW4gaW5kZXggcm91dGUgYW5kL29yIGFcbiAqIHBhdGhsZXNzIGxheW91dCByb3V0ZSwgcmVsYXRpdmUgbGluayBiZWhhdmlvciBjb250YWluZWQgd2l0aGluIHNob3VsZCBzdGF5XG4gKiB0aGUgc2FtZS4gIEJvdGggb2YgdGhlIGZvbGxvd2luZyBleGFtcGxlcyBzaG91bGQgbGluayBiYWNrIHRvIHRoZSByb290OlxuICpcbiAqICAgPFJvdXRlIHBhdGg9XCIvXCI+XG4gKiAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50c1wiIGVsZW1lbnQ9ezxMaW5rIHRvPVwiLi5cIn0+XG4gKiAgIDwvUm91dGU+XG4gKlxuICogICA8Um91dGUgcGF0aD1cIi9cIj5cbiAqICAgICA8Um91dGUgcGF0aD1cImFjY291bnRzXCI+XG4gKiAgICAgICA8Um91dGUgZWxlbWVudD17PEFjY291bnRzTGF5b3V0IC8+fT4gICAgICAgLy8gPC0tIERvZXMgbm90IGNvbnRyaWJ1dGVcbiAqICAgICAgICAgPFJvdXRlIGluZGV4IGVsZW1lbnQ9ezxMaW5rIHRvPVwiLi5cIn0gLz4gIC8vIDwtLSBEb2VzIG5vdCBjb250cmlidXRlXG4gKiAgICAgICA8L1JvdXRlXG4gKiAgICAgPC9Sb3V0ZT5cbiAqICAgPC9Sb3V0ZT5cbiAqL1xuXG5cbmZ1bmN0aW9uIGdldFBhdGhDb250cmlidXRpbmdNYXRjaGVzKG1hdGNoZXMpIHtcbiAgcmV0dXJuIG1hdGNoZXMuZmlsdGVyKChtYXRjaCwgaW5kZXgpID0+IGluZGV4ID09PSAwIHx8IG1hdGNoLnJvdXRlLnBhdGggJiYgbWF0Y2gucm91dGUucGF0aC5sZW5ndGggPiAwKTtcbn1cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiByZXNvbHZlVG8odG9BcmcsIHJvdXRlUGF0aG5hbWVzLCBsb2NhdGlvblBhdGhuYW1lLCBpc1BhdGhSZWxhdGl2ZSkge1xuICBpZiAoaXNQYXRoUmVsYXRpdmUgPT09IHZvaWQgMCkge1xuICAgIGlzUGF0aFJlbGF0aXZlID0gZmFsc2U7XG4gIH1cblxuICBsZXQgdG87XG5cbiAgaWYgKHR5cGVvZiB0b0FyZyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHRvID0gcGFyc2VQYXRoKHRvQXJnKTtcbiAgfSBlbHNlIHtcbiAgICB0byA9IF9leHRlbmRzKHt9LCB0b0FyZyk7XG4gICAgaW52YXJpYW50KCF0by5wYXRobmFtZSB8fCAhdG8ucGF0aG5hbWUuaW5jbHVkZXMoXCI/XCIpLCBnZXRJbnZhbGlkUGF0aEVycm9yKFwiP1wiLCBcInBhdGhuYW1lXCIsIFwic2VhcmNoXCIsIHRvKSk7XG4gICAgaW52YXJpYW50KCF0by5wYXRobmFtZSB8fCAhdG8ucGF0aG5hbWUuaW5jbHVkZXMoXCIjXCIpLCBnZXRJbnZhbGlkUGF0aEVycm9yKFwiI1wiLCBcInBhdGhuYW1lXCIsIFwiaGFzaFwiLCB0bykpO1xuICAgIGludmFyaWFudCghdG8uc2VhcmNoIHx8ICF0by5zZWFyY2guaW5jbHVkZXMoXCIjXCIpLCBnZXRJbnZhbGlkUGF0aEVycm9yKFwiI1wiLCBcInNlYXJjaFwiLCBcImhhc2hcIiwgdG8pKTtcbiAgfVxuXG4gIGxldCBpc0VtcHR5UGF0aCA9IHRvQXJnID09PSBcIlwiIHx8IHRvLnBhdGhuYW1lID09PSBcIlwiO1xuICBsZXQgdG9QYXRobmFtZSA9IGlzRW1wdHlQYXRoID8gXCIvXCIgOiB0by5wYXRobmFtZTtcbiAgbGV0IGZyb207IC8vIFJvdXRpbmcgaXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgcGF0aG5hbWUgaWYgZXhwbGljaXRseSByZXF1ZXN0ZWQuXG4gIC8vXG4gIC8vIElmIGEgcGF0aG5hbWUgaXMgZXhwbGljaXRseSBwcm92aWRlZCBpbiBgdG9gLCBpdCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlXG4gIC8vIHJvdXRlIGNvbnRleHQuIFRoaXMgaXMgZXhwbGFpbmVkIGluIGBOb3RlIG9uIGA8TGluayB0bz5gIHZhbHVlc2AgaW4gb3VyXG4gIC8vIG1pZ3JhdGlvbiBndWlkZSBmcm9tIHY1IGFzIGEgbWVhbnMgb2YgZGlzYW1iaWd1YXRpb24gYmV0d2VlbiBgdG9gIHZhbHVlc1xuICAvLyB0aGF0IGJlZ2luIHdpdGggYC9gIGFuZCB0aG9zZSB0aGF0IGRvIG5vdC4gSG93ZXZlciwgdGhpcyBpcyBwcm9ibGVtYXRpYyBmb3JcbiAgLy8gYHRvYCB2YWx1ZXMgdGhhdCBkbyBub3QgcHJvdmlkZSBhIHBhdGhuYW1lLiBgdG9gIGNhbiBzaW1wbHkgYmUgYSBzZWFyY2ggb3JcbiAgLy8gaGFzaCBzdHJpbmcsIGluIHdoaWNoIGNhc2Ugd2Ugc2hvdWxkIGFzc3VtZSB0aGF0IHRoZSBuYXZpZ2F0aW9uIGlzIHJlbGF0aXZlXG4gIC8vIHRvIHRoZSBjdXJyZW50IGxvY2F0aW9uJ3MgcGF0aG5hbWUgYW5kICpub3QqIHRoZSByb3V0ZSBwYXRobmFtZS5cblxuICBpZiAoaXNQYXRoUmVsYXRpdmUgfHwgdG9QYXRobmFtZSA9PSBudWxsKSB7XG4gICAgZnJvbSA9IGxvY2F0aW9uUGF0aG5hbWU7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJvdXRlUGF0aG5hbWVJbmRleCA9IHJvdXRlUGF0aG5hbWVzLmxlbmd0aCAtIDE7XG5cbiAgICBpZiAodG9QYXRobmFtZS5zdGFydHNXaXRoKFwiLi5cIikpIHtcbiAgICAgIGxldCB0b1NlZ21lbnRzID0gdG9QYXRobmFtZS5zcGxpdChcIi9cIik7IC8vIEVhY2ggbGVhZGluZyAuLiBzZWdtZW50IG1lYW5zIFwiZ28gdXAgb25lIHJvdXRlXCIgaW5zdGVhZCBvZiBcImdvIHVwIG9uZVxuICAgICAgLy8gVVJMIHNlZ21lbnRcIi4gIFRoaXMgaXMgYSBrZXkgZGlmZmVyZW5jZSBmcm9tIGhvdyA8YSBocmVmPiB3b3JrcyBhbmQgYVxuICAgICAgLy8gbWFqb3IgcmVhc29uIHdlIGNhbGwgdGhpcyBhIFwidG9cIiB2YWx1ZSBpbnN0ZWFkIG9mIGEgXCJocmVmXCIuXG5cbiAgICAgIHdoaWxlICh0b1NlZ21lbnRzWzBdID09PSBcIi4uXCIpIHtcbiAgICAgICAgdG9TZWdtZW50cy5zaGlmdCgpO1xuICAgICAgICByb3V0ZVBhdGhuYW1lSW5kZXggLT0gMTtcbiAgICAgIH1cblxuICAgICAgdG8ucGF0aG5hbWUgPSB0b1NlZ21lbnRzLmpvaW4oXCIvXCIpO1xuICAgIH0gLy8gSWYgdGhlcmUgYXJlIG1vcmUgXCIuLlwiIHNlZ21lbnRzIHRoYW4gcGFyZW50IHJvdXRlcywgcmVzb2x2ZSByZWxhdGl2ZSB0b1xuICAgIC8vIHRoZSByb290IC8gVVJMLlxuXG5cbiAgICBmcm9tID0gcm91dGVQYXRobmFtZUluZGV4ID49IDAgPyByb3V0ZVBhdGhuYW1lc1tyb3V0ZVBhdGhuYW1lSW5kZXhdIDogXCIvXCI7XG4gIH1cblxuICBsZXQgcGF0aCA9IHJlc29sdmVQYXRoKHRvLCBmcm9tKTsgLy8gRW5zdXJlIHRoZSBwYXRobmFtZSBoYXMgYSB0cmFpbGluZyBzbGFzaCBpZiB0aGUgb3JpZ2luYWwgXCJ0b1wiIGhhZCBvbmVcblxuICBsZXQgaGFzRXhwbGljaXRUcmFpbGluZ1NsYXNoID0gdG9QYXRobmFtZSAmJiB0b1BhdGhuYW1lICE9PSBcIi9cIiAmJiB0b1BhdGhuYW1lLmVuZHNXaXRoKFwiL1wiKTsgLy8gT3IgaWYgdGhpcyB3YXMgYSBsaW5rIHRvIHRoZSBjdXJyZW50IHBhdGggd2hpY2ggaGFzIGEgdHJhaWxpbmcgc2xhc2hcblxuICBsZXQgaGFzQ3VycmVudFRyYWlsaW5nU2xhc2ggPSAoaXNFbXB0eVBhdGggfHwgdG9QYXRobmFtZSA9PT0gXCIuXCIpICYmIGxvY2F0aW9uUGF0aG5hbWUuZW5kc1dpdGgoXCIvXCIpO1xuXG4gIGlmICghcGF0aC5wYXRobmFtZS5lbmRzV2l0aChcIi9cIikgJiYgKGhhc0V4cGxpY2l0VHJhaWxpbmdTbGFzaCB8fCBoYXNDdXJyZW50VHJhaWxpbmdTbGFzaCkpIHtcbiAgICBwYXRoLnBhdGhuYW1lICs9IFwiL1wiO1xuICB9XG5cbiAgcmV0dXJuIHBhdGg7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2V0VG9QYXRobmFtZSh0bykge1xuICAvLyBFbXB0eSBzdHJpbmdzIHNob3VsZCBiZSB0cmVhdGVkIHRoZSBzYW1lIGFzIC8gcGF0aHNcbiAgcmV0dXJuIHRvID09PSBcIlwiIHx8IHRvLnBhdGhuYW1lID09PSBcIlwiID8gXCIvXCIgOiB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyBwYXJzZVBhdGgodG8pLnBhdGhuYW1lIDogdG8ucGF0aG5hbWU7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3Qgam9pblBhdGhzID0gcGF0aHMgPT4gcGF0aHMuam9pbihcIi9cIikucmVwbGFjZSgvXFwvXFwvKy9nLCBcIi9cIik7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3Qgbm9ybWFsaXplUGF0aG5hbWUgPSBwYXRobmFtZSA9PiBwYXRobmFtZS5yZXBsYWNlKC9cXC8rJC8sIFwiXCIpLnJlcGxhY2UoL15cXC8qLywgXCIvXCIpO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5cbmNvbnN0IG5vcm1hbGl6ZVNlYXJjaCA9IHNlYXJjaCA9PiAhc2VhcmNoIHx8IHNlYXJjaCA9PT0gXCI/XCIgPyBcIlwiIDogc2VhcmNoLnN0YXJ0c1dpdGgoXCI/XCIpID8gc2VhcmNoIDogXCI/XCIgKyBzZWFyY2g7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cblxuY29uc3Qgbm9ybWFsaXplSGFzaCA9IGhhc2ggPT4gIWhhc2ggfHwgaGFzaCA9PT0gXCIjXCIgPyBcIlwiIDogaGFzaC5zdGFydHNXaXRoKFwiI1wiKSA/IGhhc2ggOiBcIiNcIiArIGhhc2g7XG4vKipcbiAqIFRoaXMgaXMgYSBzaG9ydGN1dCBmb3IgY3JlYXRpbmcgYGFwcGxpY2F0aW9uL2pzb25gIHJlc3BvbnNlcy4gQ29udmVydHMgYGRhdGFgXG4gKiB0byBKU09OIGFuZCBzZXRzIHRoZSBgQ29udGVudC1UeXBlYCBoZWFkZXIuXG4gKi9cblxuY29uc3QganNvbiA9IGZ1bmN0aW9uIGpzb24oZGF0YSwgaW5pdCkge1xuICBpZiAoaW5pdCA9PT0gdm9pZCAwKSB7XG4gICAgaW5pdCA9IHt9O1xuICB9XG5cbiAgbGV0IHJlc3BvbnNlSW5pdCA9IHR5cGVvZiBpbml0ID09PSBcIm51bWJlclwiID8ge1xuICAgIHN0YXR1czogaW5pdFxuICB9IDogaW5pdDtcbiAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXNwb25zZUluaXQuaGVhZGVycyk7XG5cbiAgaWYgKCFoZWFkZXJzLmhhcyhcIkNvbnRlbnQtVHlwZVwiKSkge1xuICAgIGhlYWRlcnMuc2V0KFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSksIF9leHRlbmRzKHt9LCByZXNwb25zZUluaXQsIHtcbiAgICBoZWFkZXJzXG4gIH0pKTtcbn07XG5jbGFzcyBBYm9ydGVkRGVmZXJyZWRFcnJvciBleHRlbmRzIEVycm9yIHt9XG5jbGFzcyBEZWZlcnJlZERhdGEge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5wZW5kaW5nS2V5cyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLnN1YnNjcmliZXIgPSB1bmRlZmluZWQ7XG4gICAgaW52YXJpYW50KGRhdGEgJiYgdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSksIFwiZGVmZXIoKSBvbmx5IGFjY2VwdHMgcGxhaW4gb2JqZWN0c1wiKTsgLy8gU2V0IHVwIGFuIEFib3J0Q29udHJvbGxlciArIFByb21pc2Ugd2UgY2FuIHJhY2UgYWdhaW5zdCB0byBleGl0IGVhcmx5XG4gICAgLy8gY2FuY2VsbGF0aW9uXG5cbiAgICBsZXQgcmVqZWN0O1xuICAgIHRoaXMuYWJvcnRQcm9taXNlID0gbmV3IFByb21pc2UoKF8sIHIpID0+IHJlamVjdCA9IHIpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGxldCBvbkFib3J0ID0gKCkgPT4gcmVqZWN0KG5ldyBBYm9ydGVkRGVmZXJyZWRFcnJvcihcIkRlZmVycmVkIGRhdGEgYWJvcnRlZFwiKSk7XG5cbiAgICB0aGlzLnVubGlzdGVuQWJvcnRTaWduYWwgPSAoKSA9PiB0aGlzLmNvbnRyb2xsZXIuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBvbkFib3J0KTtcblxuICAgIHRoaXMuY29udHJvbGxlci5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIG9uQWJvcnQpO1xuICAgIHRoaXMuZGF0YSA9IE9iamVjdC5lbnRyaWVzKGRhdGEpLnJlZHVjZSgoYWNjLCBfcmVmKSA9PiB7XG4gICAgICBsZXQgW2tleSwgdmFsdWVdID0gX3JlZjtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFjYywge1xuICAgICAgICBba2V5XTogdGhpcy50cmFja1Byb21pc2Uoa2V5LCB2YWx1ZSlcbiAgICAgIH0pO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHRyYWNrUHJvbWlzZShrZXksIHZhbHVlKSB7XG4gICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMucGVuZGluZ0tleXMuYWRkKGtleSk7IC8vIFdlIHN0b3JlIGEgbGl0dGxlIHdyYXBwZXIgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZXh0ZW5kZWQgd2l0aFxuICAgIC8vIF9kYXRhL19lcnJvciBwcm9wcyB1cG9uIHJlc29sdmUvcmVqZWN0XG5cbiAgICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmFjZShbdmFsdWUsIHRoaXMuYWJvcnRQcm9taXNlXSkudGhlbihkYXRhID0+IHRoaXMub25TZXR0bGUocHJvbWlzZSwga2V5LCBudWxsLCBkYXRhKSwgZXJyb3IgPT4gdGhpcy5vblNldHRsZShwcm9taXNlLCBrZXksIGVycm9yKSk7IC8vIFJlZ2lzdGVyIHJlamVjdGlvbiBsaXN0ZW5lcnMgdG8gYXZvaWQgdW5jYXVnaHQgcHJvbWlzZSByZWplY3Rpb25zIG9uXG4gICAgLy8gZXJyb3JzIG9yIGFib3J0ZWQgZGVmZXJyZWQgdmFsdWVzXG5cbiAgICBwcm9taXNlLmNhdGNoKCgpID0+IHt9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvbWlzZSwgXCJfdHJhY2tlZFwiLCB7XG4gICAgICBnZXQ6ICgpID0+IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIG9uU2V0dGxlKHByb21pc2UsIGtleSwgZXJyb3IsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5jb250cm9sbGVyLnNpZ25hbC5hYm9ydGVkICYmIGVycm9yIGluc3RhbmNlb2YgQWJvcnRlZERlZmVycmVkRXJyb3IpIHtcbiAgICAgIHRoaXMudW5saXN0ZW5BYm9ydFNpZ25hbCgpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsIFwiX2Vycm9yXCIsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiBlcnJvclxuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIHRoaXMucGVuZGluZ0tleXMuZGVsZXRlKGtleSk7XG5cbiAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAvLyBOb3RoaW5nIGxlZnQgdG8gYWJvcnQhXG4gICAgICB0aGlzLnVubGlzdGVuQWJvcnRTaWduYWwoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdWJzY3JpYmVyID0gdGhpcy5zdWJzY3JpYmVyO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvbWlzZSwgXCJfZXJyb3JcIiwge1xuICAgICAgICBnZXQ6ICgpID0+IGVycm9yXG4gICAgICB9KTtcbiAgICAgIHN1YnNjcmliZXIgJiYgc3Vic2NyaWJlcihmYWxzZSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9taXNlLCBcIl9kYXRhXCIsIHtcbiAgICAgIGdldDogKCkgPT4gZGF0YVxuICAgIH0pO1xuICAgIHN1YnNjcmliZXIgJiYgc3Vic2NyaWJlcihmYWxzZSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBzdWJzY3JpYmUoZm4pIHtcbiAgICB0aGlzLnN1YnNjcmliZXIgPSBmbjtcbiAgfVxuXG4gIGNhbmNlbCgpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB0aGlzLnBlbmRpbmdLZXlzLmZvckVhY2goKHYsIGspID0+IHRoaXMucGVuZGluZ0tleXMuZGVsZXRlKGspKTtcbiAgICBsZXQgc3Vic2NyaWJlciA9IHRoaXMuc3Vic2NyaWJlcjtcbiAgICBzdWJzY3JpYmVyICYmIHN1YnNjcmliZXIodHJ1ZSk7XG4gIH1cblxuICBhc3luYyByZXNvbHZlRGF0YShzaWduYWwpIHtcbiAgICBsZXQgYWJvcnRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLmRvbmUpIHtcbiAgICAgIGxldCBvbkFib3J0ID0gKCkgPT4gdGhpcy5jYW5jZWwoKTtcblxuICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBvbkFib3J0KTtcbiAgICAgIGFib3J0ZWQgPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoYWJvcnRlZCA9PiB7XG4gICAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBvbkFib3J0KTtcblxuICAgICAgICAgIGlmIChhYm9ydGVkIHx8IHRoaXMuZG9uZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShhYm9ydGVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFib3J0ZWQ7XG4gIH1cblxuICBnZXQgZG9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nS2V5cy5zaXplID09PSAwO1xuICB9XG5cbiAgZ2V0IHVud3JhcHBlZERhdGEoKSB7XG4gICAgaW52YXJpYW50KHRoaXMuZGF0YSAhPT0gbnVsbCAmJiB0aGlzLmRvbmUsIFwiQ2FuIG9ubHkgdW53cmFwIGRhdGEgb24gaW5pdGlhbGl6ZWQgYW5kIHNldHRsZWQgZGVmZXJyZWRzXCIpO1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLmRhdGEpLnJlZHVjZSgoYWNjLCBfcmVmMikgPT4ge1xuICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IF9yZWYyO1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYWNjLCB7XG4gICAgICAgIFtrZXldOiB1bndyYXBUcmFja2VkUHJvbWlzZSh2YWx1ZSlcbiAgICAgIH0pO1xuICAgIH0sIHt9KTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGlzVHJhY2tlZFByb21pc2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5fdHJhY2tlZCA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gdW53cmFwVHJhY2tlZFByb21pc2UodmFsdWUpIHtcbiAgaWYgKCFpc1RyYWNrZWRQcm9taXNlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICh2YWx1ZS5fZXJyb3IpIHtcbiAgICB0aHJvdyB2YWx1ZS5fZXJyb3I7XG4gIH1cblxuICByZXR1cm4gdmFsdWUuX2RhdGE7XG59XG5cbmZ1bmN0aW9uIGRlZmVyKGRhdGEpIHtcbiAgcmV0dXJuIG5ldyBEZWZlcnJlZERhdGEoZGF0YSk7XG59XG4vKipcbiAqIEEgcmVkaXJlY3QgcmVzcG9uc2UuIFNldHMgdGhlIHN0YXR1cyBjb2RlIGFuZCB0aGUgYExvY2F0aW9uYCBoZWFkZXIuXG4gKiBEZWZhdWx0cyB0byBcIjMwMiBGb3VuZFwiLlxuICovXG5cbmNvbnN0IHJlZGlyZWN0ID0gZnVuY3Rpb24gcmVkaXJlY3QodXJsLCBpbml0KSB7XG4gIGlmIChpbml0ID09PSB2b2lkIDApIHtcbiAgICBpbml0ID0gMzAyO1xuICB9XG5cbiAgbGV0IHJlc3BvbnNlSW5pdCA9IGluaXQ7XG5cbiAgaWYgKHR5cGVvZiByZXNwb25zZUluaXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICByZXNwb25zZUluaXQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlSW5pdFxuICAgIH07XG4gIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlSW5pdC5zdGF0dXMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXNwb25zZUluaXQuc3RhdHVzID0gMzAyO1xuICB9XG5cbiAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXNwb25zZUluaXQuaGVhZGVycyk7XG4gIGhlYWRlcnMuc2V0KFwiTG9jYXRpb25cIiwgdXJsKTtcbiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCBfZXh0ZW5kcyh7fSwgcmVzcG9uc2VJbml0LCB7XG4gICAgaGVhZGVyc1xuICB9KSk7XG59O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICogVXRpbGl0eSBjbGFzcyB3ZSB1c2UgdG8gaG9sZCBhdXRvLXVud3JhcHBlZCA0eHgvNXh4IFJlc3BvbnNlIGJvZGllc1xuICovXG5cbmNsYXNzIEVycm9yUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihzdGF0dXMsIHN0YXR1c1RleHQsIGRhdGEsIGludGVybmFsKSB7XG4gICAgaWYgKGludGVybmFsID09PSB2b2lkIDApIHtcbiAgICAgIGludGVybmFsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dCB8fCBcIlwiO1xuICAgIHRoaXMuaW50ZXJuYWwgPSBpbnRlcm5hbDtcblxuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZXJyb3IgPSBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgfVxuXG59XG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBlcnJvciBpcyBhbiBFcnJvclJlc3BvbnNlIGdlbmVyYXRlZCBmcm9tIGEgNHh4LzV4eFxuICogUmVzcG9uc2UgdGhyb3cgZnJvbSBhbiBhY3Rpb24vbG9hZGVyXG4gKi9cblxuZnVuY3Rpb24gaXNSb3V0ZUVycm9yUmVzcG9uc2UoZSkge1xuICByZXR1cm4gZSBpbnN0YW5jZW9mIEVycm9yUmVzcG9uc2U7XG59XG5cbmNvbnN0IHZhbGlkQWN0aW9uTWV0aG9kc0FyciA9IFtcInBvc3RcIiwgXCJwdXRcIiwgXCJwYXRjaFwiLCBcImRlbGV0ZVwiXTtcbmNvbnN0IHZhbGlkQWN0aW9uTWV0aG9kcyA9IG5ldyBTZXQodmFsaWRBY3Rpb25NZXRob2RzQXJyKTtcbmNvbnN0IHZhbGlkUmVxdWVzdE1ldGhvZHNBcnIgPSBbXCJnZXRcIiwgLi4udmFsaWRBY3Rpb25NZXRob2RzQXJyXTtcbmNvbnN0IHZhbGlkUmVxdWVzdE1ldGhvZHMgPSBuZXcgU2V0KHZhbGlkUmVxdWVzdE1ldGhvZHNBcnIpO1xuY29uc3QgcmVkaXJlY3RTdGF0dXNDb2RlcyA9IG5ldyBTZXQoWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XSk7XG5jb25zdCByZWRpcmVjdFByZXNlcnZlTWV0aG9kU3RhdHVzQ29kZXMgPSBuZXcgU2V0KFszMDcsIDMwOF0pO1xuY29uc3QgSURMRV9OQVZJR0FUSU9OID0ge1xuICBzdGF0ZTogXCJpZGxlXCIsXG4gIGxvY2F0aW9uOiB1bmRlZmluZWQsXG4gIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCxcbiAgZm9ybUFjdGlvbjogdW5kZWZpbmVkLFxuICBmb3JtRW5jVHlwZTogdW5kZWZpbmVkLFxuICBmb3JtRGF0YTogdW5kZWZpbmVkXG59O1xuY29uc3QgSURMRV9GRVRDSEVSID0ge1xuICBzdGF0ZTogXCJpZGxlXCIsXG4gIGRhdGE6IHVuZGVmaW5lZCxcbiAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLFxuICBmb3JtQWN0aW9uOiB1bmRlZmluZWQsXG4gIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsXG4gIGZvcm1EYXRhOiB1bmRlZmluZWRcbn07XG5jb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNTZXJ2ZXIgPSAhaXNCcm93c2VyOyAvLyNlbmRyZWdpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyNyZWdpb24gY3JlYXRlUm91dGVyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vKipcbiAqIENyZWF0ZSBhIHJvdXRlciBhbmQgbGlzdGVuIHRvIGhpc3RvcnkgUE9QIG5hdmlnYXRpb25zXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlUm91dGVyKGluaXQpIHtcbiAgaW52YXJpYW50KGluaXQucm91dGVzLmxlbmd0aCA+IDAsIFwiWW91IG11c3QgcHJvdmlkZSBhIG5vbi1lbXB0eSByb3V0ZXMgYXJyYXkgdG8gY3JlYXRlUm91dGVyXCIpO1xuICBsZXQgZGF0YVJvdXRlcyA9IGNvbnZlcnRSb3V0ZXNUb0RhdGFSb3V0ZXMoaW5pdC5yb3V0ZXMpOyAvLyBDbGVhbnVwIGZ1bmN0aW9uIGZvciBoaXN0b3J5XG5cbiAgbGV0IHVubGlzdGVuSGlzdG9yeSA9IG51bGw7IC8vIEV4dGVybmFsbHktcHJvdmlkZWQgZnVuY3Rpb25zIHRvIGNhbGwgb24gYWxsIHN0YXRlIGNoYW5nZXNcblxuICBsZXQgc3Vic2NyaWJlcnMgPSBuZXcgU2V0KCk7IC8vIEV4dGVybmFsbHktcHJvdmlkZWQgb2JqZWN0IHRvIGhvbGQgc2Nyb2xsIHJlc3RvcmF0aW9uIGxvY2F0aW9ucyBkdXJpbmcgcm91dGluZ1xuXG4gIGxldCBzYXZlZFNjcm9sbFBvc2l0aW9ucyA9IG51bGw7IC8vIEV4dGVybmFsbHktcHJvdmlkZWQgZnVuY3Rpb24gdG8gZ2V0IHNjcm9sbCByZXN0b3JhdGlvbiBrZXlzXG5cbiAgbGV0IGdldFNjcm9sbFJlc3RvcmF0aW9uS2V5ID0gbnVsbDsgLy8gRXh0ZXJuYWxseS1wcm92aWRlZCBmdW5jdGlvbiB0byBnZXQgY3VycmVudCBzY3JvbGwgcG9zaXRpb25cblxuICBsZXQgZ2V0U2Nyb2xsUG9zaXRpb24gPSBudWxsOyAvLyBPbmUtdGltZSBmbGFnIHRvIGNvbnRyb2wgdGhlIGluaXRpYWwgaHlkcmF0aW9uIHNjcm9sbCByZXN0b3JhdGlvbi4gIEJlY2F1c2VcbiAgLy8gd2UgZG9uJ3QgZ2V0IHRoZSBzYXZlZCBwb3NpdGlvbnMgZnJvbSA8U2Nyb2xsUmVzdG9yYXRpb24gLz4gdW50aWwgX2FmdGVyX1xuICAvLyB0aGUgaW5pdGlhbCByZW5kZXIsIHdlIG5lZWQgdG8gbWFudWFsbHkgdHJpZ2dlciBhIHNlcGFyYXRlIHVwZGF0ZVN0YXRlIHRvXG4gIC8vIHNlbmQgYWxvbmcgdGhlIHJlc3RvcmVTY3JvbGxQb3NpdGlvblxuXG4gIGxldCBpbml0aWFsU2Nyb2xsUmVzdG9yZWQgPSBmYWxzZTtcbiAgbGV0IGluaXRpYWxNYXRjaGVzID0gbWF0Y2hSb3V0ZXMoZGF0YVJvdXRlcywgaW5pdC5oaXN0b3J5LmxvY2F0aW9uLCBpbml0LmJhc2VuYW1lKTtcbiAgbGV0IGluaXRpYWxFcnJvcnMgPSBudWxsO1xuXG4gIGlmIChpbml0aWFsTWF0Y2hlcyA9PSBudWxsKSB7XG4gICAgLy8gSWYgd2UgZG8gbm90IG1hdGNoIGEgdXNlci1wcm92aWRlZC1yb3V0ZSwgZmFsbCBiYWNrIHRvIHRoZSByb290XG4gICAgLy8gdG8gYWxsb3cgdGhlIGVycm9yIGJvdW5kYXJ5IHRvIHRha2Ugb3ZlclxuICAgIGxldCBlcnJvciA9IGdldEludGVybmFsUm91dGVyRXJyb3IoNDA0LCB7XG4gICAgICBwYXRobmFtZTogaW5pdC5oaXN0b3J5LmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgfSk7XG4gICAgbGV0IHtcbiAgICAgIG1hdGNoZXMsXG4gICAgICByb3V0ZVxuICAgIH0gPSBnZXRTaG9ydENpcmN1aXRNYXRjaGVzKGRhdGFSb3V0ZXMpO1xuICAgIGluaXRpYWxNYXRjaGVzID0gbWF0Y2hlcztcbiAgICBpbml0aWFsRXJyb3JzID0ge1xuICAgICAgW3JvdXRlLmlkXTogZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgbGV0IGluaXRpYWxpemVkID0gIWluaXRpYWxNYXRjaGVzLnNvbWUobSA9PiBtLnJvdXRlLmxvYWRlcikgfHwgaW5pdC5oeWRyYXRpb25EYXRhICE9IG51bGw7XG4gIGxldCByb3V0ZXI7XG4gIGxldCBzdGF0ZSA9IHtcbiAgICBoaXN0b3J5QWN0aW9uOiBpbml0Lmhpc3RvcnkuYWN0aW9uLFxuICAgIGxvY2F0aW9uOiBpbml0Lmhpc3RvcnkubG9jYXRpb24sXG4gICAgbWF0Y2hlczogaW5pdGlhbE1hdGNoZXMsXG4gICAgaW5pdGlhbGl6ZWQsXG4gICAgbmF2aWdhdGlvbjogSURMRV9OQVZJR0FUSU9OLFxuICAgIHJlc3RvcmVTY3JvbGxQb3NpdGlvbjogbnVsbCxcbiAgICBwcmV2ZW50U2Nyb2xsUmVzZXQ6IGZhbHNlLFxuICAgIHJldmFsaWRhdGlvbjogXCJpZGxlXCIsXG4gICAgbG9hZGVyRGF0YTogaW5pdC5oeWRyYXRpb25EYXRhICYmIGluaXQuaHlkcmF0aW9uRGF0YS5sb2FkZXJEYXRhIHx8IHt9LFxuICAgIGFjdGlvbkRhdGE6IGluaXQuaHlkcmF0aW9uRGF0YSAmJiBpbml0Lmh5ZHJhdGlvbkRhdGEuYWN0aW9uRGF0YSB8fCBudWxsLFxuICAgIGVycm9yczogaW5pdC5oeWRyYXRpb25EYXRhICYmIGluaXQuaHlkcmF0aW9uRGF0YS5lcnJvcnMgfHwgaW5pdGlhbEVycm9ycyxcbiAgICBmZXRjaGVyczogbmV3IE1hcCgpXG4gIH07IC8vIC0tIFN0YXRlZnVsIGludGVybmFsIHZhcmlhYmxlcyB0byBtYW5hZ2UgbmF2aWdhdGlvbnMgLS1cbiAgLy8gQ3VycmVudCBuYXZpZ2F0aW9uIGluIHByb2dyZXNzICh0byBiZSBjb21taXR0ZWQgaW4gY29tcGxldGVOYXZpZ2F0aW9uKVxuXG4gIGxldCBwZW5kaW5nQWN0aW9uID0gQWN0aW9uLlBvcDsgLy8gU2hvdWxkIHRoZSBjdXJyZW50IG5hdmlnYXRpb24gcHJldmVudCB0aGUgc2Nyb2xsIHJlc2V0IGlmIHNjcm9sbCBjYW5ub3RcbiAgLy8gYmUgcmVzdG9yZWQ/XG5cbiAgbGV0IHBlbmRpbmdQcmV2ZW50U2Nyb2xsUmVzZXQgPSBmYWxzZTsgLy8gQWJvcnRDb250cm9sbGVyIGZvciB0aGUgYWN0aXZlIG5hdmlnYXRpb25cblxuICBsZXQgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyOyAvLyBXZSB1c2UgdGhpcyB0byBhdm9pZCB0b3VjaGluZyBoaXN0b3J5IGluIGNvbXBsZXRlTmF2aWdhdGlvbiBpZiBhXG4gIC8vIHJldmFsaWRhdGlvbiBpcyBlbnRpcmVseSB1bmludGVycnVwdGVkXG5cbiAgbGV0IGlzVW5pbnRlcnJ1cHRlZFJldmFsaWRhdGlvbiA9IGZhbHNlOyAvLyBVc2UgdGhpcyBpbnRlcm5hbCBmbGFnIHRvIGZvcmNlIHJldmFsaWRhdGlvbiBvZiBhbGwgbG9hZGVyczpcbiAgLy8gIC0gc3VibWlzc2lvbnMgKGNvbXBsZXRlZCBvciBpbnRlcnJ1cHRlZClcbiAgLy8gIC0gdXNlUmV2YWxpZGF0ZSgpXG4gIC8vICAtIFgtUmVtaXgtUmV2YWxpZGF0ZSAoZnJvbSByZWRpcmVjdClcblxuICBsZXQgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCA9IGZhbHNlOyAvLyBVc2UgdGhpcyBpbnRlcm5hbCBhcnJheSB0byBjYXB0dXJlIHJvdXRlcyB0aGF0IHJlcXVpcmUgcmV2YWxpZGF0aW9uIGR1ZVxuICAvLyB0byBhIGNhbmNlbGxlZCBkZWZlcnJlZCBvbiBhY3Rpb24gc3VibWlzc2lvblxuXG4gIGxldCBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcyA9IFtdOyAvLyBVc2UgdGhpcyBpbnRlcm5hbCBhcnJheSB0byBjYXB0dXJlIGZldGNoZXIgbG9hZHMgdGhhdCB3ZXJlIGNhbmNlbGxlZCBieSBhblxuICAvLyBhY3Rpb24gbmF2aWdhdGlvbiBhbmQgcmVxdWlyZSByZXZhbGlkYXRpb25cblxuICBsZXQgY2FuY2VsbGVkRmV0Y2hlckxvYWRzID0gW107IC8vIEFib3J0Q29udHJvbGxlcnMgZm9yIGFueSBpbi1mbGlnaHQgZmV0Y2hlcnNcblxuICBsZXQgZmV0Y2hDb250cm9sbGVycyA9IG5ldyBNYXAoKTsgLy8gVHJhY2sgbG9hZHMgYmFzZWQgb24gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgc3RhcnRlZFxuXG4gIGxldCBpbmNyZW1lbnRpbmdMb2FkSWQgPSAwOyAvLyBUcmFjayB0aGUgb3V0c3RhbmRpbmcgcGVuZGluZyBuYXZpZ2F0aW9uIGRhdGEgbG9hZCB0byBiZSBjb21wYXJlZCBhZ2FpbnN0XG4gIC8vIHRoZSBnbG9iYWxseSBpbmNyZW1lbnRpbmcgbG9hZCB3aGVuIGEgZmV0Y2hlciBsb2FkIGxhbmRzIGFmdGVyIGEgY29tcGxldGVkXG4gIC8vIG5hdmlnYXRpb25cblxuICBsZXQgcGVuZGluZ05hdmlnYXRpb25Mb2FkSWQgPSAtMTsgLy8gRmV0Y2hlcnMgdGhhdCB0cmlnZ2VyZWQgZGF0YSByZWxvYWRzIGFzIGEgcmVzdWx0IG9mIHRoZWlyIGFjdGlvbnNcblxuICBsZXQgZmV0Y2hSZWxvYWRJZHMgPSBuZXcgTWFwKCk7IC8vIEZldGNoZXJzIHRoYXQgdHJpZ2dlcmVkIHJlZGlyZWN0IG5hdmlnYXRpb25zIGZyb20gdGhlaXIgYWN0aW9uc1xuXG4gIGxldCBmZXRjaFJlZGlyZWN0SWRzID0gbmV3IFNldCgpOyAvLyBNb3N0IHJlY2VudCBocmVmL21hdGNoIGZvciBmZXRjaGVyLmxvYWQgY2FsbHMgZm9yIGZldGNoZXJzXG5cbiAgbGV0IGZldGNoTG9hZE1hdGNoZXMgPSBuZXcgTWFwKCk7IC8vIFN0b3JlIERlZmVycmVkRGF0YSBpbnN0YW5jZXMgZm9yIGFjdGl2ZSByb3V0ZSBtYXRjaGVzLiAgV2hlbiBhXG4gIC8vIHJvdXRlIGxvYWRlciByZXR1cm5zIGRlZmVyKCkgd2Ugc3RpY2sgb25lIGluIGhlcmUuICBUaGVuLCB3aGVuIGEgbmVzdGVkXG4gIC8vIHByb21pc2UgcmVzb2x2ZXMgd2UgdXBkYXRlIGxvYWRlckRhdGEuICBJZiBhIG5ldyBuYXZpZ2F0aW9uIHN0YXJ0cyB3ZVxuICAvLyBjYW5jZWwgYWN0aXZlIGRlZmVycmVkcyBmb3IgZWxpbWluYXRlZCByb3V0ZXMuXG5cbiAgbGV0IGFjdGl2ZURlZmVycmVkcyA9IG5ldyBNYXAoKTsgLy8gSW5pdGlhbGl6ZSB0aGUgcm91dGVyLCBhbGwgc2lkZSBlZmZlY3RzIHNob3VsZCBiZSBraWNrZWQgb2ZmIGZyb20gaGVyZS5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgYSBGbHVlbnQgQVBJIGZvciBlYXNlIG9mOlxuICAvLyAgIGxldCByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoaW5pdCkuaW5pdGlhbGl6ZSgpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgLy8gSWYgaGlzdG9yeSBpbmZvcm1zIHVzIG9mIGEgUE9QIG5hdmlnYXRpb24sIHN0YXJ0IHRoZSBuYXZpZ2F0aW9uIGJ1dCBkbyBub3QgdXBkYXRlXG4gICAgLy8gc3RhdGUuICBXZSdsbCB1cGRhdGUgb3VyIG93biBzdGF0ZSBvbmNlIHRoZSBuYXZpZ2F0aW9uIGNvbXBsZXRlc1xuICAgIHVubGlzdGVuSGlzdG9yeSA9IGluaXQuaGlzdG9yeS5saXN0ZW4oX3JlZiA9PiB7XG4gICAgICBsZXQge1xuICAgICAgICBhY3Rpb246IGhpc3RvcnlBY3Rpb24sXG4gICAgICAgIGxvY2F0aW9uXG4gICAgICB9ID0gX3JlZjtcbiAgICAgIHJldHVybiBzdGFydE5hdmlnYXRpb24oaGlzdG9yeUFjdGlvbiwgbG9jYXRpb24pO1xuICAgIH0pOyAvLyBLaWNrIG9mZiBpbml0aWFsIGRhdGEgbG9hZCBpZiBuZWVkZWQuICBVc2UgUG9wIHRvIGF2b2lkIG1vZGlmeWluZyBoaXN0b3J5XG5cbiAgICBpZiAoIXN0YXRlLmluaXRpYWxpemVkKSB7XG4gICAgICBzdGFydE5hdmlnYXRpb24oQWN0aW9uLlBvcCwgc3RhdGUubG9jYXRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiByb3V0ZXI7XG4gIH0gLy8gQ2xlYW4gdXAgYSByb3V0ZXIgYW5kIGl0J3Mgc2lkZSBlZmZlY3RzXG5cblxuICBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgIGlmICh1bmxpc3Rlbkhpc3RvcnkpIHtcbiAgICAgIHVubGlzdGVuSGlzdG9yeSgpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZXJzLmNsZWFyKCk7XG4gICAgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyICYmIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlci5hYm9ydCgpO1xuICAgIHN0YXRlLmZldGNoZXJzLmZvckVhY2goKF8sIGtleSkgPT4gZGVsZXRlRmV0Y2hlcihrZXkpKTtcbiAgfSAvLyBTdWJzY3JpYmUgdG8gc3RhdGUgdXBkYXRlcyBmb3IgdGhlIHJvdXRlclxuXG5cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGZuKSB7XG4gICAgc3Vic2NyaWJlcnMuYWRkKGZuKTtcbiAgICByZXR1cm4gKCkgPT4gc3Vic2NyaWJlcnMuZGVsZXRlKGZuKTtcbiAgfSAvLyBVcGRhdGUgb3VyIHN0YXRlIGFuZCBub3RpZnkgdGhlIGNhbGxpbmcgY29udGV4dCBvZiB0aGUgY2hhbmdlXG5cblxuICBmdW5jdGlvbiB1cGRhdGVTdGF0ZShuZXdTdGF0ZSkge1xuICAgIHN0YXRlID0gX2V4dGVuZHMoe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgc3Vic2NyaWJlcnMuZm9yRWFjaChzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIoc3RhdGUpKTtcbiAgfSAvLyBDb21wbGV0ZSBhIG5hdmlnYXRpb24gcmV0dXJuaW5nIHRoZSBzdGF0ZS5uYXZpZ2F0aW9uIGJhY2sgdG8gdGhlIElETEVfTkFWSUdBVElPTlxuICAvLyBhbmQgc2V0dGluZyBzdGF0ZS5baGlzdG9yeUFjdGlvbi9sb2NhdGlvbi9tYXRjaGVzXSB0byB0aGUgbmV3IHJvdXRlLlxuICAvLyAtIExvY2F0aW9uIGlzIGEgcmVxdWlyZWQgcGFyYW1cbiAgLy8gLSBOYXZpZ2F0aW9uIHdpbGwgYWx3YXlzIGJlIHNldCB0byBJRExFX05BVklHQVRJT05cbiAgLy8gLSBDYW4gcGFzcyBhbnkgb3RoZXIgc3RhdGUgaW4gbmV3U3RhdGVcblxuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlTmF2aWdhdGlvbihsb2NhdGlvbiwgbmV3U3RhdGUpIHtcbiAgICB2YXIgX3N0YXRlJG5hdmlnYXRpb24kZm9yO1xuXG4gICAgLy8gRGVkdWNlIGlmIHdlJ3JlIGluIGEgbG9hZGluZy9hY3Rpb25SZWxvYWQgc3RhdGU6XG4gICAgLy8gLSBXZSBoYXZlIGNvbW1pdHRlZCBhY3Rpb25EYXRhIGluIHRoZSBzdG9yZVxuICAgIC8vIC0gVGhlIGN1cnJlbnQgbmF2aWdhdGlvbiB3YXMgYSBzdWJtaXNzaW9uXG4gICAgLy8gLSBXZSdyZSBwYXN0IHRoZSBzdWJtaXR0aW5nIHN0YXRlIGFuZCBpbnRvIHRoZSBsb2FkaW5nIHN0YXRlXG4gICAgLy8gLSBUaGUgbG9jYXRpb24gd2UndmUgZmluaXNoZWQgbG9hZGluZyBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgc3VibWlzc2lvblxuICAgIC8vICAgbG9jYXRpb24sIGluZGljYXRpbmcgd2UgcmVkaXJlY3RlZCBmcm9tIHRoZSBhY3Rpb24gKGF2b2lkcyBmYWxzZVxuICAgIC8vICAgcG9zaXRpdmVzIGZvciBsb2FkaW5nL3N1Ym1pc3Npb25SZWRpcmVjdCB3aGVuIGFjdGlvbkRhdGEgcmV0dXJuZWRcbiAgICAvLyAgIG9uIGEgcHJpb3Igc3VibWlzc2lvbilcbiAgICBsZXQgaXNBY3Rpb25SZWxvYWQgPSBzdGF0ZS5hY3Rpb25EYXRhICE9IG51bGwgJiYgc3RhdGUubmF2aWdhdGlvbi5mb3JtTWV0aG9kICE9IG51bGwgJiYgc3RhdGUubmF2aWdhdGlvbi5zdGF0ZSA9PT0gXCJsb2FkaW5nXCIgJiYgKChfc3RhdGUkbmF2aWdhdGlvbiRmb3IgPSBzdGF0ZS5uYXZpZ2F0aW9uLmZvcm1BY3Rpb24pID09IG51bGwgPyB2b2lkIDAgOiBfc3RhdGUkbmF2aWdhdGlvbiRmb3Iuc3BsaXQoXCI/XCIpWzBdKSA9PT0gbG9jYXRpb24ucGF0aG5hbWU7IC8vIEFsd2F5cyBwcmVzZXJ2ZSBhbnkgZXhpc3RpbmcgbG9hZGVyRGF0YSBmcm9tIHJlLXVzZWQgcm91dGVzXG5cbiAgICBsZXQgbmV3TG9hZGVyRGF0YSA9IG5ld1N0YXRlLmxvYWRlckRhdGEgPyB7XG4gICAgICBsb2FkZXJEYXRhOiBtZXJnZUxvYWRlckRhdGEoc3RhdGUubG9hZGVyRGF0YSwgbmV3U3RhdGUubG9hZGVyRGF0YSwgbmV3U3RhdGUubWF0Y2hlcyB8fCBbXSlcbiAgICB9IDoge307XG4gICAgdXBkYXRlU3RhdGUoX2V4dGVuZHMoe30sIGlzQWN0aW9uUmVsb2FkID8ge30gOiB7XG4gICAgICBhY3Rpb25EYXRhOiBudWxsXG4gICAgfSwgbmV3U3RhdGUsIG5ld0xvYWRlckRhdGEsIHtcbiAgICAgIGhpc3RvcnlBY3Rpb246IHBlbmRpbmdBY3Rpb24sXG4gICAgICBsb2NhdGlvbixcbiAgICAgIGluaXRpYWxpemVkOiB0cnVlLFxuICAgICAgbmF2aWdhdGlvbjogSURMRV9OQVZJR0FUSU9OLFxuICAgICAgcmV2YWxpZGF0aW9uOiBcImlkbGVcIixcbiAgICAgIC8vIERvbid0IHJlc3RvcmUgb24gc3VibWlzc2lvbiBuYXZpZ2F0aW9uc1xuICAgICAgcmVzdG9yZVNjcm9sbFBvc2l0aW9uOiBzdGF0ZS5uYXZpZ2F0aW9uLmZvcm1EYXRhID8gZmFsc2UgOiBnZXRTYXZlZFNjcm9sbFBvc2l0aW9uKGxvY2F0aW9uLCBuZXdTdGF0ZS5tYXRjaGVzIHx8IHN0YXRlLm1hdGNoZXMpLFxuICAgICAgcHJldmVudFNjcm9sbFJlc2V0OiBwZW5kaW5nUHJldmVudFNjcm9sbFJlc2V0XG4gICAgfSkpO1xuXG4gICAgaWYgKGlzVW5pbnRlcnJ1cHRlZFJldmFsaWRhdGlvbikgOyBlbHNlIGlmIChwZW5kaW5nQWN0aW9uID09PSBBY3Rpb24uUG9wKSA7IGVsc2UgaWYgKHBlbmRpbmdBY3Rpb24gPT09IEFjdGlvbi5QdXNoKSB7XG4gICAgICBpbml0Lmhpc3RvcnkucHVzaChsb2NhdGlvbiwgbG9jYXRpb24uc3RhdGUpO1xuICAgIH0gZWxzZSBpZiAocGVuZGluZ0FjdGlvbiA9PT0gQWN0aW9uLlJlcGxhY2UpIHtcbiAgICAgIGluaXQuaGlzdG9yeS5yZXBsYWNlKGxvY2F0aW9uLCBsb2NhdGlvbi5zdGF0ZSk7XG4gICAgfSAvLyBSZXNldCBzdGF0ZWZ1bCBuYXZpZ2F0aW9uIHZhcnNcblxuXG4gICAgcGVuZGluZ0FjdGlvbiA9IEFjdGlvbi5Qb3A7XG4gICAgcGVuZGluZ1ByZXZlbnRTY3JvbGxSZXNldCA9IGZhbHNlO1xuICAgIGlzVW5pbnRlcnJ1cHRlZFJldmFsaWRhdGlvbiA9IGZhbHNlO1xuICAgIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQgPSBmYWxzZTtcbiAgICBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcyA9IFtdO1xuICAgIGNhbmNlbGxlZEZldGNoZXJMb2FkcyA9IFtdO1xuICB9IC8vIFRyaWdnZXIgYSBuYXZpZ2F0aW9uIGV2ZW50LCB3aGljaCBjYW4gZWl0aGVyIGJlIGEgbnVtZXJpY2FsIFBPUCBvciBhIFBVU0hcbiAgLy8gcmVwbGFjZSB3aXRoIGFuIG9wdGlvbmFsIHN1Ym1pc3Npb25cblxuXG4gIGFzeW5jIGZ1bmN0aW9uIG5hdmlnYXRlKHRvLCBvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiB0byA9PT0gXCJudW1iZXJcIikge1xuICAgICAgaW5pdC5oaXN0b3J5LmdvKHRvKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgcGF0aCxcbiAgICAgIHN1Ym1pc3Npb24sXG4gICAgICBlcnJvclxuICAgIH0gPSBub3JtYWxpemVOYXZpZ2F0ZU9wdGlvbnModG8sIG9wdHMpO1xuICAgIGxldCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHN0YXRlLmxvY2F0aW9uLCBwYXRoLCBvcHRzICYmIG9wdHMuc3RhdGUpOyAvLyBXaGVuIHVzaW5nIG5hdmlnYXRlIGFzIGEgUFVTSC9SRVBMQUNFIHdlIGFyZW4ndCByZWFkaW5nIGFuIGFscmVhZHktZW5jb2RlZFxuICAgIC8vIFVSTCBmcm9tIHdpbmRvdy5sb2NhdGlvbiwgc28gd2UgbmVlZCB0byBlbmNvZGUgaXQgaGVyZSBzbyB0aGUgYmVoYXZpb3JcbiAgICAvLyByZW1haW5zIHRoZSBzYW1lIGFzIFBPUCBhbmQgbm9uLWRhdGEtcm91dGVyIHVzYWdlcy4gIG5ldyBVUkwoKSBkb2VzIGFsbFxuICAgIC8vIHRoZSBzYW1lIGVuY29kaW5nIHdlJ2QgZ2V0IGZyb20gYSBoaXN0b3J5LnB1c2hTdGF0ZS93aW5kb3cubG9jYXRpb24gcmVhZFxuICAgIC8vIHdpdGhvdXQgaGF2aW5nIHRvIHRvdWNoIGhpc3RvcnlcblxuICAgIGxvY2F0aW9uID0gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCBpbml0Lmhpc3RvcnkuZW5jb2RlTG9jYXRpb24obG9jYXRpb24pKTtcbiAgICBsZXQgaGlzdG9yeUFjdGlvbiA9IChvcHRzICYmIG9wdHMucmVwbGFjZSkgPT09IHRydWUgfHwgc3VibWlzc2lvbiAhPSBudWxsID8gQWN0aW9uLlJlcGxhY2UgOiBBY3Rpb24uUHVzaDtcbiAgICBsZXQgcHJldmVudFNjcm9sbFJlc2V0ID0gb3B0cyAmJiBcInByZXZlbnRTY3JvbGxSZXNldFwiIGluIG9wdHMgPyBvcHRzLnByZXZlbnRTY3JvbGxSZXNldCA9PT0gdHJ1ZSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYXdhaXQgc3RhcnROYXZpZ2F0aW9uKGhpc3RvcnlBY3Rpb24sIGxvY2F0aW9uLCB7XG4gICAgICBzdWJtaXNzaW9uLFxuICAgICAgLy8gU2VuZCB0aHJvdWdoIHRoZSBmb3JtRGF0YSBzZXJpYWxpemF0aW9uIGVycm9yIGlmIHdlIGhhdmUgb25lIHNvIHdlIGNhblxuICAgICAgLy8gcmVuZGVyIGF0IHRoZSByaWdodCBlcnJvciBib3VuZGFyeSBhZnRlciB3ZSBtYXRjaCByb3V0ZXNcbiAgICAgIHBlbmRpbmdFcnJvcjogZXJyb3IsXG4gICAgICBwcmV2ZW50U2Nyb2xsUmVzZXQsXG4gICAgICByZXBsYWNlOiBvcHRzICYmIG9wdHMucmVwbGFjZVxuICAgIH0pO1xuICB9IC8vIFJldmFsaWRhdGUgYWxsIGN1cnJlbnQgbG9hZGVycy4gIElmIGEgbmF2aWdhdGlvbiBpcyBpbiBwcm9ncmVzcyBvciBpZiB0aGlzXG4gIC8vIGlzIGludGVycnVwdGVkIGJ5IGEgbmF2aWdhdGlvbiwgYWxsb3cgdGhpcyB0byBcInN1Y2NlZWRcIiBieSBjYWxsaW5nIGFsbFxuICAvLyBsb2FkZXJzIGR1cmluZyB0aGUgbmV4dCBsb2FkZXIgcm91bmRcblxuXG4gIGZ1bmN0aW9uIHJldmFsaWRhdGUoKSB7XG4gICAgaW50ZXJydXB0QWN0aXZlTG9hZHMoKTtcbiAgICB1cGRhdGVTdGF0ZSh7XG4gICAgICByZXZhbGlkYXRpb246IFwibG9hZGluZ1wiXG4gICAgfSk7IC8vIElmIHdlJ3JlIGN1cnJlbnRseSBzdWJtaXR0aW5nIGFuIGFjdGlvbiwgd2UgZG9uJ3QgbmVlZCB0byBzdGFydCBhIG5ld1xuICAgIC8vIG5hdmlnYXRpb24sIHdlJ2xsIGp1c3QgbGV0IHRoZSBmb2xsb3cgdXAgbG9hZGVyIGV4ZWN1dGlvbiBjYWxsIGFsbCBsb2FkZXJzXG5cbiAgICBpZiAoc3RhdGUubmF2aWdhdGlvbi5zdGF0ZSA9PT0gXCJzdWJtaXR0aW5nXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIElmIHdlJ3JlIGN1cnJlbnRseSBpbiBhbiBpZGxlIHN0YXRlLCBzdGFydCBhIG5ldyBuYXZpZ2F0aW9uIGZvciB0aGUgY3VycmVudFxuICAgIC8vIGFjdGlvbi9sb2NhdGlvbiBhbmQgbWFyayBpdCBhcyB1bmludGVycnVwdGVkLCB3aGljaCB3aWxsIHNraXAgdGhlIGhpc3RvcnlcbiAgICAvLyB1cGRhdGUgaW4gY29tcGxldGVOYXZpZ2F0aW9uXG5cblxuICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uLnN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgc3RhcnROYXZpZ2F0aW9uKHN0YXRlLmhpc3RvcnlBY3Rpb24sIHN0YXRlLmxvY2F0aW9uLCB7XG4gICAgICAgIHN0YXJ0VW5pbnRlcnJ1cHRlZFJldmFsaWRhdGlvbjogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBPdGhlcndpc2UsIGlmIHdlJ3JlIGN1cnJlbnRseSBpbiBhIGxvYWRpbmcgc3RhdGUsIGp1c3Qgc3RhcnQgYSBuZXdcbiAgICAvLyBuYXZpZ2F0aW9uIHRvIHRoZSBuYXZpZ2F0aW9uLmxvY2F0aW9uIGJ1dCBkbyBub3QgdHJpZ2dlciBhbiB1bmludGVycnVwdGVkXG4gICAgLy8gcmV2YWxpZGF0aW9uIHNvIHRoYXQgaGlzdG9yeSBjb3JyZWN0bHkgdXBkYXRlcyBvbmNlIHRoZSBuYXZpZ2F0aW9uIGNvbXBsZXRlc1xuXG5cbiAgICBzdGFydE5hdmlnYXRpb24ocGVuZGluZ0FjdGlvbiB8fCBzdGF0ZS5oaXN0b3J5QWN0aW9uLCBzdGF0ZS5uYXZpZ2F0aW9uLmxvY2F0aW9uLCB7XG4gICAgICBvdmVycmlkZU5hdmlnYXRpb246IHN0YXRlLm5hdmlnYXRpb25cbiAgICB9KTtcbiAgfSAvLyBTdGFydCBhIG5hdmlnYXRpb24gdG8gdGhlIGdpdmVuIGFjdGlvbi9sb2NhdGlvbi4gIENhbiBvcHRpb25hbGx5IHByb3ZpZGUgYVxuICAvLyBvdmVycmlkZU5hdmlnYXRpb24gd2hpY2ggd2lsbCBvdmVycmlkZSB0aGUgbm9ybWFsTG9hZCBpbiB0aGUgY2FzZSBvZiBhIHJlZGlyZWN0XG4gIC8vIG5hdmlnYXRpb25cblxuXG4gIGFzeW5jIGZ1bmN0aW9uIHN0YXJ0TmF2aWdhdGlvbihoaXN0b3J5QWN0aW9uLCBsb2NhdGlvbiwgb3B0cykge1xuICAgIC8vIEFib3J0IGFueSBpbi1wcm9ncmVzcyBuYXZpZ2F0aW9ucyBhbmQgc3RhcnQgYSBuZXcgb25lLiBVbnNldCBhbnkgb25nb2luZ1xuICAgIC8vIHVuaW50ZXJydXB0ZWQgcmV2YWxpZGF0aW9ucyB1bmxlc3MgdG9sZCBvdGhlcndpc2UsIHNpbmNlIHdlIHdhbnQgdGhpc1xuICAgIC8vIG5ldyBuYXZpZ2F0aW9uIHRvIHVwZGF0ZSBoaXN0b3J5IG5vcm1hbGx5XG4gICAgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyICYmIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlci5hYm9ydCgpO1xuICAgIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlciA9IG51bGw7XG4gICAgcGVuZGluZ0FjdGlvbiA9IGhpc3RvcnlBY3Rpb247XG4gICAgaXNVbmludGVycnVwdGVkUmV2YWxpZGF0aW9uID0gKG9wdHMgJiYgb3B0cy5zdGFydFVuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24pID09PSB0cnVlOyAvLyBTYXZlIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBldmVyeSB0aW1lIHdlIHN0YXJ0IGEgbmV3IG5hdmlnYXRpb24sXG4gICAgLy8gYW5kIHRyYWNrIHdoZXRoZXIgd2Ugc2hvdWxkIHJlc2V0IHNjcm9sbCBvbiBjb21wbGV0aW9uXG5cbiAgICBzYXZlU2Nyb2xsUG9zaXRpb24oc3RhdGUubG9jYXRpb24sIHN0YXRlLm1hdGNoZXMpO1xuICAgIHBlbmRpbmdQcmV2ZW50U2Nyb2xsUmVzZXQgPSAob3B0cyAmJiBvcHRzLnByZXZlbnRTY3JvbGxSZXNldCkgPT09IHRydWU7XG4gICAgbGV0IGxvYWRpbmdOYXZpZ2F0aW9uID0gb3B0cyAmJiBvcHRzLm92ZXJyaWRlTmF2aWdhdGlvbjtcbiAgICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIGxvY2F0aW9uLCBpbml0LmJhc2VuYW1lKTsgLy8gU2hvcnQgY2lyY3VpdCB3aXRoIGEgNDA0IG9uIHRoZSByb290IGVycm9yIGJvdW5kYXJ5IGlmIHdlIG1hdGNoIG5vdGhpbmdcblxuICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgbGV0IGVycm9yID0gZ2V0SW50ZXJuYWxSb3V0ZXJFcnJvcig0MDQsIHtcbiAgICAgICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICB9KTtcbiAgICAgIGxldCB7XG4gICAgICAgIG1hdGNoZXM6IG5vdEZvdW5kTWF0Y2hlcyxcbiAgICAgICAgcm91dGVcbiAgICAgIH0gPSBnZXRTaG9ydENpcmN1aXRNYXRjaGVzKGRhdGFSb3V0ZXMpOyAvLyBDYW5jZWwgYWxsIHBlbmRpbmcgZGVmZXJyZWQgb24gNDA0cyBzaW5jZSB3ZSBkb24ndCBrZWVwIGFueSByb3V0ZXNcblxuICAgICAgY2FuY2VsQWN0aXZlRGVmZXJyZWRzKCk7XG4gICAgICBjb21wbGV0ZU5hdmlnYXRpb24obG9jYXRpb24sIHtcbiAgICAgICAgbWF0Y2hlczogbm90Rm91bmRNYXRjaGVzLFxuICAgICAgICBsb2FkZXJEYXRhOiB7fSxcbiAgICAgICAgZXJyb3JzOiB7XG4gICAgICAgICAgW3JvdXRlLmlkXTogZXJyb3JcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBTaG9ydCBjaXJjdWl0IGlmIGl0J3Mgb25seSBhIGhhc2ggY2hhbmdlXG5cblxuICAgIGlmIChpc0hhc2hDaGFuZ2VPbmx5KHN0YXRlLmxvY2F0aW9uLCBsb2NhdGlvbikpIHtcbiAgICAgIGNvbXBsZXRlTmF2aWdhdGlvbihsb2NhdGlvbiwge1xuICAgICAgICBtYXRjaGVzXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIENyZWF0ZSBhIGNvbnRyb2xsZXIvUmVxdWVzdCBmb3IgdGhpcyBuYXZpZ2F0aW9uXG5cblxuICAgIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBsZXQgcmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QobG9jYXRpb24sIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlci5zaWduYWwsIG9wdHMgJiYgb3B0cy5zdWJtaXNzaW9uKTtcbiAgICBsZXQgcGVuZGluZ0FjdGlvbkRhdGE7XG4gICAgbGV0IHBlbmRpbmdFcnJvcjtcblxuICAgIGlmIChvcHRzICYmIG9wdHMucGVuZGluZ0Vycm9yKSB7XG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgcGVuZGluZ0Vycm9yLCBpdCBtZWFucyB0aGUgdXNlciBhdHRlbXB0ZWQgYSBHRVQgc3VibWlzc2lvblxuICAgICAgLy8gd2l0aCBiaW5hcnkgRm9ybURhdGEgc28gYXNzaWduIGhlcmUgYW5kIHNraXAgdG8gaGFuZGxlTG9hZGVycy4gIFRoYXRcbiAgICAgIC8vIHdheSB3ZSBoYW5kbGUgY2FsbGluZyBsb2FkZXJzIGFib3ZlIHRoZSBib3VuZGFyeSBldGMuICBJdCdzIG5vdCByZWFsbHlcbiAgICAgIC8vIGRpZmZlcmVudCBmcm9tIGFuIGFjdGlvbkVycm9yIGluIHRoYXQgc2Vuc2UuXG4gICAgICBwZW5kaW5nRXJyb3IgPSB7XG4gICAgICAgIFtmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMpLnJvdXRlLmlkXTogb3B0cy5wZW5kaW5nRXJyb3JcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvcHRzICYmIG9wdHMuc3VibWlzc2lvbikge1xuICAgICAgLy8gQ2FsbCBhY3Rpb24gaWYgd2UgcmVjZWl2ZWQgYW4gYWN0aW9uIHN1Ym1pc3Npb25cbiAgICAgIGxldCBhY3Rpb25PdXRwdXQgPSBhd2FpdCBoYW5kbGVBY3Rpb24ocmVxdWVzdCwgbG9jYXRpb24sIG9wdHMuc3VibWlzc2lvbiwgbWF0Y2hlcywge1xuICAgICAgICByZXBsYWNlOiBvcHRzLnJlcGxhY2VcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoYWN0aW9uT3V0cHV0LnNob3J0Q2lyY3VpdGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcGVuZGluZ0FjdGlvbkRhdGEgPSBhY3Rpb25PdXRwdXQucGVuZGluZ0FjdGlvbkRhdGE7XG4gICAgICBwZW5kaW5nRXJyb3IgPSBhY3Rpb25PdXRwdXQucGVuZGluZ0FjdGlvbkVycm9yO1xuXG4gICAgICBsZXQgbmF2aWdhdGlvbiA9IF9leHRlbmRzKHtcbiAgICAgICAgc3RhdGU6IFwibG9hZGluZ1wiLFxuICAgICAgICBsb2NhdGlvblxuICAgICAgfSwgb3B0cy5zdWJtaXNzaW9uKTtcblxuICAgICAgbG9hZGluZ05hdmlnYXRpb24gPSBuYXZpZ2F0aW9uO1xuICAgIH0gLy8gQ2FsbCBsb2FkZXJzXG5cblxuICAgIGxldCB7XG4gICAgICBzaG9ydENpcmN1aXRlZCxcbiAgICAgIGxvYWRlckRhdGEsXG4gICAgICBlcnJvcnNcbiAgICB9ID0gYXdhaXQgaGFuZGxlTG9hZGVycyhyZXF1ZXN0LCBsb2NhdGlvbiwgbWF0Y2hlcywgbG9hZGluZ05hdmlnYXRpb24sIG9wdHMgJiYgb3B0cy5zdWJtaXNzaW9uLCBvcHRzICYmIG9wdHMucmVwbGFjZSwgcGVuZGluZ0FjdGlvbkRhdGEsIHBlbmRpbmdFcnJvcik7XG5cbiAgICBpZiAoc2hvcnRDaXJjdWl0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIENsZWFuIHVwIG5vdyB0aGF0IHRoZSBhY3Rpb24vbG9hZGVycyBoYXZlIGNvbXBsZXRlZC4gIERvbid0IGNsZWFuIHVwIGlmXG4gICAgLy8gd2Ugc2hvcnQgY2lyY3VpdGVkIGJlY2F1c2UgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyIHdpbGwgaGF2ZSBhbHJlYWR5XG4gICAgLy8gYmVlbiBhc3NpZ25lZCB0byBhIG5ldyBjb250cm9sbGVyIGZvciB0aGUgbmV4dCBuYXZpZ2F0aW9uXG5cblxuICAgIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlciA9IG51bGw7XG4gICAgY29tcGxldGVOYXZpZ2F0aW9uKGxvY2F0aW9uLCB7XG4gICAgICBtYXRjaGVzLFxuICAgICAgbG9hZGVyRGF0YSxcbiAgICAgIGVycm9yc1xuICAgIH0pO1xuICB9IC8vIENhbGwgdGhlIGFjdGlvbiBtYXRjaGVkIGJ5IHRoZSBsZWFmIHJvdXRlIGZvciB0aGlzIG5hdmlnYXRpb24gYW5kIGhhbmRsZVxuICAvLyByZWRpcmVjdHMvZXJyb3JzXG5cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVBY3Rpb24ocmVxdWVzdCwgbG9jYXRpb24sIHN1Ym1pc3Npb24sIG1hdGNoZXMsIG9wdHMpIHtcbiAgICBpbnRlcnJ1cHRBY3RpdmVMb2FkcygpOyAvLyBQdXQgdXMgaW4gYSBzdWJtaXR0aW5nIHN0YXRlXG5cbiAgICBsZXQgbmF2aWdhdGlvbiA9IF9leHRlbmRzKHtcbiAgICAgIHN0YXRlOiBcInN1Ym1pdHRpbmdcIixcbiAgICAgIGxvY2F0aW9uXG4gICAgfSwgc3VibWlzc2lvbik7XG5cbiAgICB1cGRhdGVTdGF0ZSh7XG4gICAgICBuYXZpZ2F0aW9uXG4gICAgfSk7IC8vIENhbGwgb3VyIGFjdGlvbiBhbmQgZ2V0IHRoZSByZXN1bHRcblxuICAgIGxldCByZXN1bHQ7XG4gICAgbGV0IGFjdGlvbk1hdGNoID0gZ2V0VGFyZ2V0TWF0Y2gobWF0Y2hlcywgbG9jYXRpb24pO1xuXG4gICAgaWYgKCFhY3Rpb25NYXRjaC5yb3V0ZS5hY3Rpb24pIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgdHlwZTogUmVzdWx0VHlwZS5lcnJvcixcbiAgICAgICAgZXJyb3I6IGdldEludGVybmFsUm91dGVyRXJyb3IoNDA1LCB7XG4gICAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgICBwYXRobmFtZTogbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgcm91dGVJZDogYWN0aW9uTWF0Y2gucm91dGUuaWRcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IGNhbGxMb2FkZXJPckFjdGlvbihcImFjdGlvblwiLCByZXF1ZXN0LCBhY3Rpb25NYXRjaCwgbWF0Y2hlcywgcm91dGVyLmJhc2VuYW1lKTtcblxuICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzaG9ydENpcmN1aXRlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1JlZGlyZWN0UmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIGF3YWl0IHN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uKHN0YXRlLCByZXN1bHQsIG9wdHMgJiYgb3B0cy5yZXBsYWNlID09PSB0cnVlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNob3J0Q2lyY3VpdGVkOiB0cnVlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIC8vIFN0b3JlIG9mZiB0aGUgcGVuZGluZyBlcnJvciAtIHdlIHVzZSBpdCB0byBkZXRlcm1pbmUgd2hpY2ggbG9hZGVyc1xuICAgICAgLy8gdG8gY2FsbCBhbmQgd2lsbCBjb21taXQgaXQgd2hlbiB3ZSBjb21wbGV0ZSB0aGUgbmF2aWdhdGlvblxuICAgICAgbGV0IGJvdW5kYXJ5TWF0Y2ggPSBmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMsIGFjdGlvbk1hdGNoLnJvdXRlLmlkKTsgLy8gQnkgZGVmYXVsdCwgYWxsIHN1Ym1pc3Npb25zIGFyZSBSRVBMQUNFIG5hdmlnYXRpb25zLCBidXQgaWYgdGhlXG4gICAgICAvLyBhY3Rpb24gdGhyZXcgYW4gZXJyb3IgdGhhdCdsbCBiZSByZW5kZXJlZCBpbiBhbiBlcnJvckVsZW1lbnQsIHdlIGZhbGxcbiAgICAgIC8vIGJhY2sgdG8gUFVTSCBzbyB0aGF0IHRoZSB1c2VyIGNhbiB1c2UgdGhlIGJhY2sgYnV0dG9uIHRvIGdldCBiYWNrIHRvXG4gICAgICAvLyB0aGUgcHJlLXN1Ym1pc3Npb24gZm9ybSBsb2NhdGlvbiB0byB0cnkgYWdhaW5cblxuICAgICAgaWYgKChvcHRzICYmIG9wdHMucmVwbGFjZSkgIT09IHRydWUpIHtcbiAgICAgICAgcGVuZGluZ0FjdGlvbiA9IEFjdGlvbi5QdXNoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nQWN0aW9uRXJyb3I6IHtcbiAgICAgICAgICBbYm91bmRhcnlNYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5lcnJvclxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc0RlZmVycmVkUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImRlZmVyKCkgaXMgbm90IHN1cHBvcnRlZCBpbiBhY3Rpb25zXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwZW5kaW5nQWN0aW9uRGF0YToge1xuICAgICAgICBbYWN0aW9uTWF0Y2gucm91dGUuaWRdOiByZXN1bHQuZGF0YVxuICAgICAgfVxuICAgIH07XG4gIH0gLy8gQ2FsbCBhbGwgYXBwbGljYWJsZSBsb2FkZXJzIGZvciB0aGUgZ2l2ZW4gbWF0Y2hlcywgaGFuZGxpbmcgcmVkaXJlY3RzLFxuICAvLyBlcnJvcnMsIGV0Yy5cblxuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUxvYWRlcnMocmVxdWVzdCwgbG9jYXRpb24sIG1hdGNoZXMsIG92ZXJyaWRlTmF2aWdhdGlvbiwgc3VibWlzc2lvbiwgcmVwbGFjZSwgcGVuZGluZ0FjdGlvbkRhdGEsIHBlbmRpbmdFcnJvcikge1xuICAgIC8vIEZpZ3VyZSBvdXQgdGhlIHJpZ2h0IG5hdmlnYXRpb24gd2Ugd2FudCB0byB1c2UgZm9yIGRhdGEgbG9hZGluZ1xuICAgIGxldCBsb2FkaW5nTmF2aWdhdGlvbiA9IG92ZXJyaWRlTmF2aWdhdGlvbjtcblxuICAgIGlmICghbG9hZGluZ05hdmlnYXRpb24pIHtcbiAgICAgIGxldCBuYXZpZ2F0aW9uID0ge1xuICAgICAgICBzdGF0ZTogXCJsb2FkaW5nXCIsXG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICBmb3JtTWV0aG9kOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgICAgZm9ybUVuY1R5cGU6IHVuZGVmaW5lZCxcbiAgICAgICAgZm9ybURhdGE6IHVuZGVmaW5lZFxuICAgICAgfTtcbiAgICAgIGxvYWRpbmdOYXZpZ2F0aW9uID0gbmF2aWdhdGlvbjtcbiAgICB9XG5cbiAgICBsZXQgW21hdGNoZXNUb0xvYWQsIHJldmFsaWRhdGluZ0ZldGNoZXJzXSA9IGdldE1hdGNoZXNUb0xvYWQoc3RhdGUsIG1hdGNoZXMsIHN1Ym1pc3Npb24sIGxvY2F0aW9uLCBpc1JldmFsaWRhdGlvblJlcXVpcmVkLCBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcywgY2FuY2VsbGVkRmV0Y2hlckxvYWRzLCBwZW5kaW5nQWN0aW9uRGF0YSwgcGVuZGluZ0Vycm9yLCBmZXRjaExvYWRNYXRjaGVzKTsgLy8gQ2FuY2VsIHBlbmRpbmcgZGVmZXJyZWRzIGZvciBuby1sb25nZXItbWF0Y2hlZCByb3V0ZXMgb3Igcm91dGVzIHdlJ3JlXG4gICAgLy8gYWJvdXQgdG8gcmVsb2FkLiAgTm90ZSB0aGF0IGlmIHRoaXMgaXMgYW4gYWN0aW9uIHJlbG9hZCB3ZSB3b3VsZCBoYXZlXG4gICAgLy8gYWxyZWFkeSBjYW5jZWxsZWQgYWxsIHBlbmRpbmcgZGVmZXJyZWRzIHNvIHRoaXMgd291bGQgYmUgYSBuby1vcFxuXG4gICAgY2FuY2VsQWN0aXZlRGVmZXJyZWRzKHJvdXRlSWQgPT4gIShtYXRjaGVzICYmIG1hdGNoZXMuc29tZShtID0+IG0ucm91dGUuaWQgPT09IHJvdXRlSWQpKSB8fCBtYXRjaGVzVG9Mb2FkICYmIG1hdGNoZXNUb0xvYWQuc29tZShtID0+IG0ucm91dGUuaWQgPT09IHJvdXRlSWQpKTsgLy8gU2hvcnQgY2lyY3VpdCBpZiB3ZSBoYXZlIG5vIGxvYWRlcnMgdG8gcnVuXG5cbiAgICBpZiAobWF0Y2hlc1RvTG9hZC5sZW5ndGggPT09IDAgJiYgcmV2YWxpZGF0aW5nRmV0Y2hlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb21wbGV0ZU5hdmlnYXRpb24obG9jYXRpb24sIHtcbiAgICAgICAgbWF0Y2hlcyxcbiAgICAgICAgbG9hZGVyRGF0YTogbWVyZ2VMb2FkZXJEYXRhKHN0YXRlLmxvYWRlckRhdGEsIHt9LCBtYXRjaGVzKSxcbiAgICAgICAgLy8gQ29tbWl0IHBlbmRpbmcgZXJyb3IgaWYgd2UncmUgc2hvcnQgY2lyY3VpdGluZ1xuICAgICAgICBlcnJvcnM6IHBlbmRpbmdFcnJvciB8fCBudWxsLFxuICAgICAgICBhY3Rpb25EYXRhOiBwZW5kaW5nQWN0aW9uRGF0YSB8fCBudWxsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNob3J0Q2lyY3VpdGVkOiB0cnVlXG4gICAgICB9O1xuICAgIH0gLy8gSWYgdGhpcyBpcyBhbiB1bmludGVycnVwdGVkIHJldmFsaWRhdGlvbiwgd2UgcmVtYWluIGluIG91ciBjdXJyZW50IGlkbGVcbiAgICAvLyBzdGF0ZS4gIElmIG5vdCwgd2UgbmVlZCB0byBzd2l0Y2ggdG8gb3VyIGxvYWRpbmcgc3RhdGUgYW5kIGxvYWQgZGF0YSxcbiAgICAvLyBwcmVzZXJ2aW5nIGFueSBuZXcgYWN0aW9uIGRhdGEgb3IgZXhpc3RpbmcgYWN0aW9uIGRhdGEgKGluIHRoZSBjYXNlIG9mXG4gICAgLy8gYSByZXZhbGlkYXRpb24gaW50ZXJydXB0aW5nIGFuIGFjdGlvblJlbG9hZClcblxuXG4gICAgaWYgKCFpc1VuaW50ZXJydXB0ZWRSZXZhbGlkYXRpb24pIHtcbiAgICAgIHJldmFsaWRhdGluZ0ZldGNoZXJzLmZvckVhY2goX3JlZjIgPT4ge1xuICAgICAgICBsZXQgW2tleV0gPSBfcmVmMjtcbiAgICAgICAgbGV0IGZldGNoZXIgPSBzdGF0ZS5mZXRjaGVycy5nZXQoa2V5KTtcbiAgICAgICAgbGV0IHJldmFsaWRhdGluZ0ZldGNoZXIgPSB7XG4gICAgICAgICAgc3RhdGU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgIGRhdGE6IGZldGNoZXIgJiYgZmV0Y2hlci5kYXRhLFxuICAgICAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCxcbiAgICAgICAgICBmb3JtQWN0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgZm9ybUVuY1R5cGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBmb3JtRGF0YTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHN0YXRlLmZldGNoZXJzLnNldChrZXksIHJldmFsaWRhdGluZ0ZldGNoZXIpO1xuICAgICAgfSk7XG4gICAgICB1cGRhdGVTdGF0ZShfZXh0ZW5kcyh7XG4gICAgICAgIG5hdmlnYXRpb246IGxvYWRpbmdOYXZpZ2F0aW9uLFxuICAgICAgICBhY3Rpb25EYXRhOiBwZW5kaW5nQWN0aW9uRGF0YSB8fCBzdGF0ZS5hY3Rpb25EYXRhIHx8IG51bGxcbiAgICAgIH0sIHJldmFsaWRhdGluZ0ZldGNoZXJzLmxlbmd0aCA+IDAgPyB7XG4gICAgICAgIGZldGNoZXJzOiBuZXcgTWFwKHN0YXRlLmZldGNoZXJzKVxuICAgICAgfSA6IHt9KSk7XG4gICAgfVxuXG4gICAgcGVuZGluZ05hdmlnYXRpb25Mb2FkSWQgPSArK2luY3JlbWVudGluZ0xvYWRJZDtcbiAgICByZXZhbGlkYXRpbmdGZXRjaGVycy5mb3JFYWNoKF9yZWYzID0+IHtcbiAgICAgIGxldCBba2V5XSA9IF9yZWYzO1xuICAgICAgcmV0dXJuIGZldGNoQ29udHJvbGxlcnMuc2V0KGtleSwgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyKTtcbiAgICB9KTtcbiAgICBsZXQge1xuICAgICAgcmVzdWx0cyxcbiAgICAgIGxvYWRlclJlc3VsdHMsXG4gICAgICBmZXRjaGVyUmVzdWx0c1xuICAgIH0gPSBhd2FpdCBjYWxsTG9hZGVyc0FuZE1heWJlUmVzb2x2ZURhdGEoc3RhdGUubWF0Y2hlcywgbWF0Y2hlcywgbWF0Y2hlc1RvTG9hZCwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMsIHJlcXVlc3QpO1xuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNob3J0Q2lyY3VpdGVkOiB0cnVlXG4gICAgICB9O1xuICAgIH0gLy8gQ2xlYW4gdXAgX2FmdGVyXyBsb2FkZXJzIGhhdmUgY29tcGxldGVkLiAgRG9uJ3QgY2xlYW4gdXAgaWYgd2Ugc2hvcnRcbiAgICAvLyBjaXJjdWl0ZWQgYmVjYXVzZSBmZXRjaENvbnRyb2xsZXJzIHdvdWxkIGhhdmUgYmVlbiBhYm9ydGVkIGFuZFxuICAgIC8vIHJlYXNzaWduZWQgdG8gbmV3IGNvbnRyb2xsZXJzIGZvciB0aGUgbmV4dCBuYXZpZ2F0aW9uXG5cblxuICAgIHJldmFsaWRhdGluZ0ZldGNoZXJzLmZvckVhY2goX3JlZjQgPT4ge1xuICAgICAgbGV0IFtrZXldID0gX3JlZjQ7XG4gICAgICByZXR1cm4gZmV0Y2hDb250cm9sbGVycy5kZWxldGUoa2V5KTtcbiAgICB9KTsgLy8gSWYgYW55IGxvYWRlcnMgcmV0dXJuZWQgYSByZWRpcmVjdCBSZXNwb25zZSwgc3RhcnQgYSBuZXcgUkVQTEFDRSBuYXZpZ2F0aW9uXG5cbiAgICBsZXQgcmVkaXJlY3QgPSBmaW5kUmVkaXJlY3QocmVzdWx0cyk7XG5cbiAgICBpZiAocmVkaXJlY3QpIHtcbiAgICAgIGF3YWl0IHN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uKHN0YXRlLCByZWRpcmVjdCwgcmVwbGFjZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzaG9ydENpcmN1aXRlZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9IC8vIFByb2Nlc3MgYW5kIGNvbW1pdCBvdXRwdXQgZnJvbSBsb2FkZXJzXG5cblxuICAgIGxldCB7XG4gICAgICBsb2FkZXJEYXRhLFxuICAgICAgZXJyb3JzXG4gICAgfSA9IHByb2Nlc3NMb2FkZXJEYXRhKHN0YXRlLCBtYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBsb2FkZXJSZXN1bHRzLCBwZW5kaW5nRXJyb3IsIHJldmFsaWRhdGluZ0ZldGNoZXJzLCBmZXRjaGVyUmVzdWx0cywgYWN0aXZlRGVmZXJyZWRzKTsgLy8gV2lyZSB1cCBzdWJzY3JpYmVycyB0byB1cGRhdGUgbG9hZGVyRGF0YSBhcyBwcm9taXNlcyBzZXR0bGVcblxuICAgIGFjdGl2ZURlZmVycmVkcy5mb3JFYWNoKChkZWZlcnJlZERhdGEsIHJvdXRlSWQpID0+IHtcbiAgICAgIGRlZmVycmVkRGF0YS5zdWJzY3JpYmUoYWJvcnRlZCA9PiB7XG4gICAgICAgIC8vIE5vdGU6IE5vIG5lZWQgdG8gdXBkYXRlU3RhdGUgaGVyZSBzaW5jZSB0aGUgVHJhY2tlZFByb21pc2Ugb25cbiAgICAgICAgLy8gbG9hZGVyRGF0YSBpcyBzdGFibGUgYWNyb3NzIHJlc29sdmUvcmVqZWN0XG4gICAgICAgIC8vIFJlbW92ZSB0aGlzIGluc3RhbmNlIGlmIHdlIHdlcmUgYWJvcnRlZCBvciBpZiBwcm9taXNlcyBoYXZlIHNldHRsZWRcbiAgICAgICAgaWYgKGFib3J0ZWQgfHwgZGVmZXJyZWREYXRhLmRvbmUpIHtcbiAgICAgICAgICBhY3RpdmVEZWZlcnJlZHMuZGVsZXRlKHJvdXRlSWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBtYXJrRmV0Y2hSZWRpcmVjdHNEb25lKCk7XG4gICAgbGV0IGRpZEFib3J0RmV0Y2hMb2FkcyA9IGFib3J0U3RhbGVGZXRjaExvYWRzKHBlbmRpbmdOYXZpZ2F0aW9uTG9hZElkKTtcbiAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAgbG9hZGVyRGF0YSxcbiAgICAgIGVycm9yc1xuICAgIH0sIGRpZEFib3J0RmV0Y2hMb2FkcyB8fCByZXZhbGlkYXRpbmdGZXRjaGVycy5sZW5ndGggPiAwID8ge1xuICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpXG4gICAgfSA6IHt9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZldGNoZXIoa2V5KSB7XG4gICAgcmV0dXJuIHN0YXRlLmZldGNoZXJzLmdldChrZXkpIHx8IElETEVfRkVUQ0hFUjtcbiAgfSAvLyBUcmlnZ2VyIGEgZmV0Y2hlciBsb2FkL3N1Ym1pdCBmb3IgdGhlIGdpdmVuIGZldGNoZXIga2V5XG5cblxuICBmdW5jdGlvbiBmZXRjaChrZXksIHJvdXRlSWQsIGhyZWYsIG9wdHMpIHtcbiAgICBpZiAoaXNTZXJ2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInJvdXRlci5mZXRjaCgpIHdhcyBjYWxsZWQgZHVyaW5nIHRoZSBzZXJ2ZXIgcmVuZGVyLCBidXQgaXQgc2hvdWxkbid0IGJlLiBcIiArIFwiWW91IGFyZSBsaWtlbHkgY2FsbGluZyBhIHVzZUZldGNoZXIoKSBtZXRob2QgaW4gdGhlIGJvZHkgb2YgeW91ciBjb21wb25lbnQuIFwiICsgXCJUcnkgbW92aW5nIGl0IHRvIGEgdXNlRWZmZWN0IG9yIGEgY2FsbGJhY2suXCIpO1xuICAgIH1cblxuICAgIGlmIChmZXRjaENvbnRyb2xsZXJzLmhhcyhrZXkpKSBhYm9ydEZldGNoZXIoa2V5KTtcbiAgICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIGhyZWYsIGluaXQuYmFzZW5hbWUpO1xuXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICBzZXRGZXRjaGVyRXJyb3Ioa2V5LCByb3V0ZUlkLCBnZXRJbnRlcm5hbFJvdXRlckVycm9yKDQwNCwge1xuICAgICAgICBwYXRobmFtZTogaHJlZlxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB7XG4gICAgICBwYXRoLFxuICAgICAgc3VibWlzc2lvblxuICAgIH0gPSBub3JtYWxpemVOYXZpZ2F0ZU9wdGlvbnMoaHJlZiwgb3B0cywgdHJ1ZSk7XG4gICAgbGV0IG1hdGNoID0gZ2V0VGFyZ2V0TWF0Y2gobWF0Y2hlcywgcGF0aCk7XG5cbiAgICBpZiAoc3VibWlzc2lvbikge1xuICAgICAgaGFuZGxlRmV0Y2hlckFjdGlvbihrZXksIHJvdXRlSWQsIHBhdGgsIG1hdGNoLCBtYXRjaGVzLCBzdWJtaXNzaW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFN0b3JlIG9mZiB0aGUgbWF0Y2ggc28gd2UgY2FuIGNhbGwgaXQncyBzaG91bGRSZXZhbGlkYXRlIG9uIHN1YnNlcXVlbnRcbiAgICAvLyByZXZhbGlkYXRpb25zXG5cblxuICAgIGZldGNoTG9hZE1hdGNoZXMuc2V0KGtleSwgW3BhdGgsIG1hdGNoLCBtYXRjaGVzXSk7XG4gICAgaGFuZGxlRmV0Y2hlckxvYWRlcihrZXksIHJvdXRlSWQsIHBhdGgsIG1hdGNoLCBtYXRjaGVzKTtcbiAgfSAvLyBDYWxsIHRoZSBhY3Rpb24gZm9yIHRoZSBtYXRjaGVkIGZldGNoZXIuc3VibWl0KCksIGFuZCB0aGVuIGhhbmRsZSByZWRpcmVjdHMsXG4gIC8vIGVycm9ycywgYW5kIHJldmFsaWRhdGlvblxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRmV0Y2hlckFjdGlvbihrZXksIHJvdXRlSWQsIHBhdGgsIG1hdGNoLCByZXF1ZXN0TWF0Y2hlcywgc3VibWlzc2lvbikge1xuICAgIGludGVycnVwdEFjdGl2ZUxvYWRzKCk7XG4gICAgZmV0Y2hMb2FkTWF0Y2hlcy5kZWxldGUoa2V5KTtcblxuICAgIGlmICghbWF0Y2gucm91dGUuYWN0aW9uKSB7XG4gICAgICBsZXQgZXJyb3IgPSBnZXRJbnRlcm5hbFJvdXRlckVycm9yKDQwNSwge1xuICAgICAgICBtZXRob2Q6IHN1Ym1pc3Npb24uZm9ybU1ldGhvZCxcbiAgICAgICAgcGF0aG5hbWU6IHBhdGgsXG4gICAgICAgIHJvdXRlSWQ6IHJvdXRlSWRcbiAgICAgIH0pO1xuICAgICAgc2V0RmV0Y2hlckVycm9yKGtleSwgcm91dGVJZCwgZXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gUHV0IHRoaXMgZmV0Y2hlciBpbnRvIGl0J3Mgc3VibWl0dGluZyBzdGF0ZVxuXG5cbiAgICBsZXQgZXhpc3RpbmdGZXRjaGVyID0gc3RhdGUuZmV0Y2hlcnMuZ2V0KGtleSk7XG5cbiAgICBsZXQgZmV0Y2hlciA9IF9leHRlbmRzKHtcbiAgICAgIHN0YXRlOiBcInN1Ym1pdHRpbmdcIlxuICAgIH0sIHN1Ym1pc3Npb24sIHtcbiAgICAgIGRhdGE6IGV4aXN0aW5nRmV0Y2hlciAmJiBleGlzdGluZ0ZldGNoZXIuZGF0YVxuICAgIH0pO1xuXG4gICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgZmV0Y2hlcik7XG4gICAgdXBkYXRlU3RhdGUoe1xuICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpXG4gICAgfSk7IC8vIENhbGwgdGhlIGFjdGlvbiBmb3IgdGhlIGZldGNoZXJcblxuICAgIGxldCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgbGV0IGZldGNoUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3QocGF0aCwgYWJvcnRDb250cm9sbGVyLnNpZ25hbCwgc3VibWlzc2lvbik7XG4gICAgZmV0Y2hDb250cm9sbGVycy5zZXQoa2V5LCBhYm9ydENvbnRyb2xsZXIpO1xuICAgIGxldCBhY3Rpb25SZXN1bHQgPSBhd2FpdCBjYWxsTG9hZGVyT3JBY3Rpb24oXCJhY3Rpb25cIiwgZmV0Y2hSZXF1ZXN0LCBtYXRjaCwgcmVxdWVzdE1hdGNoZXMsIHJvdXRlci5iYXNlbmFtZSk7XG5cbiAgICBpZiAoZmV0Y2hSZXF1ZXN0LnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAvLyBXZSBjYW4gZGVsZXRlIHRoaXMgc28gbG9uZyBhcyB3ZSB3ZXJlbid0IGFib3J0ZWQgYnkgb3Ugb3VyIG93biBmZXRjaGVyXG4gICAgICAvLyByZS1zdWJtaXQgd2hpY2ggd291bGQgaGF2ZSBwdXQgX25ld18gY29udHJvbGxlciBpcyBpbiBmZXRjaENvbnRyb2xsZXJzXG4gICAgICBpZiAoZmV0Y2hDb250cm9sbGVycy5nZXQoa2V5KSA9PT0gYWJvcnRDb250cm9sbGVyKSB7XG4gICAgICAgIGZldGNoQ29udHJvbGxlcnMuZGVsZXRlKGtleSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNSZWRpcmVjdFJlc3VsdChhY3Rpb25SZXN1bHQpKSB7XG4gICAgICBmZXRjaENvbnRyb2xsZXJzLmRlbGV0ZShrZXkpO1xuICAgICAgZmV0Y2hSZWRpcmVjdElkcy5hZGQoa2V5KTtcblxuICAgICAgbGV0IGxvYWRpbmdGZXRjaGVyID0gX2V4dGVuZHMoe1xuICAgICAgICBzdGF0ZTogXCJsb2FkaW5nXCJcbiAgICAgIH0sIHN1Ym1pc3Npb24sIHtcbiAgICAgICAgZGF0YTogdW5kZWZpbmVkXG4gICAgICB9KTtcblxuICAgICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgbG9hZGluZ0ZldGNoZXIpO1xuICAgICAgdXBkYXRlU3RhdGUoe1xuICAgICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycylcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uKHN0YXRlLCBhY3Rpb25SZXN1bHQpO1xuICAgIH0gLy8gUHJvY2VzcyBhbnkgbm9uLXJlZGlyZWN0IGVycm9ycyB0aHJvd25cblxuXG4gICAgaWYgKGlzRXJyb3JSZXN1bHQoYWN0aW9uUmVzdWx0KSkge1xuICAgICAgc2V0RmV0Y2hlckVycm9yKGtleSwgcm91dGVJZCwgYWN0aW9uUmVzdWx0LmVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNEZWZlcnJlZFJlc3VsdChhY3Rpb25SZXN1bHQpKSB7XG4gICAgICBpbnZhcmlhbnQoZmFsc2UsIFwiZGVmZXIoKSBpcyBub3Qgc3VwcG9ydGVkIGluIGFjdGlvbnNcIik7XG4gICAgfSAvLyBTdGFydCB0aGUgZGF0YSBsb2FkIGZvciBjdXJyZW50IG1hdGNoZXMsIG9yIHRoZSBuZXh0IGxvY2F0aW9uIGlmIHdlJ3JlXG4gICAgLy8gaW4gdGhlIG1pZGRsZSBvZiBhIG5hdmlnYXRpb25cblxuXG4gICAgbGV0IG5leHRMb2NhdGlvbiA9IHN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24gfHwgc3RhdGUubG9jYXRpb247XG4gICAgbGV0IHJldmFsaWRhdGlvblJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KG5leHRMb2NhdGlvbiwgYWJvcnRDb250cm9sbGVyLnNpZ25hbCk7XG4gICAgbGV0IG1hdGNoZXMgPSBzdGF0ZS5uYXZpZ2F0aW9uLnN0YXRlICE9PSBcImlkbGVcIiA/IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIHN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24sIGluaXQuYmFzZW5hbWUpIDogc3RhdGUubWF0Y2hlcztcbiAgICBpbnZhcmlhbnQobWF0Y2hlcywgXCJEaWRuJ3QgZmluZCBhbnkgbWF0Y2hlcyBhZnRlciBmZXRjaGVyIGFjdGlvblwiKTtcbiAgICBsZXQgbG9hZElkID0gKytpbmNyZW1lbnRpbmdMb2FkSWQ7XG4gICAgZmV0Y2hSZWxvYWRJZHMuc2V0KGtleSwgbG9hZElkKTtcblxuICAgIGxldCBsb2FkRmV0Y2hlciA9IF9leHRlbmRzKHtcbiAgICAgIHN0YXRlOiBcImxvYWRpbmdcIixcbiAgICAgIGRhdGE6IGFjdGlvblJlc3VsdC5kYXRhXG4gICAgfSwgc3VibWlzc2lvbik7XG5cbiAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCBsb2FkRmV0Y2hlcik7XG4gICAgbGV0IFttYXRjaGVzVG9Mb2FkLCByZXZhbGlkYXRpbmdGZXRjaGVyc10gPSBnZXRNYXRjaGVzVG9Mb2FkKHN0YXRlLCBtYXRjaGVzLCBzdWJtaXNzaW9uLCBuZXh0TG9jYXRpb24sIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQsIGNhbmNlbGxlZERlZmVycmVkUm91dGVzLCBjYW5jZWxsZWRGZXRjaGVyTG9hZHMsIHtcbiAgICAgIFttYXRjaC5yb3V0ZS5pZF06IGFjdGlvblJlc3VsdC5kYXRhXG4gICAgfSwgdW5kZWZpbmVkLCAvLyBObyBuZWVkIHRvIHNlbmQgdGhyb3VnaCBlcnJvcnMgc2luY2Ugd2Ugc2hvcnQgY2lyY3VpdCBhYm92ZVxuICAgIGZldGNoTG9hZE1hdGNoZXMpOyAvLyBQdXQgYWxsIHJldmFsaWRhdGluZyBmZXRjaGVycyBpbnRvIHRoZSBsb2FkaW5nIHN0YXRlLCBleGNlcHQgZm9yIHRoZVxuICAgIC8vIGN1cnJlbnQgZmV0Y2hlciB3aGljaCB3ZSB3YW50IHRvIGtlZXAgaW4gaXQncyBjdXJyZW50IGxvYWRpbmcgc3RhdGUgd2hpY2hcbiAgICAvLyBjb250YWlucyBpdCdzIGFjdGlvbiBzdWJtaXNzaW9uIGluZm8gKyBhY3Rpb24gZGF0YVxuXG4gICAgcmV2YWxpZGF0aW5nRmV0Y2hlcnMuZmlsdGVyKF9yZWY1ID0+IHtcbiAgICAgIGxldCBbc3RhbGVLZXldID0gX3JlZjU7XG4gICAgICByZXR1cm4gc3RhbGVLZXkgIT09IGtleTtcbiAgICB9KS5mb3JFYWNoKF9yZWY2ID0+IHtcbiAgICAgIGxldCBbc3RhbGVLZXldID0gX3JlZjY7XG4gICAgICBsZXQgZXhpc3RpbmdGZXRjaGVyID0gc3RhdGUuZmV0Y2hlcnMuZ2V0KHN0YWxlS2V5KTtcbiAgICAgIGxldCByZXZhbGlkYXRpbmdGZXRjaGVyID0ge1xuICAgICAgICBzdGF0ZTogXCJsb2FkaW5nXCIsXG4gICAgICAgIGRhdGE6IGV4aXN0aW5nRmV0Y2hlciAmJiBleGlzdGluZ0ZldGNoZXIuZGF0YSxcbiAgICAgICAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLFxuICAgICAgICBmb3JtQWN0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcm1EYXRhOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgICBzdGF0ZS5mZXRjaGVycy5zZXQoc3RhbGVLZXksIHJldmFsaWRhdGluZ0ZldGNoZXIpO1xuICAgICAgZmV0Y2hDb250cm9sbGVycy5zZXQoc3RhbGVLZXksIGFib3J0Q29udHJvbGxlcik7XG4gICAgfSk7XG4gICAgdXBkYXRlU3RhdGUoe1xuICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpXG4gICAgfSk7XG4gICAgbGV0IHtcbiAgICAgIHJlc3VsdHMsXG4gICAgICBsb2FkZXJSZXN1bHRzLFxuICAgICAgZmV0Y2hlclJlc3VsdHNcbiAgICB9ID0gYXdhaXQgY2FsbExvYWRlcnNBbmRNYXliZVJlc29sdmVEYXRhKHN0YXRlLm1hdGNoZXMsIG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJldmFsaWRhdGluZ0ZldGNoZXJzLCByZXZhbGlkYXRpb25SZXF1ZXN0KTtcblxuICAgIGlmIChhYm9ydENvbnRyb2xsZXIuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmZXRjaFJlbG9hZElkcy5kZWxldGUoa2V5KTtcbiAgICBmZXRjaENvbnRyb2xsZXJzLmRlbGV0ZShrZXkpO1xuICAgIHJldmFsaWRhdGluZ0ZldGNoZXJzLmZvckVhY2goX3JlZjcgPT4ge1xuICAgICAgbGV0IFtzdGFsZUtleV0gPSBfcmVmNztcbiAgICAgIHJldHVybiBmZXRjaENvbnRyb2xsZXJzLmRlbGV0ZShzdGFsZUtleSk7XG4gICAgfSk7XG4gICAgbGV0IHJlZGlyZWN0ID0gZmluZFJlZGlyZWN0KHJlc3VsdHMpO1xuXG4gICAgaWYgKHJlZGlyZWN0KSB7XG4gICAgICByZXR1cm4gc3RhcnRSZWRpcmVjdE5hdmlnYXRpb24oc3RhdGUsIHJlZGlyZWN0KTtcbiAgICB9IC8vIFByb2Nlc3MgYW5kIGNvbW1pdCBvdXRwdXQgZnJvbSBsb2FkZXJzXG5cblxuICAgIGxldCB7XG4gICAgICBsb2FkZXJEYXRhLFxuICAgICAgZXJyb3JzXG4gICAgfSA9IHByb2Nlc3NMb2FkZXJEYXRhKHN0YXRlLCBzdGF0ZS5tYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBsb2FkZXJSZXN1bHRzLCB1bmRlZmluZWQsIHJldmFsaWRhdGluZ0ZldGNoZXJzLCBmZXRjaGVyUmVzdWx0cywgYWN0aXZlRGVmZXJyZWRzKTtcbiAgICBsZXQgZG9uZUZldGNoZXIgPSB7XG4gICAgICBzdGF0ZTogXCJpZGxlXCIsXG4gICAgICBkYXRhOiBhY3Rpb25SZXN1bHQuZGF0YSxcbiAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCxcbiAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsXG4gICAgICBmb3JtRGF0YTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCBkb25lRmV0Y2hlcik7XG4gICAgbGV0IGRpZEFib3J0RmV0Y2hMb2FkcyA9IGFib3J0U3RhbGVGZXRjaExvYWRzKGxvYWRJZCk7IC8vIElmIHdlIGFyZSBjdXJyZW50bHkgaW4gYSBuYXZpZ2F0aW9uIGxvYWRpbmcgc3RhdGUgYW5kIHRoaXMgZmV0Y2hlciBpc1xuICAgIC8vIG1vcmUgcmVjZW50IHRoYW4gdGhlIG5hdmlnYXRpb24sIHdlIHdhbnQgdGhlIG5ld2VyIGRhdGEgc28gYWJvcnQgdGhlXG4gICAgLy8gbmF2aWdhdGlvbiBhbmQgY29tcGxldGUgaXQgd2l0aCB0aGUgZmV0Y2hlciBkYXRhXG5cbiAgICBpZiAoc3RhdGUubmF2aWdhdGlvbi5zdGF0ZSA9PT0gXCJsb2FkaW5nXCIgJiYgbG9hZElkID4gcGVuZGluZ05hdmlnYXRpb25Mb2FkSWQpIHtcbiAgICAgIGludmFyaWFudChwZW5kaW5nQWN0aW9uLCBcIkV4cGVjdGVkIHBlbmRpbmcgYWN0aW9uXCIpO1xuICAgICAgcGVuZGluZ05hdmlnYXRpb25Db250cm9sbGVyICYmIHBlbmRpbmdOYXZpZ2F0aW9uQ29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgY29tcGxldGVOYXZpZ2F0aW9uKHN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24sIHtcbiAgICAgICAgbWF0Y2hlcyxcbiAgICAgICAgbG9hZGVyRGF0YSxcbiAgICAgICAgZXJyb3JzLFxuICAgICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycylcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlcndpc2UganVzdCB1cGRhdGUgd2l0aCB0aGUgZmV0Y2hlciBkYXRhLCBwcmVzZXJ2aW5nIGFueSBleGlzdGluZ1xuICAgICAgLy8gbG9hZGVyRGF0YSBmb3IgbG9hZGVycyB0aGF0IGRpZCBub3QgbmVlZCB0byByZWxvYWQuICBXZSBoYXZlIHRvXG4gICAgICAvLyBtYW51YWxseSBtZXJnZSBoZXJlIHNpbmNlIHdlIGFyZW4ndCBnb2luZyB0aHJvdWdoIGNvbXBsZXRlTmF2aWdhdGlvblxuICAgICAgdXBkYXRlU3RhdGUoX2V4dGVuZHMoe1xuICAgICAgICBlcnJvcnMsXG4gICAgICAgIGxvYWRlckRhdGE6IG1lcmdlTG9hZGVyRGF0YShzdGF0ZS5sb2FkZXJEYXRhLCBsb2FkZXJEYXRhLCBtYXRjaGVzKVxuICAgICAgfSwgZGlkQWJvcnRGZXRjaExvYWRzID8ge1xuICAgICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycylcbiAgICAgIH0gOiB7fSkpO1xuICAgICAgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSAvLyBDYWxsIHRoZSBtYXRjaGVkIGxvYWRlciBmb3IgZmV0Y2hlci5sb2FkKCksIGhhbmRsaW5nIHJlZGlyZWN0cywgZXJyb3JzLCBldGMuXG5cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGZXRjaGVyTG9hZGVyKGtleSwgcm91dGVJZCwgcGF0aCwgbWF0Y2gsIG1hdGNoZXMpIHtcbiAgICBsZXQgZXhpc3RpbmdGZXRjaGVyID0gc3RhdGUuZmV0Y2hlcnMuZ2V0KGtleSk7IC8vIFB1dCB0aGlzIGZldGNoZXIgaW50byBpdCdzIGxvYWRpbmcgc3RhdGVcblxuICAgIGxldCBsb2FkaW5nRmV0Y2hlciA9IHtcbiAgICAgIHN0YXRlOiBcImxvYWRpbmdcIixcbiAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCxcbiAgICAgIGZvcm1BY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsXG4gICAgICBmb3JtRGF0YTogdW5kZWZpbmVkLFxuICAgICAgZGF0YTogZXhpc3RpbmdGZXRjaGVyICYmIGV4aXN0aW5nRmV0Y2hlci5kYXRhXG4gICAgfTtcbiAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCBsb2FkaW5nRmV0Y2hlcik7XG4gICAgdXBkYXRlU3RhdGUoe1xuICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpXG4gICAgfSk7IC8vIENhbGwgdGhlIGxvYWRlciBmb3IgdGhpcyBmZXRjaGVyIHJvdXRlIG1hdGNoXG5cbiAgICBsZXQgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGxldCBmZXRjaFJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0KHBhdGgsIGFib3J0Q29udHJvbGxlci5zaWduYWwpO1xuICAgIGZldGNoQ29udHJvbGxlcnMuc2V0KGtleSwgYWJvcnRDb250cm9sbGVyKTtcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY2FsbExvYWRlck9yQWN0aW9uKFwibG9hZGVyXCIsIGZldGNoUmVxdWVzdCwgbWF0Y2gsIG1hdGNoZXMsIHJvdXRlci5iYXNlbmFtZSk7IC8vIERlZmVycmVkIGlzbid0IHN1cHBvcnRlZCBvciBmZXRjaGVyIGxvYWRzLCBhd2FpdCBldmVyeXRoaW5nIGFuZCB0cmVhdCBpdFxuICAgIC8vIGFzIGEgbm9ybWFsIGxvYWQuICByZXNvbHZlRGVmZXJyZWREYXRhIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCBpZiB0aGlzXG4gICAgLy8gZmV0Y2hlciBnZXRzIGFib3J0ZWQsIHNvIHdlIGp1c3QgbGVhdmUgcmVzdWx0IHVudG91Y2hlZCBhbmQgc2hvcnQgY2lyY3VpdFxuICAgIC8vIGJlbG93IGlmIHRoYXQgaGFwcGVuc1xuXG4gICAgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0gKGF3YWl0IHJlc29sdmVEZWZlcnJlZERhdGEocmVzdWx0LCBmZXRjaFJlcXVlc3Quc2lnbmFsLCB0cnVlKSkgfHwgcmVzdWx0O1xuICAgIH0gLy8gV2UgY2FuIGRlbGV0ZSB0aGlzIHNvIGxvbmcgYXMgd2Ugd2VyZW4ndCBhYm9ydGVkIGJ5IG91IG91ciBvd24gZmV0Y2hlclxuICAgIC8vIHJlLWxvYWQgd2hpY2ggd291bGQgaGF2ZSBwdXQgX25ld18gY29udHJvbGxlciBpcyBpbiBmZXRjaENvbnRyb2xsZXJzXG5cblxuICAgIGlmIChmZXRjaENvbnRyb2xsZXJzLmdldChrZXkpID09PSBhYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgIGZldGNoQ29udHJvbGxlcnMuZGVsZXRlKGtleSk7XG4gICAgfVxuXG4gICAgaWYgKGZldGNoUmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gSWYgdGhlIGxvYWRlciB0aHJldyBhIHJlZGlyZWN0IFJlc3BvbnNlLCBzdGFydCBhIG5ldyBSRVBMQUNFIG5hdmlnYXRpb25cblxuXG4gICAgaWYgKGlzUmVkaXJlY3RSZXN1bHQocmVzdWx0KSkge1xuICAgICAgYXdhaXQgc3RhcnRSZWRpcmVjdE5hdmlnYXRpb24oc3RhdGUsIHJlc3VsdCk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBQcm9jZXNzIGFueSBub24tcmVkaXJlY3QgZXJyb3JzIHRocm93blxuXG5cbiAgICBpZiAoaXNFcnJvclJlc3VsdChyZXN1bHQpKSB7XG4gICAgICBsZXQgYm91bmRhcnlNYXRjaCA9IGZpbmROZWFyZXN0Qm91bmRhcnkoc3RhdGUubWF0Y2hlcywgcm91dGVJZCk7XG4gICAgICBzdGF0ZS5mZXRjaGVycy5kZWxldGUoa2V5KTsgLy8gVE9ETzogSW4gcmVtaXgsIHRoaXMgd291bGQgcmVzZXQgdG8gSURMRV9OQVZJR0FUSU9OIGlmIGl0IHdhcyBhIGNhdGNoIC1cbiAgICAgIC8vIGRvIHdlIG5lZWQgdG8gYmVoYXZlIGFueSBkaWZmZXJlbnRseSB3aXRoIG91ciBub24tcmVkaXJlY3QgZXJyb3JzP1xuICAgICAgLy8gV2hhdCBpZiBpdCB3YXMgYSBub24tcmVkaXJlY3QgUmVzcG9uc2U/XG5cbiAgICAgIHVwZGF0ZVN0YXRlKHtcbiAgICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpLFxuICAgICAgICBlcnJvcnM6IHtcbiAgICAgICAgICBbYm91bmRhcnlNYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5lcnJvclxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbnZhcmlhbnQoIWlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSwgXCJVbmhhbmRsZWQgZmV0Y2hlciBkZWZlcnJlZCBkYXRhXCIpOyAvLyBQdXQgdGhlIGZldGNoZXIgYmFjayBpbnRvIGFuIGlkbGUgc3RhdGVcblxuICAgIGxldCBkb25lRmV0Y2hlciA9IHtcbiAgICAgIHN0YXRlOiBcImlkbGVcIixcbiAgICAgIGRhdGE6IHJlc3VsdC5kYXRhLFxuICAgICAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLFxuICAgICAgZm9ybUFjdGlvbjogdW5kZWZpbmVkLFxuICAgICAgZm9ybUVuY1R5cGU6IHVuZGVmaW5lZCxcbiAgICAgIGZvcm1EYXRhOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHN0YXRlLmZldGNoZXJzLnNldChrZXksIGRvbmVGZXRjaGVyKTtcbiAgICB1cGRhdGVTdGF0ZSh7XG4gICAgICBmZXRjaGVyczogbmV3IE1hcChzdGF0ZS5mZXRjaGVycylcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBoYW5kbGUgcmVkaXJlY3RzIHJldHVybmVkIGZyb20gYW4gYWN0aW9uIG9yIGxvYWRlci5cbiAgICogTm9ybWFsbHksIGEgcmVkaXJlY3QgXCJyZXBsYWNlc1wiIHRoZSBuYXZpZ2F0aW9uIHRoYXQgdHJpZ2dlcmVkIGl0LiAgU28sIGZvclxuICAgKiBleGFtcGxlOlxuICAgKlxuICAgKiAgLSB1c2VyIGlzIG9uIC9hXG4gICAqICAtIHVzZXIgY2xpY2tzIGEgbGluayB0byAvYlxuICAgKiAgLSBsb2FkZXIgZm9yIC9iIHJlZGlyZWN0cyB0byAvY1xuICAgKlxuICAgKiBJbiBhIG5vbi1KUyBhcHAgdGhlIGJyb3dzZXIgd291bGQgdHJhY2sgdGhlIGluLWZsaWdodCBuYXZpZ2F0aW9uIHRvIC9iIGFuZFxuICAgKiB0aGVuIHJlcGxhY2UgaXQgd2l0aCAvYyB3aGVuIGl0IGVuY291bnRlcmVkIHRoZSByZWRpcmVjdCByZXNwb25zZS4gIEluXG4gICAqIHRoZSBlbmQgaXQgd291bGQgb25seSBldmVyIHVwZGF0ZSB0aGUgVVJMIGJhciB3aXRoIC9jLlxuICAgKlxuICAgKiBJbiBjbGllbnQtc2lkZSByb3V0aW5nIHVzaW5nIHB1c2hTdGF0ZS9yZXBsYWNlU3RhdGUsIHdlIGFpbSB0byBlbXVsYXRlXG4gICAqIHRoaXMgYmVoYXZpb3IgYW5kIHdlIGFsc28gZG8gbm90IHVwZGF0ZSBoaXN0b3J5IHVudGlsIHRoZSBlbmQgb2YgdGhlXG4gICAqIG5hdmlnYXRpb24gKGluY2x1ZGluZyBwcm9jZXNzZWQgcmVkaXJlY3RzKS4gIFRoaXMgbWVhbnMgdGhhdCB3ZSBuZXZlclxuICAgKiBhY3R1YWxseSB0b3VjaCBoaXN0b3J5IHVudGlsIHdlJ3ZlIHByb2Nlc3NlZCByZWRpcmVjdHMsIHNvIHdlIGp1c3QgdXNlXG4gICAqIHRoZSBoaXN0b3J5IGFjdGlvbiBmcm9tIHRoZSBvcmlnaW5hbCBuYXZpZ2F0aW9uIChQVVNIIG9yIFJFUExBQ0UpLlxuICAgKi9cblxuXG4gIGFzeW5jIGZ1bmN0aW9uIHN0YXJ0UmVkaXJlY3ROYXZpZ2F0aW9uKHN0YXRlLCByZWRpcmVjdCwgcmVwbGFjZSkge1xuICAgIGlmIChyZWRpcmVjdC5yZXZhbGlkYXRlKSB7XG4gICAgICBpc1JldmFsaWRhdGlvblJlcXVpcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgcmVkaXJlY3RMb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHN0YXRlLmxvY2F0aW9uLCByZWRpcmVjdC5sb2NhdGlvbik7XG4gICAgaW52YXJpYW50KHJlZGlyZWN0TG9jYXRpb24sIFwiRXhwZWN0ZWQgYSBsb2NhdGlvbiBvbiB0aGUgcmVkaXJlY3QgbmF2aWdhdGlvblwiKTtcblxuICAgIGlmIChyZWRpcmVjdC5leHRlcm5hbCAmJiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cubG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHJlZGlyZWN0LmxvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24ocmVkaXJlY3QubG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfSAvLyBUaGVyZSdzIG5vIG5lZWQgdG8gYWJvcnQgb24gcmVkaXJlY3RzLCBzaW5jZSB3ZSBkb24ndCBkZXRlY3QgdGhlXG4gICAgLy8gcmVkaXJlY3QgdW50aWwgdGhlIGFjdGlvbi9sb2FkZXJzIGhhdmUgc2V0dGxlZFxuXG5cbiAgICBwZW5kaW5nTmF2aWdhdGlvbkNvbnRyb2xsZXIgPSBudWxsO1xuICAgIGxldCByZWRpcmVjdEhpc3RvcnlBY3Rpb24gPSByZXBsYWNlID09PSB0cnVlID8gQWN0aW9uLlJlcGxhY2UgOiBBY3Rpb24uUHVzaDtcbiAgICBsZXQge1xuICAgICAgZm9ybU1ldGhvZCxcbiAgICAgIGZvcm1BY3Rpb24sXG4gICAgICBmb3JtRW5jVHlwZSxcbiAgICAgIGZvcm1EYXRhXG4gICAgfSA9IHN0YXRlLm5hdmlnYXRpb247IC8vIElmIHRoaXMgd2FzIGEgMzA3LzMwOCBzdWJtaXNzaW9uIHdlIHdhbnQgdG8gcHJlc2VydmUgdGhlIEhUVFAgbWV0aG9kIGFuZFxuICAgIC8vIHJlLXN1Ym1pdCB0aGUgUE9TVC9QVVQvUEFUQ0gvREVMRVRFIGFzIGEgc3VibWlzc2lvbiBuYXZpZ2F0aW9uIHRvIHRoZVxuICAgIC8vIHJlZGlyZWN0ZWQgbG9jYXRpb25cblxuICAgIGlmIChyZWRpcmVjdFByZXNlcnZlTWV0aG9kU3RhdHVzQ29kZXMuaGFzKHJlZGlyZWN0LnN0YXR1cykgJiYgZm9ybU1ldGhvZCAmJiBpc1N1Ym1pc3Npb25NZXRob2QoZm9ybU1ldGhvZCkgJiYgZm9ybUVuY1R5cGUgJiYgZm9ybURhdGEpIHtcbiAgICAgIGF3YWl0IHN0YXJ0TmF2aWdhdGlvbihyZWRpcmVjdEhpc3RvcnlBY3Rpb24sIHJlZGlyZWN0TG9jYXRpb24sIHtcbiAgICAgICAgc3VibWlzc2lvbjoge1xuICAgICAgICAgIGZvcm1NZXRob2QsXG4gICAgICAgICAgZm9ybUFjdGlvbjogcmVkaXJlY3QubG9jYXRpb24sXG4gICAgICAgICAgZm9ybUVuY1R5cGUsXG4gICAgICAgICAgZm9ybURhdGFcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgd2Uga2ljayBvZmYgYSBuZXcgbG9hZGluZyBuYXZpZ2F0aW9uLCBwcmVzZXJ2aW5nIHRoZVxuICAgICAgLy8gc3VibWlzc2lvbiBpbmZvIGZvciB0aGUgZHVyYXRpb24gb2YgdGhpcyBuYXZpZ2F0aW9uXG4gICAgICBhd2FpdCBzdGFydE5hdmlnYXRpb24ocmVkaXJlY3RIaXN0b3J5QWN0aW9uLCByZWRpcmVjdExvY2F0aW9uLCB7XG4gICAgICAgIG92ZXJyaWRlTmF2aWdhdGlvbjoge1xuICAgICAgICAgIHN0YXRlOiBcImxvYWRpbmdcIixcbiAgICAgICAgICBsb2NhdGlvbjogcmVkaXJlY3RMb2NhdGlvbixcbiAgICAgICAgICBmb3JtTWV0aG9kOiBmb3JtTWV0aG9kIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBmb3JtQWN0aW9uOiBmb3JtQWN0aW9uIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBmb3JtRW5jVHlwZTogZm9ybUVuY1R5cGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YSB8fCB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gY2FsbExvYWRlcnNBbmRNYXliZVJlc29sdmVEYXRhKGN1cnJlbnRNYXRjaGVzLCBtYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBmZXRjaGVyc1RvTG9hZCwgcmVxdWVzdCkge1xuICAgIC8vIENhbGwgYWxsIG5hdmlnYXRpb24gbG9hZGVycyBhbmQgcmV2YWxpZGF0aW5nIGZldGNoZXIgbG9hZGVycyBpbiBwYXJhbGxlbCxcbiAgICAvLyB0aGVuIHNsaWNlIG9mZiB0aGUgcmVzdWx0cyBpbnRvIHNlcGFyYXRlIGFycmF5cyBzbyB3ZSBjYW4gaGFuZGxlIHRoZW1cbiAgICAvLyBhY2NvcmRpbmdseVxuICAgIGxldCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoWy4uLm1hdGNoZXNUb0xvYWQubWFwKG1hdGNoID0+IGNhbGxMb2FkZXJPckFjdGlvbihcImxvYWRlclwiLCByZXF1ZXN0LCBtYXRjaCwgbWF0Y2hlcywgcm91dGVyLmJhc2VuYW1lKSksIC4uLmZldGNoZXJzVG9Mb2FkLm1hcChfcmVmOCA9PiB7XG4gICAgICBsZXQgWywgaHJlZiwgbWF0Y2gsIGZldGNoTWF0Y2hlc10gPSBfcmVmODtcbiAgICAgIHJldHVybiBjYWxsTG9hZGVyT3JBY3Rpb24oXCJsb2FkZXJcIiwgY3JlYXRlUmVxdWVzdChocmVmLCByZXF1ZXN0LnNpZ25hbCksIG1hdGNoLCBmZXRjaE1hdGNoZXMsIHJvdXRlci5iYXNlbmFtZSk7XG4gICAgfSldKTtcbiAgICBsZXQgbG9hZGVyUmVzdWx0cyA9IHJlc3VsdHMuc2xpY2UoMCwgbWF0Y2hlc1RvTG9hZC5sZW5ndGgpO1xuICAgIGxldCBmZXRjaGVyUmVzdWx0cyA9IHJlc3VsdHMuc2xpY2UobWF0Y2hlc1RvTG9hZC5sZW5ndGgpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtyZXNvbHZlRGVmZXJyZWRSZXN1bHRzKGN1cnJlbnRNYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCBsb2FkZXJSZXN1bHRzLCByZXF1ZXN0LnNpZ25hbCwgZmFsc2UsIHN0YXRlLmxvYWRlckRhdGEpLCByZXNvbHZlRGVmZXJyZWRSZXN1bHRzKGN1cnJlbnRNYXRjaGVzLCBmZXRjaGVyc1RvTG9hZC5tYXAoX3JlZjkgPT4ge1xuICAgICAgbGV0IFssLCBtYXRjaF0gPSBfcmVmOTtcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KSwgZmV0Y2hlclJlc3VsdHMsIHJlcXVlc3Quc2lnbmFsLCB0cnVlKV0pO1xuICAgIHJldHVybiB7XG4gICAgICByZXN1bHRzLFxuICAgICAgbG9hZGVyUmVzdWx0cyxcbiAgICAgIGZldGNoZXJSZXN1bHRzXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVycnVwdEFjdGl2ZUxvYWRzKCkge1xuICAgIC8vIEV2ZXJ5IGludGVycnVwdGlvbiB0cmlnZ2VycyBhIHJldmFsaWRhdGlvblxuICAgIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQgPSB0cnVlOyAvLyBDYW5jZWwgcGVuZGluZyByb3V0ZS1sZXZlbCBkZWZlcnJlZHMgYW5kIG1hcmsgY2FuY2VsbGVkIHJvdXRlcyBmb3JcbiAgICAvLyByZXZhbGlkYXRpb25cblxuICAgIGNhbmNlbGxlZERlZmVycmVkUm91dGVzLnB1c2goLi4uY2FuY2VsQWN0aXZlRGVmZXJyZWRzKCkpOyAvLyBBYm9ydCBpbi1mbGlnaHQgZmV0Y2hlciBsb2Fkc1xuXG4gICAgZmV0Y2hMb2FkTWF0Y2hlcy5mb3JFYWNoKChfLCBrZXkpID0+IHtcbiAgICAgIGlmIChmZXRjaENvbnRyb2xsZXJzLmhhcyhrZXkpKSB7XG4gICAgICAgIGNhbmNlbGxlZEZldGNoZXJMb2Fkcy5wdXNoKGtleSk7XG4gICAgICAgIGFib3J0RmV0Y2hlcihrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RmV0Y2hlckVycm9yKGtleSwgcm91dGVJZCwgZXJyb3IpIHtcbiAgICBsZXQgYm91bmRhcnlNYXRjaCA9IGZpbmROZWFyZXN0Qm91bmRhcnkoc3RhdGUubWF0Y2hlcywgcm91dGVJZCk7XG4gICAgZGVsZXRlRmV0Y2hlcihrZXkpO1xuICAgIHVwZGF0ZVN0YXRlKHtcbiAgICAgIGVycm9yczoge1xuICAgICAgICBbYm91bmRhcnlNYXRjaC5yb3V0ZS5pZF06IGVycm9yXG4gICAgICB9LFxuICAgICAgZmV0Y2hlcnM6IG5ldyBNYXAoc3RhdGUuZmV0Y2hlcnMpXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVGZXRjaGVyKGtleSkge1xuICAgIGlmIChmZXRjaENvbnRyb2xsZXJzLmhhcyhrZXkpKSBhYm9ydEZldGNoZXIoa2V5KTtcbiAgICBmZXRjaExvYWRNYXRjaGVzLmRlbGV0ZShrZXkpO1xuICAgIGZldGNoUmVsb2FkSWRzLmRlbGV0ZShrZXkpO1xuICAgIGZldGNoUmVkaXJlY3RJZHMuZGVsZXRlKGtleSk7XG4gICAgc3RhdGUuZmV0Y2hlcnMuZGVsZXRlKGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBhYm9ydEZldGNoZXIoa2V5KSB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBmZXRjaENvbnRyb2xsZXJzLmdldChrZXkpO1xuICAgIGludmFyaWFudChjb250cm9sbGVyLCBcIkV4cGVjdGVkIGZldGNoIGNvbnRyb2xsZXI6IFwiICsga2V5KTtcbiAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgZmV0Y2hDb250cm9sbGVycy5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtGZXRjaGVyc0RvbmUoa2V5cykge1xuICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICBsZXQgZmV0Y2hlciA9IGdldEZldGNoZXIoa2V5KTtcbiAgICAgIGxldCBkb25lRmV0Y2hlciA9IHtcbiAgICAgICAgc3RhdGU6IFwiaWRsZVwiLFxuICAgICAgICBkYXRhOiBmZXRjaGVyLmRhdGEsXG4gICAgICAgIGZvcm1NZXRob2Q6IHVuZGVmaW5lZCxcbiAgICAgICAgZm9ybUFjdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBmb3JtRW5jVHlwZTogdW5kZWZpbmVkLFxuICAgICAgICBmb3JtRGF0YTogdW5kZWZpbmVkXG4gICAgICB9O1xuICAgICAgc3RhdGUuZmV0Y2hlcnMuc2V0KGtleSwgZG9uZUZldGNoZXIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtGZXRjaFJlZGlyZWN0c0RvbmUoKSB7XG4gICAgbGV0IGRvbmVLZXlzID0gW107XG5cbiAgICBmb3IgKGxldCBrZXkgb2YgZmV0Y2hSZWRpcmVjdElkcykge1xuICAgICAgbGV0IGZldGNoZXIgPSBzdGF0ZS5mZXRjaGVycy5nZXQoa2V5KTtcbiAgICAgIGludmFyaWFudChmZXRjaGVyLCBcIkV4cGVjdGVkIGZldGNoZXI6IFwiICsga2V5KTtcblxuICAgICAgaWYgKGZldGNoZXIuc3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgICAgIGZldGNoUmVkaXJlY3RJZHMuZGVsZXRlKGtleSk7XG4gICAgICAgIGRvbmVLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtYXJrRmV0Y2hlcnNEb25lKGRvbmVLZXlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFib3J0U3RhbGVGZXRjaExvYWRzKGxhbmRlZElkKSB7XG4gICAgbGV0IHllZXRlZEtleXMgPSBbXTtcblxuICAgIGZvciAobGV0IFtrZXksIGlkXSBvZiBmZXRjaFJlbG9hZElkcykge1xuICAgICAgaWYgKGlkIDwgbGFuZGVkSWQpIHtcbiAgICAgICAgbGV0IGZldGNoZXIgPSBzdGF0ZS5mZXRjaGVycy5nZXQoa2V5KTtcbiAgICAgICAgaW52YXJpYW50KGZldGNoZXIsIFwiRXhwZWN0ZWQgZmV0Y2hlcjogXCIgKyBrZXkpO1xuXG4gICAgICAgIGlmIChmZXRjaGVyLnN0YXRlID09PSBcImxvYWRpbmdcIikge1xuICAgICAgICAgIGFib3J0RmV0Y2hlcihrZXkpO1xuICAgICAgICAgIGZldGNoUmVsb2FkSWRzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgIHllZXRlZEtleXMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFya0ZldGNoZXJzRG9uZSh5ZWV0ZWRLZXlzKTtcbiAgICByZXR1cm4geWVldGVkS2V5cy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsQWN0aXZlRGVmZXJyZWRzKHByZWRpY2F0ZSkge1xuICAgIGxldCBjYW5jZWxsZWRSb3V0ZUlkcyA9IFtdO1xuICAgIGFjdGl2ZURlZmVycmVkcy5mb3JFYWNoKChkZmQsIHJvdXRlSWQpID0+IHtcbiAgICAgIGlmICghcHJlZGljYXRlIHx8IHByZWRpY2F0ZShyb3V0ZUlkKSkge1xuICAgICAgICAvLyBDYW5jZWwgdGhlIGRlZmVycmVkIC0gYnV0IGRvIG5vdCByZW1vdmUgZnJvbSBhY3RpdmVEZWZlcnJlZHMgaGVyZSAtXG4gICAgICAgIC8vIHdlIHJlbHkgb24gdGhlIHN1YnNjcmliZXJzIHRvIGRvIHRoYXQgc28gb3VyIHRlc3RzIGNhbiBhc3NlcnQgcHJvcGVyXG4gICAgICAgIC8vIGNsZWFudXAgdmlhIF9pbnRlcm5hbEFjdGl2ZURlZmVycmVkc1xuICAgICAgICBkZmQuY2FuY2VsKCk7XG4gICAgICAgIGNhbmNlbGxlZFJvdXRlSWRzLnB1c2gocm91dGVJZCk7XG4gICAgICAgIGFjdGl2ZURlZmVycmVkcy5kZWxldGUocm91dGVJZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNhbmNlbGxlZFJvdXRlSWRzO1xuICB9IC8vIE9wdCBpbiB0byBjYXB0dXJpbmcgYW5kIHJlcG9ydGluZyBzY3JvbGwgcG9zaXRpb25zIGR1cmluZyBuYXZpZ2F0aW9ucyxcbiAgLy8gdXNlZCBieSB0aGUgPFNjcm9sbFJlc3RvcmF0aW9uPiBjb21wb25lbnRcblxuXG4gIGZ1bmN0aW9uIGVuYWJsZVNjcm9sbFJlc3RvcmF0aW9uKHBvc2l0aW9ucywgZ2V0UG9zaXRpb24sIGdldEtleSkge1xuICAgIHNhdmVkU2Nyb2xsUG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgIGdldFNjcm9sbFBvc2l0aW9uID0gZ2V0UG9zaXRpb247XG5cbiAgICBnZXRTY3JvbGxSZXN0b3JhdGlvbktleSA9IGdldEtleSB8fCAobG9jYXRpb24gPT4gbG9jYXRpb24ua2V5KTsgLy8gUGVyZm9ybSBpbml0aWFsIGh5ZHJhdGlvbiBzY3JvbGwgcmVzdG9yYXRpb24sIHNpbmNlIHdlIG1pc3MgdGhlIGJvYXQgb25cbiAgICAvLyB0aGUgaW5pdGlhbCB1cGRhdGVTdGF0ZSgpIGJlY2F1c2Ugd2UndmUgbm90IHlldCByZW5kZXJlZCA8U2Nyb2xsUmVzdG9yYXRpb24vPlxuICAgIC8vIGFuZCB0aGVyZWZvcmUgaGF2ZSBubyBzYXZlZFNjcm9sbFBvc2l0aW9ucyBhdmFpbGFibGVcblxuXG4gICAgaWYgKCFpbml0aWFsU2Nyb2xsUmVzdG9yZWQgJiYgc3RhdGUubmF2aWdhdGlvbiA9PT0gSURMRV9OQVZJR0FUSU9OKSB7XG4gICAgICBpbml0aWFsU2Nyb2xsUmVzdG9yZWQgPSB0cnVlO1xuICAgICAgbGV0IHkgPSBnZXRTYXZlZFNjcm9sbFBvc2l0aW9uKHN0YXRlLmxvY2F0aW9uLCBzdGF0ZS5tYXRjaGVzKTtcblxuICAgICAgaWYgKHkgIT0gbnVsbCkge1xuICAgICAgICB1cGRhdGVTdGF0ZSh7XG4gICAgICAgICAgcmVzdG9yZVNjcm9sbFBvc2l0aW9uOiB5XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzYXZlZFNjcm9sbFBvc2l0aW9ucyA9IG51bGw7XG4gICAgICBnZXRTY3JvbGxQb3NpdGlvbiA9IG51bGw7XG4gICAgICBnZXRTY3JvbGxSZXN0b3JhdGlvbktleSA9IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVTY3JvbGxQb3NpdGlvbihsb2NhdGlvbiwgbWF0Y2hlcykge1xuICAgIGlmIChzYXZlZFNjcm9sbFBvc2l0aW9ucyAmJiBnZXRTY3JvbGxSZXN0b3JhdGlvbktleSAmJiBnZXRTY3JvbGxQb3NpdGlvbikge1xuICAgICAgbGV0IHVzZXJNYXRjaGVzID0gbWF0Y2hlcy5tYXAobSA9PiBjcmVhdGVVc2VNYXRjaGVzTWF0Y2gobSwgc3RhdGUubG9hZGVyRGF0YSkpO1xuICAgICAgbGV0IGtleSA9IGdldFNjcm9sbFJlc3RvcmF0aW9uS2V5KGxvY2F0aW9uLCB1c2VyTWF0Y2hlcykgfHwgbG9jYXRpb24ua2V5O1xuICAgICAgc2F2ZWRTY3JvbGxQb3NpdGlvbnNba2V5XSA9IGdldFNjcm9sbFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2F2ZWRTY3JvbGxQb3NpdGlvbihsb2NhdGlvbiwgbWF0Y2hlcykge1xuICAgIGlmIChzYXZlZFNjcm9sbFBvc2l0aW9ucyAmJiBnZXRTY3JvbGxSZXN0b3JhdGlvbktleSAmJiBnZXRTY3JvbGxQb3NpdGlvbikge1xuICAgICAgbGV0IHVzZXJNYXRjaGVzID0gbWF0Y2hlcy5tYXAobSA9PiBjcmVhdGVVc2VNYXRjaGVzTWF0Y2gobSwgc3RhdGUubG9hZGVyRGF0YSkpO1xuICAgICAgbGV0IGtleSA9IGdldFNjcm9sbFJlc3RvcmF0aW9uS2V5KGxvY2F0aW9uLCB1c2VyTWF0Y2hlcykgfHwgbG9jYXRpb24ua2V5O1xuICAgICAgbGV0IHkgPSBzYXZlZFNjcm9sbFBvc2l0aW9uc1trZXldO1xuXG4gICAgICBpZiAodHlwZW9mIHkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIHk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByb3V0ZXIgPSB7XG4gICAgZ2V0IGJhc2VuYW1lKCkge1xuICAgICAgcmV0dXJuIGluaXQuYmFzZW5hbWU7XG4gICAgfSxcblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LFxuXG4gICAgZ2V0IHJvdXRlcygpIHtcbiAgICAgIHJldHVybiBkYXRhUm91dGVzO1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplLFxuICAgIHN1YnNjcmliZSxcbiAgICBlbmFibGVTY3JvbGxSZXN0b3JhdGlvbixcbiAgICBuYXZpZ2F0ZSxcbiAgICBmZXRjaCxcbiAgICByZXZhbGlkYXRlLFxuICAgIC8vIFBhc3N0aHJvdWdoIHRvIGhpc3RvcnktYXdhcmUgY3JlYXRlSHJlZiB1c2VkIGJ5IHVzZUhyZWYgc28gd2UgZ2V0IHByb3BlclxuICAgIC8vIGhhc2gtYXdhcmUgVVJMcyBpbiBET00gcGF0aHNcbiAgICBjcmVhdGVIcmVmOiB0byA9PiBpbml0Lmhpc3RvcnkuY3JlYXRlSHJlZih0byksXG4gICAgZW5jb2RlTG9jYXRpb246IHRvID0+IGluaXQuaGlzdG9yeS5lbmNvZGVMb2NhdGlvbih0byksXG4gICAgZ2V0RmV0Y2hlcixcbiAgICBkZWxldGVGZXRjaGVyLFxuICAgIGRpc3Bvc2UsXG4gICAgX2ludGVybmFsRmV0Y2hDb250cm9sbGVyczogZmV0Y2hDb250cm9sbGVycyxcbiAgICBfaW50ZXJuYWxBY3RpdmVEZWZlcnJlZHM6IGFjdGl2ZURlZmVycmVkc1xuICB9O1xuICByZXR1cm4gcm91dGVyO1xufSAvLyNlbmRyZWdpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyNyZWdpb24gY3JlYXRlU3RhdGljSGFuZGxlclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gdW5zdGFibGVfY3JlYXRlU3RhdGljSGFuZGxlcihyb3V0ZXMsIG9wdHMpIHtcbiAgaW52YXJpYW50KHJvdXRlcy5sZW5ndGggPiAwLCBcIllvdSBtdXN0IHByb3ZpZGUgYSBub24tZW1wdHkgcm91dGVzIGFycmF5IHRvIHVuc3RhYmxlX2NyZWF0ZVN0YXRpY0hhbmRsZXJcIik7XG4gIGxldCBkYXRhUm91dGVzID0gY29udmVydFJvdXRlc1RvRGF0YVJvdXRlcyhyb3V0ZXMpO1xuICBsZXQgYmFzZW5hbWUgPSAob3B0cyA/IG9wdHMuYmFzZW5hbWUgOiBudWxsKSB8fCBcIi9cIjtcbiAgLyoqXG4gICAqIFRoZSBxdWVyeSgpIG1ldGhvZCBpcyBpbnRlbmRlZCBmb3IgZG9jdW1lbnQgcmVxdWVzdHMsIGluIHdoaWNoIHdlIHdhbnQgdG9cbiAgICogY2FsbCBhbiBvcHRpb25hbCBhY3Rpb24gYW5kIHBvdGVudGlhbGx5IG11bHRpcGxlIGxvYWRlcnMgZm9yIGFsbCBuZXN0ZWRcbiAgICogcm91dGVzLiAgSXQgcmV0dXJucyBhIFN0YXRpY0hhbmRsZXJDb250ZXh0IG9iamVjdCwgd2hpY2ggaXMgdmVyeSBzaW1pbGFyXG4gICAqIHRvIHRoZSByb3V0ZXIgc3RhdGUgKGxvY2F0aW9uLCBsb2FkZXJEYXRhLCBhY3Rpb25EYXRhLCBlcnJvcnMsIGV0Yy4pIGFuZFxuICAgKiBhbHNvIGFkZHMgU1NSLXNwZWNpZmljIGluZm9ybWF0aW9uIHN1Y2ggYXMgdGhlIHN0YXR1c0NvZGUgYW5kIGhlYWRlcnNcbiAgICogZnJvbSBhY3Rpb24vbG9hZGVycyBSZXNwb25zZXMuXG4gICAqXG4gICAqIEl0IF9zaG91bGRfIG5ldmVyIHRocm93IGFuZCBzaG91bGQgcmVwb3J0IGFsbCBlcnJvcnMgdGhyb3VnaCB0aGVcbiAgICogcmV0dXJuZWQgY29udGV4dC5lcnJvcnMgb2JqZWN0LCBwcm9wZXJseSBhc3NvY2lhdGluZyBlcnJvcnMgdG8gdGhlaXIgZXJyb3JcbiAgICogYm91bmRhcnkuICBBZGRpdGlvbmFsbHksIGl0IHRyYWNrcyBfZGVlcGVzdFJlbmRlcmVkQm91bmRhcnlJZCB3aGljaCBjYW4gYmVcbiAgICogdXNlZCB0byBlbXVsYXRlIFJlYWN0IGVycm9yIGJvdW5kYXJpZXMgZHVyaW5nIFNTciBieSBwZXJmb3JtaW5nIGEgc2Vjb25kXG4gICAqIHBhc3Mgb25seSBkb3duIHRvIHRoZSBib3VuZGFyeUlkLlxuICAgKlxuICAgKiBUaGUgb25lIGV4Y2VwdGlvbiB3aGVyZSB3ZSBkbyBub3QgcmV0dXJuIGEgU3RhdGljSGFuZGxlckNvbnRleHQgaXMgd2hlbiBhXG4gICAqIHJlZGlyZWN0IHJlc3BvbnNlIGlzIHJldHVybmVkIG9yIHRocm93biBmcm9tIGFueSBhY3Rpb24vbG9hZGVyLiAgV2VcbiAgICogcHJvcGFnYXRlIHRoYXQgb3V0IGFuZCByZXR1cm4gdGhlIHJhdyBSZXNwb25zZSBzbyB0aGUgSFRUUCBzZXJ2ZXIgY2FuXG4gICAqIHJldHVybiBpdCBkaXJlY3RseS5cbiAgICovXG5cbiAgYXN5bmMgZnVuY3Rpb24gcXVlcnkocmVxdWVzdCkge1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgICBsZXQgbWV0aG9kID0gcmVxdWVzdC5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihcIlwiLCBjcmVhdGVQYXRoKHVybCksIG51bGwsIFwiZGVmYXVsdFwiKTtcbiAgICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKGRhdGFSb3V0ZXMsIGxvY2F0aW9uLCBiYXNlbmFtZSk7IC8vIFNTUiBzdXBwb3J0cyBIRUFEIHJlcXVlc3RzIHdoaWxlIFNQQSBkb2Vzbid0XG5cbiAgICBpZiAoIWlzVmFsaWRNZXRob2QobWV0aG9kKSAmJiBtZXRob2QgIT09IFwiaGVhZFwiKSB7XG4gICAgICBsZXQgZXJyb3IgPSBnZXRJbnRlcm5hbFJvdXRlckVycm9yKDQwNSwge1xuICAgICAgICBtZXRob2RcbiAgICAgIH0pO1xuICAgICAgbGV0IHtcbiAgICAgICAgbWF0Y2hlczogbWV0aG9kTm90QWxsb3dlZE1hdGNoZXMsXG4gICAgICAgIHJvdXRlXG4gICAgICB9ID0gZ2V0U2hvcnRDaXJjdWl0TWF0Y2hlcyhkYXRhUm91dGVzKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJhc2VuYW1lLFxuICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgbWF0Y2hlczogbWV0aG9kTm90QWxsb3dlZE1hdGNoZXMsXG4gICAgICAgIGxvYWRlckRhdGE6IHt9LFxuICAgICAgICBhY3Rpb25EYXRhOiBudWxsLFxuICAgICAgICBlcnJvcnM6IHtcbiAgICAgICAgICBbcm91dGUuaWRdOiBlcnJvclxuICAgICAgICB9LFxuICAgICAgICBzdGF0dXNDb2RlOiBlcnJvci5zdGF0dXMsXG4gICAgICAgIGxvYWRlckhlYWRlcnM6IHt9LFxuICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCFtYXRjaGVzKSB7XG4gICAgICBsZXQgZXJyb3IgPSBnZXRJbnRlcm5hbFJvdXRlckVycm9yKDQwNCwge1xuICAgICAgICBwYXRobmFtZTogbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgIH0pO1xuICAgICAgbGV0IHtcbiAgICAgICAgbWF0Y2hlczogbm90Rm91bmRNYXRjaGVzLFxuICAgICAgICByb3V0ZVxuICAgICAgfSA9IGdldFNob3J0Q2lyY3VpdE1hdGNoZXMoZGF0YVJvdXRlcyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYXNlbmFtZSxcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIG1hdGNoZXM6IG5vdEZvdW5kTWF0Y2hlcyxcbiAgICAgICAgbG9hZGVyRGF0YToge30sXG4gICAgICAgIGFjdGlvbkRhdGE6IG51bGwsXG4gICAgICAgIGVycm9yczoge1xuICAgICAgICAgIFtyb3V0ZS5pZF06IGVycm9yXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1cyxcbiAgICAgICAgbG9hZGVySGVhZGVyczoge30sXG4gICAgICAgIGFjdGlvbkhlYWRlcnM6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBxdWVyeUltcGwocmVxdWVzdCwgbG9jYXRpb24sIG1hdGNoZXMpO1xuXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gLy8gV2hlbiByZXR1cm5pbmcgU3RhdGljSGFuZGxlckNvbnRleHQsIHdlIHBhdGNoIGJhY2sgaW4gdGhlIGxvY2F0aW9uIGhlcmVcbiAgICAvLyBzaW5jZSB3ZSBuZWVkIGl0IGZvciBSZWFjdCBDb250ZXh0LiAgQnV0IHRoaXMgaGVscHMga2VlcCBvdXIgc3VibWl0IGFuZFxuICAgIC8vIGxvYWRSb3V0ZURhdGEgb3BlcmF0aW5nIG9uIGEgUmVxdWVzdCBpbnN0ZWFkIG9mIGEgTG9jYXRpb25cblxuXG4gICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgYmFzZW5hbWVcbiAgICB9LCByZXN1bHQpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgcXVlcnlSb3V0ZSgpIG1ldGhvZCBpcyBpbnRlbmRlZCBmb3IgdGFyZ2V0ZWQgcm91dGUgcmVxdWVzdHMsIGVpdGhlclxuICAgKiBmb3IgZmV0Y2ggP19kYXRhIHJlcXVlc3RzIG9yIHJlc291cmNlIHJvdXRlIHJlcXVlc3RzLiAgSW4gdGhpcyBjYXNlLCB3ZVxuICAgKiBhcmUgb25seSBldmVyIGNhbGxpbmcgYSBzaW5nbGUgYWN0aW9uIG9yIGxvYWRlciwgYW5kIHdlIGFyZSByZXR1cm5pbmcgdGhlXG4gICAqIHJldHVybmVkIHZhbHVlIGRpcmVjdGx5LiAgSW4gbW9zdCBjYXNlcywgdGhpcyB3aWxsIGJlIGEgUmVzcG9uc2UgcmV0dXJuZWRcbiAgICogZnJvbSB0aGUgYWN0aW9uL2xvYWRlciwgYnV0IGl0IG1heSBiZSBhIHByaW1pdGl2ZSBvciBvdGhlciB2YWx1ZSBhcyB3ZWxsIC1cbiAgICogYW5kIGluIHN1Y2ggY2FzZXMgdGhlIGNhbGxpbmcgY29udGV4dCBzaG91bGQgaGFuZGxlIHRoYXQgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIFdlIGRvIHJlc3BlY3QgdGhlIHRocm93L3JldHVybiBkaWZmZXJlbnRpYXRpb24sIHNvIGlmIGFuIGFjdGlvbi9sb2FkZXJcbiAgICogdGhyb3dzLCB0aGVuIHRoaXMgbWV0aG9kIHdpbGwgdGhyb3cgdGhlIHZhbHVlLiAgVGhpcyBpcyBpbXBvcnRhbnQgc28gd2VcbiAgICogY2FuIGRvIHByb3BlciBib3VuZGFyeSBpZGVudGlmaWNhdGlvbiBpbiBSZW1peCB3aGVyZSBhIHRocm93biBSZXNwb25zZVxuICAgKiBtdXN0IGdvIHRvIHRoZSBDYXRjaCBCb3VuZGFyeSBidXQgYSByZXR1cm5lZCBSZXNwb25zZSBpcyBoYXBweS1wYXRoLlxuICAgKlxuICAgKiBPbmUgdGhpbmcgdG8gbm90ZSBpcyB0aGF0IGFueSBSb3V0ZXItaW5pdGlhdGVkIEVycm9ycyB0aGF0IG1ha2Ugc2Vuc2VcbiAgICogdG8gYXNzb2NpYXRlIHdpdGggYSBzdGF0dXMgY29kZSB3aWxsIGJlIHRocm93biBhcyBhbiBFcnJvclJlc3BvbnNlXG4gICAqIGluc3RhbmNlIHdoaWNoIGluY2x1ZGUgdGhlIHJhdyBFcnJvciwgc3VjaCB0aGF0IHRoZSBjYWxsaW5nIGNvbnRleHQgY2FuXG4gICAqIHNlcmlhbGl6ZSB0aGUgZXJyb3IgYXMgdGhleSBzZWUgZml0IHdoaWxlIGluY2x1ZGluZyB0aGUgcHJvcGVyIHJlc3BvbnNlXG4gICAqIGNvZGUuICBFeGFtcGxlcyBoZXJlIGFyZSA0MDQgYW5kIDQwNSBlcnJvcnMgdGhhdCBvY2N1ciBwcmlvciB0byByZWFjaGluZ1xuICAgKiBhbnkgdXNlci1kZWZpbmVkIGxvYWRlcnMuXG4gICAqL1xuXG5cbiAgYXN5bmMgZnVuY3Rpb24gcXVlcnlSb3V0ZShyZXF1ZXN0LCByb3V0ZUlkKSB7XG4gICAgbGV0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuICAgIGxldCBtZXRob2QgPSByZXF1ZXN0Lm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKFwiXCIsIGNyZWF0ZVBhdGgodXJsKSwgbnVsbCwgXCJkZWZhdWx0XCIpO1xuICAgIGxldCBtYXRjaGVzID0gbWF0Y2hSb3V0ZXMoZGF0YVJvdXRlcywgbG9jYXRpb24sIGJhc2VuYW1lKTsgLy8gU1NSIHN1cHBvcnRzIEhFQUQgcmVxdWVzdHMgd2hpbGUgU1BBIGRvZXNuJ3RcblxuICAgIGlmICghaXNWYWxpZE1ldGhvZChtZXRob2QpICYmIG1ldGhvZCAhPT0gXCJoZWFkXCIpIHtcbiAgICAgIHRocm93IGdldEludGVybmFsUm91dGVyRXJyb3IoNDA1LCB7XG4gICAgICAgIG1ldGhvZFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghbWF0Y2hlcykge1xuICAgICAgdGhyb3cgZ2V0SW50ZXJuYWxSb3V0ZXJFcnJvcig0MDQsIHtcbiAgICAgICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgbWF0Y2ggPSByb3V0ZUlkID8gbWF0Y2hlcy5maW5kKG0gPT4gbS5yb3V0ZS5pZCA9PT0gcm91dGVJZCkgOiBnZXRUYXJnZXRNYXRjaChtYXRjaGVzLCBsb2NhdGlvbik7XG5cbiAgICBpZiAocm91dGVJZCAmJiAhbWF0Y2gpIHtcbiAgICAgIHRocm93IGdldEludGVybmFsUm91dGVyRXJyb3IoNDAzLCB7XG4gICAgICAgIHBhdGhuYW1lOiBsb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgcm91dGVJZFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghbWF0Y2gpIHtcbiAgICAgIC8vIFRoaXMgc2hvdWxkIG5ldmVyIGhpdCBJIGRvbid0IHRoaW5rP1xuICAgICAgdGhyb3cgZ2V0SW50ZXJuYWxSb3V0ZXJFcnJvcig0MDQsIHtcbiAgICAgICAgcGF0aG5hbWU6IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgcXVlcnlJbXBsKHJlcXVlc3QsIGxvY2F0aW9uLCBtYXRjaGVzLCBtYXRjaCk7XG5cbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbGV0IGVycm9yID0gcmVzdWx0LmVycm9ycyA/IE9iamVjdC52YWx1ZXMocmVzdWx0LmVycm9ycylbMF0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gSWYgd2UgZ290IGJhY2sgcmVzdWx0LmVycm9ycywgdGhhdCBtZWFucyB0aGUgbG9hZGVyL2FjdGlvbiB0aHJld1xuICAgICAgLy8gX3NvbWV0aGluZ18gdGhhdCB3YXNuJ3QgYSBSZXNwb25zZSwgYnV0IGl0J3Mgbm90IGd1YXJhbnRlZWQvcmVxdWlyZWRcbiAgICAgIC8vIHRvIGJlIGFuIGBpbnN0YW5jZW9mIEVycm9yYCBlaXRoZXIsIHNvIHdlIGhhdmUgdG8gdXNlIHRocm93IGhlcmUgdG9cbiAgICAgIC8vIHByZXNlcnZlIHRoZSBcImVycm9yXCIgc3RhdGUgb3V0c2lkZSBvZiBxdWVyeUltcGwuXG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9IC8vIFBpY2sgb2ZmIHRoZSByaWdodCBzdGF0ZSB2YWx1ZSB0byByZXR1cm5cblxuXG4gICAgbGV0IHJvdXRlRGF0YSA9IFtyZXN1bHQuYWN0aW9uRGF0YSwgcmVzdWx0LmxvYWRlckRhdGFdLmZpbmQodiA9PiB2KTtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhyb3V0ZURhdGEgfHwge30pWzBdO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gcXVlcnlJbXBsKHJlcXVlc3QsIGxvY2F0aW9uLCBtYXRjaGVzLCByb3V0ZU1hdGNoKSB7XG4gICAgaW52YXJpYW50KHJlcXVlc3Quc2lnbmFsLCBcInF1ZXJ5KCkvcXVlcnlSb3V0ZSgpIHJlcXVlc3RzIG11c3QgY29udGFpbiBhbiBBYm9ydENvbnRyb2xsZXIgc2lnbmFsXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc1N1Ym1pc3Npb25NZXRob2QocmVxdWVzdC5tZXRob2QudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHN1Ym1pdChyZXF1ZXN0LCBtYXRjaGVzLCByb3V0ZU1hdGNoIHx8IGdldFRhcmdldE1hdGNoKG1hdGNoZXMsIGxvY2F0aW9uKSwgcm91dGVNYXRjaCAhPSBudWxsKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGxvYWRSb3V0ZURhdGEocmVxdWVzdCwgbWF0Y2hlcywgcm91dGVNYXRjaCk7XG4gICAgICByZXR1cm4gcmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UgPyByZXN1bHQgOiBfZXh0ZW5kcyh7fSwgcmVzdWx0LCB7XG4gICAgICAgIGFjdGlvbkRhdGE6IG51bGwsXG4gICAgICAgIGFjdGlvbkhlYWRlcnM6IHt9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciB0aHJldy9yZXR1cm5lZCBhIFJlc3BvbnNlIGluIGNhbGxMb2FkZXJPckFjdGlvbiwgd2UgdGhyb3dcbiAgICAgIC8vIGl0IHRvIGJhaWwgb3V0IGFuZCB0aGVuIHJldHVybiBvciB0aHJvdyBoZXJlIGJhc2VkIG9uIHdoZXRoZXIgdGhlIHVzZXJcbiAgICAgIC8vIHJldHVybmVkIG9yIHRocmV3XG4gICAgICBpZiAoaXNRdWVyeVJvdXRlUmVzcG9uc2UoZSkpIHtcbiAgICAgICAgaWYgKGUudHlwZSA9PT0gUmVzdWx0VHlwZS5lcnJvciAmJiAhaXNSZWRpcmVjdFJlc3BvbnNlKGUucmVzcG9uc2UpKSB7XG4gICAgICAgICAgdGhyb3cgZS5yZXNwb25zZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlLnJlc3BvbnNlO1xuICAgICAgfSAvLyBSZWRpcmVjdHMgYXJlIGFsd2F5cyByZXR1cm5lZCBzaW5jZSB0aGV5IGRvbid0IHByb3BhZ2F0ZSB0byBjYXRjaFxuICAgICAgLy8gYm91bmRhcmllc1xuXG5cbiAgICAgIGlmIChpc1JlZGlyZWN0UmVzcG9uc2UoZSkpIHtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9XG5cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gc3VibWl0KHJlcXVlc3QsIG1hdGNoZXMsIGFjdGlvbk1hdGNoLCBpc1JvdXRlUmVxdWVzdCkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoIWFjdGlvbk1hdGNoLnJvdXRlLmFjdGlvbikge1xuICAgICAgbGV0IGVycm9yID0gZ2V0SW50ZXJuYWxSb3V0ZXJFcnJvcig0MDUsIHtcbiAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgcGF0aG5hbWU6IGNyZWF0ZVVSTChyZXF1ZXN0LnVybCkucGF0aG5hbWUsXG4gICAgICAgIHJvdXRlSWQ6IGFjdGlvbk1hdGNoLnJvdXRlLmlkXG4gICAgICB9KTtcblxuICAgICAgaWYgKGlzUm91dGVSZXF1ZXN0KSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIHR5cGU6IFJlc3VsdFR5cGUuZXJyb3IsXG4gICAgICAgIGVycm9yXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBjYWxsTG9hZGVyT3JBY3Rpb24oXCJhY3Rpb25cIiwgcmVxdWVzdCwgYWN0aW9uTWF0Y2gsIG1hdGNoZXMsIGJhc2VuYW1lLCB0cnVlLCBpc1JvdXRlUmVxdWVzdCk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgIGxldCBtZXRob2QgPSBpc1JvdXRlUmVxdWVzdCA/IFwicXVlcnlSb3V0ZVwiIDogXCJxdWVyeVwiO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWV0aG9kICsgXCIoKSBjYWxsIGFib3J0ZWRcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzUmVkaXJlY3RSZXN1bHQocmVzdWx0KSkge1xuICAgICAgLy8gVWhoaGggLSB0aGlzIHNob3VsZCBuZXZlciBoYXBwZW4sIHdlIHNob3VsZCBhbHdheXMgdGhyb3cgdGhlc2UgZnJvbVxuICAgICAgLy8gY2FsbExvYWRlck9yQWN0aW9uLCBidXQgdGhlIHR5cGUgbmFycm93aW5nIGhlcmUga2VlcHMgVFMgaGFwcHkgYW5kIHdlXG4gICAgICAvLyBjYW4gZ2V0IGJhY2sgb24gdGhlIFwidGhyb3cgYWxsIHJlZGlyZWN0IHJlc3BvbnNlc1wiIHRyYWluIGhlcmUgc2hvdWxkXG4gICAgICAvLyB0aGlzIGV2ZXIgaGFwcGVuIDovXG4gICAgICB0aHJvdyBuZXcgUmVzcG9uc2UobnVsbCwge1xuICAgICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXMsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBMb2NhdGlvbjogcmVzdWx0LmxvY2F0aW9uXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0RlZmVycmVkUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImRlZmVyKCkgaXMgbm90IHN1cHBvcnRlZCBpbiBhY3Rpb25zXCIpO1xuICAgIH1cblxuICAgIGlmIChpc1JvdXRlUmVxdWVzdCkge1xuICAgICAgLy8gTm90ZTogVGhpcyBzaG91bGQgb25seSBiZSBub24tUmVzcG9uc2UgdmFsdWVzIGlmIHdlIGdldCBoZXJlLCBzaW5jZVxuICAgICAgLy8gaXNSb3V0ZVJlcXVlc3Qgc2hvdWxkIHRocm93IGFueSBSZXNwb25zZSByZWNlaXZlZCBpbiBjYWxsTG9hZGVyT3JBY3Rpb25cbiAgICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYXRjaGVzOiBbYWN0aW9uTWF0Y2hdLFxuICAgICAgICBsb2FkZXJEYXRhOiB7fSxcbiAgICAgICAgYWN0aW9uRGF0YToge1xuICAgICAgICAgIFthY3Rpb25NYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5kYXRhXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yczogbnVsbCxcbiAgICAgICAgLy8gTm90ZTogc3RhdHVzQ29kZSArIGhlYWRlcnMgYXJlIHVudXNlZCBoZXJlIHNpbmNlIHF1ZXJ5Um91dGUgd2lsbFxuICAgICAgICAvLyByZXR1cm4gdGhlIHJhdyBSZXNwb25zZSBvciB2YWx1ZVxuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGxvYWRlckhlYWRlcnM6IHt9LFxuICAgICAgICBhY3Rpb25IZWFkZXJzOiB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoaXNFcnJvclJlc3VsdChyZXN1bHQpKSB7XG4gICAgICAvLyBTdG9yZSBvZmYgdGhlIHBlbmRpbmcgZXJyb3IgLSB3ZSB1c2UgaXQgdG8gZGV0ZXJtaW5lIHdoaWNoIGxvYWRlcnNcbiAgICAgIC8vIHRvIGNhbGwgYW5kIHdpbGwgY29tbWl0IGl0IHdoZW4gd2UgY29tcGxldGUgdGhlIG5hdmlnYXRpb25cbiAgICAgIGxldCBib3VuZGFyeU1hdGNoID0gZmluZE5lYXJlc3RCb3VuZGFyeShtYXRjaGVzLCBhY3Rpb25NYXRjaC5yb3V0ZS5pZCk7XG4gICAgICBsZXQgY29udGV4dCA9IGF3YWl0IGxvYWRSb3V0ZURhdGEocmVxdWVzdCwgbWF0Y2hlcywgdW5kZWZpbmVkLCB7XG4gICAgICAgIFtib3VuZGFyeU1hdGNoLnJvdXRlLmlkXTogcmVzdWx0LmVycm9yXG4gICAgICB9KTsgLy8gYWN0aW9uIHN0YXR1cyBjb2RlcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBsb2FkZXIgc3RhdHVzIGNvZGVzXG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgY29udGV4dCwge1xuICAgICAgICBzdGF0dXNDb2RlOiBpc1JvdXRlRXJyb3JSZXNwb25zZShyZXN1bHQuZXJyb3IpID8gcmVzdWx0LmVycm9yLnN0YXR1cyA6IDUwMCxcbiAgICAgICAgYWN0aW9uRGF0YTogbnVsbCxcbiAgICAgICAgYWN0aW9uSGVhZGVyczogX2V4dGVuZHMoe30sIHJlc3VsdC5oZWFkZXJzID8ge1xuICAgICAgICAgIFthY3Rpb25NYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5oZWFkZXJzXG4gICAgICAgIH0gOiB7fSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBjb250ZXh0ID0gYXdhaXQgbG9hZFJvdXRlRGF0YShyZXF1ZXN0LCBtYXRjaGVzKTtcbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGNvbnRleHQsIHJlc3VsdC5zdGF0dXNDb2RlID8ge1xuICAgICAgc3RhdHVzQ29kZTogcmVzdWx0LnN0YXR1c0NvZGVcbiAgICB9IDoge30sIHtcbiAgICAgIGFjdGlvbkRhdGE6IHtcbiAgICAgICAgW2FjdGlvbk1hdGNoLnJvdXRlLmlkXTogcmVzdWx0LmRhdGFcbiAgICAgIH0sXG4gICAgICBhY3Rpb25IZWFkZXJzOiBfZXh0ZW5kcyh7fSwgcmVzdWx0LmhlYWRlcnMgPyB7XG4gICAgICAgIFthY3Rpb25NYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5oZWFkZXJzXG4gICAgICB9IDoge30pXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBsb2FkUm91dGVEYXRhKHJlcXVlc3QsIG1hdGNoZXMsIHJvdXRlTWF0Y2gsIHBlbmRpbmdBY3Rpb25FcnJvcikge1xuICAgIGxldCBpc1JvdXRlUmVxdWVzdCA9IHJvdXRlTWF0Y2ggIT0gbnVsbDsgLy8gU2hvcnQgY2lyY3VpdCBpZiB3ZSBoYXZlIG5vIGxvYWRlcnMgdG8gcnVuIChxdWVyeVJvdXRlKCkpXG5cbiAgICBpZiAoaXNSb3V0ZVJlcXVlc3QgJiYgIShyb3V0ZU1hdGNoICE9IG51bGwgJiYgcm91dGVNYXRjaC5yb3V0ZS5sb2FkZXIpKSB7XG4gICAgICB0aHJvdyBnZXRJbnRlcm5hbFJvdXRlckVycm9yKDQwMCwge1xuICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuICAgICAgICBwYXRobmFtZTogY3JlYXRlVVJMKHJlcXVlc3QudXJsKS5wYXRobmFtZSxcbiAgICAgICAgcm91dGVJZDogcm91dGVNYXRjaCA9PSBudWxsID8gdm9pZCAwIDogcm91dGVNYXRjaC5yb3V0ZS5pZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3RNYXRjaGVzID0gcm91dGVNYXRjaCA/IFtyb3V0ZU1hdGNoXSA6IGdldExvYWRlck1hdGNoZXNVbnRpbEJvdW5kYXJ5KG1hdGNoZXMsIE9iamVjdC5rZXlzKHBlbmRpbmdBY3Rpb25FcnJvciB8fCB7fSlbMF0pO1xuICAgIGxldCBtYXRjaGVzVG9Mb2FkID0gcmVxdWVzdE1hdGNoZXMuZmlsdGVyKG0gPT4gbS5yb3V0ZS5sb2FkZXIpOyAvLyBTaG9ydCBjaXJjdWl0IGlmIHdlIGhhdmUgbm8gbG9hZGVycyB0byBydW4gKHF1ZXJ5KCkpXG5cbiAgICBpZiAobWF0Y2hlc1RvTG9hZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1hdGNoZXMsXG4gICAgICAgIGxvYWRlckRhdGE6IHt9LFxuICAgICAgICBlcnJvcnM6IHBlbmRpbmdBY3Rpb25FcnJvciB8fCBudWxsLFxuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGxvYWRlckhlYWRlcnM6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxldCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoWy4uLm1hdGNoZXNUb0xvYWQubWFwKG1hdGNoID0+IGNhbGxMb2FkZXJPckFjdGlvbihcImxvYWRlclwiLCByZXF1ZXN0LCBtYXRjaCwgbWF0Y2hlcywgYmFzZW5hbWUsIHRydWUsIGlzUm91dGVSZXF1ZXN0KSldKTtcblxuICAgIGlmIChyZXF1ZXN0LnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICBsZXQgbWV0aG9kID0gaXNSb3V0ZVJlcXVlc3QgPyBcInF1ZXJ5Um91dGVcIiA6IFwicXVlcnlcIjtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXRob2QgKyBcIigpIGNhbGwgYWJvcnRlZFwiKTtcbiAgICB9IC8vIENhbid0IGRvIGFueXRoaW5nIHdpdGggdGhlc2Ugd2l0aG91dCB0aGUgUmVtaXggc2lkZSBvZiB0aGluZ3MsIHNvIGp1c3RcbiAgICAvLyBjYW5jZWwgdGhlbSBmb3Igbm93XG5cblxuICAgIHJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xuICAgICAgaWYgKGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQuZGVmZXJyZWREYXRhLmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH0pOyAvLyBQcm9jZXNzIGFuZCBjb21taXQgb3V0cHV0IGZyb20gbG9hZGVyc1xuXG4gICAgbGV0IGNvbnRleHQgPSBwcm9jZXNzUm91dGVMb2FkZXJEYXRhKG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJlc3VsdHMsIHBlbmRpbmdBY3Rpb25FcnJvcik7XG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBjb250ZXh0LCB7XG4gICAgICBtYXRjaGVzXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRhdGFSb3V0ZXMsXG4gICAgcXVlcnksXG4gICAgcXVlcnlSb3V0ZVxuICB9O1xufSAvLyNlbmRyZWdpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyNyZWdpb24gSGVscGVyc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLyoqXG4gKiBHaXZlbiBhbiBleGlzdGluZyBTdGF0aWNIYW5kbGVyQ29udGV4dCBhbmQgYW4gZXJyb3IgdGhyb3duIGF0IHJlbmRlciB0aW1lLFxuICogcHJvdmlkZSBhbiB1cGRhdGVkIFN0YXRpY0hhbmRsZXJDb250ZXh0IHN1aXRhYmxlIGZvciBhIHNlY29uZCBTU1IgcmVuZGVyXG4gKi9cblxuZnVuY3Rpb24gZ2V0U3RhdGljQ29udGV4dEZyb21FcnJvcihyb3V0ZXMsIGNvbnRleHQsIGVycm9yKSB7XG4gIGxldCBuZXdDb250ZXh0ID0gX2V4dGVuZHMoe30sIGNvbnRleHQsIHtcbiAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgZXJyb3JzOiB7XG4gICAgICBbY29udGV4dC5fZGVlcGVzdFJlbmRlcmVkQm91bmRhcnlJZCB8fCByb3V0ZXNbMF0uaWRdOiBlcnJvclxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld0NvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGlzU3VibWlzc2lvbk5hdmlnYXRpb24ob3B0cykge1xuICByZXR1cm4gb3B0cyAhPSBudWxsICYmIFwiZm9ybURhdGFcIiBpbiBvcHRzO1xufSAvLyBOb3JtYWxpemUgbmF2aWdhdGlvbiBvcHRpb25zIGJ5IGNvbnZlcnRpbmcgZm9ybU1ldGhvZD1HRVQgZm9ybURhdGEgb2JqZWN0cyB0b1xuLy8gVVJMU2VhcmNoUGFyYW1zIHNvIHRoZXkgYmVoYXZlIGlkZW50aWNhbGx5IHRvIGxpbmtzIHdpdGggcXVlcnkgcGFyYW1zXG5cblxuZnVuY3Rpb24gbm9ybWFsaXplTmF2aWdhdGVPcHRpb25zKHRvLCBvcHRzLCBpc0ZldGNoZXIpIHtcbiAgaWYgKGlzRmV0Y2hlciA9PT0gdm9pZCAwKSB7XG4gICAgaXNGZXRjaGVyID0gZmFsc2U7XG4gIH1cblxuICBsZXQgcGF0aCA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IHRvIDogY3JlYXRlUGF0aCh0byk7IC8vIFJldHVybiBsb2NhdGlvbiB2ZXJiYXRpbSBvbiBub24tc3VibWlzc2lvbiBuYXZpZ2F0aW9uc1xuXG4gIGlmICghb3B0cyB8fCAhaXNTdWJtaXNzaW9uTmF2aWdhdGlvbihvcHRzKSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoXG4gICAgfTtcbiAgfVxuXG4gIGlmIChvcHRzLmZvcm1NZXRob2QgJiYgIWlzVmFsaWRNZXRob2Qob3B0cy5mb3JtTWV0aG9kKSkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoLFxuICAgICAgZXJyb3I6IGdldEludGVybmFsUm91dGVyRXJyb3IoNDA1LCB7XG4gICAgICAgIG1ldGhvZDogb3B0cy5mb3JtTWV0aG9kXG4gICAgICB9KVxuICAgIH07XG4gIH0gLy8gQ3JlYXRlIGEgU3VibWlzc2lvbiBvbiBub24tR0VUIG5hdmlnYXRpb25zXG5cblxuICBpZiAob3B0cy5mb3JtTWV0aG9kICYmIGlzU3VibWlzc2lvbk1ldGhvZChvcHRzLmZvcm1NZXRob2QpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGgsXG4gICAgICBzdWJtaXNzaW9uOiB7XG4gICAgICAgIGZvcm1NZXRob2Q6IG9wdHMuZm9ybU1ldGhvZCxcbiAgICAgICAgZm9ybUFjdGlvbjogc3RyaXBIYXNoRnJvbVBhdGgocGF0aCksXG4gICAgICAgIGZvcm1FbmNUeXBlOiBvcHRzICYmIG9wdHMuZm9ybUVuY1R5cGUgfHwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgZm9ybURhdGE6IG9wdHMuZm9ybURhdGFcbiAgICAgIH1cbiAgICB9O1xuICB9IC8vIEZsYXR0ZW4gc3VibWlzc2lvbiBvbnRvIFVSTFNlYXJjaFBhcmFtcyBmb3IgR0VUIHN1Ym1pc3Npb25zXG5cblxuICBsZXQgcGFyc2VkUGF0aCA9IHBhcnNlUGF0aChwYXRoKTtcblxuICB0cnkge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBjb252ZXJ0Rm9ybURhdGFUb1NlYXJjaFBhcmFtcyhvcHRzLmZvcm1EYXRhKTsgLy8gU2luY2UgZmV0Y2hlciBHRVQgc3VibWlzc2lvbnMgb25seSBydW4gYSBzaW5nbGUgbG9hZGVyIChhcyBvcHBvc2VkIHRvXG4gICAgLy8gbmF2aWdhdGlvbiBHRVQgc3VibWlzc2lvbnMgd2hpY2ggcnVuIGFsbCBsb2FkZXJzKSwgd2UgbmVlZCB0byBwcmVzZXJ2ZVxuICAgIC8vIGFueSBpbmNvbWluZyA/aW5kZXggcGFyYW1zXG5cbiAgICBpZiAoaXNGZXRjaGVyICYmIHBhcnNlZFBhdGguc2VhcmNoICYmIGhhc05ha2VkSW5kZXhRdWVyeShwYXJzZWRQYXRoLnNlYXJjaCkpIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5hcHBlbmQoXCJpbmRleFwiLCBcIlwiKTtcbiAgICB9XG5cbiAgICBwYXJzZWRQYXRoLnNlYXJjaCA9IFwiP1wiICsgc2VhcmNoUGFyYW1zO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGgsXG4gICAgICBlcnJvcjogZ2V0SW50ZXJuYWxSb3V0ZXJFcnJvcig0MDApXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGF0aDogY3JlYXRlUGF0aChwYXJzZWRQYXRoKVxuICB9O1xufSAvLyBGaWx0ZXIgb3V0IGFsbCByb3V0ZXMgYmVsb3cgYW55IGNhdWdodCBlcnJvciBhcyB0aGV5IGFyZW4ndCBnb2luZyB0b1xuLy8gcmVuZGVyIHNvIHdlIGRvbid0IG5lZWQgdG8gbG9hZCB0aGVtXG5cblxuZnVuY3Rpb24gZ2V0TG9hZGVyTWF0Y2hlc1VudGlsQm91bmRhcnkobWF0Y2hlcywgYm91bmRhcnlJZCkge1xuICBsZXQgYm91bmRhcnlNYXRjaGVzID0gbWF0Y2hlcztcblxuICBpZiAoYm91bmRhcnlJZCkge1xuICAgIGxldCBpbmRleCA9IG1hdGNoZXMuZmluZEluZGV4KG0gPT4gbS5yb3V0ZS5pZCA9PT0gYm91bmRhcnlJZCk7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgYm91bmRhcnlNYXRjaGVzID0gbWF0Y2hlcy5zbGljZSgwLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJvdW5kYXJ5TWF0Y2hlcztcbn1cblxuZnVuY3Rpb24gZ2V0TWF0Y2hlc1RvTG9hZChzdGF0ZSwgbWF0Y2hlcywgc3VibWlzc2lvbiwgbG9jYXRpb24sIGlzUmV2YWxpZGF0aW9uUmVxdWlyZWQsIGNhbmNlbGxlZERlZmVycmVkUm91dGVzLCBjYW5jZWxsZWRGZXRjaGVyTG9hZHMsIHBlbmRpbmdBY3Rpb25EYXRhLCBwZW5kaW5nRXJyb3IsIGZldGNoTG9hZE1hdGNoZXMpIHtcbiAgbGV0IGFjdGlvblJlc3VsdCA9IHBlbmRpbmdFcnJvciA/IE9iamVjdC52YWx1ZXMocGVuZGluZ0Vycm9yKVswXSA6IHBlbmRpbmdBY3Rpb25EYXRhID8gT2JqZWN0LnZhbHVlcyhwZW5kaW5nQWN0aW9uRGF0YSlbMF0gOiBudWxsOyAvLyBQaWNrIG5hdmlnYXRpb24gbWF0Y2hlcyB0aGF0IGFyZSBuZXQtbmV3IG9yIHF1YWxpZnkgZm9yIHJldmFsaWRhdGlvblxuXG4gIGxldCBib3VuZGFyeUlkID0gcGVuZGluZ0Vycm9yID8gT2JqZWN0LmtleXMocGVuZGluZ0Vycm9yKVswXSA6IHVuZGVmaW5lZDtcbiAgbGV0IGJvdW5kYXJ5TWF0Y2hlcyA9IGdldExvYWRlck1hdGNoZXNVbnRpbEJvdW5kYXJ5KG1hdGNoZXMsIGJvdW5kYXJ5SWQpO1xuICBsZXQgbmF2aWdhdGlvbk1hdGNoZXMgPSBib3VuZGFyeU1hdGNoZXMuZmlsdGVyKChtYXRjaCwgaW5kZXgpID0+IG1hdGNoLnJvdXRlLmxvYWRlciAhPSBudWxsICYmIChpc05ld0xvYWRlcihzdGF0ZS5sb2FkZXJEYXRhLCBzdGF0ZS5tYXRjaGVzW2luZGV4XSwgbWF0Y2gpIHx8IC8vIElmIHRoaXMgcm91dGUgaGFkIGEgcGVuZGluZyBkZWZlcnJlZCBjYW5jZWxsZWQgaXQgbXVzdCBiZSByZXZhbGlkYXRlZFxuICBjYW5jZWxsZWREZWZlcnJlZFJvdXRlcy5zb21lKGlkID0+IGlkID09PSBtYXRjaC5yb3V0ZS5pZCkgfHwgc2hvdWxkUmV2YWxpZGF0ZUxvYWRlcihzdGF0ZS5sb2NhdGlvbiwgc3RhdGUubWF0Y2hlc1tpbmRleF0sIHN1Ym1pc3Npb24sIGxvY2F0aW9uLCBtYXRjaCwgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCwgYWN0aW9uUmVzdWx0KSkpOyAvLyBQaWNrIGZldGNoZXIubG9hZHMgdGhhdCBuZWVkIHRvIGJlIHJldmFsaWRhdGVkXG5cbiAgbGV0IHJldmFsaWRhdGluZ0ZldGNoZXJzID0gW107XG4gIGZldGNoTG9hZE1hdGNoZXMgJiYgZmV0Y2hMb2FkTWF0Y2hlcy5mb3JFYWNoKChfcmVmMTAsIGtleSkgPT4ge1xuICAgIGxldCBbaHJlZiwgbWF0Y2gsIGZldGNoTWF0Y2hlc10gPSBfcmVmMTA7XG5cbiAgICAvLyBUaGlzIGZldGNoZXIgd2FzIGNhbmNlbGxlZCBmcm9tIGEgcHJpb3IgYWN0aW9uIHN1Ym1pc3Npb24gLSBmb3JjZSByZWxvYWRcbiAgICBpZiAoY2FuY2VsbGVkRmV0Y2hlckxvYWRzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIHJldmFsaWRhdGluZ0ZldGNoZXJzLnB1c2goW2tleSwgaHJlZiwgbWF0Y2gsIGZldGNoTWF0Y2hlc10pO1xuICAgIH0gZWxzZSBpZiAoaXNSZXZhbGlkYXRpb25SZXF1aXJlZCkge1xuICAgICAgbGV0IHNob3VsZFJldmFsaWRhdGUgPSBzaG91bGRSZXZhbGlkYXRlTG9hZGVyKGhyZWYsIG1hdGNoLCBzdWJtaXNzaW9uLCBocmVmLCBtYXRjaCwgaXNSZXZhbGlkYXRpb25SZXF1aXJlZCwgYWN0aW9uUmVzdWx0KTtcblxuICAgICAgaWYgKHNob3VsZFJldmFsaWRhdGUpIHtcbiAgICAgICAgcmV2YWxpZGF0aW5nRmV0Y2hlcnMucHVzaChba2V5LCBocmVmLCBtYXRjaCwgZmV0Y2hNYXRjaGVzXSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFtuYXZpZ2F0aW9uTWF0Y2hlcywgcmV2YWxpZGF0aW5nRmV0Y2hlcnNdO1xufVxuXG5mdW5jdGlvbiBpc05ld0xvYWRlcihjdXJyZW50TG9hZGVyRGF0YSwgY3VycmVudE1hdGNoLCBtYXRjaCkge1xuICBsZXQgaXNOZXcgPSAvLyBbYV0gLT4gW2EsIGJdXG4gICFjdXJyZW50TWF0Y2ggfHwgLy8gW2EsIGJdIC0+IFthLCBjXVxuICBtYXRjaC5yb3V0ZS5pZCAhPT0gY3VycmVudE1hdGNoLnJvdXRlLmlkOyAvLyBIYW5kbGUgdGhlIGNhc2UgdGhhdCB3ZSBkb24ndCBoYXZlIGRhdGEgZm9yIGEgcmUtdXNlZCByb3V0ZSwgcG90ZW50aWFsbHlcbiAgLy8gZnJvbSBhIHByaW9yIGVycm9yIG9yIGZyb20gYSBjYW5jZWxsZWQgcGVuZGluZyBkZWZlcnJlZFxuXG4gIGxldCBpc01pc3NpbmdEYXRhID0gY3VycmVudExvYWRlckRhdGFbbWF0Y2gucm91dGUuaWRdID09PSB1bmRlZmluZWQ7IC8vIEFsd2F5cyBsb2FkIGlmIHRoaXMgaXMgYSBuZXQtbmV3IHJvdXRlIG9yIHdlIGRvbid0IHlldCBoYXZlIGRhdGFcblxuICByZXR1cm4gaXNOZXcgfHwgaXNNaXNzaW5nRGF0YTtcbn1cblxuZnVuY3Rpb24gaXNOZXdSb3V0ZUluc3RhbmNlKGN1cnJlbnRNYXRjaCwgbWF0Y2gpIHtcbiAgbGV0IGN1cnJlbnRQYXRoID0gY3VycmVudE1hdGNoLnJvdXRlLnBhdGg7XG4gIHJldHVybiAoLy8gcGFyYW0gY2hhbmdlIGZvciB0aGlzIG1hdGNoLCAvdXNlcnMvMTIzIC0+IC91c2Vycy80NTZcbiAgICBjdXJyZW50TWF0Y2gucGF0aG5hbWUgIT09IG1hdGNoLnBhdGhuYW1lIHx8IC8vIHNwbGF0IHBhcmFtIGNoYW5nZWQsIHdoaWNoIGlzIG5vdCBwcmVzZW50IGluIG1hdGNoLnBhdGhcbiAgICAvLyBlLmcuIC9maWxlcy9pbWFnZXMvYXZhdGFyLmpwZyAtPiBmaWxlcy9maW5hbmNlcy54bHNcbiAgICBjdXJyZW50UGF0aCAmJiBjdXJyZW50UGF0aC5lbmRzV2l0aChcIipcIikgJiYgY3VycmVudE1hdGNoLnBhcmFtc1tcIipcIl0gIT09IG1hdGNoLnBhcmFtc1tcIipcIl1cbiAgKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkUmV2YWxpZGF0ZUxvYWRlcihjdXJyZW50TG9jYXRpb24sIGN1cnJlbnRNYXRjaCwgc3VibWlzc2lvbiwgbG9jYXRpb24sIG1hdGNoLCBpc1JldmFsaWRhdGlvblJlcXVpcmVkLCBhY3Rpb25SZXN1bHQpIHtcbiAgbGV0IGN1cnJlbnRVcmwgPSBjcmVhdGVVUkwoY3VycmVudExvY2F0aW9uKTtcbiAgbGV0IGN1cnJlbnRQYXJhbXMgPSBjdXJyZW50TWF0Y2gucGFyYW1zO1xuICBsZXQgbmV4dFVybCA9IGNyZWF0ZVVSTChsb2NhdGlvbik7XG4gIGxldCBuZXh0UGFyYW1zID0gbWF0Y2gucGFyYW1zOyAvLyBUaGlzIGlzIHRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGFzIHRvIHdoZW4gd2UgcmV2YWxpZGF0ZS4gIElmIHRoZSByb3V0ZVxuICAvLyBwcm92aWRlcyBpdCdzIG93biBpbXBsZW1lbnRhdGlvbiwgdGhlbiB3ZSBnaXZlIHRoZW0gZnVsbCBjb250cm9sIGJ1dFxuICAvLyBwcm92aWRlIHRoaXMgdmFsdWUgc28gdGhleSBjYW4gbGV2ZXJhZ2UgaXQgaWYgbmVlZGVkIGFmdGVyIHRoZXkgY2hlY2tcbiAgLy8gdGhlaXIgb3duIHNwZWNpZmljIHVzZSBjYXNlc1xuICAvLyBOb3RlIHRoYXQgZmV0Y2hlcnMgYWx3YXlzIHByb3ZpZGUgdGhlIHNhbWUgY3VycmVudC9uZXh0IGxvY2F0aW9ucyBzbyB0aGVcbiAgLy8gVVJMLWJhc2VkIGNoZWNrcyBoZXJlIGRvbid0IGFwcGx5IHRvIGZldGNoZXIgc2hvdWxkUmV2YWxpZGF0ZSBjYWxsc1xuXG4gIGxldCBkZWZhdWx0U2hvdWxkUmV2YWxpZGF0ZSA9IGlzTmV3Um91dGVJbnN0YW5jZShjdXJyZW50TWF0Y2gsIG1hdGNoKSB8fCAvLyBDbGlja2VkIHRoZSBzYW1lIGxpbmssIHJlc3VibWl0dGVkIGEgR0VUIGZvcm1cbiAgY3VycmVudFVybC50b1N0cmluZygpID09PSBuZXh0VXJsLnRvU3RyaW5nKCkgfHwgLy8gU2VhcmNoIHBhcmFtcyBhZmZlY3QgYWxsIGxvYWRlcnNcbiAgY3VycmVudFVybC5zZWFyY2ggIT09IG5leHRVcmwuc2VhcmNoIHx8IC8vIEZvcmNlZCByZXZhbGlkYXRpb24gZHVlIHRvIHN1Ym1pc3Npb24sIHVzZVJldmFsaWRhdGUsIG9yIFgtUmVtaXgtUmV2YWxpZGF0ZVxuICBpc1JldmFsaWRhdGlvblJlcXVpcmVkO1xuXG4gIGlmIChtYXRjaC5yb3V0ZS5zaG91bGRSZXZhbGlkYXRlKSB7XG4gICAgbGV0IHJvdXRlQ2hvaWNlID0gbWF0Y2gucm91dGUuc2hvdWxkUmV2YWxpZGF0ZShfZXh0ZW5kcyh7XG4gICAgICBjdXJyZW50VXJsLFxuICAgICAgY3VycmVudFBhcmFtcyxcbiAgICAgIG5leHRVcmwsXG4gICAgICBuZXh0UGFyYW1zXG4gICAgfSwgc3VibWlzc2lvbiwge1xuICAgICAgYWN0aW9uUmVzdWx0LFxuICAgICAgZGVmYXVsdFNob3VsZFJldmFsaWRhdGVcbiAgICB9KSk7XG5cbiAgICBpZiAodHlwZW9mIHJvdXRlQ2hvaWNlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIHJvdXRlQ2hvaWNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZWZhdWx0U2hvdWxkUmV2YWxpZGF0ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FsbExvYWRlck9yQWN0aW9uKHR5cGUsIHJlcXVlc3QsIG1hdGNoLCBtYXRjaGVzLCBiYXNlbmFtZSwgaXNTdGF0aWNSZXF1ZXN0LCBpc1JvdXRlUmVxdWVzdCkge1xuICBpZiAoYmFzZW5hbWUgPT09IHZvaWQgMCkge1xuICAgIGJhc2VuYW1lID0gXCIvXCI7XG4gIH1cblxuICBpZiAoaXNTdGF0aWNSZXF1ZXN0ID09PSB2b2lkIDApIHtcbiAgICBpc1N0YXRpY1JlcXVlc3QgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc1JvdXRlUmVxdWVzdCA9PT0gdm9pZCAwKSB7XG4gICAgaXNSb3V0ZVJlcXVlc3QgPSBmYWxzZTtcbiAgfVxuXG4gIGxldCByZXN1bHRUeXBlO1xuICBsZXQgcmVzdWx0OyAvLyBTZXR1cCBhIHByb21pc2Ugd2UgY2FuIHJhY2UgYWdhaW5zdCBzbyB0aGF0IGFib3J0IHNpZ25hbHMgc2hvcnQgY2lyY3VpdFxuXG4gIGxldCByZWplY3Q7XG4gIGxldCBhYm9ydFByb21pc2UgPSBuZXcgUHJvbWlzZSgoXywgcikgPT4gcmVqZWN0ID0gcik7XG5cbiAgbGV0IG9uUmVqZWN0ID0gKCkgPT4gcmVqZWN0KCk7XG5cbiAgcmVxdWVzdC5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIG9uUmVqZWN0KTtcblxuICB0cnkge1xuICAgIGxldCBoYW5kbGVyID0gbWF0Y2gucm91dGVbdHlwZV07XG4gICAgaW52YXJpYW50KGhhbmRsZXIsIFwiQ291bGQgbm90IGZpbmQgdGhlIFwiICsgdHlwZSArIFwiIHRvIHJ1biBvbiB0aGUgXFxcIlwiICsgbWF0Y2gucm91dGUuaWQgKyBcIlxcXCIgcm91dGVcIik7XG4gICAgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtoYW5kbGVyKHtcbiAgICAgIHJlcXVlc3QsXG4gICAgICBwYXJhbXM6IG1hdGNoLnBhcmFtc1xuICAgIH0pLCBhYm9ydFByb21pc2VdKTtcbiAgICBpbnZhcmlhbnQocmVzdWx0ICE9PSB1bmRlZmluZWQsIFwiWW91IGRlZmluZWQgXCIgKyAodHlwZSA9PT0gXCJhY3Rpb25cIiA/IFwiYW4gYWN0aW9uXCIgOiBcImEgbG9hZGVyXCIpICsgXCIgZm9yIHJvdXRlIFwiICsgKFwiXFxcIlwiICsgbWF0Y2gucm91dGUuaWQgKyBcIlxcXCIgYnV0IGRpZG4ndCByZXR1cm4gYW55dGhpbmcgZnJvbSB5b3VyIGBcIiArIHR5cGUgKyBcImAgXCIpICsgXCJmdW5jdGlvbi4gUGxlYXNlIHJldHVybiBhIHZhbHVlIG9yIGBudWxsYC5cIik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXN1bHRUeXBlID0gUmVzdWx0VHlwZS5lcnJvcjtcbiAgICByZXN1bHQgPSBlO1xuICB9IGZpbmFsbHkge1xuICAgIHJlcXVlc3Quc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBvblJlamVjdCk7XG4gIH1cblxuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICBsZXQgc3RhdHVzID0gcmVzdWx0LnN0YXR1czsgLy8gUHJvY2VzcyByZWRpcmVjdHNcblxuICAgIGlmIChyZWRpcmVjdFN0YXR1c0NvZGVzLmhhcyhzdGF0dXMpKSB7XG4gICAgICBsZXQgbG9jYXRpb24gPSByZXN1bHQuaGVhZGVycy5nZXQoXCJMb2NhdGlvblwiKTtcbiAgICAgIGludmFyaWFudChsb2NhdGlvbiwgXCJSZWRpcmVjdHMgcmV0dXJuZWQvdGhyb3duIGZyb20gbG9hZGVycy9hY3Rpb25zIG11c3QgaGF2ZSBhIExvY2F0aW9uIGhlYWRlclwiKTsgLy8gQ2hlY2sgaWYgdGhpcyBhbiBleHRlcm5hbCByZWRpcmVjdCB0aGF0IGdvZXMgdG8gYSBuZXcgb3JpZ2luXG5cbiAgICAgIGxldCBleHRlcm5hbCA9IGNyZWF0ZVVSTChsb2NhdGlvbikub3JpZ2luICE9PSBjcmVhdGVVUkwoXCIvXCIpLm9yaWdpbjsgLy8gU3VwcG9ydCByZWxhdGl2ZSByb3V0aW5nIGluIGludGVybmFsIHJlZGlyZWN0c1xuXG4gICAgICBpZiAoIWV4dGVybmFsKSB7XG4gICAgICAgIGxldCBhY3RpdmVNYXRjaGVzID0gbWF0Y2hlcy5zbGljZSgwLCBtYXRjaGVzLmluZGV4T2YobWF0Y2gpICsgMSk7XG4gICAgICAgIGxldCByb3V0ZVBhdGhuYW1lcyA9IGdldFBhdGhDb250cmlidXRpbmdNYXRjaGVzKGFjdGl2ZU1hdGNoZXMpLm1hcChtYXRjaCA9PiBtYXRjaC5wYXRobmFtZUJhc2UpO1xuICAgICAgICBsZXQgcmVxdWVzdFBhdGggPSBjcmVhdGVVUkwocmVxdWVzdC51cmwpLnBhdGhuYW1lO1xuICAgICAgICBsZXQgcmVzb2x2ZWRMb2NhdGlvbiA9IHJlc29sdmVUbyhsb2NhdGlvbiwgcm91dGVQYXRobmFtZXMsIHJlcXVlc3RQYXRoKTtcbiAgICAgICAgaW52YXJpYW50KGNyZWF0ZVBhdGgocmVzb2x2ZWRMb2NhdGlvbiksIFwiVW5hYmxlIHRvIHJlc29sdmUgcmVkaXJlY3QgbG9jYXRpb246IFwiICsgbG9jYXRpb24pOyAvLyBQcmVwZW5kIHRoZSBiYXNlbmFtZSB0byB0aGUgcmVkaXJlY3QgbG9jYXRpb24gaWYgd2UgaGF2ZSBvbmVcblxuICAgICAgICBpZiAoYmFzZW5hbWUpIHtcbiAgICAgICAgICBsZXQgcGF0aCA9IHJlc29sdmVkTG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgcmVzb2x2ZWRMb2NhdGlvbi5wYXRobmFtZSA9IHBhdGggPT09IFwiL1wiID8gYmFzZW5hbWUgOiBqb2luUGF0aHMoW2Jhc2VuYW1lLCBwYXRoXSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhdGlvbiA9IGNyZWF0ZVBhdGgocmVzb2x2ZWRMb2NhdGlvbik7XG4gICAgICB9IC8vIERvbid0IHByb2Nlc3MgcmVkaXJlY3RzIGluIHRoZSByb3V0ZXIgZHVyaW5nIHN0YXRpYyByZXF1ZXN0cyByZXF1ZXN0cy5cbiAgICAgIC8vIEluc3RlYWQsIHRocm93IHRoZSBSZXNwb25zZSBhbmQgbGV0IHRoZSBzZXJ2ZXIgaGFuZGxlIGl0IHdpdGggYW4gSFRUUFxuICAgICAgLy8gcmVkaXJlY3QuICBXZSBhbHNvIHVwZGF0ZSB0aGUgTG9jYXRpb24gaGVhZGVyIGluIHBsYWNlIGluIHRoaXMgZmxvdyBzb1xuICAgICAgLy8gYmFzZW5hbWUgYW5kIHJlbGF0aXZlIHJvdXRpbmcgaXMgdGFrZW4gaW50byBhY2NvdW50XG5cblxuICAgICAgaWYgKGlzU3RhdGljUmVxdWVzdCkge1xuICAgICAgICByZXN1bHQuaGVhZGVycy5zZXQoXCJMb2NhdGlvblwiLCBsb2NhdGlvbik7XG4gICAgICAgIHRocm93IHJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogUmVzdWx0VHlwZS5yZWRpcmVjdCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgcmV2YWxpZGF0ZTogcmVzdWx0LmhlYWRlcnMuZ2V0KFwiWC1SZW1peC1SZXZhbGlkYXRlXCIpICE9PSBudWxsLFxuICAgICAgICBleHRlcm5hbFxuICAgICAgfTtcbiAgICB9IC8vIEZvciBTU1Igc2luZ2xlLXJvdXRlIHJlcXVlc3RzLCB3ZSB3YW50IHRvIGhhbmQgUmVzcG9uc2VzIGJhY2sgZGlyZWN0bHlcbiAgICAvLyB3aXRob3V0IHVud3JhcHBpbmcuICBXZSBkbyB0aGlzIHdpdGggdGhlIFF1ZXJ5Um91dGVSZXNwb25zZSB3cmFwcGVyXG4gICAgLy8gaW50ZXJmYWNlIHNvIHdlIGNhbiBrbm93IHdoZXRoZXIgaXQgd2FzIHJldHVybmVkIG9yIHRocm93blxuXG5cbiAgICBpZiAoaXNSb3V0ZVJlcXVlc3QpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gICAgICB0aHJvdyB7XG4gICAgICAgIHR5cGU6IHJlc3VsdFR5cGUgfHwgUmVzdWx0VHlwZS5kYXRhLFxuICAgICAgICByZXNwb25zZTogcmVzdWx0XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxldCBkYXRhO1xuICAgIGxldCBjb250ZW50VHlwZSA9IHJlc3VsdC5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKTtcblxuICAgIGlmIChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5zdGFydHNXaXRoKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgZGF0YSA9IGF3YWl0IHJlc3VsdC5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBhd2FpdCByZXN1bHQudGV4dCgpO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHRUeXBlID09PSBSZXN1bHRUeXBlLmVycm9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiByZXN1bHRUeXBlLFxuICAgICAgICBlcnJvcjogbmV3IEVycm9yUmVzcG9uc2Uoc3RhdHVzLCByZXN1bHQuc3RhdHVzVGV4dCwgZGF0YSksXG4gICAgICAgIGhlYWRlcnM6IHJlc3VsdC5oZWFkZXJzXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBSZXN1bHRUeXBlLmRhdGEsXG4gICAgICBkYXRhLFxuICAgICAgc3RhdHVzQ29kZTogcmVzdWx0LnN0YXR1cyxcbiAgICAgIGhlYWRlcnM6IHJlc3VsdC5oZWFkZXJzXG4gICAgfTtcbiAgfVxuXG4gIGlmIChyZXN1bHRUeXBlID09PSBSZXN1bHRUeXBlLmVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHJlc3VsdFR5cGUsXG4gICAgICBlcnJvcjogcmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBEZWZlcnJlZERhdGEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogUmVzdWx0VHlwZS5kZWZlcnJlZCxcbiAgICAgIGRlZmVycmVkRGF0YTogcmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVzdWx0VHlwZS5kYXRhLFxuICAgIGRhdGE6IHJlc3VsdFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXF1ZXN0KGxvY2F0aW9uLCBzaWduYWwsIHN1Ym1pc3Npb24pIHtcbiAgbGV0IHVybCA9IGNyZWF0ZVVSTChzdHJpcEhhc2hGcm9tUGF0aChsb2NhdGlvbikpLnRvU3RyaW5nKCk7XG4gIGxldCBpbml0ID0ge1xuICAgIHNpZ25hbFxuICB9O1xuXG4gIGlmIChzdWJtaXNzaW9uKSB7XG4gICAgbGV0IHtcbiAgICAgIGZvcm1NZXRob2QsXG4gICAgICBmb3JtRW5jVHlwZSxcbiAgICAgIGZvcm1EYXRhXG4gICAgfSA9IHN1Ym1pc3Npb247XG4gICAgaW5pdC5tZXRob2QgPSBmb3JtTWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgaW5pdC5ib2R5ID0gZm9ybUVuY1R5cGUgPT09IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIgPyBjb252ZXJ0Rm9ybURhdGFUb1NlYXJjaFBhcmFtcyhmb3JtRGF0YSkgOiBmb3JtRGF0YTtcbiAgfSAvLyBDb250ZW50LVR5cGUgaXMgaW5mZXJyZWQgKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNkb20tcmVxdWVzdClcblxuXG4gIHJldHVybiBuZXcgUmVxdWVzdCh1cmwsIGluaXQpO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0Rm9ybURhdGFUb1NlYXJjaFBhcmFtcyhmb3JtRGF0YSkge1xuICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpIHtcbiAgICBpbnZhcmlhbnQodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiLCAnRmlsZSBpbnB1dHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCBlbmNUeXBlIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsICcgKyAncGxlYXNlIHVzZSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiBpbnN0ZWFkLicpO1xuICAgIHNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gc2VhcmNoUGFyYW1zO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzUm91dGVMb2FkZXJEYXRhKG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJlc3VsdHMsIHBlbmRpbmdFcnJvciwgYWN0aXZlRGVmZXJyZWRzKSB7XG4gIC8vIEZpbGwgaW4gbG9hZGVyRGF0YS9lcnJvcnMgZnJvbSBvdXIgbG9hZGVyc1xuICBsZXQgbG9hZGVyRGF0YSA9IHt9O1xuICBsZXQgZXJyb3JzID0gbnVsbDtcbiAgbGV0IHN0YXR1c0NvZGU7XG4gIGxldCBmb3VuZEVycm9yID0gZmFsc2U7XG4gIGxldCBsb2FkZXJIZWFkZXJzID0ge307IC8vIFByb2Nlc3MgbG9hZGVyIHJlc3VsdHMgaW50byBzdGF0ZS5sb2FkZXJEYXRhL3N0YXRlLmVycm9yc1xuXG4gIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xuICAgIGxldCBpZCA9IG1hdGNoZXNUb0xvYWRbaW5kZXhdLnJvdXRlLmlkO1xuICAgIGludmFyaWFudCghaXNSZWRpcmVjdFJlc3VsdChyZXN1bHQpLCBcIkNhbm5vdCBoYW5kbGUgcmVkaXJlY3QgcmVzdWx0cyBpbiBwcm9jZXNzTG9hZGVyRGF0YVwiKTtcblxuICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIC8vIExvb2sgdXB3YXJkcyBmcm9tIHRoZSBtYXRjaGVkIHJvdXRlIGZvciB0aGUgY2xvc2VzdCBhbmNlc3RvclxuICAgICAgLy8gZXJyb3IgYm91bmRhcnksIGRlZmF1bHRpbmcgdG8gdGhlIHJvb3QgbWF0Y2hcbiAgICAgIGxldCBib3VuZGFyeU1hdGNoID0gZmluZE5lYXJlc3RCb3VuZGFyeShtYXRjaGVzLCBpZCk7XG4gICAgICBsZXQgZXJyb3IgPSByZXN1bHQuZXJyb3I7IC8vIElmIHdlIGhhdmUgYSBwZW5kaW5nIGFjdGlvbiBlcnJvciwgd2UgcmVwb3J0IGl0IGF0IHRoZSBoaWdoZXN0LXJvdXRlXG4gICAgICAvLyB0aGF0IHRocm93cyBhIGxvYWRlciBlcnJvciwgYW5kIHRoZW4gY2xlYXIgaXQgb3V0IHRvIGluZGljYXRlIHRoYXRcbiAgICAgIC8vIGl0IHdhcyBjb25zdW1lZFxuXG4gICAgICBpZiAocGVuZGluZ0Vycm9yKSB7XG4gICAgICAgIGVycm9yID0gT2JqZWN0LnZhbHVlcyhwZW5kaW5nRXJyb3IpWzBdO1xuICAgICAgICBwZW5kaW5nRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGVycm9ycyA9IE9iamVjdC5hc3NpZ24oZXJyb3JzIHx8IHt9LCB7XG4gICAgICAgIFtib3VuZGFyeU1hdGNoLnJvdXRlLmlkXTogZXJyb3JcbiAgICAgIH0pOyAvLyBPbmNlIHdlIGZpbmQgb3VyIGZpcnN0IChoaWdoZXN0KSBlcnJvciwgd2Ugc2V0IHRoZSBzdGF0dXMgY29kZSBhbmRcbiAgICAgIC8vIHByZXZlbnQgZGVlcGVyIHN0YXR1cyBjb2RlcyBmcm9tIG92ZXJyaWRpbmdcblxuICAgICAgaWYgKCFmb3VuZEVycm9yKSB7XG4gICAgICAgIGZvdW5kRXJyb3IgPSB0cnVlO1xuICAgICAgICBzdGF0dXNDb2RlID0gaXNSb3V0ZUVycm9yUmVzcG9uc2UocmVzdWx0LmVycm9yKSA/IHJlc3VsdC5lcnJvci5zdGF0dXMgOiA1MDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuaGVhZGVycykge1xuICAgICAgICBsb2FkZXJIZWFkZXJzW2lkXSA9IHJlc3VsdC5oZWFkZXJzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNEZWZlcnJlZFJlc3VsdChyZXN1bHQpKSB7XG4gICAgICBhY3RpdmVEZWZlcnJlZHMgJiYgYWN0aXZlRGVmZXJyZWRzLnNldChpZCwgcmVzdWx0LmRlZmVycmVkRGF0YSk7XG4gICAgICBsb2FkZXJEYXRhW2lkXSA9IHJlc3VsdC5kZWZlcnJlZERhdGEuZGF0YTsgLy8gVE9ETzogQWRkIHN0YXR1c0NvZGUvaGVhZGVycyBvbmNlIHdlIHdpcmUgdXAgc3RyZWFtaW5nIGluIFJlbWl4XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvYWRlckRhdGFbaWRdID0gcmVzdWx0LmRhdGE7IC8vIEVycm9yIHN0YXR1cyBjb2RlcyBhbHdheXMgb3ZlcnJpZGUgc3VjY2VzcyBzdGF0dXMgY29kZXMsIGJ1dCBpZiBhbGxcbiAgICAgIC8vIGxvYWRlcnMgYXJlIHN1Y2Nlc3NmdWwgd2UgdGFrZSB0aGUgZGVlcGVzdCBzdGF0dXMgY29kZS5cblxuICAgICAgaWYgKHJlc3VsdC5zdGF0dXNDb2RlICE9IG51bGwgJiYgcmVzdWx0LnN0YXR1c0NvZGUgIT09IDIwMCAmJiAhZm91bmRFcnJvcikge1xuICAgICAgICBzdGF0dXNDb2RlID0gcmVzdWx0LnN0YXR1c0NvZGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuaGVhZGVycykge1xuICAgICAgICBsb2FkZXJIZWFkZXJzW2lkXSA9IHJlc3VsdC5oZWFkZXJzO1xuICAgICAgfVxuICAgIH1cbiAgfSk7IC8vIElmIHdlIGRpZG4ndCBjb25zdW1lIHRoZSBwZW5kaW5nIGFjdGlvbiBlcnJvciAoaS5lLiwgYWxsIGxvYWRlcnNcbiAgLy8gcmVzb2x2ZWQpLCB0aGVuIGNvbnN1bWUgaXQgaGVyZVxuXG4gIGlmIChwZW5kaW5nRXJyb3IpIHtcbiAgICBlcnJvcnMgPSBwZW5kaW5nRXJyb3I7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvYWRlckRhdGEsXG4gICAgZXJyb3JzLFxuICAgIHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUgfHwgMjAwLFxuICAgIGxvYWRlckhlYWRlcnNcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0xvYWRlckRhdGEoc3RhdGUsIG1hdGNoZXMsIG1hdGNoZXNUb0xvYWQsIHJlc3VsdHMsIHBlbmRpbmdFcnJvciwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMsIGZldGNoZXJSZXN1bHRzLCBhY3RpdmVEZWZlcnJlZHMpIHtcbiAgbGV0IHtcbiAgICBsb2FkZXJEYXRhLFxuICAgIGVycm9yc1xuICB9ID0gcHJvY2Vzc1JvdXRlTG9hZGVyRGF0YShtYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCByZXN1bHRzLCBwZW5kaW5nRXJyb3IsIGFjdGl2ZURlZmVycmVkcyk7IC8vIFByb2Nlc3MgcmVzdWx0cyBmcm9tIG91ciByZXZhbGlkYXRpbmcgZmV0Y2hlcnNcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmV2YWxpZGF0aW5nRmV0Y2hlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgbGV0IFtrZXksLCBtYXRjaF0gPSByZXZhbGlkYXRpbmdGZXRjaGVyc1tpbmRleF07XG4gICAgaW52YXJpYW50KGZldGNoZXJSZXN1bHRzICE9PSB1bmRlZmluZWQgJiYgZmV0Y2hlclJlc3VsdHNbaW5kZXhdICE9PSB1bmRlZmluZWQsIFwiRGlkIG5vdCBmaW5kIGNvcnJlc3BvbmRpbmcgZmV0Y2hlciByZXN1bHRcIik7XG4gICAgbGV0IHJlc3VsdCA9IGZldGNoZXJSZXN1bHRzW2luZGV4XTsgLy8gUHJvY2VzcyBmZXRjaGVyIG5vbi1yZWRpcmVjdCBlcnJvcnNcblxuICAgIGlmIChpc0Vycm9yUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIGxldCBib3VuZGFyeU1hdGNoID0gZmluZE5lYXJlc3RCb3VuZGFyeShzdGF0ZS5tYXRjaGVzLCBtYXRjaC5yb3V0ZS5pZCk7XG5cbiAgICAgIGlmICghKGVycm9ycyAmJiBlcnJvcnNbYm91bmRhcnlNYXRjaC5yb3V0ZS5pZF0pKSB7XG4gICAgICAgIGVycm9ycyA9IF9leHRlbmRzKHt9LCBlcnJvcnMsIHtcbiAgICAgICAgICBbYm91bmRhcnlNYXRjaC5yb3V0ZS5pZF06IHJlc3VsdC5lcnJvclxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc3RhdGUuZmV0Y2hlcnMuZGVsZXRlKGtleSk7XG4gICAgfSBlbHNlIGlmIChpc1JlZGlyZWN0UmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIC8vIFNob3VsZCBuZXZlciBnZXQgaGVyZSwgcmVkaXJlY3RzIHNob3VsZCBnZXQgcHJvY2Vzc2VkIGFib3ZlLCBidXQgd2VcbiAgICAgIC8vIGtlZXAgdGhpcyB0byB0eXBlIG5hcnJvdyB0byBhIHN1Y2Nlc3MgcmVzdWx0IGluIHRoZSBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmhhbmRsZWQgZmV0Y2hlciByZXZhbGlkYXRpb24gcmVkaXJlY3RcIik7XG4gICAgfSBlbHNlIGlmIChpc0RlZmVycmVkUmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIC8vIFNob3VsZCBuZXZlciBnZXQgaGVyZSwgZGVmZXJyZWQgZGF0YSBzaG91bGQgYmUgYXdhaXRlZCBmb3IgZmV0Y2hlcnNcbiAgICAgIC8vIGluIHJlc29sdmVEZWZlcnJlZFJlc3VsdHNcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuaGFuZGxlZCBmZXRjaGVyIGRlZmVycmVkIGRhdGFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkb25lRmV0Y2hlciA9IHtcbiAgICAgICAgc3RhdGU6IFwiaWRsZVwiLFxuICAgICAgICBkYXRhOiByZXN1bHQuZGF0YSxcbiAgICAgICAgZm9ybU1ldGhvZDogdW5kZWZpbmVkLFxuICAgICAgICBmb3JtQWN0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcm1FbmNUeXBlOiB1bmRlZmluZWQsXG4gICAgICAgIGZvcm1EYXRhOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgICBzdGF0ZS5mZXRjaGVycy5zZXQoa2V5LCBkb25lRmV0Y2hlcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsb2FkZXJEYXRhLFxuICAgIGVycm9yc1xuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZUxvYWRlckRhdGEobG9hZGVyRGF0YSwgbmV3TG9hZGVyRGF0YSwgbWF0Y2hlcykge1xuICBsZXQgbWVyZ2VkTG9hZGVyRGF0YSA9IF9leHRlbmRzKHt9LCBuZXdMb2FkZXJEYXRhKTtcblxuICBtYXRjaGVzLmZvckVhY2gobWF0Y2ggPT4ge1xuICAgIGxldCBpZCA9IG1hdGNoLnJvdXRlLmlkO1xuXG4gICAgaWYgKG5ld0xvYWRlckRhdGFbaWRdID09PSB1bmRlZmluZWQgJiYgbG9hZGVyRGF0YVtpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbWVyZ2VkTG9hZGVyRGF0YVtpZF0gPSBsb2FkZXJEYXRhW2lkXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbWVyZ2VkTG9hZGVyRGF0YTtcbn0gLy8gRmluZCB0aGUgbmVhcmVzdCBlcnJvciBib3VuZGFyeSwgbG9va2luZyB1cHdhcmRzIGZyb20gdGhlIGxlYWYgcm91dGUgKG9yIHRoZVxuLy8gcm91dGUgc3BlY2lmaWVkIGJ5IHJvdXRlSWQpIGZvciB0aGUgY2xvc2VzdCBhbmNlc3RvciBlcnJvciBib3VuZGFyeSxcbi8vIGRlZmF1bHRpbmcgdG8gdGhlIHJvb3QgbWF0Y2hcblxuXG5mdW5jdGlvbiBmaW5kTmVhcmVzdEJvdW5kYXJ5KG1hdGNoZXMsIHJvdXRlSWQpIHtcbiAgbGV0IGVsaWdpYmxlTWF0Y2hlcyA9IHJvdXRlSWQgPyBtYXRjaGVzLnNsaWNlKDAsIG1hdGNoZXMuZmluZEluZGV4KG0gPT4gbS5yb3V0ZS5pZCA9PT0gcm91dGVJZCkgKyAxKSA6IFsuLi5tYXRjaGVzXTtcbiAgcmV0dXJuIGVsaWdpYmxlTWF0Y2hlcy5yZXZlcnNlKCkuZmluZChtID0+IG0ucm91dGUuaGFzRXJyb3JCb3VuZGFyeSA9PT0gdHJ1ZSkgfHwgbWF0Y2hlc1swXTtcbn1cblxuZnVuY3Rpb24gZ2V0U2hvcnRDaXJjdWl0TWF0Y2hlcyhyb3V0ZXMpIHtcbiAgLy8gUHJlZmVyIGEgcm9vdCBsYXlvdXQgcm91dGUgaWYgcHJlc2VudCwgb3RoZXJ3aXNlIHNoaW0gaW4gYSByb3V0ZSBvYmplY3RcbiAgbGV0IHJvdXRlID0gcm91dGVzLmZpbmQociA9PiByLmluZGV4IHx8ICFyLnBhdGggfHwgci5wYXRoID09PSBcIi9cIikgfHwge1xuICAgIGlkOiBcIl9fc2hpbS1lcnJvci1yb3V0ZV9fXCJcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBtYXRjaGVzOiBbe1xuICAgICAgcGFyYW1zOiB7fSxcbiAgICAgIHBhdGhuYW1lOiBcIlwiLFxuICAgICAgcGF0aG5hbWVCYXNlOiBcIlwiLFxuICAgICAgcm91dGVcbiAgICB9XSxcbiAgICByb3V0ZVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRJbnRlcm5hbFJvdXRlckVycm9yKHN0YXR1cywgX3RlbXApIHtcbiAgbGV0IHtcbiAgICBwYXRobmFtZSxcbiAgICByb3V0ZUlkLFxuICAgIG1ldGhvZCxcbiAgICBtZXNzYWdlXG4gIH0gPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcDtcbiAgbGV0IHN0YXR1c1RleHQgPSBcIlVua25vd24gU2VydmVyIEVycm9yXCI7XG4gIGxldCBlcnJvck1lc3NhZ2UgPSBcIlVua25vd24gQHJlbWl4LXJ1bi9yb3V0ZXIgZXJyb3JcIjtcblxuICBpZiAoc3RhdHVzID09PSA0MDApIHtcbiAgICBzdGF0dXNUZXh0ID0gXCJCYWQgUmVxdWVzdFwiO1xuXG4gICAgaWYgKG1ldGhvZCAmJiBwYXRobmFtZSAmJiByb3V0ZUlkKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBcIllvdSBtYWRlIGEgXCIgKyBtZXRob2QgKyBcIiByZXF1ZXN0IHRvIFxcXCJcIiArIHBhdGhuYW1lICsgXCJcXFwiIGJ1dCBcIiArIChcImRpZCBub3QgcHJvdmlkZSBhIGBsb2FkZXJgIGZvciByb3V0ZSBcXFwiXCIgKyByb3V0ZUlkICsgXCJcXFwiLCBcIikgKyBcInNvIHRoZXJlIGlzIG5vIHdheSB0byBoYW5kbGUgdGhlIHJlcXVlc3QuXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IFwiQ2Fubm90IHN1Ym1pdCBiaW5hcnkgZm9ybSBkYXRhIHVzaW5nIEdFVFwiO1xuICAgIH1cbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDQwMykge1xuICAgIHN0YXR1c1RleHQgPSBcIkZvcmJpZGRlblwiO1xuICAgIGVycm9yTWVzc2FnZSA9IFwiUm91dGUgXFxcIlwiICsgcm91dGVJZCArIFwiXFxcIiBkb2VzIG5vdCBtYXRjaCBVUkwgXFxcIlwiICsgcGF0aG5hbWUgKyBcIlxcXCJcIjtcbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDQwNCkge1xuICAgIHN0YXR1c1RleHQgPSBcIk5vdCBGb3VuZFwiO1xuICAgIGVycm9yTWVzc2FnZSA9IFwiTm8gcm91dGUgbWF0Y2hlcyBVUkwgXFxcIlwiICsgcGF0aG5hbWUgKyBcIlxcXCJcIjtcbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IDQwNSkge1xuICAgIHN0YXR1c1RleHQgPSBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiO1xuXG4gICAgaWYgKG1ldGhvZCAmJiBwYXRobmFtZSAmJiByb3V0ZUlkKSB7XG4gICAgICBlcnJvck1lc3NhZ2UgPSBcIllvdSBtYWRlIGEgXCIgKyBtZXRob2QudG9VcHBlckNhc2UoKSArIFwiIHJlcXVlc3QgdG8gXFxcIlwiICsgcGF0aG5hbWUgKyBcIlxcXCIgYnV0IFwiICsgKFwiZGlkIG5vdCBwcm92aWRlIGFuIGBhY3Rpb25gIGZvciByb3V0ZSBcXFwiXCIgKyByb3V0ZUlkICsgXCJcXFwiLCBcIikgKyBcInNvIHRoZXJlIGlzIG5vIHdheSB0byBoYW5kbGUgdGhlIHJlcXVlc3QuXCI7XG4gICAgfSBlbHNlIGlmIChtZXRob2QpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IFwiSW52YWxpZCByZXF1ZXN0IG1ldGhvZCBcXFwiXCIgKyBtZXRob2QudG9VcHBlckNhc2UoKSArIFwiXFxcIlwiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3JSZXNwb25zZShzdGF0dXMgfHwgNTAwLCBzdGF0dXNUZXh0LCBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKSwgdHJ1ZSk7XG59IC8vIEZpbmQgYW55IHJldHVybmVkIHJlZGlyZWN0IGVycm9ycywgc3RhcnRpbmcgZnJvbSB0aGUgbG93ZXN0IG1hdGNoXG5cblxuZnVuY3Rpb24gZmluZFJlZGlyZWN0KHJlc3VsdHMpIHtcbiAgZm9yIChsZXQgaSA9IHJlc3VsdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsZXQgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgIGlmIChpc1JlZGlyZWN0UmVzdWx0KHJlc3VsdCkpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmlwSGFzaEZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHBhcnNlZFBhdGggPSB0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiA/IHBhcnNlUGF0aChwYXRoKSA6IHBhdGg7XG4gIHJldHVybiBjcmVhdGVQYXRoKF9leHRlbmRzKHt9LCBwYXJzZWRQYXRoLCB7XG4gICAgaGFzaDogXCJcIlxuICB9KSk7XG59XG5cbmZ1bmN0aW9uIGlzSGFzaENoYW5nZU9ubHkoYSwgYikge1xuICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiYgYS5oYXNoICE9PSBiLmhhc2g7XG59XG5cbmZ1bmN0aW9uIGlzRGVmZXJyZWRSZXN1bHQocmVzdWx0KSB7XG4gIHJldHVybiByZXN1bHQudHlwZSA9PT0gUmVzdWx0VHlwZS5kZWZlcnJlZDtcbn1cblxuZnVuY3Rpb24gaXNFcnJvclJlc3VsdChyZXN1bHQpIHtcbiAgcmV0dXJuIHJlc3VsdC50eXBlID09PSBSZXN1bHRUeXBlLmVycm9yO1xufVxuXG5mdW5jdGlvbiBpc1JlZGlyZWN0UmVzdWx0KHJlc3VsdCkge1xuICByZXR1cm4gKHJlc3VsdCAmJiByZXN1bHQudHlwZSkgPT09IFJlc3VsdFR5cGUucmVkaXJlY3Q7XG59XG5cbmZ1bmN0aW9uIGlzUmVkaXJlY3RSZXNwb25zZShyZXN1bHQpIHtcbiAgaWYgKCEocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbGV0IHN0YXR1cyA9IHJlc3VsdC5zdGF0dXM7XG4gIGxldCBsb2NhdGlvbiA9IHJlc3VsdC5oZWFkZXJzLmdldChcIkxvY2F0aW9uXCIpO1xuICByZXR1cm4gc3RhdHVzID49IDMwMCAmJiBzdGF0dXMgPD0gMzk5ICYmIGxvY2F0aW9uICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzUXVlcnlSb3V0ZVJlc3BvbnNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5yZXNwb25zZSBpbnN0YW5jZW9mIFJlc3BvbnNlICYmIChvYmoudHlwZSA9PT0gUmVzdWx0VHlwZS5kYXRhIHx8IFJlc3VsdFR5cGUuZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkTWV0aG9kKG1ldGhvZCkge1xuICByZXR1cm4gdmFsaWRSZXF1ZXN0TWV0aG9kcy5oYXMobWV0aG9kKTtcbn1cblxuZnVuY3Rpb24gaXNTdWJtaXNzaW9uTWV0aG9kKG1ldGhvZCkge1xuICByZXR1cm4gdmFsaWRBY3Rpb25NZXRob2RzLmhhcyhtZXRob2QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlRGVmZXJyZWRSZXN1bHRzKGN1cnJlbnRNYXRjaGVzLCBtYXRjaGVzVG9Mb2FkLCByZXN1bHRzLCBzaWduYWwsIGlzRmV0Y2hlciwgY3VycmVudExvYWRlckRhdGEpIHtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlc3VsdHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgbGV0IHJlc3VsdCA9IHJlc3VsdHNbaW5kZXhdO1xuICAgIGxldCBtYXRjaCA9IG1hdGNoZXNUb0xvYWRbaW5kZXhdO1xuICAgIGxldCBjdXJyZW50TWF0Y2ggPSBjdXJyZW50TWF0Y2hlcy5maW5kKG0gPT4gbS5yb3V0ZS5pZCA9PT0gbWF0Y2gucm91dGUuaWQpO1xuICAgIGxldCBpc1JldmFsaWRhdGluZ0xvYWRlciA9IGN1cnJlbnRNYXRjaCAhPSBudWxsICYmICFpc05ld1JvdXRlSW5zdGFuY2UoY3VycmVudE1hdGNoLCBtYXRjaCkgJiYgKGN1cnJlbnRMb2FkZXJEYXRhICYmIGN1cnJlbnRMb2FkZXJEYXRhW21hdGNoLnJvdXRlLmlkXSkgIT09IHVuZGVmaW5lZDtcblxuICAgIGlmIChpc0RlZmVycmVkUmVzdWx0KHJlc3VsdCkgJiYgKGlzRmV0Y2hlciB8fCBpc1JldmFsaWRhdGluZ0xvYWRlcikpIHtcbiAgICAgIC8vIE5vdGU6IHdlIGRvIG5vdCBoYXZlIHRvIHRvdWNoIGFjdGl2ZURlZmVycmVkcyBoZXJlIHNpbmNlIHdlIHJhY2UgdGhlbVxuICAgICAgLy8gYWdhaW5zdCB0aGUgc2lnbmFsIGluIHJlc29sdmVEZWZlcnJlZERhdGEgYW5kIHRoZXknbGwgZ2V0IGFib3J0ZWRcbiAgICAgIC8vIHRoZXJlIGlmIG5lZWRlZFxuICAgICAgYXdhaXQgcmVzb2x2ZURlZmVycmVkRGF0YShyZXN1bHQsIHNpZ25hbCwgaXNGZXRjaGVyKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHJlc3VsdCB8fCByZXN1bHRzW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc29sdmVEZWZlcnJlZERhdGEocmVzdWx0LCBzaWduYWwsIHVud3JhcCkge1xuICBpZiAodW53cmFwID09PSB2b2lkIDApIHtcbiAgICB1bndyYXAgPSBmYWxzZTtcbiAgfVxuXG4gIGxldCBhYm9ydGVkID0gYXdhaXQgcmVzdWx0LmRlZmVycmVkRGF0YS5yZXNvbHZlRGF0YShzaWduYWwpO1xuXG4gIGlmIChhYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHVud3JhcCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSZXN1bHRUeXBlLmRhdGEsXG4gICAgICAgIGRhdGE6IHJlc3VsdC5kZWZlcnJlZERhdGEudW53cmFwcGVkRGF0YVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBIYW5kbGUgYW55IFRyYWNrZWRQcm9taXNlLl9lcnJvciB2YWx1ZXMgZW5jb3VudGVyZWQgd2hpbGUgdW53cmFwcGluZ1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogUmVzdWx0VHlwZS5lcnJvcixcbiAgICAgICAgZXJyb3I6IGVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZXN1bHRUeXBlLmRhdGEsXG4gICAgZGF0YTogcmVzdWx0LmRlZmVycmVkRGF0YS5kYXRhXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhc05ha2VkSW5kZXhRdWVyeShzZWFyY2gpIHtcbiAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMoc2VhcmNoKS5nZXRBbGwoXCJpbmRleFwiKS5zb21lKHYgPT4gdiA9PT0gXCJcIik7XG59IC8vIE5vdGU6IFRoaXMgc2hvdWxkIG1hdGNoIHRoZSBmb3JtYXQgZXhwb3J0ZWQgYnkgdXNlTWF0Y2hlcywgc28gaWYgeW91IGNoYW5nZVxuLy8gdGhpcyBwbGVhc2UgYWxzbyBjaGFuZ2UgdGhhdCA6KSAgRXZlbnR1YWxseSB3ZSdsbCBEUlkgdGhpcyB1cFxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZU1hdGNoZXNNYXRjaChtYXRjaCwgbG9hZGVyRGF0YSkge1xuICBsZXQge1xuICAgIHJvdXRlLFxuICAgIHBhdGhuYW1lLFxuICAgIHBhcmFtc1xuICB9ID0gbWF0Y2g7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJvdXRlLmlkLFxuICAgIHBhdGhuYW1lLFxuICAgIHBhcmFtcyxcbiAgICBkYXRhOiBsb2FkZXJEYXRhW3JvdXRlLmlkXSxcbiAgICBoYW5kbGU6IHJvdXRlLmhhbmRsZVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRNYXRjaChtYXRjaGVzLCBsb2NhdGlvbikge1xuICBsZXQgc2VhcmNoID0gdHlwZW9mIGxvY2F0aW9uID09PSBcInN0cmluZ1wiID8gcGFyc2VQYXRoKGxvY2F0aW9uKS5zZWFyY2ggOiBsb2NhdGlvbi5zZWFyY2g7XG5cbiAgaWYgKG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXS5yb3V0ZS5pbmRleCAmJiBoYXNOYWtlZEluZGV4UXVlcnkoc2VhcmNoIHx8IFwiXCIpKSB7XG4gICAgLy8gUmV0dXJuIHRoZSBsZWFmIGluZGV4IHJvdXRlIHdoZW4gaW5kZXggaXMgcHJlc2VudFxuICAgIHJldHVybiBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV07XG4gIH0gLy8gT3RoZXJ3aXNlIGdyYWIgdGhlIGRlZXBlc3QgXCJwYXRoIGNvbnRyaWJ1dGluZ1wiIG1hdGNoIChpZ25vcmluZyBpbmRleCBhbmRcbiAgLy8gcGF0aGxlc3MgbGF5b3V0IHJvdXRlcylcblxuXG4gIGxldCBwYXRoTWF0Y2hlcyA9IGdldFBhdGhDb250cmlidXRpbmdNYXRjaGVzKG1hdGNoZXMpO1xuICByZXR1cm4gcGF0aE1hdGNoZXNbcGF0aE1hdGNoZXMubGVuZ3RoIC0gMV07XG59IC8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBBYm9ydGVkRGVmZXJyZWRFcnJvciwgQWN0aW9uLCBFcnJvclJlc3BvbnNlLCBJRExFX0ZFVENIRVIsIElETEVfTkFWSUdBVElPTiwgY29udmVydFJvdXRlc1RvRGF0YVJvdXRlcyBhcyBVTlNBRkVfY29udmVydFJvdXRlc1RvRGF0YVJvdXRlcywgZ2V0UGF0aENvbnRyaWJ1dGluZ01hdGNoZXMgYXMgVU5TQUZFX2dldFBhdGhDb250cmlidXRpbmdNYXRjaGVzLCBjcmVhdGVCcm93c2VySGlzdG9yeSwgY3JlYXRlSGFzaEhpc3RvcnksIGNyZWF0ZU1lbW9yeUhpc3RvcnksIGNyZWF0ZVBhdGgsIGNyZWF0ZVJvdXRlciwgZGVmZXIsIGdlbmVyYXRlUGF0aCwgZ2V0U3RhdGljQ29udGV4dEZyb21FcnJvciwgZ2V0VG9QYXRobmFtZSwgaW52YXJpYW50LCBpc1JvdXRlRXJyb3JSZXNwb25zZSwgam9pblBhdGhzLCBqc29uLCBtYXRjaFBhdGgsIG1hdGNoUm91dGVzLCBub3JtYWxpemVQYXRobmFtZSwgcGFyc2VQYXRoLCByZWRpcmVjdCwgcmVzb2x2ZVBhdGgsIHJlc29sdmVUbywgc3RyaXBCYXNlbmFtZSwgdW5zdGFibGVfY3JlYXRlU3RhdGljSGFuZGxlciwgd2FybmluZyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcclxuXHJcbmNvbnN0IE5hdmJhciA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPG5hdj5cclxuICAgICAgICA8TGluayB0bz1cIi9cIj5OYXZpZ2F0aW9uPC9MaW5rPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgICAgPExpbmsgdG89XCIvQ2Fyc01lbmFnZXJcIj4gQ2FycyA8L0xpbms+XHJcbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL0FkZENhclwiPiBDYXJzIDwvTGluaz5cclxuICAgICAgICA8L3VsPlxyXG4gICAgPC9uYXY+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXIiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IENhcnNNYW5hZ2VyIGZyb20gXCIuL0NhcnNNYW5hZ2VyXCI7XG5pbXBvcnQgQWRkQ2FyIGZyb20gXCIuL0FkZENhclwiXG5pbXBvcnQgTmF2YmFyIGZyb20gXCIuL05hdmJhclwiO1xuaW1wb3J0IHsgUm91dGUsIFJvdXRlcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgPE5hdmJhciAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXtDYXJzTWFuYWdlcn0gLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkZC1jYXJcIiBlbGVtZW50PXtBZGRDYXJ9IC8+XG4gICAgICAgIDwvUm91dGVzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgKVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpO1xuIiwiLyoqXG4gKiBSZWFjdCBSb3V0ZXIgRE9NIHY2LjQuNFxuICpcbiAqIENvcHlyaWdodCAoYykgUmVtaXggU29mdHdhcmUgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS5tZCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVTlNBRkVfZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cywgUm91dGVyLCB1c2VIcmVmLCB1c2VSZXNvbHZlZFBhdGgsIHVzZUxvY2F0aW9uLCBVTlNBRkVfRGF0YVJvdXRlclN0YXRlQ29udGV4dCwgVU5TQUZFX05hdmlnYXRpb25Db250ZXh0LCB1c2VOYXZpZ2F0ZSwgY3JlYXRlUGF0aCwgVU5TQUZFX1JvdXRlQ29udGV4dCwgdXNlTWF0Y2hlcywgdXNlTmF2aWdhdGlvbiwgVU5TQUZFX0RhdGFSb3V0ZXJDb250ZXh0IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmV4cG9ydCB7IEFib3J0ZWREZWZlcnJlZEVycm9yLCBBd2FpdCwgTWVtb3J5Um91dGVyLCBOYXZpZ2F0ZSwgTmF2aWdhdGlvblR5cGUsIE91dGxldCwgUm91dGUsIFJvdXRlciwgUm91dGVyUHJvdmlkZXIsIFJvdXRlcywgVU5TQUZFX0RhdGFSb3V0ZXJDb250ZXh0LCBVTlNBRkVfRGF0YVJvdXRlclN0YXRlQ29udGV4dCwgVU5TQUZFX0RhdGFTdGF0aWNSb3V0ZXJDb250ZXh0LCBVTlNBRkVfTG9jYXRpb25Db250ZXh0LCBVTlNBRkVfTmF2aWdhdGlvbkNvbnRleHQsIFVOU0FGRV9Sb3V0ZUNvbnRleHQsIFVOU0FGRV9lbmhhbmNlTWFudWFsUm91dGVPYmplY3RzLCBjcmVhdGVNZW1vcnlSb3V0ZXIsIGNyZWF0ZVBhdGgsIGNyZWF0ZVJvdXRlc0Zyb21DaGlsZHJlbiwgY3JlYXRlUm91dGVzRnJvbUVsZW1lbnRzLCBkZWZlciwgZ2VuZXJhdGVQYXRoLCBpc1JvdXRlRXJyb3JSZXNwb25zZSwganNvbiwgbWF0Y2hQYXRoLCBtYXRjaFJvdXRlcywgcGFyc2VQYXRoLCByZWRpcmVjdCwgcmVuZGVyTWF0Y2hlcywgcmVzb2x2ZVBhdGgsIHVzZUFjdGlvbkRhdGEsIHVzZUFzeW5jRXJyb3IsIHVzZUFzeW5jVmFsdWUsIHVzZUhyZWYsIHVzZUluUm91dGVyQ29udGV4dCwgdXNlTG9hZGVyRGF0YSwgdXNlTG9jYXRpb24sIHVzZU1hdGNoLCB1c2VNYXRjaGVzLCB1c2VOYXZpZ2F0ZSwgdXNlTmF2aWdhdGlvbiwgdXNlTmF2aWdhdGlvblR5cGUsIHVzZU91dGxldCwgdXNlT3V0bGV0Q29udGV4dCwgdXNlUGFyYW1zLCB1c2VSZXNvbHZlZFBhdGgsIHVzZVJldmFsaWRhdG9yLCB1c2VSb3V0ZUVycm9yLCB1c2VSb3V0ZUxvYWRlckRhdGEsIHVzZVJvdXRlcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBjcmVhdGVSb3V0ZXIsIGNyZWF0ZUJyb3dzZXJIaXN0b3J5LCBjcmVhdGVIYXNoSGlzdG9yeSwgRXJyb3JSZXNwb25zZSwgaW52YXJpYW50LCBqb2luUGF0aHMgfSBmcm9tICdAcmVtaXgtcnVuL3JvdXRlcic7XG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmNvbnN0IGRlZmF1bHRNZXRob2QgPSBcImdldFwiO1xuY29uc3QgZGVmYXVsdEVuY1R5cGUgPSBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiO1xuZnVuY3Rpb24gaXNIdG1sRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIHR5cGVvZiBvYmplY3QudGFnTmFtZSA9PT0gXCJzdHJpbmdcIjtcbn1cbmZ1bmN0aW9uIGlzQnV0dG9uRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIGlzSHRtbEVsZW1lbnQob2JqZWN0KSAmJiBvYmplY3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImJ1dHRvblwiO1xufVxuZnVuY3Rpb24gaXNGb3JtRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIGlzSHRtbEVsZW1lbnQob2JqZWN0KSAmJiBvYmplY3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImZvcm1cIjtcbn1cbmZ1bmN0aW9uIGlzSW5wdXRFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gaXNIdG1sRWxlbWVudChvYmplY3QpICYmIG9iamVjdC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIjtcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50KSB7XG4gIHJldHVybiAhIShldmVudC5tZXRhS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkUHJvY2Vzc0xpbmtDbGljayhldmVudCwgdGFyZ2V0KSB7XG4gIHJldHVybiBldmVudC5idXR0b24gPT09IDAgJiYgKCAvLyBJZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3NcbiAgIXRhcmdldCB8fCB0YXJnZXQgPT09IFwiX3NlbGZcIikgJiYgLy8gTGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgIWlzTW9kaWZpZWRFdmVudChldmVudCkgLy8gSWdub3JlIGNsaWNrcyB3aXRoIG1vZGlmaWVyIGtleXNcbiAgO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCB1c2luZyB0aGUgZ2l2ZW4gaW5pdGlhbGl6ZXIuXG4gKlxuICogVGhpcyBpcyBpZGVudGljYWwgdG8gYG5ldyBVUkxTZWFyY2hQYXJhbXMoaW5pdClgIGV4Y2VwdCBpdCBhbHNvXG4gKiBzdXBwb3J0cyBhcnJheXMgYXMgdmFsdWVzIGluIHRoZSBvYmplY3QgZm9ybSBvZiB0aGUgaW5pdGlhbGl6ZXJcbiAqIGluc3RlYWQgb2YganVzdCBzdHJpbmdzLiBUaGlzIGlzIGNvbnZlbmllbnQgd2hlbiB5b3UgbmVlZCBtdWx0aXBsZVxuICogdmFsdWVzIGZvciBhIGdpdmVuIGtleSwgYnV0IGRvbid0IHdhbnQgdG8gdXNlIGFuIGFycmF5IGluaXRpYWxpemVyLlxuICpcbiAqIEZvciBleGFtcGxlLCBpbnN0ZWFkIG9mOlxuICpcbiAqICAgbGV0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoW1xuICogICAgIFsnc29ydCcsICduYW1lJ10sXG4gKiAgICAgWydzb3J0JywgJ3ByaWNlJ11cbiAqICAgXSk7XG4gKlxuICogeW91IGNhbiBkbzpcbiAqXG4gKiAgIGxldCBzZWFyY2hQYXJhbXMgPSBjcmVhdGVTZWFyY2hQYXJhbXMoe1xuICogICAgIHNvcnQ6IFsnbmFtZScsICdwcmljZSddXG4gKiAgIH0pO1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVNlYXJjaFBhcmFtcyhpbml0KSB7XG4gIGlmIChpbml0ID09PSB2b2lkIDApIHtcbiAgICBpbml0ID0gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKHR5cGVvZiBpbml0ID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkoaW5pdCkgfHwgaW5pdCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcyA/IGluaXQgOiBPYmplY3Qua2V5cyhpbml0KS5yZWR1Y2UoKG1lbW8sIGtleSkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGluaXRba2V5XTtcbiAgICByZXR1cm4gbWVtby5jb25jYXQoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAodiA9PiBba2V5LCB2XSkgOiBbW2tleSwgdmFsdWVdXSk7XG4gIH0sIFtdKSk7XG59XG5mdW5jdGlvbiBnZXRTZWFyY2hQYXJhbXNGb3JMb2NhdGlvbihsb2NhdGlvblNlYXJjaCwgZGVmYXVsdFNlYXJjaFBhcmFtcykge1xuICBsZXQgc2VhcmNoUGFyYW1zID0gY3JlYXRlU2VhcmNoUGFyYW1zKGxvY2F0aW9uU2VhcmNoKTtcblxuICBmb3IgKGxldCBrZXkgb2YgZGVmYXVsdFNlYXJjaFBhcmFtcy5rZXlzKCkpIHtcbiAgICBpZiAoIXNlYXJjaFBhcmFtcy5oYXMoa2V5KSkge1xuICAgICAgZGVmYXVsdFNlYXJjaFBhcmFtcy5nZXRBbGwoa2V5KS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzZWFyY2hQYXJhbXM7XG59XG5mdW5jdGlvbiBnZXRGb3JtU3VibWlzc2lvbkluZm8odGFyZ2V0LCBkZWZhdWx0QWN0aW9uLCBvcHRpb25zKSB7XG4gIGxldCBtZXRob2Q7XG4gIGxldCBhY3Rpb247XG4gIGxldCBlbmNUeXBlO1xuICBsZXQgZm9ybURhdGE7XG5cbiAgaWYgKGlzRm9ybUVsZW1lbnQodGFyZ2V0KSkge1xuICAgIGxldCBzdWJtaXNzaW9uVHJpZ2dlciA9IG9wdGlvbnMuc3VibWlzc2lvblRyaWdnZXI7XG4gICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZShcIm1ldGhvZFwiKSB8fCBkZWZhdWx0TWV0aG9kO1xuICAgIGFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIikgfHwgZGVmYXVsdEFjdGlvbjtcbiAgICBlbmNUeXBlID0gb3B0aW9ucy5lbmNUeXBlIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJlbmN0eXBlXCIpIHx8IGRlZmF1bHRFbmNUeXBlO1xuICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRhcmdldCk7XG5cbiAgICBpZiAoc3VibWlzc2lvblRyaWdnZXIgJiYgc3VibWlzc2lvblRyaWdnZXIubmFtZSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHN1Ym1pc3Npb25UcmlnZ2VyLm5hbWUsIHN1Ym1pc3Npb25UcmlnZ2VyLnZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNCdXR0b25FbGVtZW50KHRhcmdldCkgfHwgaXNJbnB1dEVsZW1lbnQodGFyZ2V0KSAmJiAodGFyZ2V0LnR5cGUgPT09IFwic3VibWl0XCIgfHwgdGFyZ2V0LnR5cGUgPT09IFwiaW1hZ2VcIikpIHtcbiAgICBsZXQgZm9ybSA9IHRhcmdldC5mb3JtO1xuXG4gICAgaWYgKGZvcm0gPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN1Ym1pdCBhIDxidXR0b24+IG9yIDxpbnB1dCB0eXBlPVxcXCJzdWJtaXRcXFwiPiB3aXRob3V0IGEgPGZvcm0+XCIpO1xuICAgIH0gLy8gPGJ1dHRvbj4vPGlucHV0IHR5cGU9XCJzdWJtaXRcIj4gbWF5IG92ZXJyaWRlIGF0dHJpYnV0ZXMgb2YgPGZvcm0+XG5cblxuICAgIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJmb3JtbWV0aG9kXCIpIHx8IGZvcm0uZ2V0QXR0cmlidXRlKFwibWV0aG9kXCIpIHx8IGRlZmF1bHRNZXRob2Q7XG4gICAgYWN0aW9uID0gb3B0aW9ucy5hY3Rpb24gfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZShcImZvcm1hY3Rpb25cIikgfHwgZm9ybS5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIikgfHwgZGVmYXVsdEFjdGlvbjtcbiAgICBlbmNUeXBlID0gb3B0aW9ucy5lbmNUeXBlIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJmb3JtZW5jdHlwZVwiKSB8fCBmb3JtLmdldEF0dHJpYnV0ZShcImVuY3R5cGVcIikgfHwgZGVmYXVsdEVuY1R5cGU7XG4gICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7IC8vIEluY2x1ZGUgbmFtZSArIHZhbHVlIGZyb20gYSA8YnV0dG9uPiwgYXBwZW5kaW5nIGluIGNhc2UgdGhlIGJ1dHRvbiBuYW1lXG4gICAgLy8gbWF0Y2hlcyBhbiBleGlzdGluZyBpbnB1dCBuYW1lXG5cbiAgICBpZiAodGFyZ2V0Lm5hbWUpIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCh0YXJnZXQubmFtZSwgdGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNIdG1sRWxlbWVudCh0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN1Ym1pdCBlbGVtZW50IHRoYXQgaXMgbm90IDxmb3JtPiwgPGJ1dHRvbj4sIG9yIFwiICsgXCI8aW5wdXQgdHlwZT1cXFwic3VibWl0fGltYWdlXFxcIj5cIik7XG4gIH0gZWxzZSB7XG4gICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgZGVmYXVsdE1ldGhvZDtcbiAgICBhY3Rpb24gPSBvcHRpb25zLmFjdGlvbiB8fCBkZWZhdWx0QWN0aW9uO1xuICAgIGVuY1R5cGUgPSBvcHRpb25zLmVuY1R5cGUgfHwgZGVmYXVsdEVuY1R5cGU7XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgIGZvcm1EYXRhID0gdGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgICAgIGZvciAobGV0IFtuYW1lLCB2YWx1ZV0gb2YgdGFyZ2V0KSB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBuYW1lIG9mIE9iamVjdC5rZXlzKHRhcmdldCkpIHtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQobmFtZSwgdGFyZ2V0W25hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCB7XG4gICAgcHJvdG9jb2wsXG4gICAgaG9zdFxuICB9ID0gd2luZG93LmxvY2F0aW9uO1xuICBsZXQgdXJsID0gbmV3IFVSTChhY3Rpb24sIHByb3RvY29sICsgXCIvL1wiICsgaG9zdCk7XG4gIHJldHVybiB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBlbmNUeXBlLFxuICAgIGZvcm1EYXRhXG4gIH07XG59XG5cbmNvbnN0IF9leGNsdWRlZCA9IFtcIm9uQ2xpY2tcIiwgXCJyZWxhdGl2ZVwiLCBcInJlbG9hZERvY3VtZW50XCIsIFwicmVwbGFjZVwiLCBcInN0YXRlXCIsIFwidGFyZ2V0XCIsIFwidG9cIiwgXCJwcmV2ZW50U2Nyb2xsUmVzZXRcIl0sXG4gICAgICBfZXhjbHVkZWQyID0gW1wiYXJpYS1jdXJyZW50XCIsIFwiY2FzZVNlbnNpdGl2ZVwiLCBcImNsYXNzTmFtZVwiLCBcImVuZFwiLCBcInN0eWxlXCIsIFwidG9cIiwgXCJjaGlsZHJlblwiXSxcbiAgICAgIF9leGNsdWRlZDMgPSBbXCJyZWxvYWREb2N1bWVudFwiLCBcInJlcGxhY2VcIiwgXCJtZXRob2RcIiwgXCJhY3Rpb25cIiwgXCJvblN1Ym1pdFwiLCBcImZldGNoZXJLZXlcIiwgXCJyb3V0ZUlkXCIsIFwicmVsYXRpdmVcIl07XG4vLyNyZWdpb24gUm91dGVyc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gY3JlYXRlQnJvd3NlclJvdXRlcihyb3V0ZXMsIG9wdHMpIHtcbiAgcmV0dXJuIGNyZWF0ZVJvdXRlcih7XG4gICAgYmFzZW5hbWU6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuYmFzZW5hbWUsXG4gICAgaGlzdG9yeTogY3JlYXRlQnJvd3Nlckhpc3Rvcnkoe1xuICAgICAgd2luZG93OiBvcHRzID09IG51bGwgPyB2b2lkIDAgOiBvcHRzLndpbmRvd1xuICAgIH0pLFxuICAgIGh5ZHJhdGlvbkRhdGE6IChvcHRzID09IG51bGwgPyB2b2lkIDAgOiBvcHRzLmh5ZHJhdGlvbkRhdGEpIHx8IHBhcnNlSHlkcmF0aW9uRGF0YSgpLFxuICAgIHJvdXRlczogVU5TQUZFX2VuaGFuY2VNYW51YWxSb3V0ZU9iamVjdHMocm91dGVzKVxuICB9KS5pbml0aWFsaXplKCk7XG59XG5mdW5jdGlvbiBjcmVhdGVIYXNoUm91dGVyKHJvdXRlcywgb3B0cykge1xuICByZXR1cm4gY3JlYXRlUm91dGVyKHtcbiAgICBiYXNlbmFtZTogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5iYXNlbmFtZSxcbiAgICBoaXN0b3J5OiBjcmVhdGVIYXNoSGlzdG9yeSh7XG4gICAgICB3aW5kb3c6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMud2luZG93XG4gICAgfSksXG4gICAgaHlkcmF0aW9uRGF0YTogKG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuaHlkcmF0aW9uRGF0YSkgfHwgcGFyc2VIeWRyYXRpb25EYXRhKCksXG4gICAgcm91dGVzOiBVTlNBRkVfZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cyhyb3V0ZXMpXG4gIH0pLmluaXRpYWxpemUoKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VIeWRyYXRpb25EYXRhKCkge1xuICB2YXIgX3dpbmRvdztcblxuICBsZXQgc3RhdGUgPSAoX3dpbmRvdyA9IHdpbmRvdykgPT0gbnVsbCA/IHZvaWQgMCA6IF93aW5kb3cuX19zdGF0aWNSb3V0ZXJIeWRyYXRpb25EYXRhO1xuXG4gIGlmIChzdGF0ZSAmJiBzdGF0ZS5lcnJvcnMpIHtcbiAgICBzdGF0ZSA9IF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgZXJyb3JzOiBkZXNlcmlhbGl6ZUVycm9ycyhzdGF0ZS5lcnJvcnMpXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGRlc2VyaWFsaXplRXJyb3JzKGVycm9ycykge1xuICBpZiAoIWVycm9ycykgcmV0dXJuIG51bGw7XG4gIGxldCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoZXJyb3JzKTtcbiAgbGV0IHNlcmlhbGl6ZWQgPSB7fTtcblxuICBmb3IgKGxldCBba2V5LCB2YWxdIG9mIGVudHJpZXMpIHtcbiAgICAvLyBIZXkgeW91ISAgSWYgeW91IGNoYW5nZSB0aGlzLCBwbGVhc2UgY2hhbmdlIHRoZSBjb3JyZXNwb25kaW5nIGxvZ2ljIGluXG4gICAgLy8gc2VyaWFsaXplRXJyb3JzIGluIHJlYWN0LXJvdXRlci1kb20vc2VydmVyLnRzeCA6KVxuICAgIGlmICh2YWwgJiYgdmFsLl9fdHlwZSA9PT0gXCJSb3V0ZUVycm9yUmVzcG9uc2VcIikge1xuICAgICAgc2VyaWFsaXplZFtrZXldID0gbmV3IEVycm9yUmVzcG9uc2UodmFsLnN0YXR1cywgdmFsLnN0YXR1c1RleHQsIHZhbC5kYXRhLCB2YWwuaW50ZXJuYWwgPT09IHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXJpYWxpemVkW2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG59XG4vKipcbiAqIEEgYDxSb3V0ZXI+YCBmb3IgdXNlIGluIHdlYiBicm93c2Vycy4gUHJvdmlkZXMgdGhlIGNsZWFuZXN0IFVSTHMuXG4gKi9cblxuXG5mdW5jdGlvbiBCcm93c2VyUm91dGVyKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBiYXNlbmFtZSxcbiAgICBjaGlsZHJlbixcbiAgICB3aW5kb3dcbiAgfSA9IF9yZWY7XG4gIGxldCBoaXN0b3J5UmVmID0gUmVhY3QudXNlUmVmKCk7XG5cbiAgaWYgKGhpc3RvcnlSZWYuY3VycmVudCA9PSBudWxsKSB7XG4gICAgaGlzdG9yeVJlZi5jdXJyZW50ID0gY3JlYXRlQnJvd3Nlckhpc3Rvcnkoe1xuICAgICAgd2luZG93LFxuICAgICAgdjVDb21wYXQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBoaXN0b3J5ID0gaGlzdG9yeVJlZi5jdXJyZW50O1xuICBsZXQgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgYWN0aW9uOiBoaXN0b3J5LmFjdGlvbixcbiAgICBsb2NhdGlvbjogaGlzdG9yeS5sb2NhdGlvblxuICB9KTtcbiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IGhpc3RvcnkubGlzdGVuKHNldFN0YXRlKSwgW2hpc3RvcnldKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgIGJhc2VuYW1lOiBiYXNlbmFtZSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgbG9jYXRpb246IHN0YXRlLmxvY2F0aW9uLFxuICAgIG5hdmlnYXRpb25UeXBlOiBzdGF0ZS5hY3Rpb24sXG4gICAgbmF2aWdhdG9yOiBoaXN0b3J5XG4gIH0pO1xufVxuLyoqXG4gKiBBIGA8Um91dGVyPmAgZm9yIHVzZSBpbiB3ZWIgYnJvd3NlcnMuIFN0b3JlcyB0aGUgbG9jYXRpb24gaW4gdGhlIGhhc2hcbiAqIHBvcnRpb24gb2YgdGhlIFVSTCBzbyBpdCBpcyBub3Qgc2VudCB0byB0aGUgc2VydmVyLlxuICovXG5cbmZ1bmN0aW9uIEhhc2hSb3V0ZXIoX3JlZjIpIHtcbiAgbGV0IHtcbiAgICBiYXNlbmFtZSxcbiAgICBjaGlsZHJlbixcbiAgICB3aW5kb3dcbiAgfSA9IF9yZWYyO1xuICBsZXQgaGlzdG9yeVJlZiA9IFJlYWN0LnVzZVJlZigpO1xuXG4gIGlmIChoaXN0b3J5UmVmLmN1cnJlbnQgPT0gbnVsbCkge1xuICAgIGhpc3RvcnlSZWYuY3VycmVudCA9IGNyZWF0ZUhhc2hIaXN0b3J5KHtcbiAgICAgIHdpbmRvdyxcbiAgICAgIHY1Q29tcGF0OiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBsZXQgaGlzdG9yeSA9IGhpc3RvcnlSZWYuY3VycmVudDtcbiAgbGV0IFtzdGF0ZSwgc2V0U3RhdGVdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGFjdGlvbjogaGlzdG9yeS5hY3Rpb24sXG4gICAgbG9jYXRpb246IGhpc3RvcnkubG9jYXRpb25cbiAgfSk7XG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiBoaXN0b3J5Lmxpc3RlbihzZXRTdGF0ZSksIFtoaXN0b3J5XSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICBiYXNlbmFtZTogYmFzZW5hbWUsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGxvY2F0aW9uOiBzdGF0ZS5sb2NhdGlvbixcbiAgICBuYXZpZ2F0aW9uVHlwZTogc3RhdGUuYWN0aW9uLFxuICAgIG5hdmlnYXRvcjogaGlzdG9yeVxuICB9KTtcbn1cbi8qKlxuICogQSBgPFJvdXRlcj5gIHRoYXQgYWNjZXB0cyBhIHByZS1pbnN0YW50aWF0ZWQgaGlzdG9yeSBvYmplY3QuIEl0J3MgaW1wb3J0YW50XG4gKiB0byBub3RlIHRoYXQgdXNpbmcgeW91ciBvd24gaGlzdG9yeSBvYmplY3QgaXMgaGlnaGx5IGRpc2NvdXJhZ2VkIGFuZCBtYXkgYWRkXG4gKiB0d28gdmVyc2lvbnMgb2YgdGhlIGhpc3RvcnkgbGlicmFyeSB0byB5b3VyIGJ1bmRsZXMgdW5sZXNzIHlvdSB1c2UgdGhlIHNhbWVcbiAqIHZlcnNpb24gb2YgdGhlIGhpc3RvcnkgbGlicmFyeSB0aGF0IFJlYWN0IFJvdXRlciB1c2VzIGludGVybmFsbHkuXG4gKi9cblxuZnVuY3Rpb24gSGlzdG9yeVJvdXRlcihfcmVmMykge1xuICBsZXQge1xuICAgIGJhc2VuYW1lLFxuICAgIGNoaWxkcmVuLFxuICAgIGhpc3RvcnlcbiAgfSA9IF9yZWYzO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlKHtcbiAgICBhY3Rpb246IGhpc3RvcnkuYWN0aW9uLFxuICAgIGxvY2F0aW9uOiBoaXN0b3J5LmxvY2F0aW9uXG4gIH0pO1xuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gaGlzdG9yeS5saXN0ZW4oc2V0U3RhdGUpLCBbaGlzdG9yeV0pO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVyLCB7XG4gICAgYmFzZW5hbWU6IGJhc2VuYW1lLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICBsb2NhdGlvbjogc3RhdGUubG9jYXRpb24sXG4gICAgbmF2aWdhdGlvblR5cGU6IHN0YXRlLmFjdGlvbixcbiAgICBuYXZpZ2F0b3I6IGhpc3RvcnlcbiAgfSk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgSGlzdG9yeVJvdXRlci5kaXNwbGF5TmFtZSA9IFwidW5zdGFibGVfSGlzdG9yeVJvdXRlclwiO1xufVxuLyoqXG4gKiBUaGUgcHVibGljIEFQSSBmb3IgcmVuZGVyaW5nIGEgaGlzdG9yeS1hd2FyZSA8YT4uXG4gKi9cblxuY29uc3QgTGluayA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIExpbmtXaXRoUmVmKF9yZWY0LCByZWYpIHtcbiAgbGV0IHtcbiAgICBvbkNsaWNrLFxuICAgIHJlbGF0aXZlLFxuICAgIHJlbG9hZERvY3VtZW50LFxuICAgIHJlcGxhY2UsXG4gICAgc3RhdGUsXG4gICAgdGFyZ2V0LFxuICAgIHRvLFxuICAgIHByZXZlbnRTY3JvbGxSZXNldFxuICB9ID0gX3JlZjQsXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjQsIF9leGNsdWRlZCk7XG5cbiAgbGV0IGhyZWYgPSB1c2VIcmVmKHRvLCB7XG4gICAgcmVsYXRpdmVcbiAgfSk7XG4gIGxldCBpbnRlcm5hbE9uQ2xpY2sgPSB1c2VMaW5rQ2xpY2tIYW5kbGVyKHRvLCB7XG4gICAgcmVwbGFjZSxcbiAgICBzdGF0ZSxcbiAgICB0YXJnZXQsXG4gICAgcHJldmVudFNjcm9sbFJlc2V0LFxuICAgIHJlbGF0aXZlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKG9uQ2xpY2spIG9uQ2xpY2soZXZlbnQpO1xuXG4gICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICBpbnRlcm5hbE9uQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgLyojX19QVVJFX18qL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9hbmNob3ItaGFzLWNvbnRlbnRcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgaHJlZjogaHJlZixcbiAgICAgIG9uQ2xpY2s6IHJlbG9hZERvY3VtZW50ID8gb25DbGljayA6IGhhbmRsZUNsaWNrLFxuICAgICAgcmVmOiByZWYsXG4gICAgICB0YXJnZXQ6IHRhcmdldFxuICAgIH0pKVxuICApO1xufSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgTGluay5kaXNwbGF5TmFtZSA9IFwiTGlua1wiO1xufVxuLyoqXG4gKiBBIDxMaW5rPiB3cmFwcGVyIHRoYXQga25vd3MgaWYgaXQncyBcImFjdGl2ZVwiIG9yIG5vdC5cbiAqL1xuXG5cbmNvbnN0IE5hdkxpbmsgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBOYXZMaW5rV2l0aFJlZihfcmVmNSwgcmVmKSB7XG4gIGxldCB7XG4gICAgXCJhcmlhLWN1cnJlbnRcIjogYXJpYUN1cnJlbnRQcm9wID0gXCJwYWdlXCIsXG4gICAgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlLFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lUHJvcCA9IFwiXCIsXG4gICAgZW5kID0gZmFsc2UsXG4gICAgc3R5bGU6IHN0eWxlUHJvcCxcbiAgICB0byxcbiAgICBjaGlsZHJlblxuICB9ID0gX3JlZjUsXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjUsIF9leGNsdWRlZDIpO1xuXG4gIGxldCBwYXRoID0gdXNlUmVzb2x2ZWRQYXRoKHRvLCB7XG4gICAgcmVsYXRpdmU6IHJlc3QucmVsYXRpdmVcbiAgfSk7XG4gIGxldCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGxldCByb3V0ZXJTdGF0ZSA9IFJlYWN0LnVzZUNvbnRleHQoVU5TQUZFX0RhdGFSb3V0ZXJTdGF0ZUNvbnRleHQpO1xuICBsZXQge1xuICAgIG5hdmlnYXRvclxuICB9ID0gUmVhY3QudXNlQ29udGV4dChVTlNBRkVfTmF2aWdhdGlvbkNvbnRleHQpO1xuICBsZXQgdG9QYXRobmFtZSA9IG5hdmlnYXRvci5lbmNvZGVMb2NhdGlvbiA/IG5hdmlnYXRvci5lbmNvZGVMb2NhdGlvbihwYXRoKS5wYXRobmFtZSA6IHBhdGgucGF0aG5hbWU7XG4gIGxldCBsb2NhdGlvblBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gIGxldCBuZXh0TG9jYXRpb25QYXRobmFtZSA9IHJvdXRlclN0YXRlICYmIHJvdXRlclN0YXRlLm5hdmlnYXRpb24gJiYgcm91dGVyU3RhdGUubmF2aWdhdGlvbi5sb2NhdGlvbiA/IHJvdXRlclN0YXRlLm5hdmlnYXRpb24ubG9jYXRpb24ucGF0aG5hbWUgOiBudWxsO1xuXG4gIGlmICghY2FzZVNlbnNpdGl2ZSkge1xuICAgIGxvY2F0aW9uUGF0aG5hbWUgPSBsb2NhdGlvblBhdGhuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgbmV4dExvY2F0aW9uUGF0aG5hbWUgPSBuZXh0TG9jYXRpb25QYXRobmFtZSA/IG5leHRMb2NhdGlvblBhdGhuYW1lLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgIHRvUGF0aG5hbWUgPSB0b1BhdGhuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICBsZXQgaXNBY3RpdmUgPSBsb2NhdGlvblBhdGhuYW1lID09PSB0b1BhdGhuYW1lIHx8ICFlbmQgJiYgbG9jYXRpb25QYXRobmFtZS5zdGFydHNXaXRoKHRvUGF0aG5hbWUpICYmIGxvY2F0aW9uUGF0aG5hbWUuY2hhckF0KHRvUGF0aG5hbWUubGVuZ3RoKSA9PT0gXCIvXCI7XG4gIGxldCBpc1BlbmRpbmcgPSBuZXh0TG9jYXRpb25QYXRobmFtZSAhPSBudWxsICYmIChuZXh0TG9jYXRpb25QYXRobmFtZSA9PT0gdG9QYXRobmFtZSB8fCAhZW5kICYmIG5leHRMb2NhdGlvblBhdGhuYW1lLnN0YXJ0c1dpdGgodG9QYXRobmFtZSkgJiYgbmV4dExvY2F0aW9uUGF0aG5hbWUuY2hhckF0KHRvUGF0aG5hbWUubGVuZ3RoKSA9PT0gXCIvXCIpO1xuICBsZXQgYXJpYUN1cnJlbnQgPSBpc0FjdGl2ZSA/IGFyaWFDdXJyZW50UHJvcCA6IHVuZGVmaW5lZDtcbiAgbGV0IGNsYXNzTmFtZTtcblxuICBpZiAodHlwZW9mIGNsYXNzTmFtZVByb3AgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZVByb3Aoe1xuICAgICAgaXNBY3RpdmUsXG4gICAgICBpc1BlbmRpbmdcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB0aGUgY2xhc3NOYW1lIHByb3AgaXMgbm90IGEgZnVuY3Rpb24sIHdlIHVzZSBhIGRlZmF1bHQgYGFjdGl2ZWBcbiAgICAvLyBjbGFzcyBmb3IgPE5hdkxpbmsgLz5zIHRoYXQgYXJlIGFjdGl2ZS4gSW4gdjUgYGFjdGl2ZWAgd2FzIHRoZSBkZWZhdWx0XG4gICAgLy8gdmFsdWUgZm9yIGBhY3RpdmVDbGFzc05hbWVgLCBidXQgd2UgYXJlIHJlbW92aW5nIHRoYXQgQVBJIGFuZCBjYW4gc3RpbGxcbiAgICAvLyB1c2UgdGhlIG9sZCBkZWZhdWx0IGJlaGF2aW9yIGZvciBhIGNsZWFuZXIgdXBncmFkZSBwYXRoIGFuZCBrZWVwIHRoZVxuICAgIC8vIHNpbXBsZSBzdHlsaW5nIHJ1bGVzIHdvcmtpbmcgYXMgdGhleSBjdXJyZW50bHkgZG8uXG4gICAgY2xhc3NOYW1lID0gW2NsYXNzTmFtZVByb3AsIGlzQWN0aXZlID8gXCJhY3RpdmVcIiA6IG51bGwsIGlzUGVuZGluZyA/IFwicGVuZGluZ1wiIDogbnVsbF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICB9XG5cbiAgbGV0IHN0eWxlID0gdHlwZW9mIHN0eWxlUHJvcCA9PT0gXCJmdW5jdGlvblwiID8gc3R5bGVQcm9wKHtcbiAgICBpc0FjdGl2ZSxcbiAgICBpc1BlbmRpbmdcbiAgfSkgOiBzdHlsZVByb3A7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChMaW5rLCBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgIFwiYXJpYS1jdXJyZW50XCI6IGFyaWFDdXJyZW50LFxuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgIHJlZjogcmVmLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICB0bzogdG9cbiAgfSksIHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiID8gY2hpbGRyZW4oe1xuICAgIGlzQWN0aXZlLFxuICAgIGlzUGVuZGluZ1xuICB9KSA6IGNoaWxkcmVuKTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIE5hdkxpbmsuZGlzcGxheU5hbWUgPSBcIk5hdkxpbmtcIjtcbn1cbi8qKlxuICogQSBgQHJlbWl4LXJ1bi9yb3V0ZXJgLWF3YXJlIGA8Zm9ybT5gLiBJdCBiZWhhdmVzIGxpa2UgYSBub3JtYWwgZm9ybSBleGNlcHRcbiAqIHRoYXQgdGhlIGludGVyYWN0aW9uIHdpdGggdGhlIHNlcnZlciBpcyB3aXRoIGBmZXRjaGAgaW5zdGVhZCBvZiBuZXcgZG9jdW1lbnRcbiAqIHJlcXVlc3RzLCBhbGxvd2luZyBjb21wb25lbnRzIHRvIGFkZCBuaWNlciBVWCB0byB0aGUgcGFnZSBhcyB0aGUgZm9ybSBpc1xuICogc3VibWl0dGVkIGFuZCByZXR1cm5zIHdpdGggZGF0YS5cbiAqL1xuXG5cbmNvbnN0IEZvcm0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUltcGwsIF9leHRlbmRzKHt9LCBwcm9wcywge1xuICAgIHJlZjogcmVmXG4gIH0pKTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEZvcm0uZGlzcGxheU5hbWUgPSBcIkZvcm1cIjtcbn1cblxuY29uc3QgRm9ybUltcGwgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZigoX3JlZjYsIGZvcndhcmRlZFJlZikgPT4ge1xuICBsZXQge1xuICAgIHJlbG9hZERvY3VtZW50LFxuICAgIHJlcGxhY2UsXG4gICAgbWV0aG9kID0gZGVmYXVsdE1ldGhvZCxcbiAgICBhY3Rpb24sXG4gICAgb25TdWJtaXQsXG4gICAgZmV0Y2hlcktleSxcbiAgICByb3V0ZUlkLFxuICAgIHJlbGF0aXZlXG4gIH0gPSBfcmVmNixcbiAgICAgIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZjYsIF9leGNsdWRlZDMpO1xuXG4gIGxldCBzdWJtaXQgPSB1c2VTdWJtaXRJbXBsKGZldGNoZXJLZXksIHJvdXRlSWQpO1xuICBsZXQgZm9ybU1ldGhvZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSBcImdldFwiID8gXCJnZXRcIiA6IFwicG9zdFwiO1xuICBsZXQgZm9ybUFjdGlvbiA9IHVzZUZvcm1BY3Rpb24oYWN0aW9uLCB7XG4gICAgcmVsYXRpdmVcbiAgfSk7XG5cbiAgbGV0IHN1Ym1pdEhhbmRsZXIgPSBldmVudCA9PiB7XG4gICAgb25TdWJtaXQgJiYgb25TdWJtaXQoZXZlbnQpO1xuICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgc3VibWl0dGVyID0gZXZlbnQubmF0aXZlRXZlbnQuc3VibWl0dGVyO1xuICAgIHN1Ym1pdChzdWJtaXR0ZXIgfHwgZXZlbnQuY3VycmVudFRhcmdldCwge1xuICAgICAgbWV0aG9kLFxuICAgICAgcmVwbGFjZSxcbiAgICAgIHJlbGF0aXZlXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCBfZXh0ZW5kcyh7XG4gICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgbWV0aG9kOiBmb3JtTWV0aG9kLFxuICAgIGFjdGlvbjogZm9ybUFjdGlvbixcbiAgICBvblN1Ym1pdDogcmVsb2FkRG9jdW1lbnQgPyBvblN1Ym1pdCA6IHN1Ym1pdEhhbmRsZXJcbiAgfSwgcHJvcHMpKTtcbn0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEZvcm1JbXBsLmRpc3BsYXlOYW1lID0gXCJGb3JtSW1wbFwiO1xufVxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCB3aWxsIGVtdWxhdGUgdGhlIGJyb3dzZXIncyBzY3JvbGwgcmVzdG9yYXRpb24gb24gbG9jYXRpb25cbiAqIGNoYW5nZXMuXG4gKi9cblxuXG5mdW5jdGlvbiBTY3JvbGxSZXN0b3JhdGlvbihfcmVmNykge1xuICBsZXQge1xuICAgIGdldEtleSxcbiAgICBzdG9yYWdlS2V5XG4gIH0gPSBfcmVmNztcbiAgdXNlU2Nyb2xsUmVzdG9yYXRpb24oe1xuICAgIGdldEtleSxcbiAgICBzdG9yYWdlS2V5XG4gIH0pO1xuICByZXR1cm4gbnVsbDtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTY3JvbGxSZXN0b3JhdGlvbi5kaXNwbGF5TmFtZSA9IFwiU2Nyb2xsUmVzdG9yYXRpb25cIjtcbn0gLy8jZW5kcmVnaW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8jcmVnaW9uIEhvb2tzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbnZhciBEYXRhUm91dGVySG9vaztcblxuKGZ1bmN0aW9uIChEYXRhUm91dGVySG9vaykge1xuICBEYXRhUm91dGVySG9va1tcIlVzZVNjcm9sbFJlc3RvcmF0aW9uXCJdID0gXCJ1c2VTY3JvbGxSZXN0b3JhdGlvblwiO1xuICBEYXRhUm91dGVySG9va1tcIlVzZVN1Ym1pdEltcGxcIl0gPSBcInVzZVN1Ym1pdEltcGxcIjtcbiAgRGF0YVJvdXRlckhvb2tbXCJVc2VGZXRjaGVyXCJdID0gXCJ1c2VGZXRjaGVyXCI7XG59KShEYXRhUm91dGVySG9vayB8fCAoRGF0YVJvdXRlckhvb2sgPSB7fSkpO1xuXG52YXIgRGF0YVJvdXRlclN0YXRlSG9vaztcblxuKGZ1bmN0aW9uIChEYXRhUm91dGVyU3RhdGVIb29rKSB7XG4gIERhdGFSb3V0ZXJTdGF0ZUhvb2tbXCJVc2VGZXRjaGVyc1wiXSA9IFwidXNlRmV0Y2hlcnNcIjtcbiAgRGF0YVJvdXRlclN0YXRlSG9va1tcIlVzZVNjcm9sbFJlc3RvcmF0aW9uXCJdID0gXCJ1c2VTY3JvbGxSZXN0b3JhdGlvblwiO1xufSkoRGF0YVJvdXRlclN0YXRlSG9vayB8fCAoRGF0YVJvdXRlclN0YXRlSG9vayA9IHt9KSk7XG5cbmZ1bmN0aW9uIGdldERhdGFSb3V0ZXJDb25zb2xlRXJyb3IoaG9va05hbWUpIHtcbiAgcmV0dXJuIGhvb2tOYW1lICsgXCIgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIGRhdGEgcm91dGVyLiAgU2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2VuL21haW4vcm91dGVycy9waWNraW5nLWEtcm91dGVyLlwiO1xufVxuXG5mdW5jdGlvbiB1c2VEYXRhUm91dGVyQ29udGV4dChob29rTmFtZSkge1xuICBsZXQgY3R4ID0gUmVhY3QudXNlQ29udGV4dChVTlNBRkVfRGF0YVJvdXRlckNvbnRleHQpO1xuICAhY3R4ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBnZXREYXRhUm91dGVyQ29uc29sZUVycm9yKGhvb2tOYW1lKSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICByZXR1cm4gY3R4O1xufVxuXG5mdW5jdGlvbiB1c2VEYXRhUm91dGVyU3RhdGUoaG9va05hbWUpIHtcbiAgbGV0IHN0YXRlID0gUmVhY3QudXNlQ29udGV4dChVTlNBRkVfRGF0YVJvdXRlclN0YXRlQ29udGV4dCk7XG4gICFzdGF0ZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgZ2V0RGF0YVJvdXRlckNvbnNvbGVFcnJvcihob29rTmFtZSkpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIHN0YXRlO1xufVxuLyoqXG4gKiBIYW5kbGVzIHRoZSBjbGljayBiZWhhdmlvciBmb3Igcm91dGVyIGA8TGluaz5gIGNvbXBvbmVudHMuIFRoaXMgaXMgdXNlZnVsIGlmXG4gKiB5b3UgbmVlZCB0byBjcmVhdGUgY3VzdG9tIGA8TGluaz5gIGNvbXBvbmVudHMgd2l0aCB0aGUgc2FtZSBjbGljayBiZWhhdmlvciB3ZVxuICogdXNlIGluIG91ciBleHBvcnRlZCBgPExpbms+YC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHVzZUxpbmtDbGlja0hhbmRsZXIodG8sIF90ZW1wKSB7XG4gIGxldCB7XG4gICAgdGFyZ2V0LFxuICAgIHJlcGxhY2U6IHJlcGxhY2VQcm9wLFxuICAgIHN0YXRlLFxuICAgIHByZXZlbnRTY3JvbGxSZXNldCxcbiAgICByZWxhdGl2ZVxuICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7XG4gIGxldCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGxldCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG4gIGxldCBwYXRoID0gdXNlUmVzb2x2ZWRQYXRoKHRvLCB7XG4gICAgcmVsYXRpdmVcbiAgfSk7XG4gIHJldHVybiBSZWFjdC51c2VDYWxsYmFjayhldmVudCA9PiB7XG4gICAgaWYgKHNob3VsZFByb2Nlc3NMaW5rQ2xpY2soZXZlbnQsIHRhcmdldCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIElmIHRoZSBVUkwgaGFzbid0IGNoYW5nZWQsIGEgcmVndWxhciA8YT4gd2lsbCBkbyBhIHJlcGxhY2UgaW5zdGVhZCBvZlxuICAgICAgLy8gYSBwdXNoLCBzbyBkbyB0aGUgc2FtZSBoZXJlIHVubGVzcyB0aGUgcmVwbGFjZSBwcm9wIGlzIGV4cGxpY2l0bHkgc2V0XG5cbiAgICAgIGxldCByZXBsYWNlID0gcmVwbGFjZVByb3AgIT09IHVuZGVmaW5lZCA/IHJlcGxhY2VQcm9wIDogY3JlYXRlUGF0aChsb2NhdGlvbikgPT09IGNyZWF0ZVBhdGgocGF0aCk7XG4gICAgICBuYXZpZ2F0ZSh0bywge1xuICAgICAgICByZXBsYWNlLFxuICAgICAgICBzdGF0ZSxcbiAgICAgICAgcHJldmVudFNjcm9sbFJlc2V0LFxuICAgICAgICByZWxhdGl2ZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCBbbG9jYXRpb24sIG5hdmlnYXRlLCBwYXRoLCByZXBsYWNlUHJvcCwgc3RhdGUsIHRhcmdldCwgdG8sIHByZXZlbnRTY3JvbGxSZXNldCwgcmVsYXRpdmVdKTtcbn1cbi8qKlxuICogQSBjb252ZW5pZW50IHdyYXBwZXIgZm9yIHJlYWRpbmcgYW5kIHdyaXRpbmcgc2VhcmNoIHBhcmFtZXRlcnMgdmlhIHRoZVxuICogVVJMU2VhcmNoUGFyYW1zIGludGVyZmFjZS5cbiAqL1xuXG5mdW5jdGlvbiB1c2VTZWFyY2hQYXJhbXMoZGVmYXVsdEluaXQpIHtcbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyh0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSBcInVuZGVmaW5lZFwiLCBcIllvdSBjYW5ub3QgdXNlIHRoZSBgdXNlU2VhcmNoUGFyYW1zYCBob29rIGluIGEgYnJvd3NlciB0aGF0IGRvZXMgbm90IFwiICsgXCJzdXBwb3J0IHRoZSBVUkxTZWFyY2hQYXJhbXMgQVBJLiBJZiB5b3UgbmVlZCB0byBzdXBwb3J0IEludGVybmV0IFwiICsgXCJFeHBsb3JlciAxMSwgd2UgcmVjb21tZW5kIHlvdSBsb2FkIGEgcG9seWZpbGwgc3VjaCBhcyBcIiArIFwiaHR0cHM6Ly9naXRodWIuY29tL3VuZ2FwL3VybC1zZWFyY2gtcGFyYW1zXFxuXFxuXCIgKyBcIklmIHlvdSdyZSB1bnN1cmUgaG93IHRvIGxvYWQgcG9seWZpbGxzLCB3ZSByZWNvbW1lbmQgeW91IGNoZWNrIG91dCBcIiArIFwiaHR0cHM6Ly9wb2x5ZmlsbC5pby92My8gd2hpY2ggcHJvdmlkZXMgc29tZSByZWNvbW1lbmRhdGlvbnMgYWJvdXQgaG93IFwiICsgXCJ0byBsb2FkIHBvbHlmaWxscyBvbmx5IGZvciB1c2VycyB0aGF0IG5lZWQgdGhlbSwgaW5zdGVhZCBvZiBmb3IgZXZlcnkgXCIgKyBcInVzZXIuXCIpIDogdm9pZCAwO1xuICBsZXQgZGVmYXVsdFNlYXJjaFBhcmFtc1JlZiA9IFJlYWN0LnVzZVJlZihjcmVhdGVTZWFyY2hQYXJhbXMoZGVmYXVsdEluaXQpKTtcbiAgbGV0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgbGV0IHNlYXJjaFBhcmFtcyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gZ2V0U2VhcmNoUGFyYW1zRm9yTG9jYXRpb24obG9jYXRpb24uc2VhcmNoLCBkZWZhdWx0U2VhcmNoUGFyYW1zUmVmLmN1cnJlbnQpLCBbbG9jYXRpb24uc2VhcmNoXSk7XG4gIGxldCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGxldCBzZXRTZWFyY2hQYXJhbXMgPSBSZWFjdC51c2VDYWxsYmFjaygobmV4dEluaXQsIG5hdmlnYXRlT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IG5ld1NlYXJjaFBhcmFtcyA9IGNyZWF0ZVNlYXJjaFBhcmFtcyh0eXBlb2YgbmV4dEluaXQgPT09IFwiZnVuY3Rpb25cIiA/IG5leHRJbml0KHNlYXJjaFBhcmFtcykgOiBuZXh0SW5pdCk7XG4gICAgbmF2aWdhdGUoXCI/XCIgKyBuZXdTZWFyY2hQYXJhbXMsIG5hdmlnYXRlT3B0aW9ucyk7XG4gIH0sIFtuYXZpZ2F0ZSwgc2VhcmNoUGFyYW1zXSk7XG4gIHJldHVybiBbc2VhcmNoUGFyYW1zLCBzZXRTZWFyY2hQYXJhbXNdO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBtYXkgYmUgdXNlZCB0byBwcm9ncmFtbWF0aWNhbGx5IHN1Ym1pdCBhIGZvcm0gKG9yXG4gKiBzb21lIGFyYml0cmFyeSBkYXRhKSB0byB0aGUgc2VydmVyLlxuICovXG5cbmZ1bmN0aW9uIHVzZVN1Ym1pdCgpIHtcbiAgcmV0dXJuIHVzZVN1Ym1pdEltcGwoKTtcbn1cblxuZnVuY3Rpb24gdXNlU3VibWl0SW1wbChmZXRjaGVyS2V5LCByb3V0ZUlkKSB7XG4gIGxldCB7XG4gICAgcm91dGVyXG4gIH0gPSB1c2VEYXRhUm91dGVyQ29udGV4dChEYXRhUm91dGVySG9vay5Vc2VTdWJtaXRJbXBsKTtcbiAgbGV0IGRlZmF1bHRBY3Rpb24gPSB1c2VGb3JtQWN0aW9uKCk7XG4gIHJldHVybiBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBhcmUgY2FsbGluZyBzdWJtaXQgZHVyaW5nIHRoZSBzZXJ2ZXIgcmVuZGVyLiBcIiArIFwiVHJ5IGNhbGxpbmcgc3VibWl0IHdpdGhpbiBhIGB1c2VFZmZlY3RgIG9yIGNhbGxiYWNrIGluc3RlYWQuXCIpO1xuICAgIH1cblxuICAgIGxldCB7XG4gICAgICBtZXRob2QsXG4gICAgICBlbmNUeXBlLFxuICAgICAgZm9ybURhdGEsXG4gICAgICB1cmxcbiAgICB9ID0gZ2V0Rm9ybVN1Ym1pc3Npb25JbmZvKHRhcmdldCwgZGVmYXVsdEFjdGlvbiwgb3B0aW9ucyk7XG4gICAgbGV0IGhyZWYgPSB1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoO1xuICAgIGxldCBvcHRzID0ge1xuICAgICAgcmVwbGFjZTogb3B0aW9ucy5yZXBsYWNlLFxuICAgICAgZm9ybURhdGEsXG4gICAgICBmb3JtTWV0aG9kOiBtZXRob2QsXG4gICAgICBmb3JtRW5jVHlwZTogZW5jVHlwZVxuICAgIH07XG5cbiAgICBpZiAoZmV0Y2hlcktleSkge1xuICAgICAgIShyb3V0ZUlkICE9IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIk5vIHJvdXRlSWQgYXZhaWxhYmxlIGZvciB1c2VGZXRjaGVyKClcIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgcm91dGVyLmZldGNoKGZldGNoZXJLZXksIHJvdXRlSWQsIGhyZWYsIG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZXIubmF2aWdhdGUoaHJlZiwgb3B0cyk7XG4gICAgfVxuICB9LCBbZGVmYXVsdEFjdGlvbiwgcm91dGVyLCBmZXRjaGVyS2V5LCByb3V0ZUlkXSk7XG59XG5cbmZ1bmN0aW9uIHVzZUZvcm1BY3Rpb24oYWN0aW9uLCBfdGVtcDIpIHtcbiAgbGV0IHtcbiAgICByZWxhdGl2ZVxuICB9ID0gX3RlbXAyID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wMjtcbiAgbGV0IHtcbiAgICBiYXNlbmFtZVxuICB9ID0gUmVhY3QudXNlQ29udGV4dChVTlNBRkVfTmF2aWdhdGlvbkNvbnRleHQpO1xuICBsZXQgcm91dGVDb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChVTlNBRkVfUm91dGVDb250ZXh0KTtcbiAgIXJvdXRlQ29udGV4dCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJ1c2VGb3JtQWN0aW9uIG11c3QgYmUgdXNlZCBpbnNpZGUgYSBSb3V0ZUNvbnRleHRcIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBsZXQgW21hdGNoXSA9IHJvdXRlQ29udGV4dC5tYXRjaGVzLnNsaWNlKC0xKTtcbiAgbGV0IHJlc29sdmVkQWN0aW9uID0gYWN0aW9uICE9IG51bGwgPyBhY3Rpb24gOiBcIi5cIjsgLy8gU2hhbGxvdyBjbG9uZSBwYXRoIHNvIHdlIGNhbiBtb2RpZnkgaXQgYmVsb3csIG90aGVyd2lzZSB3ZSBtb2RpZnkgdGhlXG4gIC8vIG9iamVjdCByZWZlcmVuY2VkIGJ5IHVzZU1lbW8gaW5zaWRlIHVzZVJlc29sdmVkUGF0aFxuXG4gIGxldCBwYXRoID0gX2V4dGVuZHMoe30sIHVzZVJlc29sdmVkUGF0aChyZXNvbHZlZEFjdGlvbiwge1xuICAgIHJlbGF0aXZlXG4gIH0pKTsgLy8gUHJldmlvdXNseSB3ZSBzZXQgdGhlIGRlZmF1bHQgYWN0aW9uIHRvIFwiLlwiLiBUaGUgcHJvYmxlbSB3aXRoIHRoaXMgaXMgdGhhdFxuICAvLyBgdXNlUmVzb2x2ZWRQYXRoKFwiLlwiKWAgZXhjbHVkZXMgc2VhcmNoIHBhcmFtcyBhbmQgdGhlIGhhc2ggb2YgdGhlIHJlc29sdmVkXG4gIC8vIFVSTC4gVGhpcyBpcyB0aGUgaW50ZW5kZWQgYmVoYXZpb3Igb2Ygd2hlbiBcIi5cIiBpcyBzcGVjaWZpY2FsbHkgcHJvdmlkZWQgYXNcbiAgLy8gdGhlIGZvcm0gYWN0aW9uLCBidXQgaW5jb25zaXN0ZW50IHcvIGJyb3dzZXJzIHdoZW4gdGhlIGFjdGlvbiBpcyBvbWl0dGVkLlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcmVtaXgtcnVuL3JlbWl4L2lzc3Vlcy85MjdcblxuXG4gIGxldCBsb2NhdGlvbiA9IHVzZUxvY2F0aW9uKCk7XG5cbiAgaWYgKGFjdGlvbiA9PSBudWxsKSB7XG4gICAgLy8gU2FmZSB0byB3cml0ZSB0byB0aGVzZSBkaXJlY3RseSBoZXJlIHNpbmNlIGlmIGFjdGlvbiB3YXMgdW5kZWZpbmVkLCB3ZVxuICAgIC8vIHdvdWxkIGhhdmUgY2FsbGVkIHVzZVJlc29sdmVkUGF0aChcIi5cIikgd2hpY2ggd2lsbCBuZXZlciBpbmNsdWRlIGEgc2VhcmNoXG4gICAgLy8gb3IgaGFzaFxuICAgIHBhdGguc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIHBhdGguaGFzaCA9IGxvY2F0aW9uLmhhc2g7IC8vIFdoZW4gZ3JhYmJpbmcgc2VhcmNoIHBhcmFtcyBmcm9tIHRoZSBVUkwsIHJlbW92ZSB0aGUgYXV0b21hdGljYWxseVxuICAgIC8vIGluc2VydGVkID9pbmRleCBwYXJhbSBzbyB3ZSBtYXRjaCB0aGUgdXNlUmVzb2x2ZWRQYXRoIHNlYXJjaCBiZWhhdmlvclxuICAgIC8vIHdoaWNoIHdvdWxkIG5vdCBpbmNsdWRlID9pbmRleFxuXG4gICAgaWYgKG1hdGNoLnJvdXRlLmluZGV4KSB7XG4gICAgICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXRoLnNlYXJjaCk7XG4gICAgICBwYXJhbXMuZGVsZXRlKFwiaW5kZXhcIik7XG4gICAgICBwYXRoLnNlYXJjaCA9IHBhcmFtcy50b1N0cmluZygpID8gXCI/XCIgKyBwYXJhbXMudG9TdHJpbmcoKSA6IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgaWYgKCghYWN0aW9uIHx8IGFjdGlvbiA9PT0gXCIuXCIpICYmIG1hdGNoLnJvdXRlLmluZGV4KSB7XG4gICAgcGF0aC5zZWFyY2ggPSBwYXRoLnNlYXJjaCA/IHBhdGguc2VhcmNoLnJlcGxhY2UoL15cXD8vLCBcIj9pbmRleCZcIikgOiBcIj9pbmRleFwiO1xuICB9IC8vIElmIHdlJ3JlIG9wZXJhdGluZyB3aXRoaW4gYSBiYXNlbmFtZSwgcHJlcGVuZCBpdCB0byB0aGUgcGF0aG5hbWUgcHJpb3JcbiAgLy8gdG8gY3JlYXRpbmcgdGhlIGZvcm0gYWN0aW9uLiAgSWYgdGhpcyBpcyBhIHJvb3QgbmF2aWdhdGlvbiwgdGhlbiBqdXN0IHVzZVxuICAvLyB0aGUgcmF3IGJhc2VuYW1lIHdoaWNoIGFsbG93cyB0aGUgYmFzZW5hbWUgdG8gaGF2ZSBmdWxsIGNvbnRyb2wgb3ZlciB0aGVcbiAgLy8gcHJlc2VuY2Ugb2YgYSB0cmFpbGluZyBzbGFzaCBvbiByb290IGFjdGlvbnNcblxuXG4gIGlmIChiYXNlbmFtZSAhPT0gXCIvXCIpIHtcbiAgICBwYXRoLnBhdGhuYW1lID0gcGF0aC5wYXRobmFtZSA9PT0gXCIvXCIgPyBiYXNlbmFtZSA6IGpvaW5QYXRocyhbYmFzZW5hbWUsIHBhdGgucGF0aG5hbWVdKTtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVQYXRoKHBhdGgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGZXRjaGVyRm9ybShmZXRjaGVyS2V5LCByb3V0ZUlkKSB7XG4gIGxldCBGZXRjaGVyRm9ybSA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1JbXBsLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICAgIHJlZjogcmVmLFxuICAgICAgZmV0Y2hlcktleTogZmV0Y2hlcktleSxcbiAgICAgIHJvdXRlSWQ6IHJvdXRlSWRcbiAgICB9KSk7XG4gIH0pO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBGZXRjaGVyRm9ybS5kaXNwbGF5TmFtZSA9IFwiZmV0Y2hlci5Gb3JtXCI7XG4gIH1cblxuICByZXR1cm4gRmV0Y2hlckZvcm07XG59XG5cbmxldCBmZXRjaGVySWQgPSAwO1xuLyoqXG4gKiBJbnRlcmFjdHMgd2l0aCByb3V0ZSBsb2FkZXJzIGFuZCBhY3Rpb25zIHdpdGhvdXQgY2F1c2luZyBhIG5hdmlnYXRpb24uIEdyZWF0XG4gKiBmb3IgYW55IGludGVyYWN0aW9uIHRoYXQgc3RheXMgb24gdGhlIHNhbWUgcGFnZS5cbiAqL1xuXG5mdW5jdGlvbiB1c2VGZXRjaGVyKCkge1xuICB2YXIgX3JvdXRlJG1hdGNoZXM7XG5cbiAgbGV0IHtcbiAgICByb3V0ZXJcbiAgfSA9IHVzZURhdGFSb3V0ZXJDb250ZXh0KERhdGFSb3V0ZXJIb29rLlVzZUZldGNoZXIpO1xuICBsZXQgcm91dGUgPSBSZWFjdC51c2VDb250ZXh0KFVOU0FGRV9Sb3V0ZUNvbnRleHQpO1xuICAhcm91dGUgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwidXNlRmV0Y2hlciBtdXN0IGJlIHVzZWQgaW5zaWRlIGEgUm91dGVDb250ZXh0XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgbGV0IHJvdXRlSWQgPSAoX3JvdXRlJG1hdGNoZXMgPSByb3V0ZS5tYXRjaGVzW3JvdXRlLm1hdGNoZXMubGVuZ3RoIC0gMV0pID09IG51bGwgPyB2b2lkIDAgOiBfcm91dGUkbWF0Y2hlcy5yb3V0ZS5pZDtcbiAgIShyb3V0ZUlkICE9IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcInVzZUZldGNoZXIgY2FuIG9ubHkgYmUgdXNlZCBvbiByb3V0ZXMgdGhhdCBjb250YWluIGEgdW5pcXVlIFxcXCJpZFxcXCJcIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBsZXQgW2ZldGNoZXJLZXldID0gUmVhY3QudXNlU3RhdGUoKCkgPT4gU3RyaW5nKCsrZmV0Y2hlcklkKSk7XG4gIGxldCBbRm9ybV0gPSBSZWFjdC51c2VTdGF0ZSgoKSA9PiB7XG4gICAgIXJvdXRlSWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiTm8gcm91dGVJZCBhdmFpbGFibGUgZm9yIGZldGNoZXIuRm9ybSgpXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICByZXR1cm4gY3JlYXRlRmV0Y2hlckZvcm0oZmV0Y2hlcktleSwgcm91dGVJZCk7XG4gIH0pO1xuICBsZXQgW2xvYWRdID0gUmVhY3QudXNlU3RhdGUoKCkgPT4gaHJlZiA9PiB7XG4gICAgIXJvdXRlciA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJObyByb3V0ZXIgYXZhaWxhYmxlIGZvciBmZXRjaGVyLmxvYWQoKVwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgIXJvdXRlSWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiTm8gcm91dGVJZCBhdmFpbGFibGUgZm9yIGZldGNoZXIubG9hZCgpXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICByb3V0ZXIuZmV0Y2goZmV0Y2hlcktleSwgcm91dGVJZCwgaHJlZik7XG4gIH0pO1xuICBsZXQgc3VibWl0ID0gdXNlU3VibWl0SW1wbChmZXRjaGVyS2V5LCByb3V0ZUlkKTtcbiAgbGV0IGZldGNoZXIgPSByb3V0ZXIuZ2V0RmV0Y2hlcihmZXRjaGVyS2V5KTtcbiAgbGV0IGZldGNoZXJXaXRoQ29tcG9uZW50cyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gX2V4dGVuZHMoe1xuICAgIEZvcm0sXG4gICAgc3VibWl0LFxuICAgIGxvYWRcbiAgfSwgZmV0Y2hlciksIFtmZXRjaGVyLCBGb3JtLCBzdWJtaXQsIGxvYWRdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBJcyB0aGlzIGJ1c3RlZCB3aGVuIHRoZSBSZWFjdCB0ZWFtIGdldHMgcmVhbCB3ZWlyZCBhbmQgY2FsbHMgZWZmZWN0c1xuICAgIC8vIHR3aWNlIG9uIG1vdW50PyAgV2UgcmVhbGx5IGp1c3QgbmVlZCB0byBnYXJiYWdlIGNvbGxlY3QgaGVyZSB3aGVuIHRoaXNcbiAgICAvLyBmZXRjaGVyIGlzIG5vIGxvbmdlciBhcm91bmQuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmICghcm91dGVyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk5vIGZldGNoZXIgYXZhaWxhYmxlIHRvIGNsZWFuIHVwIGZyb20gdXNlRmV0Y2hlcigpXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJvdXRlci5kZWxldGVGZXRjaGVyKGZldGNoZXJLZXkpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXIsIGZldGNoZXJLZXldKTtcbiAgcmV0dXJuIGZldGNoZXJXaXRoQ29tcG9uZW50cztcbn1cbi8qKlxuICogUHJvdmlkZXMgYWxsIGZldGNoZXJzIGN1cnJlbnRseSBvbiB0aGUgcGFnZS4gVXNlZnVsIGZvciBsYXlvdXRzIGFuZCBwYXJlbnRcbiAqIHJvdXRlcyB0aGF0IG5lZWQgdG8gcHJvdmlkZSBwZW5kaW5nL29wdGltaXN0aWMgVUkgcmVnYXJkaW5nIHRoZSBmZXRjaC5cbiAqL1xuXG5mdW5jdGlvbiB1c2VGZXRjaGVycygpIHtcbiAgbGV0IHN0YXRlID0gdXNlRGF0YVJvdXRlclN0YXRlKERhdGFSb3V0ZXJTdGF0ZUhvb2suVXNlRmV0Y2hlcnMpO1xuICByZXR1cm4gWy4uLnN0YXRlLmZldGNoZXJzLnZhbHVlcygpXTtcbn1cbmNvbnN0IFNDUk9MTF9SRVNUT1JBVElPTl9TVE9SQUdFX0tFWSA9IFwicmVhY3Qtcm91dGVyLXNjcm9sbC1wb3NpdGlvbnNcIjtcbmxldCBzYXZlZFNjcm9sbFBvc2l0aW9ucyA9IHt9O1xuLyoqXG4gKiBXaGVuIHJlbmRlcmVkIGluc2lkZSBhIFJvdXRlclByb3ZpZGVyLCB3aWxsIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9ucyBvbiBuYXZpZ2F0aW9uc1xuICovXG5cbmZ1bmN0aW9uIHVzZVNjcm9sbFJlc3RvcmF0aW9uKF90ZW1wMykge1xuICBsZXQge1xuICAgIGdldEtleSxcbiAgICBzdG9yYWdlS2V5XG4gIH0gPSBfdGVtcDMgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAzO1xuICBsZXQge1xuICAgIHJvdXRlclxuICB9ID0gdXNlRGF0YVJvdXRlckNvbnRleHQoRGF0YVJvdXRlckhvb2suVXNlU2Nyb2xsUmVzdG9yYXRpb24pO1xuICBsZXQge1xuICAgIHJlc3RvcmVTY3JvbGxQb3NpdGlvbixcbiAgICBwcmV2ZW50U2Nyb2xsUmVzZXRcbiAgfSA9IHVzZURhdGFSb3V0ZXJTdGF0ZShEYXRhUm91dGVyU3RhdGVIb29rLlVzZVNjcm9sbFJlc3RvcmF0aW9uKTtcbiAgbGV0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgbGV0IG1hdGNoZXMgPSB1c2VNYXRjaGVzKCk7XG4gIGxldCBuYXZpZ2F0aW9uID0gdXNlTmF2aWdhdGlvbigpOyAvLyBUcmlnZ2VyIG1hbnVhbCBzY3JvbGwgcmVzdG9yYXRpb24gd2hpbGUgd2UncmUgYWN0aXZlXG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IFwibWFudWFsXCI7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gXCJhdXRvXCI7XG4gICAgfTtcbiAgfSwgW10pOyAvLyBTYXZlIHBvc2l0aW9ucyBvbiB1bmxvYWRcblxuICB1c2VCZWZvcmVVbmxvYWQoUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChuYXZpZ2F0aW9uLnN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgbGV0IGtleSA9IChnZXRLZXkgPyBnZXRLZXkobG9jYXRpb24sIG1hdGNoZXMpIDogbnVsbCkgfHwgbG9jYXRpb24ua2V5O1xuICAgICAgc2F2ZWRTY3JvbGxQb3NpdGlvbnNba2V5XSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIH1cblxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSB8fCBTQ1JPTExfUkVTVE9SQVRJT05fU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHNhdmVkU2Nyb2xsUG9zaXRpb25zKSk7XG4gICAgd2luZG93Lmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcImF1dG9cIjtcbiAgfSwgW3N0b3JhZ2VLZXksIGdldEtleSwgbmF2aWdhdGlvbi5zdGF0ZSwgbG9jYXRpb24sIG1hdGNoZXNdKSk7IC8vIFJlYWQgaW4gYW55IHNhdmVkIHNjcm9sbCBsb2NhdGlvbnNcblxuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2Vzc2lvblBvc2l0aW9ucyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSB8fCBTQ1JPTExfUkVTVE9SQVRJT05fU1RPUkFHRV9LRVkpO1xuXG4gICAgICBpZiAoc2Vzc2lvblBvc2l0aW9ucykge1xuICAgICAgICBzYXZlZFNjcm9sbFBvc2l0aW9ucyA9IEpTT04ucGFyc2Uoc2Vzc2lvblBvc2l0aW9ucyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkgey8vIG5vLW9wLCB1c2UgZGVmYXVsdCBlbXB0eSBvYmplY3RcbiAgICB9XG4gIH0sIFtzdG9yYWdlS2V5XSk7IC8vIEVuYWJsZSBzY3JvbGwgcmVzdG9yYXRpb24gaW4gdGhlIHJvdXRlclxuXG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGRpc2FibGVTY3JvbGxSZXN0b3JhdGlvbiA9IHJvdXRlciA9PSBudWxsID8gdm9pZCAwIDogcm91dGVyLmVuYWJsZVNjcm9sbFJlc3RvcmF0aW9uKHNhdmVkU2Nyb2xsUG9zaXRpb25zLCAoKSA9PiB3aW5kb3cuc2Nyb2xsWSwgZ2V0S2V5KTtcbiAgICByZXR1cm4gKCkgPT4gZGlzYWJsZVNjcm9sbFJlc3RvcmF0aW9uICYmIGRpc2FibGVTY3JvbGxSZXN0b3JhdGlvbigpO1xuICB9LCBbcm91dGVyLCBnZXRLZXldKTsgLy8gUmVzdG9yZSBzY3JvbGxpbmcgd2hlbiBzdGF0ZS5yZXN0b3JlU2Nyb2xsUG9zaXRpb24gY2hhbmdlc1xuXG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgLy8gRXhwbGljaXQgZmFsc2UgbWVhbnMgZG9uJ3QgZG8gYW55dGhpbmcgKHVzZWQgZm9yIHN1Ym1pc3Npb25zKVxuICAgIGlmIChyZXN0b3JlU2Nyb2xsUG9zaXRpb24gPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBiZWVuIGhlcmUgYmVmb3JlLCBzY3JvbGwgdG8gaXRcblxuXG4gICAgaWYgKHR5cGVvZiByZXN0b3JlU2Nyb2xsUG9zaXRpb24gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCByZXN0b3JlU2Nyb2xsUG9zaXRpb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gdHJ5IHRvIHNjcm9sbCB0byB0aGUgaGFzaFxuXG5cbiAgICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgICAgbGV0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9jYXRpb24uaGFzaC5zbGljZSgxKSk7XG5cbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSAvLyBPcHQgb3V0IG9mIHNjcm9sbCByZXNldCBpZiB0aGlzIGxpbmsgcmVxdWVzdGVkIGl0XG5cblxuICAgIGlmIChwcmV2ZW50U2Nyb2xsUmVzZXQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIG90aGVyd2lzZSBnbyB0byB0aGUgdG9wIG9uIG5ldyBsb2NhdGlvbnNcblxuXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICB9LCBbbG9jYXRpb24sIHJlc3RvcmVTY3JvbGxQb3NpdGlvbiwgcHJldmVudFNjcm9sbFJlc2V0XSk7XG59XG5cbmZ1bmN0aW9uIHVzZUJlZm9yZVVubG9hZChjYWxsYmFjaykge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgY2FsbGJhY2spO1xuICAgIH07XG4gIH0sIFtjYWxsYmFja10pO1xufSAvLyNlbmRyZWdpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyNyZWdpb24gVXRpbHNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuZnVuY3Rpb24gd2FybmluZyhjb25kLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSBjb25zb2xlLndhcm4obWVzc2FnZSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgUm91dGVyIVxuICAgICAgLy9cbiAgICAgIC8vIFRoaXMgZXJyb3IgaXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28geW91IGNhbiBtb3JlIGVhc2lseVxuICAgICAgLy8gZmluZCB0aGUgc291cmNlIGZvciBhIHdhcm5pbmcgdGhhdCBhcHBlYXJzIGluIHRoZSBjb25zb2xlIGJ5XG4gICAgICAvLyBlbmFibGluZyBcInBhdXNlIG9uIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIEphdmFTY3JpcHQgZGVidWdnZXIuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbn0gLy8jZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEJyb3dzZXJSb3V0ZXIsIEZvcm0sIEhhc2hSb3V0ZXIsIExpbmssIE5hdkxpbmssIFNjcm9sbFJlc3RvcmF0aW9uLCBjcmVhdGVCcm93c2VyUm91dGVyLCBjcmVhdGVIYXNoUm91dGVyLCBjcmVhdGVTZWFyY2hQYXJhbXMsIEhpc3RvcnlSb3V0ZXIgYXMgdW5zdGFibGVfSGlzdG9yeVJvdXRlciwgdXNlRmV0Y2hlciwgdXNlRmV0Y2hlcnMsIHVzZUZvcm1BY3Rpb24sIHVzZUxpbmtDbGlja0hhbmRsZXIsIHVzZVNlYXJjaFBhcmFtcywgdXNlU3VibWl0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIi8qKlxuICogUmVhY3QgUm91dGVyIHY2LjQuNFxuICpcbiAqIENvcHlyaWdodCAoYykgUmVtaXggU29mdHdhcmUgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS5tZCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5pbXBvcnQgeyBpbnZhcmlhbnQsIGpvaW5QYXRocywgbWF0Y2hQYXRoLCBVTlNBRkVfZ2V0UGF0aENvbnRyaWJ1dGluZ01hdGNoZXMsIHdhcm5pbmcsIHJlc29sdmVUbywgcGFyc2VQYXRoLCBtYXRjaFJvdXRlcywgQWN0aW9uLCBpc1JvdXRlRXJyb3JSZXNwb25zZSwgY3JlYXRlTWVtb3J5SGlzdG9yeSwgc3RyaXBCYXNlbmFtZSwgQWJvcnRlZERlZmVycmVkRXJyb3IsIGNyZWF0ZVJvdXRlciB9IGZyb20gJ0ByZW1peC1ydW4vcm91dGVyJztcbmV4cG9ydCB7IEFib3J0ZWREZWZlcnJlZEVycm9yLCBBY3Rpb24gYXMgTmF2aWdhdGlvblR5cGUsIGNyZWF0ZVBhdGgsIGRlZmVyLCBnZW5lcmF0ZVBhdGgsIGlzUm91dGVFcnJvclJlc3BvbnNlLCBqc29uLCBtYXRjaFBhdGgsIG1hdGNoUm91dGVzLCBwYXJzZVBhdGgsIHJlZGlyZWN0LCByZXNvbHZlUGF0aCB9IGZyb20gJ0ByZW1peC1ydW4vcm91dGVyJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5cbmZ1bmN0aW9uIGlzUG9seWZpbGwoeCwgeSkge1xuICByZXR1cm4geCA9PT0geSAmJiAoeCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHkpIHx8IHggIT09IHggJiYgeSAhPT0geSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxuICA7XG59XG5cbmNvbnN0IGlzID0gdHlwZW9mIE9iamVjdC5pcyA9PT0gXCJmdW5jdGlvblwiID8gT2JqZWN0LmlzIDogaXNQb2x5ZmlsbDsgLy8gSW50ZW50aW9uYWxseSBub3QgdXNpbmcgbmFtZWQgaW1wb3J0cyBiZWNhdXNlIFJvbGx1cCB1c2VzIGR5bmFtaWNcbi8vIGRpc3BhdGNoIGZvciBDb21tb25KUyBpbnRlcm9wIG5hbWVkIGltcG9ydHMuXG5cbmNvbnN0IHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgdXNlTGF5b3V0RWZmZWN0LFxuICB1c2VEZWJ1Z1ZhbHVlXG59ID0gUmVhY3Q7XG5sZXQgZGlkV2Fybk9sZDE4QWxwaGEgPSBmYWxzZTtcbmxldCBkaWRXYXJuVW5jYWNoZWRHZXRTbmFwc2hvdCA9IGZhbHNlOyAvLyBEaXNjbGFpbWVyOiBUaGlzIHNoaW0gYnJlYWtzIG1hbnkgb2YgdGhlIHJ1bGVzIG9mIFJlYWN0LCBhbmQgb25seSB3b3Jrc1xuLy8gYmVjYXVzZSBvZiBhIHZlcnkgcGFydGljdWxhciBzZXQgb2YgaW1wbGVtZW50YXRpb24gZGV0YWlscyBhbmQgYXNzdW1wdGlvbnNcbi8vIC0tIGNoYW5nZSBhbnkgb25lIG9mIHRoZW0gYW5kIGl0IHdpbGwgYnJlYWsuIFRoZSBtb3N0IGltcG9ydGFudCBhc3N1bXB0aW9uXG4vLyBpcyB0aGF0IHVwZGF0ZXMgYXJlIGFsd2F5cyBzeW5jaHJvbm91cywgYmVjYXVzZSBjb25jdXJyZW50IHJlbmRlcmluZyBpc1xuLy8gb25seSBhdmFpbGFibGUgaW4gdmVyc2lvbnMgb2YgUmVhY3QgdGhhdCBhbHNvIGhhdmUgYSBidWlsdC1pblxuLy8gdXNlU3luY0V4dGVybmFsU3RvcmUgQVBJLiBBbmQgd2Ugb25seSB1c2UgdGhpcyBzaGltIHdoZW4gdGhlIGJ1aWx0LWluIEFQSVxuLy8gZG9lcyBub3QgZXhpc3QuXG4vL1xuLy8gRG8gbm90IGFzc3VtZSB0aGF0IHRoZSBjbGV2ZXIgaGFja3MgdXNlZCBieSB0aGlzIGhvb2sgYWxzbyB3b3JrIGluIGdlbmVyYWwuXG4vLyBUaGUgcG9pbnQgb2YgdGhpcyBzaGltIGlzIHRvIHJlcGxhY2UgdGhlIG5lZWQgZm9yIGhhY2tzIGJ5IG90aGVyIGxpYnJhcmllcy5cblxuZnVuY3Rpb24gdXNlU3luY0V4dGVybmFsU3RvcmUkMihzdWJzY3JpYmUsIGdldFNuYXBzaG90LCAvLyBOb3RlOiBUaGUgc2hpbSBkb2VzIG5vdCB1c2UgZ2V0U2VydmVyU25hcHNob3QsIGJlY2F1c2UgcHJlLTE4IHZlcnNpb25zIG9mXG4vLyBSZWFjdCBkbyBub3QgZXhwb3NlIGEgd2F5IHRvIGNoZWNrIGlmIHdlJ3JlIGh5ZHJhdGluZy4gU28gdXNlcnMgb2YgdGhlIHNoaW1cbi8vIHdpbGwgbmVlZCB0byB0cmFjayB0aGF0IHRoZW1zZWx2ZXMgYW5kIHJldHVybiB0aGUgY29ycmVjdCB2YWx1ZVxuLy8gZnJvbSBgZ2V0U25hcHNob3RgLlxuZ2V0U2VydmVyU25hcHNob3QpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghZGlkV2Fybk9sZDE4QWxwaGEpIHtcbiAgICAgIGlmIChcInN0YXJ0VHJhbnNpdGlvblwiIGluIFJlYWN0KSB7XG4gICAgICAgIGRpZFdhcm5PbGQxOEFscGhhID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIllvdSBhcmUgdXNpbmcgYW4gb3V0ZGF0ZWQsIHByZS1yZWxlYXNlIGFscGhhIG9mIFJlYWN0IDE4IHRoYXQgXCIgKyBcImRvZXMgbm90IHN1cHBvcnQgdXNlU3luY0V4dGVybmFsU3RvcmUuIFRoZSBcIiArIFwidXNlLXN5bmMtZXh0ZXJuYWwtc3RvcmUgc2hpbSB3aWxsIG5vdCB3b3JrIGNvcnJlY3RseS4gVXBncmFkZSBcIiArIFwidG8gYSBuZXdlciBwcmUtcmVsZWFzZS5cIik7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFJlYWQgdGhlIGN1cnJlbnQgc25hcHNob3QgZnJvbSB0aGUgc3RvcmUgb24gZXZlcnkgcmVuZGVyLiBBZ2FpbiwgdGhpc1xuICAvLyBicmVha3MgdGhlIHJ1bGVzIG9mIFJlYWN0LCBhbmQgb25seSB3b3JrcyBoZXJlIGJlY2F1c2Ugb2Ygc3BlY2lmaWNcbiAgLy8gaW1wbGVtZW50YXRpb24gZGV0YWlscywgbW9zdCBpbXBvcnRhbnRseSB0aGF0IHVwZGF0ZXMgYXJlXG4gIC8vIGFsd2F5cyBzeW5jaHJvbm91cy5cblxuXG4gIGNvbnN0IHZhbHVlID0gZ2V0U25hcHNob3QoKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFkaWRXYXJuVW5jYWNoZWRHZXRTbmFwc2hvdCkge1xuICAgICAgY29uc3QgY2FjaGVkVmFsdWUgPSBnZXRTbmFwc2hvdCgpO1xuXG4gICAgICBpZiAoIWlzKHZhbHVlLCBjYWNoZWRWYWx1ZSkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSByZXN1bHQgb2YgZ2V0U25hcHNob3Qgc2hvdWxkIGJlIGNhY2hlZCB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wXCIpO1xuICAgICAgICBkaWRXYXJuVW5jYWNoZWRHZXRTbmFwc2hvdCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIEJlY2F1c2UgdXBkYXRlcyBhcmUgc3luY2hyb25vdXMsIHdlIGRvbid0IHF1ZXVlIHRoZW0uIEluc3RlYWQgd2UgZm9yY2UgYVxuICAvLyByZS1yZW5kZXIgd2hlbmV2ZXIgdGhlIHN1YnNjcmliZWQgc3RhdGUgY2hhbmdlcyBieSB1cGRhdGluZyBhbiBzb21lXG4gIC8vIGFyYml0cmFyeSB1c2VTdGF0ZSBob29rLiBUaGVuLCBkdXJpbmcgcmVuZGVyLCB3ZSBjYWxsIGdldFNuYXBzaG90IHRvIHJlYWRcbiAgLy8gdGhlIGN1cnJlbnQgdmFsdWUuXG4gIC8vXG4gIC8vIEJlY2F1c2Ugd2UgZG9uJ3QgYWN0dWFsbHkgdXNlIHRoZSBzdGF0ZSByZXR1cm5lZCBieSB0aGUgdXNlU3RhdGUgaG9vaywgd2VcbiAgLy8gY2FuIHNhdmUgYSBiaXQgb2YgbWVtb3J5IGJ5IHN0b3Jpbmcgb3RoZXIgc3R1ZmYgaW4gdGhhdCBzbG90LlxuICAvL1xuICAvLyBUbyBpbXBsZW1lbnQgdGhlIGVhcmx5IGJhaWxvdXQsIHdlIG5lZWQgdG8gdHJhY2sgc29tZSB0aGluZ3Mgb24gYSBtdXRhYmxlXG4gIC8vIG9iamVjdC4gVXN1YWxseSwgd2Ugd291bGQgcHV0IHRoYXQgaW4gYSB1c2VSZWYgaG9vaywgYnV0IHdlIGNhbiBzdGFzaCBpdCBpblxuICAvLyBvdXIgdXNlU3RhdGUgaG9vayBpbnN0ZWFkLlxuICAvL1xuICAvLyBUbyBmb3JjZSBhIHJlLXJlbmRlciwgd2UgY2FsbCBmb3JjZVVwZGF0ZSh7aW5zdH0pLiBUaGF0IHdvcmtzIGJlY2F1c2UgdGhlXG4gIC8vIG5ldyBvYmplY3QgYWx3YXlzIGZhaWxzIGFuIGVxdWFsaXR5IGNoZWNrLlxuXG5cbiAgY29uc3QgW3tcbiAgICBpbnN0XG4gIH0sIGZvcmNlVXBkYXRlXSA9IHVzZVN0YXRlKHtcbiAgICBpbnN0OiB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGdldFNuYXBzaG90XG4gICAgfVxuICB9KTsgLy8gVHJhY2sgdGhlIGxhdGVzdCBnZXRTbmFwc2hvdCBmdW5jdGlvbiB3aXRoIGEgcmVmLiBUaGlzIG5lZWRzIHRvIGJlIHVwZGF0ZWRcbiAgLy8gaW4gdGhlIGxheW91dCBwaGFzZSBzbyB3ZSBjYW4gYWNjZXNzIGl0IGR1cmluZyB0aGUgdGVhcmluZyBjaGVjayB0aGF0XG4gIC8vIGhhcHBlbnMgb24gc3Vic2NyaWJlLlxuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaW5zdC52YWx1ZSA9IHZhbHVlO1xuICAgIGluc3QuZ2V0U25hcHNob3QgPSBnZXRTbmFwc2hvdDsgLy8gV2hlbmV2ZXIgZ2V0U25hcHNob3Qgb3Igc3Vic2NyaWJlIGNoYW5nZXMsIHdlIG5lZWQgdG8gY2hlY2sgaW4gdGhlXG4gICAgLy8gY29tbWl0IHBoYXNlIGlmIHRoZXJlIHdhcyBhbiBpbnRlcmxlYXZlZCBtdXRhdGlvbi4gSW4gY29uY3VycmVudCBtb2RlXG4gICAgLy8gdGhpcyBjYW4gaGFwcGVuIGFsbCB0aGUgdGltZSwgYnV0IGV2ZW4gaW4gc3luY2hyb25vdXMgbW9kZSwgYW4gZWFybGllclxuICAgIC8vIGVmZmVjdCBtYXkgaGF2ZSBtdXRhdGVkIHRoZSBzdG9yZS5cblxuICAgIGlmIChjaGVja0lmU25hcHNob3RDaGFuZ2VkKGluc3QpKSB7XG4gICAgICAvLyBGb3JjZSBhIHJlLXJlbmRlci5cbiAgICAgIGZvcmNlVXBkYXRlKHtcbiAgICAgICAgaW5zdFxuICAgICAgfSk7XG4gICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG5cbiAgfSwgW3N1YnNjcmliZSwgdmFsdWUsIGdldFNuYXBzaG90XSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gQ2hlY2sgZm9yIGNoYW5nZXMgcmlnaHQgYmVmb3JlIHN1YnNjcmliaW5nLiBTdWJzZXF1ZW50IGNoYW5nZXMgd2lsbCBiZVxuICAgIC8vIGRldGVjdGVkIGluIHRoZSBzdWJzY3JpcHRpb24gaGFuZGxlci5cbiAgICBpZiAoY2hlY2tJZlNuYXBzaG90Q2hhbmdlZChpbnN0KSkge1xuICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuXG4gICAgICBmb3JjZVVwZGF0ZSh7XG4gICAgICAgIGluc3RcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVN0b3JlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgLy8gVE9ETzogQmVjYXVzZSB0aGVyZSBpcyBubyBjcm9zcy1yZW5kZXJlciBBUEkgZm9yIGJhdGNoaW5nIHVwZGF0ZXMsIGl0J3NcbiAgICAgIC8vIHVwIHRvIHRoZSBjb25zdW1lciBvZiB0aGlzIGxpYnJhcnkgdG8gd3JhcCB0aGVpciBzdWJzY3JpcHRpb24gZXZlbnRcbiAgICAgIC8vIHdpdGggdW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMuIFNob3VsZCB3ZSB0cnkgdG8gZGV0ZWN0IHdoZW4gdGhpcyBpc24ndFxuICAgICAgLy8gdGhlIGNhc2UgYW5kIHByaW50IGEgd2FybmluZyBpbiBkZXZlbG9wbWVudD9cbiAgICAgIC8vIFRoZSBzdG9yZSBjaGFuZ2VkLiBDaGVjayBpZiB0aGUgc25hcHNob3QgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHdlXG4gICAgICAvLyByZWFkIGZyb20gdGhlIHN0b3JlLlxuICAgICAgaWYgKGNoZWNrSWZTbmFwc2hvdENoYW5nZWQoaW5zdCkpIHtcbiAgICAgICAgLy8gRm9yY2UgYSByZS1yZW5kZXIuXG4gICAgICAgIGZvcmNlVXBkYXRlKHtcbiAgICAgICAgICBpbnN0XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07IC8vIFN1YnNjcmliZSB0byB0aGUgc3RvcmUgYW5kIHJldHVybiBhIGNsZWFuLXVwIGZ1bmN0aW9uLlxuXG5cbiAgICByZXR1cm4gc3Vic2NyaWJlKGhhbmRsZVN0b3JlQ2hhbmdlKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbc3Vic2NyaWJlXSk7XG4gIHVzZURlYnVnVmFsdWUodmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSWZTbmFwc2hvdENoYW5nZWQoaW5zdCkge1xuICBjb25zdCBsYXRlc3RHZXRTbmFwc2hvdCA9IGluc3QuZ2V0U25hcHNob3Q7XG4gIGNvbnN0IHByZXZWYWx1ZSA9IGluc3QudmFsdWU7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBsYXRlc3RHZXRTbmFwc2hvdCgpO1xuICAgIHJldHVybiAhaXMocHJldlZhbHVlLCBuZXh0VmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuZnVuY3Rpb24gdXNlU3luY0V4dGVybmFsU3RvcmUkMShzdWJzY3JpYmUsIGdldFNuYXBzaG90LCBnZXRTZXJ2ZXJTbmFwc2hvdCkge1xuICAvLyBOb3RlOiBUaGUgc2hpbSBkb2VzIG5vdCB1c2UgZ2V0U2VydmVyU25hcHNob3QsIGJlY2F1c2UgcHJlLTE4IHZlcnNpb25zIG9mXG4gIC8vIFJlYWN0IGRvIG5vdCBleHBvc2UgYSB3YXkgdG8gY2hlY2sgaWYgd2UncmUgaHlkcmF0aW5nLiBTbyB1c2VycyBvZiB0aGUgc2hpbVxuICAvLyB3aWxsIG5lZWQgdG8gdHJhY2sgdGhhdCB0aGVtc2VsdmVzIGFuZCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWVcbiAgLy8gZnJvbSBgZ2V0U25hcHNob3RgLlxuICByZXR1cm4gZ2V0U25hcHNob3QoKTtcbn1cblxuLyoqXG4gKiBJbmxpbmVkIGludG8gdGhlIHJlYWN0LXJvdXRlciByZXBvIHNpbmNlIHVzZS1zeW5jLWV4dGVybmFsLXN0b3JlIGRvZXMgbm90XG4gKiBwcm92aWRlIGEgVU1ELWNvbXBhdGlibGUgcGFja2FnZSwgc28gd2UgbmVlZCB0aGlzIHRvIGJlIGFibGUgdG8gZGlzdHJpYnV0ZVxuICogVU1EIHJlYWN0LXJvdXRlciBidW5kbGVzXG4gKi9cbmNvbnN0IGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpO1xuY29uc3QgaXNTZXJ2ZXJFbnZpcm9ubWVudCA9ICFjYW5Vc2VET007XG5jb25zdCBzaGltID0gaXNTZXJ2ZXJFbnZpcm9ubWVudCA/IHVzZVN5bmNFeHRlcm5hbFN0b3JlJDEgOiB1c2VTeW5jRXh0ZXJuYWxTdG9yZSQyO1xuY29uc3QgdXNlU3luY0V4dGVybmFsU3RvcmUgPSBcInVzZVN5bmNFeHRlcm5hbFN0b3JlXCIgaW4gUmVhY3QgPyAobW9kdWxlID0+IG1vZHVsZS51c2VTeW5jRXh0ZXJuYWxTdG9yZSkoUmVhY3QpIDogc2hpbTtcblxuLy8gQ29udGV4dHMgZm9yIGRhdGEgcm91dGVyc1xuY29uc3QgRGF0YVN0YXRpY1JvdXRlckNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBEYXRhU3RhdGljUm91dGVyQ29udGV4dC5kaXNwbGF5TmFtZSA9IFwiRGF0YVN0YXRpY1JvdXRlckNvbnRleHRcIjtcbn1cblxuY29uc3QgRGF0YVJvdXRlckNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBEYXRhUm91dGVyQ29udGV4dC5kaXNwbGF5TmFtZSA9IFwiRGF0YVJvdXRlclwiO1xufVxuXG5jb25zdCBEYXRhUm91dGVyU3RhdGVDb250ZXh0ID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgRGF0YVJvdXRlclN0YXRlQ29udGV4dC5kaXNwbGF5TmFtZSA9IFwiRGF0YVJvdXRlclN0YXRlXCI7XG59XG5cbmNvbnN0IEF3YWl0Q29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEF3YWl0Q29udGV4dC5kaXNwbGF5TmFtZSA9IFwiQXdhaXRcIjtcbn1cblxuY29uc3QgTmF2aWdhdGlvbkNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBOYXZpZ2F0aW9uQ29udGV4dC5kaXNwbGF5TmFtZSA9IFwiTmF2aWdhdGlvblwiO1xufVxuXG5jb25zdCBMb2NhdGlvbkNvbnRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlQ29udGV4dChudWxsKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBMb2NhdGlvbkNvbnRleHQuZGlzcGxheU5hbWUgPSBcIkxvY2F0aW9uXCI7XG59XG5cbmNvbnN0IFJvdXRlQ29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KHtcbiAgb3V0bGV0OiBudWxsLFxuICBtYXRjaGVzOiBbXVxufSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUm91dGVDb250ZXh0LmRpc3BsYXlOYW1lID0gXCJSb3V0ZVwiO1xufVxuXG5jb25zdCBSb3V0ZUVycm9yQ29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFJvdXRlRXJyb3JDb250ZXh0LmRpc3BsYXlOYW1lID0gXCJSb3V0ZUVycm9yXCI7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZnVsbCBocmVmIGZvciB0aGUgZ2l2ZW4gXCJ0b1wiIHZhbHVlLiBUaGlzIGlzIHVzZWZ1bCBmb3IgYnVpbGRpbmdcbiAqIGN1c3RvbSBsaW5rcyB0aGF0IGFyZSBhbHNvIGFjY2Vzc2libGUgYW5kIHByZXNlcnZlIHJpZ2h0LWNsaWNrIGJlaGF2aW9yLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9ob29rcy91c2UtaHJlZlxuICovXG5cbmZ1bmN0aW9uIHVzZUhyZWYodG8sIF90ZW1wKSB7XG4gIGxldCB7XG4gICAgcmVsYXRpdmVcbiAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICAhdXNlSW5Sb3V0ZXJDb250ZXh0KCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIC8vIFRPRE86IFRoaXMgZXJyb3IgaXMgcHJvYmFibHkgYmVjYXVzZSB0aGV5IHNvbWVob3cgaGF2ZSAyIHZlcnNpb25zIG9mIHRoZVxuICAvLyByb3V0ZXIgbG9hZGVkLiBXZSBjYW4gaGVscCB0aGVtIHVuZGVyc3RhbmQgaG93IHRvIGF2b2lkIHRoYXQuXG4gIFwidXNlSHJlZigpIG1heSBiZSB1c2VkIG9ubHkgaW4gdGhlIGNvbnRleHQgb2YgYSA8Um91dGVyPiBjb21wb25lbnQuXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgbGV0IHtcbiAgICBiYXNlbmFtZSxcbiAgICBuYXZpZ2F0b3JcbiAgfSA9IFJlYWN0LnVzZUNvbnRleHQoTmF2aWdhdGlvbkNvbnRleHQpO1xuICBsZXQge1xuICAgIGhhc2gsXG4gICAgcGF0aG5hbWUsXG4gICAgc2VhcmNoXG4gIH0gPSB1c2VSZXNvbHZlZFBhdGgodG8sIHtcbiAgICByZWxhdGl2ZVxuICB9KTtcbiAgbGV0IGpvaW5lZFBhdGhuYW1lID0gcGF0aG5hbWU7IC8vIElmIHdlJ3JlIG9wZXJhdGluZyB3aXRoaW4gYSBiYXNlbmFtZSwgcHJlcGVuZCBpdCB0byB0aGUgcGF0aG5hbWUgcHJpb3JcbiAgLy8gdG8gY3JlYXRpbmcgdGhlIGhyZWYuICBJZiB0aGlzIGlzIGEgcm9vdCBuYXZpZ2F0aW9uLCB0aGVuIGp1c3QgdXNlIHRoZSByYXdcbiAgLy8gYmFzZW5hbWUgd2hpY2ggYWxsb3dzIHRoZSBiYXNlbmFtZSB0byBoYXZlIGZ1bGwgY29udHJvbCBvdmVyIHRoZSBwcmVzZW5jZVxuICAvLyBvZiBhIHRyYWlsaW5nIHNsYXNoIG9uIHJvb3QgbGlua3NcblxuICBpZiAoYmFzZW5hbWUgIT09IFwiL1wiKSB7XG4gICAgam9pbmVkUGF0aG5hbWUgPSBwYXRobmFtZSA9PT0gXCIvXCIgPyBiYXNlbmFtZSA6IGpvaW5QYXRocyhbYmFzZW5hbWUsIHBhdGhuYW1lXSk7XG4gIH1cblxuICByZXR1cm4gbmF2aWdhdG9yLmNyZWF0ZUhyZWYoe1xuICAgIHBhdGhuYW1lOiBqb2luZWRQYXRobmFtZSxcbiAgICBzZWFyY2gsXG4gICAgaGFzaFxuICB9KTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgZGVzY2VuZGFudCBvZiBhIDxSb3V0ZXI+LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9ob29rcy91c2UtaW4tcm91dGVyLWNvbnRleHRcbiAqL1xuXG5mdW5jdGlvbiB1c2VJblJvdXRlckNvbnRleHQoKSB7XG4gIHJldHVybiBSZWFjdC51c2VDb250ZXh0KExvY2F0aW9uQ29udGV4dCkgIT0gbnVsbDtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBsb2NhdGlvbiBvYmplY3QsIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgVVJMIGluIHdlYlxuICogYnJvd3NlcnMuXG4gKlxuICogTm90ZTogSWYgeW91J3JlIHVzaW5nIHRoaXMgaXQgbWF5IG1lYW4geW91J3JlIGRvaW5nIHNvbWUgb2YgeW91ciBvd25cbiAqIFwicm91dGluZ1wiIGluIHlvdXIgYXBwLCBhbmQgd2UnZCBsaWtlIHRvIGtub3cgd2hhdCB5b3VyIHVzZSBjYXNlIGlzLiBXZSBtYXlcbiAqIGJlIGFibGUgdG8gcHJvdmlkZSBzb21ldGhpbmcgaGlnaGVyLWxldmVsIHRvIGJldHRlciBzdWl0IHlvdXIgbmVlZHMuXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1sb2NhdGlvblxuICovXG5cbmZ1bmN0aW9uIHVzZUxvY2F0aW9uKCkge1xuICAhdXNlSW5Sb3V0ZXJDb250ZXh0KCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIC8vIFRPRE86IFRoaXMgZXJyb3IgaXMgcHJvYmFibHkgYmVjYXVzZSB0aGV5IHNvbWVob3cgaGF2ZSAyIHZlcnNpb25zIG9mIHRoZVxuICAvLyByb3V0ZXIgbG9hZGVkLiBXZSBjYW4gaGVscCB0aGVtIHVuZGVyc3RhbmQgaG93IHRvIGF2b2lkIHRoYXQuXG4gIFwidXNlTG9jYXRpb24oKSBtYXkgYmUgdXNlZCBvbmx5IGluIHRoZSBjb250ZXh0IG9mIGEgPFJvdXRlcj4gY29tcG9uZW50LlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHJldHVybiBSZWFjdC51c2VDb250ZXh0KExvY2F0aW9uQ29udGV4dCkubG9jYXRpb247XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgbmF2aWdhdGlvbiBhY3Rpb24gd2hpY2ggZGVzY3JpYmVzIGhvdyB0aGUgcm91dGVyIGNhbWUgdG9cbiAqIHRoZSBjdXJyZW50IGxvY2F0aW9uLCBlaXRoZXIgYnkgYSBwb3AsIHB1c2gsIG9yIHJlcGxhY2Ugb24gdGhlIGhpc3Rvcnkgc3RhY2suXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1uYXZpZ2F0aW9uLXR5cGVcbiAqL1xuXG5mdW5jdGlvbiB1c2VOYXZpZ2F0aW9uVHlwZSgpIHtcbiAgcmV0dXJuIFJlYWN0LnVzZUNvbnRleHQoTG9jYXRpb25Db250ZXh0KS5uYXZpZ2F0aW9uVHlwZTtcbn1cbi8qKlxuICogUmV0dXJucyBhIFBhdGhNYXRjaCBvYmplY3QgaWYgdGhlIGdpdmVuIHBhdHRlcm4gbWF0Y2hlcyB0aGUgY3VycmVudCBVUkwuXG4gKiBUaGlzIGlzIHVzZWZ1bCBmb3IgY29tcG9uZW50cyB0aGF0IG5lZWQgdG8ga25vdyBcImFjdGl2ZVwiIHN0YXRlLCBlLmcuXG4gKiA8TmF2TGluaz4uXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1tYXRjaFxuICovXG5cbmZ1bmN0aW9uIHVzZU1hdGNoKHBhdHRlcm4pIHtcbiAgIXVzZUluUm91dGVyQ29udGV4dCgpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAvLyBUT0RPOiBUaGlzIGVycm9yIGlzIHByb2JhYmx5IGJlY2F1c2UgdGhleSBzb21laG93IGhhdmUgMiB2ZXJzaW9ucyBvZiB0aGVcbiAgLy8gcm91dGVyIGxvYWRlZC4gV2UgY2FuIGhlbHAgdGhlbSB1bmRlcnN0YW5kIGhvdyB0byBhdm9pZCB0aGF0LlxuICBcInVzZU1hdGNoKCkgbWF5IGJlIHVzZWQgb25seSBpbiB0aGUgY29udGV4dCBvZiBhIDxSb3V0ZXI+IGNvbXBvbmVudC5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBsZXQge1xuICAgIHBhdGhuYW1lXG4gIH0gPSB1c2VMb2NhdGlvbigpO1xuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiBtYXRjaFBhdGgocGF0dGVybiwgcGF0aG5hbWUpLCBbcGF0aG5hbWUsIHBhdHRlcm5dKTtcbn1cbi8qKlxuICogVGhlIGludGVyZmFjZSBmb3IgdGhlIG5hdmlnYXRlKCkgZnVuY3Rpb24gcmV0dXJuZWQgZnJvbSB1c2VOYXZpZ2F0ZSgpLlxuICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBpbXBlcmF0aXZlIG1ldGhvZCBmb3IgY2hhbmdpbmcgdGhlIGxvY2F0aW9uLiBVc2VkIGJ5IDxMaW5rPnMsIGJ1dFxuICogbWF5IGFsc28gYmUgdXNlZCBieSBvdGhlciBlbGVtZW50cyB0byBjaGFuZ2UgdGhlIGxvY2F0aW9uLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9ob29rcy91c2UtbmF2aWdhdGVcbiAqL1xuZnVuY3Rpb24gdXNlTmF2aWdhdGUoKSB7XG4gICF1c2VJblJvdXRlckNvbnRleHQoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgLy8gVE9ETzogVGhpcyBlcnJvciBpcyBwcm9iYWJseSBiZWNhdXNlIHRoZXkgc29tZWhvdyBoYXZlIDIgdmVyc2lvbnMgb2YgdGhlXG4gIC8vIHJvdXRlciBsb2FkZWQuIFdlIGNhbiBoZWxwIHRoZW0gdW5kZXJzdGFuZCBob3cgdG8gYXZvaWQgdGhhdC5cbiAgXCJ1c2VOYXZpZ2F0ZSgpIG1heSBiZSB1c2VkIG9ubHkgaW4gdGhlIGNvbnRleHQgb2YgYSA8Um91dGVyPiBjb21wb25lbnQuXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgbGV0IHtcbiAgICBiYXNlbmFtZSxcbiAgICBuYXZpZ2F0b3JcbiAgfSA9IFJlYWN0LnVzZUNvbnRleHQoTmF2aWdhdGlvbkNvbnRleHQpO1xuICBsZXQge1xuICAgIG1hdGNoZXNcbiAgfSA9IFJlYWN0LnVzZUNvbnRleHQoUm91dGVDb250ZXh0KTtcbiAgbGV0IHtcbiAgICBwYXRobmFtZTogbG9jYXRpb25QYXRobmFtZVxuICB9ID0gdXNlTG9jYXRpb24oKTtcbiAgbGV0IHJvdXRlUGF0aG5hbWVzSnNvbiA9IEpTT04uc3RyaW5naWZ5KFVOU0FGRV9nZXRQYXRoQ29udHJpYnV0aW5nTWF0Y2hlcyhtYXRjaGVzKS5tYXAobWF0Y2ggPT4gbWF0Y2gucGF0aG5hbWVCYXNlKSk7XG4gIGxldCBhY3RpdmVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFjdGl2ZVJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgfSk7XG4gIGxldCBuYXZpZ2F0ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uICh0bywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKGFjdGl2ZVJlZi5jdXJyZW50LCBcIllvdSBzaG91bGQgY2FsbCBuYXZpZ2F0ZSgpIGluIGEgUmVhY3QudXNlRWZmZWN0KCksIG5vdCB3aGVuIFwiICsgXCJ5b3VyIGNvbXBvbmVudCBpcyBmaXJzdCByZW5kZXJlZC5cIikgOiB2b2lkIDA7XG4gICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgaWYgKHR5cGVvZiB0byA9PT0gXCJudW1iZXJcIikge1xuICAgICAgbmF2aWdhdG9yLmdvKHRvKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcGF0aCA9IHJlc29sdmVUbyh0bywgSlNPTi5wYXJzZShyb3V0ZVBhdGhuYW1lc0pzb24pLCBsb2NhdGlvblBhdGhuYW1lLCBvcHRpb25zLnJlbGF0aXZlID09PSBcInBhdGhcIik7IC8vIElmIHdlJ3JlIG9wZXJhdGluZyB3aXRoaW4gYSBiYXNlbmFtZSwgcHJlcGVuZCBpdCB0byB0aGUgcGF0aG5hbWUgcHJpb3JcbiAgICAvLyB0byBoYW5kaW5nIG9mZiB0byBoaXN0b3J5LiAgSWYgdGhpcyBpcyBhIHJvb3QgbmF2aWdhdGlvbiwgdGhlbiB3ZVxuICAgIC8vIG5hdmlnYXRlIHRvIHRoZSByYXcgYmFzZW5hbWUgd2hpY2ggYWxsb3dzIHRoZSBiYXNlbmFtZSB0byBoYXZlIGZ1bGxcbiAgICAvLyBjb250cm9sIG92ZXIgdGhlIHByZXNlbmNlIG9mIGEgdHJhaWxpbmcgc2xhc2ggb24gcm9vdCBsaW5rc1xuXG4gICAgaWYgKGJhc2VuYW1lICE9PSBcIi9cIikge1xuICAgICAgcGF0aC5wYXRobmFtZSA9IHBhdGgucGF0aG5hbWUgPT09IFwiL1wiID8gYmFzZW5hbWUgOiBqb2luUGF0aHMoW2Jhc2VuYW1lLCBwYXRoLnBhdGhuYW1lXSk7XG4gICAgfVxuXG4gICAgKCEhb3B0aW9ucy5yZXBsYWNlID8gbmF2aWdhdG9yLnJlcGxhY2UgOiBuYXZpZ2F0b3IucHVzaCkocGF0aCwgb3B0aW9ucy5zdGF0ZSwgb3B0aW9ucyk7XG4gIH0sIFtiYXNlbmFtZSwgbmF2aWdhdG9yLCByb3V0ZVBhdGhuYW1lc0pzb24sIGxvY2F0aW9uUGF0aG5hbWVdKTtcbiAgcmV0dXJuIG5hdmlnYXRlO1xufVxuY29uc3QgT3V0bGV0Q29udGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb250ZXh0IChpZiBwcm92aWRlZCkgZm9yIHRoZSBjaGlsZCByb3V0ZSBhdCB0aGlzIGxldmVsIG9mIHRoZSByb3V0ZVxuICogaGllcmFyY2h5LlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1vdXRsZXQtY29udGV4dFxuICovXG5cbmZ1bmN0aW9uIHVzZU91dGxldENvbnRleHQoKSB7XG4gIHJldHVybiBSZWFjdC51c2VDb250ZXh0KE91dGxldENvbnRleHQpO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbGVtZW50IGZvciB0aGUgY2hpbGQgcm91dGUgYXQgdGhpcyBsZXZlbCBvZiB0aGUgcm91dGVcbiAqIGhpZXJhcmNoeS4gVXNlZCBpbnRlcm5hbGx5IGJ5IDxPdXRsZXQ+IHRvIHJlbmRlciBjaGlsZCByb3V0ZXMuXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1vdXRsZXRcbiAqL1xuXG5mdW5jdGlvbiB1c2VPdXRsZXQoY29udGV4dCkge1xuICBsZXQgb3V0bGV0ID0gUmVhY3QudXNlQ29udGV4dChSb3V0ZUNvbnRleHQpLm91dGxldDtcblxuICBpZiAob3V0bGV0KSB7XG4gICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KE91dGxldENvbnRleHQuUHJvdmlkZXIsIHtcbiAgICAgIHZhbHVlOiBjb250ZXh0XG4gICAgfSwgb3V0bGV0KTtcbiAgfVxuXG4gIHJldHVybiBvdXRsZXQ7XG59XG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IG9mIGtleS92YWx1ZSBwYWlycyBvZiB0aGUgZHluYW1pYyBwYXJhbXMgZnJvbSB0aGUgY3VycmVudFxuICogVVJMIHRoYXQgd2VyZSBtYXRjaGVkIGJ5IHRoZSByb3V0ZSBwYXRoLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9ob29rcy91c2UtcGFyYW1zXG4gKi9cblxuZnVuY3Rpb24gdXNlUGFyYW1zKCkge1xuICBsZXQge1xuICAgIG1hdGNoZXNcbiAgfSA9IFJlYWN0LnVzZUNvbnRleHQoUm91dGVDb250ZXh0KTtcbiAgbGV0IHJvdXRlTWF0Y2ggPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV07XG4gIHJldHVybiByb3V0ZU1hdGNoID8gcm91dGVNYXRjaC5wYXJhbXMgOiB7fTtcbn1cbi8qKlxuICogUmVzb2x2ZXMgdGhlIHBhdGhuYW1lIG9mIHRoZSBnaXZlbiBgdG9gIHZhbHVlIGFnYWluc3QgdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2hvb2tzL3VzZS1yZXNvbHZlZC1wYXRoXG4gKi9cblxuZnVuY3Rpb24gdXNlUmVzb2x2ZWRQYXRoKHRvLCBfdGVtcDIpIHtcbiAgbGV0IHtcbiAgICByZWxhdGl2ZVxuICB9ID0gX3RlbXAyID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wMjtcbiAgbGV0IHtcbiAgICBtYXRjaGVzXG4gIH0gPSBSZWFjdC51c2VDb250ZXh0KFJvdXRlQ29udGV4dCk7XG4gIGxldCB7XG4gICAgcGF0aG5hbWU6IGxvY2F0aW9uUGF0aG5hbWVcbiAgfSA9IHVzZUxvY2F0aW9uKCk7XG4gIGxldCByb3V0ZVBhdGhuYW1lc0pzb24gPSBKU09OLnN0cmluZ2lmeShVTlNBRkVfZ2V0UGF0aENvbnRyaWJ1dGluZ01hdGNoZXMobWF0Y2hlcykubWFwKG1hdGNoID0+IG1hdGNoLnBhdGhuYW1lQmFzZSkpO1xuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiByZXNvbHZlVG8odG8sIEpTT04ucGFyc2Uocm91dGVQYXRobmFtZXNKc29uKSwgbG9jYXRpb25QYXRobmFtZSwgcmVsYXRpdmUgPT09IFwicGF0aFwiKSwgW3RvLCByb3V0ZVBhdGhuYW1lc0pzb24sIGxvY2F0aW9uUGF0aG5hbWUsIHJlbGF0aXZlXSk7XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGVsZW1lbnQgb2YgdGhlIHJvdXRlIHRoYXQgbWF0Y2hlZCB0aGUgY3VycmVudCBsb2NhdGlvbiwgcHJlcGFyZWRcbiAqIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dCB0byByZW5kZXIgdGhlIHJlbWFpbmRlciBvZiB0aGUgcm91dGUgdHJlZS4gUm91dGVcbiAqIGVsZW1lbnRzIGluIHRoZSB0cmVlIG11c3QgcmVuZGVyIGFuIDxPdXRsZXQ+IHRvIHJlbmRlciB0aGVpciBjaGlsZCByb3V0ZSdzXG4gKiBlbGVtZW50LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9ob29rcy91c2Utcm91dGVzXG4gKi9cblxuZnVuY3Rpb24gdXNlUm91dGVzKHJvdXRlcywgbG9jYXRpb25BcmcpIHtcbiAgIXVzZUluUm91dGVyQ29udGV4dCgpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCAvLyBUT0RPOiBUaGlzIGVycm9yIGlzIHByb2JhYmx5IGJlY2F1c2UgdGhleSBzb21laG93IGhhdmUgMiB2ZXJzaW9ucyBvZiB0aGVcbiAgLy8gcm91dGVyIGxvYWRlZC4gV2UgY2FuIGhlbHAgdGhlbSB1bmRlcnN0YW5kIGhvdyB0byBhdm9pZCB0aGF0LlxuICBcInVzZVJvdXRlcygpIG1heSBiZSB1c2VkIG9ubHkgaW4gdGhlIGNvbnRleHQgb2YgYSA8Um91dGVyPiBjb21wb25lbnQuXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgbGV0IHtcbiAgICBuYXZpZ2F0b3JcbiAgfSA9IFJlYWN0LnVzZUNvbnRleHQoTmF2aWdhdGlvbkNvbnRleHQpO1xuICBsZXQgZGF0YVJvdXRlclN0YXRlQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGF0YVJvdXRlclN0YXRlQ29udGV4dCk7XG4gIGxldCB7XG4gICAgbWF0Y2hlczogcGFyZW50TWF0Y2hlc1xuICB9ID0gUmVhY3QudXNlQ29udGV4dChSb3V0ZUNvbnRleHQpO1xuICBsZXQgcm91dGVNYXRjaCA9IHBhcmVudE1hdGNoZXNbcGFyZW50TWF0Y2hlcy5sZW5ndGggLSAxXTtcbiAgbGV0IHBhcmVudFBhcmFtcyA9IHJvdXRlTWF0Y2ggPyByb3V0ZU1hdGNoLnBhcmFtcyA6IHt9O1xuICBsZXQgcGFyZW50UGF0aG5hbWUgPSByb3V0ZU1hdGNoID8gcm91dGVNYXRjaC5wYXRobmFtZSA6IFwiL1wiO1xuICBsZXQgcGFyZW50UGF0aG5hbWVCYXNlID0gcm91dGVNYXRjaCA/IHJvdXRlTWF0Y2gucGF0aG5hbWVCYXNlIDogXCIvXCI7XG4gIGxldCBwYXJlbnRSb3V0ZSA9IHJvdXRlTWF0Y2ggJiYgcm91dGVNYXRjaC5yb3V0ZTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgLy8gWW91IHdvbid0IGdldCBhIHdhcm5pbmcgYWJvdXQgMiBkaWZmZXJlbnQgPFJvdXRlcz4gdW5kZXIgYSA8Um91dGU+XG4gICAgLy8gd2l0aG91dCBhIHRyYWlsaW5nICosIGJ1dCB0aGlzIGlzIGEgYmVzdC1lZmZvcnQgd2FybmluZyBhbnl3YXkgc2luY2Ugd2VcbiAgICAvLyBjYW5ub3QgZXZlbiBnaXZlIHRoZSB3YXJuaW5nIHVubGVzcyB0aGV5IGxhbmQgYXQgdGhlIHBhcmVudCByb3V0ZS5cbiAgICAvL1xuICAgIC8vIEV4YW1wbGU6XG4gICAgLy9cbiAgICAvLyA8Um91dGVzPlxuICAgIC8vICAgey8qIFRoaXMgcm91dGUgcGF0aCBNVVNUIGVuZCB3aXRoIC8qIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgLy8gICAgICAgaXQgd2lsbCBuZXZlciBtYXRjaCAvYmxvZy9wb3N0LzEyMyAqL31cbiAgICAvLyAgIDxSb3V0ZSBwYXRoPVwiYmxvZ1wiIGVsZW1lbnQ9ezxCbG9nIC8+fSAvPlxuICAgIC8vICAgPFJvdXRlIHBhdGg9XCJibG9nL2ZlZWRcIiBlbGVtZW50PXs8QmxvZ0ZlZWQgLz59IC8+XG4gICAgLy8gPC9Sb3V0ZXM+XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBCbG9nKCkge1xuICAgIC8vICAgcmV0dXJuIChcbiAgICAvLyAgICAgPFJvdXRlcz5cbiAgICAvLyAgICAgICA8Um91dGUgcGF0aD1cInBvc3QvOmlkXCIgZWxlbWVudD17PFBvc3QgLz59IC8+XG4gICAgLy8gICAgIDwvUm91dGVzPlxuICAgIC8vICAgKTtcbiAgICAvLyB9XG4gICAgbGV0IHBhcmVudFBhdGggPSBwYXJlbnRSb3V0ZSAmJiBwYXJlbnRSb3V0ZS5wYXRoIHx8IFwiXCI7XG4gICAgd2FybmluZ09uY2UocGFyZW50UGF0aG5hbWUsICFwYXJlbnRSb3V0ZSB8fCBwYXJlbnRQYXRoLmVuZHNXaXRoKFwiKlwiKSwgXCJZb3UgcmVuZGVyZWQgZGVzY2VuZGFudCA8Um91dGVzPiAob3IgY2FsbGVkIGB1c2VSb3V0ZXMoKWApIGF0IFwiICsgKFwiXFxcIlwiICsgcGFyZW50UGF0aG5hbWUgKyBcIlxcXCIgKHVuZGVyIDxSb3V0ZSBwYXRoPVxcXCJcIiArIHBhcmVudFBhdGggKyBcIlxcXCI+KSBidXQgdGhlIFwiKSArIFwicGFyZW50IHJvdXRlIHBhdGggaGFzIG5vIHRyYWlsaW5nIFxcXCIqXFxcIi4gVGhpcyBtZWFucyBpZiB5b3UgbmF2aWdhdGUgXCIgKyBcImRlZXBlciwgdGhlIHBhcmVudCB3b24ndCBtYXRjaCBhbnltb3JlIGFuZCB0aGVyZWZvcmUgdGhlIGNoaWxkIFwiICsgXCJyb3V0ZXMgd2lsbCBuZXZlciByZW5kZXIuXFxuXFxuXCIgKyAoXCJQbGVhc2UgY2hhbmdlIHRoZSBwYXJlbnQgPFJvdXRlIHBhdGg9XFxcIlwiICsgcGFyZW50UGF0aCArIFwiXFxcIj4gdG8gPFJvdXRlIFwiKSArIChcInBhdGg9XFxcIlwiICsgKHBhcmVudFBhdGggPT09IFwiL1wiID8gXCIqXCIgOiBwYXJlbnRQYXRoICsgXCIvKlwiKSArIFwiXFxcIj4uXCIpKTtcbiAgfVxuXG4gIGxldCBsb2NhdGlvbkZyb21Db250ZXh0ID0gdXNlTG9jYXRpb24oKTtcbiAgbGV0IGxvY2F0aW9uO1xuXG4gIGlmIChsb2NhdGlvbkFyZykge1xuICAgIHZhciBfcGFyc2VkTG9jYXRpb25BcmckcGE7XG5cbiAgICBsZXQgcGFyc2VkTG9jYXRpb25BcmcgPSB0eXBlb2YgbG9jYXRpb25BcmcgPT09IFwic3RyaW5nXCIgPyBwYXJzZVBhdGgobG9jYXRpb25BcmcpIDogbG9jYXRpb25Bcmc7XG4gICAgIShwYXJlbnRQYXRobmFtZUJhc2UgPT09IFwiL1wiIHx8ICgoX3BhcnNlZExvY2F0aW9uQXJnJHBhID0gcGFyc2VkTG9jYXRpb25BcmcucGF0aG5hbWUpID09IG51bGwgPyB2b2lkIDAgOiBfcGFyc2VkTG9jYXRpb25BcmckcGEuc3RhcnRzV2l0aChwYXJlbnRQYXRobmFtZUJhc2UpKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiV2hlbiBvdmVycmlkaW5nIHRoZSBsb2NhdGlvbiB1c2luZyBgPFJvdXRlcyBsb2NhdGlvbj5gIG9yIGB1c2VSb3V0ZXMocm91dGVzLCBsb2NhdGlvbilgLCBcIiArIFwidGhlIGxvY2F0aW9uIHBhdGhuYW1lIG11c3QgYmVnaW4gd2l0aCB0aGUgcG9ydGlvbiBvZiB0aGUgVVJMIHBhdGhuYW1lIHRoYXQgd2FzIFwiICsgKFwibWF0Y2hlZCBieSBhbGwgcGFyZW50IHJvdXRlcy4gVGhlIGN1cnJlbnQgcGF0aG5hbWUgYmFzZSBpcyBcXFwiXCIgKyBwYXJlbnRQYXRobmFtZUJhc2UgKyBcIlxcXCIgXCIpICsgKFwiYnV0IHBhdGhuYW1lIFxcXCJcIiArIHBhcnNlZExvY2F0aW9uQXJnLnBhdGhuYW1lICsgXCJcXFwiIHdhcyBnaXZlbiBpbiB0aGUgYGxvY2F0aW9uYCBwcm9wLlwiKSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGxvY2F0aW9uID0gcGFyc2VkTG9jYXRpb25Bcmc7XG4gIH0gZWxzZSB7XG4gICAgbG9jYXRpb24gPSBsb2NhdGlvbkZyb21Db250ZXh0O1xuICB9XG5cbiAgbGV0IHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUgfHwgXCIvXCI7XG4gIGxldCByZW1haW5pbmdQYXRobmFtZSA9IHBhcmVudFBhdGhuYW1lQmFzZSA9PT0gXCIvXCIgPyBwYXRobmFtZSA6IHBhdGhuYW1lLnNsaWNlKHBhcmVudFBhdGhuYW1lQmFzZS5sZW5ndGgpIHx8IFwiL1wiO1xuICBsZXQgbWF0Y2hlcyA9IG1hdGNoUm91dGVzKHJvdXRlcywge1xuICAgIHBhdGhuYW1lOiByZW1haW5pbmdQYXRobmFtZVxuICB9KTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhwYXJlbnRSb3V0ZSB8fCBtYXRjaGVzICE9IG51bGwsIFwiTm8gcm91dGVzIG1hdGNoZWQgbG9jYXRpb24gXFxcIlwiICsgbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggKyBsb2NhdGlvbi5oYXNoICsgXCJcXFwiIFwiKSA6IHZvaWQgMDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB3YXJuaW5nKG1hdGNoZXMgPT0gbnVsbCB8fCBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0ucm91dGUuZWxlbWVudCAhPT0gdW5kZWZpbmVkLCBcIk1hdGNoZWQgbGVhZiByb3V0ZSBhdCBsb2NhdGlvbiBcXFwiXCIgKyBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCArIGxvY2F0aW9uLmhhc2ggKyBcIlxcXCIgZG9lcyBub3QgaGF2ZSBhbiBlbGVtZW50LiBcIiArIFwiVGhpcyBtZWFucyBpdCB3aWxsIHJlbmRlciBhbiA8T3V0bGV0IC8+IHdpdGggYSBudWxsIHZhbHVlIGJ5IGRlZmF1bHQgcmVzdWx0aW5nIGluIGFuIFxcXCJlbXB0eVxcXCIgcGFnZS5cIikgOiB2b2lkIDA7XG4gIH1cblxuICBsZXQgcmVuZGVyZWRNYXRjaGVzID0gX3JlbmRlck1hdGNoZXMobWF0Y2hlcyAmJiBtYXRjaGVzLm1hcChtYXRjaCA9PiBPYmplY3QuYXNzaWduKHt9LCBtYXRjaCwge1xuICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbih7fSwgcGFyZW50UGFyYW1zLCBtYXRjaC5wYXJhbXMpLFxuICAgIHBhdGhuYW1lOiBqb2luUGF0aHMoW3BhcmVudFBhdGhuYW1lQmFzZSwgLy8gUmUtZW5jb2RlIHBhdGhuYW1lcyB0aGF0IHdlcmUgZGVjb2RlZCBpbnNpZGUgbWF0Y2hSb3V0ZXNcbiAgICBuYXZpZ2F0b3IuZW5jb2RlTG9jYXRpb24gPyBuYXZpZ2F0b3IuZW5jb2RlTG9jYXRpb24obWF0Y2gucGF0aG5hbWUpLnBhdGhuYW1lIDogbWF0Y2gucGF0aG5hbWVdKSxcbiAgICBwYXRobmFtZUJhc2U6IG1hdGNoLnBhdGhuYW1lQmFzZSA9PT0gXCIvXCIgPyBwYXJlbnRQYXRobmFtZUJhc2UgOiBqb2luUGF0aHMoW3BhcmVudFBhdGhuYW1lQmFzZSwgLy8gUmUtZW5jb2RlIHBhdGhuYW1lcyB0aGF0IHdlcmUgZGVjb2RlZCBpbnNpZGUgbWF0Y2hSb3V0ZXNcbiAgICBuYXZpZ2F0b3IuZW5jb2RlTG9jYXRpb24gPyBuYXZpZ2F0b3IuZW5jb2RlTG9jYXRpb24obWF0Y2gucGF0aG5hbWVCYXNlKS5wYXRobmFtZSA6IG1hdGNoLnBhdGhuYW1lQmFzZV0pXG4gIH0pKSwgcGFyZW50TWF0Y2hlcywgZGF0YVJvdXRlclN0YXRlQ29udGV4dCB8fCB1bmRlZmluZWQpOyAvLyBXaGVuIGEgdXNlciBwYXNzZXMgaW4gYSBgbG9jYXRpb25BcmdgLCB0aGUgYXNzb2NpYXRlZCByb3V0ZXMgbmVlZCB0b1xuICAvLyBiZSB3cmFwcGVkIGluIGEgbmV3IGBMb2NhdGlvbkNvbnRleHQuUHJvdmlkZXJgIGluIG9yZGVyIGZvciBgdXNlTG9jYXRpb25gXG4gIC8vIHRvIHVzZSB0aGUgc2NvcGVkIGxvY2F0aW9uIGluc3RlYWQgb2YgdGhlIGdsb2JhbCBsb2NhdGlvbi5cblxuXG4gIGlmIChsb2NhdGlvbkFyZyAmJiByZW5kZXJlZE1hdGNoZXMpIHtcbiAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoTG9jYXRpb25Db250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICB2YWx1ZToge1xuICAgICAgICBsb2NhdGlvbjogX2V4dGVuZHMoe1xuICAgICAgICAgIHBhdGhuYW1lOiBcIi9cIixcbiAgICAgICAgICBzZWFyY2g6IFwiXCIsXG4gICAgICAgICAgaGFzaDogXCJcIixcbiAgICAgICAgICBzdGF0ZTogbnVsbCxcbiAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiXG4gICAgICAgIH0sIGxvY2F0aW9uKSxcbiAgICAgICAgbmF2aWdhdGlvblR5cGU6IEFjdGlvbi5Qb3BcbiAgICAgIH1cbiAgICB9LCByZW5kZXJlZE1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlbmRlcmVkTWF0Y2hlcztcbn1cblxuZnVuY3Rpb24gRGVmYXVsdEVycm9yRWxlbWVudCgpIHtcbiAgbGV0IGVycm9yID0gdXNlUm91dGVFcnJvcigpO1xuICBsZXQgbWVzc2FnZSA9IGlzUm91dGVFcnJvclJlc3BvbnNlKGVycm9yKSA/IGVycm9yLnN0YXR1cyArIFwiIFwiICsgZXJyb3Iuc3RhdHVzVGV4dCA6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xuICBsZXQgc3RhY2sgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3Iuc3RhY2sgOiBudWxsO1xuICBsZXQgbGlnaHRncmV5ID0gXCJyZ2JhKDIwMCwyMDAsMjAwLCAwLjUpXCI7XG4gIGxldCBwcmVTdHlsZXMgPSB7XG4gICAgcGFkZGluZzogXCIwLjVyZW1cIixcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGxpZ2h0Z3JleVxuICB9O1xuICBsZXQgY29kZVN0eWxlcyA9IHtcbiAgICBwYWRkaW5nOiBcIjJweCA0cHhcIixcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGxpZ2h0Z3JleVxuICB9O1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgXCJVbmhhbmRsZWQgVGhyb3duIEVycm9yIVwiKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIGZvbnRTdHlsZTogXCJpdGFsaWNcIlxuICAgIH1cbiAgfSwgbWVzc2FnZSksIHN0YWNrID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIiwge1xuICAgIHN0eWxlOiBwcmVTdHlsZXNcbiAgfSwgc3RhY2spIDogbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiXFx1RDgzRFxcdURDQkYgSGV5IGRldmVsb3BlciBcXHVEODNEXFx1REM0QlwiKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiWW91IGNhbiBwcm92aWRlIGEgd2F5IGJldHRlciBVWCB0aGFuIHRoaXMgd2hlbiB5b3VyIGFwcCB0aHJvd3MgZXJyb3JzIGJ5IHByb3ZpZGluZyB5b3VyIG93blxceEEwXCIsIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCB7XG4gICAgc3R5bGU6IGNvZGVTdHlsZXNcbiAgfSwgXCJlcnJvckVsZW1lbnRcIiksIFwiIHByb3BzIG9uXFx4QTBcIiwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIHtcbiAgICBzdHlsZTogY29kZVN0eWxlc1xuICB9LCBcIjxSb3V0ZT5cIikpKTtcbn1cblxuY2xhc3MgUmVuZGVyRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBsb2NhdGlvbjogcHJvcHMubG9jYXRpb24sXG4gICAgICBlcnJvcjogcHJvcHMuZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpIHtcbiAgICAvLyBXaGVuIHdlIGdldCBpbnRvIGFuIGVycm9yIHN0YXRlLCB0aGUgdXNlciB3aWxsIGxpa2VseSBjbGljayBcImJhY2tcIiB0byB0aGVcbiAgICAvLyBwcmV2aW91cyBwYWdlIHRoYXQgZGlkbid0IGhhdmUgYW4gZXJyb3IuIEJlY2F1c2UgdGhpcyB3cmFwcyB0aGUgZW50aXJlXG4gICAgLy8gYXBwbGljYXRpb24sIHRoYXQgd2lsbCBoYXZlIG5vIGVmZmVjdC0tdGhlIGVycm9yIHBhZ2UgY29udGludWVzIHRvIGRpc3BsYXkuXG4gICAgLy8gVGhpcyBnaXZlcyB1cyBhIG1lY2hhbmlzbSB0byByZWNvdmVyIGZyb20gdGhlIGVycm9yIHdoZW4gdGhlIGxvY2F0aW9uIGNoYW5nZXMuXG4gICAgLy9cbiAgICAvLyBXaGV0aGVyIHdlJ3JlIGluIGFuIGVycm9yIHN0YXRlIG9yIG5vdCwgd2UgdXBkYXRlIHRoZSBsb2NhdGlvbiBpbiBzdGF0ZVxuICAgIC8vIHNvIHRoYXQgd2hlbiB3ZSBhcmUgaW4gYW4gZXJyb3Igc3RhdGUsIGl0IGdldHMgcmVzZXQgd2hlbiBhIG5ldyBsb2NhdGlvblxuICAgIC8vIGNvbWVzIGluIGFuZCB0aGUgdXNlciByZWNvdmVycyBmcm9tIHRoZSBlcnJvci5cbiAgICBpZiAoc3RhdGUubG9jYXRpb24gIT09IHByb3BzLmxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlcnJvcjogcHJvcHMuZXJyb3IsXG4gICAgICAgIGxvY2F0aW9uOiBwcm9wcy5sb2NhdGlvblxuICAgICAgfTtcbiAgICB9IC8vIElmIHdlJ3JlIG5vdCBjaGFuZ2luZyBsb2NhdGlvbnMsIHByZXNlcnZlIHRoZSBsb2NhdGlvbiBidXQgc3RpbGwgc3VyZmFjZVxuICAgIC8vIGFueSBuZXcgZXJyb3JzIHRoYXQgbWF5IGNvbWUgdGhyb3VnaC4gV2UgcmV0YWluIHRoZSBleGlzdGluZyBlcnJvciwgd2UgZG9cbiAgICAvLyB0aGlzIGJlY2F1c2UgdGhlIGVycm9yIHByb3ZpZGVkIGZyb20gdGhlIGFwcCBzdGF0ZSBtYXkgYmUgY2xlYXJlZCB3aXRob3V0XG4gICAgLy8gdGhlIGxvY2F0aW9uIGNoYW5naW5nLlxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHByb3BzLmVycm9yIHx8IHN0YXRlLmVycm9yLFxuICAgICAgbG9jYXRpb246IHN0YXRlLmxvY2F0aW9uXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yLCBlcnJvckluZm8pIHtcbiAgICBjb25zb2xlLmVycm9yKFwiUmVhY3QgUm91dGVyIGNhdWdodCB0aGUgZm9sbG93aW5nIGVycm9yIGR1cmluZyByZW5kZXJcIiwgZXJyb3IsIGVycm9ySW5mbyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZXJyb3IgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZUVycm9yQ29udGV4dC5Qcm92aWRlciwge1xuICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZXJyb3IsXG4gICAgICBjaGlsZHJlbjogdGhpcy5wcm9wcy5jb21wb25lbnRcbiAgICB9KSA6IHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cblxufVxuXG5mdW5jdGlvbiBSZW5kZXJlZFJvdXRlKF9yZWYpIHtcbiAgbGV0IHtcbiAgICByb3V0ZUNvbnRleHQsXG4gICAgbWF0Y2gsXG4gICAgY2hpbGRyZW5cbiAgfSA9IF9yZWY7XG4gIGxldCBkYXRhU3RhdGljUm91dGVyQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGF0YVN0YXRpY1JvdXRlckNvbnRleHQpOyAvLyBUcmFjayBob3cgZGVlcCB3ZSBnb3QgaW4gb3VyIHJlbmRlciBwYXNzIHRvIGVtdWxhdGUgU1NSIGNvbXBvbmVudERpZENhdGNoXG4gIC8vIGluIGEgRGF0YVN0YXRpY1JvdXRlclxuXG4gIGlmIChkYXRhU3RhdGljUm91dGVyQ29udGV4dCAmJiBtYXRjaC5yb3V0ZS5lcnJvckVsZW1lbnQpIHtcbiAgICBkYXRhU3RhdGljUm91dGVyQ29udGV4dC5fZGVlcGVzdFJlbmRlcmVkQm91bmRhcnlJZCA9IG1hdGNoLnJvdXRlLmlkO1xuICB9XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlQ29udGV4dC5Qcm92aWRlciwge1xuICAgIHZhbHVlOiByb3V0ZUNvbnRleHRcbiAgfSwgY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBfcmVuZGVyTWF0Y2hlcyhtYXRjaGVzLCBwYXJlbnRNYXRjaGVzLCBkYXRhUm91dGVyU3RhdGUpIHtcbiAgaWYgKHBhcmVudE1hdGNoZXMgPT09IHZvaWQgMCkge1xuICAgIHBhcmVudE1hdGNoZXMgPSBbXTtcbiAgfVxuXG4gIGlmIChtYXRjaGVzID09IG51bGwpIHtcbiAgICBpZiAoZGF0YVJvdXRlclN0YXRlICE9IG51bGwgJiYgZGF0YVJvdXRlclN0YXRlLmVycm9ycykge1xuICAgICAgLy8gRG9uJ3QgYmFpbCBpZiB3ZSBoYXZlIGRhdGEgcm91dGVyIGVycm9ycyBzbyB3ZSBjYW4gcmVuZGVyIHRoZW0gaW4gdGhlXG4gICAgICAvLyBib3VuZGFyeS4gIFVzZSB0aGUgcHJlLW1hdGNoZWQgKG9yIHNoaW1tZWQpIG1hdGNoZXNcbiAgICAgIG1hdGNoZXMgPSBkYXRhUm91dGVyU3RhdGUubWF0Y2hlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgbGV0IHJlbmRlcmVkTWF0Y2hlcyA9IG1hdGNoZXM7IC8vIElmIHdlIGhhdmUgZGF0YSBlcnJvcnMsIHRyaW0gbWF0Y2hlcyB0byB0aGUgaGlnaGVzdCBlcnJvciBib3VuZGFyeVxuXG4gIGxldCBlcnJvcnMgPSBkYXRhUm91dGVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IGRhdGFSb3V0ZXJTdGF0ZS5lcnJvcnM7XG5cbiAgaWYgKGVycm9ycyAhPSBudWxsKSB7XG4gICAgbGV0IGVycm9ySW5kZXggPSByZW5kZXJlZE1hdGNoZXMuZmluZEluZGV4KG0gPT4gbS5yb3V0ZS5pZCAmJiAoZXJyb3JzID09IG51bGwgPyB2b2lkIDAgOiBlcnJvcnNbbS5yb3V0ZS5pZF0pKTtcbiAgICAhKGVycm9ySW5kZXggPj0gMCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiQ291bGQgbm90IGZpbmQgYSBtYXRjaGluZyByb3V0ZSBmb3IgdGhlIGN1cnJlbnQgZXJyb3JzOiBcIiArIGVycm9ycykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHJlbmRlcmVkTWF0Y2hlcyA9IHJlbmRlcmVkTWF0Y2hlcy5zbGljZSgwLCBNYXRoLm1pbihyZW5kZXJlZE1hdGNoZXMubGVuZ3RoLCBlcnJvckluZGV4ICsgMSkpO1xuICB9XG5cbiAgcmV0dXJuIHJlbmRlcmVkTWF0Y2hlcy5yZWR1Y2VSaWdodCgob3V0bGV0LCBtYXRjaCwgaW5kZXgpID0+IHtcbiAgICBsZXQgZXJyb3IgPSBtYXRjaC5yb3V0ZS5pZCA/IGVycm9ycyA9PSBudWxsID8gdm9pZCAwIDogZXJyb3JzW21hdGNoLnJvdXRlLmlkXSA6IG51bGw7IC8vIE9ubHkgZGF0YSByb3V0ZXJzIGhhbmRsZSBlcnJvcnNcblxuICAgIGxldCBlcnJvckVsZW1lbnQgPSBkYXRhUm91dGVyU3RhdGUgPyBtYXRjaC5yb3V0ZS5lcnJvckVsZW1lbnQgfHwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoRGVmYXVsdEVycm9yRWxlbWVudCwgbnVsbCkgOiBudWxsO1xuXG4gICAgbGV0IGdldENoaWxkcmVuID0gKCkgPT4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVuZGVyZWRSb3V0ZSwge1xuICAgICAgbWF0Y2g6IG1hdGNoLFxuICAgICAgcm91dGVDb250ZXh0OiB7XG4gICAgICAgIG91dGxldCxcbiAgICAgICAgbWF0Y2hlczogcGFyZW50TWF0Y2hlcy5jb25jYXQocmVuZGVyZWRNYXRjaGVzLnNsaWNlKDAsIGluZGV4ICsgMSkpXG4gICAgICB9XG4gICAgfSwgZXJyb3IgPyBlcnJvckVsZW1lbnQgOiBtYXRjaC5yb3V0ZS5lbGVtZW50ICE9PSB1bmRlZmluZWQgPyBtYXRjaC5yb3V0ZS5lbGVtZW50IDogb3V0bGV0KTsgLy8gT25seSB3cmFwIGluIGFuIGVycm9yIGJvdW5kYXJ5IHdpdGhpbiBkYXRhIHJvdXRlciB1c2FnZXMgd2hlbiB3ZSBoYXZlIGFuXG4gICAgLy8gZXJyb3JFbGVtZW50IG9uIHRoaXMgcm91dGUuICBPdGhlcndpc2UgbGV0IGl0IGJ1YmJsZSB1cCB0byBhbiBhbmNlc3RvclxuICAgIC8vIGVycm9yRWxlbWVudFxuXG5cbiAgICByZXR1cm4gZGF0YVJvdXRlclN0YXRlICYmIChtYXRjaC5yb3V0ZS5lcnJvckVsZW1lbnQgfHwgaW5kZXggPT09IDApID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVuZGVyRXJyb3JCb3VuZGFyeSwge1xuICAgICAgbG9jYXRpb246IGRhdGFSb3V0ZXJTdGF0ZS5sb2NhdGlvbixcbiAgICAgIGNvbXBvbmVudDogZXJyb3JFbGVtZW50LFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgY2hpbGRyZW46IGdldENoaWxkcmVuKClcbiAgICB9KSA6IGdldENoaWxkcmVuKCk7XG4gIH0sIG51bGwpO1xufVxudmFyIERhdGFSb3V0ZXJIb29rO1xuXG4oZnVuY3Rpb24gKERhdGFSb3V0ZXJIb29rKSB7XG4gIERhdGFSb3V0ZXJIb29rW1wiVXNlUmV2YWxpZGF0b3JcIl0gPSBcInVzZVJldmFsaWRhdG9yXCI7XG59KShEYXRhUm91dGVySG9vayB8fCAoRGF0YVJvdXRlckhvb2sgPSB7fSkpO1xuXG52YXIgRGF0YVJvdXRlclN0YXRlSG9vaztcblxuKGZ1bmN0aW9uIChEYXRhUm91dGVyU3RhdGVIb29rKSB7XG4gIERhdGFSb3V0ZXJTdGF0ZUhvb2tbXCJVc2VMb2FkZXJEYXRhXCJdID0gXCJ1c2VMb2FkZXJEYXRhXCI7XG4gIERhdGFSb3V0ZXJTdGF0ZUhvb2tbXCJVc2VBY3Rpb25EYXRhXCJdID0gXCJ1c2VBY3Rpb25EYXRhXCI7XG4gIERhdGFSb3V0ZXJTdGF0ZUhvb2tbXCJVc2VSb3V0ZUVycm9yXCJdID0gXCJ1c2VSb3V0ZUVycm9yXCI7XG4gIERhdGFSb3V0ZXJTdGF0ZUhvb2tbXCJVc2VOYXZpZ2F0aW9uXCJdID0gXCJ1c2VOYXZpZ2F0aW9uXCI7XG4gIERhdGFSb3V0ZXJTdGF0ZUhvb2tbXCJVc2VSb3V0ZUxvYWRlckRhdGFcIl0gPSBcInVzZVJvdXRlTG9hZGVyRGF0YVwiO1xuICBEYXRhUm91dGVyU3RhdGVIb29rW1wiVXNlTWF0Y2hlc1wiXSA9IFwidXNlTWF0Y2hlc1wiO1xuICBEYXRhUm91dGVyU3RhdGVIb29rW1wiVXNlUmV2YWxpZGF0b3JcIl0gPSBcInVzZVJldmFsaWRhdG9yXCI7XG59KShEYXRhUm91dGVyU3RhdGVIb29rIHx8IChEYXRhUm91dGVyU3RhdGVIb29rID0ge30pKTtcblxuZnVuY3Rpb24gZ2V0RGF0YVJvdXRlckNvbnNvbGVFcnJvcihob29rTmFtZSkge1xuICByZXR1cm4gaG9va05hbWUgKyBcIiBtdXN0IGJlIHVzZWQgd2l0aGluIGEgZGF0YSByb3V0ZXIuICBTZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZW4vbWFpbi9yb3V0ZXJzL3BpY2tpbmctYS1yb3V0ZXIuXCI7XG59XG5cbmZ1bmN0aW9uIHVzZURhdGFSb3V0ZXJDb250ZXh0KGhvb2tOYW1lKSB7XG4gIGxldCBjdHggPSBSZWFjdC51c2VDb250ZXh0KERhdGFSb3V0ZXJDb250ZXh0KTtcbiAgIWN0eCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgZ2V0RGF0YVJvdXRlckNvbnNvbGVFcnJvcihob29rTmFtZSkpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGN0eDtcbn1cblxuZnVuY3Rpb24gdXNlRGF0YVJvdXRlclN0YXRlKGhvb2tOYW1lKSB7XG4gIGxldCBzdGF0ZSA9IFJlYWN0LnVzZUNvbnRleHQoRGF0YVJvdXRlclN0YXRlQ29udGV4dCk7XG4gICFzdGF0ZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgZ2V0RGF0YVJvdXRlckNvbnNvbGVFcnJvcihob29rTmFtZSkpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIHN0YXRlO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IG5hdmlnYXRpb24sIGRlZmF1bHRpbmcgdG8gYW4gXCJpZGxlXCIgbmF2aWdhdGlvbiB3aGVuXG4gKiBubyBuYXZpZ2F0aW9uIGlzIGluIHByb2dyZXNzXG4gKi9cblxuXG5mdW5jdGlvbiB1c2VOYXZpZ2F0aW9uKCkge1xuICBsZXQgc3RhdGUgPSB1c2VEYXRhUm91dGVyU3RhdGUoRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VOYXZpZ2F0aW9uKTtcbiAgcmV0dXJuIHN0YXRlLm5hdmlnYXRpb247XG59XG4vKipcbiAqIFJldHVybnMgYSByZXZhbGlkYXRlIGZ1bmN0aW9uIGZvciBtYW51YWxseSB0cmlnZ2VyaW5nIHJldmFsaWRhdGlvbiwgYXMgd2VsbFxuICogYXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgYW55IG1hbnVhbCByZXZhbGlkYXRpb25zXG4gKi9cblxuZnVuY3Rpb24gdXNlUmV2YWxpZGF0b3IoKSB7XG4gIGxldCBkYXRhUm91dGVyQ29udGV4dCA9IHVzZURhdGFSb3V0ZXJDb250ZXh0KERhdGFSb3V0ZXJIb29rLlVzZVJldmFsaWRhdG9yKTtcbiAgbGV0IHN0YXRlID0gdXNlRGF0YVJvdXRlclN0YXRlKERhdGFSb3V0ZXJTdGF0ZUhvb2suVXNlUmV2YWxpZGF0b3IpO1xuICByZXR1cm4ge1xuICAgIHJldmFsaWRhdGU6IGRhdGFSb3V0ZXJDb250ZXh0LnJvdXRlci5yZXZhbGlkYXRlLFxuICAgIHN0YXRlOiBzdGF0ZS5yZXZhbGlkYXRpb25cbiAgfTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aXZlIHJvdXRlIG1hdGNoZXMsIHVzZWZ1bCBmb3IgYWNjZXNzaW5nIGxvYWRlckRhdGEgZm9yXG4gKiBwYXJlbnQvY2hpbGQgcm91dGVzIG9yIHRoZSByb3V0ZSBcImhhbmRsZVwiIHByb3BlcnR5XG4gKi9cblxuZnVuY3Rpb24gdXNlTWF0Y2hlcygpIHtcbiAgbGV0IHtcbiAgICBtYXRjaGVzLFxuICAgIGxvYWRlckRhdGFcbiAgfSA9IHVzZURhdGFSb3V0ZXJTdGF0ZShEYXRhUm91dGVyU3RhdGVIb29rLlVzZU1hdGNoZXMpO1xuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiBtYXRjaGVzLm1hcChtYXRjaCA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgcGFyYW1zXG4gICAgfSA9IG1hdGNoOyAvLyBOb3RlOiBUaGlzIHN0cnVjdHVyZSBtYXRjaGVzIHRoYXQgY3JlYXRlZCBieSBjcmVhdGVVc2VNYXRjaGVzTWF0Y2hcbiAgICAvLyBpbiB0aGUgQHJlbWl4LXJ1bi9yb3V0ZXIgLCBzbyBpZiB5b3UgY2hhbmdlIHRoaXMgcGxlYXNlIGFsc28gY2hhbmdlXG4gICAgLy8gdGhhdCA6KSAgRXZlbnR1YWxseSB3ZSdsbCBEUlkgdGhpcyB1cFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBtYXRjaC5yb3V0ZS5pZCxcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgcGFyYW1zLFxuICAgICAgZGF0YTogbG9hZGVyRGF0YVttYXRjaC5yb3V0ZS5pZF0sXG4gICAgICBoYW5kbGU6IG1hdGNoLnJvdXRlLmhhbmRsZVxuICAgIH07XG4gIH0pLCBbbWF0Y2hlcywgbG9hZGVyRGF0YV0pO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsb2FkZXIgZGF0YSBmb3IgdGhlIG5lYXJlc3QgYW5jZXN0b3IgUm91dGUgbG9hZGVyXG4gKi9cblxuZnVuY3Rpb24gdXNlTG9hZGVyRGF0YSgpIHtcbiAgbGV0IHN0YXRlID0gdXNlRGF0YVJvdXRlclN0YXRlKERhdGFSb3V0ZXJTdGF0ZUhvb2suVXNlTG9hZGVyRGF0YSk7XG4gIGxldCByb3V0ZSA9IFJlYWN0LnVzZUNvbnRleHQoUm91dGVDb250ZXh0KTtcbiAgIXJvdXRlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcInVzZUxvYWRlckRhdGEgbXVzdCBiZSB1c2VkIGluc2lkZSBhIFJvdXRlQ29udGV4dFwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIGxldCB0aGlzUm91dGUgPSByb3V0ZS5tYXRjaGVzW3JvdXRlLm1hdGNoZXMubGVuZ3RoIC0gMV07XG4gICF0aGlzUm91dGUucm91dGUuaWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwidXNlTG9hZGVyRGF0YSBjYW4gb25seSBiZSB1c2VkIG9uIHJvdXRlcyB0aGF0IGNvbnRhaW4gYSB1bmlxdWUgXFxcImlkXFxcIlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHJldHVybiBzdGF0ZS5sb2FkZXJEYXRhW3RoaXNSb3V0ZS5yb3V0ZS5pZF07XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGxvYWRlckRhdGEgZm9yIHRoZSBnaXZlbiByb3V0ZUlkXG4gKi9cblxuZnVuY3Rpb24gdXNlUm91dGVMb2FkZXJEYXRhKHJvdXRlSWQpIHtcbiAgbGV0IHN0YXRlID0gdXNlRGF0YVJvdXRlclN0YXRlKERhdGFSb3V0ZXJTdGF0ZUhvb2suVXNlUm91dGVMb2FkZXJEYXRhKTtcbiAgcmV0dXJuIHN0YXRlLmxvYWRlckRhdGFbcm91dGVJZF07XG59XG4vKipcbiAqIFJldHVybnMgdGhlIGFjdGlvbiBkYXRhIGZvciB0aGUgbmVhcmVzdCBhbmNlc3RvciBSb3V0ZSBhY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiB1c2VBY3Rpb25EYXRhKCkge1xuICBsZXQgc3RhdGUgPSB1c2VEYXRhUm91dGVyU3RhdGUoRGF0YVJvdXRlclN0YXRlSG9vay5Vc2VBY3Rpb25EYXRhKTtcbiAgbGV0IHJvdXRlID0gUmVhY3QudXNlQ29udGV4dChSb3V0ZUNvbnRleHQpO1xuICAhcm91dGUgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwidXNlQWN0aW9uRGF0YSBtdXN0IGJlIHVzZWQgaW5zaWRlIGEgUm91dGVDb250ZXh0XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIE9iamVjdC52YWx1ZXMoKHN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBzdGF0ZS5hY3Rpb25EYXRhKSB8fCB7fSlbMF07XG59XG4vKipcbiAqIFJldHVybnMgdGhlIG5lYXJlc3QgYW5jZXN0b3IgUm91dGUgZXJyb3IsIHdoaWNoIGNvdWxkIGJlIGEgbG9hZGVyL2FjdGlvblxuICogZXJyb3Igb3IgYSByZW5kZXIgZXJyb3IuICBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGNhbGxlZCBmcm9tIHlvdXJcbiAqIGVycm9yRWxlbWVudCB0byBkaXNwbGF5IGEgcHJvcGVyIGVycm9yIG1lc3NhZ2UuXG4gKi9cblxuZnVuY3Rpb24gdXNlUm91dGVFcnJvcigpIHtcbiAgdmFyIF9zdGF0ZSRlcnJvcnM7XG5cbiAgbGV0IGVycm9yID0gUmVhY3QudXNlQ29udGV4dChSb3V0ZUVycm9yQ29udGV4dCk7XG4gIGxldCBzdGF0ZSA9IHVzZURhdGFSb3V0ZXJTdGF0ZShEYXRhUm91dGVyU3RhdGVIb29rLlVzZVJvdXRlRXJyb3IpO1xuICBsZXQgcm91dGUgPSBSZWFjdC51c2VDb250ZXh0KFJvdXRlQ29udGV4dCk7XG4gIGxldCB0aGlzUm91dGUgPSByb3V0ZS5tYXRjaGVzW3JvdXRlLm1hdGNoZXMubGVuZ3RoIC0gMV07IC8vIElmIHRoaXMgd2FzIGEgcmVuZGVyIGVycm9yLCB3ZSBwdXQgaXQgaW4gYSBSb3V0ZUVycm9yIGNvbnRleHQgaW5zaWRlXG4gIC8vIG9mIFJlbmRlckVycm9yQm91bmRhcnlcblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cblxuICAhcm91dGUgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwidXNlUm91dGVFcnJvciBtdXN0IGJlIHVzZWQgaW5zaWRlIGEgUm91dGVDb250ZXh0XCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgIXRoaXNSb3V0ZS5yb3V0ZS5pZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgXCJ1c2VSb3V0ZUVycm9yIGNhbiBvbmx5IGJlIHVzZWQgb24gcm91dGVzIHRoYXQgY29udGFpbiBhIHVuaXF1ZSBcXFwiaWRcXFwiXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDsgLy8gT3RoZXJ3aXNlIGxvb2sgZm9yIGVycm9ycyBmcm9tIG91ciBkYXRhIHJvdXRlciBzdGF0ZVxuXG4gIHJldHVybiAoX3N0YXRlJGVycm9ycyA9IHN0YXRlLmVycm9ycykgPT0gbnVsbCA/IHZvaWQgMCA6IF9zdGF0ZSRlcnJvcnNbdGhpc1JvdXRlLnJvdXRlLmlkXTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgaGFwcHktcGF0aCBkYXRhIGZyb20gdGhlIG5lYXJlc3QgYW5jZXN0b3IgPEF3YWl0IC8+IHZhbHVlXG4gKi9cblxuZnVuY3Rpb24gdXNlQXN5bmNWYWx1ZSgpIHtcbiAgbGV0IHZhbHVlID0gUmVhY3QudXNlQ29udGV4dChBd2FpdENvbnRleHQpO1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHZvaWQgMCA6IHZhbHVlLl9kYXRhO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlcnJvciBmcm9tIHRoZSBuZWFyZXN0IGFuY2VzdG9yIDxBd2FpdCAvPiB2YWx1ZVxuICovXG5cbmZ1bmN0aW9uIHVzZUFzeW5jRXJyb3IoKSB7XG4gIGxldCB2YWx1ZSA9IFJlYWN0LnVzZUNvbnRleHQoQXdhaXRDb250ZXh0KTtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB2b2lkIDAgOiB2YWx1ZS5fZXJyb3I7XG59XG5jb25zdCBhbHJlYWR5V2FybmVkID0ge307XG5cbmZ1bmN0aW9uIHdhcm5pbmdPbmNlKGtleSwgY29uZCwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmQgJiYgIWFscmVhZHlXYXJuZWRba2V5XSkge1xuICAgIGFscmVhZHlXYXJuZWRba2V5XSA9IHRydWU7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhmYWxzZSwgbWVzc2FnZSkgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhIFJlbWl4IFJvdXRlciBpbnN0YW5jZSwgcmVuZGVyIHRoZSBhcHByb3ByaWF0ZSBVSVxuICovXG5mdW5jdGlvbiBSb3V0ZXJQcm92aWRlcihfcmVmKSB7XG4gIGxldCB7XG4gICAgZmFsbGJhY2tFbGVtZW50LFxuICAgIHJvdXRlclxuICB9ID0gX3JlZjtcbiAgLy8gU3luYyByb3V0ZXIgc3RhdGUgdG8gb3VyIGNvbXBvbmVudCBzdGF0ZSB0byBmb3JjZSByZS1yZW5kZXJzXG4gIGxldCBzdGF0ZSA9IHVzZVN5bmNFeHRlcm5hbFN0b3JlKHJvdXRlci5zdWJzY3JpYmUsICgpID0+IHJvdXRlci5zdGF0ZSwgLy8gV2UgaGF2ZSB0byBwcm92aWRlIHRoaXMgc28gUmVhY3RAMTggZG9lc24ndCBjb21wbGFpbiBkdXJpbmcgaHlkcmF0aW9uLFxuICAvLyBidXQgd2UgcGFzcyBvdXIgc2VyaWFsaXplZCBoeWRyYXRpb24gZGF0YSBpbnRvIHRoZSByb3V0ZXIgc28gc3RhdGUgaGVyZVxuICAvLyBpcyBhbHJlYWR5IHN5bmNlZCB3aXRoIHdoYXQgdGhlIHNlcnZlciBzYXdcbiAgKCkgPT4gcm91dGVyLnN0YXRlKTtcbiAgbGV0IG5hdmlnYXRvciA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBjcmVhdGVIcmVmOiByb3V0ZXIuY3JlYXRlSHJlZixcbiAgICAgIGVuY29kZUxvY2F0aW9uOiByb3V0ZXIuZW5jb2RlTG9jYXRpb24sXG4gICAgICBnbzogbiA9PiByb3V0ZXIubmF2aWdhdGUobiksXG4gICAgICBwdXNoOiAodG8sIHN0YXRlLCBvcHRzKSA9PiByb3V0ZXIubmF2aWdhdGUodG8sIHtcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIHByZXZlbnRTY3JvbGxSZXNldDogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5wcmV2ZW50U2Nyb2xsUmVzZXRcbiAgICAgIH0pLFxuICAgICAgcmVwbGFjZTogKHRvLCBzdGF0ZSwgb3B0cykgPT4gcm91dGVyLm5hdmlnYXRlKHRvLCB7XG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBwcmV2ZW50U2Nyb2xsUmVzZXQ6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMucHJldmVudFNjcm9sbFJlc2V0XG4gICAgICB9KVxuICAgIH07XG4gIH0sIFtyb3V0ZXJdKTtcbiAgbGV0IGJhc2VuYW1lID0gcm91dGVyLmJhc2VuYW1lIHx8IFwiL1wiO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoRGF0YVJvdXRlckNvbnRleHQuUHJvdmlkZXIsIHtcbiAgICB2YWx1ZToge1xuICAgICAgcm91dGVyLFxuICAgICAgbmF2aWdhdG9yLFxuICAgICAgc3RhdGljOiBmYWxzZSxcbiAgICAgIC8vIERvIHdlIG5lZWQgdGhpcz9cbiAgICAgIGJhc2VuYW1lXG4gICAgfVxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChEYXRhUm91dGVyU3RhdGVDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IHN0YXRlXG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJvdXRlciwge1xuICAgIGJhc2VuYW1lOiByb3V0ZXIuYmFzZW5hbWUsXG4gICAgbG9jYXRpb246IHJvdXRlci5zdGF0ZS5sb2NhdGlvbixcbiAgICBuYXZpZ2F0aW9uVHlwZTogcm91dGVyLnN0YXRlLmhpc3RvcnlBY3Rpb24sXG4gICAgbmF2aWdhdG9yOiBuYXZpZ2F0b3JcbiAgfSwgcm91dGVyLnN0YXRlLmluaXRpYWxpemVkID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUm91dGVzLCBudWxsKSA6IGZhbGxiYWNrRWxlbWVudCkpKTtcbn1cblxuLyoqXG4gKiBBIDxSb3V0ZXI+IHRoYXQgc3RvcmVzIGFsbCBlbnRyaWVzIGluIG1lbW9yeS5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvcm91dGVycy9tZW1vcnktcm91dGVyXG4gKi9cbmZ1bmN0aW9uIE1lbW9yeVJvdXRlcihfcmVmMikge1xuICBsZXQge1xuICAgIGJhc2VuYW1lLFxuICAgIGNoaWxkcmVuLFxuICAgIGluaXRpYWxFbnRyaWVzLFxuICAgIGluaXRpYWxJbmRleFxuICB9ID0gX3JlZjI7XG4gIGxldCBoaXN0b3J5UmVmID0gUmVhY3QudXNlUmVmKCk7XG5cbiAgaWYgKGhpc3RvcnlSZWYuY3VycmVudCA9PSBudWxsKSB7XG4gICAgaGlzdG9yeVJlZi5jdXJyZW50ID0gY3JlYXRlTWVtb3J5SGlzdG9yeSh7XG4gICAgICBpbml0aWFsRW50cmllcyxcbiAgICAgIGluaXRpYWxJbmRleCxcbiAgICAgIHY1Q29tcGF0OiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBsZXQgaGlzdG9yeSA9IGhpc3RvcnlSZWYuY3VycmVudDtcbiAgbGV0IFtzdGF0ZSwgc2V0U3RhdGVdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGFjdGlvbjogaGlzdG9yeS5hY3Rpb24sXG4gICAgbG9jYXRpb246IGhpc3RvcnkubG9jYXRpb25cbiAgfSk7XG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiBoaXN0b3J5Lmxpc3RlbihzZXRTdGF0ZSksIFtoaXN0b3J5XSk7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSb3V0ZXIsIHtcbiAgICBiYXNlbmFtZTogYmFzZW5hbWUsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGxvY2F0aW9uOiBzdGF0ZS5sb2NhdGlvbixcbiAgICBuYXZpZ2F0aW9uVHlwZTogc3RhdGUuYWN0aW9uLFxuICAgIG5hdmlnYXRvcjogaGlzdG9yeVxuICB9KTtcbn1cblxuLyoqXG4gKiBDaGFuZ2VzIHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICpcbiAqIE5vdGU6IFRoaXMgQVBJIGlzIG1vc3RseSB1c2VmdWwgaW4gUmVhY3QuQ29tcG9uZW50IHN1YmNsYXNzZXMgdGhhdCBhcmUgbm90XG4gKiBhYmxlIHRvIHVzZSBob29rcy4gSW4gZnVuY3Rpb25hbCBjb21wb25lbnRzLCB3ZSByZWNvbW1lbmQgeW91IHVzZSB0aGVcbiAqIGB1c2VOYXZpZ2F0ZWAgaG9vayBpbnN0ZWFkLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9jb21wb25lbnRzL25hdmlnYXRlXG4gKi9cbmZ1bmN0aW9uIE5hdmlnYXRlKF9yZWYzKSB7XG4gIGxldCB7XG4gICAgdG8sXG4gICAgcmVwbGFjZSxcbiAgICBzdGF0ZSxcbiAgICByZWxhdGl2ZVxuICB9ID0gX3JlZjM7XG4gICF1c2VJblJvdXRlckNvbnRleHQoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGludmFyaWFudChmYWxzZSwgLy8gVE9ETzogVGhpcyBlcnJvciBpcyBwcm9iYWJseSBiZWNhdXNlIHRoZXkgc29tZWhvdyBoYXZlIDIgdmVyc2lvbnMgb2ZcbiAgLy8gdGhlIHJvdXRlciBsb2FkZWQuIFdlIGNhbiBoZWxwIHRoZW0gdW5kZXJzdGFuZCBob3cgdG8gYXZvaWQgdGhhdC5cbiAgXCI8TmF2aWdhdGU+IG1heSBiZSB1c2VkIG9ubHkgaW4gdGhlIGNvbnRleHQgb2YgYSA8Um91dGVyPiBjb21wb25lbnQuXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyghUmVhY3QudXNlQ29udGV4dChOYXZpZ2F0aW9uQ29udGV4dCkuc3RhdGljLCBcIjxOYXZpZ2F0ZT4gbXVzdCBub3QgYmUgdXNlZCBvbiB0aGUgaW5pdGlhbCByZW5kZXIgaW4gYSA8U3RhdGljUm91dGVyPi4gXCIgKyBcIlRoaXMgaXMgYSBuby1vcCwgYnV0IHlvdSBzaG91bGQgbW9kaWZ5IHlvdXIgY29kZSBzbyB0aGUgPE5hdmlnYXRlPiBpcyBcIiArIFwib25seSBldmVyIHJlbmRlcmVkIGluIHJlc3BvbnNlIHRvIHNvbWUgdXNlciBpbnRlcmFjdGlvbiBvciBzdGF0ZSBjaGFuZ2UuXCIpIDogdm9pZCAwO1xuICBsZXQgZGF0YVJvdXRlclN0YXRlID0gUmVhY3QudXNlQ29udGV4dChEYXRhUm91dGVyU3RhdGVDb250ZXh0KTtcbiAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBBdm9pZCBraWNraW5nIG9mZiBtdWx0aXBsZSBuYXZpZ2F0aW9ucyBpZiB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGFcbiAgICAvLyBkYXRhLXJvdXRlciBuYXZpZ2F0aW9uLCBzaW5jZSBjb21wb25lbnRzIGdldCByZS1yZW5kZXJlZCB3aGVuIHdlIGVudGVyXG4gICAgLy8gYSBzdWJtaXR0aW5nL2xvYWRpbmcgc3RhdGVcbiAgICBpZiAoZGF0YVJvdXRlclN0YXRlICYmIGRhdGFSb3V0ZXJTdGF0ZS5uYXZpZ2F0aW9uLnN0YXRlICE9PSBcImlkbGVcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlKHRvLCB7XG4gICAgICByZXBsYWNlLFxuICAgICAgc3RhdGUsXG4gICAgICByZWxhdGl2ZVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmVuZGVycyB0aGUgY2hpbGQgcm91dGUncyBlbGVtZW50LCBpZiB0aGVyZSBpcyBvbmUuXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0cm91dGVyLmNvbS9kb2NzL2VuL3Y2L2NvbXBvbmVudHMvb3V0bGV0XG4gKi9cbmZ1bmN0aW9uIE91dGxldChwcm9wcykge1xuICByZXR1cm4gdXNlT3V0bGV0KHByb3BzLmNvbnRleHQpO1xufVxuXG4vKipcbiAqIERlY2xhcmVzIGFuIGVsZW1lbnQgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQgYXQgYSBjZXJ0YWluIFVSTCBwYXRoLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9jb21wb25lbnRzL3JvdXRlXG4gKi9cbmZ1bmN0aW9uIFJvdXRlKF9wcm9wcykge1xuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiQSA8Um91dGU+IGlzIG9ubHkgZXZlciB0byBiZSB1c2VkIGFzIHRoZSBjaGlsZCBvZiA8Um91dGVzPiBlbGVtZW50LCBcIiArIFwibmV2ZXIgcmVuZGVyZWQgZGlyZWN0bHkuIFBsZWFzZSB3cmFwIHlvdXIgPFJvdXRlPiBpbiBhIDxSb3V0ZXM+LlwiKSA6IGludmFyaWFudChmYWxzZSkgO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIGxvY2F0aW9uIGNvbnRleHQgZm9yIHRoZSByZXN0IG9mIHRoZSBhcHAuXG4gKlxuICogTm90ZTogWW91IHVzdWFsbHkgd29uJ3QgcmVuZGVyIGEgPFJvdXRlcj4gZGlyZWN0bHkuIEluc3RlYWQsIHlvdSdsbCByZW5kZXIgYVxuICogcm91dGVyIHRoYXQgaXMgbW9yZSBzcGVjaWZpYyB0byB5b3VyIGVudmlyb25tZW50IHN1Y2ggYXMgYSA8QnJvd3NlclJvdXRlcj5cbiAqIGluIHdlYiBicm93c2VycyBvciBhIDxTdGF0aWNSb3V0ZXI+IGZvciBzZXJ2ZXIgcmVuZGVyaW5nLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9yb3V0ZXJzL3JvdXRlclxuICovXG5mdW5jdGlvbiBSb3V0ZXIoX3JlZjQpIHtcbiAgbGV0IHtcbiAgICBiYXNlbmFtZTogYmFzZW5hbWVQcm9wID0gXCIvXCIsXG4gICAgY2hpbGRyZW4gPSBudWxsLFxuICAgIGxvY2F0aW9uOiBsb2NhdGlvblByb3AsXG4gICAgbmF2aWdhdGlvblR5cGUgPSBBY3Rpb24uUG9wLFxuICAgIG5hdmlnYXRvcixcbiAgICBzdGF0aWM6IHN0YXRpY1Byb3AgPSBmYWxzZVxuICB9ID0gX3JlZjQ7XG4gICEhdXNlSW5Sb3V0ZXJDb250ZXh0KCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiWW91IGNhbm5vdCByZW5kZXIgYSA8Um91dGVyPiBpbnNpZGUgYW5vdGhlciA8Um91dGVyPi5cIiArIFwiIFlvdSBzaG91bGQgbmV2ZXIgaGF2ZSBtb3JlIHRoYW4gb25lIGluIHlvdXIgYXBwLlwiKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7IC8vIFByZXNlcnZlIHRyYWlsaW5nIHNsYXNoZXMgb24gYmFzZW5hbWUsIHNvIHdlIGNhbiBsZXQgdGhlIHVzZXIgY29udHJvbFxuICAvLyB0aGUgZW5mb3JjZW1lbnQgb2YgdHJhaWxpbmcgc2xhc2hlcyB0aHJvdWdob3V0IHRoZSBhcHBcblxuICBsZXQgYmFzZW5hbWUgPSBiYXNlbmFtZVByb3AucmVwbGFjZSgvXlxcLyovLCBcIi9cIik7XG4gIGxldCBuYXZpZ2F0aW9uQ29udGV4dCA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gKHtcbiAgICBiYXNlbmFtZSxcbiAgICBuYXZpZ2F0b3IsXG4gICAgc3RhdGljOiBzdGF0aWNQcm9wXG4gIH0pLCBbYmFzZW5hbWUsIG5hdmlnYXRvciwgc3RhdGljUHJvcF0pO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb25Qcm9wID09PSBcInN0cmluZ1wiKSB7XG4gICAgbG9jYXRpb25Qcm9wID0gcGFyc2VQYXRoKGxvY2F0aW9uUHJvcCk7XG4gIH1cblxuICBsZXQge1xuICAgIHBhdGhuYW1lID0gXCIvXCIsXG4gICAgc2VhcmNoID0gXCJcIixcbiAgICBoYXNoID0gXCJcIixcbiAgICBzdGF0ZSA9IG51bGwsXG4gICAga2V5ID0gXCJkZWZhdWx0XCJcbiAgfSA9IGxvY2F0aW9uUHJvcDtcbiAgbGV0IGxvY2F0aW9uID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgbGV0IHRyYWlsaW5nUGF0aG5hbWUgPSBzdHJpcEJhc2VuYW1lKHBhdGhuYW1lLCBiYXNlbmFtZSk7XG5cbiAgICBpZiAodHJhaWxpbmdQYXRobmFtZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aG5hbWU6IHRyYWlsaW5nUGF0aG5hbWUsXG4gICAgICBzZWFyY2gsXG4gICAgICBoYXNoLFxuICAgICAgc3RhdGUsXG4gICAgICBrZXlcbiAgICB9O1xuICB9LCBbYmFzZW5hbWUsIHBhdGhuYW1lLCBzZWFyY2gsIGhhc2gsIHN0YXRlLCBrZXldKTtcbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gd2FybmluZyhsb2NhdGlvbiAhPSBudWxsLCBcIjxSb3V0ZXIgYmFzZW5hbWU9XFxcIlwiICsgYmFzZW5hbWUgKyBcIlxcXCI+IGlzIG5vdCBhYmxlIHRvIG1hdGNoIHRoZSBVUkwgXCIgKyAoXCJcXFwiXCIgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2ggKyBcIlxcXCIgYmVjYXVzZSBpdCBkb2VzIG5vdCBzdGFydCB3aXRoIHRoZSBcIikgKyBcImJhc2VuYW1lLCBzbyB0aGUgPFJvdXRlcj4gd29uJ3QgcmVuZGVyIGFueXRoaW5nLlwiKSA6IHZvaWQgMDtcblxuICBpZiAobG9jYXRpb24gPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KE5hdmlnYXRpb25Db250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IG5hdmlnYXRpb25Db250ZXh0XG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KExvY2F0aW9uQ29udGV4dC5Qcm92aWRlciwge1xuICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICB2YWx1ZToge1xuICAgICAgbG9jYXRpb24sXG4gICAgICBuYXZpZ2F0aW9uVHlwZVxuICAgIH1cbiAgfSkpO1xufVxuXG4vKipcbiAqIEEgY29udGFpbmVyIGZvciBhIG5lc3RlZCB0cmVlIG9mIDxSb3V0ZT4gZWxlbWVudHMgdGhhdCByZW5kZXJzIHRoZSBicmFuY2hcbiAqIHRoYXQgYmVzdCBtYXRjaGVzIHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdHJvdXRlci5jb20vZG9jcy9lbi92Ni9jb21wb25lbnRzL3JvdXRlc1xuICovXG5mdW5jdGlvbiBSb3V0ZXMoX3JlZjUpIHtcbiAgbGV0IHtcbiAgICBjaGlsZHJlbixcbiAgICBsb2NhdGlvblxuICB9ID0gX3JlZjU7XG4gIGxldCBkYXRhUm91dGVyQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGF0YVJvdXRlckNvbnRleHQpOyAvLyBXaGVuIGluIGEgRGF0YVJvdXRlckNvbnRleHQgX3dpdGhvdXRfIGNoaWxkcmVuLCB3ZSB1c2UgdGhlIHJvdXRlciByb3V0ZXNcbiAgLy8gZGlyZWN0bHkuICBJZiB3ZSBoYXZlIGNoaWxkcmVuLCB0aGVuIHdlJ3JlIGluIGEgZGVzY2VuZGFudCB0cmVlIGFuZCB3ZVxuICAvLyBuZWVkIHRvIHVzZSBjaGlsZCByb3V0ZXMuXG5cbiAgbGV0IHJvdXRlcyA9IGRhdGFSb3V0ZXJDb250ZXh0ICYmICFjaGlsZHJlbiA/IGRhdGFSb3V0ZXJDb250ZXh0LnJvdXRlci5yb3V0ZXMgOiBjcmVhdGVSb3V0ZXNGcm9tQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICByZXR1cm4gdXNlUm91dGVzKHJvdXRlcywgbG9jYXRpb24pO1xufVxuXG4vKipcbiAqIENvbXBvbmVudCB0byB1c2UgZm9yIHJlbmRlcmluZyBsYXppbHkgbG9hZGVkIGRhdGEgZnJvbSByZXR1cm5pbmcgZGVmZXIoKVxuICogaW4gYSBsb2FkZXIgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gQXdhaXQoX3JlZjYpIHtcbiAgbGV0IHtcbiAgICBjaGlsZHJlbixcbiAgICBlcnJvckVsZW1lbnQsXG4gICAgcmVzb2x2ZVxuICB9ID0gX3JlZjY7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBd2FpdEVycm9yQm91bmRhcnksIHtcbiAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgIGVycm9yRWxlbWVudDogZXJyb3JFbGVtZW50XG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlc29sdmVBd2FpdCwgbnVsbCwgY2hpbGRyZW4pKTtcbn1cbnZhciBBd2FpdFJlbmRlclN0YXR1cztcblxuKGZ1bmN0aW9uIChBd2FpdFJlbmRlclN0YXR1cykge1xuICBBd2FpdFJlbmRlclN0YXR1c1tBd2FpdFJlbmRlclN0YXR1c1tcInBlbmRpbmdcIl0gPSAwXSA9IFwicGVuZGluZ1wiO1xuICBBd2FpdFJlbmRlclN0YXR1c1tBd2FpdFJlbmRlclN0YXR1c1tcInN1Y2Nlc3NcIl0gPSAxXSA9IFwic3VjY2Vzc1wiO1xuICBBd2FpdFJlbmRlclN0YXR1c1tBd2FpdFJlbmRlclN0YXR1c1tcImVycm9yXCJdID0gMl0gPSBcImVycm9yXCI7XG59KShBd2FpdFJlbmRlclN0YXR1cyB8fCAoQXdhaXRSZW5kZXJTdGF0dXMgPSB7fSkpO1xuXG5jb25zdCBuZXZlclNldHRsZWRQcm9taXNlID0gbmV3IFByb21pc2UoKCkgPT4ge30pO1xuXG5jbGFzcyBBd2FpdEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3I6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvclxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgZXJyb3JJbmZvKSB7XG4gICAgY29uc29sZS5lcnJvcihcIjxBd2FpdD4gY2F1Z2h0IHRoZSBmb2xsb3dpbmcgZXJyb3IgZHVyaW5nIHJlbmRlclwiLCBlcnJvciwgZXJyb3JJbmZvKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBlcnJvckVsZW1lbnQsXG4gICAgICByZXNvbHZlXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHByb21pc2UgPSBudWxsO1xuICAgIGxldCBzdGF0dXMgPSBBd2FpdFJlbmRlclN0YXR1cy5wZW5kaW5nO1xuXG4gICAgaWYgKCEocmVzb2x2ZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgICAvLyBEaWRuJ3QgZ2V0IGEgcHJvbWlzZSAtIHByb3ZpZGUgYXMgYSByZXNvbHZlZCBwcm9taXNlXG4gICAgICBzdGF0dXMgPSBBd2FpdFJlbmRlclN0YXR1cy5zdWNjZXNzO1xuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsIFwiX3RyYWNrZWRcIiwge1xuICAgICAgICBnZXQ6ICgpID0+IHRydWVcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb21pc2UsIFwiX2RhdGFcIiwge1xuICAgICAgICBnZXQ6ICgpID0+IHJlc29sdmVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5lcnJvcikge1xuICAgICAgLy8gQ2F1Z2h0IGEgcmVuZGVyIGVycm9yLCBwcm92aWRlIGl0IGFzIGEgcmVqZWN0ZWQgcHJvbWlzZVxuICAgICAgc3RhdHVzID0gQXdhaXRSZW5kZXJTdGF0dXMuZXJyb3I7XG4gICAgICBsZXQgcmVuZGVyRXJyb3IgPSB0aGlzLnN0YXRlLmVycm9yO1xuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KCkuY2F0Y2goKCkgPT4ge30pOyAvLyBBdm9pZCB1bmhhbmRsZWQgcmVqZWN0aW9uIHdhcm5pbmdzXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9taXNlLCBcIl90cmFja2VkXCIsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiB0cnVlXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9taXNlLCBcIl9lcnJvclwiLCB7XG4gICAgICAgIGdldDogKCkgPT4gcmVuZGVyRXJyb3JcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocmVzb2x2ZS5fdHJhY2tlZCkge1xuICAgICAgLy8gQWxyZWFkeSB0cmFja2VkIHByb21pc2UgLSBjaGVjayBjb250ZW50c1xuICAgICAgcHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICBzdGF0dXMgPSBwcm9taXNlLl9lcnJvciAhPT0gdW5kZWZpbmVkID8gQXdhaXRSZW5kZXJTdGF0dXMuZXJyb3IgOiBwcm9taXNlLl9kYXRhICE9PSB1bmRlZmluZWQgPyBBd2FpdFJlbmRlclN0YXR1cy5zdWNjZXNzIDogQXdhaXRSZW5kZXJTdGF0dXMucGVuZGluZztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmF3ICh1bnRyYWNrZWQpIHByb21pc2UgLSB0cmFjayBpdFxuICAgICAgc3RhdHVzID0gQXdhaXRSZW5kZXJTdGF0dXMucGVuZGluZztcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXNvbHZlLCBcIl90cmFja2VkXCIsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHByb21pc2UgPSByZXNvbHZlLnRoZW4oZGF0YSA9PiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzb2x2ZSwgXCJfZGF0YVwiLCB7XG4gICAgICAgIGdldDogKCkgPT4gZGF0YVxuICAgICAgfSksIGVycm9yID0+IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXNvbHZlLCBcIl9lcnJvclwiLCB7XG4gICAgICAgIGdldDogKCkgPT4gZXJyb3JcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzID09PSBBd2FpdFJlbmRlclN0YXR1cy5lcnJvciAmJiBwcm9taXNlLl9lcnJvciBpbnN0YW5jZW9mIEFib3J0ZWREZWZlcnJlZEVycm9yKSB7XG4gICAgICAvLyBGcmVlemUgdGhlIFVJIGJ5IHRocm93aW5nIGEgbmV2ZXIgcmVzb2x2ZWQgcHJvbWlzZVxuICAgICAgdGhyb3cgbmV2ZXJTZXR0bGVkUHJvbWlzZTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzID09PSBBd2FpdFJlbmRlclN0YXR1cy5lcnJvciAmJiAhZXJyb3JFbGVtZW50KSB7XG4gICAgICAvLyBObyBlcnJvckVsZW1lbnQsIHRocm93IHRvIHRoZSBuZWFyZXN0IHJvdXRlLWxldmVsIGVycm9yIGJvdW5kYXJ5XG4gICAgICB0aHJvdyBwcm9taXNlLl9lcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzID09PSBBd2FpdFJlbmRlclN0YXR1cy5lcnJvcikge1xuICAgICAgLy8gUmVuZGVyIHZpYSBvdXIgZXJyb3JFbGVtZW50XG4gICAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQXdhaXRDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICAgIHZhbHVlOiBwcm9taXNlLFxuICAgICAgICBjaGlsZHJlbjogZXJyb3JFbGVtZW50XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzID09PSBBd2FpdFJlbmRlclN0YXR1cy5zdWNjZXNzKSB7XG4gICAgICAvLyBSZW5kZXIgY2hpbGRyZW4gd2l0aCByZXNvbHZlZCB2YWx1ZVxuICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KEF3YWl0Q29udGV4dC5Qcm92aWRlciwge1xuICAgICAgICB2YWx1ZTogcHJvbWlzZSxcbiAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgICB9KTtcbiAgICB9IC8vIFRocm93IHRvIHRoZSBzdXNwZW5zZSBib3VuZGFyeVxuXG5cbiAgICB0aHJvdyBwcm9taXNlO1xuICB9XG5cbn1cbi8qKlxuICogQHByaXZhdGVcbiAqIEluZGlyZWN0aW9uIHRvIGxldmVyYWdlIHVzZUFzeW5jVmFsdWUgZm9yIGEgcmVuZGVyLXByb3AgQVBJIG9uIDxBd2FpdD5cbiAqL1xuXG5cbmZ1bmN0aW9uIFJlc29sdmVBd2FpdChfcmVmNykge1xuICBsZXQge1xuICAgIGNoaWxkcmVuXG4gIH0gPSBfcmVmNztcbiAgbGV0IGRhdGEgPSB1c2VBc3luY1ZhbHVlKCk7XG5cbiAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuKGRhdGEpO1xuICB9XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBjaGlsZHJlbik7XG59IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFVUSUxTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8qKlxuICogQ3JlYXRlcyBhIHJvdXRlIGNvbmZpZyBmcm9tIGEgUmVhY3QgXCJjaGlsZHJlblwiIG9iamVjdCwgd2hpY2ggaXMgdXN1YWxseVxuICogZWl0aGVyIGEgYDxSb3V0ZT5gIGVsZW1lbnQgb3IgYW4gYXJyYXkgb2YgdGhlbS4gVXNlZCBpbnRlcm5hbGx5IGJ5XG4gKiBgPFJvdXRlcz5gIHRvIGNyZWF0ZSBhIHJvdXRlIGNvbmZpZyBmcm9tIGl0cyBjaGlsZHJlbi5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Ryb3V0ZXIuY29tL2RvY3MvZW4vdjYvdXRpbHMvY3JlYXRlLXJvdXRlcy1mcm9tLWNoaWxkcmVuXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXNGcm9tQ2hpbGRyZW4oY2hpbGRyZW4sIHBhcmVudFBhdGgpIHtcbiAgaWYgKHBhcmVudFBhdGggPT09IHZvaWQgMCkge1xuICAgIHBhcmVudFBhdGggPSBbXTtcbiAgfVxuXG4gIGxldCByb3V0ZXMgPSBbXTtcbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgaWYgKCEgLyojX19QVVJFX18qL1JlYWN0LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAvLyBJZ25vcmUgbm9uLWVsZW1lbnRzLiBUaGlzIGFsbG93cyBwZW9wbGUgdG8gbW9yZSBlYXNpbHkgaW5saW5lXG4gICAgICAvLyBjb25kaXRpb25hbHMgaW4gdGhlaXIgcm91dGUgY29uZmlnLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50LnR5cGUgPT09IFJlYWN0LkZyYWdtZW50KSB7XG4gICAgICAvLyBUcmFuc3BhcmVudGx5IHN1cHBvcnQgUmVhY3QuRnJhZ21lbnQgYW5kIGl0cyBjaGlsZHJlbi5cbiAgICAgIHJvdXRlcy5wdXNoLmFwcGx5KHJvdXRlcywgY3JlYXRlUm91dGVzRnJvbUNoaWxkcmVuKGVsZW1lbnQucHJvcHMuY2hpbGRyZW4sIHBhcmVudFBhdGgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAhKGVsZW1lbnQudHlwZSA9PT0gUm91dGUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIltcIiArICh0eXBlb2YgZWxlbWVudC50eXBlID09PSBcInN0cmluZ1wiID8gZWxlbWVudC50eXBlIDogZWxlbWVudC50eXBlLm5hbWUpICsgXCJdIGlzIG5vdCBhIDxSb3V0ZT4gY29tcG9uZW50LiBBbGwgY29tcG9uZW50IGNoaWxkcmVuIG9mIDxSb3V0ZXM+IG11c3QgYmUgYSA8Um91dGU+IG9yIDxSZWFjdC5GcmFnbWVudD5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICEoIWVsZW1lbnQucHJvcHMuaW5kZXggfHwgIWVsZW1lbnQucHJvcHMuY2hpbGRyZW4pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gaW52YXJpYW50KGZhbHNlLCBcIkFuIGluZGV4IHJvdXRlIGNhbm5vdCBoYXZlIGNoaWxkIHJvdXRlcy5cIikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGxldCB0cmVlUGF0aCA9IFsuLi5wYXJlbnRQYXRoLCBpbmRleF07XG4gICAgbGV0IHJvdXRlID0ge1xuICAgICAgaWQ6IGVsZW1lbnQucHJvcHMuaWQgfHwgdHJlZVBhdGguam9pbihcIi1cIiksXG4gICAgICBjYXNlU2Vuc2l0aXZlOiBlbGVtZW50LnByb3BzLmNhc2VTZW5zaXRpdmUsXG4gICAgICBlbGVtZW50OiBlbGVtZW50LnByb3BzLmVsZW1lbnQsXG4gICAgICBpbmRleDogZWxlbWVudC5wcm9wcy5pbmRleCxcbiAgICAgIHBhdGg6IGVsZW1lbnQucHJvcHMucGF0aCxcbiAgICAgIGxvYWRlcjogZWxlbWVudC5wcm9wcy5sb2FkZXIsXG4gICAgICBhY3Rpb246IGVsZW1lbnQucHJvcHMuYWN0aW9uLFxuICAgICAgZXJyb3JFbGVtZW50OiBlbGVtZW50LnByb3BzLmVycm9yRWxlbWVudCxcbiAgICAgIGhhc0Vycm9yQm91bmRhcnk6IGVsZW1lbnQucHJvcHMuZXJyb3JFbGVtZW50ICE9IG51bGwsXG4gICAgICBzaG91bGRSZXZhbGlkYXRlOiBlbGVtZW50LnByb3BzLnNob3VsZFJldmFsaWRhdGUsXG4gICAgICBoYW5kbGU6IGVsZW1lbnQucHJvcHMuaGFuZGxlXG4gICAgfTtcblxuICAgIGlmIChlbGVtZW50LnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICByb3V0ZS5jaGlsZHJlbiA9IGNyZWF0ZVJvdXRlc0Zyb21DaGlsZHJlbihlbGVtZW50LnByb3BzLmNoaWxkcmVuLCB0cmVlUGF0aCk7XG4gICAgfVxuXG4gICAgcm91dGVzLnB1c2gocm91dGUpO1xuICB9KTtcbiAgcmV0dXJuIHJvdXRlcztcbn1cbi8qKlxuICogUmVuZGVycyB0aGUgcmVzdWx0IG9mIGBtYXRjaFJvdXRlcygpYCBpbnRvIGEgUmVhY3QgZWxlbWVudC5cbiAqL1xuXG5mdW5jdGlvbiByZW5kZXJNYXRjaGVzKG1hdGNoZXMpIHtcbiAgcmV0dXJuIF9yZW5kZXJNYXRjaGVzKG1hdGNoZXMpO1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICogV2FsayB0aGUgcm91dGUgdHJlZSBhbmQgYWRkIGhhc0Vycm9yQm91bmRhcnkgaWYgaXQncyBub3QgcHJvdmlkZWQsIHNvIHRoYXRcbiAqIHVzZXJzIHByb3ZpZGluZyBtYW51YWwgcm91dGUgYXJyYXlzIGNhbiBqdXN0IHNwZWNpZnkgZXJyb3JFbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cyhyb3V0ZXMpIHtcbiAgcmV0dXJuIHJvdXRlcy5tYXAocm91dGUgPT4ge1xuICAgIGxldCByb3V0ZUNsb25lID0gX2V4dGVuZHMoe30sIHJvdXRlKTtcblxuICAgIGlmIChyb3V0ZUNsb25lLmhhc0Vycm9yQm91bmRhcnkgPT0gbnVsbCkge1xuICAgICAgcm91dGVDbG9uZS5oYXNFcnJvckJvdW5kYXJ5ID0gcm91dGVDbG9uZS5lcnJvckVsZW1lbnQgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocm91dGVDbG9uZS5jaGlsZHJlbikge1xuICAgICAgcm91dGVDbG9uZS5jaGlsZHJlbiA9IGVuaGFuY2VNYW51YWxSb3V0ZU9iamVjdHMocm91dGVDbG9uZS5jaGlsZHJlbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvdXRlQ2xvbmU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlSb3V0ZXIocm91dGVzLCBvcHRzKSB7XG4gIHJldHVybiBjcmVhdGVSb3V0ZXIoe1xuICAgIGJhc2VuYW1lOiBvcHRzID09IG51bGwgPyB2b2lkIDAgOiBvcHRzLmJhc2VuYW1lLFxuICAgIGhpc3Rvcnk6IGNyZWF0ZU1lbW9yeUhpc3Rvcnkoe1xuICAgICAgaW5pdGlhbEVudHJpZXM6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuaW5pdGlhbEVudHJpZXMsXG4gICAgICBpbml0aWFsSW5kZXg6IG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuaW5pdGlhbEluZGV4XG4gICAgfSksXG4gICAgaHlkcmF0aW9uRGF0YTogb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5oeWRyYXRpb25EYXRhLFxuICAgIHJvdXRlczogZW5oYW5jZU1hbnVhbFJvdXRlT2JqZWN0cyhyb3V0ZXMpXG4gIH0pLmluaXRpYWxpemUoKTtcbn0gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgeyBBd2FpdCwgTWVtb3J5Um91dGVyLCBOYXZpZ2F0ZSwgT3V0bGV0LCBSb3V0ZSwgUm91dGVyLCBSb3V0ZXJQcm92aWRlciwgUm91dGVzLCBEYXRhUm91dGVyQ29udGV4dCBhcyBVTlNBRkVfRGF0YVJvdXRlckNvbnRleHQsIERhdGFSb3V0ZXJTdGF0ZUNvbnRleHQgYXMgVU5TQUZFX0RhdGFSb3V0ZXJTdGF0ZUNvbnRleHQsIERhdGFTdGF0aWNSb3V0ZXJDb250ZXh0IGFzIFVOU0FGRV9EYXRhU3RhdGljUm91dGVyQ29udGV4dCwgTG9jYXRpb25Db250ZXh0IGFzIFVOU0FGRV9Mb2NhdGlvbkNvbnRleHQsIE5hdmlnYXRpb25Db250ZXh0IGFzIFVOU0FGRV9OYXZpZ2F0aW9uQ29udGV4dCwgUm91dGVDb250ZXh0IGFzIFVOU0FGRV9Sb3V0ZUNvbnRleHQsIGVuaGFuY2VNYW51YWxSb3V0ZU9iamVjdHMgYXMgVU5TQUZFX2VuaGFuY2VNYW51YWxSb3V0ZU9iamVjdHMsIGNyZWF0ZU1lbW9yeVJvdXRlciwgY3JlYXRlUm91dGVzRnJvbUNoaWxkcmVuLCBjcmVhdGVSb3V0ZXNGcm9tQ2hpbGRyZW4gYXMgY3JlYXRlUm91dGVzRnJvbUVsZW1lbnRzLCByZW5kZXJNYXRjaGVzLCB1c2VBY3Rpb25EYXRhLCB1c2VBc3luY0Vycm9yLCB1c2VBc3luY1ZhbHVlLCB1c2VIcmVmLCB1c2VJblJvdXRlckNvbnRleHQsIHVzZUxvYWRlckRhdGEsIHVzZUxvY2F0aW9uLCB1c2VNYXRjaCwgdXNlTWF0Y2hlcywgdXNlTmF2aWdhdGUsIHVzZU5hdmlnYXRpb24sIHVzZU5hdmlnYXRpb25UeXBlLCB1c2VPdXRsZXQsIHVzZU91dGxldENvbnRleHQsIHVzZVBhcmFtcywgdXNlUmVzb2x2ZWRQYXRoLCB1c2VSZXZhbGlkYXRvciwgdXNlUm91dGVFcnJvciwgdXNlUm91dGVMb2FkZXJEYXRhLCB1c2VSb3V0ZXMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMDNjYTRhMzhhZjJhNDEzYmZlMjZcIikiXSwibmFtZXMiOlsiUmVhY3QiLCJMaW5rIiwiTmF2YmFyIiwiUmVhY3RET00iLCJDYXJzTWFuYWdlciIsIkFkZENhciIsIlJvdXRlIiwiUm91dGVzIiwiQXBwIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=