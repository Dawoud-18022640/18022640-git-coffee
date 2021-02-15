import 'react-native-gesture-handler';
//
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/HomeScreen.js'
import SignupScreen from './components/SignUp.js'
import LogIn from './components/Log-In.js';
import Welcome from './components/Welcome.js';
import UpdateUser from './components/UpdateUser.js'
import GetUser from './components/GetUser.js'
import LogOut from './components/Logout.js'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class App extends Component{
  render(){
    return(
      <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Sign up" component={SignupScreen}/>
          <Drawer.Screen name="Log in" component={LogIn}/>
          <Drawer.Screen name="Welcome" component={Welcome}/>
          <Drawer.Screen name="Get User" component={GetUser}/>
          <Drawer.Screen name="Logout" component={LogOut}/>
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
export default App;
