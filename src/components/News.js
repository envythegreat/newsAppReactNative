import React, {Component} from 'react'
import {Image,StyleSheet,Dimensions, FlatList, Platform} from 'react-native'
import { Container, Content} from 'native-base';
import ArticleModal from '../modal/ArticleModal'
import {getCurrentnews, handleArticleOnPress, handleModalClose} from '../config/functions';
import SmallArticleCard from '../cards/SmallArticleCard'
import {SmallLoader} from '../loader/Loader'


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7) - 85;
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4) *1.9;

class News extends Component{
  constructor(props) {
    super(props);
    this.state = {
      articles : {},
      stillLoading: true,
      modalVisibility :  false,
      articleData : {},
      loader: [{'id':1},{'id':2},{'id':3},{'id':4},{'id':5},{'id':6}]
    }
    // i was hard stuck at this trying to call those function and i keep getting this error : 
    // undefined is not an object (evaluating 'this.setstate')
    // i think this is because i have declared a function and it get executed before
    // the component gets mounted which means there is no setState yet
    // check https://github.com/goatslacker/alt/issues/283
    this.handleArticleOnPress = handleArticleOnPress.bind(this);
    this.handleModalClose = handleModalClose.bind(this);
	}
  componentDidMount() {
    getCurrentnews(this.props.path, {q: this.props.category, from: this.props.from, to: this.props.to, pageSize: this.props.pageSize})
      .then(response => {
        this.setState({
          articles: response.articles,
          stillLoading: false,
        })
        const firstArticle = this.state.articles.shift();
        this.setState({
          breakingArticle: firstArticle,
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

  render() {
    
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
                  width: Platform.OS === 'ios' ? ITEM_WIDTH : ITEM_WIDTH - 10,
                  height: Platform.OS === 'ios' ? ITEM_HEIGHT : ITEM_HEIGHT - 20,
                }
              }
						/>
		}
    return(
			<Container style={{backgroundColor:'#fff'}}>
      	{/* <Content> */}
        {this.state.stillLoading ? 
        (
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
              style={{marginBottom: 150}}
            />
          )
        }
				
				{/* </Content> */}
        <ArticleModal 
          showModal={this.state.modalVisibility}
          articleData={this.state.articleData}
          onClose={this.handleModalClose}
        />
			</Container>
    );
  }
}

const styles = StyleSheet.create({
  news: {
    color: "#000",
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 10
  }
});

export default News;