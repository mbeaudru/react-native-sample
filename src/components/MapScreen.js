import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import colors from '../utils/colors';
import AddCommentModal from '../containers/AddCommentModal';
import _ from 'lodash';

class MapScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.map}
          showsUserLocation
          zoomEnabled={false}
          mapType="terrain"
          showsMyLocationButton
          initialRegion={this.state.region}
          region={this.state.region}
        >
          {this.props.comments.map((comment, key) =>
            <MapView.Marker
              key={key}
              pinColor={colors.primary1}
              coordinate={comment.coordinate}
              title={_.get(comment, 'user.firstName', null)}
              description={_.truncate(comment.description)}
              onCalloutPress={() => this.props.onCommentPress(comment)}
            >
              <View>
                <Icon name="chat" size={26} color={colors.primary2} />
              </View>
            </MapView.Marker>
          )}
        </MapView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add a comment"
            onPress={this.props.onAddCommentPress}
          >
            <Icon name="create" color="white" />
          </ActionButton.Item>
        </ActionButton>

        <AddCommentModal
          addComment={this.addComment}
          coordinate={this.state.region}
          visible={this.state.upsertingComment}
        />

      </View>
    );
  }

  static propTypes = {
    comments: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        coordinate: React.PropTypes.object,
        title: React.PropTypes.string,
        user: React.PropTypes.shape({
          firstName: React.PropTypes.string
        })
      })
    ),
    onAddCommentPress: React.PropTypes.func,
    onCommentPress: React.PropTypes.func
  }

  static defaultProps = {
    comments: [],
    onCommentPress: () => ({})
  }

  constructor(props) {
    super(props);

    this.updateRegion = this.updateRegion.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.clearWatchPosition = this.clearWatchPosition.bind(this);
  }

  state = {
    region: {
      latitude: 48.884,
      longitude: 2.353,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    },
    upsertingComment: false
  };

  componentDidMount() {
    this.watchPosition();
  }

  componentWillUnmount() {
    this.clearWatchPosition();
  }

  updateRegion({ coords = this.state.region }) {
    const { latitude, longitude } = coords;
    const region = Object.assign(
      {},
      { latitude, longitude },
      { latitudeDelta: 0.005, longitudeDelta: 0.005}
    );
    this.setState({ region });
  }

  watchID: ?number = null;

  watchPosition() {
    navigator.geolocation.getCurrentPosition(
      ({ coords = this.state.region }) => {
        const { latitude, longitude } = coords;
        const region = Object.assign(
          {},
          { latitude, longitude },
          { latitudeDelta: 0.01, longitudeDelta: 0.01}
        );
        this.setState({ region });
      },
      (error) => JSON.stringify(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation
      .watchPosition(position => this.updateRegion(position));
  }

  clearWatchPosition() {
    navigator.geolocation.clearWatch(this.watchID);
  }

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
