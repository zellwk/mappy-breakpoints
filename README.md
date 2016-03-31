# Mappy Breakpoints, A Breakpoint Mixin that uses Sass Maps

Mappy Breakpoints is a breakpoint mixin I have hacked together to streamline web development when using a Sass map to hold the breakpoint plugin. [Here's why I made this mixin](http://www.zell-weekeat.com/mappy-breakpoints)

Here's a quick example. Say you a breakpoints map and you want to grab do a `min-width` query for `small` and `max-width` query for `large`.

~~~scss
$breakpoints: (
  'small': 320px,
  'large': 920px
);

@include mappy-bp(small large) {
  // stuff here
}
~~~

This will automatically create a media query plus convert it into em at the same time. It will also minus off 1px from the `max-width` query to ensure that your breakpoints don't overlap each other.

~~~css
/* output */
@media all and (min-width: 20em) and (max-width: 57.4375em) {
  // stuff
}
~~~

## Installation

You can install mappy-breakpoints via Bower

~~~bash
$ bower install mappy-breakpoints --save
~~~

Then import it in your stylesheet:

~~~scss
// scss
@import "path-to-bower_components/mappy-breakpoints/mappy-breakpoints";
~~~

You can also install mappy-breakpoints via NPM as well

~~~bash
$ npm install mappy-breakpoints --save
~~~

Alternatively, you can download this mixin add import it directly into your stylesheet.

## Usage

### Mappy-breakpoints (Mixin)

Mappy-breakpoints takes in 4 arguments. Only the first one is mandatory. The rest are optional and come with some defaults.

~~~scss
@import mappy-bp(<$queries>, [<$type>, <$query-fallback>, <$breakpoints>]) {
  // stuff here
}
~~~

Most of the time you'll only be working with the `$queries` argument. Take a look at the [queries](#queries)section for more info.

### Mappy-query(Mixin)

`mappy-query` is a mixin that allows you to use any `mappy-bp` query repeatedly across your site. It requires you to have a `$mappy-queries` map.

This `$mappy-queries` map can contain any valid `mappy-bp` values, even if you use identifiers from the `breakpoints` map.

~~~scss
$breakpoints: (
  small: 480px,
  large: 800px
)

// You can use and valid arguments inserted into mappy-bp as the map values. Any of the following would do
$mappy-queries: (
  phone: mappy-bp(h max-height small), // media all and (max-height: 29.9375em)
  tablet: mappy-bp(small large), // @media all and (min-width 30em) and (max-width: 49.375em)
  desktop: mappy-bp(960px 1200px), // media all and (min-width: 60em) and (max-width: 74.9375em)
  change-type: mappy-bp(small, $type: screen) // media screen and (min-width: 30em)
)
~~~

Once you have the query stored in the `$mappy-queries` map, you can use it anywhere with the `mappy-query` mixin.

~~~scss
@include mappy-query(tablet) {
  // stuff
}
~~~

~~~css
/* output */
  @media all and (min-width: 30em) and (max-width: 49.9375em) {
  // stuff
}
~~~

## Queries

Mappy-breakpoints focuses on three types of queries.

1. width queries (`min-width` and `max-width`)
2. height queries (`min-height` and `max-height`)
3. The rest.

### Width Queries

Width queries are the most common type of queries. You can call for width queries by simply entering the map key or the breakpoint.

Mappy breakpoints will also automatically convert the queries into the `em`.

If only one value is provided, mappy-breakpoints will produce a `min-width` query.

~~~scss
// Min Width Query
// ---------------
@include mappy-bp(small) {
  // stuff
}

// Translates into
@media all and (min-width: 20em) {
  // stuff
}
~~~

If a two values are provided, mappy-breakpoints will produce a `min-width` and `max-width` query.

~~~scss
// Min Width And Max Width Query
// -----------------------------
@include mappy-bp(small 920px) {
  // stuff
}

// Translates into
@media all and (min-width: 20em) and (max-width: 57.4375em) {
  //stuff
}
~~~

If a `max-width` or `max` string is provided, `mappy-breakpoints()` will produce a `max-width` query.

~~~
// Max Width Query
// ---------------

// You can also use `max` instead of `max-width`
@include mappy-bp(max-width 320px) {
  // stuff
}

// Translates into
@media all and (max-width: 19.9375em) {
  // stuff
}
~~~

### Height Queries

Height queries in Mappy Breakpoints are set up with the `h` or `height` string. The following two arguments will be exactly the same as width queries. The only difference is that they output `min-height` and `max-height`.

It can use the same `$breakpoints` map as well.

~~~scss
// Min Height Query
// ---------------
@include mappy-bp(h small) {
  // stuff
}

// Translates into
@media all and (min-height: 20em) {
  // stuff
}

// Min Height And Max Height Query
// -----------------------------
@include mappy-bp(h small 920px) {
  // stuff
}

// Translates into
@media all and (min-height: 20em) and (max-height: 57.4375em) {
  //stuff
}
~~~

If a `max-height` or `max` string is provided, `mappy-breakpoints()` will produce a `max-height` query.

// Max Height Query
// ---------------

// You can also use `max` instead of `max-height`
@include mappy-bp(max-height 320px) {
  // stuff
}

// Translates into
@media all and (max-height: 19.9375em) {
  // stuff
}
~~~

### Other Queries

Other queries can be written in a key value format, without the parenthesis or colon.

~~~scss
@include mappy-bp(orientation portrait) {
  // stuff
}

// Translates into
@media all and (orientation: portrait) {
  // stuff
}
~~~

### Using All 3 Types of queries together.

All 3 types of queries can be combined to form one complex query. Write it in order as follows:

1) Width Queries
2) Height Queries
3) Other (key value) queries

~~~scss
@include mappy-bp(small large h 320px 920px orientation portrait) {
  // stuff
}

// Translates into
@media all and (min-width: 20em) and (max-width: 57.4375em) and (min-height: 20em) and (max-height: 57.4375em) and (orientation: portrait) {
  // stuff
}
~~~


## Optional Arguments.

`$type` determines media-type. Any valid string can be used here. If type is set to `print`, then mappy-breakpoints will produce a print query.

~~~css
@media print and.. {
  // stuff
}
~~~

`$query-fallback` provides an extra class for any browsers that do not support media queries (IE 8 I'm looking at you). Since most browsers support media queries now, this shouldn't be too much of a problem, but is still here incase someone needs it.

if `$query-fallback` is set to the `'ie8` string, then mappy breakpoints create produce an `.ie8` class for the query.

~~~css
.ie8 .selector {
  // stuff
}
~~~

Finally, `$breakpoints` determines which map to use for the width and height queries. It defaults to `$breakpoints`.

## Changelog

#### v0.2.0
- Added Mappy-query function for [#4](https://github.com/zellwk/mappy-breakpoints/issues/4#issuecomment-117822409)

#### v0.1.3

- Fixed error "Incompatible units: ‘em’ and ‘px/px’"

#### v0.1.2

- Changed media queries into em unit instead of rem unit