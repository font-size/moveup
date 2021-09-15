const fs = require("fs")
const xlsx = require('node-xlsx')
const getWebUrlPath = require('../path/webUrlPath'); // 用url设置下载文件夹路径
const downImg = require('../download/img'); // 下载图片
const writeFile = require('../fileWrite/writeFile'); // 写入文件
// 36ke规则
async function ke36(page, {url, delay = 100, downType, targetDom}) {
    await page.setViewport({width: 1000, height: 1280});
        await page.goto(url, {
            // waitUntil: 'networkidle2',
            timeout: 0
        });
        // await page.$$('.user-login')[1].click()
        await page.evaluate(() => {
            document.querySelectorAll(".user-login")[1].click()
        })
        await page.waitFor(2000)
        await page.evaluate(() => {
            document.querySelector(".go-pwd-phone").click()
        })
        await page.type('.kr-passport-phone input', '18918024735', {delay})
        await page.type('.kr-passport-password input', 'zxc123',{delay})
        await page.click('.kr-passport-button', {delay})

        let header = ['标题', '主题', '作者', '时间', 'url'];
        let titleList = []; // 标题
        let topicList = []; // 主题
        let authorList = []; // 作者
        let dateList = [];// 时间
        let articleList = []; // 文章url
        articleList = await page.$$eval('.kr-home-flow-item .article-item-pic', function(article) {
            return Array.from(article).map(a => a.href)
        })
        titleList = await page.$$eval('.kr-home-flow-item .title-wrapper', function(article) {
            return Array.from(article).map(a => a.innerText)
        })
        topicList = await page.$$eval('.kr-home-flow-item .kr-flow-bar .kr-flow-bar-motif a', function(article) {
            return Array.from(article).map(a => a.innerText)
        })
        authorList = await page.$$eval('.kr-home-flow-item .kr-flow-bar .kr-flow-bar-author', function(article) {
            return Array.from(article).map(a => a.innerText)
        })
        dateList = await page.$$eval('.kr-home-flow-item .kr-flow-bar .kr-flow-bar-time', function(article) {
            return  Array.from(article).map(a => a.innerText)
        })
        let xlsxList = [header];
        for(let index = 0; index < titleList.length; index ++) {
            let list = [];
            list.push(titleList[index])
            list.push(topicList[index])
            list.push(authorList[index])
            list.push(dateList[index])
            list.push(articleList[index])
            xlsxList.push(list)
        }
        buildXlsx(xlsxList);
        for(let i = 0; i < articleList.length; i ++) {
            if (i > 2) {
                break;
            }
            await downData(page,  {targetDom, url: articleList[i], downType})
        }
}

// 导出 xlsx
function buildXlsx(data, name = 'mySheetName') {
    var buffer = xlsx.build([{name, data: data}]); // Returns a buffer   
    fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});
}

// 下载 html/txt/img
async function downData(page, {targetDom, url, downType}) {
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
    //  await page.close();
}

module.exports = ke36;