var tap = require("tap"),
    test = tap.test,
    plan = tap.plan;
var cc = require('../coupon-code');

test("Validating Various Inputs", function (t) {
    var contents = /^[0-9A-Z-]+$/;
    var makeUp = /^\w{4}-\w{4}-\w{4}$/;

    var code1 = cc.generate({ plaintext : '1234567890' });
    console.log('code1=' + code1);

    t.ok(code1 !== '', 'generated a code from a static plaintext');
    t.ok(code1.match(contents), 'code comprises uppercase letter, digits and dashes');
    t.ok(code1.match(makeUp), 'pattern is XXXX-XXXX-XXXX');

    var code2 = cc.generate({ plaintext : '123456789A' });
    t.ok(code2, 'generated a second code from a static plaintext');
    t.ok(code2.match(contents), 'code2 comprises uppercase letter, digits and dashes');
    t.ok(code2.match(makeUp), 'pattern is XXXX-XXXX-XXXX');

    t.notEqual(code1, code2, 'second code differs from first');

    var code3 = cc.generate({ plaintext : '1234567890' });
    // t.equal(code1, code3, 'third code is same as first');

    var code4 = cc.generate();
    var code5 = cc.generate();
    t.notEqual(code4, code5, 'two codes without plaintexts supplied are different');

    // t.equal(code1, '1K7Q-CTFM-LMTC', 'code1 is exactly as expected');
    // t.equal(code2, 'X730-KCV1-MA2G', 'code2 is exactly as expected');

    t.end();
});
