import * as types from '../utils/constants';
import * as api from '../utils/api';
import _ from 'lodash';

/*
  TODO: All the user management/auth must be done with Auth0.
*/
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

export function updateUser(user) {
  return dispatch => {
    const queryParams = {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(api.USERS_$ID(user.id), queryParams)
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

/*
  TODO: Note: All this logic should be in server side and doesn't make sense
  in a production app. We have to do this to compile with JSON-SERVER but
  it should be done another way with a real API server.
*/
export function followUser(userToFollow) {
  return (dispatch, getState) => {
    const followed = !userToFollow.followed;
    const user = _.merge({}, userToFollow, { followed });

    // First query -> Set the user boolean status "followed"
    // This change is used for the button 'follow / unfollow'
    const queryParams = _.merge({}, api.headerToken(getState()), {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(api.USERS_$ID(user.id), queryParams)
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: types.FETCH_USER,
          user
        });
      })
      .catch(err => console.error(err));

    // This step is made to add/remove the user from the currentUser followed
    // user list whether he is followed or not.
    const currentUserId = _.get(getState(), 'users.currentUser.id', null);
    const currentUser = _.get(
      getState(), ['users', 'hashMap', currentUserId], {}
    );
    const usersSeen = _.get(currentUser, 'seen', []);
    if (followed) {
      currentUser.seen = [...usersSeen, user];
    } else {
      const newUsersSeen = usersSeen.filter(usr => usr.id !== user.id);
      currentUser.seen = newUsersSeen;
    }

    const queryParams2 = _.merge({}, api.headerToken(getState()), {
      method: "PUT",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(api.USERS_$ID(currentUserId), queryParams2)
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: types.FETCH_USER,
          user: currentUser
        });
      })
      .catch(err => console.error(err));
  };
}
