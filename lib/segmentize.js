'use strict';

var intersect = require('intersect');
var uniq = require('uniq');

var range = require('./range');


module.exports = function(o) {
    var page = o.page;
    var pages = o.pages;
    var beginPages = o.beginPages? range(o.beginPages): [];
    var endPages = o.endPages? range(pages - o.endPages, pages): [];
    var center;

    if(page === 0) {
        return (pages > 1? [[0, 1], endPages]: [[0]]).filter((a) => a.length);
    }

    if(page === pages - 1) {
        return [beginPages, [pages - 2, pages - 1]].filter((a) => a.length);
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

    return[beginPages, center, endPages].filter((a) => a.length);
};
