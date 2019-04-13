import React, { Component } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Permissions, Location, Icon } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/index';

import Filters from '../components/Filters';

import { titleCase, distance } from '../helpers/utils';
import Header from '../constants/Header';
import Colors from '../constants/Colors';

class ListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'GoVLC',
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <TouchableWithoutFeedback onPress={() => params.openFilters(true)}>
            <Icon.Ionicons name="ios-options" size={21} color="#fff" />
          </TouchableWithoutFeedback>
        </View>
      ),
      ...Header,
    };
  };

  state = {
    search: '',
    modalVisible: false,
    filteredPlaces: null,
    activeFilter: null,
    activeSort: null,
  };

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
    const { places } = this.props;

    const filteredPlaces = places.filter(place =>
      place.properties.nombre.toLowerCase().includes(search.toLowerCase())
    );

    this.setState({ search, filteredPlaces });
  };

  filterPlaces = (filter, value) => {
    const { places } = this.props;

    const activeFilter = filter;

    const filteredPlaces = places.filter(
      place => place[filter].toLowerCase() === value
    );

    this.setState({ activeFilter, filteredPlaces });
  };

  sortPlaces = (field, userLocation) => {
    let filteredPlaces;
    const { places } = this.props;
    const activeSort = field;

    if (field === 'distance' && userLocation) {
      filteredPlaces = [...places].sort(
        (a, b) =>
          distance(
            a.coordinates.latitude,
            a.coordinates.longitude,
            userLocation.user.coords.latitude,
            userLocation.user.coords.longitude
          ) >
          distance(
            b.coordinates.latitude,
            b.coordinates.longitude,
            userLocation.user.coords.latitude,
            userLocation.user.coords.longitude
          )
      );
    }

    if (field === 'name') {
      filteredPlaces = [...places].sort(
        (a, b) => a.properties.nombre > b.properties.nombre
      );
    }

    this.setState({ filteredPlaces, activeSort });
  };

  renderItem = ({ item }) => (
    <ListItem
      title={titleCase(item.properties.nombre)}
      subtitle={titleCase(item.address)}
      subtitleStyle={{ color: Colors.grayLight }}
      onPress={() => this.goToPlaceDetail(item)}
      bottomDivider
      chevron
    />
  );

  render() {
    const { places } = this.props;
    const {
      search,
      modalVisible,
      filteredPlaces,
      activeFilter,
      activeSort,
    } = this.state;

    if (!places) return;

    return (
      <View>
        <Filters
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
          filterPlaces={this.filterPlaces}
          sortPlaces={this.sortPlaces}
          activeFilter={activeFilter}
          activeSort={activeSort}
        />
        <SearchBar
          placeholder="Search for monuments..."
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
        />
        <FlatList
          data={filteredPlaces || places}
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
  // filteredPlaces: state.places.filter(item => {
  //   if (!item.properties) return;
  //   return item.properties.nombre.includes(state.searchText);
  // }),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
