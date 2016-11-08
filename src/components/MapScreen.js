import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class MapScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.map}
          showsUserLocation
          showsMyLocationButton
          initialRegion={this.state.region}
          region={this.state.region}
        />

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add a comment"
            onPress={() => {}}
          >
            <Icon name="create" color="white" />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }

  state = {
    region: {
      latitude: 48.85663,
      longitude: 2.352241,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords = this.state.region }) => {
        const region = Object.assign(
          {}, coords, { latitudeDelta: 0.01, longitudeDelta: 0.01}
        );
        this.setState({ region });
      },
      (error) => JSON.stringify(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      ({ coords = this.state.region }) => {
        const region = Object.assign(
          {}, coords, { latitudeDelta: 0.01, longitudeDelta: 0.01}
        );
        this.setState({ region });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  watchID: ?number = null;

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  }
});

export default MapScreen;
