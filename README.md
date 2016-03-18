[![build status](https://secure.travis-ci.org/bebraw/react-pagify.png)](http://travis-ci.org/bebraw/react-pagify)
# react-pagify - Simple pagination for React

*react-pagify* provides a simple API for building your own custom paginator.

> If you want to learn more about React, read [SurviveJS - Webpack and React](http://survivejs.com/).

## Usage

*react-pagify* consists of four React components: `Context`, `Segment`, `Button`, and `Ellipsis`.

Pagination logic can be handled through a package, such as [segmentize](https://www.npmjs.com/package/segmentize). *react-pagify* doesn't tie you to any particular solution by design, though.

### `Context` and `Segment`

`Context` accepts two props: `segments` and `onSelect`. A segment in turn consists of an object (`segmentName -> [pageNumbers]`). `Segment` accepts matching `segmentName` through a prop and then constructs divs based on that. It also binds `onSelect` automatically so that when you click an individual page div, the page number will be passed to it as a first parameter. The second one matches with DOM event.

The example below binds `centerPage` through `Context` and `Segment`:

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

Both `Context` and `Segment` accept custom props so you can customize `className` and attach custom behavior as needed. In the latter case the custom props are applied per each page `div` generated.

### Usage with *segmentize*

*react-pagify* doesn't deal with pagination logic itself. Instead, you can use another package, such as [segmentize](https://www.npmjs.com/package/segmentize), to deal with it. The following example demonstrates basic integration:

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

The idea is the same as earlier. In this case we bind fields that *segmentize* outputs. Each of those fields contains an array of data. Refer to *segmentize* documentation for available options.

### `Button`

Given it's handy to be able to implement **previous** and **next** buttons, there's a little shortcut just for that:

```javascript
...

import Paginator from 'react-pagify';

...

<Paginator.Context className="pagify-pagination"
  segments={{
    centerPage: [currentPage]
  }} onSelect={(page) => console.log(page)}>
  <Paginator.Button page={currentPage - 1}>Previous</Paginator.Button>
  <Paginator.Button page={currentPage + 1}>Next</Paginator.Button>
</Paginator.Context>
```

### `Ellipsis`

Given it can be handy to be able to display ellipsis between pages of a paginator, there's a small utility known as `Ellipsis` just for this. Internally it uses comparison logic based on given `previousField` and `nextField` props. If there is room between these fields (say the values are `[1, 2]` and `[4, 5]`), it will render ellipsis. You can customize the outlook by passing custom children to it. Consider the example below:

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

> See `demo/` for a full implementation of the ideas discussed.

### Customize Tags

By default *react-pagify* uses `div`s for container, segments and ellipses, and `span`s for links. You can customize these tags and define custom props for htme:

```javascript
...

import Paginator from 'react-pagify';

...

<Paginator.Context className="pagination"
  tags={{
    container: {
      tag: 'ul'
    },
    segment: {
      tag: 'li'
    },
    ellipsis: {
      tag: 'li'
    },
    link: {
      tag: 'a',
      props: {
        href: '#'
      }
    }
  }}
  segments={{
    centerPage: [4]
  }} onSelect={(page) => console.log(page)}>
  <Paginator.Segment field="centerPage" />
</Paginator.Context>
```

## Related Projects

* [react-pagify-preset-bootstrap](https://www.npmjs.com/package/react-pagify-preset-bootstrap) - Bootstrap 3 preset by @sapegin.

## Contributors

* [rowbare](https://github.com/rowbare) - Allowed usage in Bootstrap by making `className` customizable.
* [Nadav Spiegelman](https://github.com/nadavspi) - Added optional ellipsesClassName prop, `showPrevNext` prop.
* [Nick Zarczynski](https://github.com/jacktrades) - Added configuration to always show prev/next buttons and allowed inactive buttons to be styled.
* [Nimi Wariboko Jr.](https://github.com/nemothekid) - Added support for `activeClassName`.
* [Artem Sapegin](https://github.com/sapegin) - Added `Added ellipsisButton` and `sidePages` props. Allowed paginator tags to be customized (important for Bootstrap).
* [Frederic Heem](https://github.com/FredericHeem) - Moved lodash to `peerDependencies`.
* [Alexander Ryzhikov](https://github.com/Coobaha) - Fixed global lodash import.

## License

*react-pagify* is available under MIT. See LICENSE for more details.
