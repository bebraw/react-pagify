(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactPagify"] = factory(require("react"));
	else
		root["ReactPagify"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var np = __webpack_require__(2);
	var segmentize = __webpack_require__(3);

	var Paginator = React.createClass({
	    displayName: 'Paginator',

	    propTypes: {
	        onSelect: React.PropTypes.func,
	        page: React.PropTypes.number,
	        beginPages: React.PropTypes.number,
	        endPages: React.PropTypes.number,
	        showPrevNext: React.PropTypes.bool,
	        alwaysShowPrevNext: React.PropTypes.bool,
	        className: React.PropTypes.string,
	        ellipsesClassName: React.PropTypes.string,
	        prevClassName: React.PropTypes.string,
	        nextClassName: React.PropTypes.string,
	        inactiveClassName: React.PropTypes.string,
	        prevButton: React.PropTypes.node,
	        nextButton: React.PropTypes.node
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            onSelect: noop,
	            showPrevNext: false,
	            className: 'pagify-pagination',
	            ellipsesClassName: '',
	            prevClassName: 'pagify-prev',
	            nextClassName: 'pagify-next',
	            inactiveClassName: 'pagify-disabled'
	        };
	    },
	    render: function render() {
	        var _this = this;

	        var _props = this.props;
	        var onSelect = _props.onSelect;
	        var page = _props.page;
	        var ellipsesClassName = _props.ellipsesClassName;
	        var className = _props.className;
	        var showPrevNext = _props.showPrevNext;
	        var alwaysShowPrevNext = _props.alwaysShowPrevNext;
	        var prevClassName = _props.prevClassName;
	        var nextClassName = _props.nextClassName;
	        var inactiveClassName = _props.inactiveClassName;

	        var segments = segmentize(this.props);
	        segments = segments.reduce(function (a, b) {
	            return a.concat(-1).concat(b);
	        });

	        var items = segments.map(function (num, i) {
	            if (num >= 0) {
	                return React.createElement(
	                    'li',
	                    {
	                        key: 'pagination-' + i,
	                        onClick: onSelect.bind(null, num),
	                        className: num === page && 'selected'
	                    },
	                    React.createElement(
	                        'a',
	                        { href: '#', onClick: _this.preventDefault },
	                        num + 1
	                    )
	                );
	            }

	            return React.createElement(
	                'li',
	                {
	                    key: 'pagination-' + i,
	                    className: ellipsesClassName
	                },
	                '…'
	            );
	        });

	        var lastPage = segments[segments.length - 1];

	        var isFirstPage = page === 0;
	        var isLastPage = page === lastPage;

	        prevClassName += np.maybeAddInactive(isFirstPage, alwaysShowPrevNext, inactiveClassName);
	        nextClassName += np.maybeAddInactive(isLastPage, alwaysShowPrevNext, inactiveClassName);

	        var prevButton = React.createElement(
	            'li',
	            {
	                onClick: onSelect.bind(null, np.prev(page)),
	                className: prevClassName
	            },
	            React.createElement(
	                'a',
	                { href: '#', onClick: this.preventDefault },
	                this.props.prevButton ? this.props.prevButton : 'Previous'
	            )
	        );

	        var nextButton = React.createElement(
	            'li',
	            {
	                onClick: onSelect.bind(null, np.next(page, lastPage)),
	                className: nextClassName
	            },
	            React.createElement(
	                'a',
	                { href: '#', onClick: this.preventDefault },
	                this.props.nextButton ? this.props.nextButton : 'Next'
	            )
	        );

	        return React.createElement(
	            'ul',
	            { className: className },
	            (alwaysShowPrevNext || showPrevNext && !isFirstPage) && prevButton,
	            items,
	            (alwaysShowPrevNext || showPrevNext && !isLastPage) && nextButton
	        );
	    },

	    preventDefault: function preventDefault(e) {
	        e.preventDefault();
	    }
	});

	function paginate(data, o) {
	    data = data || [];

	    var page = o.page || 0;
	    var perPage = o.perPage;

	    var amountOfPages = Math.ceil(data.length / perPage);
	    var startPage = page < amountOfPages ? page : 0;

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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    // Increment page, unless it is >= lastPage, then return lastPage.
	    next: function next(page, lastPage) {
	        return page >= lastPage ? lastPage : page + 1;
	    },

	    // Decrement page, unless it is <= firstPage, then return firstPage.
	    prev: function prev(page, firstPage) {
	        firstPage = firstPage || 0;
	        return page <= firstPage ? firstPage : page - 1;
	    },

	    // Return the inactiveClassName if it should be added.
	    maybeAddInactive: function maybeAddInactive(isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName) {
	        if (isFirstOrLastPage && alwaysShowPrevNext && inactiveClassName) {
	            return ' ' + inactiveClassName;
	        }
	        return '';
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var intersect = __webpack_require__(4);
	var uniq = __webpack_require__(5);

	var range = __webpack_require__(6);

	module.exports = function (o) {
	    var page = o.page;
	    var pages = o.pages;
	    var beginPages = o.beginPages ? range(Math.min(o.beginPages, pages)) : [];
	    var endPages = o.endPages ? range(Math.max(pages - o.endPages, 0), pages) : [];
	    var center, ret;

	    if (beginPages.length + endPages.length >= pages) {
	        return [range(pages)];
	    }

	    if (page === 0) {
	        ret = [[0]];

	        if (pages > 1) {
	            if (!beginPages.length) {
	                beginPages = [0, 1];
	            }

	            ret = [beginPages, difference(endPages, beginPages)].filter(function (a) {
	                return a.length;
	            });
	        }

	        return ret;
	    }

	    if (page === pages - 1) {
	        endPages = [pages - 2, pages - 1];

	        return [beginPages, difference(endPages, beginPages)].filter(function (a) {
	            return a.length;
	        });
	    }

	    center = [page - 1, page, page + 1];

	    if (intersect(beginPages, center).length) {
	        beginPages = uniq(beginPages.concat(center)).sort(function (a, b) {
	            return a > b;
	        });
	        center = [];
	    }

	    if (intersect(center, endPages).length) {
	        endPages = uniq(center.concat(endPages)).sort(function (a, b) {
	            return a > b;
	        });
	        center = [];
	    }

	    if (!center.length && beginPages.length === endPages.length && beginPages.every(function (page, i) {
	        return page === endPages[i];
	    })) {
	        return [beginPages];
	    }

	    if (!center.length && intersect(beginPages, endPages).length || endPages[0] - beginPages.slice(-1)[0] === 1) {
	        return [uniq(beginPages.concat(endPages)).sort(function (a, b) {
	            return a > b;
	        })];
	    }

	    if (center[0] - beginPages.slice(-1)[0] === 1) {
	        return [beginPages.concat(center), endPages];
	    }

	    if (endPages[0] - center.slice(-1)[0] === 1) {
	        return [beginPages, center.concat(endPages)];
	    }

	    return [beginPages, center, endPages].filter(function (a) {
	        return a.length;
	    });
	};

	function difference(a, b) {
	    return a.filter(function (v) {
	        return b.indexOf(v) < 0;
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = intersect;

	function many (sets) {
	  var o = {};
	  var l = sets.length - 1;
	  var first = sets[0];
	  var last = sets[l];
	  
	  for(var i in first) o[first[i]] = 0;
	  
	  for(var i = 1; i <= l; i++) {
	    var row = sets[i];
	    for(var j in row) {
	      var key = row[j];
	      if(o[key] === i - 1) o[key] = i;
	    }
	  }
	  
	  var a = [];
	  for(var i in last) {
	    var key = last[i];
	    if(o[key] === l) a.push(key);
	  }
	  
	  return a;
	}

	function intersect (a, b) {
	  if (!b) return many(a);

	  var res = [];
	  for (var i = 0; i < a.length; i++) {
	    if (indexOf(b, a[i]) > -1) res.push(a[i]);
	  }
	  return res;
	}

	intersect.big = function(a, b) {
	  if (!b) return many(a);
	  
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
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (a, b) {
	    var ret = [];
	    var i = b ? a : 0;
	    var len = b ? b : a;

	    for (; i < len; i++) {
	        ret.push(i);
	    }

	    return ret;
	};

/***/ }
/******/ ])
});
;