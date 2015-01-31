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
