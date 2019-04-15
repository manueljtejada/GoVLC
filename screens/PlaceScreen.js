import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Linking,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import { ImagePicker, Icon } from 'expo';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ListItem } from 'react-native-elements';
import * as actionCreators from '../redux/actions/index';

import { titleCase } from '../helpers/utils';
import { getCameraRollPermissions } from '../helpers/permissions';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import ImageList from '../components/ImageList';
import PlaceAddress from '../components/PlaceAddress';
import NotificationModal from '../components/NotificationModal';
import placeholderImage from '../assets/images/placeholder.png';
import CheckInButton from '../components/CheckInButton';
import CameraModal from '../components/CameraModal';

class PlaceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => params.setReminderModalVisible(true)}
          >
            <Icon.Ionicons
              name="ios-notifications-outline"
              color="#fff"
              size={32}
            />
          </TouchableWithoutFeedback>
        </View>
      ),
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
  };

  state = {
    images: [],
    reminderModalVisible: false,
    cameraOpen: false,
    visited: null,
  };

  componentDidMount = async () => {
    await this.getCheckInStatus();

    // Bind the `toggleVisited` method to the navigation params state
    // in order to use it inside the navigationOptions
    const { navigation, toggleVisited } = this.props;
    const { visited } = this.state;
    const { setReminderModalVisible, toggleCheckIn } = this;
    navigation.setParams({
      toggleVisited,
      setReminderModalVisible,
      toggleCheckIn,
      visited,
    });

    // Get a list of saved images for this place and save to state
    const images = await this.getSavedImages();

    if (!images) return;

    this.setState({
      images,
    });
  };

  getCheckInStatus = async () => {
    const { navigation } = this.props;
    const place = navigation.getParam('place');

    const visitedPlaces = await this.getVisitedPlaces();

    // If there are no liked experiences yet, exit
    if (!visitedPlaces) return;

    // Get list of saved IDs
    const visitedPlacesIds = visitedPlaces.map(p => p.properties.idnotes);

    // Check if experience is in list and set state accordingly
    this.setState({
      visited: visitedPlacesIds.includes(place.properties.idnotes),
    });
  };

  toggleCheckIn = async () => {
    const { navigation } = this.props;
    const { visited } = this.state;
    const place = navigation.getParam('place');
    const today = new Date();

    try {
      let visitedPlaces = await this.getVisitedPlaces();

      const placeToSave = {
        ...place,
        date: today,
      };

      if (!visitedPlaces) {
        visitedPlaces = [placeToSave];

        await AsyncStorage.setItem(
          '@visitedPlaces',
          JSON.stringify(visitedPlaces)
        );

        return;
      }

      // Get IDs of liked experiences
      const visitedPlacesIds = visitedPlaces.map(p => p.properties.idnotes);

      // If this experience is already in AsyncStorage,
      // we remove it, otherwise we push it to the array
      if (visitedPlacesIds.includes(place.properties.idnotes)) {
        visitedPlaces = visitedPlaces.filter(
          p => p.properties.idnotes !== place.properties.idnotes
        );
      } else {
        visitedPlaces.push(placeToSave);
      }

      await AsyncStorage.setItem(
        '@visitedPlaces',
        JSON.stringify(visitedPlaces)
      );

      this.setState({
        visited: !visited,
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  saveImage = async image => {
    const { navigation } = this.props;
    const place = navigation.getParam('place');

    try {
      // First we get the images saved on AsyncStorage and make a copy
      let savedImages = await this.getSavedImages();

      // Use the image name as its unique ID
      const { uri } = image;
      const id = uri.split('/').pop();

      // Create a new image object, grabbing the same ID as the monument, and adding the URI obtained from the Image Library
      const imageToSave = { id, uri };

      // If there are no savedImages, create a new array with this image and save it to AsyncStorage
      if (!savedImages) {
        savedImages = [imageToSave];

        await AsyncStorage.setItem(
          place.properties.idnotes,
          JSON.stringify(savedImages)
        );

        return;
      }

      // If there are savedImages, add this new image to that array
      savedImages.push(image);

      // Replace the object on AsyncStorage with the local copy
      await AsyncStorage.setItem(
        place.properties.idnotes,
        JSON.stringify(savedImages)
      );

      // Finally, update state
      this.setState({
        images: savedImages,
      });
    } catch (e) {
      console.log(e);
      alert('An error has occured');
    }
  };

  openCamera = visible => {
    this.setState({ cameraOpen: visible });
  };

  getSavedImages = async () => {
    const { navigation } = this.props;
    const place = navigation.getParam('place');

    try {
      const images = await AsyncStorage.getItem(place.properties.idnotes);

      if (!images) return;

      return JSON.parse(images);
    } catch (e) {
      console.error(e);
    }
  };

  getVisitedPlaces = async () => {
    try {
      const visitedPlaces = await AsyncStorage.getItem('@visitedPlaces');

      if (!visitedPlaces) return [];

      return JSON.parse(visitedPlaces);
    } catch (e) {
      console.error(e);
    }
  };

  setReminderModalVisible = visible => {
    this.setState({ reminderModalVisible: visible });
  };

  render() {
    const { navigation } = this.props;
    const { visited, images, reminderModalVisible, cameraOpen } = this.state;
    const place = navigation.getParam('place');

    return (
      <View style={Styles.fill}>
        <HeaderImageScrollView
          maxHeight={225}
          minHeight={Platform.OS === 'ios' ? 60 : 73}
          minOverlayOpacity={0}
          maxOverlayOpacity={0.9}
          overlayColor={Colors.tintColor}
          headerImage={
            images.length ? { uri: images[0].uri } : placeholderImage
          }
        >
          <TriggeringView style={Styles.container}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ ...Styles.title, marginRight: 10 }}>
                {titleCase(place.properties.nombre)}
              </Text>

              <CheckInButton
                handlePress={this.toggleCheckIn}
                visited={visited}
              />
            </View>

            {place.properties.telefono !== '0' && (
              <ListItem
                bottomDivider
                chevron
                title={place.properties.telefono}
                leftIcon={{ name: 'phone', color: Colors.tintColor }}
                titleStyle={{ color: Colors.tintColor, fontSize: 15 }}
                containerStyle={{
                  paddingHorizontal: 0,
                  paddingVertical: 10,
                  marginBottom: 0,
                }}
                onPress={() =>
                  Linking.openURL(`tel:+34${place.properties.telefono}`)
                }
              />
            )}

            <PlaceAddress
              address={place.address}
              coordinates={place.coordinates}
            />

            <Text style={Styles.subtitle}>Photos</Text>
            <ImageList images={images} />
            <Button
              title="Add photo"
              onPress={() => this.openCamera(true)}
              buttonStyle={Styles.buttons.primary}
            />
            <CameraModal
              modalVisible={cameraOpen}
              openCamera={this.openCamera}
              saveImage={this.saveImage}
            />
            <NotificationModal
              modalVisible={reminderModalVisible}
              setModalVisible={this.setReminderModalVisible}
              place={place}
            />
          </TriggeringView>
        </HeaderImageScrollView>
      </View>
    );
  }
}

PlaceScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  toggleVisited: PropTypes.func,
};

const mapStateToProps = state => ({
  places: state.places,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceScreen);
