import * as types from '../utils/constants';
import { SERVER_URL } from '../utils/server-configuration';

export function fetchNearComments() {
  return dispatch => {
    // TODO: Remove expand parameter in prod
    fetch(SERVER_URL+'/comments?_expand=user')
      .then(res => res.json())
      .then(comments => dispatch({
        type: types.FETCH_COMMENTS,
        comments
      }))
      .catch(err => console.error(err));
  };
}

export function fetchCommentById(commentId) {
  return dispatch => {
    fetch(`${SERVER_URL}/comments/${commentId}`)
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
    fetch(`${SERVER_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      // TODO: Remove expand parameter in prod
      fetch(SERVER_URL+'/comments?_expand=user')
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
