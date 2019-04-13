import React, { Component } from 'react';
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

export default FilterItem;
