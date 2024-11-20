load('src.js');
function execute(key, page) {
    if (!page) page = 1;
    let response = fetch(BASE_URL + "/tim-kiem", {
        queries: {
            sort: "-updated_at",
            "filter[name]": key,
            "filter[status]": "2,1",
            page: page
        }
    });
    if(response.ok){
        let doc = response.html();
        let el = doc.select(".grid .w-full.relative > .manga-vertical")
        let data = [];
        el.forEach(e => data.push({
            name: e.select(".p-2 > a ").text(),
            link: BASE_URL + e.select(".p-2 > a").attr("href"),
            cover: e.select(".cover").first().attr("data-bg"),
            description: e.select("a.text-white").first().text(),
            host: BASE_URL
        }))
        return Response.success(data, (++page).toString())
    }
    return null;
}