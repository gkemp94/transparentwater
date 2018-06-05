import React from 'react';
import { Text, View } from 'react-native';

class SettingsView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Settings",
        }
        };
    render() {
      return (
        <View>
            <Text>
            SettingsView
            </Text>
        </View>
      );
    }
  }
  
  export default SettingsView