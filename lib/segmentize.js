'use strict';

var range = require('./range');


module.exports = function(o) {
    var page = o.page;
    var pages = o.pages;
    var visiblePages = o.visiblePages;

    if(visiblePages >= pages) {
        return range(pages);
    }

    // check possible start/end hit
    var halfVisible = Math.ceil(visiblePages / 2);
    if(page < halfVisible || page >= pages - halfVisible) {
        return [
            range(halfVisible),
            range(pages - Math.floor(visiblePages / 2), pages),
        ];
    }

    // got center hit, split in three parts
    var segment = visiblePages / 3;
    var extra = visiblePages % 3;
    var centerLength = segment + extra;
    var centerPadding = centerLength - 2 > 0? Math.floor((centerLength - 1) / 2): 0;

    return [
        range(segment),
        range(page - centerPadding, page + centerLength- centerPadding),
        range(pages - segment, pages),
    ];
};
