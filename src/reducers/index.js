import { combineReducers } from 'redux';
import comments from './comments';
import layout from './layout';

export default combineReducers({
  comments,
  layout
});
