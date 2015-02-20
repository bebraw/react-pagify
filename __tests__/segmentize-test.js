'use strict';

jest.dontMock('intersect');
jest.dontMock('uniq');
jest.dontMock('../lib/segmentize');
jest.dontMock('../lib/range');

var segmentize = require('../lib/segmentize');


describe('segmentize', function() {
    it('should show only one page if there is one', function() {
        var pageAmount = 1;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
        })).toEqual([[0]]);
    });

    it('should show only two pages if there are two', function() {
        var pageAmount = 2;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
        })).toEqual([[0, 1]]);
    });

    it('should show current and next at start by default', function() {
        var pageAmount = 4;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
        })).toEqual([[0, 1]]);
    });

    it('should show current and previous at end by default', function() {
        var pageAmount = 4;

        expect(segmentize({
            page: pageAmount - 1,
            pages: pageAmount,
        })).toEqual([[pageAmount - 2, pageAmount - 1]]);
    });

    it('should show only current if there is only one page', function() {
        var pageAmount = 1;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
        })).toEqual([[0]]);
    });

    it('should show both previous and next page if at center', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: 5,
            pages: pageAmount,
        })).toEqual([[4, 5, 6]]);
    });

    it('should accept begin pages', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: 5,
            pages: pageAmount,
            beginPages: 2,
        })).toEqual([[0, 1], [4, 5, 6]]);
    });

    it('should accept begin pages and end page', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: pageAmount - 1,
            pages: pageAmount,
            beginPages: 2,
        })).toEqual([[0, 1], [pageAmount - 2, pageAmount - 1]]);
    });

    it('should accept begin pages with overlap', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: 2,
            pages: pageAmount,
            beginPages: 2,
        })).toEqual([[0, 1, 2, 3]]);
    });

    it('should accept end pages', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: 5,
            pages: pageAmount,
            endPages: 2,
        })).toEqual([[4, 5, 6], [8, 9]]);
    });

    it('should accept first page and end pages', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
            endPages: 2,
        })).toEqual([[0, 1], [8, 9]]);
    });

    it('should accept end pages with overlap', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: pageAmount - 3,
            pages: pageAmount,
            endPages: 2,
        })).toEqual([[6, 7, 8, 9]]);
    });

    it('should accept both begin and end pages', function() {
        var pageAmount = 10;

        expect(segmentize({
            page: 5,
            pages: pageAmount,
            beginPages: 2,
            endPages: 2,
        })).toEqual([[0, 1], [4, 5, 6], [8, 9]]);
    });

    it('should show only one page if there is one with both begin and end pages', function() {
        var pageAmount = 1;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
            beginPages: 3,
            endPages: 3,
        })).toEqual([[0]]);
    });

    it('should show only two pages if there are two with both begin and end pages', function() {
        var pageAmount = 2;

        expect(segmentize({
            page: 0,
            pages: pageAmount,
            beginPages: 3,
            endPages: 3,
        })).toEqual([[0, 1]]);
    });

    it('should show only two pages if there are two with both begin and end pages and latter is selected', function() {
        var pageAmount = 2;

        expect(segmentize({
            page: 1,
            pages: pageAmount,
            beginPages: 3,
            endPages: 3,
        })).toEqual([[0, 1]]);
    });
});
