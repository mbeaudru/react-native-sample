import * as types from '../utils/constants';
import { SERVER_URL } from '../utils/server-configuration';

export function fetchUserById(comment = {}) {
  return (dispatch, getState) => {
    // Mock get user by id api
    const user = {
      firstName: 'Mocked user'
    };
    dispatch({
      type: types.FETCH_USER,
      user
    });
  };
}

export function fetchUsersSeen(currentUserId = 0) {
  return dispatch => {
    fetch(`${SERVER_URL}/users/${currentUserId}/seen`)
      .then(res => res.json())
      .then(users => dispatch({
        type: types.FETCH_USERS_SEEN,
        users
      }));
  };
}
