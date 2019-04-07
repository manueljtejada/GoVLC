import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

import { titleCase } from '../helpers/utils';
import Styles from '../constants/Styles';

const PlaceAddress = ({ address, coordinates }) => (
  <View style={Styles.row}>
    {address && (
      <ListItem
        title={titleCase(address)}
        leftIcon={{ name: 'place' }}
        bottomDivider
      />
    )}
    <MapView
      provider="google"
      scrollEnabled={false}
      rotateEnabled={false}
      zoomEnabled={false}
      zoomTapEnabled={false}
      initialRegion={{
        ...coordinates,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      }}
      style={{ height: 100 }}
    >
      <MapView.Marker coordinate={coordinates} />
    </MapView>
  </View>
);

PlaceAddress.propTypes = {
  address: PropTypes.string,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

export default PlaceAddress;
