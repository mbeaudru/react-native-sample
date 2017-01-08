import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import faker from 'faker';

class UsersSeen extends React.Component {

  render() {
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
    )
  }

  onUserPress(userId) {
    Actions.userProfile({ userId });
  }

}

const styles = {
  container: {
    marginTop: -22
  }
};

export default connect(
  ({ users }) => {
    const currentUser = '';
    const fakeUsersSeen = [...Array(10)].map(() => (
      {
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        description: faker.lorem.words()
      }
    ));
    const usersSeen = _.get(users, [currentUser, 'seen'], fakeUsersSeen);

    return { usersSeen };
  },
  () => ({})
)(UsersSeen);
