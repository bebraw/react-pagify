'use strict';

jest.dontMock('../lib/segmentize');

var segmentize = require('../lib/segmentize');


describe('segmentize', function() {
    it('should not segment if there are more visible pages than pages', function() {
        var pages = 4;

        expect(segmentize({
            page: 0,
            pages: pages,
            visiblePages: pages + 1,
        }).length).toEqual(pages);
    });

    it('should not segment if there are as many visible pages as pages', function() {
        var pages = 4;

        expect(segmentize({
            page: 0,
            pages: pages,
            visiblePages: pages,
        }).length).toEqual(pages);
    });

    it('should segment in two parts if segmented with begin hit', function() {
        var pages = 10;
        var segments = segmentize({
            page: 0,
            pages: pages,
            visiblePages: 3,
        });

        expect(segments.length).toEqual(2);
        expect(segments[0]).toEqual([0, 1]);
        expect(segments[1]).toEqual([pages - 1]);
    });

    it('should segment in two parts if segmented with end hit', function() {
        var pages = 7;
        var segments = segmentize({
            page: pages - 1,
            pages: pages,
            visiblePages: 4,
        });

        expect(segments.length).toEqual(2);
        expect(segments[0]).toEqual([0, 1]);
        expect(segments[1]).toEqual([pages -2, pages - 1]);
    });

    it('should segment in three parts if segmented with center hit', function() {
        var pages = 10;
        var page = 5;
        var segments = segmentize({
            page: page,
            pages: pages,
            visiblePages: 3,
        });

        expect(segments.length).toEqual(3);
        expect(segments[0]).toEqual([0]);
        expect(segments[1]).toEqual([page]);
        expect(segments[2]).toEqual([pages - 1]);
    });

    it('should segment in three parts if segmented with center hit and center should have padding', function() {
        var pages = 20;
        var page = 10;
        var segments = segmentize({
            page: page,
            pages: pages,
            visiblePages: 9,
        });

        expect(segments.length).toEqual(3);
        expect(segments[0]).toEqual([0, 1, 2]);
        expect(segments[1]).toEqual([page - 1, page, page + 1]);
        expect(segments[2]).toEqual([pages - 3, pages - 2, pages - 1]);
    });
});
