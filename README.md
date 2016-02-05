[![build status](https://secure.travis-ci.org/bebraw/react-pagify.png)](http://travis-ci.org/bebraw/react-pagify)
# react-pagify - Simple pagination for React

*react-pagify* provides a simple API for building your own custom paginator.

> If you want to learn more about React, read [SurviveJS - Webpack and React](http://survivejs.com/).

## Usage

*react-pagify* consists of three React components: `Context`, `Segment`, and `Ellipsis`.

Pagination logic can be handled through a package, such as [segmentize](https://www.npmjs.com/package/segmentize). *react-pagify* doesn't tie you to any particular solution by design, though.

### `Context` and `Segment`

The example below binds `centerPage`. When it's clicked, it will trigger `onSelect` and pass the page number to it. Note that segment data should be given as a object. All values should be within an array even if there is just one.

```javascript
...

import Paginator from 'react-pagify';

...

<Paginator.Context className="pagify-pagination"
  segments={{
    centerPage: [4]
  }} onSelect={(page) => console.log(page)}>
  <Paginator.Segment field="centerPage" />
</Paginator.Context>
```

Both `Context` and `Segment` accept custom `props` so you can customize `className` and attach custom behavior as needed.

### Usage with *segmentize*

You can integrate the solution with *segmentize* like this:

```javascript
...

import Paginator from 'react-pagify';
import segmentize from 'segmentize';

...

<Paginator.Context className="pagify-pagination"
  segments={segmentize({
    page: 1,
    pages: 4,
    sidePages: 2
  })} onSelect={(page) => console.log(page)}>
  <Paginator.Segment field="previousPages" />
  <Paginator.Segment field="centerPage" />
  <Paginator.Segment field="nextPages" />
</Paginator.Context>
```

The idea is the same as earlier. In this case we bind fields that *segmentize* outputs. Each of those fields contains an array of data.

### `Ellipsis`

Given it can be handy to be able to display ellipsis between pages of a paginator, there's a small utility known as `Ellipsis` just for this:

```javascript
...

import Paginator from 'react-pagify';
import segmentize from 'segmentize';

...

<Paginator.Context className="pagify-pagination"
  segments={segmentize({
    page: 1,
    pages: 4,
    sidePages: 2
  })} onSelect={(page) => console.log(page)}>
  <Paginator.Segment field="beginPages" />

  <Paginator.Ellipsis className="ellipsis"
    previousField="beginPages" nextField="previousPages">
    ***
  </Paginator.Ellipsis>

  <Paginator.Segment field="previousPages" />
  <Paginator.Segment field="centerPage" />
  <Paginator.Segment field="nextPages" />

  <Paginator.Ellipsis previousField="nextPages" nextField="endPages" />

  <Paginator.Segment field="endPages" />
</Paginator.Context>
```

The outlook of `Ellipsis` can be customized by passing something custom to it as its child.

> See `demo/` for a full implementation of the ideas.

## Contributors

* [rowbare](https://github.com/rowbare) - Allowed usage in Bootstrap by making `className` customizable.
* [Nadav Spiegelman](https://github.com/nadavspi) - Added optional ellipsesClassName prop, `showPrevNext` prop.
* [Nick Zarczynski](https://github.com/jacktrades) - Added configuration to always show prev/next buttons and allowed inactive buttons to be styled.
* [Nimi Wariboko Jr.](https://github.com/nemothekid) - Added support for `activeClassName`.
* [Artem Sapegin](https://github.com/sapegin) - Added `Add ellipsisButton` and `sidePages` props.

## License

*react-pagify* is available under MIT. See LICENSE for more details.
