"use strict";
var request, PNG, mmcq, getDominantRGBColors, getDominantHexColors, getSiteRGBColor, getSiteHexColor;


/**
 * dependencies
 */
request = require('request').defaults({ encoding: null });
PNG = require('png-js');
mmcq = require('./mmcq').mmcq();


/**
 * Function to the dominant color from image
 *
 * @param img_src  image URL
 * @param cb  Callback function
 * @param ecb  Error callback function
 */
getDominantRGBColors = function (img_src, cb, ecb) {

    request.get(img_src, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            var img = new PNG(new Buffer(body));
            var quality = 5;
            var colorCount = 5;


            var width = img.width;
            var height = img.height;
            var pixelCount = width * height;
            img.decode(function (pixels) {
                // Store the RGB values in an array format suitable for quantize function
                var pixelArray = [];
                for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
                    offset = i * 4;
                    r = pixels[offset + 0];
                    g = pixels[offset + 1];
                    b = pixels[offset + 2];
                    a = pixels[offset + 3];
                    // If pixel is mostly opaque and not white
                    if (a >= 125) {
                        if (!(r > 250 && g > 250 && b > 250)) {
                            pixelArray.push([r, g, b]);
                        }
                    }
                }
                // Send array to quantize function which clusters values
                // using median cut algorithm
                var cmap = mmcq.quantize(pixelArray, colorCount);
                var palette = cmap.palette();
                if (cb) {
                    cb(palette);
                }
            });
        } else if (ecb) {
            ecb();
        }
    });
};

/**
 * Get Image dominant color in Hex format
 *
 * @param img_src
 * @param cb
 * @param ecb
 */
getDominantHexColors = function (img_src, cb, ecb) {
    var componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    var rgbToHex = function (r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };

    var myCb = function (ps) {
        var res = [];
        for (var i in ps) {
            var t = ps[i];
            var r = t[0], g = t[1], b = t[2];
            var color = rgbToHex(r, g, b);
            res.push(color);
        }
        cb(res);
    };
    getDominantRGBColors(img_src, myCb, ecb);
};

/**
 *
 * Get a site's dominant color in RGB format
 * @param domain
 * @param cb
 * @param ecb
 */
getSiteRGBColor = function (domain, cb, ecb) {
    var img_src = 'https://plus.google.com/_/favicon?domain=' + domain;
    getDominantRGBColors(img_src, cb, ecb);
};

/**
 *
 * Get a site's dominant color in HEX format
 * @param domain
 * @param cb
 * @param ecb
 */
getSiteHexColor = function (domain, cb, ecb) {
    var img_src = 'https://plus.google.com/_/favicon?domain=' + domain;
    getDominantHexColors(img_src, cb, ecb);
};


/**
 * Public API
 */
module.exports = {
    siteHex: getSiteHexColor,
    siteRgb: getSiteRGBColor,
    imgRgb: getDominantRGBColors,
    imgHex: getDominantHexColors
}
