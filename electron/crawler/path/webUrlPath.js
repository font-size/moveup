const { URL } =  require( 'url');
function getWebUrlPath(url) {
    const webUrl = new URL(url);
    const name = webUrl.hostname || index;
    const pathName = webUrl.pathname.split('/').pop(); 
    return `${name}/${pathName}`
}

module.exports = getWebUrlPath;