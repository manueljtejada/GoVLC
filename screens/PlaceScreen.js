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
import { ImagePicker } from 'expo';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ListItem, Icon } from 'react-native-elements';
import * as actionCreators from '../redux/actions/index';

import { titleCase } from '../helpers/utils';
import { getCameraRollPermissions } from '../helpers/permissions';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import ImageList from '../components/ImageList';
import PlaceAddress from '../components/PlaceAddress';
import NotificationModal from '../components/NotificationModal';
import placeholderImage from '../assets/images/placeholder.png';

class PlaceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <TouchableWithoutFeedback onPress={params.toggleVisited}>
          <Icon name="bookmark-border" color="#fff" />
        </TouchableWithoutFeedback>
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

  state = { images: [], modalVisible: false };

  componentDidMount = async () => {
    // Bind the `toggleVisited` method to the navigation params state
    // in order to use it inside the navigationOptions
    const { navigation, toggleVisited } = this.props;
    navigation.setParams({ toggleVisited });

    // Get a list of saved images for this place and save to state
    const images = await this.getSavedImages();

    if (!images) return;

    this.setState({
      images,
    });
  };

  pickImage = async () => {
    const { navigation } = this.props;
    const place = navigation.getParam('place');

    // First get camera roll permissions
    await getCameraRollPermissions();

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      try {
        // First we get the images saved on AsyncStorage and make a copy
        let savedImages = await this.getSavedImages();

        // Create a new image object, grabbing the same ID as the monument, and adding the URI obtained from the Image Library
        const image = {
          id: place.properties.idnotes,
          uri: result.uri,
        };

        // If there are no savedImages, create a new array with this image and save it to AsyncStorage
        if (!savedImages) {
          savedImages = [image];

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
        console.error(e);
      }
    }
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

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { navigation } = this.props;
    const { images, modalVisible } = this.state;
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
            <Text style={Styles.title}>
              {titleCase(place.properties.nombre)}
            </Text>

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

            <PlaceAddress
              address={place.address}
              coordinates={place.coordinates}
            />

            <Text style={Styles.subtitle}>Photos</Text>
            <ImageList images={images} />
            <Button title="Add photo" onPress={this.pickImage} />

            <Text style={Styles.subtitle}>Photos</Text>
            <Button
              title="Set up reminder"
              onPress={() => this.setModalVisible(true)}
            />
            <NotificationModal
              modalVisible={modalVisible}
              setModalVisible={this.setModalVisible}
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
