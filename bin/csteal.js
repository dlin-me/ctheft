#! /usr/bin/env node
/**
 * Created by davidlin on 11/04/2014.
 */

var ctheft = require('../lib/ctheft');
var optimist = require('optimist')
        .usage('Usage: $0 -s [site domain] -i [image url] -rgb -h')
        .options('s', {
            alias : 'site',
            describe : 'Website domain'
        })
        .options('i', {
            alias : 'img',
            describe: 'Image URL'
        })
        .options('rgb', {
            describe: 'Output color in RGB value ( Hex by default )'

        })
        .options('h', {
            alias: 'help',
            describe: 'Show usage'

        })

        ;

var argv = optimist.argv;

if(argv.h || !argv.s && !argv.i){
    optimist.showHelp( console.log )
    return
}

var scheme = argv.rgb ? 'Rgb':'Hex';
var type = argv.s ? 'site':'img';
var func  = ctheft[type+scheme];
var target = argv.s || argv.i;

if (func){
    var reportFunc = function(c){console.log(c);};
    func(target, reportFunc, reportFunc);
}