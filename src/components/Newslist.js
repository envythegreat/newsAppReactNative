// Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem, Icon, 
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Share } from 'react-native';
import {Text} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons'; 
const Newslist = ({articleImg, ArticleTitle, ArticleDesc, ArticleUrl, onPressArt}) => {

  function handleViewPress(){
    let url = ArticleUrl;
    let title = ArticleTitle;
    onPressArt({url, title})
  }
  function handleShare(){
    console.log(ArticleTitle)
    const  data = {
                    title: ArticleTitle, 
                    url: ArticleUrl
                  }
		let message = `${data.title}\n\nRead More @${data.url}\n\nShared via RN News App`;
		return Share.share(
			{title: data.title , url: data.url},
			{dialogTitle:`Share ${data.title}`}
		);
	}
  return (
    <View style={styles.container}>
      {/**Header Card Area */}
        <View style={styles.MuiCardHeaderRoot}>
            <Text style={styles.MuiTypographyTitle} note numberOfLines={1}>{ArticleTitle}</Text>
            {/* <Text style={styles.dateSpan}>Date mm/dd/yyyy</Text> */}
        </View>
        {/**Image Card Area */}
        <View>
          <Image source={{uri: `${articleImg}`}} style={styles.ImageArea} />
        </View>
        <View>
          <Text style={styles.DescriptionArea} note numberOfLines={2}>
            {ArticleDesc} 
          </Text>
        </View>
        <View style={styles.cardAction}>
          {/* <TouchableOpacity style={styles.actionButton}><MaterialCommunityIcons name="heart" color={'#fff'} size={25} /></TouchableOpacity> */}
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <MaterialCommunityIcons name="share" color={'#fff'}size={25} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton,{marginLeft: 'auto', padding:12, flexDirection:'row'}} onPress={handleViewPress}>
            <Text style={{padding:3,color: '#fff',fontSize: 18, fontWeight:'600'}}>View More</Text>
            {/* <AntDesign name="right" size={24} color="#fff" /> */}
          </TouchableOpacity>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    overflow: "visible",
    borderRadius: 4,
    color: "#fff",
    backgroundColor: "#424242",
    margin:5
  },
  MuiCardHeaderRoot: {
    display: 'flex',
    padding: 16,
    // alignItems: 'center'
    flexGrow: 1,
    flexBasis: 'auto',
    flexShrink: 1
  },
  ImageArea: {
    paddingTop: '40.25%',
    width: '100%',
    height: 150,
    flex: 1,
  },
  MuiTypographyTitle:{
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    letterSpacing: 0.17136,
    color: '#fff',
    marginBottom:6
  },
  dateSpan: {
    fontWeight: '400',
    color: '#fff',
    letterSpacing: 0.17136
  },
  DescriptionArea: {
    padding: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    letterSpacing: 0.17136,
    // lineHeight: 1
  },
  cardAction: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
  },
  actionButton: {
    padding: 12,
    overflow: 'visible',
    fontSize: 24,
    borderRadius: 50,
  }
});

export default Newslist;