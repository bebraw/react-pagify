import React from 'react';
import deepAssign from 'deep-assign';

const defaultTags = {
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

class Context extends React.Component {
  getChildContext() {
    return {
      segments: this.props.segments,
      onSelect: this.props.onSelect,
      tags: this.tags
    };
  }
  get tags() {
    return deepAssign({}, defaultTags, this.props.tags);
  }
  render() {
    const {onSelect, segments, ...props} = this.props;
    const Container = this.tags.container;

    return <Container.tag {...Container.props} {...props}>{this.props.children}</Container.tag>;
  }
}
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

class Button extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const onSelect = context.onSelect;
    const tags = context.tags;
    const Tag = tags.segment.tag;
    const Link = tags.link.tag;
    const page = props.page;
    const children = props.children;

    return (<Tag {...tags.segment.props} {...props}>
      <Link
        {...tags.link.props}
        onClick={(e) => onSelect(page, e)}>{children}</Link>
    </Tag>);
  }
}
Button.propTypes = {
  children: React.PropTypes.any,
  page: React.PropTypes.number.isRequired
};
Button.contextTypes = {
  onSelect: React.PropTypes.func,
  tags: React.PropTypes.object
};

class Ellipsis extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const tags = context.tags;
    const Tag = tags.ellipsis.tag;
    const previousPages = segments[props.previousField];
    const nextPages = segments[props.nextField];
    const showEllipsis = nextPages[0] - previousPages.slice(-1)[0] > 1;

    if(showEllipsis) {
      return <Tag {...tags.ellipsis.props} {...props}/>;
    }

    return null;
  }
}
Ellipsis.propTypes = {
  children: React.PropTypes.any,
  previousField: React.PropTypes.string.isRequired,
  nextField: React.PropTypes.string.isRequired,
};
Ellipsis.contextTypes = {
  segments: React.PropTypes.object,
  tags: React.PropTypes.object
};

export default {
  Context,
  Segment,
  Button,
  Ellipsis
};
