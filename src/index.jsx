import React from 'react';

class Context extends React.Component {
  getChildContext() {
    return {
      segments: this.props.segments,
      tags: this.props.tags,
      onSelect: this.props.onSelect
    };
  }
  render() {
    const {onSelect, segments, tags, ...props} = this.props;
    const Container = tags.container.tag;

    return <Container {...tags.container.props} {...props}>{this.props.children}</Container>;
  }
}
Context.defaultProps = {
  tags: {
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
      props: {}
    },
    link: {
      tag: 'span',
      props: {}
    }
  }
};
Context.propTypes = {
  children: React.PropTypes.any,
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object,
  tags: React.PropTypes.object
};
Context.childContextTypes = {
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object,
  tags: React.PropTypes.object
};

class Segment extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const onSelect = context.onSelect;
    const tags = context.tags;
    const Tag = tags.segment.tag;
    const Link = tags.link.tag;
    const pages = segments[props.field];

    return (<Tag {...tags.segment.props} {...props}>{pages.map((page) =>
      <Link
        {...tags.link.props}
        key={`page-${page}`}
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
  tags: React.PropTypes.object
};

class Ellipsis extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const tags = context.tags;
    const Tag = tags.ellipsis.tag;
    const children = props.children;
    const previousPages = segments[props.previousField];
    const nextPages = segments[props.nextField];
    const showEllipsis = nextPages[0] - previousPages.slice(-1)[0] > 1;

    if(showEllipsis) {
      return <Tag {...tags.ellipsis.props} {...props}>{children}</Tag>;
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
  tags: React.PropTypes.object
};

export default {
  Context,
  Segment,
  Ellipsis
};
