import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { titleCase } from '../helpers/utils';

class PlaceScreen extends Component {
  static navigationOptions = {
    title: 'Place',
  };

  state = {};

  render() {
    const { navigation } = this.props;
    const place = navigation.getParam('place');
    return (
      <View>
        <Text>{titleCase(place.properties.nombre)}</Text>
      </View>
    );
  }
}

export default PlaceScreen;
