import React, {Component} from 'react';
import { StyleSheet, Image, FlatList, Dimensions, View} from 'react-native';
import {Container, Header, Left, Body, Right, Button,Content } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getCurrentnews} from '../config/functions'
// import { Country } from '../config/listCountry';
import SmallArticleCard from '../cards/SmallArticleCard'
// import Header from '../components/Header'


// ({route, navigation})
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7) - 85;
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) *1.9;

class  MoreNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      isStillLoading: true,
    }
  }
  componentDidUpdate(prevProps) {
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
        // console.log(this.state.articles)
      }).catch(err => {
          console.log('current error', err);
      });
    }
  }
  componentDidMount() {
    // console.log(this.props.route.params.params);
    const {Country, path} = this.props.route.params.params.countryData;
    getCurrentnews(path, {country: Country, pageSize:30})
      .then(response => {
        this.setState({
          articles: response.articles,
          isStillLoading: false,
        })
        // console.log(this.state.articles)
      }).catch(err => {
          console.log('current error', err);
      });
    }
    handleArticleOnPress = (dataArticle) => {
      this.setState({
        modalVisibility: true,
        articleData: dataArticle
      })
    }

    handleModalClose = () => {
      this.setState({
        modalVisibility: false,
        articleData: {}
      })
    }
  render(){
    // const {Country} = this.props.route.params.params;
    const newsList = ({item, index}) => {
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
            <FlatList
              data={this.state.articles}
              renderItem={newsList}
              numColumns={2}
              keyExtractor={(item, index) => 'key'+index}
            />
          </View>
            
          {/* </Content> */}
        </Container>  
      </>
    );
  }
}

export default MoreNews;

const styles = StyleSheet.create({
  logImg: {
    width: 60,
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