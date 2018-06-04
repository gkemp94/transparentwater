import React from 'react';
import { Icon } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { ListView, ItemView, MapView, SettingsView } from './components/';
import { getInitialData } from './utils/api';

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends React.Component {
  state = {
    data: [],
    refreshing: false,
  }

  componentDidMount() {
    getInitialData().then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  _refreshData = () => {
    this.setState({ refreshing: true });
    getInitialData().then((data) => {
      this.setState({
        data: data,
        refreshing: false,
      });
    });
  }

  render() {
    const { data, refreshing } = this.state;
    const screenProps = {
      data,
      refreshing,
      refreshData: this._refreshData
    }
    return (
      <RootNavigation screenProps={screenProps} />
    )
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
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveColor: 'gray',
    }
  }
);

export default App;