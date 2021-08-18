const HCCrawler = require('headless-chrome-crawler'); // crawler

const downImg = require('./download/img'); // 下载图片
const writeFile = require('./fileWrite/writeFile'); // 写入文件
const mkdirSync = require('./mkdir/index'); // 文件夹创建
const getLaunchParams = require('./mode/index'); // launch参数
const parseToDOM = require('./dom/parseToDOM'); // dom相关
const getWebUrlPath = require('./path/webUrlPath'); // 用url设置下载文件夹路径

async function launch(options) {
    if (!options.targetUrl) {
      return;
    }
    // const dom = options.targetDom || 'body'
    let evaluatePage = getLaunchParams(options);
    
    const device = options.device || ''
    const crawler = await HCCrawler.launch({
        evaluatePage,
        // exporter,
        onSuccess: (result => {
          const downFilePath = getWebUrlPath(result.options.url)
           // 下载配置
           if (options.downType === 'b') {
              // 只抓文本
              writeFile('txt', {txt: result.result.txt, title: result.result.title, name: downFilePath})
              writeFile('html', {txt: result.result.html, title: result.result.title, name: downFilePath})
           } else if (options.downType === 'c') {
              // 只抓图片
              if (result.result.imgList && result.result.imgList.length > 0) {
                downImg('img', {imgList: result.result.imgList, name: downFilePath })
              }
           } else {
              // 文本加图片
              writeFile('txt', {txt: result.result.txt, title: result.result.title, name: downFilePath})
              writeFile('html', {txt: result.result.html, title: result.result.title, name: downFilePath})
              if (result.result.imgList && result.result.imgList.length >0) {
                downImg('img', {imgList: result.result.imgList, name: downFilePath })
              }
           }
           
        }),
      });
   
      const taskList =  options.targetUrl.map(function(item, index) {
        const downFilePath = getWebUrlPath(item.value)
        const shotPath = `webpage/${downFilePath}/screenshot/screenshot.png`
        let screenshot = null;
        if(mkdirSync(`webpage/${downFilePath}/screenshot/`)) {
          screenshot = {
            path: shotPath,
            fullPage: true
          }
        }
        return {
          url: item.value,
          device,
          screenshot: screenshot,
        }
      });
      await crawler.queue(taskList);
      await crawler.onIdle(); // Resolved when no queue is left
      await crawler.close(); // Close the crawler
}

module.exports = launch
