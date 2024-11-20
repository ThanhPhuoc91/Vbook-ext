load('config.js');

function execute(url) {
    var doc = fetch(url).html();
    var el = doc.select(".chapters a");
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push({
            name: e.text(),
            url: e.attr("href"),
            host: BASE_URL || BASE_URL1
        })
    }
    data.shift();
    return Response.success(data.reverse());
}