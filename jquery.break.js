/**
 * jQuery.break()
 *
 * (c) Wil Neeley, Trestle Media, LLC.
 * Code may be freely distributed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

  // The plugin's name
  var pluginName = 'break';

  // The plugin's defaults
  var defaults = {

    // Since media queries measurement of the the viewport sizes differs from JavaScript's measurement, when this option
    // is configured to true, we calculate the scroll bar width of the window and add it to JavaScript's calculation to
    // compensate.
    media: false,

    // An array of breakpoint objects. Each object contains the point at which a break should occur and contains the
    // callbacks to execute once above, once below, continuously above, and continuously below.
    points: [
      {
        point: 768,
        name: undefined,
        onBelow: function( point, width ) {},
        onAbove: function( point, width ) {},
        onBelowOnce: function( point, width ) {},
        onAboveOnce: function( point, width ) {}
      }
    ]
  };

  // Plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype.init = function() {
    var plugin = this;

    // Determine the scroll bar width
    var parent, child, scroll_width;
    if ( scroll_width === undefined ) {
      parent = $('<div style="width:50px; height:50px; overflow:auto"><div/></div>').appendTo('body');
      child = parent.children();
      scroll_width = child.innerWidth() - child.height(99).innerWidth();
      parent.remove();
    }

    // For each breakpoint, attach the default happen once flags
    $.each(plugin.options.points, function(index, breakpoint) {
      breakpoint['_once_below'] = true;
      breakpoint['_once_above'] = true;
    });

    // Define our resize handler
    var resizeBreakpointHandler = function() {
      var width = plugin.options.media ? $(plugin.element).width() + scroll_width : $(plugin.element).width();

      // For each breakpoint, perform our tests
      $.each(plugin.options.points, function(index, breakpoint) {

        // Breakpoint is below
        if ( width < breakpoint.point ) {

          // Execute breakpoint code once
          if (breakpoint._once_below) {
            breakpoint._once_below = false;
            breakpoint._once_above = true;

            // Only execute the callback if it is defined
            if ('onBelowOnce' in breakpoint) {
              breakpoint.onBelowOnce( width, breakpoint.point );
            }
          }

          // Execute breakpoint callback continuously if it is defined
          if ('onBelow' in breakpoint) {
            breakpoint.onBelow( width, breakpoint.point );
          }

          // Breakpoint is above
        } else {

          // Execute breakpoint code once
          if (breakpoint._once_above) {
            breakpoint._once_above = false;
            breakpoint._once_below = true;

            // Only execute the callback if it is defined
            if ('onAboveOnce' in breakpoint) {
              breakpoint.onAboveOnce( width, breakpoint.point );
            }
          }

          // Execute breakpoint callback continuously if it is defined
          if ('onAbove' in breakpoint) {
            breakpoint.onAbove( width, breakpoint.point );
          }
        }
      });
    };

    // Attach the our resize handler to the resize event
    $(this.element).bind('resize', resizeBreakpointHandler);

    // Call the resize handler once initially
    resizeBreakpointHandler();
  };

  // Plugin wrapper around constructor preventing multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );