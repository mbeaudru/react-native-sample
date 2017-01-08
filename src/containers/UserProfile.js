import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

class UserProfile extends React.Component {

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }

  componentWillMount() {
    // FETCH USER BY ID ACTION
  }

}

export default connect(
  ({ users }, ownProps) => {
    const user = _.get(users, [ownProps.userId], {});
    return { user };
  },
  () => ({}),
)(UserProfile);
