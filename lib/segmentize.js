'use strict';

var intersect = require('intersect');
var uniq = require('uniq');

var range = require('./range');


module.exports = function(o) {
    var page = o.page;
    var pages = o.pages;
    var beginPages = o.beginPages? range(Math.min(o.beginPages, pages)): [];
    var endPages = o.endPages? range(Math.max(pages - o.endPages, 0), pages): [];
    var leftSidePages = o.sidePages? range(Math.max(page - o.sidePages, 0), page): [page - 1];
    var rightSidePages = o.sidePages? range(page + 1, Math.min(page + o.sidePages + 1, pages)): [page + 1];
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
            beginPages = uniq(beginPages.concat(rightSidePages));

            ret = [beginPages, difference(endPages, beginPages)].filter((a) => a.length);
        }

        return ret;
    }

    if(page === pages - 1) {
        endPages = [pages - 2, pages - 1];
        endPages = uniq(endPages.concat(leftSidePages));

        return [beginPages, difference(endPages, beginPages)].filter((a) => a.length);
    }

    center = [].concat(leftSidePages, [page], rightSidePages);

    if(intersect(beginPages, center).length) {
        beginPages = uniq(beginPages.concat(center)).sort(function(a, b) {
            return a > b;
        });
        center = [];
    }

    if(intersect(center, endPages).length) {
        endPages = uniq(center.concat(endPages)).sort(function(a, b) {
            return a > b;
        });
        center = [];
    }

    if(!center.length && beginPages.length === endPages.length &&
        beginPages.every((page, i) => page === endPages[i])) {
        return [beginPages];
    }

    if(!center.length && intersect(beginPages, endPages).length ||
        endPages[0] - beginPages.slice(-1)[0] === 1) {
        return [uniq(beginPages.concat(endPages)).sort(function(a, b) {
            return a > b;
        })];
    }

    if(center[0] - beginPages.slice(-1)[0] === 1) {
        return [beginPages.concat(center), endPages];
    }

    if(endPages[0] - center.slice(-1)[0] === 1) {
        return [beginPages, center.concat(endPages)];
    }

    return [beginPages, center, endPages].filter((a) => a.length);
};

function difference(a, b) {
    return a.filter((v) => b.indexOf(v) < 0);
}
