import React from "react";
import { StyleSheet, View, Image, StatusBar, Platform } from "react-native";

function Header(props) {
  return (
    <View style={[styles.container, props.style]}>
    <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
      <View style={styles.rect4}>
        <Image source={require('../../assets/logo.png')} style={styles.logoImgae} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect4: {
    backgroundColor: "#fff",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowOpacity: 0.25,
    flexDirection: 'row',
    justifyContent:'center',
    width: '100%'
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
    width: Platform.OS === 'ios' ? 70 : 130,
    overflow: 'visible',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? '18%' : '8%',
    bottom: 0
  }
});

export default Header;
