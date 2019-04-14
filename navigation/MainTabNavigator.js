import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TabLabel from '../components/TabLabel';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';
import PlaceScreen from '../screens/PlaceScreen';
import VisitedScreen from '../screens/VisitedScreen';

const GuideStack = createStackNavigator({
  List: ListScreen,
  Place: PlaceScreen,
});

GuideStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabLabel focused={focused} name="Guide" />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-search` : 'md-search'}
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
  Place: PlaceScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabLabel focused={focused} name="Map" />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-map` : 'md-map'}
    />
  ),
};

const VisitedStack = createStackNavigator({
  Visited: VisitedScreen,
  Place: PlaceScreen,
});

VisitedStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabLabel focused={focused} name="Visited" />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  GuideStack,
  MapStack,
  VisitedStack,
});
