import React, {Component} from 'react'
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native'
import { Container, Content} from 'native-base';
import getNews from '../config/Api'
import ArticleModal from '../modal/ArticleModal'
import BreakingCard from '../cards/BreakingCard'
import SmallArticleCard from '../cards/SmallArticleCard';
import CarouselSlider from './CarouselSlider'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);


class Headlines extends Component{
    constructor(props) {
      super(props);
      this.state = {
        articles : {},
        stillLoading: true,
        modalVisibility :  false,
				articleData : {},
				activeIndex:0,
				breakingArticle: {},
				lifeStyles: [],
      }
    }

    componentDidMount() {
      
      if(this.props.path == '/v2/top-headlines') {
        this.getCurrentnews(this.props.path, {country: this.props.country, pageSize:this.props.pageSize})
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
      } else if (this.props.path == '/v2/everything') {
        this.getCurrentnews(this.props.path, {q: this.props.category, from: this.props.from, to: this.props.to, pageSize: this.props.pageSize})
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
      
      this.getCurrentnews('/v2/everything', {q: 'Lifestyle',language: 'fr'})
        .then(response => {
          this.setState({
            lifeStyles: response.articles,
          })
          // console.log(this.state.lifeStyles);
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



    getCurrentnews = (path,{country, category, source, q, from, to, pageSize, language}) => {
      return getNews(path, {country, category, source, q, from, to, pageSize, language})
        .then(response => response.json())
		}
		
  render() {
		if (this.state.stillLoading) {
			return (
				<Container style={{backgroundColor:'#696969'}}>
        <Content style={{backgroundColor:'#696969'}}>
          <Image source={require('../assets/img/ez.gif')} style={{flex: 1, width: '100%', marginVertical:10}}/>
          <Image source={require('../assets/img/ez.gif')} style={{flex: 1, width: '100%', marginVertical:10}}/>
				</Content>
			</Container>
			)
    }
    
		const	_renderItem = ({item,index}) => {
			return  <SmallArticleCard 
								articleImg={item.urlToImage}
								ArticleTitle={item.title}
								ArticleDesc={item.description ? item.description : item.content}
								ArticleUrl={item.url}
								onPressArt={this.handleArticleOnPress}
								style={{width:ITEM_WIDTH, height: ITEM_HEIGHT+70}}
							/>
	}
		// console.log(newList)
    return(
			<Container style={{backgroundColor:'#fff'}}>

				
      	<Content>
					<View>
						<Text style={styles.news}>Breaking News</Text>
					</View>
					{/* Breaking news */}
					<BreakingCard 
										articleImg={this.state.breakingArticle.urlToImage}
                    ArticleTitle={this.state.breakingArticle.title}
                    ArticleDesc={this.state.breakingArticle.description ? this.state.breakingArticle.description : this.state.breakingArticle.content}
                    ArticleUrl={this.state.breakingArticle.url}
                    onPressArt={this.handleArticleOnPress}
					/>
					{/** End Breaking News */}
					{/** Top Stories End */}
					<View>
						<Text style={styles.news}>Top Stories</Text>
					</View>
					<View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <CarouselSlider articlesData={this.state.articles} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem}/>
          </View>
					{/** End Top Stories */}
					<View>
						<Text style={styles.news}>Lifestyle</Text>
					</View>
          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <CarouselSlider articlesData={this.state.lifeStyles} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem}/>
          </View>
				</Content>

            





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

export default Headlines;