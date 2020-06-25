import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Share} from "react-native";
import {Text} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient  } from 'expo-linear-gradient'


function SmallArticleCard({articleImg, ArticleTitle, ArticleDesc, ArticleUrl, onPressArt, style}) {

	const img = `https://vl-media.fr/wp-content/uploads/2018/05/news.jpg`;

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
		
    <View style={[styles.container, style]}>
		
      <ImageBackground
							source={{uri : `${articleImg ? articleImg : img}`}}
							resizeMode="cover"
							style={styles.image}
							imageStyle={styles.image_imageStyle}
						>
				<LinearGradient
					colors={["#09203f", "#537895"]}
          start={{x: 0, y: 1}} end={{x: 0, y: 0}}
					style={styles.linearGradient}
				>
					<View style={styles.rect}>
						<Text style={styles.loremIpsum} note numberOfLines={4}>
							{ArticleTitle}
						</Text>
					</View>
					<View style={styles.actionArea}>
						<TouchableOpacity style={[styles.Touchb, styles.btnIcon1]} onPress={handleShare}>
							<MaterialCommunityIcons name="share" style={styles.caption} />
						</TouchableOpacity>
						<TouchableOpacity style={[styles.Touchb, styles.btnIcon2]} onPress={handleViewPress}>
							<MaterialCommunityIcons name="open-in-new" style={styles.caption} />
						</TouchableOpacity>
					</View>
				</LinearGradient>
      </ImageBackground>
    </View>
		
  );
}

const styles = StyleSheet.create({
  container: {
		// width: '40%',
    // height: 270,
    borderRadius: 20,
    backgroundColor: "rgba(15,15, 15,0)",
		overflow: 'visible',
		marginVertical: 10,
		marginHorizontal: 5,
		justifyContent: 'center',
		// alignItems: 'center'
	},
  image: {alignItems: 'center'},
  image_imageStyle: {
		borderRadius: 15,
		height: '100%',
		
	},
  rect: {
    width: '90%',
    height: 70,
    backgroundColor: "#000",
    marginTop: 140,
		alignContent: 'center',
		alignItems: 'center',
		// justifyContent: 'center',
		
		borderRadius: 5,
		padding: 4
  },
  loremIpsum: {
    fontFamily: "Roboto_regular",
    color: "#fff",
		fontSize: 14,
		// padding: 5,
		fontWeight: 'bold',
		opacity: 1
  },
  btnIcon1: {
    height: 26,
    width: 26
  },
  btnIcon2: {
    height: 26,
    width: 26,
    marginLeft: 'auto'
  },
  actionArea: {
    height: 30,
    flexDirection: "row",
		marginTop: 4,
		// marginHorizontal: 0
		marginTop:5,
		// backgroundColor: '#000',
		width: '90%',
		padding: 4
  },
  Touchb: {
    backgroundColor: "transparent",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "row",
    borderRadius: 2
  },
  caption: {
    color: "#fff",
    fontSize: 25
	},
	linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
    justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15
  },
});

export default SmallArticleCard;
