import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Share } from "react-native";
import {Text} from 'native-base'
import Icon from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function BreakingCard({articleImg, ArticleTitle, ArticleDesc, ArticleUrl, onPressArt}) {
  const img = articleImg ? articleImg : `https://vl-media.fr/wp-content/uploads/2018/05/news.jpg`;
  // console.log(articleImg)
  function handleViewPress(){
    let url = ArticleUrl;
    let title = ArticleTitle;
    onPressArt({url, title})
  }
  function handleShare(){
    // console.log(ArticleTitle)
    const  data = {
                    title: ArticleTitle, 
                    url: ArticleUrl
                  }
		let message = `${data.title}\n\nRead More @${data.url}\n\nShared via RN News App`;
		return Share.share(
			{title: data.title , url: data.url},
			{dialogTitle:`Share ${message}`}
		);
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
              <Icon name="whatshot" style={styles.icon}></Icon>
              <Text style={styles.breaking}>Breaking</Text>
            </View>
          </View>
        </View>
        <View style={styles.group4}>
          <View style={styles.group2Row}>
              <View style={styles.rect3}>
                <Text style={styles.loremIpsum} note numberOfLines={3}>{ArticleTitle}</Text>
            </View>
            <View style={styles.group3}>
              <View style={[styles.container, styles.untitledComponent12]}>
                <TouchableOpacity style={styles.button2} onPress={handleShare}>
                  {/* <Icon name={} style={styles.icon2}></Icon> */}
                  <MaterialCommunityIcons name="share" style={styles.icon2} />
                </TouchableOpacity>
              </View>

              <View style={[styles.container, styles.untitledComponent12]}>
                <TouchableOpacity style={styles.button2} onPress={handleViewPress}>
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
    marginLeft: 5
  },
  rect2: {
    width: 133,
    height: 52,
    backgroundColor: "#E6E6E6",
    borderRadius: 31
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
    width: 321,
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
    width: 275,
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
		fontWeight: '800'
  },
  group3: {
    width: 26,
    height: 66,
    marginLeft: 19
  },
  untitledComponent1: {
    height: 26,
    width: 26
  },
  untitledComponent12: {
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
  }
});

export default BreakingCard;
