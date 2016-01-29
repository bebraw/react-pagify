'use strict';


module.exports = {
    // Increment page, unless it is >= lastPage, then return lastPage.
    next(page, lastPage) {
        return page >= lastPage ? lastPage : page + 1;
    },

    // Decrement page, unless it is <= firstPage, then return firstPage.
    prev(page, firstPage) {
        firstPage = firstPage || 0;
        return page <= firstPage ? firstPage : page - 1;
    },

    // Return the inactiveClassName if it should be added.
    maybeAddInactive(isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName) {
        if (isFirstOrLastPage && alwaysShowPrevNext && inactiveClassName) {
            return ' ' + inactiveClassName;
        }
        return '';
    }
}
