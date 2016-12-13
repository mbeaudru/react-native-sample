import faker from 'faker';

const initialState = [...Array(10)]
  .map(() => {
    const id = faker.random.uuid();
    return ({
      [`${id}`]: {
        id,
        author: {
          id: faker.random.uuid(),
          username: faker.name.firstName(),
          avatar: faker.image.avatar()
        },
        description: faker.lorem.sentences(),
        coordinate: {
          latitude: 48.884 + (Math.random() - 0.5) * 0.01,
          longitude: 2.353 + (Math.random() - 0.5) * 0.01,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        },
        replies: [...Array(5)].map(() => {
          const id2 = faker.random.uuid();
          return {
            id2,
            author: {
              id: faker.random.uuid(),
              username: faker.name.firstName(),
              avatar: faker.image.avatar()
            },
            description: faker.lorem.sentences()
          };
        })
      }
    });
  })
  .reduce((prev, next) => Object.assign({}, prev, next), {});


export default function comments(state = initialState, action) {
  switch(action.type) {
    case 'ADD_COMMENT': {
      const { id } = action.comment;
      return Object.assign({}, state, {[`${id}`]: action.comment});
    }
    default:
      return state;
  }
}
