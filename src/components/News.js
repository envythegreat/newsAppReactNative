import React, {Component} from 'react'
import {Image,StyleSheet} from 'react-native'
import { Container, Content} from 'native-base';
import ArticleModal from '../modal/ArticleModal'
import {getCurrentnews} from '../config/functions';
import Newslist from './Newslist'

class NewsList extends Component{
    constructor(props) {
      super(props);
      this.state = {
        articles : {},
        stillLoading: true,
        modalVisibility :  false,
				articleData : {},
      }
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
    
		const newsList = this.state.articles.map((item, index) => {
			return <Newslist 
							articleImg={item.urlToImage}
							ArticleTitle={item.title}
							ArticleDesc={item.description ? item.description : item.content}
							ArticleUrl={item.url}
							onPressArt={this.handleArticleOnPress}
							key={index}
						/>
		})
    return(
			<Container style={{backgroundColor:'#fff'}}>
      	<Content>
					{newsList}
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

export default NewsList;