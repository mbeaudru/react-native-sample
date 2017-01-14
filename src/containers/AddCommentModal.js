import { connect } from 'react-redux';
import React from 'react';
import CommentForm from '../components/CommentForm';
import { v1 } from 'node-uuid';
import {
  addComment, toggleAddCommentModalVisibility
} from '../actions/comments';
import _ from 'lodash';

class AddCommentModalHOC extends React.Component {

  render() {
    return (
      <CommentForm
        onTopBarPress={this.props.toggleAddCommentModalVisibility}
        topBarText="New comment"
        visible={this.props.visible}
        onSubmit={this.addComment}
      />
    );
  }

  static propTypes = {
    addComment: React.PropTypes.func,
    visible: React.PropTypes.bool,
    toggleAddCommentModalVisibility: React.PropTypes.func,
    coordinate: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number
    }),
    userId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  }

  constructor(props) {
    super(props);

    this.addComment = this.addComment.bind(this);
  }

  addComment(commentForm) {
    if (!this.props.userId) return;
    const userId = this.props.userId;
    const comment = Object.assign(
      {},
      {
        id: v1(),
        coordinate: this.props.coordinate,
        userId
      },
      commentForm
    );

    this.props.addComment(comment);
    this.props.toggleAddCommentModalVisibility();
  }

}

export default connect(
  ({ comments, layout, users }, ownProps) => {
    const { coordinate } = ownProps;
    const { addCommentModalVisible: visible } = layout;
    const userId = _.get(users, 'currentUser.id', null);
    return { visible, coordinate, userId };
  },
  { addComment, toggleAddCommentModalVisibility },
)(AddCommentModalHOC);
