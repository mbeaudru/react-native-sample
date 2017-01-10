import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { fetchCurrentUser } from '../actions/users';

class UsersSeen extends React.Component {

  render() {
    if (!this.props.usersSeen) {
      return (
        <ActivityIndicator size={100} style={styles.spinner} />
      );
    }
    return (
      <ScrollView style={styles.container}>
        <List>
          {
            this.props.usersSeen
              .map(({ id, firstName, lastName, avatar, description }, key) =>
                <ListItem
                  key={key}
                  roundAvatar
                  avatar={avatar}
                  title={`${firstName} ${lastName}`}
                  subtitle={description}
                  onPress={() => this.onUserPress(id)}
                />
              )
          }
        </List>
      </ScrollView>
    );
  }

  static propTypes = {
    usersSeen: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        firstName: React.PropTypes.string,
        lastName: React.PropTypes.string,
        avatar: React.PropTypes.string
      })
    ),
    fetchCurrentUser: React.PropTypes.func
  }

  componentWillMount() {
    this.props.fetchCurrentUser();
  }

  onUserPress(userId) {
    Actions.userProfile({ userId });
  }

}

const styles = {
  container: {
    marginTop: -22
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default connect(
  ({ users }) => {
    const currentUserId = _.get(users, 'currentUser.id', null);
    const usersSeen = _.get(users, ['hashMap', currentUserId, 'seen'], null);

    return { usersSeen };
  },
  { fetchCurrentUser }
)(UsersSeen);
