import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { titleCase } from '../helpers/utils';
import Header from '../constants/Header';
import * as actionCreators from '../redux/actions/index';
import Colors from '../constants/Colors';

class VisitedScreen extends Component {
  static navigationOptions = () => ({
    title: 'Visited',
    ...Header,
  });

  state = {
    visitedPlaces: [],
  };

  async componentDidMount() {
    let visitedPlaces = await this.getVisitedPlaces();
    const { navigation } = this.props;

    this.setState({ visitedPlaces });

    // Refresh the list when the user navigates to a different screen
    this.willFocus = navigation.addListener('willFocus', async () => {
      visitedPlaces = await this.getVisitedPlaces();
      this.setState({ visitedPlaces });
    });
  }

  goToPlaceDetail = place => {
    const { navigation } = this.props;

    navigation.navigate('Place', {
      place,
    });
  };

  getItemKey = (item, index) => index.toString();

  getVisitedPlaces = async () => {
    try {
      const visitedPlaces = await AsyncStorage.getItem('@visitedPlaces');

      if (!visitedPlaces) return [];

      return JSON.parse(visitedPlaces);
    } catch (e) {
      console.error(e);
    }
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
    const { visitedPlaces } = this.state;

    if (!visitedPlaces.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.content}>
            You haven't visited any places yet.
          </Text>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={visitedPlaces}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitedScreen);
