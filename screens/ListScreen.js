import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import * as data from '../data/db.json';

const mapStateToProps = state => {
  return {
    places: state.places
  }
}

class ListScreen extends Component {
  state = {
    data: []
  }

  componentDidMount = () => {
    console.log(this.props);
    this.setState({
      data: data.features
    });
  }

  getItemKey = (item, index) => index;

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.properties.nombre}
      />
    )
  }

  render() {
    const { data } = this.state;

    if (!data) return;

    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={this.getItemKey}
          renderItem={this.renderItem} />
      </View>
    )
  }
};

export default connect(mapStateToProps)(ListScreen);