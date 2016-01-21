import React from 'react';

const pageShape = {
  beginPages: React.PropTypes.array,
  previousPages: React.PropTypes.array,
  centerPage: React.PropTypes.number,
  nextPages: React.PropTypes.array,
  endPages: React.PropTypes.array
};

class Context extends React.Component {
  getChildContext() {
    return Object.assign({}, this.props.segments, {
      onSelect: this.props.onSelect
    });
  }
  render() {
    const {onSelect, segments, ...props} = this.props;

    return <div {...props}>{this.props.children}</div>;
  }
}
Context.propTypes = {
  children: React.PropTypes.object,
  onSelect: React.PropTypes.func,
  segments: React.PropTypes.shape(pageShape)
};
Context.childContextTypes = Object.assign({}, pageShape, {
  onSelect: React.PropTypes.func
});

class BeginPages extends React.Component {
  render() {
    const props = this.props;

    return <div {...props}>{this.context.beginPages}</div>;
  }
}
BeginPages.contextTypes = {
  beginPages: React.PropTypes.array,
  onSelect: React.PropTypes.func
};

class PreviousPages extends React.Component {
  render() {
    const props = this.props;

    return <div {...props}>{this.context.previousPages}</div>;
  }
}
PreviousPages.contextTypes = {
  previousPages: React.PropTypes.array,
  onSelect: React.PropTypes.func
};

class CenterPage extends React.Component {
  render() {
    const props = this.props;

    return <div {...props}>{this.context.centerPage}</div>;
  }
}
CenterPage.contextTypes = {
  centerPage: React.PropTypes.number
};

class NextPages extends React.Component {
  render() {
    const props = this.props;

    return <div {...props}>{this.context.nextPages}</div>;
  }
}
NextPages.contextTypes = {
  nextPages: React.PropTypes.array,
  onSelect: React.PropTypes.func
};

class EndPages extends React.Component {
  render() {
    const props = this.props;

    return <div {...props}>{this.context.endPages}</div>;
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
