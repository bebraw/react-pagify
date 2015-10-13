'use strict';

jest.dontMock('../lib/pages');

var pages = require('../lib/pages');


describe('next', function() {
    it('should increment page if page < lastPage', function() {
        expect(pages.next(4, 5)).toEqual(5);
    });
    it('should not increment page if page === lastPage', function () {
        expect(pages.next(5, 5)).toEqual(5);
    });
    it('should return lastPage if page > lastPage', function () {
        expect(pages.next(6, 5)).toEqual(5);
    });
});

describe('prev', function() {
    it('should decrement page if page > firstPage', function() {
        expect(pages.prev(1, 0)).toEqual(0);
    });
    it('should not decrement page if page === firstPage', function () {
        expect(pages.prev(0, 0)).toEqual(0);
    });
    it('should return firstPage if page < firstPage', function () {
        expect(pages.prev(-1, 0)).toEqual(0);
    });
    it('should default to 0 for firstPage', function () {
        expect(pages.prev(0)).toEqual(0);
    });
});

describe('maybeAddInactive', function () {
    it('should not add inactive if isFirstOrLastPage is false', function () {
      var isFirstOrLastPage = false,
          alwaysShowPrevNext = true,
          inactiveClassName = 'inactive';
      expect(pages.maybeAddInactive(
        isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName)).toEqual('')
    });
    it('should not add inactive if alwaysShowNextPrev is falsy', function () {
      var isFirstOrLastPage = true,
          alwaysShowPrevNext = undefined,
          inactiveClassName = 'inactive';
      expect(pages.maybeAddInactive(
        isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName)).toEqual('')
    });
    it('should not add inactive if inactiveClassName is undefined', function () {
      var isFirstOrLastPage = true,
          alwaysShowPrevNext = true,
          inactiveClassName = undefined;
      expect(pages.maybeAddInactive(
        isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName)).toEqual('')
    });
    it('should not add inactive if inactiveClassName is the empty string', function () {
      var isFirstOrLastPage = true,
          alwaysShowPrevNext = true,
          inactiveClassName = '';
      expect(pages.maybeAddInactive(
        isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName)).toEqual('')
    });
    it('should add inactive if all parameters are truthy', function () {
      var isFirstOrLastPage = true,
          alwaysShowPrevNext = true,
          inactiveClassName = 'inactive';
      expect(pages.maybeAddInactive(
        isFirstOrLastPage, alwaysShowPrevNext, inactiveClassName)).toEqual(
          ' ' + inactiveClassName)
    });

});
