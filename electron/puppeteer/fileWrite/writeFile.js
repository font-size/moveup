const fs = require('fs');
var path = require('path')
// template

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

function writeFileToHtml(type = 'txt', {txt, title, name}) {
    const pathName = name || new Date().getTime();
    let template_html = '';
    let path = '';
    if (!mkdirSync(`./webpage/${pathName}`)) {
      return
    }
    if(type === 'txt') {
        template_html = txt;
        path = `./webpage/${pathName}/${title}.txt`;
    } else if (type === 'html') {
        template_html = txt;
        path = `./webpage/${pathName}/${title}.html`;
    }
  const pageName = `${title}.${type}`;
  return new Promise((res) => {
    fs.writeFile(path, template_html, function (err) {
      if (err) {
        console.log('txt failed', err);
      } else {
        console.log('txt success');
        res(pageName);
      }
    });
  });
}

module.exports = writeFileToHtml;
