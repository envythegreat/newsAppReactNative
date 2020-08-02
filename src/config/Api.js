// function that handle the Api query based on the parameters given to it

const APIKEY = '0c185e750d5a4013a07b51e1f99f36a0'
function getNews(path,{country, category, source, q, from, to, pageSize, language}) {
    let data = '';
    if (path == '/v2/top-headlines') {
        if(country) {
            data = `country=${country}`;
        } 
        if (category) {
            if (data){
                data = data + `&category=${category}`;
            }else {
                data = `category=${category}`;
            }
        } 
        if (source) {
            data = `source=${source}`;
        }
        if (q) {
            data = `q=${q}`;
        }
    } else if (path == '/v2/everything') {
        if (q) {
            data = `q=${q}`;
        } 
        if (from && to) {
            if (data) {
                data = data + `&from=${from}&to=${to}`;
            } else {
                data = `from=${from}&to=${to}`
            }
        } 
        if (language) {
            data = data + `&language=${language}`;
        }
    } else if (path = '/v2/sources') {
        if(country) {
            data = `country=${country}`;
        }
    }
    if (pageSize) {
        data = data + `&pageSize=${pageSize}`;
    }
    let url = `http://newsapi.org${path}?${data}&apiKey=${APIKEY}`;
    console.log(url)
    // let req = new Request(url);
    return fetch(url)
}

export default getNews;