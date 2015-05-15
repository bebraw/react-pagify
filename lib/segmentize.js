'use strict';

var intersect = require('intersect');
var uniq = require('uniq');

var range = require('./range');


module.exports = function(o) {
    var page = o.page;
    var pages = o.pages;
    var beginPages = o.beginPages? range(Math.min(o.beginPages, pages)): [];
    var endPages = o.endPages? range(Math.max(pages - o.endPages, 0), pages): [];
    var center, ret;

    if(beginPages.length + endPages.length >= pages) {
        return [range(pages)];
    }

    if(page === 0) {
        ret = [[0]];

        if(pages > 1) {
            if(!beginPages.length) {
                beginPages = [0, 1];
            }

            ret = [beginPages, difference(endPages, beginPages)].filter((a) => a.length);
        }

        return ret;
    }

    if(page === pages - 1) {
        endPages = [pages - 2, pages - 1];

        return [beginPages, difference(endPages, beginPages)].filter((a) => a.length);
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

    if(!center.length && beginPages.length === endPages.length &&
        beginPages.every((page, i) => page === endPages[i])) {
        return [beginPages];
    }

    return [beginPages, center, endPages].filter((a) => a.length);
};

function difference(a, b) {
    return a.filter((v) => b.indexOf(v) < 0);
}
