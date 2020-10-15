#!/usr/bin/env node

const conf = require('./config.json');
const jsonfile = require('jsonfile')
const path = require('path');

async function init() {
    const { package, iconfont } = conf;
    if (!package.name || !package.version || !iconfont.symbol_url) {
        console.log('缺少必要信息，终止构建')
        process.exit(0);
    }
    try {
        await jsonfile.readFile(path.join(__dirname, `./package.json`))
        .then(obj => jsonfile.writeFile(path.join(__dirname, `./package.json`), Object.assign({}, obj, conf.package), { spaces: 2 }) )
        await jsonfile.readFile(path.join(__dirname, `./iconfont.json`))
        .then(obj => jsonfile.writeFile(path.join(__dirname, `./iconfont.json`), Object.assign({}, obj, conf.iconfont), { spaces: 2 }) )
    } catch (error) {
        throw error;
    }

}

init();