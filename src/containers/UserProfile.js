import React from 'react';
import {
  View, Text, ScrollView, Image, InteractionManager
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchUserById } from '../actions/users';
import { Actions } from 'react-native-router-flux';
import colors from '../utils/colors';
import CommentsList from '../components/CommentsList';
import TopBar from '../components/TopBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import _ from 'lodash';

class UserProfile extends React.Component {

  render() {
    return (
      <View>
        <TopBar textValue="User Profile" onPress={() => Actions.pop()} />
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.avatar}
              source={{ uri: `${this.props.user.avatar}` }}
            />
            <View style={styles.content}>
              <Text style={styles.username}>
                {this.props.user.firstName}
              </Text>
              <Text style={styles.description}>
                {this.props.user.description}
              </Text>
            </View>
          </View>
          <ScrollableTabView
            style={styles.tabView}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarActiveTextColor={colors.primary2}
            tabBarInactiveTextColor={colors.notSelectedText}
          >
            <CommentsList
              tabLabel="Comments"
              comments={this.props.comments}
              onCommentClick={comment => { this.goToCommentPage(comment); }}
            />
            <List tabLabel="Following" containerStyle={styles.userList}>
              {
                this.props.usersSeen.map(
                  (user, key) => {
                    const { firstName, lastName, avatar, description } = user;
                    return (
                      <ListItem
                        key={key}
                        roundAvatar
                        avatar={avatar}
                        title={`${firstName} ${lastName}`}
                        subtitle={description}
                        onPress={() => this.onUserPress(user)}
                      />
                    );
                  })
              }
            </List>
          </ScrollableTabView>
        </ScrollView>
      </View>
    );
  }

  static propTypes = {
    user: React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      firstName: React.PropTypes.string,
      avatar: React.PropTypes.string,
      description: React.PropTypes.string
    }),
    usersSeen: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ]),
        firstName: React.PropTypes.string,
        avatar: React.PropTypes.string,
        description: React.PropTypes.string
      })
    ),
    fetchUserById: React.PropTypes.func,
    comments: React.PropTypes.arrayOf(
      React.PropTypes.object
    )
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'comments'
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const userId = _.get(this.props.user, 'id', null);
      this.props.fetchUserById(userId);
    });
  }

  goToCommentPage({ id: commentId }) {
    Actions.commentPage({ title: 'A comment', commentId });
  }

  onUserPress(user) {
    Actions.userProfile({ user });
  }

}

const styles = {
  container: {
    flexDirection: 'column',
    padding: 15,
    paddingBottom: 20,
    backgroundColor: '#468ef7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fbfbfb',
    paddingBottom: 10,
    paddingTop: 10
  },
  content: {
    flex: 1
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginTop: 7,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'white'
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  },
  userList: {
    marginTop: -1
  },
  tabView: {
    // paddingTop: 5
  },
  tabBarUnderlineStyle: {
    backgroundColor : colors.primary2
  }
};

export default connect(
  ({ users, comments: commentsInState }, { user: userPassed }) => {
    const userId = _.get(userPassed, 'id', null);
    const userInState = _.get(users, ['hashMap', userId], { id: userId });
    const user = _.merge({}, userPassed, userInState);
    const comments = commentsInState.items
      .map(commentId => commentsInState.hashMap[commentId])
      .filter(({ userId }) => userId === user.id);
    const usersSeen = _.get(user, 'seen', []);
    return { user, comments, usersSeen };
  },
  { fetchUserById },
)(UserProfile);
