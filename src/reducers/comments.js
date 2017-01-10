import _ from 'lodash';

export default function comments(state = { items: [], hashMap: {} }, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS': {
      const fetchedItems = [];
      const hashMap = action.comments
        .map(comment => {
          fetchedItems.push(comment.id);
          return { [`${comment.id}`]: comment };
        })
        .reduce((prev, next) => Object.assign({}, prev, next), {});
      const items = _.uniq([...state.items, ...fetchedItems]);
      return _.merge({}, state, {
        items,
        hashMap
      });
    }
    case 'FETCH_COMMENT': {
      const items = _.uniq([...state.items, action.comment.id]);
      const hashMap = _.merge({}, state.hashMap, {
        [`${action.comment.id}`]: action.comment
      });
      return _.merge({}, state, {
        items,
        hashMap
      });
    }
    default:
      return state;
  }
}
