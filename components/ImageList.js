import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';
import PropTypes from 'prop-types';

import Styles from '../constants/Styles';

const ImageList = ({ images }) => (
  <View style={Styles.row}>
    {images.map(img => (
      <Image
        key={img.id}
        source={{ uri: img.uri }}
        style={{ width: 75, height: 75 }}
      />
    ))}
  </View>
);

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default ImageList;
