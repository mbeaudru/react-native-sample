import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchUserById } from '../actions/users';
import { Actions } from 'react-native-router-flux';
import CommentsList from '../components/CommentsList';
import TopBar from '../components/TopBar';
import _ from 'lodash';

class UserProfile extends React.Component {

  render() {
    return (
      <View>
        <TopBar textValue="User Profile" onPress={() => Actions.pop()} />
        <ScrollView>
          <View style={styles.main.container}>
            <Image
              style={styles.main.avatar}
              source={{ uri: `${this.props.user.avatar}` }}
            />
            <View style={styles.main.content}>
              <Text style={styles.main.username}>
                {this.props.user.firstName}
              </Text>
              <Text style={styles.main.description}>
                {this.props.user.description}
              </Text>
            </View>
          </View>
        </ScrollView>
        <CommentsList
          comments={this.props.comments}
          onCommentClick={comment => { this.goToCommentPage(comment); }}
        />
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

  componentWillMount() {
    const userId = _.get(this.props.user, 'id', null);
    this.props.fetchUserById(userId);
  }

  goToCommentPage({ id: commentId }) {
    Actions.commentPage({ title: 'A comment', commentId });
  }

}

const styles = {
  container: {
    flex: 1
  },
  main: {
    container: {
      flexDirection: 'row',
      padding: 15,
      paddingBottom: 20,
      backgroundColor: '#f7f7f7'
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
      width: 55,
      height: 55,
      borderRadius: 10,
      marginRight: 15,
      marginTop: 7
    },
    username: {
      fontSize: 25,
      fontWeight: 'bold'
    },
    description: {
      fontSize: 16
    }
  }
};

export default connect(
  ({ users, comments: commentsInState }, { userId }) => {
    const user = _.get(users, ['hashMap', userId], { id: userId });
    const comments = commentsInState.items
      .map(commentId => commentsInState.hashMap[commentId])
      .filter(({ userId }) => userId === user.id);
    return { user, comments };
  },
  { fetchUserById },
)(UserProfile);
