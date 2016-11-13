import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { v1 } from 'node-uuid';
import colors from '../utils/colors';
import AddCommentModal from './AddCommentModal';

class MapScreen extends React.Component {

  render() {
    const commentMarker = (
      <Image
        source={require('../assets/markers/comment-map-icon.png')}
        style={styles.commentMarker}
      />
    );
    return (
      <View style={styles.container}>

        <MapView
          style={styles.map}
          showsUserLocation
          showsMyLocationButton
          initialRegion={this.state.region}
          region={this.state.region}
        >
          {this.props.comments.map((comment, key) =>
            <MapView.Marker
              key={key}
              pinColor={colors.primary1}
              coordinate={comment.coordinate}
              title={comment.title}
              description={comment.description}
            >
              <View>
                {commentMarker}
              </View>
            </MapView.Marker>
          )}
        </MapView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add a comment"
            onPress={() =>  this.setState({ upsertingComment: true })}
          >
            <Icon name="create" color="white" />
          </ActionButton.Item>
        </ActionButton>

        <AddCommentModal
          addComment={this.addComment}
          visible={this.state.upsertingComment}
        />

      </View>
    );
  }

  static propTypes = {
    addComment: React.PropTypes.func,
    comments: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        coordinate: React.PropTypes.object,
        title: React.PropTypes.string
      })
    )
  }

  static defaultProps = {
    comments: []
  }

  constructor(props) {
    super(props);

    this.addComment = this.addComment.bind(this);
    this.updateRegion = this.updateRegion.bind(this);
    this.watchPosition = this.watchPosition.bind(this);
    this.clearWatchPosition = this.clearWatchPosition.bind(this);
  }

  state = {
    region: {
      latitude: 48.85663,
      longitude: 2.352241,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    upsertingComment: false
  };

  componentDidMount() {
    this.watchPosition();
  }

  componentWillUnmount() {
    this.clearWatchPosition();
  }

  addComment(commentForm) {
    const comment = Object.assign(
      {},
      { id: v1(), coordinate: this.state.region },
      commentForm
    );

    this.props.addComment(comment);
    this.setState({ upsertingComment: false });
  }

  updateRegion({ coords = this.state.region }) {
    const { latitude, longitude } = coords;
    const region = Object.assign(
      {},
      { latitude, longitude },
      { latitudeDelta: 0.01, longitudeDelta: 0.01}
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
  },
  commentMarker: {
    width: 32,
    height: 37
  }
});

export default MapScreen;
