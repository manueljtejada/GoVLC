import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, CheckBox } from 'react-native-elements';
import Colors from '../constants/Colors';

class FilterItem extends Component {
  render() {
    const { title, active, handlePress } = this.props;

    return (
      <ListItem
        title={title}
        bottomDivider
        rightElement={
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor={Colors.secondaryColor}
            checked={active}
            onPress={handlePress}
          />
        }
        containerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          marginBottom: 0,
        }}
      />
    );
  }
}

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  handlePress: PropTypes.func.isRequired,
};

export default FilterItem;
