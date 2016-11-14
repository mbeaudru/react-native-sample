import * as types from '../utils/constants';
import faker from 'faker';

export function addComment(comment) {
  return dispatch => {
    // TODO: Insert the comment into DB and then call this dispatch

    const commentWithMeta = Object.assign(
      {}, comment,
      {
        createdAt: new Date(),
        // TODO: Fetch author metaData
        authorAvatar: faker.image.avatar()
      }
    );

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
