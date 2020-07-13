import 'react-native-gesture-handler';
import React, {Component} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Home from './src/Tabs/Home';
import Countries from './src/Tabs/Countries';
import Today from './src/Tabs/Today';
import MoreNews from './src/screens/MoreNews'
import Search from './src/Tabs/Search'
import SavedArt from './src/Tabs/SavedArt'
// import RootStackScreen from './src/config/RootStackScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
class App extends Component {
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


  RootStackScreen () {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen  name='Countries' component={Countries}/>
          <Stack.Screen  name='MoreNews' component={MoreNews}/>
        </Stack.Navigator>
    );
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
                activeTintColor: 'red',
                inactiveBackgroundColor: '#fff',
                activeBackgroundColor:'#fff',
                inactiveTintColor: '#000',
                style:{
                  backgroundColor: '#fff'
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
                name="Countries"
                component={this.RootStackScreen} 
                options={{
                  tabBarLabel: 'Other News',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="skew-more" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Search"
                component={Search} 
                options={{
                  tabBarLabel: 'Search',
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="md-search" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Saved"
                component={SavedArt} 
                options={{
                  tabBarLabel: 'Saved',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bookmark" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
      );
    }
  }
}
export default App;