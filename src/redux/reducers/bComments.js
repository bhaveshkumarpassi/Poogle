import * as ActionTypes from '../ActionTypes';

export const Bcomments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BCOMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_BFAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_BCOMMENT:
        var comment = action.payload;
        return { ...state, comments: state.comments.concat(comment)};

    case ActionTypes.DELETE_BCOMMENT: 
        var commentId = action.payload;
        var index = state.comments.indexOf(state.comments.filter(comment => comment._id === commentId)[0]);
        state.comments.splice(index, 1);
        return {...state, comments: state.comments}

    default:
      return state;
  }
};