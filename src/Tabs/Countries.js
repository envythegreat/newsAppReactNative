import React from 'react';
import { StyleSheet} from 'react-native';
import { Container,Content, List } from 'native-base';
import { Country } from '../config/listCountry';
import Countrylist from '../components/Countrylist';
import Header from '../components/Header'






export default function Countries({navigation}) {
  const MyCountryList = Country.map((item, index) => {
    return <Countrylist name={item.Name} icon={item.icon} code={item.Code} key={index} navigation={navigation} lang={item.lang}/>
  })
  return (
      // <SafeAreaView>
        <Container style={{backgroundColor:'#fff'}}>
          <Header title={'Other News'}/>
          <Content style={{marginTop:10}}>
            <List itemDivider={false}>
              {MyCountryList}
            </List>
          </Content>
        </Container>
      // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    overflow: "visible",
    borderRadius: 4,
    color: "#fff",
    backgroundColor: "#424242",
    margin:5
  },
  MuiCardHeaderRoot: {
    display: 'flex',
    padding: 16,
    // alignItems: 'center'
    flexGrow: 1,
    flexBasis: 'auto',
    flexShrink: 1
  },
  ImageArea: {
    paddingTop: '40.25%',
    width: '100%',
    height: 150,
    flex: 1,
  },
  MuiTypographyTitle:{
    fontSize: 25,
    fontFamily: 'Roboto',
    fontWeight: '400',
    letterSpacing: 0.17136,
    color: '#fff'
  },
  dateSpan: {
    fontWeight: '400',
    color: '#fff',
    letterSpacing: 0.17136
  },
  DescriptionArea: {
    padding: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    letterSpacing: 0.17136,
    // lineHeight: 1
  },
  cardAction: {
    display: 'flex',
    padding: 8,
    flexDirection: 'row',
  },
  actionButton: {
    padding: 12,
    overflow: 'visible',
    fontSize: 24,
    borderRadius: 50,
  }
});