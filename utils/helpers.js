import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
  },
});

export const alertTypes = {
  WATEROUTAGE: {
    name: 'Water Outage',
    color: 'orange',
    iconName: 'water-off',
    iconType: 'MaterialCommunityIcons',
  },
  TRAFFICDISRUPTIONS: {
    name: 'Traffic Distruptions',
    color: '#BF5700',
    iconName: 'traffic-cone',
    iconType: 'Entypo'
  },
  DONOTDRINK: {
    name: 'Do Not Drink',
    color: 'red',
    iconName: 'circle-slash',
    iconType: 'Octicons'
  },
  BOILWATERNOTICE: {
    name: 'Boil Water Notice',
    color: 'red',
    iconName: 'kettle',
    iconType: 'MaterialCommunityIcons'
  },
}

export function groupBy(xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function getNoticeType(type) {
  if (alertTypes[type]) {
    return {
      name: alertTypes[type].name,
      getIcon: () => (
        <Icon
          name={alertTypes[type].iconName}
          type={alertTypes[type].iconType}
          style={[styles.icon, { color: alertTypes[type].color }]}
        />
      ),
      getStyle: () => ({
        color: alertTypes[type].color,
      }),
    };
  } else {
    return {
      name: type && type.length ? type : 'Unknown Notice Type',
      getIcon: () => (
        <Icon name="alert" style={[styles.icon, { color: 'black' }]} />
      ),
      getStyle: () => ({
        color: 'black',
      }),
    };
  }
}

export function formatDate(date) {
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + (date.getYear() - 100);
}