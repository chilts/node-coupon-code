// --------------------------------------------------------------------------------------------------------------------
//
// test/generate.js : Test the generate function.
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
var cc = require('../coupon-code');

// --------------------------------------------------------------------------------------------------------------------

var contents = /^[0-9A-Z-]+$/;
var makeUp = /^\w{4}-\w{4}-\w{4}$/;
var makeUpLong = /^\w{9}-\w{9}-\w{9}-\w{9}-\w{9}$/;

test("Generating Random Coupon Codes", function (t) {
    // start with two random codes
    var code1 = cc.generate();
    var code2 = cc.generate();
    var codel = cc.generate({
        parts   : 5,
        partLen : 9,
    });

    // check their contents and makeUp
    t.ok(code1 !== '', 'code1 should not be empty');
    t.ok(code1.match(contents), 'code1 comprises uppercase letter, digits and dashes');
    t.ok(code1.match(makeUp), 'code1 pattern is XXXX-XXXX-XXXX');

    t.ok(code2 !== '', 'code2 should not be empty');
    t.ok(code2.match(contents), 'code2 comprises uppercase letter, digits and dashes');
    t.ok(code2.match(makeUp), 'code2 pattern is XXXX-XXXX-XXXX');

    t.ok(codel !== '', 'codel should not be empty');
    t.ok(codel.match(contents), 'code; comprises uppercase letter, digits and dashes');
    t.ok(codel.match(makeUpLong), 'codel pattern is XXXX...-XXXX...-XXXX...etcetc');

    // check that they aren't the same
    t.notEqual(code1, code2, 'two codes are different');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
