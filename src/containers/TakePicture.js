import React from 'react';
import Camera from 'react-native-camera';
import { View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { updateUser } from '../actions/users';
import _ from 'lodash';

class TakePicture extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          type="front"
          orientation="portrait"
        >
          <Text
            style={styles.capture}
            onPress={this.takePicture}
          >
              [Take a picture]
          </Text>
        </Camera>
      </View>
    );
  }

  static propTypes = {
    updateUser: React.PropTypes.func,
    user: React.PropTypes.shape({
      avatar: React.PropTypes.string
    })
  }

  constructor(props) {
    super(props);

    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
      .then(({ path: avatar }) => {
        const user = _.merge({}, this.props.user, { avatar });
        this.props.updateUser(user);
        Actions.pop();
      })
      .catch(err => console.error(err));
  }

}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export default connect(
  ({ users }) => {
    const user = _.get(users, 'currentUser', {});

    return { user };
  },
  { updateUser }
)(TakePicture);
