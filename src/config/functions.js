import getNews from './Api'
export function getCurrentnews (path,{country, category, source, q, from, to, pageSize, language}){
  return getNews(path, {country, category, source, q, from, to, pageSize, language})
    .then(response => response.json())
}