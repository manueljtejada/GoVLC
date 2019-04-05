import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import * as actionCreators from '../redux/actions/index';

import Header from '../constants/Header';
import { titleCase } from '../helpers/utils';

class PlaceScreen extends Component {
  static navigationOptions = {
    ...Header,
    title: 'Place',
  };

  state = {};

  render() {
    const { navigation, toggleVisited } = this.props;
    const place = navigation.getParam('place');
    return (
      <View>
        <Text>{titleCase(place.properties.nombre)}</Text>
        <Button onPress={toggleVisited} title="Mark as visited" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceScreen);
