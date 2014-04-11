ctheft
======	

Color Theft - Retrieve colors from image or site domain in NodeJs


1. Installation
-----
```
npm install ctheft
```
ctheft comes with a executable binary 'csteal', to use it you can install it as global

```
npm -g install ctheft
```




2. Usage
-------
ctheft provides 4 easy to use methods


```
var ctheft = require('ctheft');

var google = 'google.com'; //site domain
var pngUrl = 'https://www.google.com.au/images/srpr/logo11w.png'; //a PNG image

var showResult = function(result){
	console.log(result);
};

var showErr = function(err){
	console.log(err);
};

//Get RGB colors of a website by domain
ctheft.siteRgb(google, showResult, showErr);

//Get Hex colors of a website by domain
ctheft.siteHex(google, showResult, showErr);

//Get PNG file colors by URL
ctheft.imgRgb(pngUrl, showResult, showErr);

//Get PNG file colors by URL
ctheft.imgHex(pngUrl, showResult, showErr);







```


3. Binary
----

ctheft comes with a executable binary 'csteal'. Running the csteal command with no parameter will show you the following hint

```
Usage: node ./bin/csteal.js -s [site domain] -i [image url] -rgb -h

Options:
  -s, --site  Website domain                              
  -i, --img   Image URL                                   
  --rgb       Output color in RGB value ( Hex by default )
  -h, --help  Show usage       
```


4. Limitation
--------

- Only support PNG files on accessible URL
- ctheft use website's favicon to get the colors. While this will work most of the time, ctheft won't work as expected if the given website does not have a favicon


5. License
--------

Free, as it is.


