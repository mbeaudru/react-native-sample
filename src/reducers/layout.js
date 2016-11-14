const initialState = {
  addCommentModalVisible: false
};

export default function comments(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE_ADD_COMMENT_MODAL_VISIBILITY': {
      const addCommentModalVisible = !state.addCommentModalVisible;
      return Object.assign({}, state, { addCommentModalVisible });
    }
    default:
      return state;
  }
}
