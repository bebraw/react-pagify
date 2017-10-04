2.4.0 / 2017-10-04
==================

  * React 16 support. #31

2.3.0 / 2017-07-15
==================

  * Add `files` field to **package.json**. #30

2.2.0 / 2017-05-15
==================

  * Migrate to React 15.5. #29

2.1.1 / 2016-07-05
==================

  * Add `.pagify-pagination .disabled span` style. This is useful if you want to disable previous/next button. #27

2.1.0 / 2016-07-05
==================

  * Fix React 15 compatibility errors/warnings. It shouldn't pass extra props to elements anymore.

2.0.4 / 2016-04-08
==================

  * Expand React peer dependency range to include React 15.

2.0.3 / 2016-04-01
==================

  * Fix *lodash* `external` definition. It's not included to the `dist` bundle anymore. #22.

2.0.2 / 2016-03-18
==================

  * Use local *lodash* import over a global one. Thanks @Coobaha!

2.0.1 / 2016-02-13
==================

  * Remove *lodash* from `dist` bundle. Now it's handled as a `peerDependency`. Thanks @FredericHeem!

2.0.0 / 2016-02-09
==================

  * Allowed tags and their props to be customized. This makes it possible to adapt the paginator to fit Bootstrap. Thanks @sapegin!
  * Added `Button` to make it easier to implement controls like *previous*/*next*.

1.0.0 / 2016-02-06
==================

  * Complete rewrite. Extracted *segmentize* to a package of its own and changed the design to be context based. This made it more flexible than the old design while heavily decreasing the amount of props needed.
