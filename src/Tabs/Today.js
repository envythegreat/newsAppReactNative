import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from "native-base";
import Headlines from '../components/Headlines';
import Header from '../components/Header';


export default function Today() {
  return (
    <View style={{height:'100%'}}>
      <Header title={'Top News'}/>
      <Container>
        <Headlines path={'/v2/top-headlines'} country={'ma'} pageSize={25} /> 
      </Container>
    </View>
  );
}

