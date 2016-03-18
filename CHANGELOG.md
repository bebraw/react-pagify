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
