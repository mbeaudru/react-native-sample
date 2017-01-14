import * as types from '../utils/constants';
import * as api from '../utils/api';
import _ from 'lodash';

export function registerUser(user) {
  return dispatch => {
    const queryParams = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(api.USERS(), queryParams)
      .then(() => {
        dispatch({
          type: types.FETCH_USER,
          user
        });

        dispatch({
          type: types.SET_CURRENT_USER,
          user
        });
      })
      .catch(err => console.warn(err));
  };
}

export function loginUser(user) {
  return dispatch => {
    fetch(api.USERS_$FIRSTNAME_$LASTNAME(user.firstName, user.lastName))
      .then(res => res.json())
      .then(usersFetched => {
        for (const userFetched of usersFetched) {
          if (userFetched.password === user.password) {
            dispatch({
              type: types.FETCH_USER,
              user: userFetched
            });

            dispatch({
              type: types.SET_CURRENT_USER,
              user: userFetched
            });
            break;
          }
        }
      })
      .catch(err => console.warn(err));
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
