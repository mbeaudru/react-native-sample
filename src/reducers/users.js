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
      const hashMap = action.users
        .map(user => {
          fetchedUsers.push(user.id);
          return { [`${user.id}`]: user };
        })
        .reduce((prev, next) => Object.assign({}, prev, next), {});
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
        currentUser: {
          id: action.user.id
        }
      });
    }
    default:
      return state;
  }
}
