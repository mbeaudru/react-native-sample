import { combineReducers } from 'redux';
import comments from './comments';
import layout from './layout';
import users from './users';

export default combineReducers({
  comments,
  layout,
  users
});
