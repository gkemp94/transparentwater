import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import MapView from 'react-native-maps';
import { getNoticeType, alertTypes } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

class MapScreen extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  state = {
    region: {
      latitude: 53.350140,
      longitude: -6.266155,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
    markers: [],
  }

  componentDidMount() {
    this._findLocalMarkers();
    this._getLocationAsync();
  }

  onRegionChange(region) {
    this.setState({ region: region });
    this._findLocalMarkers();
  }

  _findLocalMarkers() {
    const regionInfo = this.state.region;
    const allNotices = this.props.screenProps.data;
    const localNotices = [];
    const latDelta = regionInfo.latitudeDelta;
    const lngDelta = regionInfo.longitudeDelta;
    const maxLatitude = regionInfo.latitude + latDelta;
    const minLatitude = regionInfo.latitude - latDelta;
    const maxLongitude = regionInfo.longitude + lngDelta;
    const minLongitude = regionInfo.longitude - lngDelta;

    allNotices.forEach((notice) => {
      const lat = notice.LAT;
      const lng = notice.LONG;

      if (lat > minLatitude &&
        lat < maxLatitude &&
        lng > minLongitude &&
        lng < maxLongitude) {
        localNotices.push(notice);
      }
    });

    this.setState({
      markers: localNotices,
    });
  }

  render() {
    const onPress = (item) => {
      this.props.navigation.navigate('Item', { item });
    };
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={(region) => { this.onRegionChange(region); }}
          showsUserLocation={true} // eslint-disable-line react/jsx-boolean-value
        >
          {this.state.markers.map((notice) => {
            const type = getNoticeType(notice.NOTICETYPE[0]);
            const color = alertTypes[notice.NOTICETYPE[0]] ? alertTypes[notice.NOTICETYPE[0]].color : '#808080';
            return (
              <MapView.Marker
                pinColor={color}
                key={notice.OBJECTID}
                coordinate={{
                  latitude: notice.LAT,
                  longitude: notice.LONG,
                }}
                title={notice.TITLE}
                description={notice.NOTICETYPE[0]}
              >
                <MapView.Callout onPress={() => onPress(notice)}>
                  <TouchableHighlight style={{ backgroundColor: 'white' }}>
                    <View>
                      <Text>{notice.TITLE.split(' - ')[0]}</Text>
                      <Text style={type.getStyle()}>{type.getIcon()} {type.name}</Text>
                      <Text note>{new Date(notice.STARTDATE).toLocaleDateString()}</Text>
                    </View>
                  </TouchableHighlight>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

export default MapScreen;