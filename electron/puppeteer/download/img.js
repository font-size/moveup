var request = require('request')
var fs = require('fs')
var path = require('path')
const URL =  require ('url');

function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSync(path.dirname(dirname))) {   
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false
}

function downImg(type, {imgList, name}) {
    for (const url of imgList) {
        if (!url)  {
            break;
        }       
        let filename =  url.split('/').pop()　　// 已原网络图片的名称命名本地图片
        if (!mkdirSync(`./webpage/${name || new URL(url).hostname}`)) {
            return
        }
        request(url).pipe(
            fs.createWriteStream(`webpage/${name || new URL(url).hostname}/${filename}.png`).on('close', () =>{  console.log('img download success') })
        )  
    }
}

module.exports = downImg;