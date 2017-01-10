import { connect } from 'react-redux';
import React from 'react';
import AddCommentModal from '../components/AddCommentModal';
import { v1 } from 'node-uuid';
import {
  addComment, toggleAddCommentModalVisibility
} from '../actions/comments';
import _ from 'lodash';

class AddCommentModalHOC extends React.Component {

  render() {
    return (
      <AddCommentModal
        visible={this.props.visible}
        addComment={this.addComment}
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
    console.log(users, userId);
    return { visible, coordinate, userId };
  },
  { addComment, toggleAddCommentModalVisibility },
)(AddCommentModalHOC);
