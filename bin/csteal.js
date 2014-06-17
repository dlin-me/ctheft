#! /usr/bin/env node
/**
 * Created by davidlin on 11/04/2014.
 */
var ctheft, optimist, argv, scheme, type, func, target, reportFunc;

ctheft = require('../lib/ctheft');

/**
 * Setting up command line options
 */
optimist = require('optimist')
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

        });

argv = optimist.argv;

if(argv.h || !argv.s && !argv.i){
    optimist.showHelp( console.log );
    return
}

scheme = argv.rgb ? 'Rgb':'Hex';
type = argv.s ? 'site':'img';
func  = ctheft[type+scheme];
target = argv.s || argv.i;

if (func){
    reportFunc = function(c){console.log(c);};
    func(target, reportFunc, reportFunc);
}