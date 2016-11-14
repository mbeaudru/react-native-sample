import { connect } from 'react-redux';
import CommentsList from '../components/CommentsList';

export default connect(
  ({ comments: commentsState }) => {
    const comments = Object.keys(commentsState).map(key => commentsState[key]);
    return { comments };
  },
  () => ({})
)(CommentsList);
