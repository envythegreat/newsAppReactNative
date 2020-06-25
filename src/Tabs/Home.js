import React, { Component } from 'react'
import { StyleSheet, Text, View} from 'react-native';
import {Container, Tabs, Tab,ScrollableTab } from "native-base";
import Headlines from '../components/Headlines'
import Header from '../components/Header'

export default class Home extends Component {

  appendZero = (n) => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  getTime = ({minusdays}) => {
    const currentDate = new Date();
    if(minusdays) {
      let olddays = new Date(currentDate.setDate(currentDate.getDate() - minusdays));
      return `${olddays.getFullYear()}-${this.appendZero(olddays.getMonth()+1)}-${this.appendZero(olddays.getDate())}`
      // console.log(olddays)
    }
    return `${currentDate.getFullYear()}-${this.appendZero(currentDate.getMonth()+1)}-${this.appendZero(currentDate.getDate())}`
  }


  render() {
    console.log(this.getTime({minusdays:0}))
    return (
      <>
      <Header title={'News'}/>
      <View style={{height:'100%'}}>
        
        <Container>
          <Tabs renderTabBar={()=> <ScrollableTab />} tabBarUnderlineStyle={{backgroundColor:'#424242'}}>
  
            <Tab heading="Business" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <Headlines path={'/v2/everything'} category={'business'}  from={this.getTime({minusdays: 3})} to={this.getTime({minusdays:0})}  pageSize={30} /> 
            </Tab>
  
            <Tab heading="Entertainment" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <Headlines path={'/v2/everything'} category={'entertainment'}  from={this.getTime({minusdays: 2})} to={this.getTime({minusdays:0})} /> 
            </Tab>
  
            <Tab heading="Health" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <Headlines path={'/v2/everything'} category={'health'}  from={this.getTime({minusdays: 2})} to={this.getTime({minusdays:0})} />
            </Tab>
  
            <Tab heading="Science" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <Headlines path={'/v2/everything'} category={'science'}  from={this.getTime({minusdays: 2})} to={this.getTime({minusdays:0})} />
            </Tab>
  
            <Tab heading="Sports" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <Headlines path={'/v2/everything'} category={'sports'}  from={this.getTime({minusdays: 2})} to={this.getTime({minusdays:0})} />
            </Tab>
  
            <Tab heading="Technology" tabStyle={{backgroundColor:'#696969'}} activeTabStyle={{backgroundColor:'#696969'}} textStyle={{color:'snow'}} activeTextStyle={{color:'white'}}>
              <Headlines path={'/v2/everything'} category={'technology'}  from={this.getTime({minusdays: 2})} to={this.getTime({minusdays:0})} />
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