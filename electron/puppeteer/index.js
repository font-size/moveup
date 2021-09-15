const launch = require('./broswer/index')
const ke36 = require('./website/36ke')

// launch params
const puppeteerArgs = {
    ignoreHTTPSErrors: true,
    // headless: false, // 是否启用无头模式页面
    timeout: 0,
  };


// 爬虫主程序
async function crawler(params) {
    let {targetUrl, downType, targetDom} = params;
    if(!targetUrl[0].value) return;
    if (!targetDom || targetDom === '') {
        targetDom = 'body'
    }
    console.log('params: ', params);
    const browser = await launch(puppeteerArgs)
    const page = await browser.newPage();
    if (params.behavior === '36ke') {
        ke36(page, {downType, targetDom, url: targetUrl[0].value});
    } else if (params.behavior === 'taobao') {
    }
}







module.exports = crawler
