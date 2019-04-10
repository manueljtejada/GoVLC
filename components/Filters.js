import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import { Header, Button } from 'react-native-elements';
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
      <ScrollView style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          containerStyle={{ backgroundColor: Colors.tintColor }}
          visible={modalVisible}
        >
          <View>
            <Header backgroundColor={Colors.tintColor}>
              <TouchableHighlight onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableHighlight>
              <Text>Filter</Text>
              <Text>Search</Text>
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

              <Text style={Styles.subtitle}>Category</Text>
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  title={cat.title}
                  onPress={() => filterPlaces('category', cat.value)}
                  style={{ marginBottom: 15 }}
                />
              ))}
              <FilterItem title="Name" handlePress={() => sortPlaces('name')} />
              <FilterItem
                title="Distance"
                handlePress={() => sortPlaces('distance', userLocation)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

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
