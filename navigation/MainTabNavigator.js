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

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabLabel focused={focused} name="Settings" />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  GuideStack,
  MapStack,
  SettingsStack,
});
