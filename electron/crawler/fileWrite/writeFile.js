const fs = require('fs');
// template

function writeFileToHtml(type = 'txt', html, title) {
    let template_html = '';
    let path = '';
    if(type === 'txt') {
        template_html = html;
        path = `./webpage/${title}.txt`;
    } else if (type === 'html') {
        template_html = html;
        path = `./webpage/${title}.html`;
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
