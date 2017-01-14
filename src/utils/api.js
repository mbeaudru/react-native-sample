import _ from 'lodash';
import { SERVER_URL } from './server-configuration';

// USER MANAGEMENT
export const CHECK_USER_TOKEN = () =>  `${SERVER_URL}/uaa/oauth/check_token`;
export const USER_TOKEN = () =>  `${SERVER_URL}/uaa/oauth/token`;
export const CURRENT_USER = () =>  `${SERVER_URL}/uaa/users/current`;
export const CURRENT_USER_PICTURE = () =>  `${SERVER_URL}/uaa/users/current`;
export const REGISTER_USER = () =>  `${SERVER_URL}/register`;
export const USERS_$ID = (userId) => `${SERVER_URL}/users/${userId}`;

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
