import * as ActionTypes from '../ActionTypes';

export const Bcomments = (state = { errMess: null, bcomments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BCOMMENTS:
      return {...state, errMess: null, bcomments: action.payload};

    case ActionTypes.COMMENTS_BFAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_BCOMMENT:
        var comment = action.payload;
        return { ...state, bcomments: state.bcomments.concat(comment)};

    case ActionTypes.DELETE_BCOMMENT: 
        var commentId = action.payload;
        var index = state.bcomments.indexOf(state.bcomments.filter(comment => comment._id === commentId)[0]);
        state.bcomments.splice(index, 1);
        return {...state, bcomments: state.bcomments}

    default:
      return state;
  }
};