import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Left, Content } from 'native-base';
import {getCurrentnews, handleArticleOnPress, handleModalClose} from '../config/functions';
import SmallArticleCard from '../cards/SmallArticleCard';
import ArticleModal from '../modal/ArticleModal'


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7) - 85;
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) *1.9;


class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			search: null,
			articles: {},
			isStillLoading: true,
			modalVisibility :  false,
			articleData: {}
		}
		this.handleArticleOnPress = handleArticleOnPress.bind(this);
    this.handleModalClose = handleModalClose.bind(this);
	}

	handleSearch = (search) => {
		this.setState({
			search: search
		})
	}

	onPreformSearch = () => {
		getCurrentnews('/v2/everything', {q: this.state.search, pageSize:30})
	  .then(response => {
		this.setState({
		  articles: response.articles,
		  isStillLoading: false,
		})
		console.log(this.state.articles.length)
	  }).catch(err => {
		  console.log('current error', err);
			}
		);
	}
	_rendredItem = ({item, index}) => {
		return <SmallArticleCard 
						articleImg={item.urlToImage}
						ArticleTitle={item.title}
						ArticleDesc={item.description ? item.description : item.content}
						ArticleUrl={item.url}
						key={index}
						onPressArt={this.handleArticleOnPress}
						style={{width: ITEM_WIDTH, height: ITEM_HEIGHT}}
					/>
	}
	render() {
		let newsArea;
		if(this.state.isStillLoading) {
			newsArea = <View style={styles.Content} >
									<Image source={require('../assets/img/search.png')} style={styles.searchImg} />
									<Text style={styles.PaText} >Search for more News on your own</Text>
								</View>;
		} else {
			if (this.state.articles && this.state.articles.length > 0) {
				newsArea = <FlatList 
										data={this.state.articles}
										renderItem={this._rendredItem}
										numColumns={2}
										keyExtractor={(item, index) => 'key'+index}
									/>
			} else if (!this.state.articles.length) {
				newsArea = <View style={styles.Content} >
										{/* <Icon name="ios-search"  style={styles.ICon} /> */}
										<Image source={require('../assets/img/nodata.png')} style={styles.searchImg} />
										<Text style={styles.PaText} >Something Wrong Please Use another Key Search</Text>
									</View>;
			}
		}
		return (
			<Container>
			<Header searchBar rounded style={{backgroundColor: '#fff', height: 100}}>
		  <Item>
		  	<Input placeholder="Business, Entertainment, Politices, Games, Sport ...." style={{marginLeft: 15}} value={this.state.search} onChangeText={this.handleSearch} editable={true} />
						<TouchableOpacity onPress={this.onPreformSearch}>
							<Icon name="ios-search" />
						</TouchableOpacity>
		  </Item>
			</Header>
					{newsArea}
					<ArticleModal 
          showModal={this.state.modalVisibility}
          articleData={this.state.articleData}
          onClose={this.handleModalClose}
        />
	  	</Container>
		);
	}

}

export default Search;

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