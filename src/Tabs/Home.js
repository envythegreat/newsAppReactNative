import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native';

import {
  Container,
  Tabs,
  Tab,
  ScrollableTab 
} from "native-base";

import Header from '../components/Header'
import {getTime} from '../config/functions'
import News from '../components/News'

export default class Home extends Component {

  render() {
    const tabList = [
      // categories are going to be displayed at the home tab with the Tab Component
      {cat:'Business'}, {cat:'Entertainment'}, {cat:'Health'}, {cat:'Science'}, {cat:'Sports'}, {cat:'Technology'}
    ]

    const pagesize = 30; // how  many articles are going to be displayed per categorie
    const from = 3; // time check ./src/config/fucntions -> getTime fucntion
    const to = 0; // time check ./src/config/fucntions -> getTime fucntion

    const newTabList = tabList.map((item, index ) => {
      // newTabList variable that store tabs and news data for each categorie so the can be displayed on  news[Home] Tab
      return <Tab heading={item.cat} tabStyle={{backgroundColor:'#fff'}} activeTabStyle={{backgroundColor:'#fff', fontWeight: 'bold'}} textStyle={{color:'black'}} activeTextStyle={{color:'red'}} key={index}>
              <News path={'/v2/everything'} category={item.cat.toLowerCase()}  from={getTime({minusdays: from})} to={getTime({minusdays:to})}  pageSize={pagesize} /> 
            </Tab>
    })
    return (
      <>
      <Header title={'News'}/>
      <View style={{height:'100%'}}>
        
        <Container>
          <Tabs renderTabBar={()=> <ScrollableTab />} tabBarUnderlineStyle={{backgroundColor:'red'}}>
            {newTabList}
          </Tabs>
        </Container>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'25%',
    borderColor: 'red',
    justifyContent: 'center',
  },
  TextColo: {
    color: 'snow',
    fontSize:40,
    // alignItems: 'center',
    marginLeft:10,
    marginTop:30,
    fontWeight:'bold'
  },
  paraText: {
    paddingRight:8,
    fontSize:12,
  }
});