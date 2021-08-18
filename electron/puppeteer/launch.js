// puppeteer launch

const puppeteer = require('puppeteer');
const path = require('path');
const {app} = require('electron');

let ChromiumPath = path.join(app.getAppPath(), "..", ".local-chromium", "win64-884014", "chrome-win","chrome.exe");

async function launch() {
    const browser = await puppeteer.launch({
        executablePath: ChromiumPath
    });
    return browser;
}
module.exports = launch