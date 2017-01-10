import React from 'react';
import { connect } from 'react-redux';
import MapScreen from '../components/MapScreen';
import {
  toggleAddCommentModalVisibility,
  fetchNearComments
} from '../actions/comments';
import { Actions } from 'react-native-router-flux';

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
    toggleAddCommentModalVisibility: React.PropTypes.func,
    fetchNearComments: React.PropTypes.func
  }

  componentWillMount() {
    this.props.fetchNearComments();
  }

}

export default connect(
  ({ comments: commentsInState }) => {
    const { items = [], hashMap = {} } = commentsInState;
    const comments = items.map(commentId => hashMap[commentId]);
    return { comments };
  },
  {
    toggleAddCommentModalVisibility,
    fetchNearComments
  },
)(MapScreenHOC);
