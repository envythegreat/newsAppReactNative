import getNews from './Api'
import React from 'react'
import {Share, View, Image, Text, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


// const NewsContext = React.createContext();
// export const Provider = NewsContext.Provider;
// export const Consumer = NewsContext.Consumer;

// function to that return a promise based on another function to get news
export function getCurrentnews (path,{country, category, source, q, from, to, pageSize, language}){
  return getNews(path, {country, category, source, q, from, to, pageSize, language})
    .then(response => response.json())
}
// append zore to number
export function appendZero (n){
	if (n <= 9) {
		return "0" + n;
	}
	return n;
}

// get exact time based on today and the day u want
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

export async function SetArticles(article) {
	try{
		await AsyncStorage.getItem('@Articles', async (err, result) =>  {
			console.log(result)
			if(result !== null) {
				try{
					let newData = JSON.parse(result);
					let last = newData.slice(-1)[0];
					article.id = last.id + 1;
					newData.push(article);
					await AsyncStorage.setItem('@Articles', JSON.stringify(newData));
					console.log(newData);
				} catch (e){
					console.log(`Something goes wrong : ${e}`);
				}
			} else {
				console.log('Data Not Found');
				article.id = 1;
				let myData = [
					article
				]
				await AsyncStorage.setItem('@Articles', JSON.stringify(myData))
				// console.log(myData);
			}
		})
	} catch (e) {
		console.log(`Something goes wrong 1 : ${e}`);
	}
	// await AsyncStorage.removeItem('@Articles');
}

export async function getSavedArtciles() {
	try{
		return await AsyncStorage.getItem('@Articles');
	} catch(e) {
		console.log(`Something goes Wrong : ${e}`);
	}
}

// load the UI of search Tab in no data is hmm true (no data loaded) 
export function Imgandtext(img, text){
	return <View style={styles.Content} >
					<Image source={img} style={styles.searchImg} />
					<Text style={styles.PaText} >{text}</Text>
				</View>
}


const styles = StyleSheet.create({
	Content: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		flex: 1,
		marginTop: 100
	},
  ICon: {
		fontSize: 150,
		opacity: 0.8
	},
	PaText: {
		opacity: 0.5
	},
	searchImg: {
		// width: 200,
		marginBottom: 30,
		marginRight: 20
	}
});