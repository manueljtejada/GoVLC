import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';
import Lightbox from 'react-native-lightbox';

import Styles from '../constants/Styles';

class ImageList extends Component {
  render() {
    const { images } = this.props;
    return (
      <View style={Styles.row}>
        {images.map(img => (
          <Lightbox key={img.id}>
            <Image
              source={{ uri: img.uri }}
              style={{ width: 75, height: 75 }}
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
