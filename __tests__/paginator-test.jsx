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
        <Paginator.Segment className={className} field="centerPage" />
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

  it('should use custom tags and props for rendering container', function() {
    const className = 'container';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context className={className} segments={{centerPage: [2]}} tags={{
        container: {
          tag: 'ul',
          props: {title: '42'}
        }
      }} />
    );

    const container = TestUtils.findRenderedDOMComponentWithClass(
      paginator, className);

    expect(container.tagName).toEqual('UL');
    expect(container.title).toEqual('42');
  });

  it('should use custom tags and props for rendering segments', function() {
    const className = 'center-page';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{centerPage: [2]}} tags={{
        segment: {
          tag: 'li',
          props: {title: '42'}
        }
      }}>
        <Paginator.Segment className={className} field="centerPage" />
      </Paginator.Context>
    );

    const centerPage = TestUtils.findRenderedDOMComponentWithClass(
      paginator, className);

    expect(centerPage.tagName).toEqual('LI');
    expect(centerPage.title).toEqual('42');
  });

  it('should use custom tags and props for rendering ellipses', function() {
    const className = 'ellipsis';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{
        beginPages: [1, 2, 3],
        previousPages: [5, 6, 7]
      }} tags={{
        ellipsis: {
          tag: 'li',
          props: {title: '42'}
        }
      }}>
        <Paginator.Ellipsis className={className} previousField="beginPages" nextField="previousPages" />
      </Paginator.Context>
    );

    const ellipsis = TestUtils.findRenderedDOMComponentWithClass(
      paginator, className);

    expect(ellipsis.tagName).toEqual('LI');
    expect(ellipsis.title).toEqual('42');
  });

  it('should use custom tags and props for rendering links', function() {
    const className = 'link';
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context segments={{centerPage: [2]}} tags={{
        segment: {
          tag: 'a',
          props: {className}
        }
      }}>
        <Paginator.Segment field="centerPage" />
      </Paginator.Context>
    );

    const centerPage = TestUtils.findRenderedDOMComponentWithClass(
      paginator, className);

    expect(centerPage.tagName).toEqual('A');
    expect(centerPage.className).toEqual('link');
  });

  it('should allow custom buttons to be used', function() {
    let selectedPage = 0;
    const targetPage = 5;
    const className = 'button';
    const onSelect = (page) => {
      selectedPage = page;
    };
    const paginator = TestUtils.renderIntoDocument(
      <Paginator.Context tags={{
        link: {
          tag: 'span',
          props: {
            className
          }
        }
      }} segments={{centerPage: [2]}} onSelect={onSelect}>
        <Paginator.Button page={targetPage}>Target</Paginator.Button>
      </Paginator.Context>
    );

    const button = TestUtils.findRenderedDOMComponentWithClass(
      paginator, className
    );

    TestUtils.Simulate.click(button);

    expect(selectedPage).toEqual(targetPage);
  });
});
