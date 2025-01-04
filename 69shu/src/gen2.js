load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    url = String.format(BASE_URL + "/blist/tag/" + url + (page === '1' ? '/' : '/' + page + '/'));
    console.log(url);
    
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        var data = [];
        var elems = $.QA(doc, '.newnav');
        
        if (!elems.length) return Response.error(url);
        
        elems.forEach(function(e) {
            let bookLink = $.Q(e, 'h3 > a').attr('href');
            let bookId = bookLink.match(/(\d+)\.htm/)[1];
            let prefix = Math.floor(bookId / 1000);
            let coverUrl = String.format('https://69shuba.cx/fengmian/{0}/{1}/{1}s.jpg', prefix, bookId);

            data.push({
                name: $.Q(e, 'h3 > a').text().trim(),
                link: bookLink,
                cover: coverUrl,
                description: $.Q(e, '.ellipsis_2').text().trim() || "No description available",
                host: BASE_URL
            });
        });
        
        var next = parseInt(page, 10) + 1;
        return Response.success(data, next.toString());
    }
    return null;
}