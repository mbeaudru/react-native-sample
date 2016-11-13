import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Button, FormLabel, FormInput } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { v1 } from 'node-uuid';
import colors from '../utils/colors';

class MapScreen extends React.Component {

  render() {
    const commentMarker = (
      <Image
        source={require('../assets/markers/comment-map-icon.png')}
        style={{ width: 32, height: 37 }}
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

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.upsertingComment}
          onRequestClose={() => {}}
        >
          <View>
            <Text style={styles.headerTitle}>New comment</Text>
            <FormLabel>Title</FormLabel>
            <FormInput
              value={this.state.commentForm.title}
              onChangeText={
                (value) => this.updateCommentForm('title', value)
              }
            />
            <FormLabel>Description</FormLabel>
            <FormInput
              value={this.state.commentForm.description}
              onChangeText={
                (value) => this.updateCommentForm('description', value)
              }
            />
            <Button
              title="Create comment"
              buttonStyle={styles.submitBtn}
              onPress={() => this.upsertComment()}
            />
          </View>
        </Modal>

      </View>
    );
  }

  static propTypes = {
    addComment: React.PropTypes.func,
    updateComment: React.PropTypes.func,
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

  state = {
    region: {
      latitude: 48.85663,
      longitude: 2.352241,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    upsertingComment: false,
    commentForm: {}
  };

  componentDidMount() {
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

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  watchID: ?number = null;

  upsertComment() {
    const comment = Object.assign(
      {}, { id: v1(), coordinate: this.state.region }, this.state.commentForm);
    console.log(this.state.region);
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

  updateCommentForm(field, value) {
    const commentForm = Object.assign(
      {}, this.state.commentForm, { [`${field}`]: value }
    );

    this.setState({ commentForm });
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
  submitBtn: {
    backgroundColor: colors.primary2,
    marginTop: 15
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  }
});

export default MapScreen;
