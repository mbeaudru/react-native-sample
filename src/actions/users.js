import * as types from '../utils/constants';
import * as api from '../utils/api';
import _ from 'lodash';

export function fetchCurrentUser() {
  return (dispatch, getState) => {
    fetch(api.CURRENT_USER(), api.headerToken(getState()))
      .then(res => res.json())
      .then((user = {}) => {
        dispatch({
          type: types.FETCH_USER,
          user
        });

        dispatch({
          type: types.SET_CURRENT_USER,
          user
        });

        const usersSeen = _.get(user, 'seen', []);
        dispatch({
          type: types.FETCH_USERS,
          users: usersSeen
        });
      })
      .catch(err => console.error(err));
  };
}

export function fetchUserById(userId) {
  return (dispatch, getState) => {
    fetch(api.USERS_$ID(userId), api.headerToken(getState()))
      .then(res => res.json())
      .then((user = {}) => dispatch({
        type: types.FETCH_USER,
        user
      }))
      .catch(err => console.error(err));
  };
}
