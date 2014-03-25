# jQuery Break

Version 1.0.0

## Summary

Allows useful callbacks to be fired at set "breakpoints" or window sizes reached upon resizing the viewport so as to create responsive web applications.

## Author

Wil Neeley ( [@wilneeley](http://twitter.com/wilneeley) / [trestlemedia.net](http://www.trestlemedia.net) / [github.com](https://github.com/Xaxis) )

## Usage

Include `jquery.break.min.js` after jQuery.

### Initialize Breakpoints

```javascript
$(window).break({
  media: true,
  points: [
    {
      point: 760,
      onBelow: function( width, point ) {},
      onAbove: function() {},
      onBelowOnce: function() {},
      onAboveOnce: function() {}
    },
    {
      point: 1240,
      onBelow: function( width, point ) {},
      onAbove: function() {},
      onBelowOnce: function() {},
      onAboveOnce: function() {}
    }
  ]
});
```

### Caveats

Setting the `media` property to `true` causes registered breakpoints to fire at the same point as media queries that are also set to fire at the same pixel by calculating the width of the scroll bar on the initialized element since the media query measurement of the viewport differs from jQuery.width()'s measurement of the document window.

## Requirements/Browsers

Tested with jQuery 1.4.x.

Works in IE6+, Chrome 14+, Safari 4+, Firefox 3.0+, Opera 10+.

## Examples

See `example.html` in examples folder.

### Changelog

#### Version 1.0.0

* initial version