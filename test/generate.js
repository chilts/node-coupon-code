var tap = require("tap"),
    test = tap.test,
    plan = tap.plan;
var cc = require('../coupon-code');

var contents = /^[0-9A-Z-]+$/;
var makeUp = /^\w{4}-\w{4}-\w{4}$/;

test("Generating Random Coupon Codes", function (t) {
    // start with two random codes
    var code1 = cc.generate();
    var code2 = cc.generate();

    // check their contents and makeUp
    t.ok(code1 !== '', 'code1 should not be empty');
    t.ok(code1.match(contents), 'code1 comprises uppercase letter, digits and dashes');
    t.ok(code1.match(makeUp), 'code1 pattern is XXXX-XXXX-XXXX');

    t.ok(code2 !== '', 'code2 should not be empty');
    t.ok(code2.match(contents), 'code2 comprises uppercase letter, digits and dashes');
    t.ok(code2.match(makeUp), 'code2 pattern is XXXX-XXXX-XXXX');

    // check that they aren't the same
    t.notEqual(code1, code2, 'two codes without plaintexts supplied are different');

    t.end();
});

test("Generating Coupon Codes from a PlainText string", function (t) {
    var code1 = cc.generate({ plaintext : '1234567890' });
    t.ok(code1 !== '', 'generated a code from a static plaintext');
    t.ok(code1.match(contents), 'code comprises uppercase letter, digits and dashes');
    t.ok(code1.match(makeUp), 'pattern is XXXX-XXXX-XXXX');

    var code2 = cc.generate({ plaintext : '123456789A' });
    t.ok(code2, 'generated a second code from a static plaintext');
    t.ok(code2.match(contents), 'code2 comprises uppercase letter, digits and dashes');
    t.ok(code2.match(makeUp), 'pattern is XXXX-XXXX-XXXX');

    // these codes should be different since they came from different inputs
    t.equal(code1, '1K7Q-CTFM-LMTC', 'code1 is exactly as expected');
    t.equal(code2, 'X730-KCV1-MA2G', 'code2 is exactly as expected');

    // do it again and make sure it's the same as above
    var code3 = cc.generate({ plaintext : '1234567890' });
    t.equal(code1, code3, 'third code is same as first');

    t.end();
});
