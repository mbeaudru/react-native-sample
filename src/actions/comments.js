import * as types from '../utils/constants';
import _ from 'lodash';

export function addComment(comment = {}) {
  return (dispatch, getState) => {
    // TODO: Insert the comment into DB and then call this dispatch
    const author = _.get(getState(), ['users', comment.author.id], {});
    const commentsMeta = {
      createdAt: new Date(),
      author
    };

    const commentWithMeta = Object.assign({}, comment, commentsMeta);

    dispatch({
      type: types.ADD_COMMENT,
      comment: commentWithMeta
    });
  };
}

export function toggleAddCommentModalVisibility() {
  return {
    type: types.TOGGLE_ADD_COMMENT_MODAL_VISIBILITY
  };
}

export function deleteComment(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment
  };
}
