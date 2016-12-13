import React from 'react';
import { connect } from 'react-redux';
import MapScreen from '../components/MapScreen';
import { toggleAddCommentModalVisibility } from '../actions/comments';
import { Actions } from 'react-native-router-flux';

const MapScreenHOC = (props) => (
  <MapScreen
    {...props}
    onCommentPress={
      ({ id: commentId }) =>
        Actions.commentPage({ title: 'A comment', commentId })
    }
  />
);

export default connect(
  ({ comments }) => {
    const commentsArray = Object.keys(comments).map(key => comments[key]);
    return { comments: commentsArray };
  },
  {
    toggleAddCommentModalVisibility
  },
)(MapScreenHOC);
