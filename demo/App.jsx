/* eslint no-console:0 */
import React from 'react';
import Fork from 'react-ghfork';
import range from 'lodash/range';
import cumberbatch from 'cumberbatch-name';

import DemoPaginator from './DemoPaginator.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const amount = 10000;

    this.state = {
      data: generateNames(amount),
      pagination: {
        page: 1,
        perPage: 10,
      },
    };

    this.selectPage = this.selectPage.bind(this);
    this.goToLastPage = this.goToLastPage.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
  }
  render() {
    const data = this.state.data || [];
    const pagination = this.state.pagination || {};
    const paginated = paginate(data, pagination);
    const pages = Math.ceil(data.length / Math.max(
      isNaN(pagination.perPage) ? 1 : pagination.perPage, 1)
    );

    return (
      <div>
        <Fork className='right' project='bebraw/react-pagify' />

        <div className='per-page-container'>
          Per page <input type='number' min='1' defaultValue={pagination.perPage} onChange={this.onPerPage} />

          <a className='go-to-last-page' href="#" onClick={this.goToLastPage}>Go to the last page</a>
        </div>

        {/* You can wrap the paginator to a custom component of its own. */}
        <DemoPaginator pagination={pagination} pages={pages} onSelect={this.selectPage} />

        <div className='data'>
          <h3>Comics</h3>

          <ul>{paginated.data.map((comic, i) =>
              <li key={'comic-' + i}>{comic.name}</li>
          )}</ul>
        </div>

        <DemoPaginator pagination={pagination} pages={pages} ellipsis="***"
          labels={{previous: 'Previous one', next: 'Next one'}}
          onSelect={this.selectPage} />
      </div>
    );
  }
  goToLastPage() {
    const state = this.state;
    const pagination = state.pagination || {};
    const pages = Math.ceil(state.data.length / pagination.perPage);

    this.selectPage(pages);
  }
  selectPage(page) {
    const state = this.state;
    const pagination = state.pagination || {};
    const pages = Math.ceil(state.data.length / pagination.perPage);

    pagination.page = Math.min(Math.max(page, 1), pages);

    this.setState({
      pagination: pagination
    });
  }
  onPerPage(event) {
    var pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
      pagination: pagination
    });
  }
}

// TODO: push to a package?
function paginate(data, o) {
  data = data || [];

  // adapt to zero indexed logic
  var page = o.page - 1 || 0;
  var perPage = o.perPage;

  var amountOfPages = Math.ceil(data.length / perPage);
  var startPage = page < amountOfPages? page: 0;

  return {
    amount: amountOfPages,
    data: data.slice(startPage * perPage, startPage * perPage + perPage),
    page: startPage + 1
  };
}

function generateNames(amount) {
  return range(amount).map(() => {
    return {
      name: cumberbatch()
    };
  });
}
