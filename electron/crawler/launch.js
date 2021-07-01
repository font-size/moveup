const HCCrawler = require('headless-chrome-crawler');
const downImg = require('./download/img')
const writeFile = require('./fileWrite/writeFile');
const mkdirSync = require('./mkdir/index')
const { URL } =  require( 'url');
// const CSVExporter = require('headless-chrome-crawler/exporter/csv');
// const FILE = './webpage/result.csv';
// const exporter = new CSVExporter({
//     file: FILE,
//     fields: ['result.title', 'response.url', 'response.status', 'links[0]' ],
//     separator: '\t',
// });
function parseToDOM(str) {
  var div = document.createElement("div");
  if (typeof str == "string")
      div.innerHTML = str;
  return div.childNodes;
}
async function launch(options) {
    if (!(options.targetUrl.length > 0)) {
      return;
    }
    // const dom = options.targetDom || 'body'
    const evaluatePage = function() {
     return {
        title: $('title').text(),
        txt: $('.article-content').text(),
        dom: $('body').html(),
        html: $('html').html(),
        imgList: (function() {
          const list = [];
          $('.article-content img').each(function(index, item){
            list.push(item.src)
          })
          return list
        })()
      }
    };
    const device = options.device || ''
    const crawler = await HCCrawler.launch({
        evaluatePage: evaluatePage,
        // exporter,
        onSuccess: (result => {
          const webUrl = new URL(result.options.url);
          const name = webUrl.hostname || index;
          const pathName = webUrl.pathname.split('/').pop(); 
          const downFilePath = `${name}/${pathName}`
           // 写入文件
           writeFile('txt', {txt: result.result.txt, title: result.result.title, name: downFilePath})
           writeFile('html', {txt: result.result.html, title: result.result.title, name: downFilePath})
           // 保存图片
           if (result.result.imgList && result.result.imgList.length >0) {
            downImg('img', {imgList: result.result.imgList, name: downFilePath })
           }
        }),
      });
   
      const mish =  options.targetUrl.map(function(item, index) {
        const webUrl = new URL(item.value);
        const name = webUrl.hostname || index;
        const pathName = webUrl.pathname.split('/').pop();
        const shotPath = `webpage/${name}/${pathName}/screenshot/screenshot.png`
        let screenshot = null;
        if(mkdirSync(`webpage/${name}/${pathName}/screenshot/`)) {
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
      await crawler.queue(mish);
      await crawler.onIdle(); // Resolved when no queue is left
      await crawler.close(); // Close the crawler
}

module.exports = launch
