var request = require('request')
var fs = require('fs')
var path = require('path')

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

function downloadUrl(urlList) {
    for (const url of urlList) {
        console.log('url: ', url);
        let filename =  url.split('/').pop()　　// 已原网络图片的名称命名本地图片
        request(url).pipe(
            fs.createWriteStream(`webpage/${filename}.png`).on('close',err=>{  console.log('写入失败',err) })
        )  
    }
}

module.exports = downloadUrl;