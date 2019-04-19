import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import Colors from '../constants/Colors';

class TabLabel extends React.Component {
  render() {
    const { name, focused } = this.props;
    return (
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          color: focused ? Colors.tabIconSelected : Colors.tabIconDefault,
        }}
      >
        {name}
      </Text>
    );
  }
}

TabLabel.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabLabel;
