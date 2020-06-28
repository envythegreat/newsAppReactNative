import React, { Component } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";

function Header(props) {
  return (
    <View style={[styles.container, props.style]}>
    <StatusBar barStyle="dark-content" />
      <View style={styles.rect4}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImgae} />
        {/* <Text style={styles.news}>{props.title}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect4: {
    height: 143,
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // shadowColor: "rgba(0,0,0,1)",
    // shadowOffset: {
    //   width: 0,
    //   height: 5
    // },
    // elevation: 60,
    shadowOpacity: 0.25,
    // shadowRadius: 20,
    flexDirection: 'row',
    justifyContent:'center'
  },
  news: {
    color: "#fff",
    fontSize: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '18%'
  },
  logoImgae:{
    height: 70,
    width: 70,
    // flex: 1,
    overflow: 'visible',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: '18%',
    bottom: 0
    // marginLeft: 60,

  }
});

export default Header;
