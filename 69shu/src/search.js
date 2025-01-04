load('libs.js');
load('config.js');

function execute(key, page) {
    var gbkEncode = function(s) {
        load('gbk.js');
        return GBK.encode(s);
    }

    var url = String.format('{0}/modules/article/search.php?searchkey={1}&searchtype=all', host, gbkEncode(key));

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        var data = [];
        var elems = $.QA(doc, '.newbox li');
        if (elems.length) {
            elems.forEach(function(e) {
                data.push({
                    name: $.Q(e, '.newnav h3 > a:nth-child(2)').text().trim(),
                    link: $.Q(e, '.newnav > a').attr('href'),
                    cover: $.Q(e, '.imgbox > img').attr('data-src').trim(),
                    description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                    host: BASE_URL
                })
            });

            return Response.success(data);
        }

        if ($.Q(doc, 'div.booknav2 > h1 > a').text()) {
            return Response.success([{
                name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
                link: $.Q(doc, 'div.booknav2 > h1 > a').attr('href'),
                cover: $.Q(doc, 'div.bookimg2 > img').attr('src'),
                description: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
                host: BASE_URL
            }]);
        }

        return Response.error(key);
    }
    
    return null;
}
