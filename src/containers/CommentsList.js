import { connect } from 'react-redux';
import CommentsList from '../components/CommentsList';
import { Actions } from 'react-native-router-flux';

import React from 'react';

class CommentsListHOC extends React.Component {

  render() {
    return (
      <CommentsList
        comments={this.props.comments}
        onCommentClick={({ id }) => { this.goToCommentPage(id); }}
      />
    );
  }

  goToCommentPage(commentId) {
    Actions.commentPage({ title: 'A comment', commentId });
  }

}

CommentsListHOC.propTypes = {
  comments: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      author: React.PropTypes.shape({
        username: React.PropTypes.string,
        avatar: React.PropTypes.string
      }),
      description: React.PropTypes.string,
      coordinate: React.PropTypes.object,
      id: React.PropTypes.string
    })
  )
};

export default connect(
  ({ comments: commentsState }) => {
    const comments = Object.keys(commentsState).map(key => commentsState[key]);
    return { comments };
  },
  () => ({})
)(CommentsListHOC);
