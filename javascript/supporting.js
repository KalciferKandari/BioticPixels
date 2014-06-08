//----------
// Biotic Pixels 26 September 2013 07:10:00
//----------

(function () {

    "use strict";

    var SupportingScaling = Object.create(DynamicScaling);
    SupportingScaling.parameters = [
        [
            [0, 0],
            13,
            [256, 14],
            ["p, nav, a, ul, li, form",
                ["fontSize", 1]
            ],
            ["#bioticPixelsImage",
                ["height", 10], ["width", 10], ["marginTop", -5.5], ["paddingBottom", 0]
            ],
            ["#donating",
                ["top", -15]
            ],
            ["#donating form",
                ["marginTop", 0.4]
            ],
            ["#donating input",
                ["width", 5]
            ]
        ]
    ];

    SupportingScaling.scale();

    window.onresize = function (event) {SupportingScaling.scale(event)}; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope

}());