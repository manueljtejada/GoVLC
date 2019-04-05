import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/index';

import { titleCase } from '../helpers/utils';

import Header from '../components/Header';

class ListScreen extends Component {
  static navigationOptions = {
    header: props => <Header {...props} />,
  };

  goToPlaceDetail = place => {
    const { navigation } = this.props;

    navigation.navigate('Place', {
      place,
    });
  };

  getItemKey = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={titleCase(item.properties.nombre)}
      subtitle={titleCase(item.address)}
      onPress={() => this.goToPlaceDetail(item)}
      bottomDivider
      chevron
    />
  );

  render() {
    const { places } = this.props;

    if (!places) return;

    return (
      <View>
        <FlatList
          data={places}
          keyExtractor={this.getItemKey}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
