import faker from 'faker';

const initialState = {
  user1: {
    username: faker.name.firstName(),
    avatar: faker.image.avatar()
  }
};

export default function users(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
