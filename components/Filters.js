import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as actionCreators from '../redux/actions/index';
import FilterItem from './FilterItem';

import { categories } from '../helpers/filters';

class Filters extends Component {
  render() {
    const {
      setModalVisible,
      modalVisible,
      userLocation,
      sortPlaces,
      filterPlaces,
      activeFilter,
      activeSort,
    } = this.props;

    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          containerStyle={{ backgroundColor: Colors.tintColor }}
          visible={modalVisible}
          onRequestClose={() => console.log('Filters modal closed')}
        >
          <ScrollView>
            <Header backgroundColor={Colors.tintColor}>
              <TouchableHighlight onPress={() => setModalVisible(false)}>
                <Text style={Styles.white}>Cancel</Text>
              </TouchableHighlight>
              <Text style={Styles.headerTitle}>Filter</Text>
              <TouchableHighlight onPress={() => setModalVisible(false)}>
                <Text style={Styles.white}>Search</Text>
              </TouchableHighlight>
            </Header>

            <View style={Styles.container}>
              <Text style={Styles.subtitle}>Sort by</Text>
              <FilterItem
                title="Name"
                handlePress={() => sortPlaces('name')}
                active={activeSort === 'name'}
              />
              <FilterItem
                title="Distance"
                handlePress={() => sortPlaces('distance', userLocation)}
                active={activeSort === 'distance'}
              />

              <Text style={{ ...Styles.subtitle, marginTop: 30 }}>
                Category
              </Text>
              {categories.map(cat => (
                <FilterItem
                  key={cat.title}
                  title={cat.title}
                  active={activeFilter === cat.value}
                  handlePress={() => filterPlaces('category', cat.value)}
                />
              ))}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

Filters.propTypes = {
  setModalVisible: PropTypes.func,
  modalVisible: PropTypes.bool,
  userLocation: PropTypes.object,
  sortPlaces: PropTypes.func,
  filterPlaces: PropTypes.func,
  activeFilter: PropTypes.string,
  activeSort: PropTypes.string,
};

const mapStateToProps = state => ({
  places: state.places,
  userLocation: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
