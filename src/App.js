import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import MainScreen from './MainScreen'
import { StackNavigator } from 'react-navigation'
import Profile from './Profile'

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <MainScreen />
      </View>
    );
  }
}

const AppNavigator = StackNavigator({
  MainScreen: { screen: MainScreen },
  Profile: { screen: Profile }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default AppNavigator
