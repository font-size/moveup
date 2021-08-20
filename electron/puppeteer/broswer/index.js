const puppeteer = require('puppeteer');

function launch(args) {
    const browser = puppeteer.launch(args)
    return browser;
};
module.exports = launch;
