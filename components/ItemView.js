import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { getNoticeType } from '../utils/helpers';

const styles = StyleSheet.create({
  title: {
    paddingTop: 5,
  }
})

class ItemView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', {});
    if (item) {
      return {
        title: item.TITLE.split(' - ')[0],
      };
    }
    return {};
  };

  render() {
    const { navigation } = this.props;
   const alertItem = navigation.getParam('item', {});
   const type = getNoticeType(alertItem.NOTICETYPE[0]);
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Text note style={styles.title}>Location</Text>
        <Text>{alertItem.LOCATION}, {alertItem.COUNTY}</Text>
        <Text note style={styles.title}>Type</Text>
        <Text style={type.getStyle()}>{type.getIcon()} {type.name}</Text>
        <Text note style={styles.title}>Description</Text>
        <Text>{alertItem.DESCRIPTION.replace(/<\/?[^>]+(>|$)/g, '')} </Text>
        <Text note style={styles.title}>Date</Text>
        <Text>{new Date(alertItem.STARTDATE).toLocaleDateString()}</Text>
        { alertItem.AFFECTEDPREMISES && (
          <View>
            <Text note style={styles.title}>Affected Premises</Text>
            <Text> {alertItem.AFFECTEDPREMISES} </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}
  
export default ItemView