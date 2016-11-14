import { connect } from 'react-redux';
import CommentsList from '../components/CommentsList';

export default connect(
  ({ comments }) => {
    const commentsArray = Object.keys(comments).map(key => comments[key]);
    return { comments: commentsArray };
  },
  () => ({})
)(CommentsList);
