import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import { Icon } from 'expo';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import Lightbox from 'react-native-lightbox';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 20,
  },
});

const WINDOW_WIDTH = Dimensions.get('window').width;

class ImageList extends Component {
  renderLightboxHeader = (close, image) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={close}>
        <Icon.Ionicons name="ios-close" color="#fff" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.shareImage(image)}>
        <Icon.Ionicons name="ios-more" color="#fff" size={32} />
      </TouchableOpacity>
    </View>
  );

  renderLightboxContent = img => (
    <Image
      style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}
      resizeMode="contain"
      source={{ uri: img.uri }}
    />
  );

  shareImage = image => {
    ActionSheetIOS.showShareActionSheetWithOptions(
      {
        url: image.uri,
      },
      err => {
        console.log(err);
        alert('An error has occured');
      },
      (success, method) => {
        console.log(success);
      }
    );
  };

  render() {
    const { images } = this.props;
    return (
      <View style={styles.row}>
        {images.map(img => (
          <Lightbox
            key={img.id}
            renderHeader={close => this.renderLightboxHeader(close, img)}
            renderContent={() => this.renderLightboxContent(img)}
          >
            <Image
              source={{ uri: img.uri }}
              style={{ width: 75, height: 75, marginRight: 10 }}
            />
          </Lightbox>
        ))}
      </View>
    );
  }
}

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default ImageList;
