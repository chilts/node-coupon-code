// --------------------------------------------------------------------------------------------------------------------
//
// test/validate.js : Test the validate function.
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

test("Validating Various Inputs", function (t) {
    try {
        t.ok(!cc.validate(), 'missing code failed validation');
        t.fail('Validate should have failed with no code');
    }
    catch(e) {
        t.pass('Validate threw when given no code');
    }

    t.ok( cc.validate('1K7Q-CTFM-LMTC'), 'valid code accepted');
    t.ok(!cc.validate('1K7Q-CTFM'), 'short code rejected');

    t.ok( cc.validate('1K7Q-CTFM', { parts : 2 }), "but accepted with correct 'parts'");
    t.ok(!cc.validate('CTFM-1K7Q', { parts : 2 }), "parts must be in correct order");

    t.ok( cc.validate('QBXA5CV4Q85E-HNYV4U3UD69M-B7XU1BHF3FYE-HXT9LD4Q0DAH-U6WMKC1WNF4N-5PCG5C4JF0GL-5DTUNJ40LRB5', { parts : 7, partLen : 12 }), "but accepted with correct 'parts'");

    t.equal( cc.validate('1k7q-ctfm-lmtc'), '1K7Q-CTFM-LMTC', "lowercase code is fixed and valid");

    t.equal(cc.validate('I9oD-V467-8D52'), '190D-V467-8D52', "'o' is fixed to '0'");
    t.equal(cc.validate('I9oD-V467-8D52'), '190D-V467-8D52', "'O' is fixed to '0'");
    t.equal(cc.validate('i9oD-V467-8D52'), '190D-V467-8D52', "'i' is fixed to '1'");
    t.equal(cc.validate('i9oD-V467-8D52'), '190D-V467-8D52', "'I' is fixed to '1'");
    t.equal(cc.validate('i9oD-V467-8D5z'), '190D-V467-8D52', "'z' is fixed to '2'");
    t.equal(cc.validate('i9oD-V467-8D5z'), '190D-V467-8D52', "'Z' is fixed to '2'");
    t.equal(cc.validate('i9oD-V467-8Dsz'), '190D-V467-8D52', "'s' is fixed to '5'");
    t.equal(cc.validate('i9oD-V467-8Dsz'), '190D-V467-8D52', "'S' is fixed to '5'");

    t.equal(cc.validate('i9oD/V467/8Dsz'), '190D-V467-8D52', "alternative separator is accepted and fixed");

    t.equal(cc.validate(' i9oD V467 8Dsz '), '190D-V467-8D52', "whitespace is accepted and fixed");

    t.equal(cc.validate(' i9oD_V467_8Dsz '), '190D-V467-8D52', "underscores are accepted and fixed");

    t.equal(cc.validate('i9oDV4678Dsz'), '190D-V467-8D52', "no separator is required");

    t.ok( cc.validate('1K7Q', { parts : 1 }), 'valid code-pretest');
    t.ok(!cc.validate('1K7C', { parts : 1 }), 'invalid checkdigit rejected in part 1');

    t.ok( cc.validate('1K7Q-CTFM', { parts : 2 }), 'valid code-pretest');
    t.ok(!cc.validate('1K7Q-CTFW', { parts : 2 }), 'invalid checkdigit rejected in part 2');

    t.ok( cc.validate('1K7Q-CTFM-LMTC', { parts : 3 }), 'valid code-pretest');
    t.ok(!cc.validate('1K7Q-CTFM-LMT1', { parts : 3 }), 'invalid checkdigit rejected in part 3');

    t.ok( cc.validate('7YQH-1FU7-E1HX-0BG9', { parts : 4 }), 'valid code-pretest');
    t.ok(!cc.validate('7YQH-1FU7-E1HX-0BGP', { parts : 4 }), 'invalid checkdigit rejected in part 4');

    t.ok( cc.validate('YENH-UPJK-PTE0-20U6-QYME', { parts : 5 }), 'valid code-pretest');
    t.ok(!cc.validate('YENH-UPJK-PTE0-20U6-QYMT', { parts : 5 }), 'invalid checkdigit rejected in part 5');

    t.ok( cc.validate('YENH-UPJK-PTE0-20U6-QYME-RBK1', { parts : 6 }), 'valid code-pretest');
    t.ok(!cc.validate('YENH-UPJK-PTE0-20U6-QYME-RBK2', { parts : 6 }), 'invalid checkdigit rejected in part 6');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
