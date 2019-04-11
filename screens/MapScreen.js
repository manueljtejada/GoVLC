import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/index';

import Header from '../constants/Header';
import { titleCase } from '../helpers/utils';
import Styles from '../constants/Styles';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    ...Header,
  };

  state = {
    region: {
      latitude: 39.4744869,
      longitude: -0.3823819,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0621,
    },
  };

  goToPlaceDetail = place => {
    const { navigation } = this.props;

    navigation.navigate('Place', {
      place,
    });
  };

  render() {
    const { places } = this.props;
    const { region } = this.state;

    if (!places) return;

    return (
      <MapView
        style={{ flex: 1 }}
        provider="google"
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
      >
        {places.map((marker, index) => (
          <MapView.Marker key={index} coordinate={marker.coordinates}>
            <MapView.Callout onPress={() => this.goToPlaceDetail(marker)}>
              <Text style={Styles.mapItemTitle}>
                {titleCase(marker.properties.nombre)}
              </Text>
              <Text style={Styles.mapItemAddress}>
                {titleCase(marker.address)}
              </Text>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  places: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  places: state.places,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
