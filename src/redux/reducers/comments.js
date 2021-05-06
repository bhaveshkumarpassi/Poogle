import * as ActionTypes from '../ActionTypes';

export const Comments = (state = { errMess: null, comments:[], postFail: false, postFailMess: ''}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload, postFail: false, postFailMess: ''};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload, postFail: false, postFailMess: ''};

    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment), postFail: false, postFailMess: ''};

    case ActionTypes.POST_FAIL:
      return { ...state, postFail: true, postFailMess: action.payload}

    case ActionTypes.DELETE_COMMENT: 
        var commentId = action.payload;
        var index = state.comments.indexOf(state.comments.filter(comment => comment._id === commentId)[0]);
        state.comments.splice(index, 1);
        return {...state, comments: state.comments}

    default:
      return state;
  }
};