import React from 'react';

class Context extends React.Component {
  getChildContext() {
    return {
      segments: this.props.segments,
      onSelect: this.props.onSelect
    };
  }
  render() {
    const {onSelect, segments, ...props} = this.props;

    return <div {...props}>{this.props.children}</div>;
  }
}
Context.propTypes = {
  children: React.PropTypes.any,
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object
};
Context.childContextTypes = {
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object
};

class Bind extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const onSelect = context.onSelect;
    const pages = segments[props.field];

    return (<div>{pages.map((page) =>
      <span {...props}
        key={`page-${page}`}
        onClick={(e) => onSelect(page, e)}>{page}</span>
    )}</div>);
  }
}
Bind.propTypes = {
  field: React.PropTypes.string.isRequired
};
Bind.contextTypes = {
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.object
};

class Ellipsis extends React.Component {
  render() {
    const context = this.context;
    const props = this.props;
    const segments = context.segments;
    const outlook = props.outlook;
    const previousPages = segments[props.previousField];
    const nextPages = segments[props.nextField];
    const showEllipsis = nextPages[0] - previousPages.slice(-1)[0] > 1;

    if(showEllipsis) {
      return <span {...props}>{outlook}</span>;
    }

    return null;
  }
}
Ellipsis.propTypes = {
  outlook: React.PropTypes.string.isRequired,
  previousField: React.PropTypes.string.isRequired,
  nextField: React.PropTypes.string.isRequired,
};
Ellipsis.defaultProps = {
  outlook: '…'
};
Ellipsis.contextTypes = {
  segments: React.PropTypes.object
};

export default {
  Context,
  Bind,
  Ellipsis
};
