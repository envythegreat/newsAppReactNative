import React, {Component} from 'react';

import {
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  View,
  Platform
} from 'react-native';

import {
  Container,
  Header,
  Left,
  Right,
  Button
} from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  getCurrentnews,
  handleArticleOnPress,
  handleModalClose
} from '../config/functions'

import ArticleModal from '../modal/ArticleModal'
import SmallArticleCard from '../cards/SmallArticleCard'
import {SmallLoader} from '../loader/Loader'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7) - 85;
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) *1.9;

class  MoreNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      isStillLoading: true,
      modalVisibility :  false,
      articleData : {},
      loader: [{'id':1},{'id':2},{'id':3},{'id':4},{'id':5},{'id':6}]
    }
    // check the headLines Component ./src/component/headelines.js => constructor -> under state
    this.handleArticleOnPress = handleArticleOnPress.bind(this);
    this.handleModalClose = handleModalClose.bind(this);
  }


  componentDidUpdate(prevProps) {
    // before we update the component we need to make sure that the new data is 
    // not the same as the old data to avoid breaking the app or re-fetching data
    const oldData = prevProps.route.params.params.countryData;
    const newData = this.props.route.params.params.countryData;
    if(newData && oldData !== newData) {
      const {Country, path} = newData;
      getCurrentnews(path, {country: Country, pageSize:30})
      .then(response => {
        this.setState({
          articles: response.articles,
          isStillLoading: false,
        })
      }).catch(err => {
          console.log('current error', err);
      });
    }
  }

  componentDidMount() {
    // load data the screen based on the parameters passed on navigation params
    const {Country, path} = this.props.route.params.params.countryData;
    getCurrentnews(path, {country: Country, pageSize:30})
      .then(response => {
        this.setState({
          articles: response.articles,
          isStillLoading: false,
        })
      }).catch(err => {
          console.log('current error', err);
      });
    }
    _loader = ({item,index}) => {
      return (
        <SmallLoader title={item.id} key={index} style={
          {
            width: Platform.OS === 'ios' ? ITEM_WIDTH : ITEM_WIDTH - 10,
            height: Platform.OS === 'ios' ? ITEM_HEIGHT : ITEM_HEIGHT - 20,
            marginHorizontal: 5,
          }
        }/>
      );
    }

  render(){


    const newsList = ({item, index}) => {
      return <SmallArticleCard 
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
    return (
      <>
        <Container>
          <Header style={{backgroundColor: '#fff', height: 100}} transparent>
            <Left>
              <Button transparent>
                <Image source={require('../../assets/logo.png')}  style={styles.logImg} />
              </Button>
            </Left>
            <Right>
              <Button transparent 
                onPress={() => {
                  this.setState({
                    articles:{},
                    isStillLoading: true
                  })
                  this.props.navigation.navigate('Countries')
                }} >
                <MaterialCommunityIcons name='close' color={'#000'} size={30} />
              </Button>
            </Right>
          </Header>
          {/* <Content> */}
          <View>
          {this.state.isStillLoading ? (
              <FlatList 
              data={this.state.loader}
              renderItem={this._loader}
              numColumns={2}
              keyExtractor={(item, index) => 'key'+index}
              style={{marginTop: 20}}
              // scrollEnabled={false}
            />
            ) : (
              <FlatList
                data={this.state.articles}
                renderItem={newsList}
                numColumns={2}
                keyExtractor={(item, index) => 'key'+index}
                style={{marginBottom: 130}}
              />
            )
            }
            
          </View>
            
          {/* </Content> */}
          <ArticleModal 
            showModal={this.state.modalVisibility}
            articleData={this.state.articleData}
            onClose={this.handleModalClose}
          />
        </Container>  
      </>
    );
  }
}

export default MoreNews;

const styles = StyleSheet.create({
  logImg: {
    width: Platform.OS === 'ios' ? 70 : 130,
    height: 60,
    overflow: 'visible',
    backgroundColor: 'transparent',
    marginLeft: 30
  },
  closeICon: {
    width: 60,
    height: 60
  }
});