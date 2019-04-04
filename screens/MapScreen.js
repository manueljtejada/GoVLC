import React, { Component } from 'react';
import { Text } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { titleCase } from '../helpers/utils';

class MapScreen extends Component {
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
              <Text>{titleCase(marker.properties.nombre)}</Text>
              <Text>{titleCase(marker.address)}</Text>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places,
});

export default connect(mapStateToProps)(MapScreen);
