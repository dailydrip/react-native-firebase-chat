import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  AsyncStorage,
  Button as ButtonNative,
  Dimensions,
  View
} from 'react-native';
import { FormLabel, FormInput, Button  } from 'react-native-elements'
import FirebaseClient from './FirebaseClient'
import Item from './Item'

const list = ['Loading...']

var width = Dimensions.get('window').width;

class MainScreen extends Component {

  static navigationOptions = {
    title: 'Firebase Chat',
    header: ({ state, setParams, navigate }) => ({
      right: (
        <ButtonNative
          title="Profile"
          onPress={() => navigate('Profile')}
        />
      ),
    })
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      dataSource: this.ds.cloneWithRows(list),
      message: ''
    };

    this.itemsRef = this.getRef().child('chat')
    this.renderItem = this.renderItem.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.getProfileName = this.getProfileName.bind(this)
  }

  getRef() {
    return FirebaseClient.database().ref();
  }

  setItemsFromFirebase(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          message: child.val().message,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.ds.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    this.getProfileName()
    this.setItemsFromFirebase(this.itemsRef);
  }

  renderItem(item) {
    return (
      <Item item={item} />
    )
  }

  updateProfileName(profile_name){
    this.setState({profile_name})
  }

  sendMessage(){
    if(this.state.message != ''){
      FirebaseClient.database().ref('/chat').push({
        name: this.state.profile_name,
        message: this.state.message
      })
      this.setState({ message: '' })
    }
  }

  getProfileName(){
    AsyncStorage.getItem('profile_name', (err, result) => {
      this.setState({profile_name: result})
    });
  }

  updateMessage(message){
    this.setState({message})
  }

  componentDidUpdate() {
    if("listHeight" in this.state &&
           "footerY" in this.state &&
               this.state.footerY > this.state.listHeight)
    {
        var scrollDistance = this.state.listHeight - this.state.footerY;
        this.refs.list.getScrollResponder().scrollTo({x: 0, y: -scrollDistance});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
            ref="list"
            onLayout={(event) => {
              var layout = event.nativeEvent.layout;

              this.setState({
                  listHeight : layout.height
              });
            }}
            renderFooter={() => {
                return <View onLayout={(event)=>{
                    var layout = event.nativeEvent.layout;
                    this.setState({
                        footerY : layout.y
                    });
                }}></View>
            }}
            dataSource={this.state.dataSource}
            renderRow={this.renderItem} />

          <View style={styles.sendMessageArea}>

            <View style={styles.inputMessageArea}>

              <View style={styles.formInputArea}>
                <FormInput onChangeText={this.updateMessage} value={this.state.message} inputStyle={styles.inputMessage} />
              </View>

              <View style={styles.buttonArea}>
                <Button
                  onPress={this.sendMessage}
                  title='>' />
              </View>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  inputMessage: {
    color: 'gray'
  },
  inputMessageArea: {
    flexDirection: 'row',
  },
  formInputArea: {
    width: width * 0.8
  },
  buttonArea: {
    flex: 1,
  },
  sendMessageArea: {
    marginBottom: 10
  }
});

export default MainScreen
