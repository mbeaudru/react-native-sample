/* eslint-disable */

// API docs: https://indigoapp.restlet.io/

const faker = require('faker');
const fs = require('fs');

const usersNb = 50;
const commentsNb = 30;
const repliesNb = 1000;
const chatroomsNb = 5;

const users = [...Array(usersNb)].map((e, id) => (
  {
    id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    description: faker.lorem.words()
  }
));

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

const replies = [...Array(repliesNb)].map(() => {
  const parentComment = comments[Math.floor(Math.random() * commentsNb)];
  const replier = users[Math.floor(Math.random() * usersNb)];
  return ({
    id: faker.random.uuid(),
    user: replier,
    description: faker.lorem.sentences(),

    commentId: parentComment.id
  });
});

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
})

const db = {
  users,
  comments,
  replies,
  chatrooms
};

module.exports = function() {
  return db;
}

// fs.writeFile("./db.json", JSON.stringify(db));
