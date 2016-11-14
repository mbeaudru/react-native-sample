import { connect } from 'react-redux';
import React from 'react';
import AddCommentModal from '../components/AddCommentModal';
import { v1 } from 'node-uuid';
import {
  addComment, toggleAddCommentModalVisibility
} from '../actions/comments';

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
    })
  }

  constructor(props) {
    super(props);

    this.addComment = this.addComment.bind(this);
  }

  addComment(commentForm) {
    // TODO: Get real userId
    const userId = "user1";
    const comment = Object.assign(
      {},
      {
        id: v1(),
        coordinate: this.props.coordinate,
        authorId: userId
      },
      commentForm
    );

    this.props.addComment(comment);
    this.props.toggleAddCommentModalVisibility();
  }

}

export default connect(
  ({ comments, layout }, ownProps) => {
    const { coordinate } = ownProps;
    const { addCommentModalVisible: visible } = layout;
    return { visible, coordinate };
  },
  { addComment, toggleAddCommentModalVisibility },
)(AddCommentModalHOC);
