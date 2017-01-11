/* eslint-disable */

// API docs: https://indigoapp.restlet.io/

const faker = require('faker');
const fs = require('fs');

// TODO: Improve performances in the app bcz if usersNb / commentsNb increase
// it becomes a nightmare
const usersNb = 50;
const friendsNb = 30;
const commentsNb = 100;
const maxRepliesNb = 20;
const chatroomsNb = 5;

const generateUser = (id) => ({
  id,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  description: faker.lorem.words()
})

const usersBase = [...Array(usersNb)].map((e, id) => generateUser(id));

const users = usersBase.map((user, id) =>
  Object.assign({}, user, {
    seen: [...Array(Math.floor(Math.random() * friendsNb))].map(() =>
      usersBase[Math.floor(Math.random() * usersNb)]
    )
  })
);

const comments = [...Array(commentsNb)].map((e, id) => {
  const author = users[Math.floor(Math.random() * usersNb)];
  return (
    {
      id,
      userId: Math.floor(Math.random() * usersNb),
      description: faker.lorem.sentences(),
      coordinate: {
        latitude: 48.884 + (Math.random() - 0.5) * 0.01,
        longitude: 2.353 + (Math.random() - 0.5) * 0.01,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }
    }
  );
});

const replies = comments
  .map(comment =>
    [...Array(Math.floor(Math.random() * maxRepliesNb)) + 3].map(() => {
      const replier = users[Math.floor(Math.random() * usersNb)];
      return ({
        id: faker.random.uuid(),
        user: replier,
        description: faker.lorem.sentences(),

        commentId: comment.id
      });
    })
  )
  .reduce((prev, next) => [...prev, ...next], []);

const chatrooms = [...Array(chatroomsNb)].map(() => {
  const chatUsers = users.filter(() => faker.random.boolean());
  return {
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    description: faker.lorem.words(),
    users: chatUsers,
    color: faker.internet.color(),
    coordinate: {
      latitude: 48.884 + (Math.random() - 0.5) * 0.01,
      longitude: 2.353 + (Math.random() - 0.5) * 0.01,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }
  }
});

// User management
const userToken = { token: 'mKfeazoJjfezafoJfhezifuhJ' };

const checkUserToken = { status: 'OK' };

const getCurrentUser = {
  id: 'currentUserId',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  description: faker.lorem.words(),
  seen: [...Array(Math.floor(Math.random() * friendsNb))].map(() =>
    usersBase[Math.floor(Math.random() * usersNb)]
  )
};

// TODO: Remove when create user form will be OK
users.push(getCurrentUser);

const currentUserPicture = {
  avatar: faker.image.avatar()
};

const db = {
  users,
  comments,
  replies,
  chatrooms,
  userToken,
  checkUserToken,
  getCurrentUser,
  currentUserPicture
};

module.exports = function() {
  return db;
}

// fs.writeFile("./db.json", JSON.stringify(db));
