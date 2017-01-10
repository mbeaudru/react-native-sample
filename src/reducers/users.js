import _ from 'lodash';
import faker from 'faker';

const initialState = {
  currentUser: {
    firstName: faker.name.firstName(),
    avatar: faker.image.avatar()
  },
  users: {},
  seen: []
};

export default function users(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_USERS_SEEN': {
      const seen = [];
      const users = action.users.map(user => {
        seen.push(user.id);
        return { [`${user.id}`]: user };
      });

      return _.merge({}, state, {
        seen,
        users
      });
    }
    default:
      return state;
  }
}
