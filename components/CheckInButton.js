import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  default: {
    color: '#ccc',
  },

  visited: {
    color: Colors.secondaryColor,
  },
});

class CheckInButton extends Component {
  render() {
    const { visited, handlePress } = this.props;

    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon.Ionicons
          name={
            visited ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'
          }
          size={30}
          style={visited ? styles.visited : styles.default}
        />
      </TouchableOpacity>
    );
  }
}

export default CheckInButton;
