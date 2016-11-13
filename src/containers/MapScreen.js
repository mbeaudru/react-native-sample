import { connect } from 'react-redux';
import { addComment, updateComment } from '../actions/comments';
import MapScreen from '../components/MapScreen';

export default connect(
  ({ comments }) => {
    const commentsArray = Object.keys(comments).map(key => comments[key]);
    return { comments: commentsArray };
  },
  { addComment, updateComment },
)(MapScreen);
