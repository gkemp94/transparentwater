import React from 'react';
import { Icon } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import ListView from './components/ListView';
import ItemView from './components/ItemView';
import MapView from './components/MapView';
import SettingsView from './components/SettingsView';

class App extends React.Component {
  render() {
    return (
      <RootNavigation />
    );
  }
}

const ListStack = createStackNavigator({
  List: { screen: ListView },
  Item: { screen: ItemView },
});

const MapStack = createStackNavigator({
  List: { screen: MapView },
  Item: { screen: ItemView }
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsView }
})

const RootNavigation = createBottomTabNavigator(
  {
    ListView: {
      screen: ListStack,
    },
    MapView: {
      screen: MapStack,
    },
    SettingsView: {
      screen: SettingsStack,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch(routeName) {
          case 'ListView':
            iconName = 'alert';
            break;
          case 'MapView':
            iconName = 'map';
            break;
          case 'SettingsView':
            iconName = 'settings';
            break;
          default:
            iconName = 'questions';
            break;
        }
        return <Icon name={iconName} size={25} style={{ color: tintColor }} />;
      }
    }),
    tabBarIconOptions: {
      activeTintColor: 'tomato',
      inactiveColor: 'gray',
    }
  }
);

export default App;