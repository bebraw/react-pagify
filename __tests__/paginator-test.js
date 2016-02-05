'use strict';

jest.autoMockOff();

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const Paginator = require('../src/index.jsx').default;

describe('Paginator', function() {
  it('should be able to bind a value based on context', function() {
    const className = 'center-page';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{centerPage: [2]}}>
        <Paginator.Bind className={className} field="centerPage" />
      </Paginator.Context>
    );

    const centerPage = TestUtils.scryRenderedDOMComponentsWithClass(
      paginator, className);

    expect(centerPage.length).toEqual(1);
  });

  it('should be able to display ellipsis', function() {
    const className = 'ellipsis';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{
        beginPages: [1, 2, 3],
        previousPages: [5, 6, 7]
      }}>
        <Paginator.Ellipsis
          className={className} previousField="beginPages" nextField="previousPages" />
      </Paginator.Context>
    );

    const ellipsis = TestUtils.scryRenderedDOMComponentsWithClass(
      paginator, className);

    expect(ellipsis.length).toEqual(1);
  });

  it('should not display ellipsis if there is overlap', function() {
    const className = 'ellipsis';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{
        beginPages: [1, 2, 3],
        previousPages: [2, 3, 4]
      }}>
        <Paginator.Ellipsis
          className={className} previousField="beginPages" nextField="previousPages" />
      </Paginator.Context>
    );

    const ellipsis = TestUtils.scryRenderedDOMComponentsWithClass(
      paginator, className);

    expect(ellipsis.length).toEqual(0);
  });

  it('should not display ellipsis if the ranges are next to each other', function() {
    const className = 'ellipsis';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{
        beginPages: [1, 2, 3],
        previousPages: [4, 5, 6]
      }}>
        <Paginator.Ellipsis
          className={className} previousField="beginPages" nextField="previousPages" />
      </Paginator.Context>
    );

    const ellipsis = TestUtils.scryRenderedDOMComponentsWithClass(
      paginator, className);

    expect(ellipsis.length).toEqual(0);
  });
});
