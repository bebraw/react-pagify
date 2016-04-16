import React from 'react';
import segmentize from 'segmentize';

import Paginator from '../src/index.jsx';

const DemoPaginator = ({
  pagination, pages, onSelect, ...props
}) => (
  <Paginator.Context className="pagify-pagination" {...props}
    segments={segmentize({
      page: pagination.page,
      pages: pages,
      beginPages: 3,
      endPages: 3,
      sidePages: 2
    })} onSelect={onSelect}>
    <Paginator.Button page={pagination.page - 1}>Previous</Paginator.Button>

    <Paginator.Segment field="beginPages" />

    <Paginator.Ellipsis className="ellipsis"
      previousField="beginPages" nextField="previousPages" />

    <Paginator.Segment field="previousPages" />
    <Paginator.Segment field="centerPage" className="selected" />
    <Paginator.Segment field="nextPages" />

    <Paginator.Ellipsis className="ellipsis"
      previousField="nextPages" nextField="endPages" />

    <Paginator.Segment field="endPages" />

    <Paginator.Button page={pagination.page + 1}>Next</Paginator.Button>
  </Paginator.Context>
);

export default DemoPaginator;
