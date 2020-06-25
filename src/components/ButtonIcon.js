import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ButtonIcon(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.button2}>
        {/* <Icon name={} style={styles.icon2}></Icon> */}
        <MaterialCommunityIcons name={props.icon} style={styles.icon2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default ButtonIcon;
