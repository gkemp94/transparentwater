import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Map from 'react-native-maps';
import { Location, Permissions } from 'expo';

import { getNoticeType } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

/**
* @class TwMap
* display of data on a map
*/
class MapView extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  state = {
    region: {
      latitude: 0,
      longitude: 0-6.266155,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
    markers: [],
  }

  /**
  * @function componentDidMount
  * function that is called after the component is initialised
  * this calculates the initial list of markers
  */
  componentDidMount() {
    this._findLocalMarkers();
    this._getLocationAsync();
  }

  /**
  * @function onRegionChange
  * this gets called when the user moves the map
  */
  onRegionChange(region) {
    this.setState({ region: region });
    this._findLocalMarkers();
  }
  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      var location = await Location.getCurrentPositionAsync({});
    }
  }

  /**
  * @function _findLocalMarkers
  * calculates the maximum/minimum points for the screen display
  * only adds notices to the list if they are within these boundaries
  * this increases loading speed
  * whenever the setState is called and the markers item is updated,
  * the markers shown on the map are updated automatically
  */
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

    // console.log('No of Markers: ', localNotices.length);
    this.setState({
      markers: localNotices,
    });
  }

  /**
  * @function render
  * renders the map and markers initially
  */
  render() {
    const onPress = (item) => {
      this.props.navigation.navigate('Details', { item });
    };
    return (
      <View style={styles.container}>
        <Map
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={(region) => { this.onRegionChange(region); }}
          showsUserLocation={true} // eslint-disable-line react/jsx-boolean-value
        >
          {this.state.markers.map((notice) => {
            const type = getNoticeType(notice.NOTICETYPE[0]);
            return (
              <Map.Marker
                key={notice.OBJECTID}
                coordinate={{
                  latitude: notice.LAT,
                  longitude: notice.LONG,
                }}
                title={notice.TITLE}
                description={notice.NOTICETYPE[0]}
              >
                <Map.Callout onPress={() => onPress(notice)}>
                  <TouchableHighlight style={{ backgroundColor: 'white' }}>
                    <View>
                      <Text>{notice.TITLE.split(' - ')[0]}</Text>
                      <Text style={type.getStyle()}>{type.getIcon()} {type.name}</Text>
                      <Text note>{new Date(notice.STARTDATE).toLocaleDateString()}</Text>
                    </View>
                  </TouchableHighlight>
                </Map.Callout>
              </Map.Marker>
            );
          })}
        </Map>
      </View>
    );
  }
}

export default MapView;