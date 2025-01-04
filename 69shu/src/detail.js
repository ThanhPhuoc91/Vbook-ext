load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace("/c/", "/b/");

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        let coverLink = $.Q(doc, 'div.booknav2 > h1 > a').attr('href');
        let bookIdMatch = coverLink ? coverLink.match(/\/book\/(\d+)\.htm/) : null;
        let bookId = bookIdMatch ? bookIdMatch[1] : null;

        let coverImage = bookId ? String.format('{0}/fengmian/{1}/{2}/{3}s.jpg', "https://69shuba.cx", Math.floor(bookId / 1000), bookId, bookId) : '';

        let name = $.Q(doc, 'div.booknav2 > h1 > a').text();
        let author = $.Q(doc, 'div.booknav2 > p:first-of-type > a').text().trim();
        let description = $.Q(doc, 'div.jianjie-popup-content.jianjiebox > div.content > p').text();
        let detail = $.QA(doc, 'div.booknav2 p', {m: x => x.text(), j: '<br>'});

        return Response.success({
            name: name,
            cover: coverImage,
            author: author,
            description: description,
            detail: detail,
            host: BASE_URL
        });
    }
    return null;
}
