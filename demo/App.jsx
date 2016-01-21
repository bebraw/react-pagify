import React from 'react';
import Fork from 'react-ghfork';
import range from 'lodash/range';
import cumberbatch from 'cumberbatch-name';
import segmentize from 'segmentize';

import {Paginator, paginate} from '../src/index.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const amount = 10000;

    this.state = {
      data: generateNames(amount),
      pagination: {
        page: 0,
        perPage: 10,
      },
    };

    this.onSelect = this.onSelect.bind(this);
    this.onPerPage = this.onPerPage.bind(this);
  }
  render() {
    const data = this.state.data || [];
    const pagination = this.state.pagination || {};
    const paginated = paginate(data, pagination);
    const pages = Math.ceil(data.length / pagination.perPage);

    return (
      <div>
        <Fork className='right' project='bebraw/react-pagify' />

        <div className='per-page-container'>
          Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
        </div>

        <Paginator.Context segments={segmentize({
          page: pagination.page,
          pages: pages,
          beginPages: 3,
          endPages: 3,
          sidePages: 2
        })} onSelect={this.onSelect}>
          <div onClick={this.onSelect.bind(null, pagination.page - 1)}>Previous</div>
          <Paginator.BeginPages />
          <Paginator.PreviousPages ellipsis={'…'} />
          <Paginator.CenterPage />
          <Paginator.NextPages ellipsis={'…'} />
          <Paginator.EndPages />
          <div onClick={this.onSelect.bind(null, pagination.page + 1)}>Next</div>
        </Paginator.Context>

        <div className='data'>
          <h3>Comics</h3>

          <ul>{paginated.data.map((comic, i) =>
              <li key={'comic-' + i}>{comic.name}</li>
          )}</ul>
        </div>

        <Paginator.Context segments={segmentize({
          page: pagination.page,
          pages: pages,
          beginPages: 1,
          endPages: 1,
          sidePages: 2
        })} onSelect={this.onSelect}>
          <div onClick={this.onSelect.bind(null, pagination.page - 1)}>Previous one</div>
          <Paginator.BeginPages />
          <Paginator.PreviousPages ellipsis={'…'} />
          <Paginator.CenterPage />
          <Paginator.NextPages ellipsis={'…'} />
          <Paginator.EndPages />
          <div onClick={this.onSelect.bind(null, pagination.page + 1)}>Next one</div>
        </Paginator.Context>
      </div>
    );
  }
  onSelect(page) {
    var pagination = this.state.pagination || {};

    pagination.page = page;

    this.setState({
      pagination: pagination
    });
  }
  onPerPage() {
    var pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
      pagination: pagination
    });
  }
}

function generateNames(amount) {
  return range(amount).map(() => {
    return {
      name: cumberbatch()
    };
  });
}
