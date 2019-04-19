import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

class TabBarIcon extends React.Component {
  render() {
    const { name, focused } = this.props;

    return (
      <Icon.Ionicons
        name={name}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

TabBarIcon.propTypes = {
  name: PropTypes.string,
  focused: PropTypes.bool,
};

export default TabBarIcon;
