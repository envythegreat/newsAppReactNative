import React, {Component} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Left, ListItem, Thumbnail, Text, Body } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {handleViewPress, handleShare} from '../config/functions';

class Swipble extends Component{

  constructor(props){
		super(props);
		// only god know how those things works 
    this.handleRemoveArticle = () => {this.props.handleRemoveArticle(this.props.item.id)}

    this.handleViewPress = () => {
      handleViewPress(this.props.item.Url, this.props.item.Title, this.props.onPressArt)
    }
    this.handleShare = () => {
      handleShare(this.props.item.Url, this.props.item.Title)
    }
  }


  LeftBtn = () => {
		return(
			<TouchableOpacity onPress={this.handleRemoveArticle} style={styles.leftBtn}>
				<MaterialCommunityIcons name="delete-outline" 
						size={30} color="#fff" style={styles.closeICon}/>
      </TouchableOpacity>
		)
	}
	RightBtn = () => {
		return(
			<TouchableOpacity onPress={() => this.handleViewPress} style={styles.rightBtnBtn}>
				<MaterialCommunityIcons name="open-in-new" size={30} color="#fff" style={styles.closeICon}/>
      </TouchableOpacity>
		)
  }
  
  render() {
    return (
      <Swipeable
				renderLeftActions={this.LeftBtn}
				renderRightActions={this.RightBtn}
				onSwipeableLeftOpen={this.handleRemoveArticle}
        onSwipeableRightOpen={this.handleViewPress}
			>
				<View style={{backgroundColor: '#fff'}}>
					<ListItem thumbnail>
						<Left>
							<Thumbnail square source={{ uri: `${this.props.item.Image}` }} />
						</Left>
						<Body>
							<Text numberOfLines={1}> {this.props.item.Title} </Text>
							<Text note numberOfLines={2}> {this.props.item.Desc} </Text>
						</Body>
					</ListItem>
				</View>
			</Swipeable>
    );
  }
}

export default Swipble;

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