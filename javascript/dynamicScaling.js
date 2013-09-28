//----------
// Biotic Pixels 28 September 2013 06:36:06
//----------

(function () {

    "use strict";

    //----------
    // fontResize
    //----------
    // @TODO Make more reuseable??
    // @TODO Make getter and setters for parameters attribute
    // @TODO Make objects (in order to use a method as a callback, therefore having more confidence in the arguments being deliberate)
    //
    // Simple callback function that ensures that fonts scale correctly for all devices - something not possible with the CSS vw units, and more elegant that @media.
    // Utilises quadratic bezier curve (y = (1 - t)^2"p0" + 2(1 - t)t"p1" + t^2"p2", where t is progress between p0 and p2 ε [0, 1]) and linear equation (y = m * x + b, where x is windowWidth)
    //
    // Must create 'dynamicScalingParameters' variable following the following prototype:
    //
    //[[[float windowWidthKey (value of 0 recommended), float fontSizeKey0 (value of 0 recommended)], float fontSizeKey1 (steepness of line - relative to minimumFontSizeKey), [float maximumWindowWidthKey (for bezier scaling to take effect), float minimumFontSizeKey (before bezier scaling takes place), [string selector, [string property (properties to effect), float modifier], [...]], [...]], [...]]
    //
    // Looping key
    // [<curves>[<p0>[<windowWidthKey>x, <fontSizeKey>y], <b>p1, <p2>[<minimumWindowWidthKey>x, <minimumFontSizeKey>y], <styles>[selector, <properties>[property, modifier], [...]], [...]], [...]]

    Object.defineProperty(Object.prototype, 'DynamicScaling', {
        value: {

            // Set and get parameters

            parameters: [],

            square: function (x) {
                return x * x;
            },

            scale: function () {

                // Retrieve external CSS styles (assumes there is only one stylesheet as the title attributes is an empty string, making it difficult to distinguish between them)
                var css = document.styleSheets[0];
                var block = css.cssRules ? css.cssRules : css.rules;

                var windowWidth = window.innerWidth;

                // Iterate through the multidimensional array (chosen for superior computing speed)
                for (var curvesCounter = 0; curvesCounter < this.parameters.length; curvesCounter++) { // For every curve

                    var p0X = this.parameters[curvesCounter][0][0];
                    var p0Y = this.parameters[curvesCounter][0][1];
                    var p1X = 0;
                    var p1Y = this.parameters[curvesCounter][1];
                    var p2X = this.parameters[curvesCounter][2][0];
                    var p2Y = this.parameters[curvesCounter][2][1];

                    for (var blockCounter = 0; blockCounter < block.length; blockCounter++) { // For every CSS code block

                        for (var stylesCounter = 3; stylesCounter < this.parameters[curvesCounter].length; stylesCounter++) { // For every style

                            var selector = this.parameters[curvesCounter][stylesCounter][0];

                            if (block[blockCounter].selectorText.toLowerCase() === selector) { // For every code block in the external CSS file

                                for (var propertiesCounter = 1; propertiesCounter < this.parameters[curvesCounter][stylesCounter].length; propertiesCounter++) { // For every property

                                    var property = this.parameters[curvesCounter][stylesCounter][propertiesCounter][0];
                                    var modifier = this.parameters[curvesCounter][stylesCounter][propertiesCounter][1];

                                    if (windowWidth >= p0X && windowWidth < p2X) { // Do quadratic bezier curve algebra
                                        var t = windowWidth / p2X; // t is just the percentage progress between p0 and p2 represented as a number between 0 and 1
                                        var algebra = (this.square(1 - t)) * p0Y + (2 * (1 - t) * t * p1Y) + (this.square(t)) * p2Y;
                                    } else { // Do line algebra
                                        var algebra = ((p2Y - p1Y) / p2X) * windowWidth + p1Y;
                                    }

                                    block[blockCounter].style[property] = String(algebra * modifier) + "px";

                                }
                            }
                        }
                    }
                }
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });
}());
