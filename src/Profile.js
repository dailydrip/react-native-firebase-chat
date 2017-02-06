import React, { Component } from 'react';
import { Modal, TouchableHighlight, View, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, Text, Button } from 'react-native-elements'
import FirebaseClient from './FirebaseClient'

class Profile extends Component {
  static navigationOptions = {
    title: 'My Profile'
  }

  constructor(props) {
    super(props);
    this.state = {profile_name: '', updated: ''};
    this.updateProfileName = this.updateProfileName.bind(this)
    this.onChangeProfileName = this.onChangeProfileName.bind(this)
    this.getProfileName = this.getProfileName.bind(this)
  }

  componentDidMount() {
    this.getProfileName()
  }

  onChangeProfileName(profile_name){
    this.setState({profile_name: profile_name, updated: ''})
  }

  updateProfileName(){
    if(this.state.profile_name != ''){
      AsyncStorage.setItem('profile_name', this.state.profile_name)
      this.setState({updated: 'Updated!'})
    }

    this.props.navigation.dispatch({
      type: 'Reset',
      index: 0,
      actions: [{ type: 'Navigate', routeName: 'MainScreen' }]
    })
  }

  getProfileName(){
    AsyncStorage.getItem('profile_name', (err, result) => {
      this.setState({profile_name: result})
    });
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <FormLabel labelStyle={{fontSize: 22, marginBottom: 10}}>Your Name</FormLabel>
        <FormInput value={this.state.profile_name} onChangeText={this.onChangeProfileName} inputStyle={{height: 60, fontSize: 28}} />

        <Button
          buttonStyle={{marginTop: 30}}
          onPress={this.updateProfileName}
          raised
          title='SAVE' />
        <Text style={{margin: 20}}>{this.state.updated}</Text>
      </View>
    );
  }
}

export default Profile
