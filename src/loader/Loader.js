import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

export function Loader(props) {
  return (
    // <View style={[styles.container, props.style]}>
      <View style={[styles.rect, props.style]}>
        <View style={styles.rect5Row}>
          <ImageBackground
            style={styles.rect5}
            imageStyle={styles.rect5_imageStyle}
            source={require("../assets/img/Gradient_ViJUmHx.png")}
          ></ImageBackground>
          <Svg viewBox="0 0 28.52 29.28" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(207,207,207,1)"
              cx={14}
              cy={15}
              rx={14}
              ry={15}
            ></Ellipse>
          </Svg>
        </View>
        <View style={styles.rect4Row}>
          <ImageBackground
            style={styles.rect4}
            imageStyle={styles.rect4_imageStyle}
            source={require("../assets/img/Gradient_ViJUmHx.png")}
          ></ImageBackground>
          <View style={styles.ellipse2Column}>
            <Svg viewBox="0 0 25.25 24.84" style={styles.ellipse2}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(216,216,216,1)"
                cx={13}
                cy={12}
                rx={13}
                ry={12}
              ></Ellipse>
            </Svg>
            <Svg viewBox="0 0 25.25 24.84" style={styles.ellipse3}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(209,209,209,1)"
                cx={13}
                cy={12}
                rx={13}
                ry={12}
              ></Ellipse>
            </Svg>
          </View>
        </View>
      </View>
    // </View>
  );
}

export function SmallLoader(props) {
  return (
    <View style={[props.style, {backgroundColor: '#fff'}]}>
      <View style={styles.full}>
        <Svg viewBox="0 0 25.25 24.84" style={styles.round1}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(216,216,216,1)"
            cx={13}
            cy={12}
            rx={13}
            ry={12}
          ></Ellipse>
        </Svg>
        {/* <ImageBackground
          style={styles.imgBack}
          // imageStyle={styles.rect2_imageStyle}
          source={require("../assets/img/Gradient_Ay6d9DR.png")}
        ></ImageBackground> */}
        <View style={styles.imgBack}></View>
        <View style={styles.elliow}>
          <Svg viewBox="0 0 25.25 24.84" style={styles.ellipse100}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(216,216,216,1)"
              cx={13}
              cy={12}
              rx={13}
              ry={12}
            ></Ellipse>
          </Svg>
          <Svg viewBox="0 0 25.25 24.84" style={styles.ellipse200}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(216,216,216,1)"
              cx={13}
              cy={12}
              rx={13}
              ry={12}
            ></Ellipse>
          </Svg>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  // container: {width: '100%'},
  rect: {
    width: '98%',
    height: 271,
    backgroundColor: "rgba(246,246,246,1)",
    borderRadius: 16,
    marginVertical:5,
    // marginHorizontal: 5,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 60,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flex: 1,
    // overflow: "hidden",
    marginTop: 9,
    marginLeft: 4,
  },
  rect5: {
    width: 128,
    height: 52,
    borderRadius: 29,
    overflow: "hidden"
  },
  rect5_imageStyle: {},
  ellipse: {
    width: 29,
    height: 29,
    marginLeft: 182
  },
  rect5Row: {
    height: 52,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 18,
    marginRight: 11
  },
  rect4: {
    width: 288,
    height: 56,
    borderRadius: 12,
    overflow: "hidden"
  },
  rect4_imageStyle: {},
  ellipse2: {
    width: 25,
    height: 25
  },
  ellipse3: {
    width: 25,
    height: 25,
    marginTop: 6
  },
  ellipse2Column: {
    width: 25,
    marginLeft: 22
  },
  rect4Row: {
    height: 56,
    flexDirection: "row",
    marginTop: 121,
    marginLeft: 18,
    marginRight: 15
  },
  full: {
    // width: 148,
    // height: 218,
    backgroundColor: "rgba(246,246,246,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 60,
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  round1: {
    width: 25,
    height: 25,
    marginTop: 11,
    marginLeft:'auto',
    marginRight: 15
    // marginLeft: 116
  },
  imgBack: {
    width: '95%',
    height: 42,
    borderRadius: 10,
    marginTop: 80,
    marginLeft: 7,
    overflow: "hidden",
    backgroundColor: 'lightgrey'
  },
  // rect2_imageStyle: {},
  ellipse100: {
    width: 25,
    height: 25,
  },
  ellipse200: {
    width: 25,
    height: 25,
    marginLeft: 'auto',
    marginRight: 8
  },
  elliow: {
    height: 25,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 15
  }
});

// export default Loader;
