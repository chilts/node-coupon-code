An implementation of Perl's [Algorithm::CouponCode][couponcode] for NodeJS. Thanks to [Grant][grant] for the
inspiration. :)

Note: this package is considered stable, hence it seems not much is happening, however all bugs get fixed
and currently no new features are planned. It is done.

# Synopsis #

```
var cc = require('coupon-code');

// generate a 3 part code
cc.generate();
=> '55G2-DHM0-50NN'

// generate a 4 part code
cc.generate({ parts : 4 });
=> 'U5H9-HKDH-8RNX-1EX7'

// generate a code with partLen of 6
cc.generate({ partLen : 6 });
=> WYLKQM-U35V40-9N84DA
```

Now, when someone types their code in, you can check that it is valid. This means that letters like `O`
are converted to `0` prior to checking.

```
// same code, just lowercased
cc.validate('55g2-dhm0-50nn');
=> '55G2-DHM0-50NN'

// various letters instead of numbers
cc.validate('SSGZ-DHMO-SONN');
=> '55G2-DHM0-50NN'

// wrong last character
cc.validate('55G2-DHM0-50NK');
=> ''

// not enough chars in the 2nd part
cc.validate('55G2-DHM-50NN');
=> ''

// validate a code with 4 parts
cc.validate('U5H9-HKDH-8RNX-1EX7', { parts : 4 });
=> U5H9-HKDH-8RNX-1EX7

// validate a code with partLen of 6
cc.validate('WYLKQM-U35V40-9N84DA', { partLen : 6 });
=> WYLKQM-U35V40-9N84DA
```

The first thing we do to each code is uppercase it. Then we convert the following letters to numbers:

* O -> 0
* I -> 1
* Z -> 2
* S -> 5

This means [oizs], [OIZS] and [0125] are considered the same code.

# Example #

Let's say you want a user to verify they got something, whether that is an email, letter, fax or carrier pigeon. To
prove they received it, they have to type the code you sent them into a certain page on your website. You create a code
which they have to type in:

```
var cc = require('coupon-code');

var code = cc.generate();
=> 55G2-DHM0-50NN
```

Time passes, letters get wet, carrier pigeons go on adventures and faxes are just as bad as they ever were. Now the
user has to type their code into your website. The problem is, they can hardly read what the code was. Luckily we're
somewhat forgiving since Z's and 2's are considered the same, O's and 0's, I's and 1's and S's and 5's are also mapped
to each other. But even more than that, the 4th character of each group is a checkdigit which can determine if the
other three in that group are correct. The user types this:

```
[s5g2-dhmo-50nn]
```

Because our codes are case insensitive and have good conversions for similar chars, the code is accepted as correct.

Also, since we have a checkdigit, we can use a client-side plugin to highlight to the user any mistake in their code
before they submit it. Please see the original project ([Algorithm::CouponCode][couponcode]) for more details of client
side validation.

# Installation

The easiest way to get it is via [npm][npm]:

``` bash
$ npm install coupon-code
```

# Tests

To run the tests, use npm:

```
$ npm test
```

# Author

* Written by [Andrew Chilton](http://chilts.org/blog/)
* Copyright 2011 [AppsAttic](http://appsattic.com/)
* Copyright 2013 [Andrew Chilton](http://chilts.org/)

# Inspired By

[Grant McLean](grant)'s [Algorithm::CouponCode][couponcode] - with thanks. :)

# License

MIT.

See [LICENSE][license] for more details.

[npm]: http://npmjs.org/
[couponcode]: https://github.com/grantm/Algorithm-CouponCode
[grant]: http://www.mclean.net.nz/
[license]: https://raw.github.com/appsattic/node-coupon-code/master/LICENSE
