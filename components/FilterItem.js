import React, { Component } from 'react';
import { ListItem, CheckBox } from 'react-native-elements';

class FilterItem extends Component {
  state = {
    checked: false,
  };

  handlePress = () => {
    const { handlePress } = this.props;
    const { checked } = this.state;

    this.setState(
      {
        checked: !checked,
      },
      handlePress
    );
  };

  render() {
    const { title } = this.props;
    const { checked } = this.state;

    return (
      <ListItem
        title={title}
        bottomDivider
        rightElement={
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked}
            onPress={this.handlePress}
          />
        }
      />
    );
  }
}

export default FilterItem;
