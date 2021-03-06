﻿var fs = require('fs');
var path = require('path');

var fileFound = [];
function walk(parentDir, pattern) {
    var files = fs.readdirSync(parentDir);
    files.forEach(function(name) {
        var filePath = path.join(parentDir, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (name.match(pattern)) {
                fileFound.push({
                    name,
                    filePath
                });
            }
        }
        else {
            walk(filePath, pattern);
        }
    });
}

// 拷贝html
var rootDir = path.resolve(__dirname, '../../src/');
walk(rootDir, /.*html/g);
var distDir = path.resolve(__dirname, '../../dist/');
for (var i in fileFound) {
    var distPath = path.join(distDir, fileFound[i].name);
    if (fileFound[i]) {
        fs.copyFileSync(fileFound[i].filePath, distPath);
    }
}

// 拷贝MsgChannel.json
fs.copyFileSync(path.join(rootDir, './common/MsgChannel.json'), path.join(distDir, './MsgChannel.json'));
