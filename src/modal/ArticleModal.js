import React, {Component} from 'react';

import {
	Dimensions,
	Modal,
	Share
} from 'react-native';

import { WebView } from 'react-native-webview';

import {
	Container,
	Header,
	Body,
	Left,
	Icon,
	Right,
	Title,
	Button
} from 'native-base';

const webViewHeight = Dimensions.get('window').height - 56;

class ArticleModal extends Component {

	constructor(props){
		super(props);
	}
	// button to share articles from inside the webview
	handleShare = () => {
		const {url, title} = this.props.articleData;
    let message = `${title}\n\nRead More @${url}\n\nShared via RN News App`;
    return Share.share(
      {title, message, url: url},
      {dialogTitle:`Share ${title}`}
    );
	}
	// close article
	handleClose = () => {
		return this.props.onClose();
	}
  render() {
		const {showModal, articleData} = this.props;
		// console.log(articleData.url)
		if(articleData.url != undefined) {
			return(
				<Modal
					animationType="slide"
					transparent
					visible={showModal}
					onRequestClose={this.handleClose}
				>
					<Container style={{margin:0, marginBottom:0, backgroundColor:'#fff'}}>
						<Header style={{backgroundColor:'white'}}>
							<Left>
								<Button onPress={this.handleClose} transparent>
									<Icon name='close' style={{color: 'black', fontSize: 40}} />
								</Button>
							</Left>
							<Body>
								<Title style={{color: 'black'}}>{articleData.title}</Title>
							</Body>
							<Right>
								<Button onPress={this.handleShare} transparent>
									<Icon name='share' style={{color: 'black', fontSize: 30}} />
								</Button>
							</Right>
						</Header>
						{/* <Content contentContainerStyle={{height: webViewHeight}}> */}
							<WebView source={{uri: articleData.url}} style={{flex:1}}
								onError={this.handleClose} startInLoadingState={true} scalesPageToFit
								scrollEnabled={true} style={{height: webViewHeight}}
								/>
						{/* </Content> */}
					</Container>
				</Modal>
			);
		} else {
			return null;
		}
  } 
}
export default ArticleModal;