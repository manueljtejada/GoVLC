import React, { Component } from 'react';
import { View, Text, Platform, Linking } from 'react-native';
import { MapView } from 'expo';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ListItem } from 'react-native-elements';
import * as actionCreators from '../redux/actions/index';

import { titleCase } from '../helpers/utils';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

class PlaceScreen extends Component {
  static navigationOptions = {
    headerTransparent: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
    },
    headerBackTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff',
  };

  state = {};

  render() {
    const { navigation, toggleVisited } = this.props;
    const place = navigation.getParam('place');
    console.log(place);
    return (
      <View style={Styles.fill}>
        <HeaderImageScrollView
          maxHeight={225}
          minHeight={Platform.OS === 'ios' ? 60 : 73}
          minOverlayOpacity={0}
          maxOverlayOpacity={0.9}
          overlayColor={Colors.tintColor}
          headerImage={require('../assets/images/placeholder.png')}
        >
          <TriggeringView style={Styles.container}>
            <Text style={Styles.title}>
              {titleCase(place.properties.nombre)}
            </Text>
            {/* <Button onPress={toggleVisited} title="Mark as visited" /> */}
            {place.properties.telefono !== '0' && (
              <ListItem
                title={place.properties.telefono}
                leftIcon={{ name: 'phone' }}
                onPress={() =>
                  Linking.openURL(`tel:+34${place.properties.telefono}`)
                }
                bottomDivider
              />
            )}
            {place.address && (
              <React.Fragment>
                <ListItem
                  title={place.address}
                  leftIcon={{ name: 'place' }}
                  bottomDivider
                />
                {/* <ListItem
                  title="Get Directions"
                  leftIcon={{ name: 'directions' }}
                  bottomDivider
                /> */}
              </React.Fragment>
            )}
            <MapView
              provider="google"
              scrollEnabled={false}
              rotateEnabled={false}
              zoomEnabled={false}
              zoomTapEnabled={false}
              initialRegion={{
                ...place.coordinates,
                latitudeDelta: 0.01,
                longitudeDelta: 0.02,
              }}
              style={{ height: 100 }}
            >
              <MapView.Marker coordinate={place.coordinates} />
            </MapView>
          </TriggeringView>
        </HeaderImageScrollView>
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
