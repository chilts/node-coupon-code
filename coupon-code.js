// --------------------------------------------------------------------------------------------------------------------
//
// coupon-code.js : An implementation of Perl's Algorithm::CouponCode for NodeJS.
//
// Author           : Andrew Chilton
// Web              : http://www.chilts.org/blog/
// Email            : <andychilton@gmail.com>
//
// Copyright (c)    : AppsAttic Ltd 2011
// Web              : http://www.appsattic.com/
// License          : http://opensource.org/licenses/MIT
//
// Copyright (c)    : Andrew Chilton 2013
// Web              : http://chilts.org/
// License          : http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// npm
var xtend = require('xtend');

// --------------------------------------------------------------------------------------------------------------------
// constants
var badWordsList = ('SHPX PHAG JNAX JNAT CVFF PBPX FUVG GJNG GVGF SNEG URYY ZHSS QVPX XABO ' +
                   'NEFR FUNT GBFF FYHG GHEQ FYNT PENC CBBC OHGG SRPX OBBO WVFZ WVMM CUNG')
                   .replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);})
                   .split(' ');
var symbolsStr = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
var symbolsArr = symbolsStr.split('');
var symbolsObj = {};
symbolsArr.forEach(function(c, i) {
    symbolsObj[c] = i;
});

var defaults = {
    parts   : 3,
    partLen : 4,
};

// --------------------------------------------------------------------------------------------------------------------
// exports

module.exports.generate = function(opts) {
    opts = xtend({}, defaults, opts);

    var parts = [];
    var part;
    var i;
    var j;

    // if we have a plaintext, generate a code from that
    if ( opts.plaintext ) {
        // not yet implemented
        return '';
    }
    else {
        // default to a random code
        do {
            parts.length = 0;
            for( i = 0; i < opts.parts; i++ ) {
                part = '';
                for ( j = 0; j < opts.partLen - 1; j++ ) {
                    part += randomSymbol();
                }
                part = part + checkDigitAlg1(part, i+1);
                parts.push(part);
            }
        } while (hasBadWord(parts.join('')))
    }

    return parts.join('-');
};

module.exports.validate = function(code, opts) {
    if ( !code ) {
        throw new Error("Provide a code to be validated");
    }
    opts = xtend({}, defaults, opts);

    // uppercase the code, take out any random chars and replace OIZS with 0125
    code = code.toUpperCase()
        .replace(/[^0-9A-Z]+/g, '')
        .replace(/O/g, '0')
        .replace(/I/g, '1')
        .replace(/Z/g, '2')
        .replace(/S/g, '5');

    // split in the different parts
    var parts = [];
    var tmp = code;
    while( tmp.length > 0 ) {
        parts.push( tmp.substr(0, opts.partLen) );
        tmp = tmp.substr(opts.partLen);
    }

    // make sure we have been given the same number of parts as we are expecting
    if ( parts.length !== opts.parts ) {
        return '';
    }

    // validate each part
    var part, str, check, data;
    for ( var i = 0; i < parts.length; i++ ) {
        part = parts[i];
        // check this part has 4 chars
        if ( part.length !== opts.partLen ) {
            return '';
        }

        // split out the data and the check
        data = part.substr(0, opts.partLen-1);
        check = part.substr(opts.partLen-1, 1);

        if ( check !== checkDigitAlg1(data, i+1) ) {
            return '';
        }
    }

    // everything looked ok with this code
    return parts.join('-');
};

// --------------------------------------------------------------------------------------------------------------------
// internal helpers

function randomSymbol() {
    return symbolsArr[parseInt(Math.random() * symbolsArr.length, 10)];
}

// returns the checksum character for this (data/part) combination
function checkDigitAlg1(data, check) {
    // check's initial value is the part number (e.g. 3 or above)

    // loop through the data chars
    data.split('').forEach(function(v) {
        var k = symbolsObj[v];
        check = check * 19 + k;
    });

    return symbolsArr[ check % 31 ];
}

function hasBadWord(code) {
    var i;
    code = code.toUpperCase();
    for( i = 0; i < badWordsList.length; i++ ) {
        if (code.indexOf(badWordsList[i]) > -1)
            return true;
    }
    return false;
};

// also export this (for testing)
module.exports.hasBadWord = hasBadWord

// --------------------------------------------------------------------------------------------------------------------
