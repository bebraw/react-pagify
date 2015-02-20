(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactPagify"] = factory(require("react"));
	else
		root["ReactPagify"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var segmentize = __webpack_require__(2);


	var Paginator = React.createClass({displayName: "Paginator",
	    render:function() {
	        var onSelect = this.props.onSelect || noop;
	        var page = this.props.page;

	        var segments = segmentize(this.props);
	        segments = segments.reduce(function(a, b) {
	            return a.concat(-1).concat(b);
	        });

	        return React.createElement("ul", {className: "pagination"}, 
	            segments.map(function(num, i) 
	                {return num >= 0? React.createElement("li", {
	                    key: 'pagination-' + i, 
	                    onClick: onSelect.bind(null, num), 
	                    className: num === page && 'selected'}, 
	                    React.createElement("a", {href: "#", onClick: this.preventDefault}, 
	                        num + 1
	                    )
	                ): React.createElement("li", {key: 'pagination-' + i}, "…");}.bind(this)
	            )
	        )
	    },

	    preventDefault:function(e) {
	        e.preventDefault();
	    },
	});

	function paginate(data, o) {
	    data = data || [];

	    var page = o.page || 0;
	    var perPage = o.perPage;

	    var amountOfPages = Math.ceil(data.length / perPage);
	    var startPage = page < amountOfPages? page: 0;

	    return {
	        amount: amountOfPages,
	        data: data.slice(startPage * perPage, startPage * perPage + perPage),
	        page: startPage
	    };
	}

	function noop() {}

	Paginator.paginate = paginate;

	module.exports = Paginator;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var intersect = __webpack_require__(4);
	var uniq = __webpack_require__(5);

	var range = __webpack_require__(3);


	module.exports = function(o) {
	    var page = o.page;
	    var pages = o.pages;
	    var beginPages = o.beginPages? range(Math.min(o.beginPages, pages)): [];
	    var endPages = o.endPages? range(Math.max(pages - o.endPages, 0), pages): [];
	    var center, ret;

	    if(page === 0) {
	        ret = [[0]];

	        if(pages > 1) {
	            beginPages = [0, 1];

	            ret = [beginPages, difference(endPages, beginPages)].filter(function(a)  {return a.length;});
	        }

	        return ret;
	    }

	    if(page === pages - 1) {
	        endPages = [pages - 2, pages - 1];

	        return [beginPages, difference(endPages, beginPages)].filter(function(a)  {return a.length;});
	    }

	    center = [page - 1, page, page + 1];

	    if(intersect(beginPages, center).length) {
	        beginPages = uniq(beginPages.concat(center));
	        center = [];
	    }

	    if(intersect(center, endPages).length) {
	        endPages = uniq(center.concat(endPages));
	        center = [];
	    }

	    return[beginPages, center, endPages].filter(function(a)  {return a.length;});
	};

	function difference(a, b) {
	    return a.filter(function(v)  {return b.indexOf(v) < 0;});
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = function(a, b) {
	    var ret = [];
	    var i = b? a: 0;
	    var len = b? b: a;

	    for(; i < len; i++) {
	        ret.push(i);
	    }

	    return ret;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = intersect;

	function intersect (a, b) {
	  var res = [];
	  for (var i = 0; i < a.length; i++) {
	    if (indexOf(b, a[i]) > -1) res.push(a[i]);
	  }
	  return res;
	}

	intersect.big = function(a, b) {
	  var ret = [];
	  var temp = {};
	  
	  for (var i = 0; i < b.length; i++) {
	    temp[b[i]] = true;
	  }
	  for (var i = 0; i < a.length; i++) {
	    if (temp[a[i]]) ret.push(a[i]);
	  }
	  
	  return ret;
	}

	function indexOf(arr, el) {
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i] === el) return i;
	  }
	  return -1;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	function unique_pred(list, compare) {
	  var ptr = 1
	    , len = list.length
	    , a=list[0], b=list[0]
	  for(var i=1; i<len; ++i) {
	    b = a
	    a = list[i]
	    if(compare(a, b)) {
	      if(i === ptr) {
	        ptr++
	        continue
	      }
	      list[ptr++] = a
	    }
	  }
	  list.length = ptr
	  return list
	}

	function unique_eq(list) {
	  var ptr = 1
	    , len = list.length
	    , a=list[0], b = list[0]
	  for(var i=1; i<len; ++i, b=a) {
	    b = a
	    a = list[i]
	    if(a !== b) {
	      if(i === ptr) {
	        ptr++
	        continue
	      }
	      list[ptr++] = a
	    }
	  }
	  list.length = ptr
	  return list
	}

	function unique(list, compare, sorted) {
	  if(list.length === 0) {
	    return list
	  }
	  if(compare) {
	    if(!sorted) {
	      list.sort(compare)
	    }
	    return unique_pred(list, compare)
	  }
	  if(!sorted) {
	    list.sort()
	  }
	  return unique_eq(list)
	}

	module.exports = unique


/***/ }
/******/ ])
});
