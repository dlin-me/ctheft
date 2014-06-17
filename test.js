/**
 * Usage: node test.js
 */

var theft = require('./lib/ctheft');
var assert = require('assert');
var async = require('async');
var eq;

/**
 * Assertion function
 * @param a
 * @param b
 */
eq = function(a, b) {
    console.log('Test: ' + a + ' === ' + b);
    assert.strictEqual.apply(null, arguments);
}


//
// Tests
//

var test1 = function(cb){
    theft.siteHex('http://www.facebook.com', function(c){
        eq(5, c.length);
        eq('#4c64a4', c[0]);
        eq('#c0c4d8', c[1]);
        eq('#647cbc', c[2]);
        eq('#4464ac', c[3]);
        eq('#3c4c84', c[4]);
        cb()
    }, cb);
}

var test2 = function(cb){
    var primeColor;
    theft.siteRgb('http://www.facebook.com', function(c){
        primeColor = c[0];
        eq(3, primeColor.length);
        eq(76, primeColor[0]);
        eq(100, primeColor[1]);
        eq(164, primeColor[2]);
        cb()
    }, cb);
}


//Run the test in series
async.series([test1, test2], function(err){
    if(err){
        console.log('\nFailed');
    }else{
        console.log('\nOK');
    }
});


