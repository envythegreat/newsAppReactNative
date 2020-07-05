import getNews from './Api'
import {Share} from 'react-native'
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

export function handleArticleOnPress(dataArticle){
	this.setState({
		modalVisibility: true,
		articleData: dataArticle
	})
}

export function handleModalClose(){
	this.setState({
		modalVisibility: false,
		articleData: {}
	})
}

export function handleViewPress(ArticleUrl, ArticleTitle, onPressArt){
	let url = ArticleUrl;
	let title = ArticleTitle;
	onPressArt({url, title})
}
export function handleShare(ArticleTitle, ArticleUrl){
	const data = {title: ArticleTitle, url: ArticleUrl}
	let message = `${data.title}\n\nRead More @${data.url}\n\nShared via RN News App`;
	return Share.share(
		{title: data.title , url: data.url},
		{dialogTitle:`Share ${message}`}
	);
}