import { connect } from 'react-redux';
import React from 'react';
import CommentForm from '../components/CommentForm';
import { Actions } from 'react-native-router-flux';
import { v1 } from 'node-uuid';
import { addReply } from '../actions/comments';
import _ from 'lodash';

class AddReply extends React.Component {

  render() {
    return (
      <CommentForm
        topBarText="New reply"
        onTopBarPress={Actions.pop}
        visible
        onSubmit={this.addReply}
      />
    );
  }

  static propTypes = {
    user: React.PropTypes.shape({
      firstName: React.PropTypes.string
    }),
    commentId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    addReply: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.addReply = this.addReply.bind(this);
  }

  addReply(replyToAdd) {
    const reply = Object.assign({}, replyToAdd, {
      id: v1(),
      commentId: this.props.commentId,
      user: this.props.user
    });

    this.props.addReply(reply);
    Actions.pop();
  }

}

export default connect(
  ({ users }, { commentId }) => {
    const currentUserId = _.get(users, 'currentUser.id', null);
    const user = _.get(users, ['hashMap', currentUserId], {});
    return { commentId, user };
  },
  { addReply },
)(AddReply);
