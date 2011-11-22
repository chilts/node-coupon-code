// --------------------------------------------------------------------------------------------------------------------
//
// coupon-code.js : An implementation of Perl's Algorithm::CouponCode for NodeJS.
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
// constants

var symbolsStr = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
var symbolsArr = symbolsStr.split('');
var symbolsObj = {};
var i = 0;
symbolsStr.split('').forEach(function(c) {
    symbolsObj[c] = i;
    i++;
});

// --------------------------------------------------------------------------------------------------------------------
// exports

module.exports.generate = function(opts) {
    if ( !opts ) {
        opts = {};
    }
    opts.parts = opts.parts || 3;

    // if we have a plaintext, generate a code from that
    if ( opts.plaintext ) {
        // not yet implemented
        return '';
    }
    else {
        // default to a random code
        var parts = [];
        var data;
        var part;
        for( var i = 0; i < opts.parts; i++ ) {
            data = randomSymbol() + randomSymbol() + randomSymbol();
            part = data + checkDigitAlg1(data, i+1);
            parts.push(part);
        }
    }

    return parts.join('-');
};

module.exports.validate = function(opts) {
    if ( !opts ) {
        return '';
    }

    // turn the string into a set of options
    if ( typeof opts === 'string' ) {
        opts = { code : opts, parts : 3 };
    }

    // default parts to 3
    opts.parts = opts.parts || 3;

    // if we have been given no code, this is not valid
    if ( !opts.code ) {
        return '';
    }

    var code = opts.code;

    // uppercase the code, take out any random chars and replace OIZS with 0125
    code = code.toUpperCase();
    code = code.replace(/[^0-9A-Z]+/g, '');
    code = code.replace(/O/g, '0');
    code = code.replace(/I/g, '1');
    code = code.replace(/Z/g, '2');
    code = code.replace(/S/g, '5');

    // split in the different parts
    var parts = [];
    var tmp = code;
    while( tmp.length > 0 ) {
        parts.push( tmp.substr(0, 4) );
        tmp = tmp.substr(4);
    }

    // make sure we have been given the same number of parts as we are expecting
    if ( parts.length !== opts.parts ) {
        return '';
    }

    // validate each part
    var part, str, check;
    for ( var i = 0; i < parts.length; i++ ) {
        part = parts[i];
        // check this part has 4 chars
        if ( part.length !== 4 ) {
            return '';
        }

        // split out the data and the check
        data = part.substr(0, 3);
        check = part.substr(3, 1);

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
    return symbolsArr[parseInt(Math.random() * symbolsArr.length)];
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

// --------------------------------------------------------------------------------------------------------------------
