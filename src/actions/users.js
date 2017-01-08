import * as types from '../utils/constants';

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
