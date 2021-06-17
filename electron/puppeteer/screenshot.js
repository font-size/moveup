// 截图
const puppeteer = require('puppeteer');
const path = require('path');
const launch = require('./launch');

async function screenshot(url, name) {
    const timeTag = new Date().getTime();
    const imgName = name || timeTag
    const browserWSEndpoint = await launch();
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint,
        });
    const page = await browser.newPage();
    await page.goto(url || 'https://www.baidu.com');
    const imgPath = path.resolve('shotImg', `${imgName}.png`);
    await page.screenshot({path: imgPath});
    await browser.close();
    return imgPath;
}

module.exports = screenshot;