import React from 'react';

const pageShape = {
  beginPages: React.PropTypes.array,
  previousPages: React.PropTypes.array,
  centerPage: React.PropTypes.array,
  nextPages: React.PropTypes.array,
  endPages: React.PropTypes.array
};

class Context extends React.Component {
  getChildContext() {
    return Object.assign({}, this.props.segments, {
      segments: this.props.segments,
      onSelect: this.props.onSelect,
      ellipsis: this.props.ellipsis,
      ellipsisClass: this.props.ellipsisClass,
    });
  }
  render() {
    const {onSelect, segments, ...props} = this.props;

    return <div {...props}>{this.props.children}</div>;
  }
}
Context.propTypes = {
  children: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  ellipsis: React.PropTypes.string,
  ellipsisClass: React.PropTypes.string,
  segments: React.PropTypes.shape(pageShape)
};
Context.defaultProps = {
  ellipsisClass: 'ellipsis'
};
Context.childContextTypes = Object.assign({}, pageShape, {
  onSelect: React.PropTypes.func,
  ellipsis: React.PropTypes.string,
  ellipsisClass: React.PropTypes.string,
  segments: React.PropTypes.shape(pageShape)
});

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
  segments: React.PropTypes.shape(pageShape),
  onSelect: React.PropTypes.func
};

class BeginPages extends React.Component {
  render() {
    const props = this.props;
    const context = this.context;
    const pages = context.beginPages;
    const onSelect = context.onSelect;

    return (<div>{pages.map((page) =>
      <span {...props} key={`begin-page-${page}`} onClick={(e) => onSelect(page, e)}>{page}</span>
    )}</div>);
  }
}
BeginPages.contextTypes = {
  beginPages: React.PropTypes.array,
  onSelect: React.PropTypes.func
};

class PreviousPages extends React.Component {
  render() {
    const props = this.props;
    const context = this.context;
    const beginPages = context.beginPages;
    const previousPages = context.previousPages;
    const onSelect = context.onSelect;
    const showEllipsis = previousPages && beginPages ?
      previousPages[0] - beginPages.slice(-1)[0] > 1 : false;
    const ellipsis = context.ellipsis;
    const ellipsisClass = context.ellipsisClass;

    return (<div>
      {showEllipsis && <span className={ellipsisClass}>{ellipsis}</span>}
      {previousPages.map((page) =>
        <span {...props} key={`previous-page-${page}`} onClick={(e) => onSelect(page, e)}>{page}</span>
      )}
    </div>);
  }
}
PreviousPages.contextTypes = {
  beginPages: React.PropTypes.array,
  previousPages: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  ellipsis: React.PropTypes.string,
  ellipsisClass: React.PropTypes.string
};

class CenterPage extends React.Component {
  render() {
    const props = this.props;
    const context = this.context;
    const page = context.centerPage[0];

    return <span {...props}>{page}</span>;
  }
}
CenterPage.contextTypes = {
  centerPage: React.PropTypes.array
};

class NextPages extends React.Component {
  render() {
    const props = this.props;
    const context = this.context;
    const nextPages = context.nextPages;
    const endPages = context.endPages;
    const onSelect = context.onSelect;
    const showEllipsis = nextPages && endPages ?
      endPages[0] - nextPages.slice(-1)[0] > 1 : false;
    const ellipsis = context.ellipsis;
    const ellipsisClass = context.ellipsisClass;

    return (<div>
      {nextPages.map((page) =>
        <span {...props} key={`next-page-${page}`} onClick={(e) => onSelect(page, e)}>{page}</span>
      )}
      {showEllipsis && <span className={ellipsisClass}>{ellipsis}</span>}
    </div>);
  }
}
NextPages.contextTypes = {
  nextPages: React.PropTypes.array,
  endPages: React.PropTypes.array,
  onSelect: React.PropTypes.func,
  ellipsis: React.PropTypes.string,
  ellipsisClass: React.PropTypes.string
};

class EndPages extends React.Component {
  render() {
    const props = this.props;
    const context = this.context;
    const pages = context.endPages;
    const onSelect = context.onSelect;

    return (<div>{pages.map((page) =>
      <span {...props} key={`end-page-${page}`} onClick={(e) => onSelect(page, e)}>{page}</span>
    )}</div>);
  }
}
EndPages.contextTypes = {
  endPages: React.PropTypes.array,
  onSelect: React.PropTypes.func
};

function paginate(data, o) {
  data = data || [];

  var page = o.page || 0;
  var perPage = o.perPage;

  var amountOfPages = Math.ceil(data.length / perPage);
  var startPage = page < amountOfPages? page: 0;

  return {
    amount: amountOfPages,
    data: data.slice(startPage * perPage, startPage * perPage + perPage),
    page: startPage
  };
}

const Paginator = {
  Context,
  Bind,
  BeginPages,
  PreviousPages,
  CenterPage,
  NextPages,
  EndPages
};

export {
  Paginator,
  paginate
};
