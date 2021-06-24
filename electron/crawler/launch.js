const HCCrawler = require('headless-chrome-crawler');
const downImg = require('./download/img')
const writeFile = require('./fileWrite/writeFile');
const mkdirSync = require('./mkdir/index')
// const CSVExporter = require('headless-chrome-crawler/exporter/csv');
// const FILE = './webpage/result.csv';
// const exporter = new CSVExporter({
//     file: FILE,
//     fields: ['result.title', 'response.url', 'response.status', 'links[0]' ],
//     separator: '\t',
// });


async function launch(options) {
    if (!options.targetUrl.trim()) {
      return;
    }
    const name = options.name || new Date().getTime()
    // const dom = options.targetDom || 'body'
    const device = options.device || ''
    const crawler = await HCCrawler.launch({
        evaluatePage: () =>({
          title: $('title').text(),
          txt: $('.article-content').text(),
          html: $('html').html(),
          imgList: (function() {
            const list = [];
            $('.article-content img').each(function(index, item){
              list.push(item.src)
            })
            return list
          })()
        }),
        // exporter,
        onSuccess: (result => {
          
          console.log('result: ', result.result);
           // 写入文件
           writeFile('txt', {txt: result.result.txt, title: result.result.title, name: name})
           writeFile('html', {txt: result.result.html, title: result.result.title, name: name})
           // 保存图片
           if (result.result.imgList && result.result.imgList.length >0) {
             downImg('img', {imgList: result.result.imgList, name: name })
           }
        }),
      });
    //   // Queue a request
    //   await crawler.queue('https://36kr.com/p/1273193910037634');
    //   // Queue multiple requests
    //   await crawler.queue(['https://36kr.com/p/1273041915079813', 'https://36kr.com/p/1273170937802114']);
      // Queue a request with custom options
      const shotPath = `webpage/${name}/shot/shot.png`
      let screenshot = null;
      if(mkdirSync(`webpage/${name}/shot/`)) {
        screenshot = {
          path: shotPath
        }
      }
      await crawler.queue({
        url: options.targetUrl,
        device,
        // Emulate a tablet device
        // Enable screenshot by passing options
        screenshot: screenshot,
        // waitUntil: 'networkidle0'
      });
      await crawler.onIdle(); // Resolved when no queue is left
      await crawler.close(); // Close the crawler
}

module.exports = launch
