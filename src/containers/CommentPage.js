import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View, ScrollView, InteractionManager, ActivityIndicator, StyleSheet
} from 'react-native';
import CommentItem from '../components/CommentItem';
import TopBar from '../components/TopBar';
import {
  fetchCommentById, likeComment, likeReply
} from '../actions/comments';
import _ from 'lodash';

class CommentPage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TopBar onPress={() => Actions.pop()} textValue="Comments" />

        <ScrollView>
          <CommentItem
            avatar={this.props.comment.user.avatar}
            title={this.props.comment.user.firstName}
            description={this.props.comment.description}
            liked={this.props.comment.liked}
            onAvatarPress={() =>
              Actions.userProfile({
                user: this.props.comment.user
              })
            }
            onLikePress={() => this.props.likeComment(this.props.comment)}
            onReplyPress={() => this.onReplyPress(this.props.comment.id)}
          />

          {this.props.replies ?
            this.props.replies.map((comment, key) =>
              <CommentItem
                key={key}
                avatar={comment.user.avatar}
                title={comment.user.firstName}
                description={comment.description}
                liked={comment.liked}
                onAvatarPress={() =>
                  Actions.userProfile({
                    user: comment.user
                  })
                }
                onLikePress={() => this.props.likeReply(comment)}
                onReplyPress={() => this.onReplyPress(this.props.comment.id)}
                small
              />
            )
            : <ActivityIndicator size={60} style={styles.spinner} />
          }

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
      description: React.PropTypes.string,
      liked: React.PropTypes.bool,
      user: React.PropTypes.object
    }),
    replies: React.PropTypes.arrayOf(
      React.PropTypes.object
    ),

    likeComment: React.PropTypes.func,
    likeReply: React.PropTypes.func,
    fetchCommentById: React.PropTypes.func
  }

  static defaultProps = {
    comment: {}
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchCommentById(this.props.comment.id);
    });
  }

  onReplyPress(commentId) {
    Actions.addReply({ commentId });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100
  }
});

export default connect(
  ({ comments }, ownProps) => {
    const comment = _.get(comments, ['hashMap', ownProps.commentId], {});
    const replies = comment.replies;
    return { comment, replies };
  },
  { fetchCommentById, likeComment, likeReply },
)(CommentPage);
