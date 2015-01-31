'use strict';

jest.dontMock('intersect');
jest.dontMock('uniq');
jest.dontMock('../lib/segmentize');
jest.dontMock('../lib/range');
jest.dontMock('../lib/index.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Paginator = require('../lib/index.jsx');


describe('Paginator', function() {
    it('should construct a link for the current page', function() {
        var amount = 5;
        var paginator = TestUtils.renderIntoDocument(
            <Paginator pages={amount} page={1} />
        );

        var links = TestUtils.scryRenderedDOMComponentsWithTag(
            paginator, 'a');
        var selected = TestUtils.scryRenderedDOMComponentsWithClass(
            paginator, 'selected');

        expect(links.length).toEqual(3);
        expect(selected.length).toEqual(1);
    });

    it('should construct links for start, current and end', function() {
        var amount = 10;
        var paginator = TestUtils.renderIntoDocument(
            <Paginator pages={amount} page={5} beginPages={2} endPages={2} />
        );

        var links = TestUtils.scryRenderedDOMComponentsWithTag(
            paginator, 'a');

        expect(links.length).toEqual(7);
    });

    it('should trigger handler on select', function() {
        var selectIndex = 2;
        var select = function(i) {
            expect(i).toEqual(selectIndex);
        };
        var paginator = TestUtils.renderIntoDocument(
            <Paginator pages={5} page={1} onSelect={select} />
        );

        var links = TestUtils.scryRenderedDOMComponentsWithTag(
            paginator, 'a');

        TestUtils.Simulate.click(links[selectIndex]);
    });
});
