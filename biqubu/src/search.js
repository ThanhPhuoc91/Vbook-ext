load('config.js');
function execute(key, page) {
    if (!page) page = '1';
    let response = fetch(BASE_URL +"/search.php",{
        queries: {
            keyword: key,
	    page: page
        }
    });
    if (response.ok) {
        let doc = response.html();
        const data = [];
        doc.select("#newscontent .l li").forEach(e => {
            let link = e.select(".s2 a").first().attr("href");
            let regex = /book_(\d+)/g;
            let bookId = regex.exec(link);
            let cover = "";
            if (bookId) {
                var id = bookId[1];
                cover = BASE_URL + "/files/article/image/" + Math.floor(id / 1000) + "/" + id + "/" + id + "s.jpg"
            }

            data.push({
                name: e.select(".s2 a").first().text(),
                link: e.select(".s2 a").first().attr("href"),
                cover: cover,
                description: e.select(".s3 a").first().text(),
                host: BASE_URL
            })
        });

        return Response.success(data)
    }
    return null;
}