import _ from 'lodash';
import { SERVER_URL } from './server-configuration';

// USER MANAGEMENT
export const USERS = () => `${SERVER_URL}/users`;
export const USERS_$ID = (userId) => `${SERVER_URL}/users/${userId}`;
export const USERS_$FIRSTNAME_$LASTNAME = (firstName, lastName) =>
  `${SERVER_URL}/users?firstName=${firstName}&lastName=${lastName}`;

// COMMENTS
// TODO: Remove expand parameter in prod
export const NEAR_COMMENTS = () => `${SERVER_URL}/comments?_expand=user`;
export const COMMENTS_$ID = (id) => `${SERVER_URL}/comments/${id}`;

// REPLIES
export const REPLIES = () => `${SERVER_URL}/replies`;
export const REPLIES_$ID = (id) => `${SERVER_URL}/replies/${id}`;

// SPECIAL
// HEADER TOKEN GETTER
export const headerToken = (state) => {
  const token = _.get(
    state,
    ['users', 'currentUser', 'token'],
    null
  );
  return {
    header: {
      Authorization: `Bearer ${token}`
    }
  };
};
