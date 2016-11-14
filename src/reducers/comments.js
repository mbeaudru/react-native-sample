import faker from 'faker';

const initialState = {
  firstComment: {
    
  }
};

export default function comments(state = {}, action) {
  switch(action.type) {
    case 'ADD_COMMENT': {
      const { id } = action.comment;
      return Object.assign({}, state, {[`${id}`]: action.comment});
    }
    default:
      return state;
  }
}
