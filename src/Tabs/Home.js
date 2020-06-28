import React, { Component } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import {Container, Tabs, Tab,ScrollableTab } from "native-base";
import Headlines from '../components/Headlines'
import Header from '../components/Header'
import {getTime} from '../config/functions'
import NewsList from '../components/News'

export default class Home extends Component {

  render() {
    const tabList = [
      {cat:'Business'}, {cat:'Entertainment'}, {cat:'Health'}, {cat:'Science'}, {cat:'Sports'}, {cat:'Technology'}
    ]
    const pagesize = 30;
    const from = 3;
    const to = 0;
    const newTabList = tabList.map((item, index ) => {
      return <Tab heading={item.cat} tabStyle={{backgroundColor:'#fff'}} activeTabStyle={{backgroundColor:'#fff', fontWeight: 'bold'}} textStyle={{color:'black'}} activeTextStyle={{color:'red'}} key={index}>
              <NewsList path={'/v2/everything'} category={item.cat.toLowerCase()}  from={getTime({minusdays: from})} to={getTime({minusdays:to})}  pageSize={pagesize} /> 
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