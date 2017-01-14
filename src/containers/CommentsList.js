import { connect } from 'react-redux';
import CommentsList from '../components/CommentsList';
import { Actions } from 'react-native-router-flux';
import { fetchNearComments } from '../actions/comments';
import { InteractionManager } from 'react-native';
import React from 'react';

class CommentsListHOC extends React.Component {

  render() {
    return (
      <CommentsList
        comments={this.props.comments}
        onCommentClick={comment => { this.goToCommentPage(comment); }}
      />
    );
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchNearComments();
    });
  }

  goToCommentPage({ id: commentId }) {
    Actions.commentPage({ title: 'A comment', commentId });
  }

}

CommentsListHOC.propTypes = {
  comments: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      user: React.PropTypes.shape({
        firstName: React.PropTypes.string,
        avatar: React.PropTypes.string
      }),
      description: React.PropTypes.string,
      coordinate: React.PropTypes.object,
      id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ])
    })
  ),
  fetchNearComments: React.PropTypes.func
};

export default connect(
  ({ comments: commentsState }) => {
    const { items = [], hashMap = {} } = commentsState;
    const comments = items.map(commentId => hashMap[commentId]);
    return { comments };
  },
  { fetchNearComments }
)(CommentsListHOC);
