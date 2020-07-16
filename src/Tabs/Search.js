import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, FlatList, Platform} from 'react-native';
import { Container, Header, Item, Input, Icon} from 'native-base';
import {getCurrentnews, handleArticleOnPress, handleModalClose, Imgandtext} from '../config/functions';
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

	// update the search satete based on the search input
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

	// item to be rendered inside the flatList
	// SmallArticleCard is a component ....
	_rendredItem = ({item, index}) => {
		return 	<SmallArticleCard 
							articleImg={item.urlToImage}
							ArticleTitle={item.title}
							ArticleDesc={item.description ? item.description : item.content}
							ArticleUrl={item.url}
							key={index}
							onPressArt={this.handleArticleOnPress}
							style={
                {
                  // check the Platform os before applying any styles the component
                  width: Platform.OS === 'ios' ? ITEM_WIDTH : ITEM_WIDTH - 10,
                  height: Platform.OS === 'ios' ? ITEM_HEIGHT : ITEM_HEIGHT - 20,
                }
              }
						/>
	}
	render() {
		// variable that hold the data we are going to display to the user based on 
		// states of the component if the component is loading or the data is hmm true (loaded) 
		let newsArea;
		if(this.state.isStillLoading) {
			newsArea = 	Imgandtext(require('../assets/img/search.png'), 'Search for more News on your own');
		} else {
			if (this.state.articles && this.state.articles.length > 0) {
				newsArea = <FlatList 
										data={this.state.articles}
										renderItem={this._rendredItem}
										numColumns={2}
										keyExtractor={(item, index) => 'key'+index}
									/>
			} else if (!this.state.articles.length) {
				newsArea = Imgandtext(require('../assets/img/nodata.png'), 'Something Wrong Please Use another Key Search');
			}
		}
		return (
			<Container>
			<Header searchBar rounded style={{backgroundColor: '#fff', height: 100}}>

			{/** The search item*/}
		  <Item>
		  	<Input 	placeholder="Business, Entertainment, Politices, Games, Sport ...." 
								style={{marginLeft: 15}} value={this.state.search} 
								//change the value of an item in the state every time a user start typing
								onChangeText={this.handleSearch} 
								editable={true} 
							/>
						<TouchableOpacity onPress={this.onPreformSearch}>
							<Icon name="ios-search" />
						</TouchableOpacity>
		  </Item>

			</Header>

					{newsArea}
					<ArticleModal
						// props
						// this to dipslay the articles webview true / false 
          	showModal={this.state.modalVisibility}
						// data Articles
          	articleData={this.state.articleData}
						// close the webview
          	onClose={this.handleModalClose}
        	/>
	  	</Container>
		);
	}

}

export default Search;
