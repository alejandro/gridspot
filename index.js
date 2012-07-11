/*
 * gridspot
 * https://github.com/alejandromg/gridspot
 *
 * Copyright (c) 2012 Alejandro Morales
 * Licensed under the MIT license.
 */
/*jshint laxcomma:true, debug:true, node:true */

"use strict";

var request = require('request')
  , fs      = require('fs')
  , path    = require('path')
  , params = {}
  , cfg    = {}
  , config = {};

cfg.file = path.join(process.env.HOME, '.gridspot');

var API_KEY = process.argv[2] || process.argv[3]; // just if --k <key>

try {
    config = JSON.parse(fs.readFileSync(cfg.file, 'utf8'));
    console.dir = require('cdir');
} catch (exc) {
    if (!API_KEY || !config.api) showHelp();
}


var reg = new RegExp('=.*', 'gi');

for (var key in process.argv){
    var attr = process.argv[key];

    if (/--/gi.test(attr) || /-/gi.test(attr)){
        var attri = attr.replace(/--/,'')
                        .replace(/-/,'')
                        .replace(reg,'');
        if (reg.test(attr)){
            params[attri] = attr.split('=')[1];
        } else {
            params[attri] = process.argv[++key] || true;
        }
    }
}

function showHelp (){
    console.log('\n\tGridspot for your cli\n');
    console.log('\tusage:\n');
    console.log('\t\tgridspot -k, --key <API_KEY>\t Simple usage. <API_KEY> from https://gridspot.com/compute/account');
    console.log('\t\tgridspot -s,--save <API_KEY>\t Save the <API_KEY> to ~/.gridspot so future request you can avoid the api key.');
    console.log('\t\tgridspot -i <API_KEY>\t\t Interactive response (if available)');
    console.log('\t\tgridspot -r, --raw <API_KEY>\t Raw response');
    console.log('\t\tgridspot -v, --version \t\t Current version');
    console.log('\t\tgridspot -h, --help \t\t Show this help');
    console.log('\n\tBy Default it\'ll only show the ssh servers');
    console.log('\n');
    process.exit(1);
}

if (params.help || params.h) return showHelp();

if (params.s || params.save) {
    params.s = params.s || params.save;
    fs.writeFile(cfg.file, JSON.stringify({api: params.s}, null, 2), function (error, response){
        if (error) throw error;
        console.log('Your api key is saved now.');
        process.exit(1);
    });
}

if (params.version || params.v) {
    console.log(require('./package.json').version);
    process.exit(1);
}


if (params) API_KEY = params.key || params.k;

var key = API_KEY || config.api;
var loop = 0;

if (key) {
    console.log('Requesting your instances');
    request({
        uri: 'https://gridspot.com/compute_api/v1/list_instances',
        port: 443,
        qs: {'api_key': key}
    }, function (error, response){
        if (error) throw error;
        if (~response.body.search('<html')) throw new Error('The response is malformed');
        response.body = JSON.parse(response.body);
        if (params.raw) return console.log(JSON.stringify(response.body, null, 2));
        if (params.i) return console.dir(response.body);
        console.log('Servers: (id, ip, state)');
        response.body.instances.forEach(function (instance) {
            console.log('\t',++loop+'.- ', instance.vm_ssh_wan_ip_endpoint, instance.current_state);
        });
    });
}
