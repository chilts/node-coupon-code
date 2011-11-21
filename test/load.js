// --------------------------------------------------------------------------------------------------------------------
//
// load.js - tests for node-coupon-code
//
// Copyright (c) 2011 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

var tap = require("tap"),
    test = tap.test,
    plan = tap.plan;
var cc;

// --------------------------------------------------------------------------------------------------------------------

test("load coupon-code", function (t) {
    cc = require("../coupon-code");
    t.ok(cc, "package loaded");

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
