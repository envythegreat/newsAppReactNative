import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Header(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect4}>
        <Text style={styles.news}>{props.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect4: {
    height: 143,
    backgroundColor: "rgba(31,178,204,1)",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 60,
    shadowOpacity: 0.25,
    shadowRadius: 20
  },
  news: {
    color: "#fff",
    fontSize: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '18%'
  }
});

export default Header;
