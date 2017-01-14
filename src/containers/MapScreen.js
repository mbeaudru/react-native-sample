import React from 'react';
import { connect } from 'react-redux';
import MapScreen from '../components/MapScreen';
import {
  toggleAddCommentModalVisibility,
  fetchNearComments
} from '../actions/comments';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

class MapScreenHOC extends React.Component {

  render() {
    return (
      <MapScreen
        comments={this.props.comments}
        onAddCommentPress={() => this.props.toggleAddCommentModalVisibility()}
        onCommentPress={
          ({ id: commentId }) =>
            Actions.commentPage({ title: 'A comment', commentId })
        }
      />
    );
  }

  static propTypes = {
    comments: React.PropTypes.arrayOf(
      React.PropTypes.shape
    ),
    currentUserId: React.PropTypes.string,

    toggleAddCommentModalVisibility: React.PropTypes.func,
    fetchNearComments: React.PropTypes.func
  }

  componentWillMount() {
    this.props.fetchNearComments();
    if (!this.props.currentUserId) {
      Actions.loginForm();
    }
  }

}

export default connect(
  ({ comments: commentsInState, users }) => {
    const { items = [], hashMap = {} } = commentsInState;
    const comments = items.map(commentId => hashMap[commentId]);

    const currentUserId = _.get(users, ['currentUser', 'id'], null);
    return { comments, currentUserId };
  },
  {
    toggleAddCommentModalVisibility,
    fetchNearComments
  },
)(MapScreenHOC);
