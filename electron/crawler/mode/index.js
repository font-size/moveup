function getLaunchParams(options) {
    let evaluatePage = null;
    if (options.behavior === 'huxiu') {
      evaluatePage = function() {
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
    } else {
       evaluatePage = function() {
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
    }
    return evaluatePage
}

module.exports = getLaunchParams;