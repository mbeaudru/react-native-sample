import * as types from '../utils/constants';
import * as api from '../utils/api';
import _ from 'lodash';

export function fetchNearComments() {
  return (dispatch, getState) => {
    fetch(api.NEAR_COMMENTS(), api.headerToken(getState()))
      .then(res => res.json())
      .then(comments => dispatch({
        type: types.FETCH_COMMENTS,
        comments
      }))
      .catch(err => console.error(err));
  };
}

export function fetchCommentById(commentId) {
  return (dispatch, getState) => {
    fetch(api.COMMENTS_$ID(commentId), api.headerToken(getState()))
      .then(res => res.json())
      .then(comment => dispatch({
        type: types.FETCH_COMMENT,
        comment
      }))
      .catch(err => console.error(err));
  };
}

export function addComment(comment = {}) {
  return (dispatch, getState) => {
    const queryParams = _.merge({}, api.headerToken(getState()), {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(api.NEAR_COMMENTS(), queryParams)
    .then(res => res.json())
    .then(() => {
      fetch(api.NEAR_COMMENTS())
        .then(res => res.json())
        .then(comments => dispatch({
          type: types.FETCH_COMMENTS,
          comments
        }))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
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
