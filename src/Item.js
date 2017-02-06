import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import FirebaseClient from './FirebaseClient'


var width = Dimensions.get('window').width;

class Item extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight>
        <View style={styles.container}>
            <Text style={styles.name}>{this.props.item.name}</Text>
          <Text style={styles.message}>{this.props.item.message}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    width: width,
    backgroundColor: '#E9E9EF',
    justifyContent: 'center',
  },
  message: {
    fontSize: 22,
    color: '#393e42',
    textAlign: 'left',
    margin: 10,
  },
  name: {
    fontSize: 12,
    color: '#393e42',
    textAlign: 'left',
    margin: 10,
  },
});

export default Item
