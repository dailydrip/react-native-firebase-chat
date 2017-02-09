import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
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
    if(this.props.item.type == 'image') {

      return(<View style={styles.containerImage}>
              <Text style={styles.name}>{this.props.item.name}</Text>
              <Image source={{uri: this.props.item.message}} style={{width: 100, height: 100, marginLeft: 10}} />
            </View>
        )
    }

    return (
      <View style={styles.container}>
          <Text style={styles.name}>{this.props.item.name}</Text>
        <Text style={styles.message}>{this.props.item.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    width: width,
    marginRight: 20,
    backgroundColor: '#E9E9EF',
    justifyContent: 'center',
  },
  containerImage: {
    flex: 1,
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
