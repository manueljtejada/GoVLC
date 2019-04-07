import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Permissions, Location } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/index';

import Filters from '../components/Filters';

import { titleCase } from '../helpers/utils';
import Header from '../constants/Header';

class ListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'GoVLC',
      headerRight: (
        <TouchableWithoutFeedback onPress={() => params.openFilters(true)}>
          <Icon name="filter-list" color="#fff" />
        </TouchableWithoutFeedback>
      ),
      ...Header,
    };
  };

  state = { search: '', modalVisible: false };

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      openFilters: this.setModalVisible,
    });

    // Get user location
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const { setUserLocation } = this.props;

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  getItemKey = (item, index) => index.toString();

  goToPlaceDetail = place => {
    const { navigation } = this.props;

    navigation.navigate('Place', {
      place,
    });
  };

  updateSearch = search => {
    const { searchPlaces } = this.props;

    this.setState({ search });

    searchPlaces(search);
  };

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
    const { search, modalVisible } = this.state;

    if (!places) return;

    return (
      <View>
        <Filters
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
        />
        <SearchBar
          placeholder="Search for monuments..."
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
        />
        <FlatList
          data={places}
          keyExtractor={this.getItemKey}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

ListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  places: PropTypes.arrayOf(PropTypes.object),
  searchPlaces: PropTypes.func,
  setUserLocation: PropTypes.func,
};

const mapStateToProps = state => ({
  places: state.places,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
