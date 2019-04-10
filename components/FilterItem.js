import React, { Component } from 'react';
import { ListItem, CheckBox } from 'react-native-elements';

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
            checked={active}
            onPress={handlePress}
          />
        }
      />
    );
  }
}

export default FilterItem;
