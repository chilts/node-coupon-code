// --------------------------------------------------------------------------------------------------------------------
//
// test/validate.js : Test if there are more that one valid checkdigit
//
// Author           : Diego A. Fliess
// Email            : <dfliess@gmail.com>
//
// Copyright (c)    : 2013 Diego A. Fliess
// License          : http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

var tap = require("tap"),
    test = tap.test,
    plan = tap.plan;
var cc = require('../coupon-code');

// --------------------------------------------------------------------------------------------------------------------

test("Validating That Only One Checkdigit is valid", function (t) {


	//test standard 4 Digit parts
	testAllSymbols('1K7','Q',1,4);
	testAllSymbols('1K7Q-CTF','M',2,4);
	testAllSymbols('1K7Q-CTFM-LMT','C',3,4);
	testAllSymbols('7YQH-1FU7-E1HX-0BG','9',4,4);
	testAllSymbols('YENH-UPJK-PTE0-20U6-QYM','E',5,4);
	testAllSymbols('YENH-UPJK-PTE0-20U6-QYME-RBK','1',6,4);

	//test 5 Digit parts
	testAllSymbols('CQQU','2',1,5);
	testAllSymbols('0Y6CX-43G8','T',2,5);
	testAllSymbols('6REV2-MD8DW-P4NR','G',3,5);
	testAllSymbols('3C41V-M3B30-5U2B0-1MEU','U',4,5);
	testAllSymbols('C2KEC-K60K6-2PGYU-XLW78-1BL0','4',5,5);
	testAllSymbols('A193P-LVV9F-1WK6G-9QP4L-J24NK-K4VN','Q',6,5);

	//test 2 Digit parts
	testAllSymbols('C','0',1,2);
	testAllSymbols('M9-5','C',2,2);
	testAllSymbols('AW-07-E','9',3,2);
	testAllSymbols('D1-5C-FA-Q','7',4,2);
	testAllSymbols('1L-BJ-QK-3H-5','7',5,2);
	testAllSymbols('NA-MV-0T-1F-JL-K','9',6,2);


	function testAllSymbols(testPart, validCheckDigit, parts, partLen) {
		var symbolsStr = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
		var symbolsArr = symbolsStr.split('');

		for (var i=0;i<symbolsArr.length;i++) {
			if (symbolsArr[i]==validCheckDigit) {
				t.ok( cc.validate({ code : testPart + validCheckDigit, parts: parts, partLen: partLen }), 'valid check digit ' + validCheckDigit + ' accepted for ' + testPart);
			} else {
				t.ok( !cc.validate({ code : testPart + symbolsArr[i], parts: parts, partLen: partLen }), 'invalid check digit ' + symbolsArr[i] + ' rejected for ' + testPart);
			}
		}
	}
    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
