import * as types from '../utils/constants';
import * as api from '../utils/api';

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
    fetch(api.CURRENT_USER_SEEN)
      .then(res => res.json())
      .then(users => dispatch({
        type: types.FETCH_USERS_SEEN,
        users
      }));
  };
}
