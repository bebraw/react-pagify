import React from 'react';

class Context extends React.Component {
  getChildContext() {
    return {
      segments: this.props.segments,
      tagName: this.props.tagName,
      linkTagName: this.props.linkTagName,
      onSelect: this.props.onSelect
    };
  }
  render() {
    const {onSelect, segments, containerTagName, ...props} = this.props;
    const Container = containerTagName;

    return <Container {...props}>{this.props.children}</Container>;
  }
}
Context.defaultProps = {
  containerTagName: 'div',
  tagName: 'div',
  linkTagName: 'span'
};
Context.propTypes = {
  children: React.PropTypes.any,
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object,
  containerTagName: React.PropTypes.string,
  tagName: React.PropTypes.string,
  linkTagName: React.PropTypes.string
};
Context.childContextTypes = {
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object,
  tagName: React.PropTypes.string,
  linkTagName: React.PropTypes.string
};

class Segment extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const onSelect = context.onSelect;
    const Tag = context.tagName;
    const Link = context.linkTagName;
    const pages = segments[props.field];

    return (<Tag {...props}>{pages.map((page) =>
      <Link
        key={`page-${page}`}
        href={Link === 'a' ? '#' : null}
        onClick={(e) => onSelect(page, e)}>{page}</Link>
    )}</Tag>);
  }
}
Segment.propTypes = {
  field: React.PropTypes.string.isRequired
};
Segment.contextTypes = {
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object,
  tagName: React.PropTypes.string,
  linkTagName: React.PropTypes.string
};

class Ellipsis extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const Tag = context.tagName;
    const children = props.children;
    const previousPages = segments[props.previousField];
    const nextPages = segments[props.nextField];
    const showEllipsis = nextPages[0] - previousPages.slice(-1)[0] > 1;

    if(showEllipsis) {
      return <Tag {...props}>{children}</Tag>;
    }

    return null;
  }
}
Ellipsis.propTypes = {
  children: React.PropTypes.any.isRequired,
  previousField: React.PropTypes.string.isRequired,
  nextField: React.PropTypes.string.isRequired,
};
Ellipsis.defaultProps = {
  children: '…'
};
Ellipsis.contextTypes = {
  segments: React.PropTypes.object,
  tagName: React.PropTypes.string
};

export default {
  Context,
  Segment,
  Ellipsis
};
