import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import Lightbox from 'react-native-lightbox';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
});

class ImageList extends Component {
  render() {
    const { images } = this.props;
    console.log('Images: ', images);
    return (
      <View style={styles.row}>
        {images.map(img => (
          <Lightbox key={img.id}>
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
