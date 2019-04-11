import React from 'react';
import { View, ColorPropType } from 'react-native';
import { MapView } from 'expo';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

import { titleCase } from '../helpers/utils';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

const PlaceAddress = ({ address, coordinates }) => (
  <View style={{ ...Styles.row, marginTop: 0 }}>
    {address && (
      <ListItem
        title={titleCase(address)}
        titleStyle={{ fontSize: 15 }}
        leftIcon={{ name: 'place', color: Colors.tintColor }}
        containerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 10,
          marginBottom: 20,
        }}
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
