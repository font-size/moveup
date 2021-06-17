const fs = require('fs');

function log(tag, msg) {
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }
    fs.writeFile(`logs/${tag}.txt`, msg || 'none', function (err) {
        if (err) {
            throw err;
        }
    });
}

module.exports = log;