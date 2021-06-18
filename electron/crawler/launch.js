const HCCrawler = require('headless-chrome-crawler');
const downImg = require('./download/img')
const writeFile = require('./fileWrite/writeFile');

const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const FILE = './webpage/result.csv';
const exporter = new CSVExporter({
    file: FILE,
    fields: ['result.title', 'response.url', 'response.status', 'links[0]' ],
    separator: '\t',
});

function down(type, value) {
    if(type ==='img') {
        downImg(value)
    } else if(type ==='html') {
        downHtml(value)
    }
}

async function launch(options) {
    const crawler = await HCCrawler.launch({
        evaluatePage: (() => ({
          title: $('title').text(),
          txt: $('#body-content').text(),
        })),
        // exporter,
        onSuccess: (result => {
           console.log('result.links: ', result.result);
        //    const articleHtml = result.result.txt;
        writeFile('txt', result.result.txt, result.result.title)
           if (result.links && result.links.length) {
            //  const imgList = result.links.filter(e =>e.indexOf("img") > -1);
            //  console.log('imgList: ', imgList);
            //  const targetImgList = [];
            //  imgList.forEach(img =>{
            //      if(articleHtml.indexOf(img) > -1) {
            //         targetImgList.push(img);
            //      }
            //  })
            // down('img', imgList)
           }
        }),
      });
    //   // Queue a request
    //   await crawler.queue('https://36kr.com/p/1273193910037634');
    //   // Queue multiple requests
    //   await crawler.queue(['https://36kr.com/p/1273041915079813', 'https://36kr.com/p/1273170937802114']);
      // Queue a request with custom options
      await crawler.queue({
        url: options.url,
        // Emulate a tablet device
        device: 'Nexus 7',
        // Enable screenshot by passing options
        screenshot: {
          path: './example.png'
        },
        // waitUntil: 'networkidle0'
      });
      await crawler.onIdle(); // Resolved when no queue is left
      await crawler.close(); // Close the crawler
}

module.exports = launch
