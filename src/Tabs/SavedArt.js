import React, {Component} from 'react';
import {
	Image,
	StyleSheet,
	View,
	Alert
} from 'react-native';

import {
	Container,
	Header,
	Left,
	Right,
	Button,
	Text,
	Content
} from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getSavedArtciles} from '../config/functions'
import AsyncStorage from '@react-native-community/async-storage';
import Swipble from '../components/Swipble';
import ArticleModal from '../modal/ArticleModal';

import {
	handleArticleOnPress,
	handleModalClose,
	Imgandtext
} from '../config/functions';

class SavedArt extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			savedArticles: {},
			isLoading: true,
			modalVisibility :  false,
			articleData : {},
		}
		// check the headLines Component ./src/component/headelines.js => constructor -> under state
		this.DeleteAllData = this.DeleteAllData.bind(this)
		this.handleArticleOnPress = handleArticleOnPress.bind(this);
    this.handleModalClose = handleModalClose.bind(this);
	}

	// function that delete @Articles item and update the state on certain item
	DeleteAllData = async () => {
		await AsyncStorage.removeItem('@Articles');
		this.setState({
			savedArticles: {},
			isLoading: true
		})
	}

	// function that remove certain article based on the ID
	handleRemoveArticle = async (id) => {
		// update the state based on the previous state 
		this.setState( prevState => {
			return {savedArticles : prevState.savedArticles.filter(p => p.id !== id)};
		})
		// store the new articles data so we can re-use it again
		const newData = this.state.savedArticles;
		// since we could not merge data because it break the app and close automaticlly we had
		// to remove the article item and set a new item with the same name and filtered data 
		await AsyncStorage.removeItem('@Articles');
		await AsyncStorage.setItem('@Articles', JSON.stringify(newData));
		// console.log(this.state.savedArticles);
	}

	// show an Alert with 2 Buttons when the user press certan button
	alertBtn = () => {
		Alert.alert(
			'Delete All ?', // Alert Title
			'Are you sure wanna delete all saved Articles ?', // Alert Messege 
			[
				// cancel button the undo o cancel what u are trying to do
					{ text: 'Cancel', onPress: () => console.log('hhhhhh'), style: 'cancel' },
				// Button that excute delete articles functions when we press OK
					{ text: 'OK', onPress: this.DeleteAllData, }
			]
		)
	}

	async componentDidMount() {
		const { navigation } = this.props;
		// update the SavedArt Component tab every time get focused 
		await navigation.addListener('focus', async () => {
      let data = await getSavedArtciles();
			data = JSON.parse(data);
			this.setState({
				savedArticles: data,
				isLoading: false
			})
    });
	}


	render() {
		
		let data; // variable that store neither loaading & empty state or @Articles data insite swipeable
		if(this.state.isLoading) {
			data = Imgandtext(require('../assets/img/unbookmarks.png'), 'Please wait! Loading.....');
		} else {
			data = !this.state.savedArticles
				? Imgandtext(require('../assets/img/unbookmarks.png'), 'Yikes Nothing Saved Yet !!')
				: ( this.state.savedArticles.map((item) => {
						return <Swipble item={item} key={item.id.toString()}  handleRemoveArticle={this.handleRemoveArticle} onPressArt={this.handleArticleOnPress}/>
				})
				)
		}



		return(
			<Container>
        <Header style={{backgroundColor: '#fff', height: 100}} transparent>
        	<Left>
            <Button transparent>
              <Image source={require('../../assets/logo.png')}  style={styles.logImg} />
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={this.alertBtn}>
							<MaterialCommunityIcons name="delete-outline" size={30} color="black" />
            </Button>
          </Right>
        </Header>
				<Content>{data}</Content>
				<ArticleModal 
					showModal={this.state.modalVisibility}
          articleData={this.state.articleData}
          onClose={this.handleModalClose}
				/>
			</Container>
		);
	}
}
export default SavedArt;

const styles = StyleSheet.create({
  logImg: {
    width: Platform.OS === 'ios' ? 70 : 130,
    height: 60,
    overflow: 'visible',
    backgroundColor: 'transparent',
    marginLeft: 30
  },
	leftBtn: {
		backgroundColor: '#D21919',
		justifyContent: 'center',
		flex: 1,
		width: '100%',
		height: '100%'
	},
	rightBtnBtn:{
		backgroundColor: '#2FD62F',
		justifyContent: 'center',
		// flex: 1,
		width: '22%',
		height: '100%',
		alignItems: 'flex-end'
	},
	closeICon: {
		fontWeight: '600',
		padding: 20
	},
	Content: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		flex: 1,
		marginTop: 100
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