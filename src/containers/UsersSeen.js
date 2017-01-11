import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
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
      <View style={styles.container}>
        <SearchBar
          onChangeText={searchVal => this.handleSearch(searchVal)}
          lightTheme
          containerStyle={styles.searchBar}
          inputStyle={styles.inputStyle}
          placeholder="Search a friend"
        />
        <ScrollView style={styles.listContainer}>
          <List>
            {
              this.props.usersSeen
                .filter(user => this.filterUserBySearchValue(user))
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
      </View>
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

  static defaultProps = {
    currentUser: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      searchVal: null
    };
  }

  componentWillMount() {
    this.props.fetchCurrentUser();
  }

  handleSearch(searchVal) {
    if (!searchVal) {
      this.setState({ searchVal: null });
    } else {
      this.setState({ searchVal });
    }
  }

  filterUserBySearchValue(user) {
    if (!this.state.searchVal) return true;
    if (user.firstName.includes(this.state.searchVal)) return true;
    if (user.lastName.includes(this.state.searchVal)) return true;
    return false;
  }

  onUserPress(userId) {
    Actions.userProfile({ userId });
  }

}

const styles = {
  container: {
    marginTop: -1
  },
  listContainer: {
    marginTop: -22
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  },
  listLabel: {
    padding: 15,
    backgroundColor: '#fbfbfb',
    zIndex: 2
  },
  searchBar: {
    zIndex: 3,
    backgroundColor: '#fbfbfb',
    marginTop: -2
  },
  inputStyle: {
    backgroundColor: '#f0f0f0'
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
