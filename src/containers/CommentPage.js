import React from 'react';
import { connect } from 'react-redux';
import CommentPage from '../components/CommentPage';
import _ from 'lodash';

class CommentPageHOC extends React.Component {

  render() {
    return (
      <CommentPage comment={this.props.comment} />
    );
  }

}

CommentPageHOC.propTypes = {
  comment: React.PropTypes.shape({
    id: React.PropTypes.string,
    description: React.PropTypes.string
  })
};

export default connect(
  (state, ownProps) => {
    const comment = _.get(state, ['comments', ownProps.commentId], {});
    console.log(comment); // eslint-disable-line
    return { comment };
  },
  () => ({}),
)(CommentPageHOC);
