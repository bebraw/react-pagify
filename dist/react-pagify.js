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


	var Paginator = React.createClass({displayName: "Paginator",
	    render:function() {
	        var onSelect = this.props.onSelect || noop;
	        var page = this.props.page;
	        var pages = this.props.pages;

	        return React.createElement("ul", {className: "pagination"}, 
	            range(pages).map(function(i) 
	                {return React.createElement("li", {
	                    key: 'pagination-' + i, 
	                    onClick: onSelect.bind(null, i), 
	                    className: i === page && 'selected'}, 
	                    React.createElement("a", {href: "#", onClick: this.preventDefault}, 
	                        i + 1
	                    )
	                );}.bind(this)
	            )
	        );
	    },

	    preventDefault:function(e) {
	        e.preventDefault();
	    },
	});

	function range(amount) {
	    var ret = [];
	    var i;

	    for(i = 0; i < amount; i++) {
	        ret.push(i);
	    }

	    return ret;
	}

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

/***/ }
/******/ ])
});
