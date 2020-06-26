import React, { Component } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import {Container, Tabs, Tab,ScrollableTab } from "native-base";
import Headlines from '../components/Headlines'
import Header from '../components/Header'
import {getTime} from '../config/functions'
import NewsList from '../components/News'
export default class Home extends Component {




  render() {
    return (
      <>
      <Header title={'News'}/>
      <View style={{height:'100%'}}>
        
        <Container>
          <Tabs renderTabBar={()=> <ScrollableTab />} tabBarUnderlineStyle={{backgroundColor:'#424242'}}>
  
            <Tab heading="Business" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <NewsList path={'/v2/everything'} category={'business'}  from={getTime({minusdays: 3})} to={getTime({minusdays:0})}  pageSize={30} /> 
            </Tab>
  
            <Tab heading="Entertainment" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <NewsList path={'/v2/everything'} category={'entertainment'}  from={getTime({minusdays: 2})} to={getTime({minusdays:0})} /> 
            </Tab>
  
            <Tab heading="Health" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <NewsList path={'/v2/everything'} category={'health'}  from={getTime({minusdays: 2})} to={getTime({minusdays:0})} />
            </Tab>
  
            <Tab heading="Science" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <NewsList path={'/v2/everything'} category={'science'}  from={getTime({minusdays: 2})} to={getTime({minusdays:0})} />
            </Tab>
  
            <Tab heading="Sports" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <NewsList path={'/v2/everything'} category={'sports'}  from={getTime({minusdays: 2})} to={getTime({minusdays:0})} />
            </Tab>
  
            <Tab heading="Technology" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <NewsList path={'/v2/everything'} category={'technology'}  from={getTime({minusdays: 2})} to={getTime({minusdays:0})} />
            </Tab>
  
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