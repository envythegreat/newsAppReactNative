import React, {Component, PureComponent} from 'react'
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native'
import { Container, Content} from 'native-base';
import ArticleModal from '../modal/ArticleModal'
import BreakingCard from '../cards/BreakingCard'
import SmallArticleCard from '../cards/SmallArticleCard';
import CarouselSlider from './CarouselSlider'
import {getCurrentnews, handleArticleOnPress, handleModalClose} from '../config/functions';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);


class Headlines extends PureComponent{
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
        politique: [],
        Voyage: [],
        films: [],
        listCat: [
          'lifestyles',
          'politique',
          'voyage',
          'films'
        ]
      }
      // i was hard stuck at this trying to call those function and i keep getting this error : 
      // undefined is not an object (evaluating 'this.setstate')
      // i think this is because you have declared a function and it get executed before
      // the component gets mounted which means there is no setState yet
      // check https://github.com/goatslacker/alt/issues/283
      this.handleArticleOnPress = handleArticleOnPress.bind(this);
      this.handleModalClose = handleModalClose.bind(this);
    }
    async componentDidMount() {
      getCurrentnews(this.props.path, {country: this.props.country, pageSize:this.props.pageSize})
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
      this.preformSearch('lifeStyles', 'fr');
      this.preformSearch('politique', 'fr');
      this.preformSearch('Voyage', 'fr');
      this.preformSearch('films', 'fr');
    }

    // handleArticleOnPress = (dataArticle) => {
    //   this.setState({
    //     modalVisibility: true,
    //     articleData: dataArticle
    //   })
    // }

    // handleModalClose = () => {
    //   this.setState({
    //     modalVisibility: false,
    //     articleData: {}
    //   })
    // }

    preformSearch = async (query, lang) => {
      await getCurrentnews('/v2/everything', {q: query, language: lang})
        .then(response => {
          if(this.state.listCat.indexOf(query.toLowerCase()) > -1 ){
            this.setState({
              [query]: response.articles,
            })
          }
          // console.log(this.state.lifeStyles);
        }).catch(err => {
          console.log('current error', err);
        });
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
          <CarouselSlider articlesData={this.state.articles} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem} Title={'Top Stories'} />
          <CarouselSlider articlesData={this.state.lifeStyles} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem} Title={'Lifestyle'} />
          <CarouselSlider articlesData={this.state.politique} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem} Title={'Politique'} />
          <CarouselSlider articlesData={this.state.Voyage} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem} Title={'Voyage'} />
          <CarouselSlider articlesData={this.state.films} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} _renderItem={_renderItem} Title={'Films'} />
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