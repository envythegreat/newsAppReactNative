import React, { Component, PureComponent } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Share, Platform } from "react-native";
import {Text} from 'native-base'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {handleViewPress, handleShare, SetArticles} from '../config/functions';

class BreakingCard extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      icon: <FontAwesome5 name="bookmark" size={30} color="rgba(240,91,91,1)" />,
    }
    this.handleViewPress = () => {
      handleViewPress(this.props.ArticleUrl, this.props.ArticleTitle, this.props.onPressArt)
    }
    this.handleShare = () => {
      handleShare(this.props.ArticleUrl, this.props.ArticleTitle)
    }
  }
  render() {
    const {articleImg, ArticleTitle, ArticleDesc, ArticleUrl} = this.props;
    const img = articleImg ? articleImg : `https://vl-media.fr/wp-content/uploads/2018/05/news.jpg`;
    const _SaveArticle =  () => {
      const article = {Image: img, Title: ArticleTitle, Desc: ArticleDesc, Url: ArticleUrl}
      SetArticles(article);
      this.setState({
        icon: <FontAwesome name="bookmark" size={30} color="rgba(240,91,91,1)" />
      })
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{uri: `${img}`}}
          resizeMode="cover"
          style={styles.image}
          imageStyle={styles.image_imageStyle}
        >
          <View style={styles.group}>
            <View style={styles.rect2}>
              <View style={styles.iconStack}>
                <FontAwesome5 name="hotjar" size={35} color="rgba(240,91,91,1)" />
                <Text style={styles.breaking}>Breaking</Text>
              </View>
            </View>
          </View>

            <TouchableOpacity style={[styles.SaveBtn, {marginLeft: 'auto'}]} onPress={_SaveArticle}>
              {this.state.icon}
            </TouchableOpacity>

          <View style={styles.group4}>
            <View style={styles.group2Row}>
              <View style={styles.rect3}>
                <Text style={styles.loremIpsum} note numberOfLines={3}>{ArticleTitle ? ArticleTitle : ArticleDesc}</Text>
              </View>
              <View style={styles.group3}>
                <View style={styles.touchableIcon}>
                  <TouchableOpacity style={styles.button2} onPress={this.handleShare}>
                    <MaterialCommunityIcons name="share" style={styles.icon2} />
                  </TouchableOpacity>
                </View>

                <View style={styles.touchableIcon}>
                  <TouchableOpacity style={styles.button2} onPress={this.handleViewPress}>
                    {/* <Icon name={} style={styles.icon2}></Icon> */}
                    <MaterialCommunityIcons name="open-in-new" style={styles.icon2} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
		height: 271,
		padding: 5,
		shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 60,
    shadowOpacity: 0.25,
    shadowRadius: 20
  },
  image: {
    borderRadius: 20,
    flex: 1,
    overflow: "hidden"
  },
  image_imageStyle: {},
  group: {
    width: 133,
    height: 52,
    marginTop: 9,
    marginLeft: 5,
  },
  rect2: {
    width: '100%',
    height: 52,
    backgroundColor: "#E6E6E6",
    borderRadius: 31,
  },
  icon: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(240,91,91,1)",
    fontSize: 40,
    height: 40,
    width: 40
  },
  breaking: {
    top: 9,
    left: 36,
    position: "absolute",
    fontFamily: "roboto_700",
    color: "#121212",
    fontSize: 18
  },
  iconStack: {
    width: 108,
    height: 40,
    marginTop: 6,
    marginLeft: 11
  },
  group4: {
    width: '100%',
    height: 66,
    flexDirection: "row",
    marginTop: 113,
    marginLeft: 25
  },
  group2: {
    width: 275,
    height: 66
  },
  rect3: {
    width: Platform.OS === 'ios' ? '75%' : '80%',
    height: 66,
    backgroundColor: "#000",
    borderRadius: 10,
		// opacity: 0.5,
  },
  loremIpsum: {
    fontFamily: "Roboto_regular",
    color: "#fff",
		fontSize: 15,
    padding: 5,
    textAlign: 'center',
		fontWeight: '800'
  },
  group3: {
    width: 26,
    height: 66,
    marginLeft: Platform.OS === 'ios' ? 19 : 20
  },
  untitledComponent1: {
    height: 26,
    width: 26
  },
  touchableIcon: {
    width: 26,
    height: 26,
    marginTop: 3
  },
  group2Row: {
    height: 66,
    flexDirection: "row",
    flex: 1,
    marginRight: 1
  },
  button2: {
    width: 30,
    height: 30,
    // backgroundColor: "rgba(238,59,238,1)",
  },
  icon2: {
    color: "snow",
    fontSize: 25,
    padding: 1,
  },
  SaveBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
  }
});

export default BreakingCard;
