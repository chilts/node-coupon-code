An implementation of Perl's [Algorithm::CouponCode][couponcode] for NodeJS. Thanks to [Grant][grant] for the
inspiration. :)

# Example

    ....

# Motivation

You've sent someone an email so that they can confirm their email address. Generally you include a link back to a
verification page with the code given as a parameter. Probably something like this:

* http://www.example.com/verify-email?code=Hoh4saiS

But, what if they can't click the link, they'll have to type it in. Using Coupon Codes helps the user verify their
email address with fewer problems, typo correction and a checkdigit.

# Installation

The easiest way to get it is via [npm][npm]

``` bash
    $ npm install coupon-code
```

# Tests

To run the test, use npm:

    $ npm test

# Author

Written by [Andrew Chilton](http://www.chilts.org/blog/)

Copyright 2011 [AppsAttic](http://www.appsattic.com/)

# License

MIT.

See [LICENSE][license] for more details.

[npm]: http://npmjs.org/
[couponcode]: https://github.com/grantm/Algorithm-CouponCode
[grant]: https://github.com/grantm/
[license]: https://raw.github.com/appsattic/node-coupon-code/master/LICENSE
