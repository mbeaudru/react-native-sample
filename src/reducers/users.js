import _ from 'lodash';

const initialState = {
  items: [],
  hashMap: {},
  currentUser: {}
};

export default function users(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_USERS': {
      const fetchedUsers = [];
      const hashMap = action.users.reduce(
        (prev, user) => {
          fetchedUsers.push(user.id);
          return Object.assign({}, prev, {
            [`${user.id}`]: user
          });
        }
      );
      const items = _.uniq([...state.items, ...fetchedUsers]);
      return _.merge({}, state, {
        items,
        hashMap
      });
    }
    case 'FETCH_USER': {
      const items = _.uniq([...state.items, action.user.id]);
      const hashMap = _.merge({}, state.hashMap, {
        [`${action.user.id}`]: action.user
      });
      return _.merge({}, state, {
        items,
        hashMap
      });
    }
    case 'SET_CURRENT_USER': {
      return _.merge({}, state, {
        currentUser: action.user
      });
    }
    default:
      return state;
  }
}
