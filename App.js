import 'react-native-gesture-handler';
import React, {Component} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Root } from "native-base";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Home from './src/Tabs/Home';
import Article from './src/Tabs/Article';
import Today from './src/Tabs/Today';


const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      roboto_700: require('./assets/fonts/roboto-700.ttf'),
    	Roboto_regular: require('./assets/fonts/roboto-regular.ttf'),
    });
    this.setState({ loading: false });
  }
  render(){
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    } else {
        return (
          <NavigationContainer >
            <Tab.Navigator
              initialRouteName="Today"
              tabBarOptions={{
                activeTintColor: 'snow',
                inactiveBackgroundColor: '#696969',
                activeBackgroundColor:'#696969',
                style:{
                  backgroundColor: '#696969'
                }
              }}
            >
              <Tab.Screen
                name="Today"
                component={Today} 
                options={{
                  tabBarLabel: 'Today',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="newspaper" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="News"
                component={Home} 
                options={{
                  tabBarLabel: 'News',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="newspaper-plus" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Account"
                component={Article} 
                options={{
                  tabBarLabel: 'Other News',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="skew-more" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
      );
    }
  }
}
