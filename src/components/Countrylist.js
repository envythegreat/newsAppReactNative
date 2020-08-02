import React from 'react';
import {TouchableOpacity} from 'react-native'
import {ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base';

export default function Countrylist ({name, icon, code, navigation, lang}) {
  return (
    <ListItem thumbnail style={{marginBottom: 7}} itemDivider={false}>
      <Left>
        <Thumbnail square source={{ uri: `${icon}` }}  style={{width:50, height:50}} />
      </Left>
      <Body>
        <Text>{name} News</Text>
          {/* <Text note numberOfLines={1}>Its time to build a difference . .</Text> */}
      </Body>
      <Right>
        <TouchableOpacity onPress={() => 
            navigation.navigate('MoreNews',{
              params: {
                  countryData: {
                  Country: code,
                  path: '/v2/top-headlines'
                } 
              }
            })
          }>
            <Text style={{color: '#add8e6'}}>View More</Text>
          </TouchableOpacity>
        </Right>
      </ListItem>
    )
}