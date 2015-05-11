// --------------------------------------------------------------------------------------------------------------------
//
// test/badWords.js : Test the generate function.
//
// Author           : Phil Hannent
// Web              : https://www.hannent.uk
// Email            : <phil@hannent.uk>
//
// Copyright (c)    : 2015 Phil Hannent
// License          : http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require("tape");

// local
var cc = require('../coupon-code');

// --------------------------------------------------------------------------------------------------------------------

var badWordsList = ('SHPX PHAG JNAX JNAT CVFF PBPX FUVG GJNG GVGF SNEG URYY ZHSS QVPX XABO ' +
    'NEFR FUNT GBFF FYHG GHEQ FYNT PENC CBBC OHGG SRPX OBBO WVFZ WVMM CUNG')
        .replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);})
        .split(" ");

test("Checking that bad words can be found", function (t) {
    var i;
    // check each rude word not locatable in the string
    for( i = 0; i < badWordsList.length; i++ ) {
        t.ok( cc.hasBadWord(badWordsList[i] + 'YYYYZZZZ'), 'Bad word found at start of code');
        t.ok( cc.hasBadWord('XXXX' + badWordsList[i] + 'ZZZZ'), 'Bad word found in middle of code');
        t.ok( cc.hasBadWord('YYYYZZZZ' + badWordsList[i]), 'Bad word found at end of code');
    }

    t.ok(cc.hasBadWord('XXXX' + badWordsList[0].toLowerCase() + 'YYYYZZZZ'), 'Lower case bad word found in code');
    t.ok(!cc.hasBadWord('XXXXYYYYZZZZ'), 'No bad words found in code');

    t.end();
});

// --------------------------------------------------------------------------------------------------------------------
