import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View, ScrollView, InteractionManager, ActivityIndicator
} from 'react-native';
import CommentItem from '../components/CommentItem';
import TopBar from '../components/TopBar';
import { fetchCommentById } from '../actions/comments';
import _ from 'lodash';

class CommentPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TopBar onPress={() => Actions.pop()} textValue="Comments" />

        <ScrollView>
          <CommentItem
            comment={this.props.comment}
            onAvatarPress={user => Actions.userProfile({ user })}
          />

          {this.props.replies.length === 0 &&
            <ActivityIndicator size={60} style={styles.spinner} />
          }

          {this.props.replies.map((comment, key) =>
            <CommentItem
              key={key}
              comment={comment}
              onAvatarPress={user => Actions.userProfile({ user })}
              small
            />
          )}

        </ScrollView>
      </View>
    );
  }

  static propTypes = {
    comment: React.PropTypes.shape({
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      description: React.PropTypes.string
    }),
    fetchCommentById: React.PropTypes.func,
    replies: React.PropTypes.arrayOf(
      React.PropTypes.object
    )
  }

  static defaultProps = {
    comment: {},
    replies: []
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchCommentById(this.props.comment.id);
    });
  }

}

const styles = {
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100
  }
};

export default connect(
  ({ comments }, ownProps) => {
    const comment = _.get(comments, ['hashMap', ownProps.commentId], {});
    const replies = _.get(comment, 'replies', []);
    return { comment, replies };
  },
  { fetchCommentById },
)(CommentPage);
