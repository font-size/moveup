const initPuppeteerPool = require('./pool/index');

const getWebUrlPath = require('./path/webUrlPath'); // 用url设置下载文件夹路径
const downImg = require('./download/img'); // 下载图片
const writeFile = require('./fileWrite/writeFile'); // 写入文件

const browser = initPuppeteerPool({
    // 全局只应该被初始化一次
    puppeteerArgs: {
        ignoreHTTPSErrors: true,
        headless: false, // 是否启用无头模式页面
    },
});

async function crawler(params) {
    let {targetUrl, downType, targetDom} = params;
    if(!targetUrl[0].value) return;
    if (!targetDom || targetDom === '') {
        targetDom = 'body'
    }
    console.log('params: ', params);
    await browser.use(async instance => {
        const page = await instance.newPage();
        await page.setViewport({width: 1000, height: 1280});
        await page.goto(targetUrl[0].value, {
            // waitUntil: 'networkidle2',
            timeout: 0
        });
        // await page.click('.user-login', {clickCount: 1, delay: 1000})
        // await page.$$('.user-login')[1].click()
        await page.evaluate(() => {
            document.querySelectorAll(".user-login")[1].click()
        })
        await page.waitFor(2000)
        await page.evaluate(() => {
            document.querySelector(".go-pwd-phone").click()
        })
        await page.type('.kr-passport-phone input', '18918024735', {delay: 100})
        await page.type('.kr-passport-password input', 'zxc123',{delay: 100})
        await page.click('.kr-passport-button', {delay: 1000})

        let articleList = await page.$$eval('.kr-home-flow-item .article-item-pic', function(article) {
            let list = Array.from(article)
            return list.map(a => a.href)
        })

        console.log('articleList: ', articleList);
        for(let i = 0; i < articleList.length; i ++) {
            if (i > 2) {
                break;
            }
            await downData(instance,  {targetDom, url: articleList[i], downType})
        }
    })
}

// down html/txt/img
async function downData(browser, {targetDom, url, downType}) {
    const page = await browser.newPage();
    await page.setViewport({width: 1000, height: 1280});
    await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 0
    });
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

     await page.close();
}

module.exports = crawler
