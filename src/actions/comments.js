import * as types from '../utils/constants';

export function addComment(comment) {
  return {
    type: types.ADD_COMMENT,
    comment
  };
}

export function updateComment(comment) {
  return {
    type: types.UPDATE_COMMENT,
    comment
  };
}
