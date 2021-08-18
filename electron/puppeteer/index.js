const initPuppeteerPool = require('./pool/index');

const getWebUrlPath = require('./path/webUrlPath'); // 用url设置下载文件夹路径
const downImg = require('./download/img'); // 下载图片
const writeFile = require('./fileWrite/writeFile'); // 写入文件

const browser = initPuppeteerPool({
    // 全局只应该被初始化一次
    puppeteerArgs: {
        ignoreHTTPSErrors: true,
        headless: true, // 是否启用无头模式页面
    },
});

async function crawler(params) {
    let {targetUrl, downType, targetDom} = params;
    if (!targetDom || targetDom === '') {
        targetDom = 'body'
    }
    console.log('params: ', params);
    await browser.use(async instance => {
        const page = await instance.newPage();
        await page.goto(targetUrl[0].value, {
            waitUntil: 'networkidle2',
        });

        await page.click(".user-login", {delay: 100})
        await page.click(".go-pwd-phone", {delay: 100})
        // const pageImgs = await page.$(targetDom).$('img');
        // downData(page,  {targetDom, url: targetUrl[0].value, downType})
    })
}

// down html/txt/img
async function downData(page, {targetDom, url, downType}) {
    const downFilePath = getWebUrlPath(url)
    // 标题
    const pageTitle = await page.$eval("title", title => title.text);
    // html
    const pageHtml = await page.$eval(targetDom, dom => dom.outerHTML);
    // 全文text
    const pageTxt = await page.$eval(targetDom, dom => dom.outerText);
    // 图片
    let pageImgs = await page.$$eval(targetDom + ' img', function(imgs) {
        let list = Array.from(imgs)
        return list.map(img => img.src)
    })
    if (downType === 'b') {
        // 只抓文本
        writeFile('txt', {txt: pageTxt, title: pageTitle, name: downFilePath})
        writeFile('html', {txt: pageHtml, title: pageTitle, name: downFilePath})
     } else if (downType === 'c') {
        // 只抓图片
        if (pageImgs.length > 0) {
          downImg('img', {imgList: pageImgs, name: downFilePath })
        }
     } else {
        // 文本加图片
        writeFile('txt', {txt: pageTxt, title: pageTitle, name: downFilePath})
        writeFile('html', {txt: pageHtml, title: pageTitle, name: downFilePath})
        if (pageImgs.length > 0) {
          downImg('img', {imgList: pageImgs, name: downFilePath })
        }
     }
}

module.exports = crawler
