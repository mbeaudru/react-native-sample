import * as types from '../utils/constants';

export function addComment(comment) {
  return dispatch => {
    // Insert the comment into DB and then call this dispatch

    dispatch({
      type: types.ADD_COMMENT,
      comment
    });
  };
}

export function deleteComment(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment
  };
}
