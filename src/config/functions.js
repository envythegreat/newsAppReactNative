import getNews from './Api'
export function getCurrentnews (path,{country, category, source, q, from, to, pageSize, language}){
  return getNews(path, {country, category, source, q, from, to, pageSize, language})
    .then(response => response.json())
}
export function appendZero (n){
	if (n <= 9) {
		return "0" + n;
	}
	return n;
}

export function getTime({minusdays}){
	const currentDate = new Date();
	if(minusdays) {
		let olddays = new Date(currentDate.setDate(currentDate.getDate() - minusdays));
		return `${olddays.getFullYear()}-${appendZero(olddays.getMonth()+1)}-${appendZero(olddays.getDate())}`
		// console.log(olddays)
	}
	return `${currentDate.getFullYear()}-${appendZero(currentDate.getMonth()+1)}-${appendZero(currentDate.getDate())}`
}