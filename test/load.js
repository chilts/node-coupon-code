// --------------------------------------------------------------------------------------------------------------------
//
// test/load.js     : Load coupon-code.js correctly
//
// Author           : Andrew Chilton
// Web              : http://www.chilts.org/blog/
// Email            : <chilts@appsattic.com>
//
// Copyright (c)    : 2011 AppsAttic Ltd
// Web              : http://www.appsattic.com/
// License          : http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require("tape");

// local
var cc;

// --------------------------------------------------------------------------------------------------------------------

test("load coupon-code", function (t) {
    cc = require("../coupon-code");
    t.ok(cc, "package loaded");

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
