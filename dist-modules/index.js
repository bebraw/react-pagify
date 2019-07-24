'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultTags = {
  container: {
    tag: 'div',
    props: {}
  },
  segment: {
    tag: 'div',
    props: {}
  },
  ellipsis: {
    tag: 'div',
    props: {
      children: '…'
    }
  },
  link: {
    tag: 'span',
    props: {}
  }
};

var Context = function (_React$Component) {
  _inherits(Context, _React$Component);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, (Context.__proto__ || Object.getPrototypeOf(Context)).apply(this, arguments));
  }

  _createClass(Context, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        segments: this.props.segments,
        onSelect: this.props.onSelect,
        tags: this.tags
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onSelect = _props.onSelect,
          segments = _props.segments,
          tags = _props.tags,
          props = _objectWithoutProperties(_props, ['onSelect', 'segments', 'tags']); // eslint-disable-line max-len, no-unused-vars


      var Container = this.tags.container;

      return _react2.default.createElement(
        Container.tag,
        _extends({}, Container.props, props),
        this.props.children
      );
    }
  }, {
    key: 'tags',
    get: function get() {
      return (0, _merge2.default)({}, defaultTags, this.props.tags);
    }
  }]);

  return Context;
}(_react2.default.Component);

Context.propTypes = {
  children: _propTypes2.default.any,
  onSelect: _propTypes2.default.func,
  segments: _propTypes2.default.object,
  tags: _propTypes2.default.object
};
Context.childContextTypes = {
  onSelect: _propTypes2.default.func,
  segments: _propTypes2.default.object,
  tags: _propTypes2.default.object
};

var Segment = function (_React$Component2) {
  _inherits(Segment, _React$Component2);

  function Segment() {
    _classCallCheck(this, Segment);

    return _possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).apply(this, arguments));
  }

  _createClass(Segment, [{
    key: 'render',
    value: function render() {
      var context = this.context;

      var _props2 = this.props,
          field = _props2.field,
          props = _objectWithoutProperties(_props2, ['field']);

      var segments = context.segments;
      var onSelect = context.onSelect;
      var tags = context.tags;
      var Tag = tags.segment.tag;
      var Link = tags.link.tag;
      var pages = segments[field];

      var containsUrls = false;
      var urls = {};
      if (Link === 'a' && segments.pageNumberToURLs) {
        containsUrls = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(segments.pageNumberToURLs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            urls[key] = { href: value };
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return _react2.default.createElement(
        Tag,
        _extends({}, tags.segment.props, props),
        pages.map(function (page) {
          return _react2.default.createElement(
            Link,
            _extends({}, containsUrls ? urls[page] : _extends({}, tags.link.props), {
              key: 'page-' + page,
              onClick: function onClick(e) {
                return onSelect(page, e);
              } }),
            page
          );
        })
      );
    }
  }]);

  return Segment;
}(_react2.default.Component);

Segment.propTypes = {
  field: _propTypes2.default.string.isRequired
};
Segment.contextTypes = {
  onSelect: _propTypes2.default.func,
  segments: _propTypes2.default.object,
  tags: _propTypes2.default.object
};

var Button = function (_React$Component3) {
  _inherits(Button, _React$Component3);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var context = this.context;

      var _props3 = this.props,
          page = _props3.page,
          children = _props3.children,
          props = _objectWithoutProperties(_props3, ['page', 'children']);

      var onSelect = context.onSelect;
      var tags = context.tags;
      var Tag = tags.segment.tag;
      var Link = tags.link.tag;

      return _react2.default.createElement(
        Tag,
        _extends({}, tags.segment.props, props),
        _react2.default.createElement(
          Link,
          _extends({}, tags.link.props, {
            onClick: function onClick(e) {
              return onSelect(page, e);
            } }),
          children
        )
      );
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = {
  children: _propTypes2.default.any,
  page: _propTypes2.default.number.isRequired
};
Button.contextTypes = {
  onSelect: _propTypes2.default.func,
  tags: _propTypes2.default.object
};

var Ellipsis = function (_React$Component4) {
  _inherits(Ellipsis, _React$Component4);

  function Ellipsis() {
    _classCallCheck(this, Ellipsis);

    return _possibleConstructorReturn(this, (Ellipsis.__proto__ || Object.getPrototypeOf(Ellipsis)).apply(this, arguments));
  }

  _createClass(Ellipsis, [{
    key: 'render',
    value: function render() {
      var context = this.context;

      var _props4 = this.props,
          previousField = _props4.previousField,
          nextField = _props4.nextField,
          props = _objectWithoutProperties(_props4, ['previousField', 'nextField']);

      var segments = context.segments;
      var tags = context.tags;
      var Tag = tags.ellipsis.tag;
      var previousPages = segments[previousField];
      var nextPages = segments[nextField];
      var showEllipsis = nextPages[0] - previousPages.slice(-1)[0] > 1;

      if (showEllipsis) {
        return _react2.default.createElement(Tag, _extends({}, tags.ellipsis.props, props));
      }

      return null;
    }
  }]);

  return Ellipsis;
}(_react2.default.Component);

Ellipsis.propTypes = {
  children: _propTypes2.default.any,
  previousField: _propTypes2.default.string.isRequired,
  nextField: _propTypes2.default.string.isRequired
};
Ellipsis.contextTypes = {
  segments: _propTypes2.default.object,
  tags: _propTypes2.default.object
};

exports.default = {
  Context: Context,
  Segment: Segment,
  Button: Button,
  Ellipsis: Ellipsis
};