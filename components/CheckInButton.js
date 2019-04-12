import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';

const styles = StyleSheet.create({
  default: {
    color: '#ccc',
  },

  visited: {
    color: '#EF605D',
  },
});

class CheckInButton extends Component {
  state = {
    visited: false,
  };

  render() {
    const { visited } = this.state;
    const { handlePress } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.setState({ visited: !visited }, handlePress)}
      >
        <Icon.Ionicons
          name={visited ? 'ios-star' : 'ios-star-outline'}
          size={30}
          style={visited ? styles.visited : styles.default}
        />
      </TouchableOpacity>
    );
  }
}

export default CheckInButton;
